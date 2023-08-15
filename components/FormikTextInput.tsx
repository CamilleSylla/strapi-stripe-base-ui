import { Field } from "formik";

export default function FormkikTextInput ({label}: {label: string}) {
    // return (
    //     <div>
    //         <label htmlFor={label} className="block text-sm font-medium text-gray-700">
    //             {label}
    //         </label>
    //                 <input
    //                   type="email"
    //                   id={label}
    //                   name={label}
    //                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mt-1"
    //                 />
    //     </div>
    // )
    return <Field
    name={label}>
        {({ field, form: { touched, errors } }: any) => (
      <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                 {label}
        </label>
        <input {...field} type="text" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mt-1"/>
        {touched[field.name] &&
          errors[field.name] && <div className="error">{errors[field.name]}</div>}
      </div>
    )}
    </Field>
}