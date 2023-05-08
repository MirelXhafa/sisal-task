import {FC} from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {Typography} from "@mui/material";

interface NavigationProps {
    steps: any;
    handleBack: () => void
    title: string
}

const Navigation: FC<NavigationProps> = ({steps, handleBack, title}) => {
    return (
        <div className={'flex items-center'}>
            <div className={'w-2/12'}>
                {
                    steps.selectedIndex > 0 && steps.selectedIndex !== 3 ? (
                        <div className={'flex justify-center items-center cursor-pointer'} onClick={handleBack}>
                            <ArrowBackIosIcon/>
                        </div>) : null}
            </div>
            <div className={'w-8/12'}>
                <Typography variant="h5" textAlign="center" my={4}>
                    {title}
                </Typography>
            </div>
        </div>
    )
}

export default Navigation