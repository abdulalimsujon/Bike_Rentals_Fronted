import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./Header";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Layout className="min-h-screen dark:bg-gray-50 bg-slate-700">
      {user?.role === "admin" && <Sidebar />}

      <Layout className="min-h-screen">
        <CustomHeader />
        <Content className="flex-grow dark:bg-slate-50 bg-slate-700">
          <div className="min-h-screen">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
