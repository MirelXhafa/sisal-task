import {FC} from "react";
import {Box, Button, Typography} from "@mui/material";
import {SaveUser} from "@/actions/user";

interface SummarySectionProps {
    handleNext: () => void;
    handleBack: () => void;
    steps: any;
    goToStep: (stepIndex: number) => void
}

function getSummaryFromStorage() {
    const storage = localStorage

    if (storage.getItem('formData') !== null) {
        return JSON.parse(storage.getItem('formData')!)
    }
    return null
}

const SummarySection: FC<SummarySectionProps> = ({handleNext, handleBack, steps, goToStep}) => {

    const data = getSummaryFromStorage()

    const handleRegister = async () => {

        const save = await SaveUser({
            firstname: data.personalInformation.first_name,
            lastname: data.personalInformation.last_name,
            phone_number: data.personalInformation.phone_number,
            date_of_birth: data.personalInformation.date_of_birth,
            nationality: data.personalInformation.nationality,
            email: data.accountInformation.email,
            password: data.accountInformation.password
        })

        if (save) {
            handleNext()
        }
    }

    return (
        <Box>
            <Typography variant={'h4'} mt={4} mb={4}>Riepilogo</Typography>

            <div className={"flex flex-col w-full"}>
                <div className={'flex flex-col w-full border-b border-b-gray-400 pb-4'}>
                    <div className={'flex flex-row justify-between items-center w-full mb-4'}>
                        <Typography variant={'body1'}>Datti personali</Typography>
                        <Button variant={'outlined'} color={'primary'} onClick={() => {
                            goToStep(0)
                        }}>Modifica</Button>
                    </div>
                    <div>
                        <p className={'font-base text-gray-500'}>Nome: {data?.personalInformation?.first_name}</p>
                        <p className={'font-base text-gray-500'}>Cognome: {data?.personalInformation?.last_name}</p>
                        <p className={'font-base text-gray-500'}>Telefono: {data?.personalInformation?.phone_number}</p>
                        <p className={'font-base text-gray-500'}>Data di
                            nascita: {data?.personalInformation?.date_of_birth}</p>
                        <p className={'font-base text-gray-500'}>Nazione di
                            nascita: {data?.personalInformation?.nationality}</p>
                    </div>
                </div>

                <div className={'flex flex-col w-full mt-4'}>
                    <div className={'flex flex-row justify-between items-center w-full mb-4'}>
                        <Typography variant={'body1'}>Datti di accesso</Typography>
                        <Button variant={'outlined'} color={'primary'} onClick={() => {
                            goToStep(1)
                        }}>Modifica</Button>
                    </div>
                    <div>
                        <p className={'font-base text-gray-500'}>Email: {data?.accountInformation?.email}</p>
                        <p className={'font-base text-gray-500'}>Password: ******</p>
                    </div>
                </div>

                <div className={"flex flex-row gap-4 mt-4"}>
                    <Button variant={"outlined"} color={'primary'}
                            disabled={steps.selectedIndex === steps.numberOfSteps}
                            type={'submit'} onClick={handleRegister}>Registrati</Button>

                </div>
            </div>
        </Box>
    )
}

export default SummarySection