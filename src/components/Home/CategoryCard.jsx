"use client"
import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const CategoryCard = () => {
    const cardVariant = {
        visible: { opacity: 1, scale: 1, transition:{duration:0.3, type:"spring", stiffness:100, damping:15} },
        hidden: { scale: 0.8, opacity: 0,   },
        hover: { scale: 1.02, y: -5, transition: { type:"spring", stiffness:100, damping:5} },
        active:{scale:.98},
      }

      const categories = [
        {
          type: "oil",
          description: "A realm where brushstrokes whispers stories",
          image: "/landing/oil.jpg",
          link: `/gallery?category=oil`,
          color: "#ffcc80"
        },
        {
          type: "water",
          description: "Washes of liquid color bloom across thirsty paper",
          image: "/landing/water.jpg",
          link: `/gallery?category=water`,
          color: "#b2dfdb"
        },
        {
          type: "digital",
          description: "Pixels unite to sing a song of light.",
          image: "/landing/digital.jpg",
          link: `/gallery?category=digital`,
          color: "#b0bec5"
        },
        {
          type: "sketch",
          description: "Swift strokes hint at forms not yet fully revealed",
          image: "/landing/sketch.jpg",
          link: `/gallery?category=sketch`,
          color: "#cfd8dc"
        },
        {
          type: "abstract",
          description: "Swift strokes hint at forms not yet fully revealed",
          image: "https://mueblesitaliano.ph/wp-content/uploads/2019/07/Contemporary-Abstract-Art-with-Ivan-Acuna-1024x794.jpg",
          link: `/gallery?category=abstract`,
          color: "#cfd8dc"
        },
        {
          type: "other",
          description: "Swift strokes hint at forms not yet fully revealed",
          image: "https://t4.ftcdn.net/jpg/05/62/21/11/360_F_562211118_ITosCsVOmLDnxmOAaHnlhyCqvMsb2QKr.jpg",
          link: `/gallery?category=other`,
          color: "#cfd8dc"
        },
    
      ]  

  return (
    <>
        <div className="categoriesContainer px-5 grid flex-wrap gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center items-center justify-center">
          {
            categories.map(({ type, description, image, link, color }, idx) => {
              return (
                <motion.div
                  key={idx}
                  className="block border-2  hover:shadow-lg shadow-[rgba(0,0,0,.1)] hover:border-gray-300 group  transition-all duration-300 ease-out categoryCard  rounded-lg overflow-hidden  h-fit xxs:h-[450px]"
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
                      <motion.img className="w-full h-full opacity-90 group-hover:opacity-100 hover:filter-none object-cover group-hover:scale-[1.07]  transition    duration-500 ease-in-out" src={image} height={200} width={350}
                      alt={`${type} painting poster`}
                      />
                    </div>
                    <div className="texts relative pt-7 ">
                      <h2 className={`categoryText text-gray-500 group-hover:scale-[1.13] transition duration-300 group-hover:text-gray-700 absolute border-[1px] border-[rgba) shadow-md shadow-gray-300 -top-[12px] left-5 rounded-full w-fit px-5 text-lg font-medium`} style={{ background: color }}>{type}</h2>
                      <p className="descriptionText group-hover:-translate-y-[5px] transition-all duration-300 italic text-[1rem] p-5  text-gray-500 hover:text-gray-700">{`"${description}"`}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })
          }
   
        </div>
    </>
  )
}

export default CategoryCard