"use client"
import { IS_CLIENT } from '@/lib/utils';
import { signIn, useSession } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//on verified push to profile?welcome

const Page = () => {
  const router = useRouter();
  const user = useSelector(state => state.user)

  const [localVerificationEmail, setLocalVerificationEmail] = useState(null)
  

  
  const { data: session, status: sessionStatus } = useSession();


  const handleSendVerificationEmail = async () => {
    if ( (IS_CLIENT && localStorage?.verificationEmail)  || user?.user?.email) {
      try {
        console.log("sending try")
        const res = await signIn("email", {email:(IS_CLIENT && localStorage?.verificationEmail)  || user?.user?.email, redirect:false},)
        console.log(res)
        if (res.error == null) {
          toast.success("Verification Link sent!")
        } else {
          toast.error("Unable to send verification Link! Please try again later.")
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
    // if (!localStorage?.verificationEmail) {
    //   if (!user?.user?.email) {
    //     toast.error("Unable to send Email Verification Link!")
    //     redirect("/")
        
    //   }
    // }
    if (session?.user.emailVerified) {
      redirect("/profile-setup?step=welcome")
    }
  }, [sessionStatus, session])

  useEffect(() => {
    setLocalVerificationEmail(localStorage.verificationEmail)
  },[])

  

  return (
    <div className='mx-auto w-fit mt-16 text-center max-w-[500px]'>
      <div className="icon grid place-items-center mb-5 text-gray-600">
        <span className=' animate-bounce   p-3 block w-fit rounded-full bg-[#00c72b33] outline outline-8  outline-[#00c72b11]'><MdEmail className='w-8 h-8' fill='#00c72b' /></span>

      </div>
      <h1 className='font-bold text-3xl text-gray-700'>Please verify your email</h1>
      <p className='font- text-gray-700 mt-4'>
        {`You're almost there! We've sent a verification link to`}
        <br />
        <span className="font-bold text-xl text-gray-600">
          {localVerificationEmail  || user?.user?.email}
        </span>
      </p>
      <p className="mt-8">
        {`Just click on the link in that email to complete your signup. If you don't
        see it, you may need to`} <b className='text-gray-600'>check your spam </b> folder.
      </p>
      <p className='mt-7'>
       {` Still can't find the email? No problem.`}
      </p>

      <button onClick={handleSendVerificationEmail} className='py-3 px-8 mt-8 bg-gray-600 text-gray-200 font-semibold rounded transition duration-300 hover:bg-gray-700 hover:text-white hover:shadow-md  hover:shadow-[#11111188]'>Resend Verification Email</button>

    </div>
  )
}

export default Page
