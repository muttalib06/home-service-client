import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import { FaTools, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import ErrorPage from "./ErrorPage";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const commonAxios = useAxios();
  const email = user?.email;

  // remove function;
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
          const response = await commonAxios.delete(`/bookings/${id}`);
          if (response.data.deletedCount === 1) {
            setBookings(bookings.filter((booking) => booking._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
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
    // get data;
    const getData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          commonAxios.get("/all-services"),
          commonAxios.get(`/bookings/?email=${email}`),
        ]);

        const services = response1.data;
        const bookings = response2.data;

        const mergedData = bookings.map((b) => {
          const service = services.find((s) => s._id === b.serviceId);
          return { ...b, service };
        });
        setBookings(mergedData);
        console.log(mergedData);
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [email, commonAxios]);

  if (loading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-4xl ">{error}!</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="h-screen">
        <h2 className="text-4xl text-center font-extrabold  py-5">
          My Bookings
        </h2>
        <p className="text-gray-500 text-4xl ">There is no Bookings?</p>
      </div>
    );
  }
  return (
    <div className="h-screen">
      <h2 className="text-4xl  font-extrabold text-center pt-5">My Bookings</h2>

      <div className="flex justify-center items-center my-1 ">
        <FaTools className="text-3xl text-orange-500"></FaTools>
      </div>

      {/* table */}
      <div className="overflow-x-auto max-w-4/5 mx-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Service Name</th>
              <th>Provider Name</th>
              <th>Price</th>
              <th>Service Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.service.Service_Name}</td>
                <td>{booking.service.Provider_Name}</td>
                <td>${booking.price}</td>
                <td>{booking.bookingDate}</td>
                <td
                  onClick={() => handleRemoveService(booking._id)}
                  className="btn w-full"
                >
                  <FaTrash className="text-orange-500"></FaTrash>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
