/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Layout, Button, Spin, Input, Form } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { useUpdateUserProfileMutation } from "../redux/api/userApi/userApi";
import Toast from "../utils/Toast";
import { useGetMeQuery } from "../redux/api/authApi/authApi";

const { Content } = Layout;

export interface userType {
  name: string;
  email: string;
  phone?: string; // optional field
  address?: string; // optional field
  image?: string; // optional field to avoid undefined errors
  role: string;
}

// Define props type for components
export interface UserProps {
  user?: userType; // User object might be undefined initially
  onSubmit?: () => void; // Optional for EditProfile
}

// Custom Profile Component with Tailwind CSS styling
const Profile: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="bg-gray-50 mx-auto border border-gray-200 p-10 w-full max-w-[700px]">
      <div className="mx-auto object-cover -mt-24 pt-10 flex justify-center">
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48"
          src={user?.image}
          alt="User"
        />
      </div>
      <div className="pt-3">
        <h1 className="w-full bg-gray-100 py-2 text-center text-sm sm:text-base">
          User Name: {user?.name}
        </h1>
      </div>
      <div className="pt-3">
        <h1 className="w-full bg-gray-100 py-2 text-center text-sm sm:text-base">
          Email: {user?.email}
        </h1>
      </div>
      <div className="pt-3">
        <h1 className="w-full bg-gray-100 py-2 text-center text-sm sm:text-base">
          Phone: {user?.phone}
        </h1>
      </div>
      <div className="pt-3">
        <h1 className="w-full bg-gray-100 py-2 text-center text-sm sm:text-base">
          Address: {user?.address}
        </h1>
      </div>
    </div>
  );
};

interface EditProfileProps {
  user?: userType;
  onSubmit?: () => void; // Making onSubmit optional
}

// Custom Edit Profile Component with Form and validation rules
const EditProfile: React.FC<EditProfileProps> = ({ user, onSubmit }) => {
  const [updateUserProfile, { isLoading: updating }] =
    useUpdateUserProfileMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values: userType) => {
    // Compare the form values with the initial values
    const currentValues = form.getFieldsValue();
    const areValuesSame =
      currentValues.name === user?.name &&
      currentValues.email === user?.email &&
      currentValues.phone === user?.phone &&
      currentValues.address === user?.address;

    if (areValuesSame) {
      Toast({
        message:
          "No changes detected. Please update some fields before submitting.",
        status: "error",
      });
      return;
    }

    try {
      await updateUserProfile(values).unwrap();
      Toast({ message: "Profile updated successfully", status: "success" });
      if (onSubmit) {
        onSubmit();
      }
    } catch (error: any) {
      Toast({
        message: error?.data?.message || "Update failed",
        status: "error",
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.address || "",
      }}
      onFinish={handleFinish}
      className="max-w-3xl w-full mx-auto dark:bg-slate-50 bg-slate-700 shadow-lg rounded-xl p-8 text-green-300"
    >
      {/* Name Input with Validation */}
      <Form.Item
        label="Full Name"
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { min: 2, message: "Name must be at least 2 characters long" },
        ]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>

      {/* Email Input with Validation */}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      {/* Phone Input with Validation */}
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          { required: true, message: "Please input your phone number!" },
          {
            pattern: /^\d{11}$/,
            message: "Phone number must be 11 digits",
          },
        ]}
      >
        <Input placeholder="Enter your phone number" />
      </Form.Item>

      {/* Address Input with Validation */}
      <Form.Item
        label="Address"
        name="address"
        rules={[
          { required: true, message: "Please input your address!" },
          { min: 5, message: "Address must be at least 5 characters long" },
        ]}
      >
        <Input placeholder="Enter your address" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className=" w-full bg-green-700 hover:bg-green-600 text-white"
          loading={updating}
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

const Dashboard: React.FC = () => {
  const { data: userData, isLoading, refetch } = useGetMeQuery(undefined); // Add correct typing
  const [current, setCurrent] = useState<string>("profile");

  const handleButtonClick = (key: string) => {
    setCurrent(key);
  };

  const handleProfileUpdate = () => {
    refetch(); // Refetch user data to show the updated profile
    setCurrent("profile"); // Switch back to profile view
  };

  const renderContent = () => {
    switch (current) {
      case "edit":
        return (
          <EditProfile user={userData?.data} onSubmit={handleProfileUpdate} />
        );
      case "profile":
      default:
        return <Profile user={userData?.data} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin tip="Loading..." />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen dark:bg-slate-50 bg-gray-700">
      <Layout className="flex flex-col items-center justify-center p-6 dark:bg-slate-50 bg-gray-400 mt-10">
        {/* Buttons for switching between Profile and Edit */}
        <div className="mb-8 space-x-4">
          <Button
            type={current === "profile" ? "primary" : "default"}
            icon={<UserOutlined />}
            onClick={() => handleButtonClick("profile")}
            className=" text-white rounded-md hover:bg-green-300 bg-green-600 hover:text-white focus:bg-green-600 focus:text-white transition-colors duration-300"
          >
            Profile
          </Button>
          <Button
            type={current === "edit" ? "primary" : "default"}
            icon={<EditOutlined />}
            onClick={() => handleButtonClick("edit")}
            className=" text-white rounded-md hover:bg-green-300 bg-green-600 hover:text-white focus:bg-green-600 focus:text-white transition-colors duration-300"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile or Edit Form based on state */}
        <Content>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
