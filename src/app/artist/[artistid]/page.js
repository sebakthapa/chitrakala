"use client"
import ArtistCard from '@/components/ArtistCard'
import React, { useState,useEffect } from 'react'
import { usePathname } from 'next/navigation';
import ArtCard from '@/components/ArtCard';

const Page = () => {
  const  userId = usePathname().split('/')[2];

  const [userData,setUserData] = useState('')





  async function fetchData() {
    try {
      const res = await fetch(`/api/products/user/${userId}`)
 

      if (res.status == 200) {
        const data = await res.json()
        setUserData(data)
      }

    } catch (error) {
      throw error
    }

  }
  useEffect(() => {

    fetchData();
  }, []);


  return (
    <>
    <ArtistCard />
    <div className="flex overflow-x-scroll md:flex  md:-mx-2">
    {
      userData?.length > 0 && userData?.map((item, index) => {

        return <ArtCard key={index} item={item} />
      }
      )}
    </div>
    </>
  )
}

export default Page