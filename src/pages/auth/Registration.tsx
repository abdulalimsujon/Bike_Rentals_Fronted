import { Button, Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";
import { useRegistrationMutation } from "../../redux/features/authApi/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [registration, { isLoading, isError, isSuccess }] =
    useRegistrationMutation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registration(data).unwrap();
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (isLoading) {
    <Spin>Loading...</Spin>;
  }

  if (isSuccess) {
    toast.success("successfulyy registered");
    navigate("/user/dashboard");
  }
  return (
    <div className="flex justify-center items-center mt-16">
      <div className="p-6 border bg-slate-100">
        <h1 className="text-center">Registration</h1>
        <BrForm onSubmit={onSubmit}>
          <BRInput type="text" name="name" label="User Name" className="w-96" />
          <BRInput type="text" name="email" label="Email" className="w-96" />
          <BRInput
            type="password"
            name="password"
            label="Password"
            className="w-96"
          />{" "}
          {/* Fixed the typo */}
          <BRInput type="text" name="phone" label="Phone" className="w-96" />
          <BRInput
            type="text"
            name="address"
            label="Address"
            className="w-96"
          />
          <div className="flex justify-center items-center w-96 ">
            <Button htmlType="submit" loading={isLoading}>
              Register
            </Button>
          </div>
        </BrForm>
      </div>
    </div>
  );
};

export default Registration;
