import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FirebaseError } from "firebase/app";
import Spinner from "../components/Spinner";

const Login = () => {
  const { login} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then(() => {
        navigation("/");
      })
      .catch((error) => {
        let message;
        if (error.code === "auth/user-not-found") {
          message = "No account found with this email. Please sign up first.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
          message =
            "The email address is not valid. Please check and try again.";
        } else if (error.code === "auth/user-disabled") {
          message = "This account has been disabled. Please contact support.";
        } else {
          message = "Something went wrong. Please try again.";
        }
        setError(message);
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
  return (
    <div className="bg-[#f6f5ed] ">
      <div>
        <h2 className="font-bold text-3xl text-center pt-15">Welcome Back!</h2>
      </div>
      <div className="flex justify-center items-start h-screen w-full mt-10">
        <div className="w-full md:w-4/5 lg:w-2/3 xl:w-2/5 mx-4 md:mx-0 bg-white shadow p-8 rounded">
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="Email"
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
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <p className=" my-2 text-red-500">{error}</p>
              <button
                type="submit"
                className="btn btn-neutral mt-4 w-full text-white secondary-btn border-none"
              >
                Login
              </button>
            </fieldset>
          </form>
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          {/* google button */}

          <button className="btn bg-white text-black border-[#e5e5e5] w-full">
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
            Login with Google
          </button>
          <p className="text-center mt-5 text-[.8rem]">
            You don't have account?{" "}
            <NavLink to="/signup" className="primary-color">
              Signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
