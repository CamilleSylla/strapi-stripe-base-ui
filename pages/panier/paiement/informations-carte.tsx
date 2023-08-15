import CheckoutForm from "@/components/StripeCheckoutForm";
import { ReduxStore } from "@/store/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { useSelector } from "react-redux";
const stripePromise = loadStripe("pk_test_51IdIpGK4nxvHzGd7PPwo7Z8f3uPpFxRLGPt3wfGaSC3SZyuBNd6BtIAt63Ynuas6ycK3FN9pGClQZKImvYxx96vW00RXQYDtuM");

export default function InformationCardPage () {
  const {client_secret} = useSelector((state: ReduxStore) => state.payment.payment_intent)
      const clientSecret = useMemo(() => {
        return client_secret
      }, [client_secret])
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
          <div>
            {clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
      )
}
