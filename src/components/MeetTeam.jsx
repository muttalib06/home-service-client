import React from "react";
import team1 from "../assets/team/CP7A9155-1-scaled.jpg";
import team2 from "../assets/team/titan-service-plumbing-howell.webp";
import team3 from "../assets/team/young-cleaning-guy-wearing-uniform-cap-with-gloves-isolated-white-wall.jpg";
import team4 from "../assets/team/young-hansdome-man-wearing-apron-holding-bucket-with-cleaning-tools.jpg";

const MeetTeam = () => {
  return (
    <div className="bg-[#101d23] py-5 ">
     <div className="flex gap-6 text-white items-center max-w-4/5 mx-auto">
         <div className="flex-1 grid grid-cols-2 gap-3">
        <img className="h-full" src={team1} alt="" />
        <img className="h-full" src={team2} alt="" />
        <img className="h-full" src={team3} alt="" />
        <img className="h-full" src={team4} alt="" />
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="font-bold text-5xl">Meet Our Expert Team</h2>
        <p>
          Our team of skilled professionals is dedicated to delivering
          top-quality service and ensuring complete customer satisfaction. Meet
          the experts who make it all happen."
        </p>
        <button className="btn secondary-btn border-none text-white">Explore Our Team</button>
      </div>
     </div>
    </div>
  );
};

export default MeetTeam;
