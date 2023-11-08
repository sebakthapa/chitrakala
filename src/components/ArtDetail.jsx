"use client"
import React, { useState } from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
const ArtDetail = ({artdata}) => {

  return (
    <>

      <section class="flex flex-col justify-center antialiased bg-white text-gray-200 min-h-screen">
    <div class="max-w-6xl mx-auto p-4 sm:px-6 h-full">
        <article class="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            <a class="relative block group" href="#0">
                <div class="absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" aria-hidden="true"></div>
                <figure class="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
                <AnimatePresence mode="wait">
                  </AnimatePresence>
            <Image
              
              src={artdata?.photo}
              className="absolute  inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out"
              
              width="540" 
              height="303"
              />
                  
                </figure>
            </a>
            <div>
                <header>
                    <div class="mb-3">
                        <ul class="flex flex-wrap text-xs font-medium -m-1">
                            <li class="m-1">
                                <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out" href="#0">{artdata?.category}</a>
                            </li>
                            <li class="m-1">
                                <a class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0">${artdata?.price}</a>
                            </li>
                            <li class="m-1">
                                <a class="inline-flex items-center gap-2 text-center text-gray-100 py-1 px-3 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out" href="#0"><BsHeartFill/>{artdata?.likes?.length} </a>
                            </li>
                     
                        </ul>
                    </div>
                    <h3 class="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                        <a class="hover:text-gray-100 transition duration-150 ease-in-out" href="#0">{artdata?.name}</a>
                    </h3>
                </header>
                <p class="text-lg text-gray-400 flex-grow">{artdata?.description}</p>
                <footer class="flex items-center mt-4">
                    <Link href={`/artist/${artdata?.artist?.user}`}>
                 

                        <AnimatePresence mode="wait">
            <motion.img
              
              src={artdata?.artist?.image}
              className=" w-10 h-10 rounded-full flex-shrink-0 mr-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0 }}
              />
          </AnimatePresence>
                    </Link>
                    
                    <div className='pointer' > 
                        <Link class="font-medium text-gray-500 hover:text-gray-100 transition duration-150 ease-in-out"
                        href={`/artist/${artdata?.artist?.user}`}
                        >
                          @{artdata?.artist?.name}</Link>
                        <span class="text-gray-700"> - </span>
                        <span class="text-gray-300">{artdata?.createdAt && artdata.createdAt.split('T')[0]}</span>
                    </div>
                 
                </footer>
            </div>
        </article>    
    </div>
</section>
  
    </>
  )
}

export default ArtDetail