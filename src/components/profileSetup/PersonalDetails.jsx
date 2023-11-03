"use client"
import { motion } from "framer-motion"
import UpdateDetails from '@/components/UpdateDetails';


const PersonalDetails = () => {
    return (
        <div className='w-full max-w-[600px] border- m-auto mt- font-serif border- p-10 rounded-lg'>
            <motion.h1
                className="text-4xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{once:true}}
            >
                Personal Details
            </motion.h1>
            <motion.h5
                className=' text-gray-500 italic mt-2'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            >
                Fill these details so  viewers can find more about you.
            </motion.h5>

            <motion.div className="mainInformation mt-10"
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
