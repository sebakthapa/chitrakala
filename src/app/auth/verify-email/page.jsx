"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils';
import React, { useLayoutEffect } from 'react'



const Page = () => {
    const { data: session, status: sessionStatus } = useSession();
    useLayoutEffect(() => {
        if (session?.user.emailVerified) {
            redirect("/profile-setup?step=welcome")
        }
    },[sessionStatus, session])

  return (
    <div>
      Verfiy your email here
    </div>
  )
}

export default Page
