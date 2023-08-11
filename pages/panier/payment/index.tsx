import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../../components/StripeCheckoutForm";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { CardInfos } from "@/types/base";
import CartLayout from "@/components/layouts/CheckoutLayout";
import CheckoutLayout from "@/components/layouts/CheckoutLayout";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51IdIpGK4nxvHzGd7PPwo7Z8f3uPpFxRLGPt3wfGaSC3SZyuBNd6BtIAt63Ynuas6ycK3FN9pGClQZKImvYxx96vW00RXQYDtuM");

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("pi_3Nb8ErK4nxvHzGd70IlaIpxU_secret_VMd3gdWppBJERt2NoDLeHzXvH");
  // useEffect(() => {
  //     // Create PaymentIntent as soon as the page loads
  //     fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setClientSecret(data.clientSecret));
  //   }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <CheckoutLayout>
      <div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </CheckoutLayout>
  )
}

const CardInfo = () => {
  const initialValues: CardInfos = { cvc: null, owner: "" };
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="owner">First Name</label>
          <Field id="owner" name="owner" placeholder="Jean Dupont" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}