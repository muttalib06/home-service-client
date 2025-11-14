import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Services from "../pages/Services";
import PrivateRouter from "../provider/PrivateRouter";
import MyServices from "../pages/MyServices";
import AddServices from "../pages/AddServices";
import MyBookings from "../pages/MyBookings";
import ServiceDetail from "../pages/ServiceDetail";
import axios from "axios";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "profile",
        element: (
          <PrivateRouter>
            <Profile></Profile>
          </PrivateRouter>
        ),
      },
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "my-services",
        element: (
          <PrivateRouter>
            <MyServices></MyServices>
          </PrivateRouter>
        ),
      },
      {
        path: "add-services",
        element: (
          <PrivateRouter>
            <AddServices></AddServices>
          </PrivateRouter>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRouter>
            <MyBookings></MyBookings>
          </PrivateRouter>
        ),
      },
      {
        path: "service-detail/:id",
        loader: async ({ params }) => {
          const res = await axios.get(
            `http://localhost:3000/service-detail/${params.id}`
          );
          return res.data;
        },
        element: <ServiceDetail></ServiceDetail>,
      },
    ],
  },
]);
