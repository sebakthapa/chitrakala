"use client"
import Input from './Input'
import { useState } from 'react'
import { motion } from 'framer-motion'

const Login = () => {
    const [loginId, setLoginId] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
    }
    return (
        <form className='border-green-500 border-4 w-[500px] p-5 flex flex-col gap-5 rounded' onSubmit={handleLogin}>
            <h2 className='form_title '>Log in</h2>
            <div className="input_field_container">
                <Input required type="text" label="username/email/phone" value={loginId} setValue={setLoginId} classLists="" />
                <Input required type="password" label="password" value={password} setValue={setPassword} classLists="" />
            </div>
            <motion.button whileHover={{ scale: 1.02}} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className='bg-green-500 text-white hover:bg-green-600' type="submit" > Log In</motion.button>
        </form>
    )
}

export default Login
