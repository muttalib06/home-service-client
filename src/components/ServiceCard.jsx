import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "motion/react";
import { NavLink } from "react-router";

const ServiceCard = ({ service }) => {
  const { Image_URL, Service_Name, Description, _id } = service;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="h-full flex flex-col bg-white rounded-lg overflow-hidden  transition-shadow">
        {/* Image Section */}
        <div>
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={Image_URL}
            alt={Service_Name}
          />
        </div>

        {/* Content Section */}
        <div className="px-8 py-12 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-8 flex-1">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {Service_Name}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-3">
                {Description}
              </p>
            </div>

            {/* Arrow Button */}
            <NavLink
              to={`/service-detail/${_id}`}
              className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110  hover:shadow-lg "
            >
              <BsArrowRight className="w-7 h-7 text-white" strokeWidth={2} />
            </NavLink>
          </div>

          {/* Bottom Border Line */}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
