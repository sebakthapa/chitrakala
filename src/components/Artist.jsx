"use client"
import React, { useState,useEffect   } from 'react'
import Carousel from './Carousel'
const Artist = () => {
  

  return (
    <>


  

    <div className='m-5 '>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Filter</button>
    </div>

   <main className='bg-black m-5 flex flex-wrap'>
      <section className='bg-slate-300 w-full p-5 flex justify-between'>
        <aside className='flex gap-5'>
          <div className='bg-red-50 w-[6rem] h-[6rem] flex justify-center items-center border rounded-full'>Photo</div>
          <div>
            <div>The man is so good</div>
            <div>He is one of the man</div>
            <div>Ok Ok Ok Ok</div>
            <div>Hello</div>
          </div>
        </aside>

        <div className='flex justify-center items-center'>
        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Checkout</button>
                        
        </div>

      </section>

   </main>
    </>
  )
}

export default Artist