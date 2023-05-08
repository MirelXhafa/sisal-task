'use client'
import {FC, useEffect, useState} from "react";
import PersonalInformationStep from "@/sections/PersonalInformationStep/PersonalInformationStep";
import AccountInformation from "@/sections/AccountInformation/AccountInformation";
import {LinearProgress} from "@mui/material";
import {TFormData} from "@/types/form.types";
import SummarySection from "@/sections/SummarySection/SummarySection";
import SuccessSection from "@/sections/SuccessSection/SuccessSection";
import Navigation from "@/components/Navigation/Navigation";

function getCurrentStepIndexFromStorage() {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('currentStepIndex') !== null) {
            return JSON.parse(localStorage.getItem('currentStepIndex')!)
        }
    }

    return 0
}

const FormStepper: FC = () => {
    const [_, setFormData] = useState<TFormData | undefined>(undefined)
    const [progress, setProgress] = useState<number>(0);
    const [steps, setSteps] = useState({
        selectedIndex: getCurrentStepIndexFromStorage(),
        numberOfSteps: 4
    })

    const updateProgress = () => {
        if (steps.selectedIndex === 0) {
            setProgress(25)
        } else if (steps.selectedIndex === 1) {
            setProgress(50)
        } else if (steps.selectedIndex === 2) {
            setProgress(75)
        } else if (steps.selectedIndex === 3) {
            setProgress(100)
        }
    }

    const handleNext = () => {
        setSteps(prev => {
            let index;

            if (prev.selectedIndex > steps.numberOfSteps) {
                index = steps.numberOfSteps
            } else {
                index = prev.selectedIndex + 1
            }

            localStorage.setItem('currentStepIndex', JSON.stringify(index))

            updateProgress()

            return {
                ...prev,
                selectedIndex: index
            }
        })
    };

    const handleBack = () => {
        setSteps(prev => {
            let index = prev.selectedIndex - 1 === -1 ? 0 : prev.selectedIndex - 1

            updateProgress()

            localStorage.setItem('currentStepIndex', JSON.stringify(index))

            return {
                ...prev,
                selectedIndex: index
            }
        })
    }

    const saveData = (data: any) => {
        setFormData(prev => {
            localStorage.setItem('formData', JSON.stringify({
                ...prev,
                ...data
            }))
            return {
                ...prev,
                ...data
            }
        })
    }

    const goToStep = (stepIndex: number) => {
        setSteps(prev => {
            return {
                ...prev,
                selectedIndex: stepIndex
            }
        })
    }

    const getFormDataFromStorage = () => {
        if (localStorage.getItem('formData') !== null) {
            const data = JSON.parse(localStorage.getItem('formData')!)

            setFormData(prev => {
                return {
                    ...prev,
                    ...data
                }
            })
        }
    }

    useEffect(() => {
        updateProgress()
        getFormDataFromStorage()

    }, [steps.selectedIndex])

    const handleClose = () => {
        setSteps(prev => {
            return {
                ...prev,
                selectedIndex: 0
            }
        })
        setFormData(undefined)

        localStorage.removeItem('formData')
        localStorage.removeItem('currentStepIndex')
    }

    return (
        <>
            <Navigation steps={steps} handleBack={handleBack} title={'Registrazione'}/>
            <LinearProgress variant="determinate" value={progress}/>
            {
                steps.selectedIndex === 0 ? (
                    <PersonalInformationStep setFormData={saveData} handleNext={handleNext} steps={steps}/>) : null
            }

            {
                steps.selectedIndex === 1 ? (
                    <AccountInformation setFormData={saveData} handleNext={handleNext} steps={steps}
                                        handleBack={handleBack}/>) : null
            }
            {
                steps.selectedIndex === 2 ? (
                    <SummarySection handleNext={handleNext} handleBack={handleBack} steps={steps} goToStep={goToStep}/>
                ) : null
            }
            {
                steps.selectedIndex === 3 ? (
                    <SuccessSection handleClose={handleClose}/>
                ) : null
            }
        </>
    )
}

export default FormStepper