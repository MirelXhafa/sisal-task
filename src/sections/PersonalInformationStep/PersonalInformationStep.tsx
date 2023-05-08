'use client'

import {FC} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {countries} from "@/data/countries";
import {TPersonalInformation} from "@/types/PersonalInformation.types";
import dayjs from "dayjs";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "@/validations/registerSchema";

interface PersonalInformationStepProps {
    setFormData: (data: any) => void
    handleNext: () => void
    steps: any
    formData?: any
}

const formDefaultValues: TPersonalInformation =
    {
        first_name: '',
        last_name: '',
        phone_number: '',
        date_of_birth: dayjs(),
        nationality: ''
    };

const checkIfStorageHasValues = () => {
    if (typeof window !== 'undefined') {
        const storage = localStorage;

        if (storage.getItem('formData') !== null) {
            const personalInfo = JSON.parse(storage.getItem('formData')!).personalInformation

            if (personalInfo === undefined) {
                return formDefaultValues
            }
            return {
                ...personalInfo,
                date_of_birth: dayjs(personalInfo.date_of_birth)
            }
        }
    }

    return formDefaultValues
}


const PersonalInformationStep: FC<PersonalInformationStepProps> = ({setFormData, handleNext, steps}) => {

    const {handleSubmit, control, formState: {errors, isValid}} = useForm<TPersonalInformation>({
        mode: "onBlur",
        defaultValues: checkIfStorageHasValues(),
        resolver: yupResolver(RegisterSchema)
    })

    const onSubmit: SubmitHandler<TPersonalInformation> = (data: TPersonalInformation) => {
        console.log('data: ', data)
        handleNext()
        setFormData({
            personalInformation: data
        })

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h6'} mt={3} mb={1}>Inserisci i tuoi datti</Typography>
            <Controller name={'first_name'} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <TextField {...field} label={'Nome'} error={!!errors.first_name}
                               helperText={errors.first_name?.message?.toString()}/>
                </FormControl>
            )}/>
            <Controller name={"last_name"} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <TextField {...field} label={'Cognome'} error={!!errors.last_name}
                               helperText={errors.last_name?.message?.toString()}/>
                </FormControl>
            )}/>
            <Controller name={'phone_number'} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <TextField {...field} label={'Numero di telefono'} error={!!errors.phone_number}
                               helperText={errors.phone_number?.message?.toString()}/>
                </FormControl>
            )}/>
            <Controller name={'date_of_birth'} control={control} render={({field}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormControl fullWidth margin={'normal'}>
                        <DatePicker {...field} label={'Data di nascita'}
                                    slotProps={{
                                        textField: {
                                            error: !!errors.date_of_birth,
                                            helperText: errors.date_of_birth?.message?.toString()
                                        }
                                    }}
                        />
                    </FormControl>
                </LocalizationProvider>
            )}/>

            <Controller name={'nationality'} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <InputLabel id={'nationality-label-id'}>Nazione di nascita</InputLabel>
                    <Select {...field} label={'Nazione di nascita'} error={!!errors.nationality}>
                        {
                            countries.map(country => (
                                <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText
                        error={!!errors.nationality}>{errors.nationality?.message?.toString()}</FormHelperText>
                </FormControl>
            )}/>

            <Button variant={"outlined"} color={'primary'}
                    disabled={!isValid || steps.selectedIndex === steps.numberOfSteps}
                    type={'submit'}>Next</Button>
        </form>
    )
}

export default PersonalInformationStep