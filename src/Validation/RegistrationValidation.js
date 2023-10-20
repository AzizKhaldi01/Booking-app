import * as yup from 'yup'


export const RegistrSchema = yup.object().shape({
    firtsname: yup.string().max(15).required(),
    lastname: yup.string().max(15).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
   confirmpassword: yup.string().oneOf([yup.ref('password') , null , 'Password must match' ]) 
    
})