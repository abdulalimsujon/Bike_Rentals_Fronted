import AdminDashboard from "../pages/admin/AdminDashboard";
import AllBike from "../pages/user/AllBike";

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
    ],
  },
];
