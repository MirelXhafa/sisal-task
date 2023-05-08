import * as yup from "yup";

export const RegisterSchema = yup.object({
    first_name: yup.string().required('This field is required'),
    last_name: yup.string().required('This field is required'),
    phone_number: yup.string().required('This field is required'),
    date_of_birth: yup.string().required('This field is required'),
    nationality: yup.string().required('This field is required')
});
