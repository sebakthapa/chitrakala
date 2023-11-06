"use client"
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ArtistCard = ({ artwork, likes }) => {
  const [userData, setUserData] = useState({})
  const userId = usePathname().split('/')[2];

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
    <div class="bg-gray-200 font-sans h-[70vh] overflow-hidden w-full flex flex-row justify-center items-center">
      <div class="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
        <img
          class="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
          src={`${userData?.image}`}
          alt="artist image"
          width={100}
          height={100}
        />
        <div class="text-center mt-2 text-3xl font-medium">{userData?.name}</div>
        <div class="text-center mt-2 text-sm font-medium">@{userData?.user?.username}</div>
        <div class="text-center mt-2 font-light text-sm">{userData?.user?.email}</div>
        <div class="text-center font-normal text-lg">{userData?.user?.address}</div>
        <div class="px-6 text-center mt-2 font-light text-sm">
          <p>{userData?.bio}</p>
        </div>
        <hr class="mt-8" />
        <div class="flex p-4">
          <div class="w-1/2 text-center">
            <span class="font-bold">{artwork}</span> ArtWorks
          </div>
          <div class="w-0 border border-gray-300"></div>
          <div class="w-1/2 text-center">
            <span class="font-bold">{likes}</span> Likes
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistCard