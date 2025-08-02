import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

const MainRoute = createBrowserRouter([
  { path: "/", Component: RootLayout},
  { path: "/login", Component: Login},
  { path: "/register", Component: Register},
]);

export default MainRoute;
