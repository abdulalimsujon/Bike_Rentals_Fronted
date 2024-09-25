/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { SubmitHandler } from "react-hook-form";
import Toast from "../../utils/Toast";
import { useAppSelector } from "../../redux/hooks";

interface LoginFormValues {
  email: string;
  password: string;
}

interface ErrorResponse {
  data: {
    errorSources: { path: string; message: string }[];
  };
}

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = useAppSelector((state) => state.bikesInfo.selectItem);

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
      const errorResponse = error as ErrorResponse;

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
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100 overflow-hidden">
      <div className="p-6 border bg-green-200 shadow-lg rounded">
        <h1 className="text-center mb-4">Login</h1>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <BrForm onSubmit={onSubmit}>
            <BRInput type="text" name="email" label="Email" className="w-96" />
            <BRInput
              type="password"
              name="password"
              label="Password"
              className="w-96"
            />
            <div className="flex justify-center items-center mt-4">
              <div className="pr-5">
                <span>New to Bike Rentals? </span>
                <a className="text-red-700" href="/registration">
                  Registration
                </a>
              </div>

              <Button htmlType="submit" type="primary" loading={isLoading}>
                Login
              </Button>
            </div>
          </BrForm>
        )}
      </div>
    </div>
  );
};

export default Login;
