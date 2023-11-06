"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsCalendar } from "react-icons/bs";
import { BiSolidMap } from "react-icons/bi";

const Exhibition = () => {
    const [exhibition,setExhibition] = useState([])
    useEffect(() => {
      async function fetchData() {
        const response = await fetch('/api/exhibition');
        const data = await response.json();
        setExhibition(data); 
      }
      fetchData();
    }, []);
  return (
    <>
              <div class="block md:flex  md:-mx-2">
            {exhibition.map((item, index) => (
              <div key={index} class="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
                <div class="bg-white rounded-lg overflow-hidden shadow relative">
                  <div className="  overflow-hidden    ">
                    <motion.img
                      key={item}
                      src={item.photo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    />

            
                  </div>

                  <div class="p-4 h-auto md:h-40 lg:h-48">
                    <a
                      href="#"
                      class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                      {item.title}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm line-clamp-2 ">
                      {item.description}
                    </div>
                    <div class="mt-5 flex justify-between">
                      <a
                        class="flex items-center gap-2 bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                       <BiSolidMap/>{item.location}
                      </a>
                      <a
                        class="flex items-center gap-2 bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        <BsCalendar/> {item.datetime.split('T')[0]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
    </>
  )
}

export default Exhibition