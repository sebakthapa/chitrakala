"use client"
import React,{ useState,useEffect } from "react";
import Carousel from "@/components/Carousel";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
  
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



<main class="py-4">
        <div class="px-4">
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

                    <div className="pp flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                      <Image src={"/a1.png"} width={50} height={50} />
                    </div>
                  </div>

                  <div class="p-4 h-auto md:h-40 lg:h-48">
                    <a
                      href="#"
                      class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                      {item.title}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {item.description}
                    </div>
                    <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                       {item.location}
                      </a>
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        {item.datetime.split('T')[0]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>




    
    </>
  );
};

export default Page;
