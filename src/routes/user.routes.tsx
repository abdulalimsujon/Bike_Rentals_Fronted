import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";

import UserDashboard from "../pages/bike/UserDashboard";
import Payment from "../pages/payment/Payment";
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
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
];
