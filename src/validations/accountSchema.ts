import * as yup from 'yup'

export const AccountSchema = yup.object({
    email: yup.string().email('Please provide a valid email').required('This field is required'),
    password: yup.string().min(6, 'Password must be between 6 and 18 characters').max(18, 'Password must be between 6 and 18 characters').required('This field is required')
})