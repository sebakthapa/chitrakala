"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import ArtCard, { ArtCardSkeleton } from "@/components/ArtCard";
import ThreeDotsLoader from "@/components/Loader/ThreeDotsLoader";

const Gallery = ({ galleryData, isLoading, isLoadingNewPage, hasMore }) => {

    if (galleryData?.length == 0) {
        return (
            <>
                <main className="gallery min-h-[100vh] gap-10 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-5 mx-4">
                    {
                        Array.from(Array(12)).map((itm, idx) => {
                            return (
                                <div key={idx} className="overflow-hidden aspect-[5/4 bg-red-5">
                                    <ArtCardSkeleton  />
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
            <main className="gallery min-h-[100vh] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-5 mx-4 ">
                {
                    galleryData?.length > 0 && galleryData?.map((itm, idx) => {
                        if (!itm?.name || !itm?.photo) return "";
                        return <ArtCard key={idx} item={itm} />
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
