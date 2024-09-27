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

import { useCreatePaymentIntentMutation } from "../../redux/api/gatewayApi";
import Toast from "../../utils/Toast";
import { useAppSelector } from "../../redux/hooks";
import {
  useCreateRentalBikeMutation,
  useSingleBikeQuery,
} from "../../redux/api/bikes/bikeApi";
import { ErrorTypes } from "../../Type/ErrorTypes";
import { selectCurrentUser } from "../../redux/features/authSlice";

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
  const user = useAppSelector(selectCurrentUser);

  const [createPaymentIntent, { isLoading: createIntentLoading, isError }] =
    useCreatePaymentIntentMutation();
  const [
    CreateRentalBike,
    { error: rentalError, isError: isRentalError, isSuccess },
  ] = useCreateRentalBikeMutation();
  const periodWithRentalBike = useAppSelector((state) => state.rent);
  const id = periodWithRentalBike[0]?._id;
  const startTime = periodWithRentalBike[0]?.startTime;
  const formattedStartTime = new Date(startTime).toLocaleString();

  const { data, refetch } = useSingleBikeQuery(id);

  const { name, pricePerHour, image } = data?.data || {};

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isRentalError) {
    console.log(rentalError);
    Toast({
      message: (rentalError as ErrorTypes).data?.message,
      status: "error",
    });
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Validate the amount
    if (Number(formData.amount) < 100) {
      Toast({ message: "Amount must be at least 100", status: "error" });
      setLoading(false);
      return;
    }

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

          // On successful payment, rent the bike
          await CreateRentalBike({
            payload: periodWithRentalBike,
            price: Number(formData.amount),
            userId: user?.userId,
          });
        }
        refetch();
      }
    } catch (err) {
      setError("Failed to create payment intent. Please try again.");
      setLoading(false);
      Toast({ message: "Failed to create payment intent.", status: "error" });
    }
  };

  if (isError) {
    Toast({ message: "something went wrong", status: "error" });
  }

  if (isSuccess) {
    Toast({ message: "bike is rented successfully", status: "success" });
  }

  return (
    <div className="container mx-auto pt-20  px-4 sm:px-6 lg:px-8 h-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Bike Information */}
        <div className="bg-gradient-to-r bg-green-200 dark:bg-slate-50  shadow-xl p-6 flex flex-col items-center">
          <div className="w-full flex justify-center mb-4">
            <img
              src={image}
              alt={name}
              className="h-60 w-auto rounded-lg shadow-lg border border-gray-200"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            <p className="text-lg text-green-700">
              Price Per Hour:{" "}
              <span className="font-semibold">${pricePerHour}</span>
            </p>
            <h3>Rent start Time: {formattedStartTime}</h3>
          </div>
        </div>

        {/* Payment Form */}
        <div className=" rounded-lg shadow-md p-6 bg-green-200 dark:bg-slate-50">
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
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              disabled={!stripe || loading || createIntentLoading}
              className="w-full mt-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              {loading || createIntentLoading
                ? "Processing..."
                : "Proceed to Checkout"}
            </button>
            {/* General Error Message */}
            {isError && (
              <div className="text-red-500 mt-2">
                Failed to process payment.
              </div>
            )}
          </form>
        </div>
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
