
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ServiceCard from "../components/ServiceCard";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import { FaChevronDown, FaTools } from "react-icons/fa";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const commonAxios = useAxios();

  // filter function;

  const handleFilter = async () => {
    setMin("");
    setMax("");
    setLoading(true);
    try {
      const response = await commonAxios.get(
        `/filter-services/?min=${min}&max=${max}`
      );
      setServices(response.data);
    } catch (error) {
      Swal.fire({
        title: "Failed to filter",
        text: "Failed to filter the service. Please try again later.",
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const response = await commonAxios.get("/all-services");
      setServices(response.data);
    } catch {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await commonAxios.get("/all-services");
        setServices(response.data);
      } catch {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center items-center">
        <h2 className="text-4xl text-center font-extrabold">
          Reliable ServEase <br /> Services You Can Trust
        </h2>
      </div>

      <div className="flex justify-center items-center my-4">
        <FaTools className="text-3xl text-orange-500"></FaTools>
      </div>

      <div className="flex justify-end items-center max-w-4/5 mx-auto">
        <details className="dropdown">
          <summary className="btn m-1 text-orange-500">
            {" "}
            Price Filter <FaChevronDown></FaChevronDown>
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <legend className="fieldset-legend">Min Price</legend>
              <input
                onChange={(e) => setMin(e.target.value)}
                type="number"
                value={min}
                className="input"
                placeholder="Type here"
              />
            </li>
            <li>
              <legend className="fieldset-legend">Max Price</legend>
              <input
                onChange={(e) => setMax(e.target.value)}
                type="number"
                value={max}
                className="input"
                placeholder="Type here"
              />
            </li>
            <li className="mt-2">
              <button
                onClick={handleFilter}
                className="btn text-white secondary-btn"
              >
                Filter
              </button>
            </li>
          </ul>
        </details>
        <button onClick={handleReset} className="text-orange-500 btn">
          Reset Filter
        </button>
      </div>

      {/* services */}

      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-4xl ">{error}!</p>
        </div>
      ) : (
        <div className="xl:max-w-full xl:px-4 2xl:px-0  2xl:max-w-4/5 mx-auto px-4 grid lg:grid-cols-3 gap-6 mt-10">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
