/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreatePaymentIntentMutation } from "../../redux/api/gatewayApi";
import Toast from "../../utils/Toast";
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";

// Load your Stripe public key (replace with your own)
const stripePromise = loadStripe(
  "pk_test_51Ls9jVGslqmvXzFItLmpBXHrEo6T9744iSs0GnDuK92J6daEfjjMPsTYMO7MIwat0J2xARZLaIEUnAvCPzWaMLzU00FQ9kNlVm"
);

// Define the form data structure
interface FormData {
  amount: string;
  bonusCode: string; // Added bonusCode to the form data structure
}

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { amount: totalCost } = useParams<{ amount: string }>();
  console.log(totalCost);
  const [formData, setFormData] = useState<FormData>({
    amount: "100",
    bonusCode: "",
  }); // Initialize bonusCode
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const bonus = useAppSelector((state) => state.bikesInfo.bonus);

  const [createPaymentIntent, { isLoading: createIntentLoading, isError }] =
    useCreatePaymentIntentMutation();

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData({ ...formData, [name]: value }); // Update form data
  };

  if (isError) {
    Toast({ message: "Something went wrong", status: "error" });
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Call createPaymentIntent before proceeding with payment
    try {
      const response = await createPaymentIntent({
        price: Number(formData.amount),
      }).unwrap();

      if (response) {
        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          setError("Card details are required.");
          setLoading(false);
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
          setLoading(false);
          Toast({ message: cardError.message as string, status: "error" });
        } else {
          setError(null);
          setLoading(false);
          Toast({ message: "Payment method created.", status: "success" });
        }
      }
    } catch (err: any) {
      setError("Failed to create payment intent. Please try again.");
      setLoading(false);
      Toast({ message: "Failed to create payment intent.", status: "error" });
    }
  };

  let amountAfterDiscount;

  if (formData.bonusCode === "DISCOUNT20") {
    amountAfterDiscount = Number(totalCost) * 0.8; // 20% discount
  } else if (formData.bonusCode === "DISCOUNT10") {
    amountAfterDiscount = Number(totalCost) * 0.9; // 10% discount
  } else if (formData.bonusCode === "DISCOUNT30") {
    amountAfterDiscount = Number(totalCost) * 0.7; // 30% discount
  } else {
    amountAfterDiscount = Number(totalCost);
  }

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-50 bg-slate-700 px-4">
      <div className="max-w-md w-full dark:bg-gray-50 bg-slate-700 px-4 shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-6 text-green-700 text-center">
          Payment
        </h3>

        {/* Bonus Code Section */}
        {bonus && (
          <div className="dark:bg-gray-50 bg-slate-700  border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-semibold">Bonus Code:</p>
            <p>{bonus.code}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Accepted Cards
            </p>
            <div className="flex space-x-4 ">
              <img
                src="https://i.ibb.co.com/xLNQq3Y/card1.png"
                alt="Card 1"
                className="w-20 transition-transform transform hover:scale-110"
              />
              <img
                src="https://i.ibb.co.com/YThSqw4/card2.png"
                alt="Card 2"
                className="w-16 transition-transform transform hover:scale-110"
              />
            </div>
          </div>
          {/* Promo Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Promo Code
            </label>
            <input
              type="text"
              name="bonusCode"
              value={formData.bonusCode}
              onChange={handleInputChange}
              placeholder="Enter promo code if any"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              disabled
              value={Math.floor(amountAfterDiscount)}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
          </div>

          {/* Card Element */}
          <CardElement
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  lineHeight: "24px",
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading || createIntentLoading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading || createIntentLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 transition"
            }`}
          >
            {loading || createIntentLoading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

const SinglePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default SinglePayment;
