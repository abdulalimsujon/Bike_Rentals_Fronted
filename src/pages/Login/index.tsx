import { Button, Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/authApi/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { SubmitHandler } from "react-hook-form";
import Toast from "../../utils/Toast";

// Define form values interface
interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [login, { data, isLoading, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const token = res?.data?.token;

      // Decode the token and cast it to the custom interface
      const user = verifyToken(token);

      // Dispatch the user and token to Redux
      dispatch(setUser({ user, token }));

      // Navigate based on the user's role
      navigate(`/${user.role}/dashboard`);
      Toast({ message: "user successfully logged In", status: "success" });
    } catch (error) {
      Toast({ message: error?.data?.message, status: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="p-6 border bg-slate-100">
        <h1 className="text-center">Login</h1>
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
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Login
              </Button>
            </div>
          </BrForm>
        )}
        {isError && (
          <div className="mt-4 text-center text-red-500">
            <p>Login failed. Please check your credentials.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
