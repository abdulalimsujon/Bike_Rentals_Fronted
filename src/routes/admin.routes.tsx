import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBike from "../pages/admin/bikeManagement/CreateBike";
import ManageBike from "../pages/admin/bikeManagement/ManageBike";
import Users from "../pages/admin/userManagement/Users";
import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import Payment from "../pages/payment/Payment";
import ProfilePage from "../pages/user/Profile";

export const adminPaths = [
  {
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Bike Management",
    children: [
      {
        name: "create bike",
        path: "create-bike",
        element: <CreateBike></CreateBike>,
      },
      {
        name: "Manage Bike",
        path: "manage-bike",
        element: <ManageBike></ManageBike>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "bike-details/:bikeId",
        element: <BikeDetails></BikeDetails>,
      },
      {
        path: "all-bike",
        element: <AllBike></AllBike>,
      },

      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Manage User",
        path: "all-user",
        element: <Users></Users>,
      },
    ],
  },
];
