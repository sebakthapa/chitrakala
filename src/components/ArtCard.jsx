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
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BiCross, BiSolidPen, BiSolidPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import moment from "moment";

const ArtCard = ({ item ,option}) => {
    const router = useRouter()
    const user = useSelector(state => state.user)
    const [galleryData, setGalleryData] = useState(item)


    useEffect(() => {

        option = false
      
      setGalleryData(item)
     

    }, [item])


    
  const handleDelete =async (productId) =>{
    try {
        const res = await axios.delete(`/api/products/${productId}`);
        // remove from state
        toast.success('Product deleted');
      } catch (error) {
        console.error(error);
        toast.error('Unable to delete at the moment.')
      }

  }




    const toggleLike = async (productId) => {
        if (user?._id) {
            try {

                let newLikes = [...galleryData?.likes];

                if (galleryData.likes.includes(user?._id)) { // already liked remove userid from array
                    newLikes = newLikes.filter((id) => id !== user?._id)
                } else { //not liked add userid to the array
                    newLikes.push(user?._id)
                }


                setGalleryData({ ...galleryData, likes: newLikes })


                const res = await axios.patch("/api/products/likes", {
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
        return likes?.includes(userId);
    };


    return (
        <>
            {galleryData ? (

                <div className=" min-w-[18rem] m-2  ">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                        <div
                            className=" h-[30vh] overflow-hidden shadow-sm  mt-10 "
                            onDoubleClick={() => {
                                toggleLike(galleryData?._id);
                            }}
                        >
                            <Image
                                alt={galleryData?.title + "image"}
                                src={galleryData?.photo}
                                width={300}
                                height={300}
                                className="  object-contain w-full h-full "
                                
                            />
                    {option===true&&(
                           <div className=" absolute float-right top-0 right-0 z-50 bg-gray-700 shadow-lg w-full">
                           <div className="flex gap-2 p-2 cursor-pointer">
                             <span  onClick={()=>{handleDelete(galleryData._id)}}>
                               <AiFillDelete fill="#ed495b" />
                             </span>
                             <span onClick={()=>{router.push(`/gallery/edit?pid=${galleryData._id}`)}}>
                               <BiSolidPencil fill="gray" />

                             </span>
                           </div>
                         </div>
                    )}


                        </div>

                        <div className="p-4   ">
                            <div className="flex  flex-row-reverse justify-between w-full mb-5">

                                <div
                                    onClick={() => {
                                        toggleLike(galleryData._id);
                                    }}
                                    className="pp cursor-pointer   flex flex-col  p-1 m-1   justify-center items-center ">
                                    {
                                        !checkLiked(galleryData?.likes, user?._id) ? <BsHeart fontSize={"1rem"} fill="gray" /> :
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
                                href={`/gallery/${galleryData?._id}`}
                                className="truncate  block text-gray-600 hover:underline font-semibold mb-2 text-lg md:text-base lg:text-lg"
                            >
                                {galleryData?.name}
                            </Link>
                            <div className="mb-5 truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                                {galleryData?.description || <Skeleton count={3} />}
                            </div>

                            <div className="my-5 flex justify-between">
                                <span className="rounded-lg bg-yellow-100 px-5" >NPR {galleryData?.price}</span>
                                <span className="rounded-lg capitalize bg-blue-100 px-5 flex items-center gap-1">  <FcTimeline /> {galleryData?.category}</span>
                            </div>

                            <span className="rounded-lg text-gray-500 text-xs flex  items-center gap-2 " ><BsAppIndicator /> {galleryData?.createdAt && moment(galleryData?.createdAt).fromNow()}</span>





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
