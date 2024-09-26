/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Layout,
  Card,
  Typography,
  Button,
  Spin,
  Form,
  Input,
  Image,
} from "antd";
import { useEffect } from "react";
import { useGetMeQuery } from "../../redux/api/authApi/authApi";
import { useUpdateUserProfileMutation } from "../../redux/api/userApi/userApi";
import Toast from "../../utils/Toast";
import { userType } from "../../Type/UserType";

const { Content } = Layout;
const { Title } = Typography;

const EditProfile = () => {
  const { data, isLoading, refetch } = useGetMeQuery(undefined);
  const [updateUserProfile, { isLoading: updating }] =
    useUpdateUserProfileMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone,
        address: data.data.address,
      });
    }
  }, [data, form]);

  const onFinish = async (values: userType) => {
    try {
      await updateUserProfile(values).unwrap(); // unwrap for error handling
      refetch();
      Toast({ message: "Profile updated successfully", status: "success" });
    } catch (error: any) {
      Toast({
        message: error.data.message || "Update failed",
        status: "error",
      });
    }
  };

  if (isLoading || updating) {
    return <Spin>Loading...</Spin>;
  }

  return (
    <Layout className="dark:bg-slate-50 bg-gray-700">
      <Content className="flex justify-center items-center min-h-screen dark:bg-slate-50 bg-gray-700">
        <Card className="w-96 rounded-2xl shadow-lg bg-gradient-to-br dark:bg-slate-50 bg-gray-700 p-8 text-center transition-transform hover:scale-105">
          <Title
            level={2}
            className="text-base dark:text-gray-600 text-green-300 mb-8"
          >
            Edit Profile
          </Title>
          <Image
            width={150}
            src={data?.data?.image || "https://via.placeholder.com/150"}
            alt="Profile Image"
            className="rounded-full mb-5 border-4 border-blue-500 shadow-md"
          />
          <Form
            form={form}
            name="edit_profile"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
          >
            <Form.Item
              name="name"
              label={
                <span className="dark:text-gray-600 text-green-300">Name</span>
              }
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                placeholder="Enter your name"
                className="dark:bg-gray-200 bg-green-100"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={
                <span className="dark:text-gray-600 text-green-300">Email</span>
              }
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                className="dark:bg-gray-200 bg-green-100"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label={
                <span className="dark:text-gray-600 text-green-300">Phone</span>
              }
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input
                placeholder="Enter your phone"
                className="dark:bg-gray-200 bg-green-100"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label={
                <span className="dark:text-gray-600 text-green-300">
                  Address
                </span>
              }
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                placeholder="Enter your address"
                className="dark:bg-gray-200 bg-green-100"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full bg-green-700 hover:bg-green-600 text-white"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default EditProfile;
