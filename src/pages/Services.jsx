import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all-services");
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
        <h2 className="text-4xl text-center border-b-2 border-orange-500 pb-3">
          Reliable ServEase <br /> Services{" "}
          <span className="font-bold">You Can Trust</span>{" "}
        </h2>
      </div>

      {/* services */}

      {loading ? (
        <Spinner></Spinner>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-500 text-4xl ">{error}!</p>
        </div>
      ) : (
        <div className="mt-10 max-w-4/5 mx-auto grid grid-cols-3 gap-6">
                {
                        services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
        </div>
      )}
    </div>
  );
};

export default Services;
