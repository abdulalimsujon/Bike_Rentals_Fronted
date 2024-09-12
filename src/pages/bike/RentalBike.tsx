import { Tabs, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

const RentalBike = () => {
  const navigate = useNavigate();

  const paidRentals = [
    {
      key: "1",
      bikeName: "Mountain Bike",
      startTime: "2024-09-01 10:00 AM",
      returnTime: "2024-09-01 02:00 PM",
      totalCost: "$40.00",
    },
    {
      key: "2",
      bikeName: "Road Bike",
      startTime: "2024-09-02 11:00 AM",
      returnTime: "2024-09-02 03:00 PM",
      totalCost: "$50.00",
    },
  ];

  const unpaidRentals = [
    {
      key: "1",
      bikeName: "Hybrid Bike",
      startTime: "2024-09-03 09:00 AM",
      returnTime: "2024-09-03 01:00 PM",
      totalCost: "$30.00",
    },
    {
      key: "2",
      bikeName: "Electric Bike",
      startTime: "2024-09-04 08:00 AM",
      returnTime: "2024-09-04 12:00 PM",
      totalCost: "$60.00",
    },
  ];

  const columns = [
    { title: "Bike Name", dataIndex: "bikeName", key: "bikeName" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "Return Time", dataIndex: "returnTime", key: "returnTime" },
    { title: "Total Cost", dataIndex: "totalCost", key: "totalCost" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => navigate("/payment")}>
          Pay
        </Button>
      ),
    },
  ];

  return (
    <div className="mx-40">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Unpaid" key="1">
          <Table
            columns={columns}
            dataSource={unpaidRentals}
            pagination={false}
          />
        </TabPane>
        <TabPane tab="Paid" key="2">
          <Table
            columns={columns.filter((col) => col.key !== "action")} // Remove action column for paid rentals
            dataSource={paidRentals}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RentalBike;
