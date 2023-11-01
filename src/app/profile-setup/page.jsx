import Link from 'next/link';
import React from 'react'

const page = ({ searchParams }) => {
    console.log(searchParams);
    const step = searchParams?.step;
    if (step == "welcome") {
        return (
            <div className='w-full max-w-[500px] bg-red-100 m-auto mt-20'>
                <h1 className='text-3xl  font-semibold'>Welcome to Chitrakala</h1>
                <Link href={{query:{step:"personal-details"}}}>Next</Link>
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

export default page
