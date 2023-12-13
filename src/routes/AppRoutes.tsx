import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../components/Auth";
import Home from "../components/Home";


const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
