import React, { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { motion, useInView } from "motion/react";

const Home = () => {
  const [services, setServices] = useState([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  useEffect(() => {
    axios
      .get("http://localhost:3000/services-6")
      .then((res) => setServices(res.data))
      .catch((err) => console.log(err))
      .finally();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-hidden"
    >
      <div>
        <Banner></Banner>

        {/* services section */}

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 2 }}
          className="mt-10"
        >
          <div className="mt-10">
            <div className="flex justify-center items-center px-4 lg:px-0">
              <h2 className="text-4xl text-center border-b-2 border-orange-500 pb-3">
                Reliable ServEase <br /> Services{" "}
                <span className="font-bold">You Can Trust</span>{" "}
              </h2>
            </div>


            <div className="xl:max-w-full xl:px-4 2xl:px-0  2xl:max-w-4/5 mx-auto px-4 grid lg:grid-cols-3 gap-6 mt-10">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service}></ServiceCard>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
