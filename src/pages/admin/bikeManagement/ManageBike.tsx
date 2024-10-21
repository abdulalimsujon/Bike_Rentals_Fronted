import React, { useState } from "react";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ColumnFilterItem } from "antd/es/table/interface";
import Toast from "../../../utils/Toast";
import ReuseableModal from "../../../utils/ReuseableModal";
import BRInput from "../../../components/form/BRInput";
import BrForm from "../../../components/form/BrForm";
import BRTextArea from "../../../components/form/BrTextArea";
import { TBike } from "../../../Type/BikeType";
import {
  useAllBikeQuery,
  useDeleteBikeMutation,
  useUpdateBikeMutation,
} from "../../../redux/api/bikes/bikeApi";
import { SubmitHandler } from "react-hook-form";
import LoaderSpinner from "../../../utilities/LoaderSpinner";

const ManageBike = () => {
  interface QueryParam {
    name: string;
    value: string | number | boolean;
  }

  interface DataType {
    key: React.Key;
    name: string;
    model: string;
    pricePerHour: number;
    cc: number;
    year: number;
    brand: string;
    availability: boolean;
    description: string;
    image?: File;
  }

  const [params, setParams] = useState<QueryParam[]>([]);
  const { data: allBikesData, isLoading: allBikesLoading } =
    useAllBikeQuery(params);
  const [
    deleteBike,
    { isError, error, isLoading: deleteLoading, isSuccess: isDelete },
  ] = useDeleteBikeMutation();
  const [updateBike, { isLoading: editLoading }] = useUpdateBikeMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bikeInfo, setBikeInfo] = useState<DataType | null>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isDelete) {
    Toast({ message: "bike is deleted successfully", status: "success" });
  }

  if (deleteLoading || editLoading || allBikesLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  const onSubmit: SubmitHandler<DataType> = async (data: DataType) => {
    const brand = data?.brand || bikeInfo?.brand;
    const pricePerHour =
      data?.pricePerHour?.toString() || bikeInfo?.pricePerHour?.toString();
    const name = data?.name || bikeInfo?.name;
    const cc = data?.cc?.toString() || bikeInfo?.cc?.toString();
    const description = data?.description || bikeInfo?.description;
    const year = data?.year?.toString() || bikeInfo?.year?.toString();
    const model = data?.model || bikeInfo?.model;

    const formData = new FormData();
    if (brand) formData.append("brand", brand);
    if (pricePerHour) formData.append("pricePerHour", pricePerHour);
    if (name) formData.append("name", name);
    if (cc) formData.append("cc", cc);
    if (description) formData.append("description", description);
    if (year) formData.append("year", year);
    if (model) formData.append("model", model);

    if (imageFile) {
      formData.append("image", imageFile);
    } else if (bikeInfo?.image) {
      formData.append("image", bikeInfo.image);
    }

    await updateBike({ data: formData, bikeId: data.key });
    setIsModalOpen(false);
    Toast({ message: "bike is updated successfully", status: "success" });
  };

  if (isError) {
    console.log(error);
    Toast({ message: error as string, status: "error" });
  }

  const brands: ColumnFilterItem[] = [
    ...new Set(
      allBikesData?.data?.result?.map((el: { brand: string }) => el.brand)
    ),
  ].map((brand) => ({
    text: brand as string,
    value: brand as string,
  }));

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

  const handleEdit = (record: DataType) => {
    setBikeInfo(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (key: React.Key) => {
    console.log(key);
    await deleteBike(key);
  };

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
      title: "Year",
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
        <span className="space-x-2 flex flex-col gap-1">
          <Button
            onClick={() => handleEdit(record)}
            className="bg-green-700 text-white hover:bg-green-700"
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
            <Button className="bg-red-700 text-white hover:bg-red-500 pl-5">
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const data2 = allBikesData?.data?.result?.map((bike: TBike) => ({
    key: bike._id,
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    pricePerHour: bike.pricePerHour,
    availability: bike.isAvailable,
    cc: bike.cc,
    year: bike.year,
    description: bike.description,
    image: bike.image,
  }));

  const onChange: TableProps<DataType>["onChange"] = (_pagination, filters) => {
    const queryParams: QueryParam[] = [];

    if (filters.brand) {
      (filters.brand as string[]).forEach((brand) => {
        queryParams.push({ name: "brand", value: brand });
      });
    }

    if (filters.model) {
      (filters.model as string[]).forEach((model) => {
        queryParams.push({ name: "model", value: model });
      });
    }

    if (filters.availability) {
      (filters.availability as boolean[]).forEach((availability) => {
        queryParams.push({ name: "availability", value: availability });
      });
    }

    setParams(queryParams);
  };

  return (
    <div className="bg-slate-600 dark:bg-slate-50 p-8 ">
      <Table
        className=" overflow-auto border-gray-500"
        columns={columns}
        dataSource={data2}
        onChange={onChange}
        rowClassName={() =>
          "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300  border border-gray-300"
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
            <BrForm
              defaultValues={
                bikeInfo as Partial<{
                  name: string;
                  pricePerHour: number;
                  cc: number;
                  year: number;
                  brand: string;
                  model: string;
                  description: string;
                  image?: File;
                }>
              }
              onSubmit={onSubmit}
            >
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
      />
    </div>
  );
};

export default ManageBike;
