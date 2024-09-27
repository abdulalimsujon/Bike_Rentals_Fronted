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
import CustomButton from "../../components/form/CustomButton";
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
        ?.map((err) => `${err.path}: ${err.message}`)
        .join(", ");

      Toast({
        message:
          errorMessages || "Login failed. Please check your credentials.",
        status: "error",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-100 overflow-hidden px-4">
      <div className="p-6 border bg-green-200 shadow-lg rounded-lg mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h1 className="text-center mb-4 text-xl md:text-2xl font-semibold">
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
              className="w-full"
            />
            <BRInput
              type="password"
              name="password"
              label="Password"
              className="w-full"
            />
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
              <div className="pr-0 sm:pr-5 mb-2 sm:mb-0">
                <span>New to Bike Rentals? </span>
                <a className="text-red-700" href="/registration">
                  Registration
                </a>
              </div>

              <CustomButton
                htmlType="submit"
                type="primary"
                loading={isLoading}
                className="w-full sm:w-auto"
              >
                Login
              </CustomButton>
            </div>
          </BrForm>
        )}
      </div>
    </div>
  );
};

export default Login;
