"use client"
import React, { useState } from 'react'
import Input from './Input'

const Signup = () => {
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleSignup = (e) => {
        e.preventDefault();
        console.log(e)
    }
    return (
        <form className='border-green-500 border-4 w-[500px] p-5 flex flex-col gap-5 rounded' onSubmit={handleSignup}>
            <h2 className='form_title '>Sign Up</h2>
            <div className="input_field_container">
                <Input required type="text" label="full name" value={fullName} setValue={setFullName} classLists="capitalize"/>
                <Input required type="email" label="email" value={email} setValue={setEmail} classLists=""/>
                <Input required type="text" label="username" value={username} setValue={setUsername} classLists=""/>
                <Input type="tel" label="phone" value={phone} setValue={setPhone} classLists=""/>
                <Input required type="password" label="password" value={password} setValue={setPassword} classLists=""/>
                <Input required type="password" label="confirm password" value={confirmPassword} setValue={setConfirmPassword} classLists=""/>
            </div>
            <button className='bg-green-500 text-white' type="submit" > Sign Up</button>
        </form>
    )
}

export default Signup
