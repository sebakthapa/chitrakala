"use client"
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from 'react-redux'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { addUserData } from '@/redux/features/userSlice'

const Page = ({ params, ...props }) => {
  const router = useRouter()
  // const user = useSelector(state => state.user)
  const { data: session, status } = useSession();


  // console.log(isNewUser)

  const [isLogin, setIsLogin] = useState(params?.type == "login" ? true : false);


  // Create a history stack
  const historyStackRef = useRef([]);

  useEffect(() => {
    if (session?.user?.id) {
      console.log(session?.user.isSeller)
      if (session?.user.isSeller) {
        router.back()
      } else {
        redirect("/add_artist_details")
      }
    }
  }, [session])

  useEffect(() => {
    isLogin ? router.replace('/auth/login') : router.replace("/auth/signup");


  }, [isLogin])

  // // Add the current page to the history stack
  // useEffect(() => {
  //   historyStackRef.current.push(isLogin ? 'login' : 'signup');
  // }, [isLogin]);

  // // Handle browser back button press
  // useEffect(() => {
  //   const handleBackButton = (event) => {
  //     if (historyStackRef.current.length > 1) {
  //       historyStackRef.current.pop(); // Remove the current page
  //       const previousPage = historyStackRef.current.pop();
  //       setIsLogin(previousPage === 'login');
  //       router.back();
  //     }
  //   };

  //   window.addEventListener('popstate', handleBackButton);

  //   return () => {
  //     window.removeEventListener('popstate', handleBackButton);
  //   };
  // }, []);

  const handleGoogleSignin = async () => {
    try {
    signIn("google");
      
    } catch (error) {
      throw error
    }
  }


  return (
    <div className='authPage  '>

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
                {isLogin ? "Not registered yet? " : "Already registered? "}<button className='ml-1 text-blue-600 underline font-semibold hover:no-underline' onClick={() => setIsLogin((prev) => !prev)}>{isLogin ? " Sign Up" : " Log In"}</button>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className=' text-center'>or</p>
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

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className='mt-2 p-[2px] pr-5 bg-[#4267B2] flex items-center gap-5 hover:bg-[#31549b] group'
          >
            <Image alt='facebook logo' src="/facebook.svg" width="20" height="20" className='bg-white h-10 w-10 p-[0.4rem]' />
            <span className='text-white font-semibold'> Continue with Facebook </span>
          </motion.button>
        </div>
      </main>


    </div>
  )
}

export default Page
