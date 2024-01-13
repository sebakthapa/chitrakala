"use client"
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { BsPencil, BsPencilFill } from 'react-icons/bs'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '@/redux/features/userSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toggleFollowing } from '@/redux/features/followingSlice'
import { addFollowingArts } from '@/redux/features/gallerySlice/followingSlice'
const ArtistCard = ({ artwork, likes }) => {
  const [artistData, setArtistData] = useState({})
  const pathname = usePathname()
  const artistId = pathname.split('/').at(-1);
  const dispatch = useDispatch();


  const user = useSelector((store) => store.user)
  const followingArtists = useSelector((store) => store.followingArtists)

  // const

  async function fetchUsers() {
    try {
      const res = await axios.get(`/api/userdetails/${artistId}`)
      setArtistData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);



  const handleToggleFollow = async () => {
    if (!user?._id && !artistData._id) {
      toast.error("Unable to follow!")
      return;
    }

    dispatch(toggleFollowing(artistData._id))
    try {
      await axios.patch(`/api/follow/${user?._id}`, { artistId, userId: user?.user?._id, artistDetailsId: artistData._id })
      // throw "error"
      dispatch(addFollowingArts([]))

    } catch (error) {
      dispatch(toggleFollowing(artistData._id))
      console.log(error)
      toast.error("Some error occured!")
    }


  }

  return (

    <div className="bg-white  font-sans h-[70vh]   flex justify-center items-center sm:m-5">
      <div className="  border-2 border-gray-100 rounded-sm mt-14 relative md:w-1/3 mx-auto bg-white shadow-lg ">

        {
          artistId == user?.user._id ? (
            <Link title='Edit profile.' className="edit  p-2 absolute right-0 m-2"
              href="/profile-setup?step=personal-details" >
              {
                <>
                  <div className="group  p-2 rounded-full hover:bg-gray-100 transition ">
                    <span className=' hidden group-hover:block'>
                      <BsPencilFill className='w-5 h-5' />
                    </span>
                    <span className=' group-hover:hidden'>
                      <BsPencil className='w-5 h-5' />
                    </span>
                  </div>
                </>
              }
            </Link>
          ) : (
            <>
              {
                followingArtists && (
                  <div className='followingbuttoncontainer p-2 absolute right-0 m-2'>
                    <button onClick={handleToggleFollow} className="FollowButoon px-2 py-1 font-medium rounded hover:bg-gray-100 active:bg-white border-2 text-xs">
                      {
                        followingArtists?.length > 0 && followingArtists?.includes(artistData?._id) ? "Unfollow" : "Follow"
                      }
                    </button>
                  </div>
                )
              }

            </>
          )
        }

        {
          artistData?.image ? <Image
            className="w-36 h-36 object-cover mx-auto rounded-full -mt-20 border-8 border-white"
            src={`${artistData?.image}`}
            alt="artist image"
            width={150}
            height={150}
          /> : ""
        }
        <div className="text-center mt-2 text-3xl font-bold  text-gray-950">{artistData?.name || <Skeleton />}</div>
        <div className="text-center mt text-sm font-semibold text-gray-700">{artistData?.user?.username ? `@${artistData.user.username}` : <Skeleton />}</div>
        <div className="text-center mt-4 font-medium text-sm text-gray-500">{artistData?.user?.email || <Skeleton />}</div>
        <div className="text-center font-light mt- text-sm text-gray-500">{artistData?.address || <Skeleton />}</div>
        <div className="px-6  mt-4   ">
          <p className='text-center font-medium text-gray-500 mt-8  '>{artistData?.bio || <Skeleton />}</p>
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