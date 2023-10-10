import React from 'react'

const ArtistCard = () => {
  return (
    <div className='flex flex-wrap w-full  gap-1 justify-center bg-transparent'>
    <div className=" border-2 border-[#556f5f]   rounded-lg m-5 flex flex-wrap-reverse flex-1 min-w-[20rem] justify-evenly items-center p-10 bg-[#e5eee9]">
      
      <div className='flex flex-col gap-5 border-[1px] border-[#556f5f9c]  p-5 rounded-lg'>
        <span className='text-3xl font-extrabold'>Artist Name</span>
        <span>Details</span>
        <span>Details</span>
        <span>Details</span>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Checkout</button>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='bg-white w-[10rem] h-[10rem] flex items-center justify-center border rounded-full'>Photo</div>
        <div className='flex flex-col gap-3 p-5'>
          <span>Joined on ___/___/___</span>
          <span>Tag:</span>

        </div>
      </div>

    </div>
  </div>
  )
}

export default ArtistCard