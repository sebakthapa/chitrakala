"use client"
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { FiArrowLeft } from "react-icons/fi"
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { addUserData } from '@/redux/features/userSlice'
import isAuthenticated from '@/components/isAuthenticated'
import { toast } from 'react-toastify'
import Link from 'next/link'

const Page = ({ params, searchParams, ...props }) => {
  // const user = useSelector(state => state.user)
  const { data: session, status: sessionStatus } = useSession();


  // console.log(isNewUser)
  // console.log(params, searchParams.returnUrl)
  // console.log(props)

  const [isLogin, setIsLogin] = useState(params?.type == "login" ? true : false);



  useLayoutEffect(() => {
    if (sessionStatus == "authenticated") {
      if (session?.user.isArtist) {
        redirect("/profile-setup?step=welcome")
      } else {
        redirect(searchParams.returnUrl || "/")
      }
    }
  }, [session, searchParams.returnUrl, sessionStatus])


  const handleGoogleSignin = async () => {
    try {
      await signIn("google", { callbackUrl: `${searchParams?.returnUrl ? searchParams?.returnUrl : "/"}`, redirect:false, });
      // console.log(res)

    } catch (error) {
      throw error
    }
  }

  if (sessionStatus == "loading") {
    return (
      <h1>LOADING...</h1>
    )
  }

  if (searchParams?.callbackUrl?.length > 0) {
    toast.error("You must login to continue!")
  }



  return (
    <div className={`authPage ${sessionStatus == "authenticated" ? "hidden" : ""}`}  >

      <main className='flex flex-col lg:flex-row justify-center gap-5 lg:gap-10 xl:gap-20 items-center min-h-[100vh]'>

        <div className="formContainer relative flex justify-center items-center w-full lg:w-fit p-3 xxs:p-5 xs:p-7 ">
          <AnimatePresence mode="wait" className="w-full">
            <motion.div
              className='w-full sm:w-fit'
              key={isLogin ? "login" : "signin"}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0, }}
              transition={{ duration: 0.3 }}>
              {
                isLogin ? <Login /> : <Signup />
              }
            </motion.div>
          </AnimatePresence>
        </div>
        <div className='font-bold'>or</div>

        <div className="authOptions  flex flex-col gap-5 justify-center">
          <div className="changePage text-center">
            <AnimatePresence mode="wait">
              <motion.div
                className=''
                key={isLogin ? "login" : "signin"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, }}
                transition={{ duration: 0.3 }}>
                {
                  isLogin ? "Not registered yet? " : "Already registered? "}
                <Link
                  className='ml-1 text-blue-600 underline font-semibold hover:no-underline'
                  href={`/auth/${isLogin ? "signup" : "login"}${searchParams?.returnUrl ? `?${searchParams?.returnUrl}` : ""}`}
                >
                  {isLogin ? " Sign Up" : " Log In"}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className=' text-center text-sm'>or</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className='p-[2px] pr-5 bg-[#4285F4] flex items-center gap-5 hover:bg-[#316ac6] group'
            onClick={handleGoogleSignin}
          >
            <FcGoogle className='bg-white h-10 w-10 p-2' />
            <span className='text-white font-semibold'> Continue with Google </span>
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className='mt-2 p-[2px] pr-5 bg-[#4267B2] flex items-center gap-5 hover:bg-[#31549b] group'
          >
            <Image alt='facebook logo' src="/facebook.svg" width="20" height="20" className='bg-white h-10 w-10 p-[0.4rem]' />
            <span className='text-white font-semibold'> Continue with Facebook </span>
          </motion.button> */}
        </div>
      </main>


    </div>
  )
}

export default Page
