/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import type { TableColumnsType } from "antd";
import { Table, Modal } from "antd";
import {
  useGetAllRentalBikeQuery,
  useReturnBikeMutation,
} from "../../../redux/api/bikes/bikeApi";
import { TReturnBike } from "../../../Type/BikeType";
import BrForm from "../../../components/form/BrForm";
import CustomDatePicker from "../../../components/form/CustomDatePicker";
import CustomButton from "../../../components/form/CustomButton";
import Toast from "../../../utils/Toast";
import LoaderSpinner from "../../../utilities/LoaderSpinner";

interface BikeRental {
  bikeId: {
    _id: string;
    name: string;
    description: string;
    pricePerHour: number;
    isAvailable: boolean;
    // Add other properties if needed
  };
  isReturned: boolean;
  returnTime: string | null;
  startTime: string; // ISO date string
  totalCost: number;
  userId: string;
  _id: string;
}

// Example usage:

interface DataType {
  key: string;
  startTime: string;
  name: string | { name: string };
  returnTime: string | null;
  isReturned: string;
  totalCost: number; // Adjust type as necessary
}

const ReturnBike = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<string | null>(null);
  const [originalStartTime, setOriginalStartTime] = useState<string>(""); // Add originalStartTime state
  const [returnBike, { isLoading, isError, error }] = useReturnBikeMutation();

  const {
    data: data1,
    isLoading: allDataLoading,
    refetch,
  } = useGetAllRentalBikeQuery(undefined);

  if (isLoading || allDataLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }

  console.log(data1);
  const data2: DataType[] = data1?.data?.map((el: BikeRental) => ({
    key: el.bikeId,
    name: el.bikeId?.name,
    startTime: el.startTime, // Format the startTime for display
    returnTime: el.returnTime ? el.returnTime : "Yet Not Returned", // Format returnTime if it exists
    isReturned: el.isReturned ? "Returned" : "Not Returned",
    totalCost: el.totalCost,
  }));

  const onSubmit = async (formData: { returnTime: string }) => {
    if (userToUpdate) {
      await returnBike({
        bikeId: userToUpdate,
        startTime: originalStartTime, // Use the stored original startTime
        returnTime: formData.returnTime,
      });
    }
    refetch();

    setIsModalVisible(false);
  };
  if (isLoading) {
    return <LoaderSpinner></LoaderSpinner>;
  }
  if (isError) {
    console.log(error);
    Toast({ message: "cannot return bike", status: "error" });
  }
  const showReturnTimeModal = (key: string, unformattedStartTime: string) => {
    setIsModalVisible(true);
    setUserToUpdate(key);
    setOriginalStartTime(unformattedStartTime); // Store the original ISO startTime
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserToUpdate(null);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      width: "20%",
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "isReturned",
      key: "isReturned",
      width: "20%",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <CustomButton
          onClick={() =>
            showReturnTimeModal(
              record.key,
              data1.data.find((el: TReturnBike) => el.bikeId === record.key)
                ?.startTime || ""
            )
          } // Pass original ISO startTime when opening the modal
        >
          Calculate
        </CustomButton>
      ),
    },
  ];

  return (
    <div>
      <div className="overflow-auto mx-0 bg-slate-600 dark:bg-slate-50 p-8 ">
        <Table
          className="w-full border border-gray-300" // Add a border around the table
          columns={columns}
          dataSource={data2}
          rowClassName={
            () =>
              "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300 border-b border-gray-300" // Add a bottom border to each row
          }
          scroll={{ x: 500 }} // Make table scrollable horizontally on small screens
        />
      </div>

      <Modal
        title="Set Return Time"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <BrForm onSubmit={onSubmit} getValue={userToUpdate}>
          <div className="flex flex-col gap-4">
            <CustomDatePicker name="returnTime" label="Return Time" />
            <div></div>
            <CustomButton htmlType="submit" className="w-full">
              Calculate
            </CustomButton>
          </div>
        </BrForm>
      </Modal>
    </div>
  );
};

export default ReturnBike;
