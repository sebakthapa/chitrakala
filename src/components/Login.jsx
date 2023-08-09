"use client"
import Input from './Input'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

const Login = () => {
    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")

    const { register, handleSubmit, watch,setError, formState: { errors } } = useForm();


    const handleLogin = (e) => {
        e.preventDefault()
console.log("ak")
        
    }

    const validateErrors = () => {
    //     if (loginId !== idFromDb) {
    //         setError("username/email/phone", {message:"Username doesn't exists"})
    //     } else {
    //         setError("username/email/phone", { message: "" })
            
    //         if (!/(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))((?=.*\W)|(?=.*_))^[^ ]+$/.test(password)) {
    //             setError("password", {message:"Incorrect Password"})
    //         } else {
    //             setError("password", {message:""})
    //         }

    //    }
    }


    return (
        <form className='sm:border-green-500 sm:border-4 sm:p-5  flex flex-col gap-5 w-full sm:w-[500px] rounded'  onSubmit={handleLogin}>
            <h2 className='form_title '>Log in</h2>
            <div className="input_field_container">
                <Input
                    register={register}
                    error={errors["username/email/phone"]}
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
                    required
                    type="password"
                    label="password"
                    value={password}
                    setValue={setPassword}
                    classLists=""
                />
            </div>
            <motion.button onClick={validateErrors} whileHover={{ scale: 1.02}} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-green-500 text-white hover:bg-green-600' type="submit" > Log In</motion.button>
        </form>
    )
}

export default Login
