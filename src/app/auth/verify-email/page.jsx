"use client"
import { IS_CLIENT } from '@/lib/utils';
import { signIn, useSession } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//on verified push to profile?welcome
const Page = () => {
  const router = useRouter();
  const user = useSelector(state => state.user)


  const { data: session, status: sessionStatus } = useSession();

  const handleSendVerificationEmail = async () => {
    if ( user?.user?.email) {
      try {
        toast("Verification Link sent to your email. It may take few seconds to appear.")
        console.log("sending try")
        const res = await signIn("email", { email:  user?.user?.email, redirect: false },)
        console.log(res)
        if (res.error == null) {
          toast.success("Check your Mail!")
        } else {
          if (res.error.includes("Too many frequent requests!")) {
            toast.error(res.error)
          } else {
            toast.error("Unable to send verification Link! Please try again later.")
          }
        }
      } catch (error) {
        console.log("ERROR while sending email verification link")
        throw error;
      }
    } else {
      toast.error("Unable to send email Verificatin Link!")
      redirect("/")

    }
  }


  useLayoutEffect(() => {
    if (sessionStatus == "unauthenticated") {
      router.replace("/")
    }
    if (session?.user.emailVerified) {
      redirect("/profile-setup?step=welcome") 
    }
  }, [sessionStatus, session])






  return (
    <div className='mx-auto w-fit mt-16 text-center max-w-[500px] p-2'>
      <div className="icon grid place-items-center mb-5 text-gray-600">
        <span className=' animate-bounce   p-3 block w-fit rounded-full bg-[#00c72b33] outline outline-8  outline-[#00c72b11]'><MdEmail className='w-8 h-8' fill='#00c72b' /></span>

      </div>
      <h1 className='font-bold text-2xl xxs:text-3xl  text-gray-700'>Please check your email!</h1>
      <p className='font- text-gray-700 mt-4'>
        {`You're almost there! We've sent a verification link to`}
        <br />
        {
          user?.user?.email && (
            <span className="font-bold text-base xxs:text-xl text-gray-600">
              {`"${user?.user?.email}"`}
            </span>
          )
        }
      </p>
    
      <p className="mt-0">
        {`Just click on the link in that email to complete your signup. If you don't
        see it, you may need to`} <b className='text-gray-600'>check your spam </b> folder.
      </p>
      <p className='mt-7'>
        {` Still can't find the email? No problem.`}
      </p>

      {/* ${timerStatus == "loading" && "opacity-70 cursor-not-allowed hover:bg-gray-600 hover:shadow-none"} */}
      <button
        disabled={false}
        onClick={handleSendVerificationEmail}
        title={ "Click to Resend email verification link."}
        className={`py-3 px-8 mt-8 bg-gray-600 text-gray-200 font-semibold rounded transition duration-300 hover:bg-gray-700 hover:text-white hover:shadow-md  hover:shadow-[#11111188] 
        `}
      >
        Resend &nbsp;
        <span className='hidden xxs:inline-block text-gray-200 hover:text-white'>Verification</span>&nbsp;
        Link &nbsp;
      </button>
    </div>
  )
}

export default Page
