import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../routes/sidebarItemGenerator";

const items = sidebarItemsGenerator(adminPaths, "admin");

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="bg-gray-100 dark:bg-slate-200" // Default background for light mode, and dark mode bg
      style={{
        height: "100vh",
        width: "250px",
        position: "sticky",
        top: "0",
        left: "0",
        paddingTop: "60px",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
        className="bg-white dark:bg-slate-100 text-gray-900 dark:text-gray-50 rounded-lg" // Default light mode background and text color
      />
    </Sider>
  );
};

export default Sidebar;
