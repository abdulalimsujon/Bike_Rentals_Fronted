import CreateBike from "../pages/admin/bikeManagement/CreateBike";
import ManageBike from "../pages/admin/bikeManagement/ManageBike";
import ReturnBike from "../pages/admin/bikeManagement/ReturnBike";
import Users from "../pages/admin/userManagement/Users";
import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import Dashboard from "../pages/Dashboard";
import Payment from "../pages/payment/Payment";
import MyRental from "../pages/rental/MyRental";
import ProfilePage from "../pages/user/Profile";
import SinglePayment from "../pages/payment/SinglePayment";
import EditProfile from "../pages/user/EditProfile";

export const adminPaths = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "edit-profile",
    element: <EditProfile></EditProfile>,
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

      {
        path: "single-payment/:amount",
        element: <SinglePayment></SinglePayment>,
      },
      {
        path: "my-rental",
        element: <MyRental></MyRental>,
      },
      {
        name: "Return Bike",
        path: "return-bike",
        element: <ReturnBike></ReturnBike>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
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
