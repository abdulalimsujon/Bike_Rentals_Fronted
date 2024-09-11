import { Dropdown, MenuProps } from "antd";
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
      dropdownRender={(menu) => (
        <div className="w-64 p-2 shadow-lg rounded-md bg-white"> {menu}</div>
      )}
    >
      <span>{label}</span>
    </Dropdown>
  );
};

export default ReusableDropdown;
