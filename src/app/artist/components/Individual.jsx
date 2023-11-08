"use client"
import ArtistCard from '@/components/ArtistCard'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import ArtCard from '@/components/ArtCard';
import Skeleton from '@/components/Skeleton';
const Individual = () => {
    const { artistid: userId } = useParams()

    const [userData, setUserData] = useState('')
    const [loading, setLoading] = useState(true)

    let likes = 0
    if (userData) {

        userData.map((item, index) => {
            console.log(item.likes.length)

            likes = likes + item.likes.length
        })
    }




    async function fetchData() {
        try {
            const res = await fetch(`/api/products/user/${userId}`)


            if (res.status == 200) {
                const data = await res.json()
                setUserData(data)
                setLoading(false)
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
            {loading ? (

                <Skeleton type={"card"} />
            ) : (
                <>

                    <ArtistCard artwork={userData?.length} likes={likes} />
                    <div className=" myScroll overflow-x-scroll flex py-5">
                        {
                            userData?.length > 0 && userData?.map((item, index) => {

                                return <ArtCard key={index} item={item} />
                            }
                            )}
                    </div>
                </>
            )}
        </>
    )
}

export default Individual