import React, { use, useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const ServiceDetail = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const commonAxios = useAxios();
  const userEmail = user?.email;
  const data = useLoaderData();
  const service = Array.isArray(data) ? data[0] : data;
  const serviceName = service?.Service_Name;
  const image = service?.Image_URL;
  const description = service?.Description;
  const providerName = service?.Provider_Name;
  const price = service?.Price;
  const email = service?.Email;
  const category = service?.Category;

  //   booking handle;
  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const date = e.target.date.value;
    const serviceId = service?._id;
    const booking = {
      userEmail: email,
      serviceId,
      bookingDate: date,
      price,
    };
    try {
      const response = await commonAxios.post("/bookings", booking);
      if (response.data.insertedId) {
        document.getElementById("my_modal_5").close();
        Swal.fire({
          title: "Service Booked Successfully!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      document.getElementById("my_modal_5").close();
      Swal.fire({
        title: "Oops...",
        text: "Booking failed. Please try again",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail === email) {
      setDisable(true);
    }
  }, [email, userEmail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[90%] mx-auto mt-10 flex flex-col lg:flex-row space-x-15">
      <div className="lg:flex-1">
        <img className="rounded" src={image} alt="" />
        <div className="my-5">
          <h3 className="font-bold text-2xl border-b pb-3">
            Detailed Information
          </h3>
          <div>
            <h5 className="font-bold my-3 text-gray-500">Description</h5>
            <p className="text-justify mt-4">{description}</p>
          </div>
        </div>
      </div>

      <div className="lg:flex-1">
        <div className="space-y-3 border-b pb-4">
          <h2 className="font-bold text-2xl">{serviceName}</h2>
          <p>{category}</p>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex justify-between items-center">
            <p>Price:</p>
            <p className="font-bold">${price}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Provider Name:</p>
            <p>{providerName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Email:</p>
            <p>{email}</p>
          </div>
        </div>

        <button
          disabled={disable}
          onClick={() => {
            document.getElementById("my_modal_5").showModal();
          }}
          className="btn secondary-btn w-full mt-5 text-white"
        >
          {disable ? "Cannot Book Own Service" : "Book Now"}
        </button>
      </div>

      {/* modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full">
          <form onSubmit={handleBook}>
            {/* info of service readonly */}
            <div className="space-y-3 border-b pb-3 border-gray-400">
              <div className="flex gap-5">
                <p className="font-bold">Service Name:</p>
                <p>{serviceName}</p>
              </div>
              <div className="flex gap-5">
                <p className="font-bold">Price:</p>
                <p>${price}</p>
              </div>
              <div className="flex gap-5">
                <p className="font-bold">Provider:</p>
                <p>{providerName}</p>
              </div>
            </div>
            <fieldset className="fieldset mt-4">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                defaultValue={userEmail}
                readOnly
                name="email"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
              <legend className="fieldset-legend">Date</legend>
              <input
                type="date"
                required
                name="date"
                className="input w-full focus:outline-none"
                placeholder="Type here"
              />
            </fieldset>
            <div className="mt-4 flex justify-between items-center">
              <button type="submit" className="secondary-btn btn text-white">
                {loading ? "Booking..." : "Book"}
              </button>

              {/* if there is a button in form, it will close the modal */}
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

export default ServiceDetail;
