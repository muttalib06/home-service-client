import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";

const Home = () => {
        const [services,setServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/services-6")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err))
      .finally();
  }, []);
  return (
    <div>
      <Banner></Banner>

      <div className="mt-10">
       <div className="flex justify-center items-center px-4 lg:px-0">
         <h2 className="text-4xl text-center border-b-2 border-orange-500 pb-3">
          Reliable ServEase <br /> Services{" "}
          <span className="font-bold">You Can Trust</span>{" "}
        </h2>
       </div>

        <div className="xl:max-w-full xl:px-4 2xl:px-0  2xl:max-w-4/5 mx-auto px-4 grid lg:grid-cols-3 gap-6 mt-10">
                {
                        services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }

        </div>
      </div>
    </div>
  );
};

export default Home;
