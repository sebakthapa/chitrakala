"use client"
import { motion } from "framer-motion"
import UpdateDetails from '@/components/UpdateDetails';


const PersonalDetails = () => {
    return (
        <div className='w-full max-w-[600px] border- m-auto mt- font-serif border- p-2 xs:p-5 mt-10  rounded-lg'>
            <motion.h1
                className="text-2xl font-bold xxs:text-3xl xs:text-4xl xxs:font-semibold text-gray-700"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{once:true}}
            >
                Personal Details
            </motion.h1>
            <motion.h5
                className=' text-gray-500 text-sm italic mt-1 xxs:mt-2 xxs:text-base'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            >
                Fill these details to become artist on Chitrakala.
            </motion.h5>

            <motion.div className="mainInformation mt-20 xxs:mt-10"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <UpdateDetails />
            </motion.div>
        </div>
    )
}

export default PersonalDetails
