import {FC} from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, FormControl, TextField, Typography} from "@mui/material";
import {TAccountInformation} from "@/types/AccountInformation.types";
import {yupResolver} from "@hookform/resolvers/yup";
import {AccountSchema} from "@/validations/accountSchema";

interface AccountInformationProps {
    setFormData: (data: any) => void
    handleNext: () => void
    handleBack: () => void
    steps: any
}

const formDefaultValues: TAccountInformation =
    {
        email: '',
        password: ''
    };

const checkIfStorageHasValues = () => {
    if (typeof window !== 'undefined') {
        const storage = localStorage;
        if (storage.getItem('formData') !== null) {

            const accountInformation = JSON.parse(storage.getItem('formData')!).accountInformation
            if (accountInformation !== undefined) {
                return {
                    ...accountInformation
                }
            } else {
                return formDefaultValues
            }
        }
    }


    return formDefaultValues
}

const AccountInformation: FC<AccountInformationProps> = ({setFormData, handleNext, handleBack, steps}) => {

    const {handleSubmit, control, formState: {errors, isValid}} = useForm<TAccountInformation>({
        mode: 'onBlur',
        defaultValues: checkIfStorageHasValues(),
        resolver: yupResolver(AccountSchema)
    })

    const onSubmit = (data: TAccountInformation) => {
        setFormData({
            accountInformation: data
        })
        handleNext()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant={'h6'} mt={3} mb={1}>Inserisci le credenziali di accesso</Typography>
            <Controller name={'email'} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <TextField {...field} label={'Email'} error={!!errors.email}
                               helperText={errors.email?.message?.toString()}/>
                </FormControl>
            )}/>

            <Controller name={'password'} control={control} render={({field}) => (
                <FormControl fullWidth margin={'normal'}>
                    <TextField {...field} label={'Password'} type={'password'} error={!!errors.password}
                               helperText={errors.password?.message?.toString()}/>
                </FormControl>
            )}/>

            <div className={"flex gap-4 mt-4"}>
                <Button variant={"outlined"} color={'primary'}
                        disabled={!isValid || steps.selectedIndex === steps.numberOfSteps}
                        type={'submit'}>Next</Button>

            </div>
        </form>
    )
}

export default AccountInformation