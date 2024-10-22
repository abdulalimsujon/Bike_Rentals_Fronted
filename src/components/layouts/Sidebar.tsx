import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenerator } from "../../routes/sidebarItemGenerator";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

const items = sidebarItemsGenerator(adminPaths, "admin");

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="bg-gray-500 dark:bg-slate-300 sm:block  z-[999]"
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
        items={items as ItemType<MenuItemType>[]}
        className="bg-gray-500 dark:bg-white text-green-300 dark:text-green-700 rounded-lg" // Correct text color and background
      />
    </Sider>
  );
};

export default Sidebar;
