import React from 'react'
import Image from 'next/image';

function Landing() {
    return (
        <>
           

            <div className='flex  overflow-hidden  bg-[#fff] min-h-[50vh] h-[90vh]'>

                <div className="flex-[100%]  mt-20 flex items-center flex-col justify-center">
                    <span className='text-7xl saman p-5  font-extrabold'>Chitrakala</span>
                    <p className="block font-sans text-2xl text-center font-light leading-relaxed text-gray-700 antialiased">
                    The Marketplace & Gallery of Exclusive painting
          </p>
                    
                    <span className='text-xl  text-center  font-extralight'> 
                    
                    </span>
                    <div className='flex gap-5 m-10'>
                        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Explore</button>
                        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full'>Shop</button>
                    </div>
                </div>

                <div className=' hidden  lg:flex justify-start '>
                    <div className='a opacity-90  scale-[1.1]  '>
                        <Image
                            priority
                            alt='Painting of an old man'
                            src={'/landing/landingE.png'}
                            width={1000}
                            height={1000}
                            
                        />
                    </div>
                </div>
            </div>
            

            

        </>
    )
}

export default Landing