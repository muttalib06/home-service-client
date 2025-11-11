import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

export const router = createBrowserRouter([
        {
                path:"/",
                element:<MainLayout></MainLayout>,
                children:[
                        {
                                index:true,element:<Home></Home>
                        },
                        {
                                path:"login",
                                element:<Login></Login>

                        },
                        {
                                path:"signup",
                                element:<Signup></Signup>
                        }

                ]

        }

])