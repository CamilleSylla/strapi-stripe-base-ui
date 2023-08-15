import lang from '../../../lang/fr.json'
import { Form, Formik, FormikProps } from 'formik'
import { UserInformations } from '@/types/base'
import { BillingInformationsSchema } from '@/validation/checkout'
import FormkikTextInput from '@/components/FormikTextInput'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { addBillingAdress, addShippingAdress } from '@/store/paymentSlice'
import { useDispatch } from 'react-redux'

export default function Example() {
  const dispatch = useDispatch()
  const [sameAdresses, setSameAdresses] = useState<boolean>(true)
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    adress: {
      city: "",
      country: "",
      street: "",
      zip: ""
    }
  };
  const billingRef = useRef<FormikProps<typeof initialValues> | undefined>();
  const shippingRef = useRef<FormikProps<typeof initialValues> | undefined>();

  const handleBillingSubmit = (values: UserInformations) => {
    if (sameAdresses) {
      dispatch(addShippingAdress(values))
      dispatch(addBillingAdress(values))
    } else {
      dispatch(addBillingAdress(values))
    }
  }

  const handleShippingSubmit = (values: UserInformations) => {
    addShippingAdress(values)

  }

  const submitForms = () => {
    if (sameAdresses) {
      billingRef.current?.handleSubmit()
    } else {
      billingRef.current?.handleSubmit()
      shippingRef.current?.handleSubmit()
    }
  }
  return (
    <>
      <section
        aria-labelledby="payment-heading"
        className="flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
      >
        <h2 id="payment-heading" className="sr-only">
          Payment and shipping details
        </h2>
        <>
    <div className=' space-y-5'>
      <Formik
        initialValues={initialValues}
        innerRef={(instance) => {
          billingRef.current = instance;
        }}
        validationSchema={BillingInformationsSchema}
        onSubmit={handleBillingSubmit}
      >
        {() => {
          return (
            <>
              <Form className="mt-6 grid grid-cols-12 gap-x-4 gap-y-6">
              <h3 className='col-span-full text-lg font-medium text-gray-900'>
                  {lang.forms.checkout.titles.billing}
                </h3>
                <div className="col-span-6">
                  <FormkikTextInput name='firstname' label={lang.forms.checkout.label.firstname} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='lastname' label={lang.forms.checkout.label.lastname} />
                </div>
                <div className="col-span-full">
                  <FormkikTextInput name='email' label={lang.forms.checkout.label.email} />
                </div>
                <div className="col-span-full">
                  <FormkikTextInput name='phone' label={lang.forms.checkout.label.phone} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.street' label={lang.forms.checkout.label.street} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.city' label={lang.forms.checkout.label.city} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.zip' label={lang.forms.checkout.label.zip} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.country' label={lang.forms.checkout.label.country} />
                </div>

              </Form>
            </>
          )
        }}
      </Formik>
      {!sameAdresses && <Formik
        initialValues={initialValues}
        innerRef={(instance) => {
          shippingRef.current = instance;
        }}
        validationSchema={BillingInformationsSchema}
        onSubmit={handleShippingSubmit}
      >
        {() => {
          return (
            <>
              <Form className="mt-6 grid grid-cols-12 gap-x-4 gap-y-6">
              <h3 className='col-span-full text-lg font-medium text-gray-900 pt-5'>
                  {lang.forms.checkout.titles.shipping}
                </h3>
                <div className="col-span-6">
                  <FormkikTextInput name='firstname' label={lang.forms.checkout.label.firstname} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='lastname' label={lang.forms.checkout.label.lastname} />
                </div>
                <div className="col-span-full">
                  <FormkikTextInput name='email' label={lang.forms.checkout.label.email} />
                </div>
                <div className="col-span-full">
                  <FormkikTextInput name='phone' label={lang.forms.checkout.label.phone} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.street' label={lang.forms.checkout.label.street} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.city' label={lang.forms.checkout.label.city} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.zip' label={lang.forms.checkout.label.zip} />
                </div>
                <div className="col-span-6">
                  <FormkikTextInput name='adress.country' label={lang.forms.checkout.label.country} />
                </div>

              </Form>
            </>
          )
        }}
      </Formik>}
    </div>

      <div className="mt-6 flex space-x-2 py-3">
        <div className="flex h-5 items-center">
          <input
            id="same-as-shipping"
            name="same-as-shipping"
            type="checkbox"
            defaultChecked
            onClick={e => setSameAdresses(e.currentTarget.checked)}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
          {lang.forms.checkout.informations}
        </label>
      </div>
      <button className="col-span-full" type='submit' onClick={submitForms}>Submit</button>
    </>
      </section>
    </>
  )
}




