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
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BiCross, BiSolidPen, BiSolidPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import moment from "moment";
import { categoriesColor, formatNumberWithLetter } from "@/lib/utils";

const ArtCard = ({ item, option }) => {
    const router = useRouter()
    const user = useSelector(state => state.user)
    const [artData, setArtData] = useState(item)
    const [artistName, setArtistName] = useState("")
    const [artName, setArtName] = useState("")

    
    const artistNameRef = useRef(null)
    const artNameRef = useRef(null)

    useEffect(() => {
        setArtData(item)
    }, [item])

    

    const toggleLike = async (productId) => {
        if (user?._id) {
            console.log(productId, user._id)
            try {

                let newLikes = [...item.likes,];

                if (artData.likes.includes(user?._id)) { // already liked remove userid from array
                    newLikes = newLikes.filter((id) => id !== user?._id)
                } else { //not liked add userid to the array
                    newLikes.push(user?._id)
                }


                setArtData({ ...artData, likes: newLikes })
                item.likes = [newLikes ]

                const res = await axios.patch("/api/products/likes", {
                    userId: user?._id,
                    productId,
                });
                if (res.status == 200) {
                    console.log("Liked")
                }

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


    const formatLengthByWidth = (text, width) => {
        const charCount = Math.floor(width / 10)
        if (charCount >= text.length) return text;
        const formatted = text.substring(0, charCount) + "...";
        return formatted;
    }


    useEffect(() => {
        // console.log(artistNameRef?.current?.clientWidth, artistNameRef?.current?.getBoundingClientRect().width, artistNameRef?.current?.offsetWidth, window.getComputedStyle(artistNameRef?.current).width)
        setArtName(formatLengthByWidth(artData?.name , artNameRef?.current?.clientWidth ))
        setArtistName(formatLengthByWidth(artData?.artist?.name , artistNameRef?.current?.clientWidth ))
    })


    return (
        <>
            <div className="w-full bg-white rounded-lg  darkk:bg-gray-800 darkk:border-gray-700">
                <Link href={`/gallery/${artData?._id}`} className="block w-full aspect-[5/4] relative group">
                    <Image height={400} width={400} className=" rounded-lg object-cover w-full h-full" src={artData?.photo} alt="art image" />
                    <div className="texts  flex items-end pb-4 px-3 justify-between absolute w-full bottom-0 left-0 h-[100px] from-transparent to-[rgba(0,0,0,.6)] from-0% bg-gradient-to-b text-gray-100 font-medium opacity-0 group-hover:opacity-100 rounded-lg transition duration-300">
                        <p ref={artNameRef} className="title w-full flex-1 ">{artName} &nbsp;</p>

                        <span className="text-sm w-fit font-semibold text-gray-100 darkk:text-white">
                            {
                                artData?.price ? `Rs ${formatNumberWithLetter(artData?.price)}` : "Free"
                            }

                        </span>


                    </div>
                </Link>
                <div className="px-1 pb-5 my-2.5">
                    <div className="head flex justify-between items-center">
                        <Link href={`/artist/%${artData?.artist?._id}`} className="flex items-center gap-3 w-full flex-1">
                            <Image title={artData?.artist?.name} width={30} height={30} alt="artist image" src={artData?.artist?.image} className="rounded-full aspect-square object-cover" />
                            <h6 ref={artistNameRef} className="font-semibold hover:underline  w-full flex-1 h-fulltracking-tight text-gray-700 darkk:text-white ">
                                {artistName}
                                &nbsp;
                            </h6>
                        </Link>

                        <div className="flex items-center">
                            <div
                                className="flex items-center  rtl:space-x-reverse cursor-pointer "
                                onClick={() => {
                                        toggleLike(artData?._id);
                                    }}>
                                {
                                    !checkLiked(artData?.likes, user?._id) ? <BsHeart fontSize={"1.2rem"} fill="gray" /> :
                                        <motion.span
                                            className="block"
                                            initial={{ opacity: 0, scale: 0.7 }}
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
                                            <BsHeartFill fontSize={"1.2rem"} fill="#ed495b" />
                                        </motion.span>}

                            </div>
                            <span className="text-[.9rem] text-gray-600  font-semibold  darkk:bg-blue-200 darkk:text-blue-800 mx-2 select-none">

                                {formatNumberWithLetter(artData?.likes?.length) || 0}
                            </span>
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <span className="text-sm  font-semibold text-gray-600 darkk:text-white"><span className="opacity-60">Rs</span> {formatNumberWithLetter(price)}</span>
                        <Link style={{ background: `${categoriesColor[category]}` }} href="#" className={`text-white block  bg-[#888] hover:translate-y-[-2px] transition-all  focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-3 py-0.5 text-center before:content-none before-bg-red-500 before:w-full before:h-full before:absolute before:z-50 `}>{category}</Link>
                    </div> */}

                    {/* <div className="flex items-center justify-between">
                        <Image />
                        <Link style={{ background: `${categoriesColor[category]}` }} href="#" className={`text-white block  bg-[#888] hover:translate-y-[-2px] transition-all  focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-sm px-3 py-0.5 text-center before:content-none before-bg-red-500 before:w-full before:h-full before:absolute before:z-50 `}>{category}</Link>
                    </div> */}
                </div>
            </div >

        </>



        // <>
        //     {artData ? (

        //         <div className=" min-w-[18rem] md:w-[18rem] m-2  ">
        //             <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
        //                 <div
        //                     className=" h-[30vh] overflow-hidden shadow-sm  mt-10 "
        //                     onDoubleClick={() => {
        //                         toggleLike(artData?._id);
        //                     }}
        //                 >
        //                     <Image
        //                         alt={artData?.title + "image"}
        //                         src={artData?.photo}
        //                         width={300}
        //                         height={300}
        //                         className="  object-contain w-full h-full "

        //                     />
        //             {option===true&&(
        //                    <div className=" absolute float-right top-0 right-0 z-50 bg-gray-700 shadow-lg w-full">
        //                    <div className="flex gap-2 p-2 cursor-pointer">
        //                      <span  onClick={()=>{handleDelete(artData._id)}}>
        //                        <AiFillDelete fill="#ed495b" />
        //                      </span>
        //                      <span onClick={()=>{router.push(`/gallery/edit?pid=${artData._id}`)}}>
        //                        <BiSolidPencil fill="gray" />

        //                      </span>
        //                    </div>
        //                  </div>
        //             )}


        //                 </div>

        //                 <div className="p-4   ">
        //                     <div className="flex  flex-row-reverse justify-between w-full mb-5">

        //                         <div
        //                             onClick={() => {
        //                                 toggleLike(artData._id);
        //                             }}
        //                             className="pp cursor-pointer   flex flex-col  p-1 m-1   justify-center items-center ">
        //                             {
        //                                 !checkLiked(artData?.likes, user?._id) ? <BsHeart fontSize={"1rem"} fill="gray" /> :
        //                                     <motion.span
        //                                         className="block"
        //                                         initial={{ opacity: 0, scale: 0.5 }}
        //                                         animate={{ opacity: 1, scale: 1 }}
        //                                         transition={{
        //                                             duration: 0.3,
        //                                             ease: [0, 0.71, 0.2, 1.01],
        //                                             scale: {
        //                                                 type: "spring",
        //                                                 damping: 5,
        //                                                 stiffness: 100,
        //                                                 restDelta: 0.001
        //                                             }
        //                                         }}
        //                                     >
        //                                         <BsHeartFill fontSize={"1rem"} fill="#ed495b" />
        //                                     </motion.span>}

        //                             <span className=" text-xs font-sans text-gray-500 ">
        //                                 {artData?.likes?.length || 0}
        //                             </span>

        //                         </div>
        //                         <Link
        //                             href={`/artist/${artData?.artist?.user?._id}`}
        //                         >
        //                             <div className="pp hover:shadow-lg flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-10 text-center h-10 m-1 rounded-full  bottom-0">
        //                                 <Image
        //                                     src={artData?.artist?.image || "/default-profile.png"}
        //                                     alt="Dommy profile picture"
        //                                     width={100}
        //                                     height={100}
        //                                     referrerPolicy="no-referrer"
        //                                     className="item-contain w-full h-full"
        //                                 />
        //                             </div>
        //                         </Link>
        //                     </div>
        //                     <Link
        //                         href={`/gallery/${artData?._id}`}
        //                         className="truncate  block text-gray-600 hover:underline font-semibold mb-2 text-lg md:text-base lg:text-lg"
        //                     >
        //                         {artData?.name}
        //                     </Link>
        //                     <div className="mb-5 truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
        //                         {artData?.description || <Skeleton count={3} />}
        //                     </div>

        //                     <div className="my-5 flex justify-between">
        //                         <span className="rounded-lg bg-yellow-100 px-5" >NPR {artData?.price}</span>
        //                         <span className="rounded-lg capitalize bg-blue-100 px-5 flex items-center gap-1">  <FcTimeline /> {artData?.category}</span>
        //                     </div>

        //                     <span className="rounded-lg text-gray-500 text-xs flex  items-center gap-2 " ><BsAppIndicator /> {artData?.createdAt && moment(artData?.createdAt).fromNow()}</span>





        //                 </div>
        //             </div>

        //         </div>

        //     ) : (
        //         <LoadingComponent />
        //     )}
        // </>
    )
}

export default ArtCard
