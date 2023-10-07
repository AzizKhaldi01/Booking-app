import * as yup from 'yup'


export const PlaceSchema = yup.object().shape({
    title: yup.string().required(),
    address: yup.string().required(),
    descriptoin: yup.string().required(),
    extrainfo:yup.string().required(),
    checkintime:yup.number().positive().integer().max(2).required(),
    checkouttime:yup.number().positive().integer().max(2).required(),
    maxguests:yup.number().positive().integer().max(2).required()
    
})