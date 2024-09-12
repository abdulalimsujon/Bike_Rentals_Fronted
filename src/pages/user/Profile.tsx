import { Layout, Card, Typography, Button, Spin, Image } from "antd";
import { useState } from "react";
import { useGetMeQuery } from "../../redux/features/authApi/authApi";

import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";
import { useUpdateUserProfileMutation } from "../../redux/features/userApi/userApi";

const { Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  console.log(data);

  if (isLoading) {
    <Spin>...loading</Spin>;
  }

  // Example user data (replace with actual data)
  const user = {
    name: data?.data?.name,
    email: data?.data?.email,
    phone: data?.data?.phone,
    address: data?.data?.address,
    image: data?.data?.image,
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const onsubmit = (data) => {
    updateUserProfile(data);
  };

  if (!user?.image) {
    user.image =
      "data:image/png;base64,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";
  }

  return (
    <div className="h-screen overflow-hidden dark:bg-gray-50 flex items-center justify-center ">
      <Content className="mt-16 max-w-lg   p-6 ">
        <Card className="mx-auto rounded-lg shadow-lg p-6 dark:bg-slate-50 bg-slate-300 ">
          <div className="flex justify-center items-center">
            <Image
              src={user?.image}
              alt="Profile Image"
              style={{
                width: 150, // Set width to 150px (or any size you prefer)
                height: 150, // Set height to 150px to make it square
                borderRadius: "50%", // Make it round
              }}
            />
          </div>
          <Title level={3} className="mb-6 text-center">
            <span className="text-gray-800 dark:text-green-700">
              Welcome, {user.name}!
            </span>
          </Title>

          <Title level={5} className="mb-4">
            <span className="text-gray-800 dark:text-green-700">
              Profile Details
            </span>
          </Title>

          <BrForm defaultValues={user} onSubmit={onsubmit}>
            <BRInput
              type="text"
              name="name"
              label="user name"
              disabled={!isEditing}
              className={`transition-all w-96 ${
                isEditing ? "border-blue-500" : "border-gray-300"
              } border rounded-lg`}
            />

            <BRInput
              type="text"
              name="email"
              label="email"
              disabled={!isEditing}
              className={`transition-all w-96 ${
                isEditing ? "border-blue-500" : "border-gray-300"
              } border rounded-lg`}
            />

            <BRInput
              type="text"
              name="phone"
              label="phone"
              disabled={!isEditing}
              className={`transition-all w-96 ${
                isEditing ? "border-blue-500" : "border-gray-300"
              } border rounded-lg`}
            />

            <BRInput
              type="text"
              name="address"
              label="address"
              disabled={!isEditing}
              className={`transition-all w-96 ${
                isEditing ? "border-blue-500" : "border-gray-300"
              } border rounded-lg`}
            />

            <div className="text-center mt-4 w-96">
              <Button
                className="w-full"
                htmlType="submit"
                type="primary"
                onClick={handleEdit}
              >
                {isEditing ? "Save" : "Edit Profile"}
              </Button>
            </div>
          </BrForm>
        </Card>
      </Content>
    </div>
  );
};

export default ProfilePage;
