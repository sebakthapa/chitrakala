"use client"
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Image from 'next/image'
import {  useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { motion,  AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Page = () => {
  const [isLogin, setIsLogin] = useState(false);

 




  return (
    <div className='authPage  '>
      {/* <UserAuth title="sign up" /> */}
      <Link href="/" className='saman text-4xl text-[#556f5f] font-semibold pt-5 pl-5 inline-block'>CHITRAKALA</Link>

      <main className='flex justify-center gap-20 items-center min-h-[100vh] '>

        <div className="formContainer relative flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              className=''
              key={isLogin ? "login" : "signin"}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0, }}
              transition={{ duration:0.3 }}>
              {
                isLogin ? <Login /> : <Signup />
              }
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='font-bold'>or</div>

        <div className="authOptions  flex flex-col gap-2 justify-center">
          <div className="changePage text-center">
            <AnimatePresence mode="wait">
              <motion.div
                className=''
                key={isLogin ? "login" : "signin"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, }}
                transition={{ duration: 0.3 }}>
                {isLogin ? "Not registered yet? " : "Already registered? "}<button className='ml-1 text-blue-600 underline font-semibold hover:no-underline' onClick={() => setIsLogin((prev) => !prev)}>{isLogin ? " Sign In" : " Log In"}</button>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className=' text-center'>OR</p>
          <button className='p-[2px] pr-5 bg-[#4285F4] flex items-center gap-5'><FcGoogle className='bg-white h-10 w-10 p-2' /> <span className='text-white font-semibold'> Continue with Google </span> </button>
          <button className='p-[2px] pr-5 bg-[#4267B2] flex items-center gap-5'><Image src="/facebook.svg" width="20" height="20" className='bg-white h-10 w-10 p-[0.4rem]' /> <span className='text-white font-semibold'> Continue with Facebook </span> </button>
        </div>
      </main>


    </div>
  )
}

export default Page
