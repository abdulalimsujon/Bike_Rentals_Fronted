import React, { useState } from "react";
import { Button, Popconfirm, Spin, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ColumnFilterItem } from "antd/es/table/interface";
import {
  useAllBikeQuery,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
} from "../../../redux/features/bikes/bikeApi";
import Toast from "../../../utils/Toast";
import ReuseableModal from "../../../utils/ReuseableModal";
import BRInput from "../../../components/form/BRInput";
import BrForm from "../../../components/form/BrForm";
import BRTextArea from "../../../components/form/BrTextArea";
import { TBike } from "../../../Type/BikeType";

const ManageBike = () => {
  interface QueryParam {
    name: string;
    value: string | number | boolean; // Adjust based on your actual values
  }
  interface DataType {
    key: React.Key;
    name: string;
    model: string;
    pricePerHour: number;
    CC: number;
    year: number;
    brand: string;
    availability: boolean;
    description: string;
  }
  // type FormDataType = Omit<DataType, "key">;
  const [params, setParams] = useState<QueryParam[]>([]);
  const { data: allBikesData, isLoading: allBikesLoading } =
    useAllBikeQuery(params);
  const [deleteBike, { isError, error }] = useDeleteBikeMutation();
  const [updateBike, { isLoading: editLoading }] = useUpdateBikeMutation();

  interface DataType {
    key: React.Key;
    name: string;
    model: string;
    pricePerHour: number;
    cc: number;
    year: number;
    brand: string;
    availability: boolean;
    image?: File; // Use the File type for image
    description: string;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bikeInfo, setBikeInfo] = useState<DataType | null>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (data: DataType) => {
    // Use existing bikeInfo values if available, otherwise use form input data
    const brand = data?.brand || bikeInfo?.brand;
    const pricePerHour =
      data?.pricePerHour?.toString() || bikeInfo?.pricePerHour?.toString();
    const name = data?.name || bikeInfo?.name;
    const cc = data?.cc?.toString() || bikeInfo?.cc?.toString();
    const description = data?.description || bikeInfo?.description;
    const year = data?.year?.toString() || bikeInfo?.year?.toString();
    const model = data?.model || bikeInfo?.model;

    // Create FormData instance
    const formData = new FormData();

    // Append form fields to FormData if they exist
    if (brand) formData.append("brand", brand);
    if (pricePerHour) formData.append("pricePerHour", pricePerHour);
    if (name) formData.append("name", name);
    if (cc) formData.append("cc", cc);
    if (description) formData.append("description", description);
    if (year) formData.append("year", year);
    if (model) formData.append("model", model);

    // Append the image file if it exists
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (bikeInfo?.image) {
      // If there's no new image file but bikeInfo already has an image URL, append the existing image URL
      formData.append("image", bikeInfo.image);
    }

    await updateBike({ data: formData, bikeId: data.key });
    setIsModalOpen(false);
  };

  if (isError) {
    Toast({ message: error as string, status: "error" });
  }

  if (allBikesLoading || editLoading) {
    return <Spin>Loading...</Spin>;
  }

  const brands: ColumnFilterItem[] = [
    ...new Set(
      allBikesData?.data?.result?.map((el: { brand: string }) => el.brand)
    ),
  ].map((brand) => ({
    text: brand as string,
    value: brand as string,
  }));

  // Unique model filters
  const models: ColumnFilterItem[] = [
    ...new Set(
      allBikesData?.data?.result?.map((el: { model: string }) => el.model)
    ),
  ].map((model) => ({
    text: model as string,
    value: model as string,
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Handle edit functionality
  const handleEdit = (record: DataType) => {
    setBikeInfo(record);
    setIsModalOpen(true);
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
      width: "10%",
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
      title: "CC",
      dataIndex: "cc",
      width: "10%",
    },
    {
      title: "pricePerHour",
      dataIndex: "pricePerHour",
      sorter: (a, b) => a.pricePerHour - b.pricePerHour,
    },

    {
      title: "year",
      dataIndex: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: brands,
      onFilter: (value, record) => record.brand.startsWith(value as string),
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      filters: [
        { text: "Available", value: true },
        { text: "Not Available", value: false },
      ],
      onFilter: (value, record) => record.availability === value,
      width: "15%",
      render: (availability) => (availability ? "Available" : "Not Available"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span className="space-x-2">
          <Button
            onClick={() => handleEdit(record)}
            className="bg-blue-500 text-white hover:bg-blue-600 "
            type="primary"
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
  const data2 = allBikesData?.data?.result?.map((bike: TBike) => ({
    key: bike._id,
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    pricePerHour: bike.pricePerHour,
    availability: bike.isAvailable,
    cc: bike.cc,
    year: bike.year,
    description: bike.description, // Add description to the record
    image: bike.image, // Add image to the record
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
      <ReuseableModal
        isOpen={isModalOpen}
        title="Edit Bike"
        content={
          <>
            <BrForm defaultValues={bikeInfo} onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* Bike Name */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="name"
                    label="Bike Name"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Price per Hour */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="pricePerHour"
                    label="Price per Hour"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* CC */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="cc"
                    label="CC"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Year */}
                <div className="flex flex-col">
                  <BRInput
                    type="number"
                    name="year"
                    label="Year"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Model */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="model"
                    label="Model"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                  <BRInput
                    type="text"
                    name="brand"
                    label="Brand"
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col sm:col-span-2">
                  <BRTextArea
                    name="description"
                    label="Description"
                    rows={3}
                    className="w-full border-gray-300 border rounded-lg p-1"
                  />
                </div>

                {/* Image */}
                <div className="flex flex-col w-full">
                  <BRInput
                    type="file"
                    name="image"
                    label="Image"
                    className="w-96"
                    onChange={handleFileChange} // Handle file input changes
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2"
                >
                  Edit Bike
                </Button>
              </div>
            </BrForm>
          </>
        }
        handleCancel={handleCancel}
      ></ReuseableModal>
    </div>
  );
};

export default ManageBike;
