import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const commonAxios = useAxios();

  const handleRemoveService = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await commonAxios.delete(`/myServices/${id}`);
          console.log(response);
          if (response.data.deletedCount === 1) {
            setMyServices(
              myServices.filter((myService) => myService._id !== id)
            );
          }

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } catch {
          Swal.fire({
            title: "Failed to delete",
            text: "Failed to delete the service. Please try again later.",
            icon: "error",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const response = await commonAxios.get(`/myServices?email=${email}`);
        setMyServices(response.data);
      } catch {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchMyServices();
  }, [email, commonAxios]);

  return (
    <div className="h-screen">
      <h2 className="font-bold text-2xl text-center py-5">My Services</h2>
      <div className="overflow-x-auto mt-5 max-w-4/5 mx-auto">
        {loading ? (
          <Spinner></Spinner>
        ) : error ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-500 text-4xl ">{error}!</p>
          </div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Provider Name</th>
                <th>Email</th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myServices.map((myService, index) => (
                <tr className="bg-base-200" key={myService._id}>
                  <td>{index + 1}</td>
                  <td>{myService?.Provider_Name}</td>
                  <td>{myService?.Email}</td>
                  <td>{myService?.Service_Name}</td>
                  <td>{myService?.Price}</td>
                  <td
                    onClick={() => handleRemoveService(myService?._id)}
                    className="secondary-btn btn my-3"
                  >
                    Remove
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyServices;
