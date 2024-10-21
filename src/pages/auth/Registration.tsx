import { Spin } from "antd";
import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegistrationMutation } from "../../redux/api/authApi/authApi";
import { userType } from "../../Type/UserType";
import { TErrorResponse } from "../../Type/ErrorTypes";
import Toast from "../../utils/Toast";

const Registration = () => {
  const [registration, { isLoading, isSuccess }] = useRegistrationMutation();
  const navigate = useNavigate();

  // State for handling the image file
  const [imageFile, setImageFile] = useState<File | null>(null);

  const onSubmit = async (data: userType) => {
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("name", data.name || "");
    formData.append("email", data.email || "");
    formData.append("password", data.password || "");
    formData.append("phone", data.phone || "");
    formData.append("address", data.address || "");

    // Append the image file to FormData only if it exists
    if (imageFile) {
      formData.append("image", imageFile); // Append image if it's not null
    }

    try {
      await registration(formData).unwrap(); // Send FormData to the API
      toast.success("User registered successfully");
    } catch (error) {
      const errorResponse = error as TErrorResponse;

      const errorMessages = errorResponse?.data?.errorSources
        ?.map((err) => `${err.path}: ${err.message}`)
        .join(", ");

      Toast({
        message: errorMessages,
        status: "error",
      });
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
    navigate("/login");
    return null;
  }

  return (
    <div className="flex justify-center items-center  max-h-screen pt-6 ">
      <div className="p-6 border  rounded-md">
        <h1 className="text-center text-3xl  text-bold text-green-500">
          Registration
        </h1>
        <BrForm onSubmit={onSubmit}>
          <BRInput
            type="text"
            name="name"
            label="User Name"
            className="w-96 border-green-500 "
          />
          <BRInput
            type="text"
            name="email"
            label="Email"
            className="w-96 border-green-500"
          />
          <BRInput
            type="password"
            name="password"
            label="Password"
            className="w-96  border-green-500"
          />
          <BRInput
            type="text"
            name="phone"
            label="Phone"
            className="w-96 border-green-500"
          />
          <BRInput
            type="text"
            name="address"
            label="Address"
            className="w-96 border-green-500"
          />
          <BRInput
            type="file"
            name="image"
            label="Image"
            className="w-96 border-green-500"
            onChange={handleFileChange} // Handle file input changes
          />
          <div className="flex justify-center items-center w-96">
            <button
              className="w-full rounded-md py-2   bg-green-500 hover:bg-green-300 focus:border-green-700 focus:ring focus:ring-green-500   "
              type="submit"
            >
              Register
            </button>
          </div>
        </BrForm>
        <div className="pr-5 text-center">
          <span>Already have an account ? </span>
          <a className="text-red-700" href="/login">
            login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration;
