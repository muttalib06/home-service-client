import React from "react";
import { NavLink } from "react-router";

const Login = () => {
  return (
    <div className="bg-[#f6f5ed] ">
      <div>
        <h2 className="font-bold text-3xl text-center pt-15">Welcome Back!</h2>
      </div>
      <div className="flex justify-center items-start h-screen w-full mt-10">
        <div className="w-1/4 bg-white shadow p-8 rounded">
          <form>
            <fieldset className="fieldset">
            
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              
              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4 w-full text-white secondary-btn border-none">
                Login
              </button>
            </fieldset>
          </form>
          <div class="flex items-center my-3">
            <div class="flex-grow border-t border-gray-300"></div>
            <span class="mx-4 text-gray-500">or</span>
            <div class="flex-grow border-t border-gray-300"></div>
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
            <NavLink to="/signup" className="primary-color">Signup</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
