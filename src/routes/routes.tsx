import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import Registration from "../pages/auth/Registration";
import Login from "../pages/Login";
import About from "../pages/About"; // Import the About component
import NotFound from "../pages/NotFound";
import AllBike from "../pages/bike/AllBike";
import BikeDetails from "../pages/bike/BikeDetails";
import Home from "../pages/home";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import SinglePayment from "../pages/payment/SinglePayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App layout
    children: [
      {
        path: "about", // Route for the About page
        element: <About />, // Renders About component
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "payment",
        element: <SinglePayment></SinglePayment>,
      },
      {
        path: "all-bike",
        element: <AllBike></AllBike>,
      },
      {
        path: "bike-details/:bikeId",
        element: <BikeDetails></BikeDetails>,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
  },
  {
    path: "/registration",
    element: <Registration />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
