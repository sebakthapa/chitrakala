"use client"
import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRight } from 'react-icons/bs';
import moment from 'moment';
const CategoryCard = () => {
  const cardVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 15 } },
    hidden: { scale: 0.8, opacity: 0, },
    hover: { scale: 1.03, y: -5, transition: { type: "spring", stiffness: 100, damping: 5 } },
    active: { scale: .95 },
  }

  const categories = [
    {
      type: "oil",
      description: "A realm where brushstrokes whispers stories",
      image: "/landing/oil.jpg",
      link: `/gallery?category=oil`,
      color: "#D4AB9C"
    },
    {
      type: "water",
      description: "Washes of liquid color bloom across thirsty paper",
      image: "/landing/water.jpg",
      link: `/gallery?category=water`,
      color: "#B3E1EB"
    },
    {
      type: "digital",
      description: "Pixels unite to sing a song of light.",
      image: "/landing/digital.jpg",
      link: `/gallery?category=digital`,
      color: "#9AAAC5"
    },
    {
      type: "sketch",
      description: "Swift strokes hint at forms not yet fully revealed",
      image: "/landing/sketch.jpg",
      link: `/gallery?category=sketch`,
      color: "#DCDCDC"
    },
    {
      type: "more",
      description: "Explore the all the masterpiece artworks.",
      image: "https://mueblesitaliano.ph/wp-content/uploads/2019/07/Contemporary-Abstract-Art-with-Ivan-Acuna-1024x794.jpg",
      link: `/gallery`,
      color: "#C9B5A5"
    },


  ]

  // console.log(moment(new Date()).format("Do-MMM YYYY, h:mm a"))

  return (
    <>
      <div className="categoriesContainer px-5 grid flex-wrap gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center items-center justify-center">
        {
          categories.map(({ type, description, image, link, color }, idx) => {
            return (
              <motion.div
                key={idx}
                className="md:flex mt-8 md:-mx-4 w-full  max-w-[30rem] h-[17rem] group hover:-translate-y-2 transition ease-out duration-300"
                // whileHover="hover"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                whileTap="active"
                initial="hidden"
                whileHover="hover"
                variants={cardVariant}
              >
                <Link href={link} className='w-full' >
                  <div className="relative  z-0 w-full h-full rounded-md overflow-hidden bg-cover bg-center ">
                    <Image className='w-full h-full object-cover group-hover:brightness-50 transition duration-500' src={image} alt={`${type} category image`} height={300} width={300} />

                    <motion.div
                      style={{ background: `${color}bb` }}
                      className={`opacity-90 group-hover:opacity-100 group-hover:left-[-25%] p-[25%] group-hover:top-[-25%] rounded-full absolute  top-[-110%] left-[-110%] transition-all ease-out duration-300 z-20  bg-opacity-50 flex items-center h-[150%] w-[150%] `}>
                      <div className="px-10 max-w-xl">
                        <h2 className="capitalize text-2xl font-sans opacity-0 group-hover:opacity-100  transition duration-1000  text-white font-extrabold">{type}</h2>
                        <p className="mt-2 text-lg italic  text-gray-200 opacity-0 group-hover:opacity-100  transition duration-1000">{`"${description}"`}</p>
                        <button className='group animate-pulse  text-gray-300 hover:text-white mt-3 rounded-full flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100  transition duration-1000'>
                          <span>Click to browse</span>
                          <span className=' '>
                            <BsArrowRight className='w-0  transition-all duration-500 ease-in-out group-hover:w-4 h-4' fill='white' />
                          </span>
                        </button>
                      </div>
                    </motion.div>
                    <h3 className="category group-hover:opacity-0 transition duration- absolute top-[10%] left-[-40%] center  capitalize font-extrabold text-white -rotate-[40deg] text-2xl z-50   bg-re text-center w-full">{type}</h3>
                  </div>
                </Link >
              </motion.div >
            )
          })
        }

      </div >
    </>
  )
}

export default CategoryCard