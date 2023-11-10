"use client"
import Input from './Input/Input'
import { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import { toast } from 'react-toastify'
import Link from 'next/link'

const Login = (props) => {
    const dispatch = useDispatch();
    const { data: session, status: sessionStatus } = useSession();
    // toast(session?.user)
    const router = useRouter()
    const searchParams = useSearchParams()

    const [showForgotPassword, setShowForgotPassword] = useState(false)



    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm();


    const handleLogin = async (data) => {
        try {
            setIsSubmitting(true);

            const data = { loginID: loginId, password };
            const res = await signIn('credentials', { ...data, redirect: false })
            console.log(res)
            if (!res.ok) {
                toast.error(res.error, { theme: "colored" });
            } else {
                router.replace("/");
            }


        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
            setPassword("")


        }

    }



    useEffect(() => {
        if (sessionStatus == "authenticated") {
            if (!session?.user.emailVerified) {
                router.replace("/auth/verify-email");
            } else {
                const callbackUrl = searchParams?.get("callbackUrl");
                // if (searchParams?.get("returning-user") == true) {
                //     console.log("returning user")
                //     router.replace(searchParams?.get("returnUrl") ? searchParams?.get("returnUrl") : "/");
                // } else {
                //     router.replace("/profile-setup?step=welcome")
                // }
                router.replace(searchParams?.get("returnUrl") ? searchParams?.get("returnUrl") : "/");

            }
        }
    }, [session, sessionStatus, searchParams])


    useEffect(() => {
        const error = searchParams?.get("error");
        console.log(error)
        if (error == "OAuthAccountNotLinked") {
            toast.error("The email is already linked to another account!", { autoClose: 10000, })
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

                <div>
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
                    
                        <Link className='text-blue-500 hover:text-blue-500 transition  font-semibold mt-0 text-xs hover:underline' href="/auth/password-reset">Forgot password</Link>
                </div>
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
