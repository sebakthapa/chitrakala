"use client"
import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from 'react-icons/bs';
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
          type: "more",
          description: " Explore the all the masterpices art.",
          image: "https://mueblesitaliano.ph/wp-content/uploads/2019/07/Contemporary-Abstract-Art-with-Ivan-Acuna-1024x794.jpg",
          link: `/gallery`,
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
                className="md:flex mt-8 md:-mx-4"
                whileHover="hover"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                whileTap="active"
                initial="hidden"
                variants={cardVariant}
              >
                <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center " style={{ backgroundImage: `url('${image}')` }}>
                  <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                      <h2 className="capitalize text-2xl text-white font-semibold">{type}</h2>
                      <p className="mt-2 text-gray-400">{`"${description}"`}</p>
                      <Link href={link}>
                            <button className='group    text-gray-100 hover:text-white py-2 px-6 pr-5 rounded-full flex items-center gap-2'>View <BsArrowRight className='w-0 transition-all duration-500 ease-in-out group-hover:w-4 h-4' fill='white' /></button>
                        </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              )
            })
          }
   
        </div>
    </>
  )
}

export default CategoryCard