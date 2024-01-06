"use client"
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import ArtCard from './ArtCard';
import { BsAppIndicator } from "react-icons/bs";
const ArtDetail = ({ artdata }) => {
    console.log(artdata)

    const [relatedartData, setRelatedArtData] = useState();


    async function fetchData() {
        try {
            const res = await fetch(`/api/products?limit=5`)


            if (res.status == 200) {
                const {data} = await res.json()
                setRelatedArtData(data)
            }

        } catch (error) {
            throw error
        }

    }
    useEffect(() => {

        fetchData();

    }, []);

    return (
        <>



            <section className=" sm: border-gray-300 border-r sm:pt-10 m-5 mt-20 sm:max-w-full  sm:w-[80%]  flex flex-col items-center bg-white max-h-[150vh]   ">
                <img className="object-contain w-full rounded-t-lg  h-[100vh]" src={artdata?.photo} alt="" />
                <div className="flex flex-col w-full justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{artdata?.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 ">{artdata?.description}</p>

                    <ul role="list" className="divide-y divide-gray-200 ">
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center">
                                <Link

                                    href="/artist/[artistId]"
                                    as={`/artist/${artdata?.artist?.user?._id}`}
                                    className="flex-shrink-0">

                                    <AnimatePresence mode="wait">

                                        <motion.img
                                            className="w-10 h-10 rounded-full border-2 border-gray-300"
                                            src={artdata?.artist?.image}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, }}
                                            exit={{ opacity: 0 }}
                                        />
                                    </AnimatePresence>

                                </Link>
                                <div className="flex-1 min-w-0 ms-4">
                                    <p className="text-sm font-medium text-gray-900 truncate ">
                                        {artdata?.artist?.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate ">
                                        @{artdata?.artist?.user?.username}
                                    </p>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                    Rs.{artdata?.price}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="text-xs  text-gray-500 flex justify-between">
                        <div className='flex gap-5'>

                            <div >
                                <span>Likes: </span>
                                <span>{artdata?.likes?.length} </span>
                            </div>
                            <div>
                                <span>Category: </span>
                                <span className=" capitalize ">{artdata?.category} </span>
                            </div>
                        </div>
                        <div>
                            <p className='text-xs flex items-center gap-2 text-gray-400'>
                                <BsAppIndicator /> {artdata?.createdAt && moment(artdata?.createdAt).fromNow()}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="  mt-20  overflow-scroll  p-5  flex flex-col   bg-white sm:w-1/3  h-[150vh]  ">

                <h1 className="subHead  font-serif  bg-white ">Related arts
                    <p className=" text-sm xxs:text-base  sm:text-[1.08rem]  leading-relaxed text-gray-700 antialiased py-5"
                    >
                        Discover similar artworks from artists you like.
                    </p>
                </h1>
                <div className="  myScroll gap-5 overflow-scroll  w-full flex sm:block ">

                    {
                        relatedartData?.length > 0 && relatedartData?.map((item, index) => {

                            return <ArtCard key={index} item={item} />
                        }
                        )

                    }
                </div>
            </section>





        </>
    )
}

export default ArtDetail