"use client"
import { motion } from "framer-motion"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';


const Welcome = () => {
    const searchParams = useSearchParams();

    const user = useSelector(state => state.user)
    const router = useRouter();

    return (
        <div className='w-full max-w-[550px] border- m-auto mt-20 font-serif px-2'>
            <motion.h1
                className="text-center text-4xl xxs:hidden   font-semibold text-gray-700"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Welcome, {user?.name.split(" ")[0] || user?.user.email.split("@")[0]}
            </motion.h1>
            <motion.h1
                className="text-center text-3xl xs:text-4xl hidden xxs:block   font-semibold text-gray-700"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                Welcome to Chitrakala!
            </motion.h1>
            <motion.h5
                className='text-center hidden xxs:block text-sm   text-gray-500   italic mt-1'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease:"easeOut" }}
            >
                Where Every Brushstroke Weaves Stories of Passion.
            </motion.h5>

            <motion.div className="text-center mainInformation mt-8"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease:"easeOut" }}
            >
                <p className="goalMessage text-center text-[1.4rem]  xxs:text-2xl mb-10 font-semibold text-gray-600"                    >
                    {"What's your role on Chitrakala?"}
                </p>

                <div className="buttons flex flex-col sm:flex-row items-center  gap-10">
                    <button
                        onClick={() => { router.push(searchParams?.get("returnUrl") || "/"); toast(`Thank you, ${user?.name}. You may now continue browsing on Chitrakala.`, {}) }}
                        className=' p-7 xxs:p-10 text-center border-2 border-[rgba(0,0,0,.07)] rounded-lg  group hover:border-gray-300 hover:shadow-sm hover:-translate-y-1 transition duration-300 w-fit max-w-[240px] '
                    >
                        <h6 className='text-xl font-sans font-medium text-gray-600 mb-3 group-hover:text-black transition duration-300'>Visitor</h6>
                        <p className='text-gray-500 group-hover:text-gray-500 italic transition duration-300'>{"I'm here to discover different arts."}</p>
                    </button>
                    <button
                        onClick={() => router.push(`/profile-setup?step=personal-details&returnUrl=${searchParams?.get("returnUrl") ? searchParams?.get("returnUrl") : ""}`)}
                        className=' p-7 xxs:p-10 text-center border-2 border-[rgba(0,0,0,.07)] rounded-lg  group hover:border-gray-300 hover:shadow-sm hover:-translate-y-1 transition duration-300 w-fit max-w-[240px] '
                    >
                        <h6 className='text-xl font-sans font-medium text-gray-600 mb-3 group-hover:text-black transition duration-300'>Artist</h6>
                        <p className='text-gray-500 group-hover:text-gray-500 italic transition duration-300'>{"I'm here to showcase my works."}</p>
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default Welcome