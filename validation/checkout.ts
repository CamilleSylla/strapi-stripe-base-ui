import * as Yup from 'yup'
import lang from "../lang/fr.json"

export const BillingInformationsSchema = Yup.object().shape({
    firstname: Yup.string().required(lang.validations.required),
    lastname: Yup.string().required(lang.validations.required),
    email: Yup.string().email(lang.validations.email).required(lang.validations.required),
    phone: Yup.string().length(10).optional(),
    adress: Yup.object().shape({
        city: Yup.string().required(lang.validations.required),
        country: Yup.string().required(lang.validations.required),
        street: Yup.string().required(lang.validations.required),
        zip: Yup.string().length(5).required(lang.validations.required)
    })
})
