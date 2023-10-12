import * as yup from 'yup'


export const PlaceSchema = yup.object().shape({
    title: yup.string().max(60).required(),
    address: yup.string().required(),
    description: yup.string().max(600).required(),
    extraInfo: yup.string().max(3000).required(),
    checkIn: yup.number('Check in time must be a number').positive().integer('Check in time must be a number').required(),
    checkOut: yup.number().positive().integer('Check out time must be a number').required(),
   
    price :yup.number().positive().integer().required(),
})