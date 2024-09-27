/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Layout, Button, Spin, Input, Form } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";

import { useUpdateUserProfileMutation } from "../redux/api/userApi/userApi";
import Toast from "../utils/Toast";
import { useGetMeQuery } from "../redux/api/authApi/authApi";

const { Header, Content } = Layout;

export interface userType {
  name: string;
  email: string;
  phone?: string; // optional field
  address?: string; // optional field
  image: string;
  role: string;
}

// Define props type for components
export interface UserProps {
  user: userType;
  onSubmit?: () => void; // Optional for EditProfile
}

// Custom Profile Component with Tailwind CSS styling
const Profile: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="max-w-3xl w-full mx-auto  shadow-lg rounded-xl p-8 dark:bg-white   bg-slate-200 ">
      <div className="text-center">
        <div className="mx-auto w-24 h-24 bg-green-500 text-white flex items-center justify-center rounded-full">
          {user.image ? (
            <img
              src={user.image}
              alt="User"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-center">No Image</span> // Display text or placeholder when no image is available
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {user?.name || "John Doe"}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          {user?.email || "johndoe@example.com"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {user?.role || "johndoe@example.com"}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600 font-semibold">Full Name:</span>
          <span className="text-gray-800">{user?.name || "John Doe"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600 font-semibold">Phone Number:</span>
          <span className="text-gray-800">
            {user?.phone || "+1 234 567 890"}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600 font-semibold">Address:</span>
          <span className="text-gray-800">
            {user?.address || "1234 Main St, Springfield, USA"}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600 font-semibold">Role:</span>
          <span className="text-gray-800">
            {user?.role || "1234 Main St, Springfield, USA"}
          </span>
        </div>
      </div>
    </div>
  );
};

interface EditProfileProps {
  user: userType;
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
    <Layout className="min-h-screen dark:bg-slate-50 bg-gray-700  ">
      {/* Header */}
      <Header className="bg-green-700 text-bold text-white sticky">
        <div className="text-center">
          Welcome to {userData?.data?.name}' Bike Rental
        </div>
      </Header>

      {/* Body */}
      <Layout className="flex flex-col items-center justify-center p-6 dark:bg-slate-50 bg-gray-700">
        {/* Buttons for switching between Profile and Edit */}
        <div className="mb-8 space-x-4">
          <Button
            type={current === "profile" ? "primary" : "default"}
            icon={<UserOutlined />}
            onClick={() => handleButtonClick("profile")}
            className="text-gray-800 bg-gray-200 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white transition-colors duration-300"
          >
            Profile
          </Button>
          <Button
            type={current === "edit" ? "primary" : "default"}
            icon={<EditOutlined />}
            onClick={() => handleButtonClick("edit")}
            className="text-gray-800 bg-gray-200 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white transition-colors duration-300"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile content or edit form */}
        <Content className="flex-1 w-full flex items-center justify-center">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
