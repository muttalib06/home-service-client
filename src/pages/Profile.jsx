import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaUser } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user, updateUserProfile, setUser } = useContext(AuthContext);
  const displayName = user?.displayName;
  const photoURL = user?.photoURL;
  const email = user?.email;
  const metadata = user?.metadata;
  const lastLoginTime = new Date(metadata?.lastSignInTime).toLocaleString();
  const [isEditing, setIsEditing] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(photoURL || "");
  const [name, setName] = useState(displayName || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // update profile function;
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    updateUserProfile(name, photoUrl)
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photoUrl });

        setIsEditing(false);
      })
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          setError("Network error! Please check your internet connection.");
        } else if (error.code === "auth/user-token-expired") {
          setError("Session expired. Please sign in again.");
        } else if (error.code === "auth/invalid-user-token") {
          setError(
            "Your session is invalid. Try logging out and signing in again."
          );
        } else {
          setError("Profile update failed! Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if(loading){
    return <Spinner></Spinner>
  }
  return (
    <div className="bg-[#f6f5ed] h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4 md:mx-0">
        <div>
          <h2 className="text-lg text-center my-5 font-semibold text-gray-800">
            Profile
          </h2>
          <div className="flex justify-center mb-6">
            <div className=" bg-gray-200 rounded-full flex items-center justify-center">
              <img className="rounded-full w-16 h-16" src={photoURL} alt="" />
            </div>
          </div>
        </div>

        {!isEditing ? (
          <div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-base text-gray-800 font-medium">
                  {displayName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base text-gray-800">{email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Login Time</p>
                <p className="text-base text-gray-800">{lastLoginTime}</p>
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
          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  defaultValue={name}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  PhotoURL
                </label>
                <input
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  type="text"
                  defaultValue={photoUrl}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 secondary-btn text-white font-semibold py-2 rounded transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
            <p className="text-[.8rem] text-red-500 my-3 text-center">
              {error}
            </p>
          </form>
        )}

        {/* Edit mode */}
      </div>
    </div>
  );
};

export default Profile;
