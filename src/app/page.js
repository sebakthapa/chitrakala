"use client";
import React from "react";
import Landing from "@/components/Landing";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import MiniCarousel from "@/components/MiniCarousel";
import Link from "next/link";
const Page = () => {
  return (
    <>
      <Landing />

      <div className="grid h-full grid-cols-12 gap-10 pb-10 m-8 sm:mt-16">
            

            <div className="grid grid-cols-12 col-span-12 gap-7">
                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <Link href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
                    <motion.img
            key={"oil"}
            src={"/landing/oil.jpg"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
                    </Link>
                    <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div className="bg-indigo-400 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Oil</span>
                        </div>
                        <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><Link href="#_">Authenticating users with email verification in Django apps</Link></h2>
                       
                    </div>
                </div>

                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <Link href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
                    <motion.img
            key={"oil"}
            src={"/landing/water.jpg"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
                    </Link>
                    <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div className="bg-red-400 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Water</span>
                        </div>
                        <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><Link href="#_">Authenticating users with email verification in Django apps</Link></h2>
                      
                    </div>
                </div>

        

                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <Link href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
                    <motion.img
            key={"oil"}
            src={"/landing/digital.jpg"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
                    </Link>
                    <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div className="bg-purple-500 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Digital</span>
                        </div>
                        <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><Link href="#_">Creating user registration and authentication system in flask</Link></h2>
                       
                    </div>
                </div>

                <div className="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                    <Link href="#_" className="block transition duration-200 ease-out transform hover:scale-110">
                    <motion.img
            key={"oil"}
            src={"/landing/sketch.jpg"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
                    </Link>
                    <div className="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                        <div className="bg-purple-500 absolute top-0 -mt-3 items-center px-3 py-1.5 leading-none w-auto rounded-full text-xs font-medium uppercase text-white inline-block">
                            <span>Sketch</span>
                        </div>
                        <h2 className="text-base text-gray-500 font-bold sm:text-lg md:text-xl"><Link href="#_">Creating user registration and authentication system in flask</Link></h2>
                       
                    </div>
                </div>

                <div className="flex  flex-col items-start col-span-12 overflow-hidden  rounded-xl md:col-span-6 lg:col-span-8">
                <MiniCarousel />
                </div>
            </div>

        </div>



      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#e5e7eb"
          fillOpacity="1"
          d="M0,224L48,240C96,256,192,288,288,256C384,224,480,128,576,117.3C672,107,768,181,864,197.3C960,213,1056,171,1152,176C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
        <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
          <img
            className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
            src="https://avatars.githubusercontent.com/u/67946056?v=4"
            alt=""
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
