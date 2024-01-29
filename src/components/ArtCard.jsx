"use client"
import { motion } from "framer-motion";
import { BsBookmark, BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, Fragment } from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import { BiDotsVertical } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { formatNumberWithLetter } from "@/lib/utils";
import ContentLoader from "react-content-loader";
import { appendPopularArts, deletePopularArts, togglePopularArtsLike } from "@/redux/features/gallerySlice/popularSlice";
import { appendFollowingArts, deleteFollowingArts, toggleFollowingArtsLike } from "@/redux/features/gallerySlice/followingSlice";
import { appendRecentArts, deleteRecentArts, toggleRecentArtsLike } from "@/redux/features/gallerySlice/recentSlice";
import { addWishList, deleteWishList } from "@/redux/features/wishListSlice";
import { FiEdit } from "react-icons/fi"

import { useSession } from 'next-auth/react';
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci"
import { CgDetailsMore } from "react-icons/cg"



const ArtCard = ({ item }) => {
    const { data: session } = useSession();
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [artData, setArtData] = useState(item);
    // const [dotOpen, setDotOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [addToWishlistLoading, setAddToWishlistLoading] = useState(false);

    const artistNameRef = useRef(null)
    const artNameRef = useRef(null)
    const handleDelete = async (pid) => {
        try {
            if (session?.user?.id) {
                setLoading(true);

                const promise = axios.delete(`/api/products/${pid}`);
                // router.push(`/arts/popular`)
                toast.promise(promise, {
                    pending: `Deleting the art.`,
                    success: `Successfully Deleted!`,
                    error: `Unable to Delete. Please try again later!`
                });
                const res = await promise;
                if (res.status == 200) {
                    dispatch(deleteFollowingArts(artData._id))
                    dispatch(deleteRecentArts(artData._id))
                    dispatch(deletePopularArts(artData._id))
                }

            }
        } catch (error) {
            console.error("Error deleting:", error);
        } finally {
            setLoading(false);
        }
    };

    const addToWishlist = async () => {
        try {
            if (session?.user?.id) {
                setAddToWishlistLoading(true);

                // Call your API endpoint to add the artwork to the wishlist
                const res = await axios.post("/api/wishlist", {
                    user: session.user.id,
                    productId: item._id,
                });

                if (res.status === 200) {
                    // Display a toast message indicating success
                    toast.success("Added to Wishlist!");
                    console.log(res.data)
                    dispatch(addWishList(res.data))
                } else {
                    // Handle the case when adding to the wishlist fails
                    toast.error("Unable to add to Wishlist. Please try again.");
                }
            } else {
                // Handle the case when the user is not logged in
                toast.info("Login to add to Wishlist");
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error("Error adding to Wishlist:", error);
        } finally {
            setAddToWishlistLoading(false);
        }
    };


    useEffect(() => {
        setArtData(item);
        setIsOwner(session?.user?.id === artData?.artist?.user || session?.user?.id === artData?.artist?.user._id);

    }, [item])




    const toggleLike = async (productId) => {
        if (user?._id) {
            try {


                let newLikes = [...item.likes,];

                if (artData.likes.includes(user?._id)) { // already liked remove userid from array
                    newLikes = newLikes.filter((id) => id !== user?._id)
                } else { //not liked add userid to the array
                    newLikes.push(user?._id)
                }


                setArtData({ ...artData, likes: newLikes });
                dispatch(togglePopularArtsLike({ userId: user._id, productId: artData._id }))
                dispatch(toggleFollowingArtsLike({ userId: user._id, productId: artData._id }))
                dispatch(toggleRecentArtsLike({ userId: user._id, productId: artData._id }))

                const res = await axios.patch("/api/products/likes", {
                    userId: user?._id,
                    productId,
                });
                if (res.status == 200) {
                }

            } catch (error) {
                toast.info("Unable to like at the moment!");

                //reset local state if unable to like while querying database
                let newLikes = [...item.likes,];
                newLikes = newLikes.filter((id) => id !== user?._id)

                setArtData({ ...artData, likes: likes });
                dispatch(togglePopularArtsLike({ userId: user._id, productId: artData._id }))
                dispatch(toggleFollowingArtsLike({ userId: user._id, productId: artData._id }))
                dispatch(toggleNewArtsLike({ userId: user._id, productId: artData._id }))
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
            <div className="w-full min-w-[300px] sm;max-w-[400px] bg-white rounded-lg  darkk:bg-gray-800 darkk:border-gray-700">
                <Link href={`/arts/${artData?._id}`} className="block w-full aspect-[5/4] relative group">
                    <Image height={400} width={400} className=" rounded-lg object-cover w-full h-full" src={artData?.photo} alt="art image" />
                    <div className="texts  flex items-end pb-4 px-3 justify-between absolute w-full bottom-0 left-0 h-[100px] from-transparent to-[rgba(0,0,0,.6)] from-0% bg-gradient-to-b text-gray-100 font-medium opacity-0 group-hover:opacity-100 rounded-lg transition duration-300">
                        <p ref={artNameRef} className="title w-full flex-1 line-clamp-1">{artData?.name} &nbsp;</p>

                        <span className="text-sm w-fit font-semibold text-gray-100 darkk:text-white">
                            {
                                artData?.price ? <span className=" bg-green-700  p-1 px-2 rounded-full text-xs">Rs ${formatNumberWithLetter(artData?.price)} </span> : <span className=" bg-lime-600  p-1 px-2 rounded-full text-xs">Showcase </span>
                            }
                            {/* {artData.category} */}

                        </span>


                    </div>

                </Link>
                <div className="px-1 pb-5 my-2.5 relative">
                    <div className="head flex justify-between items-center">
                        <Link href={`/artist/${artData?.artist?.user?._id}`} className="flex items-center gap-3 w-full flex-1">
                            <Image title={artData?.artist?.name} width={30} height={30} alt="artist image" src={artData?.artist?.image} className="rounded-full aspect-square object-cover" />
                            <h6 ref={artistNameRef} className="font-medium  w-full flex-1 h-fulltracking-tight text-gray-700 darkk:text-white capitalize">
                                {artData?.artist?.name.toLowerCase()}
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



                            <div className=" top-16  text-right">
                                <Menu as="div" className="relative z-50 inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex justify-center rounded-full p-[.15rem] text-gray-400 hover:bg-gray-200 hover:text-gray-500 transition duration-300 cursor-pointer">
                                            <BiDotsVertical
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items style={{ minWidth: "200px", width: "fit-content" }} className="absolute right-0 mt-2  origin-top-right divide-y-8 divide-gray-800 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            <div className="px-1 py-1">
                                                {isOwner ? (
                                                    <>
                                                        <Menu.Item>
                                                            <Link
                                                                href={`/arts/edit?pid=${artData?._id}`}
                                                                className={`text-gray-900 hover:bg-gray-100 transition duration-300 
                                                        group flex gap-10 w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                Edit
                                                                <FiEdit fontSize={"1rem"} className="text-green-600" />
                                                            </Link>
                                                        </Menu.Item>

                                                        <Menu.Item>
                                                            <button
                                                                onClick={() => { handleDelete(artData?._id) }}
                                                                className={`text-gray-900 hover:bg-gray-100 transition duration-300 
                                                        group flex gap-10 w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                {loading ? (
                                                                    "Deleting..."
                                                                ) : (
                                                                    <>
                                                                        Delete
                                                                        <AiOutlineDelete fontSize={"1.2rem"} className="text-red-600" />
                                                                    </>
                                                                )}
                                                            </button>
                                                        </Menu.Item>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Menu.Item>
                                                            <Link
                                                                href={`/arts/${artData?._id}`}
                                                                className={`text-gray-900 hover:bg-gray-100 transition duration-300 
                                                        group flex gap-10 w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                View
                                                                <CgDetailsMore fontSize={"1rem"} className="text-gray-500" />
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <button
                                                                onClick={addToWishlist}
                                                                className={`text-gray-900 hover:bg-gray-100 transition duration-300 
                                                        group inline-flex gap-10 w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                {addToWishlistLoading ? "Adding to Wishlist..." : "Add to Wishlist"}
                                                                <BsBookmark fontSize={".8rem"} />
                                                            </button>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Link
                                                                href={"#"}
                                                                className={`text-gray-900 hover:bg-gray-100 transition duration-300 
                                                        group flex gap-10 w-full items-center justify-between rounded-md px-2 py-2 text-sm`}
                                                            >
                                                                Order
                                                                <CiShoppingCart fontSize={"1.05rem"} />
                                                            </Link>
                                                        </Menu.Item>

                                                    </>
                                                )}

                                            </div>

                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>





                            {/* ---------------------------------------- */}
                        </div>
                    </div>
                    {/* <div className={`absolute right-0 z-10 ${!dotOpen ? 'hidden' : 'block'}`}>
                        <div className="ppHover mt-4 w-48 origin-top-right rounded-md flex flex-col gap-1 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                            
                        </div>
                    </div> */}

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
            title="🖌️ Loading Artistry... 🎨"
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