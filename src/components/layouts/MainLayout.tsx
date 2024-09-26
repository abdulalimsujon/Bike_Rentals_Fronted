import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "./Header";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/authSlice";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
//import { MenuOutlined } from "@ant-design/icons";
//import { useState } from "react";

const { Content } = Layout;

const MainLayout = () => {
  const user = useAppSelector(selectCurrentUser); // Fetch current user from Redux store
  // const [drawerOpen, setDrawerOpen] = useState(false); // State for controlling the drawer

  return (
    <Layout className="min-h-screen dark:bg-gray-50 bg-slate-700">
      {/* Sidebar for larger devices */}
      {user && user.role === "admin" && <Sidebar />}

      <Layout className="min-h-screen">
        <CustomHeader />
        {/* Show drawer button on smaller screens */}
        {/* {user && user.role === "admin" && (
          <Button
            className="sm:hidden absolute top-4 left-4 z-50" // Visible only on screens smaller than 640px
            icon={<MenuOutlined />}
            onClick={() => setDrawerOpen(true)} // Open the drawer when clicked
          />
        )} */}
        {/* Drawer for small devices */}
        {/* <Drawer
          title="Admin Menu"
          placement="left"
          onClose={() => setDrawerOpen(false)} // Close the drawer
          open={drawerOpen}
          className="sm:hidden" // Hidden on larger screens
        >
          {/* Place the Sidebar component inside the Drawer */}
        {/* <Sidebar />
        </Drawer> */}{" "}
        *
        <Content className="flex-grow dark:bg-slate-50 bg-slate-700">
          <div className="min-h-screen px-2 py-4 sm:px-6 sm:py-8">
            {/* Adjust padding for small devices */}
            <Outlet /> {/* Render nested routes here */}
            <Footer />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
