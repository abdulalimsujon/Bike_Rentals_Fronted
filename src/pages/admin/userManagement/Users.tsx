import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../../redux/api/userApi/userApi";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Table, message, Modal } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { userType } from "../../../Type/UserType";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // For modal visibility
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // User to be deleted
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof DataType;

  const { data: data1, refetch } = useGetAllUsersQuery(undefined); // Add refetch to update table
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const data2: DataType[] = data1?.data?.map((el: userType) => ({
    key: el._id,
    name: el.name,
    email: el.email,
    phone: el.phone,
    role: el.role,
    address: el.address,
  }));

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleChangeUserRole = async (key: string, newRole: string) => {
    try {
      await updateUserRole({ id: key, role: newRole }).unwrap();
      message.success(`User role changed to ${newRole} successfully!`);
      refetch();
    } catch (error) {
      console.log(error);
      message.error(`Failed to change user role to ${newRole}`); // Error handling
    }
  };

  const showDeleteModal = (key: string) => {
    setIsModalVisible(true);
    setUserToDelete(key);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete).unwrap(); // Await deleteUser mutation
        message.success("User deleted successfully!"); // Success message
        refetch(); // Refetch the user list
      } catch (error) {
        console.log(error);
        message.error("Failed to delete user!"); // Error handling
      }
    }
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setUserToDelete(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "20%",
      render: (_, record) => (
        <Space>
          <span>{record.role}</span>
          {record.role === "admin" ? (
            <Button
              type="dashed"
              size="small"
              onClick={() => handleChangeUserRole(record.key, "user")} // Demote to user
            >
              Demote to User
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              onClick={() => handleChangeUserRole(record.key, "admin")} // Promote to admin
            >
              Promote to Admin
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => showDeleteModal(record.key)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="">
      <div className="overflow-auto mx-0">
        <Table
          className="pt-28 lg:mx-40 "
          columns={columns}
          dataSource={data2}
        />
      </div>

      <Modal
        title="Delete User"
        visible={isModalVisible}
        onOk={handleDeleteUser}
        onCancel={handleCancelDelete}
        okText="Delete"
        confirmLoading={isDeleting} // Show loading state when deleting
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default Users;
