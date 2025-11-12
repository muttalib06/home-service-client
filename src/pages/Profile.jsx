import React, { useEffect, useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() =>{
        window.scrollTo(0,0);
  },[])
  return (
    <div className="bg-[#f6f5ed] h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4 md:mx-0">
        <div>
          <h2 className="text-lg text-center my-5 font-semibold text-gray-800">
            Profile
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
              <FaUser></FaUser>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-base text-gray-800 font-medium">Muttalib</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base text-gray-800">muttalib@gmail.com</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Mobile</p>
                <p className="text-base text-gray-800">01314198574</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base text-gray-800">USA</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 secondary-btn text-white font-semibold py-2 rounded flex items-center justify-center gap-2 transition"
            >
              <FaEdit size={18} />
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Mobile
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 secondary-btn text-white font-semibold py-2 rounded transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Edit mode */}
      </div>
    </div>
  );
};

export default Profile;
