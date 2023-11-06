"use client"
import React from 'react'
import Skeleton from '@/components/Skeleton'

const Page = () => {
  return (
    <div>
      <Skeleton
      type={"card"}
      />
      <Skeleton
      type={"reel"}
      />
      <Skeleton
      type={"pp"}
      />
    </div>
  )
}

export default Page