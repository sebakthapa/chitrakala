"use client"
import { classNames } from '@/lib/utils'
import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

const GalleryHeader = () => {
    const { status: sessionStatus } = useSession();
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
        <header className="galleryNav py-3 px-4">
            <Menu as="div" className="relative inline-block text-left capitalize">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {
                            galleryTypes.map(({ title, link }) => {
                                if (pathname.includes(link) ) 
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
                                            href={link}
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

        </header>
    )
}

export default GalleryHeader
