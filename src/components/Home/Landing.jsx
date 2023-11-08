"use client"
import Image from 'next/image';
import Link from 'next/link';
import { easeOut, motion } from "framer-motion"
import { BsArrowRight } from 'react-icons/bs';

function Landing() {
    return (
        <>
            <div className='landing flex shrink-0    justify-between items-center overflow-hidden  bg-[#fff] min-h-[50vh] h-[90vh]'>

                <div className="flex-[100%] shiny_effect md:-mr-28  relative  max-w-[650px] flex flex-col justify-center md:pl-5 lg:pl-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: 'easeOut', duration: .7 }}
                        className='  text-7xl saman  px-5  font-extrabold'
                    >
                        Chitrakala
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeOut", duration: 1, delay: 0.4 }}
                        className='text-3xl text  px-5 pt-3  font-semibold'
                    >
                        Where Imagination Meets Canvas
                    </motion.span>
                    <motion.p
                        className=" text-md   leading-relaxed text-gray-700 antialiased p-5"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
                    >
                        Chitrakala is the social marketplace that allows you to discover, buy, and sell art. A place for the art-curious and the art-expert, for the art gallery and artist. A new way forward for the art world.
                    </motion.p>

                    <span className='text-xl  text-center  font-extralight'>

                    </span>
                    <motion.div
                        className='flex gap-5 mx-5 mt-2'
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: "easeInOut", duration: 1, delay: 1.5 }}
                    >
                        <Link href="/about">
                            <button className='border text-[#556f5f] border-[#556f5f] hover:bg-[#556f5f] hover:text-white py-2 px-6 rounded-full transition duration-300'>About</button>
                        </Link>
                        <Link href="/gallery">
                            <button className='group border  border-[#556f5f] bg-[#556f5f] text-gray-100 hover:text-white py-2 px-6 pr-5 rounded-full flex items-center gap-2'>Explore <BsArrowRight className='w-0 transition-all duration-500 ease-in-out group-hover:w-4 h-4' fill='white' /></button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className=' hidden md:flex h-full  shrink-0 items-center justify-start xl:mr-16'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeOut', duration: 1.5 }}
                >
                    <div className='a opacity-90   scale-[1.1]  '>
                        <Image
                            priority
                            alt='Painting of an old man'
                            src={'/landing/landingE.png'}
                            className=' b-red-500 w-[25rem] lg:w-[30rem] xl:w-[35rem]  object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,.5)] lg:drop-shadow-[0_50px_50px_rgba(0,0,0,.8)] '
                            width={1000}
                            height={1000}

                        />
                    </div>
                </motion.div>
            </div>




        </>
    )
}

export default Landing