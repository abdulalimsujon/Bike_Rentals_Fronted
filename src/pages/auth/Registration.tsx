import { Button, Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegistrationMutation } from "../../redux/features/authApi/authApi";

const Registration = () => {
  const [registration, { isLoading, isSuccess }] = useRegistrationMutation();
  const navigate = useNavigate();

  // State for handling the image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    // Append the image file to FormData
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await registration(formData).unwrap(); // Send FormData to the API
      toast.success("User registered successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handling file change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  if (isLoading) {
    return <Spin>Loading...</Spin>;
  }

  if (isSuccess) {
    toast.success("Successfully registered");
    navigate("/user/dashboard");
    return null;
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
          />
          <BRInput type="text" name="phone" label="Phone" className="w-96" />
          <BRInput
            type="text"
            name="address"
            label="Address"
            className="w-96"
          />
          <BRInput
            type="file"
            name="image"
            label="Image"
            className="w-96"
            onChange={handleFileChange} // Handle file input changes
          />
          <div className="flex justify-center items-center w-96">
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
