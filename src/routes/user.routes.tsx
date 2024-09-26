import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import Dashboard from "../pages/Dashboard";
import Payment from "../pages/payment/Payment";
import SinglePayment from "../pages/payment/SinglePayment";
import MyRental from "../pages/rental/MyRental";
import EditProfile from "../pages/user/EditProfile";
import Profile from "../pages/user/Profile";
import About from "../pages/About";

export const userPaths = [
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
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

      {
        path: "edit-profile",
        element: <EditProfile></EditProfile>,
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
        path: "edit-profile",
        element: <EditProfile></EditProfile>,
      },

      {
        path: "about",
        element: <About></About>,
      },
    ],
  },
];
