import React from "react";

const Navbar2 = () => {
  return (
    <div className="bg-black text-white flex flex-col lg:flex-row justify-between items-center py-6 md:px-5 mt-3">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex gap-2  items-center">
          <FaHome className="text-orange-500 text-4xl"></FaHome>
          <h3 className="text-2xl italic font-bold">ServEase</h3>
        </div>

        {/* Hamburger button for mobile and tablet */}
        <div className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          <FaBars></FaBars>
        </div>
      </div>
      {/* Desktop menu */}
      <ul className="hidden lg:flex gap-5">
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

      {/* mobile and ipad menu */}

      {isOpen && (
        <div className="lg:hidden absolute right-0 mt-8 text-black bg-white w-48 shadow-lg z-50 rounded">
          <ul className="space-y-3">
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
        </div>
      )}

      <div className="hidden lg:block space-x-3 ">
        <button className="btn bg-[#021f2a] text-white">Login</button>
        <button className=" btn  shadow-none secondary-btn border-none text-white border-color-primary">
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar2;
