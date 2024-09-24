import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import Registration from "../pages/auth/Registration";
import Login from "../pages/Login";
import Home from "../pages/home";
import AllBike from "../pages/bike/AllBike";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <App />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "all-bike",
    element: <AllBike></AllBike>,
  },
]);

export default router;
