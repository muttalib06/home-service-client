import React from "react";
import { motion } from "motion/react";
import team1 from "../assets/team/cleaner.jpeg";
import team2 from "../assets/team/door-repair2.webp";
import team3 from "../assets/team/plumber.avif";
import team4 from "../assets/team/plumber2.jpg";

const MeetTeam = () => {
  return (
    <div className="bg-[#101d23] py-5 ">
      <div className="flex flex-col lg:flex-row gap-6 text-white items-center max-w-4/5 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="flex-1 grid grid-cols-2 gap-3"
        >
          <img className="h-full rounded" src={team1} alt="" />
          <img className="h-full rounded" src={team2} alt="" />
          <img className="h-full rounded" src={team3} alt="" />
          <img className="h-full rounded" src={team4} alt="" />
        </motion.div>

        <div className="flex-1 space-y-4">
          <h2 className="font-bold text-5xl">Meet Our Expert Team</h2>
          <p>
            Our team of skilled professionals is dedicated to delivering
            top-quality service and ensuring complete customer satisfaction.
            Meet the experts who make it all happen.
          </p>
          <button className=" px-2 py-3 rounded secondary-btn border-none text-white">
            Explore Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetTeam;
