import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import RentalBike from "../pages/bike/RentalBike";
import UserDashboard from "../pages/bike/UserDashboard";
import Profile from "../pages/user/Profile";

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

      {
        path: "rental",
        element: <RentalBike></RentalBike>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },
];
