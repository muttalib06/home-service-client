import React from "react";
import cleaningImg from "../assets/clean2.jpg";
import electricianImg from "../assets/plumbing.jpg";
import plumbingImg from "../assets/electrician.jpg";

import { Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const Banner = () => {
  const slides = [
    {
      img: cleaningImg,
      title: "Keep Your Home Fresh & Clean",
      description:
        "Enjoy a spotless home with our professional cleaning services for every corner of your space.Sit back, relax, and let HomeHero make your home shine like new every day!",
    },
    {
      img: plumbingImg,
      title: "Reliable Plumbing Solutions",
      description:
        "Fast, reliable, and professional plumbing services for your home or office.Our trusted experts handle everything from repairs to installations, keeping your plumbing worry-free!",
    },
    {
      img:electricianImg ,
      title: "Professional Electricians",
      description: "Safe and reliable electrical services for your home or office.Our certified electricians handle repairs, installations, and maintenance with expertise.",
    },
  ];
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 5000 }}
      navigation
      pagination={{ clickable: true }}
      loop
      slidesPerView={1}
      speed={1000}
      fadeEffect={{ crossFade: true }}
      className="paginationCustom"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-[600px]  bg-cover bg-center flex items-center justify-start "
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-black/30 px-5 space-y-5 pt-20 pl-8">
              <h1 className="text-3xl md:text-7xl font-bold text-white lg:max-w-1/2">
                {slide.title}
              </h1>
              <p className="font-bold text-white lg:max-w-1/2">
                {slide.description}
              </p>
              <button className="px-3 py-3 rounded secondary-btn border-none text-white">
                Explore More
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
