import React from "react";
import logo from "../assets/logo-home-service.png";
import { NavLink } from "react-router";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between items-center py-6 px-5 mt-3">
      <div className="flex gap-2  items-center">
        <FaHome className="text-orange-500 text-4xl"></FaHome>
        <h3 className="text-2xl italic font-bold">ServEase</h3>
      </div>
      <ul className="flex gap-5">
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Services</NavLink>
        </li>
        <li>
          <NavLink>My Services</NavLink>
        </li>
        <li>
          <NavLink>Add Service</NavLink>
        </li>
        <li>
          <NavLink>My Bookings</NavLink>
        </li>
        <li>
          <NavLink>Profile</NavLink>
        </li>
      </ul>

      <div className="space-x-3 ">
        <button className="btn primary-btn bg-[#021f2a] border-color-primary text-white border-color-primary">Login</button>
        <button className=" btn  shadow-none bg-[#021f2a] primary-btn text-white border-color-primary">Register</button>
      </div>
    </div>
  );
};

export default Navbar;
