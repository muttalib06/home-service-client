import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import Spinner from "../components/Spinner";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <Navbar></Navbar>

      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
