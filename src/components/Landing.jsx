import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function Landing() {
    return (
        <>
           

            <div className='flex  overflow-hidden  bg-[#fff] min-h-[50vh] h-[90vh]'>

                <div className="flex-[100%]  mt-10 flex  flex-col justify-center md:pl-10">
                    <span className='  text-7xl saman  px-5  font-extrabold'>Chitrakala
                    </span>
                    <span className='text-[2rem] text  font-sans px-5 pt-3  font-semibold'>Where Imagination Meets Canvas</span>
                    <p className="block font-sans text-md   leading-relaxed text-gray-700 antialiased p-5">
                    Chitrakala is the social marketplace that allows you to discover, buy, and sell art. A place for the art-curious and the art-expert, for the art gallery and artist. A new way forward for the art world.
          </p>
                    
                    <span className='text-xl  text-center  font-extralight'> 
                    
                    </span>
                    <div className='flex gap-5 m-5'>
                        <Link
                        href="/gallery"
                        >
                        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-lg'>Explore</button>
                        </Link>
                        <Link
                        href="/about"
                        >
                        <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-lg'>About</button>
                        </Link>
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