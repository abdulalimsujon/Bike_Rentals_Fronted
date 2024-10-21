/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, Table } from "antd";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetRentalByUserIdQuery } from "../../redux/api/bikes/bikeApi";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import CustomButton from "../../components/form/CustomButton";

interface Bike {
  name: string;
  pricePerHour: number;
  model: string;
  brand: string;
}

interface TRental {
  bikeId: Bike;
  isReturned: boolean;
  returnTime: string; // ISO 8601 format
  startTime: string; // ISO 8601 format
  totalCost: number;
  userId: string;
  _id: string;
}

const MyRental = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetRentalByUserIdQuery(user?.userId);
  const navigate = useNavigate();

  const zeroCostItems: TRental[] = [];
  const nonZeroCostItems: TRental[] = [];

  data?.data?.forEach((item: TRental) => {
    if (item?.isReturned === true) {
      zeroCostItems.push(item);
    } else {
      nonZeroCostItems.push(item);
    }
  });

  // Table columns for unpaid tab (with Pay button)
  const unpaidColumns: ColumnsType<TRental> = [
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
      render: (_text: string, record: TRental, _index: number) => (
        <span className="text-xs md:text-sm">
          {record.bikeId?.name || "Unknown Bike"}
        </span>
      ),
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string, _record: TRental, _index: number) => (
        <span className="text-xs md:text-sm">
          {new Date(text).toLocaleString()}
        </span>
      ),
      align: "center",
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (text: string, _record: TRental, _index: number) => (
        <span className="text-xs md:text-sm">
          {text ? new Date(text).toLocaleString() : "Ongoing"}
        </span>
      ),
      align: "center",
    },
    {
      title: "paid",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text: string, _record: TRental, _index: number) => (
        <span className="text-xs md:text-sm">{text}</span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: TRental, _index: number) => (
        <CustomButton onClick={() => handlePayment(record)}>Pay</CustomButton>
      ),
      align: "center",
    },
  ];

  // Table columns for paid tab (no Pay button)
  const paidColumns: ColumnsType<TRental> = unpaidColumns.filter(
    (column) => column.key !== "action" // Exclude the Action column
  );

  const handlePayment = (rental: TRental) => {
    const amount = rental.totalCost;
    navigate(`/${user?.role}/single-payment/${amount}`);
  };

  return (
    <div className="pt-20 flex justify-center items-center w-full max-h-screen">
      <Tabs defaultActiveKey="2" centered>
        <Tabs.TabPane
          className="flex justify-center items-center p-4 border border-gray-300 rounded-md shadow-md"
          tab={<span className="text-center">Unpaid</span>}
          key="1"
        >
          {nonZeroCostItems.length > 0 ? (
            <div className="p-4">
              <Table
                className="mt-20 overflow-auto"
                columns={paidColumns} // Use columns without Pay button
                dataSource={nonZeroCostItems}
                rowClassName={() =>
                  "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300"
                }
                pagination={{
                  className: "bg-slate-700 dark:bg-slate-50",
                }}
              />
            </div>
          ) : (
            <p>No active unpaid rentals.</p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          className="flex justify-center items-center p-4 border border-gray-300 rounded-md shadow-md"
          tab={<span className="text-center">paid</span>}
          key="2"
        >
          {zeroCostItems.length > 0 ? (
            <Table
              className="w-full mx-40"
              columns={unpaidColumns.map((col) => ({
                ...col,
                render: (text: string, record: TRental, index: number) => {
                  if (col.key === "bikeName") {
                    return (
                      <div className="flex flex-col sm:flex-row items-center">
                        <span className="text-xs sm:text-sm">
                          {record.bikeId?.name || "Unknown Bike"}
                        </span>
                      </div>
                    );
                  }
                  if (col.key === "action") {
                    return (
                      <div className="flex flex-col sm:flex-row justify-center">
                        <CustomButton onClick={() => handlePayment(record)}>
                          Pay
                        </CustomButton>
                      </div>
                    );
                  }
                  return col.render ? col.render(text, record, index) : text;
                },
              }))}
              dataSource={zeroCostItems}
              rowClassName={() =>
                "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300"
              }
              pagination={{
                className: "bg-slate-700 dark:bg-slate-50",
              }}
              scroll={{
                x: 400, // Ensure horizontal scrolling for smaller screens
                y: 300, // Set the height limit for vertical scrolling
              }}
            />
          ) : (
            <p>No active zero-cost rentals.</p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyRental;
