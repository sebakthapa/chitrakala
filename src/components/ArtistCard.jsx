"use client"
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsPencil, BsPencilFill } from 'react-icons/bs'
import Link from 'next/link'
import { useSelector } from 'react-redux'
const ArtistCard = ({ artwork, likes }) => {
  const [userData, setUserData] = useState({})
  const userId = usePathname().split('/')[2];

  const [editHover, setEditHover] = useState(false)

  const user = useSelector(state => state.user)
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`/api/userdetails/${userId}`)
      const data = await res.json()
      setUserData(data)

      console.log(userData)
    }
    fetchUsers()
  }, [])

  return (
    <div className="pt-10 bg-gray-200 font-sans h-[70vh] overflow-hidden w-full flex flex-row justify-center items-center">
      <div className="card relative w-[26rem] mx-auto bg-white  shadow-xl hover:shadow">
        {
          userId == user?.user._id && (
            <Link onMouseEnter={() => setEditHover(true)} onMouseLeave={() => setEditHover(false)} className="edit  p-2 absolute right-0 m-2"
              href="/profile-setup?step=personal-details" >
              {
                editHover ? <BsPencilFill className='w-5 h-5' /> : <BsPencil className='w-5 h-5' />
              }
            </Link>
          )
        }

        <img
          className="w-40 h-40 object-cover mx-auto rounded-full -mt-20 border-8 border-white"
          src={`${userData?.image}`}
          alt="artist image"
          width={150}
          height={150}
        />
        <div className="text-center mt-2 text-3xl font-bold text-gray-950">{userData?.name || <Skeleton />}</div>
        <div className="text-center mt text-sm font-semibold text-gray-700">{userData?.user?.username ? `@${userData.user.username}` : <Skeleton />}</div>
        <div className="text-center mt-4 font-medium text-sm text-gray-500">{userData?.user?.email || <Skeleton />}</div>
        <div className="text-center font-light mt- text-sm text-gray-500">{userData?.address || <Skeleton />}</div>
        <div className="px-6  mt-4   ">
          <p className='text-center font-medium text-gray-500 mt-8  '>{userData?.bio || <Skeleton />}</p>
        </div>
        <hr className="mt-8" />
        <div className="flex p-4">
          <div title='Total artworks published on Chitrakala.' className="w-1/2 text-center">
            <span className="font-bold">{artwork}</span> Artworks
          </div>
          <div className="w-0 border border-gray-300"></div>
          <div title='Total likes of all artworks.' className="w-1/2 text-center">
            <span className="font-bold">{likes}</span> Likes
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistCard