import AllBike from "../pages/user/AllBike";
import BikeDetails from "../pages/user/BikeDetails";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    path: "dashboard",
    element: <UserDashboard />,
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
        path: "bike-details/:bikeId",
        element: <BikeDetails></BikeDetails>,
      },
    ],
  },
];
