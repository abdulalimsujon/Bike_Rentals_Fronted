import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateBike from "../pages/admin/bikeManagement/CreateBike";
import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import RentalBike from "../pages/bike/RentalBike";
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
        name: "Available Bike",
        path: "all-bike",
        element: <AllBike></AllBike>,
      },
      {
        name: "create bike",
        path: "create-bike",
        element: <CreateBike></CreateBike>,
      },
      {
        path: "rental",
        element: <RentalBike></RentalBike>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "bike-details/:bikeId",
        element: <BikeDetails></BikeDetails>,
      },
    ],
  },
];
