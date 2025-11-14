import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import { BsTrash } from "react-icons/bs";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const [service, setService] = useState({});
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

  // handle Modal;
  const handleModal = async (id) => {
    const editService = myServices.find((myService) => myService?._id === id);
    setService(editService);
  };

  // update data ;
  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = service?._id;
    const Service_Name = e.target.serviceName.value;
    const Price = parseFloat(e.target.price.value);
    const Provider_Name = e.target.providerName.value;
    const updatedData = {
      Service_Name,
      Price,
      Provider_Name,
    };
    try {
      await commonAxios.patch(`/services/${id}`, updatedData);
      setMyServices((prevServices) =>
        prevServices.map((s) =>
          s._id === id ? { ...s, Service_Name, Price, Provider_Name } : s
        )
      );

      document.getElementById("my_modal_5").close();

      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Service updated successfully.",
        icon: "success",
      });
    } catch {
      document.getElementById("my_modal_5").close();
      Swal.fire({
        title: "Failed to update",
        text: "Failed to update the service. Please try again later.",
        icon: "error",
      });
    }
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
        ) : myServices?.length === 0 ? (
          <div className="flex justify-center items-center h-screen flex-col space-y-3">
            <p className="text-gray-500 text-4xl ">There is no service!</p>
            <p className="text-[.8rem]">
              To add service,Click the link-
              <NavLink to="/add-services" className="text-orange-500 underline">
                Go to add service
              </NavLink>
            </p>
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
              {myServices?.map((myService, index) => (
                <tr className="bg-base-200" key={myService?._id}>
                  <td>{index + 1}</td>
                  <td>{myService?.Provider_Name}</td>
                  <td>{myService?.Email}</td>
                  <td>{myService?.Service_Name}</td>
                  <td>{myService?.Price}</td>
                  <td className="space-x-3">
                    <button
                      onClick={() => handleRemoveService(myService?._id)}
                      className="text-2xl btn "
                    >
                      <BsTrash></BsTrash>
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_5").showModal();
                        handleModal(myService?._id);
                      }}
                      className="secondary-btn btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full">
          <form onSubmit={handleUpdate}>
            {/* first form */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Service Name</legend>
              <input
                type="text"
                defaultValue={service?.Service_Name}
                required
                name="serviceName"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Price</legend>
              <input
                type="number"
                defaultValue={service?.Price}
                required
                name="price"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Provider Name</legend>
              <input
                type="text"
                defaultValue={service?.Provider_Name}
                required
                name="providerName"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Email</legend>
              <input
                type="Email"
                required
                name="email"
                defaultValue={email}
                readOnly
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </fieldset>
            <div className="mt-4 flex justify-between items-center">
              <button type="submit" className="secondary-btn btn text-white">
                Update
              </button>

              <button
                type="button"
                onClick={() => {
                  document.getElementById("my_modal_5").close();
                }}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyServices;
