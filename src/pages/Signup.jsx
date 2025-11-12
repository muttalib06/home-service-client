import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Spinner from "../components/Spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const { signupWithGoogle, setUser, signup, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigate();

  // create user with email and password

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoUrl = e.target.photo_url.value;
    setError("");
    setLoading(true);
    // Password validation
    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter (A-Z).");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter (a-z).");
      setLoading(false);
      return;
    }

    // If validation passes,call signup function;
    signup(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigation("/");
      })
      .catch((error) => {
        let message = "";

        if (error.code === "auth/email-already-in-use") {
          message =
            "This email is already registered. Please login or use a different email.";
        } else if (error.code === "auth/invalid-email") {
          message =
            "The email address is not valid. Please check and try again.";
        } else if (error.code === "auth/weak-password") {
          message = "Password is too weak. Please use at least 6 characters.";
        } else if (error.code === "auth/user-not-found") {
          message = "No account found with this email. Please sign up first.";
        } else {
          message = "Something went wrong. Please try again.";
        }

        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // google sign in;
  const handleSignUpWithGoogle = () => {
    setError2("");
    setLoading(true);
    signupWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigation("/");
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          setError2(
            "Sign-up window was closed before completing the process. Please try again."
          );
        } else if (error.code === "auth/network-request-failed") {
          setError2(
            "Network error occurred. Please check your internet connection and try again."
          );
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          setError2(
            "An account already exists with this email. Try signing in instead."
          );
        } else {
          setError2(
            "Something went wrong during sign-up. Please try again later."
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
  console.log(user);
  return (
    <div className="bg-[#f6f5ed] ">
      <div>
        <h2 className="font-bold text-3xl text-center pt-15">
          Get Started with <span className="italic">ServEase</span>
        </h2>
      </div>
      <div className="flex justify-center items-start h-screen w-full mt-10">
        <div className=" w-full md:w-4/5 lg:w-2/3 xl:w-2/5  bg-white shadow p-8 rounded mx-4 md:mx-0">
          <form onSubmit={handleSignUp}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input w-full"
                placeholder="Name"
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Email"
              />
              <label className="label">Photo URl</label>
              <input
                type="text"
                name="photo_url"
                className="input w-full"
                placeholder="Photo URL"
              />
              <div className="relative w-full">
                <label className="label">Password</label>
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  className="input w-full pr-10"
                  placeholder="Password"
                />
                <button
                  onClick={() => setVisible(!visible)}
                  className="absolute right-3 top-8 text-md z-10"
                >
                  {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className=" my-2 text-red-500">{error}</p>
              <button
                type="submit"
                className="btn btn-neutral mt-4 w-full text-white secondary-btn border-none"
              >
                Register
              </button>
            </fieldset>
          </form>
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* google button */}

          <p className="text-[.8rem] my-2 text-red-500">{error2}</p>

          <button
            onClick={handleSignUpWithGoogle}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Signup with Google
          </button>
          <p className="text-center mt-5 text-[.8rem]">
            Already have an account?{" "}
            <NavLink className="primary-color" to="/login">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
