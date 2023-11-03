"use client"
import React, { useState } from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const ArtDetail = ({artdata}) => {

  return (
    <>


      <div className="relative flex w-full max-w-full  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white ">
         <div className='cover flex justify-center  h-[30rem]'>
            <AnimatePresence mode="wait">
            <motion.img
              
              src={artdata?.photo}
              
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              />
          </AnimatePresence>
              </div>
        
    
     

        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
              {artdata?.name}
            </h5>
            
       
            <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              
              <BsHeartFill/>
              {artdata?.likes?.length}
            </p>
          </div>
          <Link href={`/artist/${artdata?.artist?.user}`}>
          <h6 className="block font-sans text-md font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
              @{artdata?.artist?.name}
            </h6>
          </Link>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
           {artdata?.description}
          </p>
          <div className="group mt-8 flex justify-between items-center gap-3">

            <span
              data-tooltip-target="more"
              className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
            >

              ${artdata?.price}
            </span>
            <span
              data-tooltip-target="more"
              className="cursor-pointer rounded-full border border-pink-500/5 bg-pink-500/5 p-3 text-pink-500 transition-colors hover:border-pink-500/10 hover:bg-pink-500/10 hover:!opacity-100 group-hover:opacity-70"
            >

              {artdata?.category}
            </span>

          </div>
        </div>
        <div className="p-6 pt-3 flex justify-center">
          <button
            className=" w-full block md:w-40 select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Checkout
          </button>
        </div>
      </div>


  
    </>
  )
}

export default ArtDetail