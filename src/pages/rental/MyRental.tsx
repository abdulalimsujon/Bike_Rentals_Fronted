import { Tabs, Table, Button } from "antd";
import { selectCurrentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetRentalByUserIdQuery } from "../../redux/api/bikes/bikeApi";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

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

  // Table columns configuration
  const columns: ColumnsType<TRental> = [
    {
      title: "Bike Name",
      dataIndex: "bikeName",
      key: "bikeName",
      render: (text: string, record: TRental) => (
        <span>{record.bikeId?.name || "Unknown Bike"}</span>
      ),
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
      align: "center",
    },
    {
      title: "Return Time",
      dataIndex: "returnTime",
      key: "returnTime",
      render: (text: string) => (
        <span>{text ? new Date(text).toLocaleString() : "Ongoing"}</span>
      ),
      align: "center",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text: string) => <span>{text}</span>,
      align: "center",
    },
  ];

  const handlePayment = (rental: TRental) => {
    navigate(`/${user?.role}/payment`);
    console.log("Processing payment for:", rental);
  };

  return (
    <div className="pt-20 flex justify-center items-center w-full max-h-screen">
      <Tabs defaultActiveKey="2" centered>
        <Tabs.TabPane
          className="flex justify-center items-center p-4 border border-gray-300 rounded-md shadow-md"
          tab={<span className="text-center">Paid</span>}
          key="1"
        >
          {nonZeroCostItems.length > 0 ? (
            <div className="p-4">
              <Table
                dataSource={nonZeroCostItems}
                columns={columns}
                rowKey="_id"
                pagination={false}
                rowClassName={() =>
                  "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300 border border-blue-500"
                }
                className="border border-gray-400"
              />
            </div>
          ) : (
            <p>No active unpaid rentals.</p>
          )}
        </Tabs.TabPane>

        <Tabs.TabPane
          className="flex justify-center items-center p-4 border border-gray-300 rounded-md shadow-md"
          tab={<span className="text-center">Unpaid</span>}
          key="2"
        >
          {zeroCostItems.length > 0 ? (
            <div>
              <Table
                dataSource={zeroCostItems}
                columns={[
                  ...columns,
                  {
                    title: "Action",
                    key: "action",
                    render: (text, record) => (
                      <Button
                        type="primary"
                        onClick={() => handlePayment(record)}
                      >
                        Pay
                      </Button>
                    ),
                    align: "center",
                  },
                ]}
                rowKey="_id"
                pagination={false}
                rowClassName={() =>
                  "bg-slate-700 dark:bg-slate-50 dark:text-black text-green-300 border border-blue-500"
                }
                className="border border-gray-400"
              />
            </div>
          ) : (
            <p>No active zero-cost rentals.</p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyRental;
