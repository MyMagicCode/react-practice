import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { routers } from "../config/pages.config";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  ...routers,
]);
