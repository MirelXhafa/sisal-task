import {FC} from "react";
import {Button, Typography} from "@mui/material";

interface SuccessSectionProps {
    handleClose: () => void
}

const SuccessSection: FC<SuccessSectionProps> = ({handleClose}) => {
    return (
        <div className={'flex flex-col items-center'}>
            <Typography variant={'h4'} mt={3}>Registrazione avvenuta</Typography>

            <p className={'text-base my-4'}>Hai completato con successo la registrazione e aperto il tuo conto</p>

            <div className={'w-6/12 h-3/5 overflow-hidden rounded-md'}>
                <img
                    src={'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80'}/>
            </div>

            <div className={'mt-4 w-6/12'}>
                <Button variant={'outlined'} color={'primary'} fullWidth onClick={handleClose}>Chiudi</Button>
            </div>
        </div>
    )
}

export default SuccessSection