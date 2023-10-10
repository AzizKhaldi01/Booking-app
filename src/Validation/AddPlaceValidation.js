import * as yup from 'yup'


export const PlaceSchema = yup.object().shape({
    title: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().max(231).required(),
    extraInfo: yup.string().required(),
    checkIn: yup.number('Check in time must be a number').positive().integer('Check in time must be a number').required(),
    checkOut: yup.number().positive().integer('Check out time must be a number').required(),
    maxGuests: yup.number('Max Guests must be a number')
    .positive('Max Guests must be a positive number')
    .integer('Max Guests must be an integer')
    .required('Max Guests is required'),
    price :yup.number().positive().integer().required(),
})