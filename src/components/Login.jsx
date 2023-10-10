"use client"
import Input from './Input'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { login } from '@/redux/features/userSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, watch, setError,clearErrors, formState: { errors } } = useForm();


    const handleLogin = async ({ password, ...loginId }) => {
        const loginID = loginId["username/email/phone"]

        console.log(loginID, password)

        try {
            setIsSubmitting(true)
            const res = await axios.post("/api/users/buyer/login", { loginID, password });
            console.log(res)
            if (res.status == 200) {
                // setUsernameFetchStatus("notAvailable")
                const userData = res.data;
                console.log(userData);
                dispatch(login(userData));
                // router.back();


            }
        } catch (error) {
            if (error?.response?.data?.field) {
                const { field, message } = error?.response?.data;
                setError(field, { message })
            } else {
                console.log(error)
            }
        } finally {
            setIsSubmitting(false)
            
        }

    }

    


    return (
        <form className='sm:border-gray-700 sm:border-2 sm:p-5  flex flex-col gap-5 w-full sm:w-[500px] rounded' onSubmit={handleSubmit(handleLogin)}>
            <h2 className='form_title '>Log in</h2>
            <div className="input_field_container">
                <Input
                    register={register}
                    error={errors["username/email/phone"]}
                    clearErrors={clearErrors}
                    required
                    type="text"
                    label="username/email/phone"
                    value={loginId}
                    setValue={setLoginId}
                    classLists=""
                />

                <Input
                    register={register}
                    error={errors.password}
                    clearErrors={clearErrors}
                    required
                    type="password"
                    label="password"
                    value={password}
                    setValue={setPassword}
                    classLists=""
                />
            </div>
            <motion.button  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-gray-900 text-white hover:bg-gray-700' type="submit" >
                {
                    isSubmitting ? "Logging In..." : "Log In"
                }
            </motion.button>
        </form>
    )
}

export default Login
