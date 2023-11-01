"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, clearUserData } from '@/redux/features/userSlice';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Navbar() {

  const router = useRouter();
  const { data: session, status } = useSession();


  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const isAuthPage = pathname.split("/").includes("auth");

  const [isOpen, setIsOpen] = useState(false);

  const [showHover, setShowHover] = useState(false);

  const handleMouseEnter = () => {
    setShowHover(true);
  }

  const handleMouseLeave = () => {

    setShowHover(false);
  }


  const fetchUserDetails = async (uid) => {
    try {
      const res = await axios.get(`/api/userdetails/${uid}`);
      console.log(res.data)
      dispatch(addUserData(res.data))
      return res;
    } catch (error) {
      throw error
    }
  }



  useEffect(() => {
    console.log("session", session);

    const sessionUser = session?.user?.id;
    const reduxUser = user?.user?._id;
    if (!reduxUser) {
      if (sessionUser && sessionUser != reduxUser) {
        // fetch user details and store in redux store
        fetchUserDetails(session?.user.id);
      }
    } else {
      if (sessionUser != reduxUser) {
        // fetch user details and store in redux store
        fetchUserDetails(session?.user.id);
      }
    }


  }, [session])





  return (
    <>

      {
        isAuthPage ? (
          <Link className='mt-7 ml-7 block' href={"/"}>
            <span className='saman text-4xl  text-[#222] font-semibold'>CHITRAKALA</span>
          </Link>
        ) : (
          <nav className="z-20 bg-gray-800 relative">
            <div className="bg-gray-800 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button onClick={() => setIsOpen(!isOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (

                      <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ccc" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>

                    ) : (
                      <svg className=" block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ccc" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}

                  </button >
                </div >
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href={"/"}>
                      <span className='saman text-xl text-[#ccc] font-semibold'>CHITRAKALA</span>
                    </Link>

                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-5">
                      <Link href="/" className={`${pathname === '/' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Home</Link>
                      <Link href="/gallery" className={`${pathname === '/gallery' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Gallery</Link>
                      <Link href="/artist" className={`${pathname === '/artist' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Artist</Link>
                      <Link href="/exhibition" className={`${pathname === '/exhibition' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Exhibition</Link>
                      <Link href="/about" className={`${pathname === '/about' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">About</Link>
                      <Link href="/add_artist_details" className={`${pathname === '/add_artist_details' ? 'active' : ''} hover:bg-gray-700 text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium`} aria-current="page">Be an Artist</Link>
                    </div>

                  </div>
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {
                    session?.user?.id ? (

                      <>
                        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">View notifications</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e5e7eb" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                          </svg>
                        </button>
                        <div id='ppMain' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="ppMain relative ml-3">
                          <div id='ppPhoto' className='ppPhoto'>
                            <button type="button" className=" relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                              <span className="absolute -inset-1.5"></span>
                              <span className="sr-only">Open user menu</span>
                              {
                                user?.image ?
                                  <Image className="h-8 w-8 rounded-full object-cover" height={100} width={100} src={user?.image} alt="profile image" /> :
                                  <Image className="h-8 w-8 rounded-full cover" height={100} width={100} src={"/avatar.png"} alt="profile image" />
                              }

                            </button>
                          </div>
                          {showHover &&
                            <div className="absolute top-[75%] right-0 z-10 bg-red-00">
                              <div id='ppHover' className="ppHover    mt-4 w-48 origin-top-right rounded-md flex  flex-col gap-1  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <Link href="/me" className="hover:bg-gray-100 w-full block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                                <Link href="/me" className="hover:bg-gray-100 w-full block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                                <span href="/" onClick={() => signOut()} className="hover:bg-gray-100 w-full cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</span>
                              </div>
                            </div>
                          }
                        </div>


                      </>
                    ) : (
                      <>
                        {
                          isAuthPage || (
                            <div className="handlers authButtons text-[#556f5f] pt-0  flex gap-5 text-base ">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className=' hidden md:block border-2 border-gray-100 rounded'>
                                <Link className='inline-block text-gray-100 py-[0.4rem] px-5 ' href={`/auth/login?returnUrl=${pathname}`}>Log In</Link>
                              </motion.button>

                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-gray-900 border-2 border-gray-900 rounded'>
                                <Link className='inline-block text-gray-200 py-[0.4rem] px-5 ' href={`/auth/signup?returnUrl=${pathname}`}>Sign Up</Link>
                              </motion.button>

                            </div>
                          )
                        }
                      </>
                    )}

                </div>
              </div >
            </div >



            <div
              className={`pt-3 border-t-2  border-[rgba(255,255,255,.1)]  min-h-screen h-fit pb-5 sm:hidden bg-gray-800 -z-20 w-full absolute left-0 transition-all duration-[300ms] ${isOpen ? "top-full opacity-100" : "-top-[100vh] opacity-50"
                }`}
              id="mobile-menu"
            >

              <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col  items-center w-full gap-3 ">

                <Link onClick={() => { setIsOpen(false) }} href="/" className={`rounded-lg border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center block hover:bg-gray-700 text-gray-300   px-3 py-2 text-base font-medium ${pathname === '/' ? 'active' : ''} } `} ria-current="page">Home</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/gallery" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white block  px-3 py-2 text-base font-medium ${pathname === '/gallery' ? 'active' : ''} `}>Gallery</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/artist" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white block  px-3 py-2 text-base font-medium ${pathname === '/artist' ? 'active' : ''} `}>Artist</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/exhibition" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white block  px-3 py-2 text-base font-medium ${pathname === '/exhibition' ? 'active' : ''} `}>Exhibition</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/about" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-300 hover:bg-gray-700 hover:text-white block  px-3 py-2 text-base font-medium ${pathname === '/about' ? 'active' : ''} `}>About</Link>

                <div className="border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-white block  px-3 py-2 text-base font-medium " aria-current="page">
                  {user?.user?._id ? (
                    <></>

                  ) : (

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className=' border-2 border-gray-100 rounded'>
                      <Link className='w-full inline-block text-gray-100 py-[0.4rem] px-5 ' href={`/auth/login?returnUrl=${pathname}`}>Log In</Link>
                    </motion.button>
                  )}

                </div>
              </div>

            </div>


          </nav >
        )
      }


    </>
  )
}

export default Navbar