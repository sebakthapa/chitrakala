"use client";
import React from "react";
import Landing from "@/components/Landing";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import MiniCarousel from "@/components/MiniCarousel";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const categories = [
    {
      type: "oil",
      description: "A realm where brushstrokes whispers stories",
      image: "/landing/oil.jpg",
      link: "#",
      color: "#A4C262"
    },
    {
      type: "water",
      description: "Washes of liquid color bloom across thirsty paper",
      image: "/landing/water.jpg",
      link: "#",
      color: "#0099E6"
    },
    {
      type: "digital",
      description: "Pixels unite to sing a song of light.",
      image: "/landing/digital.jpg",
      link: "#",
      color: "#00B3B3"
    },
    {
      type: "sketch",
      description: "Swift strokes hint at forms not yet fully revealed",
      image: "/landing/sketch.jpg",
      link: "#",
      color: "#C0C0C0"
    },

  ]

   
  const cardVariant = {
    visible: { opacity: 1, scale: 1, transition:{duration:0.3, type:"spring", stiffness:100, damping:15} },
    hidden: { scale: 0.8, opacity: 0,   },
    hover: { scale: 1.02, y: -5, transition: { type:"spring", stiffness:100, damping:5} },
    active:{scale:.98},
  }
  return (
    <>
      <Landing />

      <section className="categoriesSection  mt-36 md:px-5">
        <h1 className="font-extrabold font-mono text-5xl p-10 text-center mb-5">Explore by Category<span className="font-extrabold font-mono text-5xl animate_blink">_</span></h1>
        <div className="categoriesContainer px-5 grid flex-wrap gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center items-center justify-center">
          {
            categories.map(({ type, description, image, link, color }, idx) => {
              return (
                <motion.div
                  key={idx}
                  className="block border-2  hover:shadow-lg shadow-[rgba(0,0,0,.1)] hover:border-gray-300 group  transition-all duration-300 ease-out categoryCard  rounded-lg overflow-hidden  h-[570px] xxs:h-[450px]"
                  whileHover="hover"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  whileTap="active"
                  initial="hidden"
                  variants={cardVariant}
                  // viewport={{ once: true }}
                >
                  <Link href={link} className="bg-red-500">
                    <div className="w-full h-[70%] overflow-hidden bg-black ">
                      <Image className="w-full h-full opacity-90 group-hover:opacity-100 hover:filter-none object-cover group-hover:scale-[1.07]  transition    duration-500 ease-in-out" src={image} height={200} width={350}
                      alt={`${type} painting poster`}
                      />
                    </div>
                    <div className="texts relative pt-7 ">
                      <h2 className={`categoryText text-gray-800 group-hover:scale-[1.13] transition duration-300 group-hover:text-black absolute border-[1px] border-[rgba) shadow-md shadow-gray-300 -top-[12px] left-5 rounded-full w-fit px-5 text-lg font-medium`} style={{ background: color }}>{type}</h2>
                      <p className="descriptionText group-hover:-translate-y-[5px] transition-all duration-300 italic text-[1.3rem] p-5  text-gray-500 hover:text-gray-700">{`"${description}"`}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          }
          <div className="md:col-span-2  w-full">
            <MiniCarousel />

          </div>
        </div>
      </section>




      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#e5e7eb"
          fillOpacity="1"
          d="M0,224L48,240C96,256,192,288,288,256C384,224,480,128,576,117.3C672,107,768,181,864,197.3C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
          <Image
            className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src="https://avatars.githubusercontent.com/u/67946056?v=4"
            alt="user profile"
            width={"150"}
            height={"150"}
          />
          <div className="text-center mt-2 text-3xl font-medium">Ajo Alex</div>
          <div className="text-center mt-2 font-light text-sm">@devpenzil</div>
          <div className="text-center font-normal text-lg">Kathmandu</div>
          <div className="px-6 text-center mt-2 font-light text-sm">
            <p>Full time professional digital artist.</p>
          </div>
          <hr className="mt-8" />
          <div className="flex p-4">
            <div className="w-1/2 text-center">
              <span className="font-bold">1.8 k</span> Followers
            </div>
            <div className="w-0 border border-gray-300"></div>
            <div className="w-1/2 text-center">
              <span className="font-bold">2.0 M</span> Likes
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
