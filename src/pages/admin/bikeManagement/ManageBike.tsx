import React, { useState } from "react";
import { Button, Popconfirm, Spin, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  useAllBikeQuery,
  useDeleteBikeMutation,
} from "../../../redux/features/bikes/bikeApi";
import Toast from "../../../utils/Toast";

const ManageBike = () => {
  const [params, setParams] = useState([]);
  const { data: allBikesData, isLoading: allBikesLoading } =
    useAllBikeQuery(params);
  const [deleteBike, { isError, error }] = useDeleteBikeMutation();

  interface DataType {
    key: React.Key;
    name: string;
    model: string;
    price: number;
    brand: string;
    availability: boolean;
  }

  if (isError) {
    Toast({ message: error as string, status: "error" });
  }

  if (allBikesLoading) {
    return <Spin>Loading...</Spin>;
  }

  // Unique brand filters
  const brands = [
    ...new Set(allBikesData?.data?.result?.map((el) => el.brand)),
  ].map((brand) => ({
    text: brand,
    value: brand,
  }));

  // Unique model filters
  const models = [
    ...new Set(allBikesData?.data?.result?.map((el) => el.model)),
  ].map((model) => ({
    text: model,
    value: model,
  }));

  // Handle edit functionality
  const handleEdit = (record: DataType) => {
    console.log("Edit bike", record);
  };

  // Handle delete functionality
  const handleDelete = async (key: React.Key) => {
    await deleteBike(key);
  };

  // Table columns
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "20%",
    },
    {
      title: "Model",
      dataIndex: "model",
      filters: models,
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.model.startsWith(value as string),
      width: "20%",
    },
    {
      title: "Price Per Hour",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: brands,
      onFilter: (value, record) => record.brand.startsWith(value as string),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      filters: [
        { text: "Available", value: true },
        { text: "Not Available", value: false },
      ],
      onFilter: (value, record) => record.availability === value,
      render: (availability) => (availability ? "Available" : "Not Available"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span className="space-x-2">
          <Button
            onClick={() => handleEdit(record)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this bike?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  // Data for the table
  const data2 = allBikesData?.data?.result?.map((bike) => ({
    key: bike._id,
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    price: bike.pricePerHour,
    availability: bike.isAvailable,
  }));

  // Handle filters and sorting
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    const queryParams = [];

    if (filters.brand) {
      filters.brand.forEach((element) => {
        queryParams.push({ name: "brand", value: element });
      });
    }

    if (filters.model) {
      filters.model.forEach((element) => {
        queryParams.push({ name: "model", value: element });
      });
    }

    if (filters.availability) {
      filters.availability.forEach((element) => {
        queryParams.push({ name: "availability", value: element });
      });
    }

    setParams(queryParams);
  };

  return (
    <div className="bg-slate-600 dark:bg-slate-50 p-8 ">
      <Table
        className="mt-20 "
        columns={columns}
        dataSource={data2}
        onChange={onChange}
        rowClassName={() =>
          "bg-slate-700  dark:bg-slate-50 dark:text-black text-green-300 "
        }
        pagination={{
          className: "bg-slate-700 dark:bg-slate-50",
        }}
      />
    </div>
  );
};

export default ManageBike;
