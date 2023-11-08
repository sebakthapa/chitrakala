"use client"
import { motion } from "framer-motion";
import { BsAppIndicator, BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import { FcTimeline } from "react-icons/fc";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState,useEffect } from "react";



const ArtCard = ({ item }) => {

    const user = useSelector(state => state.user)
    const [galleryData,setGalleryData] = useState(item)


    useEffect(() => {
      
      setGalleryData(item)
     
    }, [item])
    


    const toggleLike = async (productId) => {
        if (user?._id) {
            try {
                console.log(galleryData)

                    let newLikes = [...galleryData.likes];
                    console.log(newLikes)
    
                    if (galleryData.likes.includes(user?._id)) { // already liked remove userid from array
                        newLikes = newLikes.filter((id) => id !== user?._id)
                    } else { //not liked add userid to the array
                        newLikes.push(user?._id)
                    }   
                    

                setGalleryData({...galleryData,likes:newLikes})

        
                await axios.patch("/api/products/likes", {
                    userId: user?._id,
                    productId,
                });


            } catch (error) {
                toast.info("Unable to like at the moment!");
              
                
                console.error("Error updating like:", error);
            }
        } else {
            toast.info("Login to interact with page");
        }
    };
 

    const checkLiked = (likes, userId) => {
        // console.log("likes, userID", likes, userId, likes?.includes(userId))
        return likes?.includes(userId);
    };


    return (
        <>
            {galleryData  ? (

                <div className=" w-[15rem] md:min-w-[18rem] m-2  ">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                        <div
                            className=" h-[30vh] overflow-hidden shadow-sm  "
                            onDoubleClick={() => {
                                toggleLike(galleryData._id);
                            }}
                        >
                            <Image
                                alt={galleryData.title + "image"}
                                src={galleryData.photo}
                                width={300}
                                height={300}
                                className="  object-contain w-full h-full "
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 10,
                                }}
                            />



                        </div>

                        <div className="p-4   ">
                            <div className="flex  flex-row-reverse justify-between w-full mb-5">

                                <div
                                    onClick={() => {
                                        toggleLike( galleryData._id);
                                    }}
                                    className="pp cursor-pointer   flex flex-col  p-1 m-1   justify-center items-center ">
                                    {
                                        !checkLiked(galleryData.likes, user?._id) ? <BsHeart fontSize={"1rem"} fill="gray" /> :
                                            <motion.span
                                                className="block"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.3,
                                                    ease: [0, 0.71, 0.2, 1.01],
                                                    scale: {
                                                        type: "spring",
                                                        damping: 5,
                                                        stiffness: 100,
                                                        restDelta: 0.001
                                                    }
                                                }}
                                            >
                                                <BsHeartFill fontSize={"1rem"} fill="#ed495b" />
                                            </motion.span>}

                                    <span className=" text-xs font-sans text-gray-500 ">
                                        {galleryData?.likes?.length || 0}
                                    </span>

                                </div>
                                <Link
                                    href={`/artist/${galleryData?.artist?.user?._id}`}
                                >
                                    <div className="pp hover:shadow-lg flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-10 text-center h-10 m-1 rounded-full  bottom-0">
                                        <Image
                                            src={galleryData?.artist?.image || "/default-profile.png"}
                                            alt="Dommy profile picture"
                                            width={100}
                                            height={100}
                                            referrerPolicy="no-referrer"
                                            className="item-contain w-full h-full"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <Link
                                href={`/gallery/${galleryData._id}`}
                                className="truncate  block text-gray-600 hover:underline font-semibold mb-2 text-lg md:text-base lg:text-lg"
                            >
                                {galleryData.name}
                            </Link>
                            <div className="mb-5 truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                                {galleryData.description}
                            </div>

                            <div className="my-5 flex justify-between">
                                <span className="rounded-lg bg-yellow-100 px-5" >${galleryData?.price}</span>
                                <span className="rounded-lg capitalize bg-blue-100 px-5 flex items-center gap-1">  <FcTimeline /> {galleryData?.category}</span>
                            </div>

                            <span className="rounded-lg text-gray-500 text-xs flex  items-center gap-2 " ><BsAppIndicator /> {galleryData?.createdAt}</span>





                        </div>
                    </div>
                </div>

            ) : (
                <LoadingComponent />
            )}
        </>
    )
}

export default ArtCard
