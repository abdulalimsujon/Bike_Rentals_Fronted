/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { SubmitHandler } from "react-hook-form";
import Toast from "../../utils/Toast";
import { TErrorResponse } from "../../Type/ErrorTypes";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    try {
      // Unwrap the response to handle it properly
      const res = await login(formData).unwrap();
      const token = res?.data?.token;

      // Decode the token to extract the user information
      const user = verifyToken(token);

      // Dispatch user and token to Redux store
      dispatch(setUser({ user, token }));

      //  Navigate based on the user's role
      navigate(`/${user.role}/dashboard`);

      Toast({ message: "User successfully logged in", status: "success" });
    } catch (error: any) {
      const errorResponse = error as TErrorResponse;

      const errorMessages = errorResponse?.data?.errorSources
        ?.map((err) => `${err?.path}: ${err?.message}`)
        .join(", ");

      Toast({
        message: errorMessages,
        status: "error",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-100 overflow-hidden px-4">
      <div className="p-6 border shadow-lg rounded-lg mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h1 className="text-center text-3xl text-bold text-green-500 ">
          Login
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <BrForm onSubmit={onSubmit}>
            <BRInput
              type="text"
              name="email"
              label="Email"
              className="w-full border-green-500"
            />
            <BRInput
              type="password"
              name="password"
              label="Password"
              className="w-full border-green-500"
            />
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
              <button
                className="w-full rounded-md py-2 bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
              <div className="pr-0 sm:pr-5 mb-2 sm:mb-0">
                <span>New to Bike Rentals? </span>
                <span
                  className="text-red-700 cursor-pointer"
                  onClick={() => navigate("/registration")}
                >
                  Registration
                </span>
              </div>
            </div>
          </BrForm>
        )}
      </div>
    </div>
  );
};

export default Login;
