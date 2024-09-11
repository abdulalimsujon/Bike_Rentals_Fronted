import { Layout, Card, Typography, Button, Form, Spin } from "antd";
import { useState } from "react";
import { useGetMeQuery } from "../../redux/features/authApi/authApi";

import BrForm from "../../components/form/BrForm";
import BRInput from "../../components/form/BRInput";

const { Content } = Layout;
const { Title } = Typography;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading } = useGetMeQuery(undefined);

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
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const onsubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen overflow-hidden dark:bg-gray-50 flex items-center justify-center ">
      <Content className="mt-16 max-w-lg   p-6 ">
        <Card className="mx-auto rounded-lg shadow-lg p-6 bg-white ">
          <Title level={3} className="mb-6 text-gray-800 text-center">
            Welcome, {user.name}!
          </Title>

          <Title level={5} className="mb-4 text-gray-600">
            Profile Details
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
