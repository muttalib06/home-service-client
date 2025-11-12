import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaHome, FaTimes, FaUser } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch(() => {
        toast.error(
          "Something went wrong during logout. Please try again later."
        );
      });
  };
  return (
    <div className="bg-black flex-col xl:flex-row text-white flex justify-between items-center py-6 md:px-5 mt-3">
      <div className="flex  justify-between items-center w-full xl:w-0 px-4">
        <div className="flex gap-2  items-center">
          <FaHome className="text-orange-500 text-4xl"></FaHome>
          <h3 className="text-2xl italic font-bold">ServEase</h3>
        </div>

        {/* Hamburger button for mobile and tablet */}

        <div className="xl:hidden flex items-center gap-8 text-2xl">
          {user && (
            <div className="p-2 border border-orange-500 rounded-full">
              <NavLink to="/profile">
                <FaUser className="primary-color text-xl"></FaUser>
              </NavLink>
            </div>
          )}
          <FaBars onClick={() => setIsOpen(!isOpen)}></FaBars>
        </div>
      </div>
      {/* Desktop menu */}
      <ul className="hidden xl:flex gap-5">
        <li className="hover:text-[#ff7700]">
          <NavLink>Home</NavLink>
        </li>
        <li className="hover:text-[#ff7700]">
          <NavLink>Services</NavLink>
        </li>
        <li className="hover:text-[#ff7700]">
          <NavLink>My Services</NavLink>
        </li>
        <li className="hover:text-[#ff7700]">
          <NavLink>Add Service</NavLink>
        </li>
        <li className="hover:text-[#ff7700]">
          <NavLink>My Bookings</NavLink>
        </li>
        <li className="hover:text-orange-500">
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>

      {/* mobile and ipad menu */}

      {isOpen && (
        <div className="xl:hidden absolute right-0 mt-10 text-white bg-black w-48 shadow-lg z-50 rounded p-5 ">
          <ul className="space-y-5">
            <li>
              <NavLink onClick={() => setIsOpen(false)}>Home</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsOpen(false)}>Services</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsOpen(false)}>My Services</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsOpen(false)}>Add Service</NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsOpen(false)}>My Bookings</NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                Profile
              </NavLink>
            </li>
          </ul>
          <div className="space-y-3 mt-4 ">
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="py-2 px-3 bg-[#021f2a] text-white w-full rounded"
              >
                Logout
              </button>
            ) : (
              <NavLink
                className="text-center py-2 px-3 bg-[#021f2a] block text-white w-full rounded"
                onClick={() => setIsOpen(false)}
                to="/login"
              >
                Login
              </NavLink>
            )}

            <NavLink
              className="py-2 px-3 block w-full text-center secondary-btn border-none text-white rounded"
              onClick={() => setIsOpen(false)}
              to="/signup"
            >
              Register
            </NavLink>
          </div>
        </div>
      )}

      <div className="hidden xl:flex items-center gap-6    space-x-3 ">
        {user && (
          <div className="p-2 border border-orange-500 rounded-full">
            <NavLink to="/profile">
              <FaUser className="primary-color text-3xl"></FaUser>
            </NavLink>
          </div>
        )}
        <div className="space-x-3">
          {user ? (
            <button
              onClick={handleLogOut}
              className="py-2 px-3 border bg-[#021f2a] text-white rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              className="py-3 px-3 rounded border border-gray-500 bg-[#021f2a] text-white"
              to="/login"
            >
              Login
            </NavLink>
          )}

          <NavLink
            className="py-3 px-3 rounded shadow-none secondary-btn border-none text-white border-color-primary"
            to="/signup"
          >
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
