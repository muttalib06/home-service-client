import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Spinner from "../components/Spinner";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Spinner></Spinner>;
  } else if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{from:location}}></Navigate>;
  }
};

export default PrivateRouter;
