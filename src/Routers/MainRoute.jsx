import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/HomePage/Home/Home";
import AddCategory from "../Component/Dashboard/Admin/AddCategory/AddCategory";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/add-category", Component: AddCategory },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
]);

export default MainRoute;
