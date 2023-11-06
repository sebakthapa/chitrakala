"use client"
import { motion } from "framer-motion";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toggleArtLike } from "@/redux/features/gallerySlice";
import { FcTimeline } from "react-icons/fc";
import axios from "axios";
import Link from "next/link";



const ArtCard = ({ item }) => {
    const dispatch = useDispatch()

    const { data: session } = useSession();

    const updateLocalLikes = (likes, productId) => {
        if (!checkLiked(likes, productId)) { // not liked add to array
            setGalleryData((prev) => prev.map((itm) => itm._id == productId ? { ...itm, likes: [...itm.likes, productId] } : itm

            ))
        } else { // liked remove from array
            setGalleryData((prev) => prev.map((itm) => itm._id == productId ? { ...itm, likes: itm.likes.filter(id => id != productId) } : itm
            ))
        }
    }

    const toggleLike = async (likes, productId) => {
        if (session?.user.id) {
            dispatch(toggleArtLike({ userId: session?.user.id, productId }))
            const res = await axios.patch("/api/products/likes", {
                userId: session?.user.id,
                productId,
            });

            if (res.status != 200) {
                toast.info("Unable to like at the moment!")
                dispatch(toggleArtLike({ userId: session?.user.id, productId }))
            } else {
                console.log("Like updated in db")
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
        <div className=" w-[15rem] md:min-w-[18rem] m-2  ">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg relative">
                <div
                    className=" h-[30vh] overflow-hidden shadow-sm  "
                    onDoubleClick={() => {
                        toggleLike(item.likes, item._id);
                    }}
                >
                    <motion.img
                        key={item.category}
                        src={item.photo}
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
                                toggleLike(item.likes, item._id);
                            }}
                            className="pp cursor-pointer  flex flex-col  p-1 m-1   justify-center items-center ">
                            {
                                !checkLiked(item.likes, session?.user.id) ? <BsHeart fontSize={"1rem"} fill="gray" /> :
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
                                {item?.likes?.length || 0}
                            </span>

                        </div>
                        <Link
                            href={`/artist/${item?.artist?.user?._id}`}
                        >
                            <div className="pp hover:shadow-lg flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-10 text-center h-10 m-1 rounded-full  bottom-0">
                                <img
                                    src={item?.artist?.image || "/a1.png"}
                                    className="item-contain w-full h-full"
                                />
                            </div>
                        </Link>
                    </div>
                    <Link
                        href={`/gallery/${item._id}`}
                        className="truncate  block text-gray-600 hover:underline font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                        {item.name}
                    </Link>
                    <div className="mb-5 truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                        {item.description}
                    </div>

                    <div className="mt-2 flex justify-between">
                        <span className="rounded-lg bg-yellow-100 px-5" >${item?.price}</span>
                        <span className="rounded-lg capitalize bg-blue-100 px-5 flex items-center gap-1">  <FcTimeline/> {item?.category}</span>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default ArtCard
