"use client";
import React from "react";
import Landing from "@/components/Landing";
import Carousel from "@/components/ArtDetail";
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
  const images = [
    "https://img.freepik.com/premium-photo/spectacular-abstract-city-orange-teal-digital-art-3d-illustration_31965-49704.jpg",
    "https://images.nightcafe.studio/jobs/cNxmQICjMo8xdPi31Zjt/cNxmQICjMo8xdPi31Zjt_6.9444x.jpg?tr=w-9999,c-at_max",
    "https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/43339/58776/1571390056201_6D1F1BD8-CA91-4B86-AD0F-249681E867B0__71341.1571633277.jpg?c=2",
    "https://i.pinimg.com/736x/60/d3/6f/60d36f7dec5f9a2818a08b964def0190.jpg",
  ];
   
  const cardVariant = {
    visible: { opacity: 1, scale: 1, transition:{duration:0.3, type:"spring", stiffness:100, damping:15} },
    hidden: { scale: 0.8, opacity: 0,   },
    hover: { scale: 1.02, y: -5, transition: { type:"spring", stiffness:100, damping:5} },
    active:{scale:.98},
  }
  return (
    <>
      <Landing />
   

      <section className=" bg-slate-100 categoriesSection  md:my-36 md:px-5 md:pb-36">
        <h1 className="font-semibold font-poppins text-5xl p-10 text-center mb-5">Explore by Category<span className="font-semibold font-sans text-5xl animate_blink">_</span></h1>
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
             <MiniCarousel images={images} />

          </div>
        </div>
      </section>




   

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
