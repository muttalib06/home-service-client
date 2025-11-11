import React from "react";
import { FaFacebook, FaHome, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
   <>
    <div className="bg-[#101d23] text-white py-10 mt-8">
      <div className="flex flex-col lg:flex-row justify-evenly items-start pl-8 lg:pl-0 space-y-8 lg:space-y-0">
        <div className=" space-y-3">
          <div className="flex items-center space-y-3">
          <FaHome className="text-orange-500 text-4xl"></FaHome>
            <h3 className="text-2xl italic font-bold">ServEase</h3>
          </div>
          <p className="text-gray-400">
            We provide the best home repair <br /> services with reliable care.
          </p>
        </div>
        <div className=" space-y-3">
          <h4 className="font-bold">Office</h4>
          <p className="text-gray-400">
            Corporate Office- 175 24th Street,
            <br /> OT- 35 London, UK 265
          </p>
          <div className="space-y-2">
            <p> servease@gmail.com</p>
            <p>+13-1454656</p>
          </div>
        </div>

        <div className=" space-y-3">
          <h4 className="font-bold">Links</h4>
          <ul className="text-gray-400 space-y-3">
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Services</a>
            </li>
            <li>
              <a href="">Project</a>
            </li>
            <li>
              <a href="">Pricing</a>
            </li>
            <li>
              <a href="">FQA</a>
            </li>
          </ul>
        </div>

        <div className=" space-y-3">
          <h4 className="font-bold">Get in Touch</h4>
          <ul className="text-gray-400 space-y-3">
            <li className="flex gap-2">
              <a href="">
                <FaFacebook className="text-white"></FaFacebook>{" "}
              </a>{" "}
              <p>Facebook</p>
            </li>
            <li className="flex gap-2">
              <a href="">
                <FaInstagram className="text-white"></FaInstagram>{" "}
              </a>
              <p>Instagram</p>
            </li>
            <li className="flex gap-2">
              <a href="">
                <FaLinkedin className="text-white"></FaLinkedin>
              </a>
              <p>Linkedin</p>
            </li>
            <li className="flex gap-2">
              <a href="">
                <FaXTwitter className="text-white"></FaXTwitter>
              </a>
              <p>Twitter</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
     <div className="bg-[#101d23] px-10 py-3 ">
       <div className=" flex justify-between items-center border-t border-gray-500 py-3">
         <p className="text-gray-400 text-[.8rem]">© 2025 Shromik. All rights reserved.</p>
        <p className="text-gray-400 text-[.8rem]">Privacy Policy | Terms & Conditions</p>
       </div>
      </div>
   </>
  );
};

export default Footer;
