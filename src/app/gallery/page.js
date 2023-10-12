"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import Carousel from "@/components/Carousel";
const page = () => {
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
            <h1 className='text-center font-extrabold text-2xl '>Gallery</h1>

      <div className="bg-[#f4f4f4] flex  m-5 justify-center items-center overflow-hidden ">
        <div className="w-screen sm:w-1/2 m-10">
          <Carousel />
        </div>
      </div>
      <div className="cardProduct flex">
        <div className="cards flex flex-wrap bg-[#f4f4f4] m-5">
          {galleryData.map((item, index) => (
            <div
              key={index}
              className="card m-5  relative max-w-[20rem] max-h-[25rem] overflow-hidden  shadow-lg"
            >
              <div className="cover overflow-hidden h-[15rem]   ">
                <motion.img
                  key={item.category}
                  src={item.photo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />

                <div className="pp flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                  <Image src={"/a1.png"} width={50} height={50} />
                </div>
              </div>
              <div className="desc pt-5 h-[10rem]  bg-white overflow-hidden flex flex-col justify-center items-center">
                <h1 className=" font-bold text-2xl p-2 break-all text-center">
                  {item.name}
                </h1>
                <h4 className="p-2 font-bold text-gray-600 text-sm text-center">
                  {item.description}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
