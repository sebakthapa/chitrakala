"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import Carousel from "@/components/Carousel";
const Page = () => {
  const [galleryData, setGalleryData] = useState([]);
  useEffect(() => {
    async function fetchGalleryData() {
      try {
        const response = await axios.get("/api/products");
        setGalleryData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGalleryData();
  }, []);

  return (
    <>
      <div className="flex justify-center">

      <Carousel />
      </div>
      <h1 className="text-center font-extrabold text-2xl pt-10 pb-10">Gallery</h1>

      <main class="py-4">
        <div class="px-4">
          <div class="block md:flex  md:-mx-2">
            {galleryData.map((item, index) => (
              <div key={index} class="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
                <div class="bg-white rounded-lg overflow-hidden shadow relative">
                  <div className=" h-[30vh] overflow-hidden  ">
                    <motion.img
                      key={item.category}
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
                      <Image alt="a1 image" src={"/a1.png"} width={50} height={50} />
                    </div>
                  </div>

                  <div class="p-4 h-auto md:h-40 lg:h-48">
                    <a
                      href="#"
                      class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                      {item.name}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {item.description}
                    </div>
                    <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        #forest
                      </a>
                      <a
                        class="inline bg-gray-300 py-1 px-2 rounded-full text-xs lowercase text-gray-700"
                        href="#"
                      >
                        #walk
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
