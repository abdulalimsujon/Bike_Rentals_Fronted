/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Toast from "../../utils/Toast";
import { useCreatePaymentIntentMutation } from "../../redux/api/gatewayApi";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import { useParams } from "react-router-dom";

const SinglePayment = () => {
  const stripePromise = loadStripe(
    "pk_test_51Ls9jVGslqmvXzFItLmpBXHrEo6T9744iSs0GnDuK92J6daEfjjMPsTYMO7MIwat0J2xARZLaIEUnAvCPzWaMLzU00FQ9kNlVm"
  );

  const PaymentForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [createPaymentIntent, { isLoading: createIntentLoading }] =
      useCreatePaymentIntentMutation();

    // Get 'amount' from URL parameters
    const { amount } = useParams<{ amount: string }>();
    const parsedAmount = Number(amount); // Convert to number

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Invalid amount provided.");
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!stripe || !elements || !parsedAmount) {
        return;
      }

      // Call createPaymentIntent before proceeding with payment
      try {
        const response = await createPaymentIntent({
          price: parsedAmount,
        }).unwrap();

        if (response) {
          const cardElement = elements.getElement(CardElement);

          if (!cardElement) {
            setError("Card details are required.");
            Toast({ message: "Card details are missing.", status: "error" });
            return;
          }

          const { error: cardError } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });

          if (cardError) {
            setError(
              cardError.message ||
                "An error occurred while creating the payment method."
            );
            Toast({ message: cardError.message as string, status: "error" });
          } else {
            setError(null);
            Toast({ message: "Payment method created.", status: "success" });
          }
        }
      } catch (err: any) {
        setError("Failed to create payment intent. Please try again.");
        Toast({ message: "Failed to create payment intent.", status: "error" });
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg">
          <div className="rounded-lg shadow-md p-6 bg-green-200 dark:bg-slate-50">
            <h3 className="text-2xl font-semibold mb-6 text-green-700">
              Payment
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Accepted Cards */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Accepted Cards
                </p>
                <div className="flex space-x-4">
                  <img
                    src={card1}
                    alt="Card 1"
                    className="w-20 transition-transform transform hover:scale-110"
                  />
                  <img
                    src={card2}
                    alt="Card 2"
                    className="w-16 transition-transform transform hover:scale-110"
                  />
                </div>
              </div>
              {/* Amount Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  value={parsedAmount}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                />
              </div>
              {/* Card Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
              {/* Error Message */}
              {error && <div className="text-red-500 mt-2">{error}</div>}
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!stripe || createIntentLoading}
                className="w-full mt-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              >
                {createIntentLoading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default SinglePayment;
