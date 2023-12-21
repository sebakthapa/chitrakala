"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ArtCard from "@/components/ArtCard";
import { addGalleryData } from "@/redux/features/gallerySlice";
import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSession } from "next-auth/react";


const Gallery = () => {
    const { data: session, status: sessionStatus } = useSession();
    const searchParams = useSearchParams();

    const username = searchParams.get('username');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');
    const category = searchParams.get('category');

    const [selectedType, setSelectedType] = useState("Popular")
    const [galleryTypes, setGalleryTypes] = useState(["popular", "New & Noteworthy"])

    let query = "";

    if (username) { query += `&username=${username}`; }
    if (sort) { query += `&sort=${sort}`; } else { query += '&sort=likesD&limit=10'; }
    if (category) { query += `&category=${category}`; }
    if (limit) { query += `&limit=${limit}`; }


    const [sortParams, setSortParams] = useState(sort || "likesD");

    const [filteredData, setFilteredData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    let fetchedPage = 1;


    async function fetchData(url) {
        try {
            const res = await axios.get(url || `/api/products?${query}`);
            if (res.status === 200) {
                // dispatch(addGalleryData(res.data));
                setFilteredData(res.data)
                console.log("res",res.data)
                setLoading(false)
            }
        }
        catch (error) {
            throw error;
        }
    }
    
    useEffect(() => {
        // fetchData();
        window.addEventListener("scroll", () => {
            const page = 1 + window.scrollY / window.innerHeight;
            //fetch new data on new page
            // if (page > fetchedPage) {
            // }
        })
    }, []);

    

    useEffect(() => {
        if (sessionStatus == "authenticated") {
            // setSelectedType("Following")
            galleryTypes.includes("Following") || setGalleryTypes(prev => ["Following", ...prev] )
        } else {
        }
    }, [sessionStatus])


    useEffect(() => {
        // async function fetchSortedData() {
        //     try {
        //         setLoading1(true)
        //         const res = await axios.get(`/api/products?sort=${sortParams}`);
        //         if (res.status === 200) {
        //             setSortedData(res.data)
        //             setLoading1(false)
        //         }
        //     }
        //     catch (error) {
        //         throw error;
        //     }
        // }

        // fetchSortedData();
        // fetchSortedData();

    }, [sortParams])

    useEffect(() => {
        console.log(selectedType)
        if (selectedType == "Popular") {
            fetchData("/api/products?sort=likesD")
        } else if (selectedType == "Following") {
            
        } else if (selectedType == "New & Noteworthy") {
            
        }
    }, [selectedType])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <>
            <header  className="galleryNav">
                <Menu as="div" className="relative inline-block text-left capitalize">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {selectedType}
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">


                                {
                                    galleryTypes.map((itm, idx) => (
                                        <Menu.Item key={idx}>
                                            {({ active }) => (
                                                <span
                                                    href="#"
                                                    className={classNames(
                                                        itm == selectedType ? ' text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm cursor-pointer',
                                                        'hover:bg-gray-100'
                                                    )}
                                                    onClick={() => setSelectedType(itm)}
                                                >
                                                    {itm}
                                                </span>
                                            )}
                                        </Menu.Item>
                                    ))
                                }
                                {/* <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Support
                                        </span>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            License
                                        </span>
                                    )}
                                </Menu.Item> */}

                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

            </header>
            <main className="gallery min-h-[100vh] mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-5">
                {
                    filteredData?.map((itm, idx) => (
                        <ArtCard key={idx} item={itm} />
                    ))
                }
            </main>
            {/* <div className="min-h-screen border-black border-2"></div>
            <div className="min-h-screen border-black border-2"></div>
            <div className="min-h-screen border-black border-2"></div>
            <div className="min-h-screen border-black border-2"></div>
            <div className="min-h-screen border-black border-2"></div> */}
        </>
    );

}

export default Gallery;
