"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, clearUserData } from '@/redux/features/userSlice';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { showNavigationMenu } from '@/lib/utils';
import { BsPlusCircle } from 'react-icons/bs';
import { SiIconfinder } from 'react-icons/si'
import { AiFillPicture, AiFillHome, AiFillInfoCircle } from 'react-icons/ai';
import { ImInfo, ImProfile } from 'react-icons/im'
import { toast } from 'react-toastify';
import { addFollowingData, toggleFollowing } from '@/redux/features/followingSlice';

function Navbar() {

  const router = useRouter();
  const { data: session, status:sessionStatus } = useSession();

  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const showNav = showNavigationMenu(pathname)

  const [isOpen, setIsOpen] = useState(false);

  const [showHover, setShowHover] = useState(false);




  const fetchUserDetails = async (uid) => {
    try {
      const res = await axios.get(`/api/userdetails/${uid}`);
      if (res.status == 200) {
        dispatch(addUserData(res.data))
        return res;
      }
      
      return;
    } catch (error) {
      throw error
    }
  }

  const fetchFollowing = async (uid) => {
    try {
      const res = await axios.get(`/api/follow/${uid}`);
      if (res.status == 200) {
        dispatch(addFollowingData(res.data))
        return res;
      } else {
        throw res
      }
    } catch (error) {
      throw error
    }
  }
  


  const handleAddClick = () => {
    if (!session?.user.emailVerified) {
      signIn("email", { email: user?.user.email, redirect: false })
      toast.info("Please Verify your email to Upload on Chitrakala!")
      router.push("/auth/verify-email");
      return;
    }

    if (session?.user.id) {
      if (session?.user.isArtist) {
        router.push("/upload");
      } else {
        router.push("/profile-setup?step=personal-details")
        toast.info("Fill these details about you to upload!")
      }
    } else {
      router.push("/auth/login")
      toast.info("Please login to upload on Chitrakala!")
    }
  }


  const handleSignout = async () => {
    try {
      const res = await signOut({ redirect: false });
      dispatch(clearUserData());

    } catch (error) {
      throw error;
    }
  }


  useEffect(() => {

    const sessionUser = session?.user?.id;
    const reduxUser = user?.user?._id;


    if (!reduxUser) {
      if (sessionUser) {
        // fetch user details and store in redux store
        fetchUserDetails(sessionUser);
        fetchFollowing(sessionUser)
      }
    } else {
      if (sessionUser && sessionUser != reduxUser) {
        // fetch user details and store in redux store
        fetchUserDetails(session?.user.id);
      }
    }
  }, [session])


  const handleProfileMenuToggle = (e) => {
    if (showHover) {
      if (!e.target.classList.contains("profileMenuItem")) {
        setShowHover(false)
      }
    }
  }


  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      handleProfileMenuToggle(e);
    })
  })




  return (
    <>
      {
        showNav ? ( // showing only logo in pages like auth/login and auth/signup
          <Link className='mt-7 ml-4 xxs:3 xs:ml-7 block' href={"/"}>
            <span className='saman text-4xl  text-[#222] font-semibold'>CHITRAKALA</span>
          </Link>
        ) : ( // showing full nav with navitems in other pages
          <nav className="z-20 bg-gray-800 mt-2 relative m-5 shadow-md ">
            <div className="bg-white mx-auto px-0 xxs:px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  <button onClick={() => setIsOpen(!isOpen)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
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
                <div className="flex flex-1 items-center justify-start ml-16 xxs:ml-20 xs:ml-0 xs:justify-center  md:items-stretch md:justify-start">
                  <div className="flex flex-shrink-0 items-center mr-10">
                    <Link href={"/"} className='-ml-5 xs:ml-5 lg:ml-8'>
                      <span className='saman xs:l-10  xxs:mr-0 text-2xl xs:text-3xl text-[#222] font-semibold'>CHITRAKALA</span>
                    </Link>
                  </div>
                  <div className="hidden md:ml-6 md:block">
                    <div className="flex space-x-3 lg:space-x-5 ">
                      <Link href="/" className={`${pathname === '/' ? 'active' : ''} hover:bg-gray-100 text-gray-800  rounded-full px-2 lg:px-3 py-2 text-sm font-semibold`} aria-current="page">Home</Link>
                      <Link href={`/arts/${user?.following?.length > 0 ? "popular" : "popular"}`} className={`${pathname.includes( '/arts') ? 'active' : ''} hover:bg-gray-100 text-gray-800  rounded-full px-2 lg:px-3 py-2 text-sm font-semibold`} aria-current="page">Gallery</Link>
                      <Link href="/artist" className={`${pathname === '/artist' ? 'active' : ''} hover:bg-gray-100 text-gray-800  rounded-full px-2 lg:px-3 py-2 text-sm font-semibold`} aria-current="page">Artist</Link>
                      <Link href="/exhibition" className={`${pathname === '/exhibition' ? 'active' : ''} hover:bg-gray-100 text-gray-800  rounded-full px-2 lg:px-3 py-2 text-sm font-semibold`} aria-current="page">Exhibition</Link>
                      <Link href="/about" className={`${pathname === '/about' ? 'active' : ''} hover:bg-gray-100 text-gray-800  rounded-full px-2 lg:px-3 py-2 text-sm font-semibold`} aria-current="page">About</Link>


                      {/* <Link href="/add_artist_details" className={`${pathname === '/add_artist_details' ? 'active' : ''} hover:bg-gray-100 text-gray-800 hover:text-white rounded-md px-2 lg:px-3 py-2 text-sm font-medium`} aria-current="page">Be an Artist</Link> */}
                    </div>

                  </div>
                </div>


                <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0 gap-0 xxs:gap-1 xs:gap-5">
                  {
                    session?.user?.id ? (
                      <>
                        <button
                          onClick={handleAddClick}
                          type="button"
                          title='Upload your artwork.'
                          className="relative  p-2 rounded-full border-none  text-gray-400 hover:text-white "
                        >
                          <BsPlusCircle className='w-5 h-5 xs:w-6 xs:h-6' fill='#1f2937' />
                        </button>
                        <div id='ppMain' className="ppMain relative ml-3 rounded-full" onClick={() => setShowHover(prev => !prev)}>
                          <div id='ppPhoto' className='ppPhoto'>
                            <button type="button" className=" relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                              <span className="absolute -inset-1.5"></span>
                              <span className="sr-only">Open user menu</span>

                              <Image className="h-7 w-7 xs:h-10 xs:w-10 rounded-full object-cover" height={100} width={100} src={user?.image || "/default-profile.png"} alt="profile image" />


                            </button>
                          </div>
                          {showHover &&
                            <div className="absolute top-[75%] right-0 z-10 bg-red-00">
                              <div id='ppHover' className="ppHover    mt-4 w-48 origin-top-right rounded-md flex  flex-col gap-1  bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <span className="  font-bold w-full block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">{user?.name}</span>
                                <Link href={`/artist/${user?.user._id}`} className="profileMenuItem hover:bg-gray-100 w-full block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">My Profile</Link>
                                <Link href="/profile-setup?step=change-password" className="profileMenuItem hover:bg-gray-100 w-full block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Change Password</Link>
                                <span href="/" onClick={handleSignout} className="profileMenuItem hover:bg-gray-100 w-full cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</span>
                              </div>
                            </div>
                          }
                        </div>


                      </>
                    ) : (
                      <>
                        {
                          showNav || (
                            <div className="handlers authButtons text-[#556f5f] pt-0  flex gap-2 w-fit lg:gap-5 text-sm ">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                className='    bg-gray-800   rounded-full border-[1px] border-[#ffffff44]'>
                                <Link className='inline-block font-bold text-gray-100 py-[0.35rem] px-3 lg:py-[0.4rem] lg:px-5 ' href={`/auth/login?returnUrl=${pathname}`}>Log In</Link>
                              </motion.button>

                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='hidden md:block border-2 border-gray-900 rounded-full'>
                                <Link className='inline-block text-gray-800 py-[0.35rem] px-3 lg:py-[0.4rem] lg:px-5 ' href={`/auth/signup?returnUrl=${pathname}`}>Sign Up</Link>
                              </motion.button>

                            </div>
                          )
                        }
                      </>
                    )}

                </div>
              </div >
            </div >

            {isOpen && (

              <div className={`${!isOpen ? "hidden " : " "} md:hidden absolute t-0  float-right  w-full h-screen bg-black opacity-50 `} onClick={() => { setIsOpen(false) }}>
              </div>
            )}


            <div
              className={`pt-3 border-t-2 shadow-lg  border-[rgba(255,255,255,.1)]  min-h-screen h-fit pb-5 md:hidden bg-white z-20 w-1/2 min-w-[15rem]  absolute  transition-all duration-[300ms] ${isOpen ? " opacity-100 left-0 " : "-left-[100%] opacity-50"
                }`}
              id="mobile-menu"
            >

              <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col  items-center w-full gap-3 ">

                <Link onClick={() => { setIsOpen(false) }} href="/" className={` border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center flex gap-6  items-center hover:bg-gray-100 text-gray-800   px-7 py-2 text-bold font-medium ${pathname === '/' ? 'active' : ''} } `} ria-current="page"> <AiFillHome className='w-5 h-5' fill='#1f2937' /> Home</Link>

                  <Link onClick={() => { setIsOpen(false) }} href={`/arts/${user?.following?.length > 0 ? "popular" : "popular"}`} className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-800 hover:bg-gray-100 flex gap-6  items-center  px-7 py-2 text-bold font-medium ${pathname === '/arts' ? 'active' : ''} `}> <AiFillPicture className='w-5 h-5' fill='#1f2937' /> Gallery</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/artist" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-800 hover:bg-gray-100 flex gap-6  items-center  px-7 py-2 text-bold font-medium ${pathname === '/artist' ? 'active' : ''} `}> <ImProfile className='w-5 h-5' fill='#1f2937' /> Artist</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/exhibition" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-800 hover:bg-gray-100 flex gap-6  items-center  px-7 py-2 text-bold font-medium ${pathname === '/exhibition' ? 'active' : ''} `}> <SiIconfinder className='w-5 h-5' fill='#1f2937' /> Exhibition</Link>

                <Link onClick={() => { setIsOpen(false) }} href="/about" className={`border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-gray-800 hover:bg-gray-100 flex gap-6  items-center  px-7 py-2 text-bold font-medium ${pathname === '/about' ? 'active' : ''} `}> <ImInfo className='w-5 h-5' fill='#1f2937' /> About</Link>

                <div className="border-b-[px] font-sans border-[rgba(255,255,255,.1)] pb- w-full text-center text-white flex gap-2  items-center  px-4 py-5 mt-5 text-bold font-medium " aria-current="page">
                  {user?.user?._id ? (
                    <></>

                  ) : (
                    <div onClick={() => { setIsOpen(false) }} className='flex flex-col gap-3 justify-center w-full border-t-[1px] border-[#ffffff55] pt-8'>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className='  w-full border-[1px] border-gray-900 rounded-full'>
                        <Link className='w-full inline-block text-gray-800 py-[0.5rem] px-2 ' href={`/auth/login?returnUrl=${pathname}`}>Log In</Link>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 200, damping: 10
                        }}
                        className=' w-full bg-gray-900 border-[1px] border-gray-900 rounded-full'
                      >
                        <Link className='inline-block w-full  text-gray-200 py-[0.5rem] px-2 ' href={`/auth/signup?returnUrl=${pathname}`}>Sign Up</Link>
                      </motion.button>
                    </div>
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