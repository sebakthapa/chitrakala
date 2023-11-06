import React from 'react'
import Skeleton from '@/components/Skeleton'
import TopCreator from '@/components/TopCreator'
export const metadata = {
  title: 'About - Chitrakala',
  description: 'Art marketplace and showcase.',
}

const Page = () => {
  return (
    <div>
      <TopCreator/>
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