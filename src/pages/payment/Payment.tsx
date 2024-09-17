/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";

import { useCreatePaymentIntentMutation } from "../../redux/features/gatewayApi";
import Toast from "../../utils/Toast";

// Load your Stripe public key (replace with your own)
const stripePromise = loadStripe(
  "pk_test_51Ls9jVGslqmvXzFItLmpBXHrEo6T9744iSs0GnDuK92J6daEfjjMPsTYMO7MIwat0J2xARZLaIEUnAvCPzWaMLzU00FQ9kNlVm"
);

// Define the form data structure
interface FormData {
  amount: string;
}

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState<FormData>({ amount: "100" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [createPaymentIntent, { isLoading, isError }] =
    useCreatePaymentIntentMutation();

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Validate the amount
    if (Number(formData?.amount) < 100) {
      Toast({ message: "Amount must be at least 100", status: "error" });
      setLoading(false);
      return;
    }

    // Call createPaymentIntent before proceeding with payment
    try {
      const response = await createPaymentIntent({
        price: Number(formData?.amount),
      }).unwrap();

      if (response) {
        Toast({
          message: "Payment intent created successfull.",
          status: "success",
        });

        // Proceed with card payment after getting payment intent
        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          setError("Card details are required.");
          setLoading(false);
          Toast({ message: "Card details are missing.", status: "error" });
          return;
        }

        const { error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          setError(
            error.message ||
              "An error occurred while creating the payment method."
          );
          setLoading(false);
          Toast({ message: error.message as string, status: "error" });
        } else {
          setError(null);
          setLoading(false);
          Toast({ message: "Payment method created.", status: "success" });
        }
      }
    } catch (err) {
      setError("Failed to create payment intent. Please try again.");
      setLoading(false);
      Toast({ message: "Failed to create payment intent.", status: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Payment Section */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-gray-800 text-2xl font-semibold mb-6">Payment</h3>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-medium text-gray-700">Accepted Card</p>
            <div className="flex space-x-4 mt-2">
              <img
                src={card1}
                alt="Card 1"
                className="w-24 transition-transform transform hover:scale-110"
              />
              <img
                src={card2}
                alt="Card 2"
                className="w-12 transition-transform transform hover:scale-110"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Details
            </label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || loading || isLoading}
            className="w-full mt-12 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          >
            {loading || isLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
          {isError && (
            <div className="text-red-500">Failed to process payment.</div>
          )}
        </form>
      </div>
    </div>
  );
};

const Payment: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
