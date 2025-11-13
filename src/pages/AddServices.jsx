import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const AddServices = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const commonAxios = useAxios();

  //   save data to mongodb;
  const handleAddService = async (e) => {
    e.preventDefault();
    const Service_Name = e.target.serviceName.value;
    const Category = e.target.category.value;
    const Price = parseFloat(e.target.price.value);
    const Description = e.target.description.value;
    const Provider_Name = e.target.providerName.value;
    const Email = e.target.email.value;
    const Image_URL = e.target.imageUrl.value;
    const newService = {
      Service_Name,
      Category,
      Price,
      Description,
      Provider_Name,
      Email,
      Image_URL,
    };

    try {
      const response = await commonAxios.post("/add-service", newService);
      if (response.data.insertedId) {
        Swal.fire({
          title: "Added Successfully",
          icon: "success",
          draggable: true,
          confirmButtonColor: "#ff7700",
        });
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error (like validation or DB issue)
        Swal.fire({
          title: "Failed to Add Service",
          text:
            error.response.data?.message ||
            "There was a problem saving your service. Please try again later.",
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#d33",
        });
      } else if (error.request) {
        // No response from server
        Swal.fire({
          title: "Network Error ⚠️",
          text: "Unable to connect to the server. Please check your internet connection.",
          icon: "warning",
          confirmButtonText: "Retry",
          confirmButtonColor: "#f39c12",
        });
      } else {
        // Unexpected error
        Swal.fire({
          title: "Unexpected Error",
          text: "Something went wrong while adding your service.",
          icon: "error",
          confirmButtonText: "Close",
          confirmButtonColor: "#555",
        });
      }
    } finally {
      console.log("save data to mongodb successfully");
    }
  };

  return (
    <div className="bg-primary h-screen">
      <h2 className="font-bold text-2xl text-center py-8">Add a New Service</h2>

      <form
        onSubmit={handleAddService}
        className="shadow-xl p-6 max-w-2/4 mx-auto rounded bg-white"
      >
        {/* first form */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Service Name</legend>
          <input
            type="text"
            required
            name="serviceName"
            className="input w-full focus:outline-none"
            placeholder="Type here"
          />

          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <legend className="fieldset-legend">Category</legend>
              <input
                type="text"
                required
                name="category"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </div>
            <div className="flex-1">
              <legend className="fieldset-legend">Price</legend>
              <input
                type="number"
                required
                name="price"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </div>
          </div>
          <legend className="fieldset-legend">Description</legend>
          <textarea
            className="textarea w-full resize-none focus:outline-none"
            name="description"
            required
            placeholder="Description"
          ></textarea>

          <div className="flex justify-between gap-5">
            <div className="flex-1">
              <legend className="fieldset-legend">Provider Name</legend>
              <input
                type="text"
                required
                name="providerName"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </div>
            <div className="flex-1">
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
            </div>
          </div>

          <legend className="fieldset-legend">Image URL</legend>
          <input
            type="text"
            required
            name="imageUrl"
            className="input w-full focus:outline-none"
            placeholder="Type here"
          />
        </fieldset>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="secondary-btn btn text-white">
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
