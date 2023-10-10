"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
const page = () => {
    return (
        <>
            <div className="cardProduct">
                <div className="cards flex flex-wrap bg-[#f4f4f4] m-5">
                    <div className="card m-5  relative max-w-[20rem]  shadow-lg">
                        <div className="cover overflow-hidden min-h-[10rem]   ">

                            <motion.img
                                key={"oil"}
                                src={"/landing/oil.jpg"}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            />

                            <div className="pp flex-initial overflow-hidden border-white border-[2px]  top-1/2 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                                <Image
                                    src={"/logo.svg"}
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                        <div className="desc pt-5 min-h-[10rem]  bg-white overflow-hidden flex flex-col justify-center items-center">
                            <h1 className=" font-bold text-2xl p-2 break-all text-center">Chamebers FineArt</h1>
                            <h4 className="p-2 font-bold text-gray-600 text-sm text-center" >&quot A gallery based in New York City that specializes in Chinese contemporary art &quot</h4>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default page