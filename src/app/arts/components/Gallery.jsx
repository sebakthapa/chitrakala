"use client"
import React, { useEffect, useState } from "react";
import ArtCard, { ArtCardSkeleton } from "@/components/ArtCard";
import ThreeDotsLoader from "@/components/Loader/ThreeDotsLoader";
import { useDispatch, useSelector } from "react-redux";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const Gallery = ({ url = "/api/products?", reduxName, dispatch: dispatchGallery }) => {
    // console.log(url, reduxName, (dispatchGallery !== undefined) )
    const dispatch = useDispatch();
    const reduxArts = useSelector((store) => store[reduxName]);
    const [galleryData, setGalleryData] = useState([])
    
    const { data, error, isLoading, isLoadingNewPage, hasMore } = useInfiniteScroll({
        url,
        data: reduxArts,
    });


    useEffect(() => {
        if (data?.length > 0) {
            if (reduxName && dispatch) {
                dispatch(dispatchGallery(data))
            }
        }
    }, [data, dispatch]);
    // console.log(data)

    useEffect(() => {
        if (reduxName && dispatch) {
            setGalleryData(reduxArts)
        } else {
            setGalleryData(data)
        }

    },[data, reduxArts])

    if (error) {
        "some error occured"
    }

    if (galleryData?.length == 0) {
        if (!hasMore) {
            return <p className=" mt-40 leading-[100%]  max-w-[500px] mx-auto font-semibold text-2xl text-gray-400 text-center" >
                <span>Oops! I am empty. </span>
                <span  className="font-light text-base block  mt-3">
                🎨 Embrace the blank canvas: Nothing on display, Everything to create 🌟
                </span>
            </p>
        }
        return (
            <>
                <main className="gallery min-h-[100vh] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-5 mx-4">
                    {
                        Array.from(Array(12)).map((itm, idx) => {
                            return (
                                <div key={idx} className="overflow-hidden aspect-[5/4 bg-red-5">
                                    <ArtCardSkeleton />
                                </div>
                            )
                        })
                    }
                </main>
            </>
        )
    } 

    return (
        <>
            <main className="gallery min-h-[100vh] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mx-4 ">
                {
                    galleryData?.length > 0 && galleryData?.map((itm, idx) => {
                        

                        if (!itm?.name || !itm?.photo) return "";
                        return <ArtCard id={`artcardskeleton${idx}`} key={idx} item={itm} />
                    }) 
                }


            </main>
            <div className="loader mt-5 grid place-items-center">
                {
                    isLoadingNewPage && <ThreeDotsLoader />
                }
                {
                    !hasMore && (
                        <div className="text-center p-8 text-gray-600">
                            <p className="text-xl mb-2 font-bold">
                                {"🎨 Bravo! You've Explored Every Brushstroke. 🌈"}
                            </p>
                            <p className="text-sm text-gray-500">
                                {"The canvas is complete, but your art journey continues. 🚀"}
                            </p>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Gallery;
