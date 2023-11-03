"use client"
import { motion } from "framer-motion";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toggleArtLike } from "@/redux/features/gallerySlice";
import axios from "axios";



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
        <div className="w-full lg:w-1/4 md:mx-2 mb-4 md:mb-0">
            <div className="bg-white rounded-lg overflow-hidden shadow relative">
                <div
                    className=" h-[30vh] overflow-hidden  "
                    onDoubleClick={() => {
                        toggleLike(item.likes, item._id);
                    }}
                >
                    <motion.img
                        key={item.category}
                        src={item.photo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                        }}
                    />

                    <div className="pp flex-initial overflow-hidden border-white border-[2px] top-1 bg-black text-white w-12 text-center h-12 m-1 rounded-full absolute bottom-0">
                        <img
                            src={item.artist.image || "/a1.png"}
                            width={50}
                            height={50}
                        />
                    </div>

                </div>

                <div className="p-4 h-auto md:h-40 lg:h-48">
                    <a
                        href="#"
                        className="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                    >
                        {item.name}
                    </a>
                    <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                        {item.description}
                    </div>
                    <div className="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block">


                        <div
                            onClick={() => {
                                toggleLike(item.likes, item._id);
                            }}
                            className="pp cursor-pointer  flex flex-col  p-1 m-1   justify-center items-center ">
                            {
                                !checkLiked(item.likes, session?.user.id) ? <BsHeart fontSize={"1.5rem"} fill="gray" /> :
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
                                        <BsHeartFill fontSize={"1.5rem"} fill="red" />
                                    </motion.span>}

                            <span className="text-sm font-sans text-black ">
                                {item?.likes?.length || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtCard
