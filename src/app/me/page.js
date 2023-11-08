"use client"
import { motion } from "framer-motion"
import UpdateDetails from '@/components/UpdateDetails';
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";


const PersonalDetails = () => {
    const { data:session, status: sessionStatus } = useSession();
    
    useEffect(() => {
        if (sessionStatus == "unauthenticated") {
            toast.error("You must login to update details!")
            redirect("/")
        }
    }, [sessionStatus, session])
    return (
        <div className='w-full aa max-w-[600px] border- m-auto mt- font-serif border- p-2 xs:p-5 mt-10  rounded-lg'>
            <motion.div className="mainInformation "
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <UpdateDetails title="Your Profile" subtitle="Update your profile and upload on Chitrakala." />
            </motion.div>
         </div>
    )
}

export default PersonalDetails
