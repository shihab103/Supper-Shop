import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";

const MainRoute = createBrowserRouter([
  { path: "/", Component: RootLayout},
]);

export default MainRoute;
