import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./Header";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen h-full">
      <Sidebar />
      <Layout className="h-full">
        <CustomHeader />
        <Content className="h-full" style={{ margin: "24px 16px 0" }}>
          <div className="h-full bg-slate-700 dark:bg-slate-200">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
