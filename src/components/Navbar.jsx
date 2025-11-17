import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaHome, FaTimes, FaUser } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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
          <div className="text-white">
            <label className="swap swap-rotate">
              <input type="checkbox" checked={isDark} onChange={toggleTheme} />

              {isDark ? (
                <svg
                  className="swap-on h-8 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              ) : (
                <svg
                  className="swap-off h-8 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              )}
            </label>
          </div>
          {user && (
            <div className="p-2">
              <NavLink to="/profile">
                <FaUser className="text-xl"></FaUser>
              </NavLink>
            </div>
          )}
          <FaBars onClick={() => setIsOpen(!isOpen)}></FaBars>
        </div>
      </div>
      {/* Desktop menu */}
      <ul className="hidden xl:flex gap-5">
        <li className="hover:text-[#ff7700]">
          <NavLink
            className={({isActive}) => (isActive ? "text-[#ff7700]" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="hover:text-[#ff7700]">
          <NavLink
            className={({isActive}) => (isActive ? "text-[#ff7700]" : "")}
            to="/services"
          >
            Services
          </NavLink>
        </li>
        {user && (
          <div className="flex gap-5">
            <li className="hover:text-[#ff7700]">
              <NavLink to="my-services">My Services</NavLink>
            </li>
            <li className="hover:text-[#ff7700]">
              <NavLink
                className={({isActive}) => (isActive ? "text-[#ff7700]" : "")}
                to="add-services"
              >
                Add Service
              </NavLink>
            </li>
            <li className="hover:text-[#ff7700]">
              <NavLink
                className={({isActive}) => (isActive ? "text-[#ff7700]" : "")}
                to="my-bookings"
              >
                My Bookings
              </NavLink>
            </li>
            <li className="hover:text-orange-500">
              <NavLink
                className={({isActive}) => (isActive ? "text-[#ff7700]" : "")}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          </div>
        )}
      </ul>

      {/* mobile and ipad menu */}

      {isOpen && (
        <div className="xl:hidden absolute right-0 mt-10 text-white bg-black w-48 shadow-lg z-50 rounded p-5 ">
          <ul className="space-y-5">
            <li>
              <NavLink to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={() => setIsOpen(false)}>
                Services
              </NavLink>
            </li>

            {user && (
              <div className="space-y-5">
                <li>
                  <NavLink to="my-services" onClick={() => setIsOpen(false)}>
                    My Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="add-services" onClick={() => setIsOpen(false)}>
                    Add Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="my-bookings" onClick={() => setIsOpen(false)}>
                    My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                    Profile
                  </NavLink>
                </li>
              </div>
            )}
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

      <div className="hidden xl:flex items-center gap-6 justify-center space-x-3 ">
        {/* Theme button */}
        <div className="text-white">
          <label className="swap swap-rotate">
            <input type="checkbox" checked={isDark} onChange={toggleTheme} />

            {isDark ? (
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            ) : (
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            )}
          </label>
        </div>
        {user && (
          <div className="p-2">
            <NavLink to="/profile">
              <FaUser className="text-3xl"></FaUser>
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
