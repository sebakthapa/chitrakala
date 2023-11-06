"use client"
import Input from './Input/Input'
import { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import { toast } from 'react-toastify'

const Login = (props) => {
    const dispatch = useDispatch();
    const { data: session, status: sessionStatus } = useSession();
    // toast(session?.user)
    const router = useRouter()
    const searchParams = useSearchParams()



    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm();


    const handleLogin = async (data) => {
        try {
            setIsSubmitting(true);
            const data = { loginID: loginId, password };
            const res = await signIn('credentials', { ...data, redirect: false })
            // console.log( await res.json())
            if (!res.ok) {
                toast.error("Credentials do not match!");
            } else {
                // redirect("/add_artist_details");

            }


        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            setPassword("")


        }

    }



    useLayoutEffect(() => {
        if (sessionStatus == "authenticated") {
            if (!session?.user.emailVerified) {
                redirect("/auth/verify-email");
            } else {
                    redirect(searchParams.get("returnUrl")  ? searchParams.get("returnUrl") : "/")
            }
        }


    }, [session, sessionStatus])


    useEffect(() => {
        const error = searchParams.get("error");
        if (error == "") {
            //error for account already linked
        }
    }, [])



    return (
        <form className='sm:border-gray-700 sm:border-2 sm:p-5  flex flex-col gap-6 w-full sm:w-[500px] rounded' onSubmit={handleSubmit(handleLogin)}>
            <h2 className='form_title '>Log in</h2>
            <div className="input_field_container">
                <Input
                    // register={register}
                    // error={errors["username/email/phone"]}
                    // clearErrors={clearErrors}
                    required
                    type="text"
                    label="username/email/phone"
                    value={loginId}
                    setValue={setLoginId}
                    classLists=""
                    name="loginID"
                    autoComplete="email username tel-local"
                />

                <Input
                    // register={register}
                    error={errors.password}
                    clearErrors={clearErrors}
                    required
                    type="password"
                    label="password"
                    value={password}
                    setValue={setPassword}
                    classLists=""
                    name="password"
                    autoComplete="current-password"

                />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-gray-900 text-white hover:bg-gray-700' type="submit" >
                {
                    isSubmitting ? "Logging In..." : "Log In"
                }
            </motion.button>
        </form>
    )
}

export default Login
