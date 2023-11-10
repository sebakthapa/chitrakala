"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] ">
            <h1 className="text-7xl  font-extrabold font-mono">OOPS!</h1>
            <h4 className="text-2xl font-bold font-mono text-gray-700">Unexpected brushstroke </h4>
            <h6 className="text-lg font-medium text-gray-500">Apologies, an error occurred in the art exhibit.</h6>
            <div className="flex gap-5 mt-5">
                <button onClick={() => router.back()} className="back bg-green-500 text-gray-50 hover:bg-green-600 transition duration-300 active:scale-90 py-4 px-6 rounded font-semibold  ">Go Back</button>
                <Link className='home bg-blue-500 text-gray-50 py-4 px-6 rounded font-semibold  hover:bg-blue-600 transition duration-300 active:scale-90' href={"/"}>Home</Link>
            </div>
        </div>
    )
}

export default Page
