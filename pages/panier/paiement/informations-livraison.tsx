import { useSelector } from 'react-redux'
import lang from '../../../lang/fr.json'
import { ReduxStore } from '@/store/store'
import { Field, Form, Formik } from 'formik'
import { UserInformations } from '@/types/base'
import { BillingInformationsSchema } from '@/validation/checkout'
import FormkikTextInput from '@/components/FormikTextInput'

export default function Example() {
  return (
    <>
      <section
        aria-labelledby="payment-heading"
        className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
      >
        <h2 id="payment-heading" className="sr-only">
          Payment and shipping details
        </h2>
        <BillingForm />
        {/* <form className="mt-6">
              <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                <div className="col-span-full">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email-address"
                      autoComplete="email"
                      
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="name-on-card"
                      autoComplete="cc-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      autoComplete="cc-number"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-8 sm:col-span-9">
                  <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expiration-date"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="region"
                      name="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="col-span-full sm:col-span-4">
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-2">
                <div className="flex h-5 items-center">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                  Billing address is the same as shipping address
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {lang.checkout.order.continue}
              </button>

              
            </form> */}
      </section>
    </>
  )
}

export const BillingForm = () => {
  const handleSubmit = (values: UserInformations) => {
    console.log(values);

  }
  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        adress: {
          city: "",
          country: "",
          email: "",
          phone: "",
          street: "",
          zip: ""
        }
      }}
      validationSchema={BillingInformationsSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <Form className="mt-6 grid grid-cols-12 gap-x-4 gap-y-6">
            <div className="col-span-6">
              <FormkikTextInput label={lang.forms.checkout.label.firstname} />
            </div>
            <div className="col-span-6">
              <FormkikTextInput label={lang.forms.checkout.label.lastname} />
            </div>
            <div className="col-span-full">
              <FormkikTextInput label={lang.forms.checkout.label.email} />
            </div>
            <div className="col-span-full">
              <FormkikTextInput label={lang.forms.checkout.label.phone} />
            </div>
            <div className="col-span-full">
              <button type="submit">Submit</button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}


