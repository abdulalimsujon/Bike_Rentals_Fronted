import { useNavigate } from "react-router-dom";
import CustomButton from "../components/form/CustomButton"; // Assuming you have a CustomButton component

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-500 dark:text-green-300">
          404
        </h1>
        <h2 className="mt-4 text-4xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <CustomButton
          onClick={handleGoHome}
          className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Go to Homepage
        </CustomButton>
      </div>
    </div>
  );
};

export default NotFound;
