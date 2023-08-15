import * as Yup from 'yup'
import lang from "../lang/fr.json"

export const BillingInformationsSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    adress: Yup.object().shape({
        city: Yup.string().required(),
        country: Yup.string().required(),
        email: Yup.string().email(lang.validations.email).required(),
        phone: Yup.string().length(10).optional(),
        street: Yup.string().required(),
        zip: Yup.string().length(5).required()
    })
})
