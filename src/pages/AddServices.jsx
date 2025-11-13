import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";

const AddServices = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const commonAxios = useAxios();

  //   save data to mongodb;
  const handleAddService = async (e) => {
    e.preventDefault();
    const serviceName = e.target.serviceName.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const description = e.target.description.value;
    const providerName = e.target.providerName.value;
    const email = e.target.email.value;
    const imageUrl = e.target.imageUrl.value;
    const newService = {
      serviceName,
      category,
      price,
      description,
      providerName,
      email,
      imageUrl,
    };

    try {
      const response = await commonAxios.post("/add-service", newService);
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
                type="text"
                required
                name="price"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </div>
          </div>
          <legend className="fieldset-legend">Price</legend>
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
