import React from "react";
import { BsQuote } from "react-icons/bs";

const Testimonial = ({ customer }) => {
  const { name, role, review, image } = customer;
  return (
    <div className="mt-10">
      {/* testimonial card */}
      <div className="bg-white h-96 rounded-lg shadow-lg p-12 max-w-md w-full relative">
        {/* Orange Quote Icon */}
        <div className="absolute top-0 left-8 -translate-y-1/2">
          <div className="bg-orange-500 w-14 h-14 rounded flex items-center justify-center">
            <BsQuote className="w-8 h-8 text-white fill-white" />
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-600 text-lg leading-relaxed mt-8 text-center">
          {review}
        </p>

        {/* Author Section */}
        <div className="flex items-center gap-4 mt-10">
          {/* Profile Image */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Author Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-500 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
