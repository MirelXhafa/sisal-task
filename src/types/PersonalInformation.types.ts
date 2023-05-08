import {Dayjs} from "dayjs";

export type TPersonalInformation = {
    first_name: string;
    last_name: string;
    phone_number: string;
    date_of_birth: Dayjs;
    nationality: string;
}