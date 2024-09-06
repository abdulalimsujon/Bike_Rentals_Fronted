import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./Header";
// import Sidebar from "./Sidebar";

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen h-full dark:bg-gray-50 bg-slate-700">
      {/* <Sidebar /> */}
      <Layout className="min-h-screen">
        <CustomHeader />
        <Content
          className="flex-grow dark:bg-slate-50 bg-slate-700"
          // style={{ margin: "24px 16px 0" }}
        >
          <div className="min-h-screen py-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
