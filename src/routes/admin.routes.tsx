import AdminDashboard from "../pages/admin/AdminDashboard";
import AllBike from "../pages/bike/AllBike";
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
        path: "rental",
        element: <RentalBike></RentalBike>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
];
