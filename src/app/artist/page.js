import React from 'react'
import Artist from './components/Artist'

export const metadata = {
  title: 'Artists - Chitrakala',
  description: 'Art marketplace and showcase.',
}

const Page = () => {
  return (
    <>
            <h1 className='text-center font-extrabold text-2xl '>Artists</h1>

        <Artist/>
    </>
  )
}

export default Page