"use client"
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from "framer-motion"
import { typingEffect } from '@/lib/utils';

const Page = ({ searchParams }) => {

    const [title, setTitle] = useState("")

    const step = searchParams?.step;
    const titleText = "Welcome to Chitrakala!";
    const typingSpeed = 100; // Adjust the speed as desired

    useEffect(() => {
        let currentIndex = 0;

        const typeText = () => {
            if (currentIndex < titleText.length -1) {
                setTitle(prevText => prevText + titleText[currentIndex]);
                currentIndex++;
                setTimeout(typeText, typingSpeed);
            }
        };

        typeText();
    }, []);


    if (step == "welcome") {
        return (
            <div className='w-full max-w-[500px] border-2 m-auto mt-20'>
                <h1
                    className='text-4xl  font-extrabold'
                >
                    {title}
                </h1>
                <motion.h5
                    className='font-semibold text-gray-600 mt-1'
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    Where Every Brushstroke Weaves Stories of Passion.
                </motion.h5>

                <div className="mainInformation">

                </div>
                <Link href={{ query: { step: "personal-details" } }}>Next</Link>
            </div>
        )
    }

    if (step == "personal-details") {
        return (
            <div>
                This is personal detail adding page
            </div>
        )
    }

    return (
        <div>
            This is profile setup page

        </div>
    )
}

export default Page
