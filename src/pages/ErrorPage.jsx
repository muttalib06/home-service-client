import React from "react";
import { NavLink } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-9xl opacity-10 pointer-events-none animate-bounce">
        404
      </div>
      <div className="absolute bottom-10 right-10 text-9xl opacity-10 pointer-events-none animate-pulse">
        !
      </div>

      {/* Main container */}
      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full text-center relative z-10">
        {/* Oops heading */}
        <h1 className="text-9xl font-black bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent mb-4 animate-pulse">
          Oops!
        </h1>

        {/* Error code */}
        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-widest mb-6">
          404 - Page Not Found
        </h2>

        {/* Error message */}
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>

        {/* Button */}
        <NavLink
          to="/"
          className="px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-100"
        >
          Go to Homepage
        </NavLink>
      </div>
    </div>
  );
};

export default ErrorPage;
