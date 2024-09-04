import { Dropdown, MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { ReactNode } from "react";
type MenuItem = Required<MenuProps>["items"][number];

type dropDownProps = {
  items: MenuItem[];
  label: string | ReactNode;
};

const ReusableDropdown = ({ items, label }: dropDownProps) => {
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottom"
      arrow
    >
      <span>{label}</span>
    </Dropdown>
  );
};

export default ReusableDropdown;
