import * as yup from 'yup'


export const PlaceSchema = yup.object().shape({
    title: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    extraInfo: yup.string().required(),
    checkIn: yup.number().positive().integer().required(),
    checkOut: yup.number().positive().integer().required(),
    maxGuests: yup.number().positive().integer().required(),
    price :yup.number().positive().integer().required(),
})