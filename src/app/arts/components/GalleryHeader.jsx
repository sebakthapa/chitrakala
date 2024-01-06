"use client"
import { categories, classNames } from '@/lib/utils'
import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { IoFilter } from "react-icons/io5";
import { toast } from 'react-toastify'

const GalleryHeader = ({ slug }) => {
    const { status: sessionStatus } = useSession();
    const [isCategoryPage, setIsCategoryPage] = useState(false)
    const [galleryTypes, setGalleryTypes] = useState([
        {
            title: "Popular",
            link: "/arts/popular"
        },
        {
            title: "New & Noteworthy",
            link: "/arts/recent"
        },

    ])
    const pathname = usePathname();
    const lastRoute = pathname.split("/").at(-1);
    let selectedCategory = "";
    categories.map(({ type }) => {
        (type == lastRoute) && (selectedCategory = type)
    })

    useEffect(() => {
         setIsCategoryPage(slug !== lastRoute) 
    }, [slug, lastRoute])


    useEffect(() => {
        if (sessionStatus == "authenticated") {
            galleryTypes.length == 2 && setGalleryTypes(prev => [
                {
                    title: "Following",
                    link: "/arts/following"
                },
                ...prev,
            ])
        }
    }, [sessionStatus])

    return (
        <header className="galleryNav p-5 bg-white overflow-x-scroll  flex sm:m-5 mb-0 justify-between">
            <Menu as="div" className="relative inline-block text-left capitalize ">
                <div >
                    <Menu.Button id='menu_button' className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-[0.65rem] text-sm font-semibold capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {
                            galleryTypes.map(({ title, link }) => {
                                if (pathname.includes(link))
                                    return title;
                            })
                        }
                        <BiChevronDown className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                galleryTypes.map(({ title, link }, idx) => (
                                    <Menu.Item key={idx}>
                                        <Link
                                            href={isCategoryPage ? `${link}/${lastRoute}` : link}
                                            className={classNames(
                                                pathname.includes(link) ? ' text-gray-900 font-semibold' : 'text-gray-700',
                                                'block px-4 py-2 text-sm cursor-pointer',
                                                'hover:bg-gray-100'
                                            )}
                                        >
                                            {title}
                                        </Link>
                                    </Menu.Item>
                                ))
                            }

                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            <div className="categoriesContainer">
                <ul className='flex gap-5 items-center'>
                    <li className={`capitalize bg-stone-10 rounded-full px-4 py-2 font-medium text-gray-800 hover:text-gray-500 transition ${selectedCategory == "" && "bg-stone-100 hover:text-gray-800"}`}>
                        <Link title={`Discover`} className='block ' href={`/arts/${slug}`} >{"Discover"}</Link>
                    </li>
                    {
                        categories?.map(({ type }, idx) => {
                            return (
                                <li key={idx} className={`capitalize  rounded-full px-4 py-2 font-medium text-gray-800 hover:text-gray-500 transition ${selectedCategory == type ? "bg-stone-100 hover:text-gray-800" : "bg-blue-10"}`}>
                                    <Link
                                        title={type}
                                        className='block'
                                        // href={"/arts/[slug]/[category]"}
                                        href={`/arts/${slug}/${type}`}
                                    >
                                        {type}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div onClick={() => toast.info("Hang tight! This feature will be available soon!")} className='filter'>
                <h6 className='flex gap-2 items-center  cursor-pointer border-[1px] px-3 py-[0.7rem] hover:bg-gray-100 transition duration-300 active:bg-transparent rounded-full'>
                    <IoFilter className='w-4 h-4' />
                    <span className='text-sm'>Filters</span>

                </h6>
            </div>





        </header>
    )
}

export default GalleryHeader
