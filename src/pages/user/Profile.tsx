import { Layout, Card, Typography, Spin, Image } from "antd";
import { useGetMeQuery } from "../../redux/api/authApi/authApi";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ProfilePage = () => {
  const { data, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <Spin tip="Loading...">
        <div className="min-h-screen flex justify-center items-center" />
      </Spin>
    );
  }

  const user = data?.data;

  return (
    <Layout className="dark:bg-slate-50 bg-gray-700">
      <Content className="flex justify-center items-center min-h-screen dark:bg-slate-50 bg-gray-700  ">
        <Card className=" w-96 rounded-2xl shadow-lg bg-gradient-to-br  dark:bg-slate-50 bg-gray-700  p-8 text-center transition-transform hover:scale-105">
          <Title
            level={2}
            className="text-base dark:text-gray-600 text-green-700  mb-8"
          >
            {user ? `${user.name}'s Profile` : "Profile"}
          </Title>

          <Image
            src={user?.image || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            width={120}
            className="rounded-full mb-5 border-4 border-blue-500 shadow-md"
          />

          <div className="text-left text-base dark:text-gray-600 text-green-700   space-y-2">
            <Paragraph className="dark:text-gray-600 text-green-300 ">
              <UserOutlined className="text-blue-500 mr-2" />
              <strong>Name:</strong> {user?.name || "N/A"}
            </Paragraph>
            <Paragraph className="dark:text-gray-600 text-green-300 ">
              <MailOutlined className="text-blue-500 mr-2" />
              <strong>Email:</strong> {user?.email || "N/A"}
            </Paragraph>
            <Paragraph className="dark:text-gray-600 text-green-300 ">
              <PhoneOutlined className="text-blue-500 mr-2" />
              <strong>Phone:</strong> {user?.phone || "N/A"}
            </Paragraph>
            <Paragraph className="dark:text-gray-600 text-green-300 ">
              <HomeOutlined className="text-blue-500 mr-2" />
              <strong>Address:</strong> {user?.address || "N/A"}
            </Paragraph>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
