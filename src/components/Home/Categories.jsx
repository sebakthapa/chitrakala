"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { categories, categoriesColor } from "@/configs/artCategories.config";
const Categories = () => {
  const cardVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hidden: { scale: 1, opacity: 0 },
    hover: {
      scale: 1,
      y: -5,
      transition: { type: "spring", stiffness: 100, damping: 5 },
    },
    active: { scale: 1 },
  };

  // console.log(moment(new Date()).format("Do-MMM YYYY, h:mm a"))

  return (
    <>
      <div className="categoriesContainer px-5 grid flex-wrap gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center items-center justify-center">
        {categories.map(({ type, description, image, link }, idx) => {
          return (
            <motion.div
              key={idx}
              className="md:flex  mt-8 md:-mx-4 w-full  max-w-[30rem] h-[17rem] group hover:-translate-y-2 transition ease-out duration-300"
              // whileHover="hover"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              whileTap="active"
              initial="hidden"
              whileHover="hover"
              variants={cardVariant}
            >
              <Link href={`/arts/popular/${type}`} className="w-full">
                <div className="relative  z-0 w-full h-full rounded-sm overflow-hidden bg-cover bg-center ">
                  <Image
                    className="w-full h-full object-cover  opacity-100 transition duration-500"
                    src={image}
                    alt={`${type} category image`}
                    height={300}
                    width={300}
                  />

                  <motion.div
                    style={{ background: `${categoriesColor[type]}7a` }}
                    className={` opacity-100 p-10 w-full h-full backdrop-blur-sm absolute  top-[0] left-[0] transition-all ease-out duration-300 z-20  flex items-center  `}
                  >
                    <div className="px-10 max-w-xl">
                      <h2 className="capitalize text-2xl font-sans   transition duration-1000  text-gray-700 font-extrabold">
                        {type}
                      </h2>
                      <p className="mt-2 text-lg italic  text-gray-700   transition duration-1000">{`"${description}"`}</p>
                      <button className="group animate-pulse  text-gray-700  mt-3 rounded-full flex items-center gap-2 text-xs   transition duration-1000">
                        <span>Click to browse</span>
                        <span className=" ">
                          <BsArrowRight
                            className="w-0  transition-all duration-500 ease-in-out group-hover:w-4 h-4"
                            fill="gray"
                          />
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default Categories;
