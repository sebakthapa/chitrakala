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
import ContentLoader from "react-content-loader";

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
                item.likes = [newLikes]

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
        if (!text) return "";
        const charCount = Math.floor(width / 10)
        if (charCount >= text.length) return text;
        const formatted = text.substring(0, charCount) + "...";
        return formatted;
    }


    useEffect(() => {
        // console.log(artistNameRef?.current?.clientWidth, artistNameRef?.current?.getBoundingClientRect().width, artistNameRef?.current?.offsetWidth, window.getComputedStyle(artistNameRef?.current).width)
        setArtName(formatLengthByWidth(artData?.name, artNameRef?.current?.clientWidth))
        setArtistName(formatLengthByWidth(artData?.artist?.name, artistNameRef?.current?.clientWidth))
    })


    return (
        <>
            <div className="w-full bg-white rounded-lg  darkk:bg-gray-800 darkk:border-gray-700">
                <Link href={`/arts/${artData?._id}`} className="block w-full aspect-[5/4] relative group">
                    <Image height={400} width={400} className=" rounded-lg object-cover w-full h-full" src={artData?.photo} alt="art image" />
                    <div className="texts  flex items-end pb-4 px-3 justify-between absolute w-full bottom-0 left-0 h-[100px] from-transparent to-[rgba(0,0,0,.6)] from-0% bg-gradient-to-b text-gray-100 font-medium opacity-0 group-hover:opacity-100 rounded-lg transition duration-300">
                        <p ref={artNameRef} className="title w-full flex-1 ">{artName} &nbsp;</p>

                        <span className="text-sm w-fit font-semibold text-gray-100 darkk:text-white">
                            {
                                artData?.price ? `Rs ${formatNumberWithLetter(artData?.price)}` : <span className=" bg-lime-600  p-1 px-2 rounded-full text-xs">Showcase</span>
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
                </div>
            </div >

        </>
    )
}

export const ArtCardSkeleton = () => {
    return (
        <ContentLoader
            viewBox="0 0 400 350"
            height={"100%"}
            width={"100%"}
            title="loading"
            speed={1.5}
            interval={0.4}
            backgroundColor="#eee"
            foregroundColor="#f9f9f9"
            gradientDirection="top-down"
        >
            <rect x="0" y="0" rx="15" ry="15" width="100%" height="80%" />
            <circle cx="8%" cy="90%" r="20" />
            <rect x="18%" y="87%" rx="5" ry="5" width="60%" height="6%" />
            <rect x="85%" y="87%" rx="4" ry="4" width="10%" height="6%" />
        </ContentLoader>
    );
}

export default ArtCard