import { Field } from "formik";

export default function FormkikTextInput({ label, name }: { label: string, name: string }) {
    const handleErrors = (errors: any, touched: any, field: string) => {
        if (
            name.includes('adress.')
            && touched.adress
            && errors.adress
        ) {
            const key = field.replace('adress.', '');
            const isTouched = Object.keys(touched.adress).find(touchedKeys => touchedKeys === key);
            const isError = Object.keys(errors.adress).find(touchedKeys => touchedKeys === key)
            if (!isTouched) {
                return
            }
            if (isTouched && isError) {
                return errors.adress[key]
            }
        } else {
            const isTouched = Object.keys(touched).find(touchedKeys => touchedKeys === field);
            const isError = Object.keys(errors).find(touchedKeys => touchedKeys === field)
            if (isTouched && isError) {
                return errors[field]
            }
        }
        return
    }
    return <Field
        name={name}>
        {({ field, form: { touched, errors } }: any) => {
            const error = handleErrors(errors, touched, field.name)
            return (
                <div>
                    <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <input {...field} type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mt-1 pt-2 pb-1" />
                    {error && <span className="block text-red-500 text-xs">{error}</span>}
                </div>
            )
        }}
    </Field>
}