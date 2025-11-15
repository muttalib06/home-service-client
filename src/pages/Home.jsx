import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { motion } from "motion/react";
import Testimonial from "../components/Testimonial";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MeetTeam from "../components/MeetTeam";
import { Autoplay } from "swiper/modules";
import { FaChevronDown, FaToolbox, FaTools } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";

const Home = () => {
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/customers");
        setCustomers(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services-6");
        setServices(response.data);
      } catch (error) {
        console.log(error);
        setError("Error");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        <div className="mt-10">
          <div className="flex justify-center items-center px-4 lg:px-0">
            <h2 className="text-4xl text-center font-extrabold">
              Reliable ServEase <br /> Services You Can Trust
            </h2>
          </div>
          <div className="flex justify-center items-center my-4">
            <FaTools className="text-3xl text-orange-500"></FaTools>
          </div>

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

        {/* Team section */}

        <div className="mt-10">
          <MeetTeam></MeetTeam>
        </div>

        {/* Testimonial */}
        <div className="mt-10">
          <div className="flex justify-center items-center">
            <h2 className="text-4xl text-center font-extrabold">
              Happy Client Says About Us
            </h2>
          </div>
          <div className="flex justify-center items-center my-4">
            <FaTools className="text-3xl text-orange-500"></FaTools>
          </div>
          {/* testimonial card */}
          <div className="flex items-center justify-center min-h-screen mt-5 bg-[#f6f5ed] p-4">
            <div className="w-full xl:max-w-4/5 mx-auto">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={Math.min(customers.length, 3)}
                loop={customers.length > 3}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                speed={2000}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {customers.map((customer, index) => (
                  <SwiperSlide key={index}>
                    <Testimonial customer={customer} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
