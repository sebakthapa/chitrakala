"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input';
import { motion } from 'framer-motion';
import { useForm } from "react-hook-form";
import axios from 'axios';

const Signup = () => {
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [usernameFetchStatus, setUsernameFetchStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();

    const handleSignup = async ({ username, email, password, fullname, mobilenumber, }) => {
        // function is run only if there are no errors
        // watch can be used to update state(errors) onchange
        if (usernameFetchStatus === "available") {
            setIsSubmitting(true)
            const data = {
                username, email, password
            }
            console.log(data)

            mobilenumber && (data.phone = mobilenumber);
            fullname && (data.displayName = fullname);

            const res = await axios.post("/api/users/buyer", data);
            if (res.status == 200) {
                const userData = res.data
                console.log(userData);
                setUsernameFetchStatus("notAvailable")
            }
            setIsSubmitting(false)

        }
    }

    const handleUsernameAvailavility = async (inputValue) => {
        setUsernameFetchStatus("");

        if (!/^[a-zA-Z].*$/.test(inputValue)) {
            setUsernameFetchStatus("");
            setError("username", { message: "Username must start with letter" });
            return null;
        }

        if (inputValue == "") {
            setUsernameFetchStatus("");
            setError("username", { message: "This field is required" })
            return null;
        }

        if (inputValue.length < 5) {
            setUsernameFetchStatus("");
            setError("username", { message: "Enter 5 or more characters" });
            return null;
        }

        if (inputValue.length > 30) {
            setUsernameFetchStatus("");
            setError("username", { message: "Mustn't exceed 30 characters" });
            return null;
        }

        if (!/^[a-zA-Z0-9_]*$/.test(inputValue)) {
            setUsernameFetchStatus("");
            setError("username", { message: "Only alphanumeric characters and _ allowed" });
            return null;
        }

        setError("username", "")

        setUsernameFetchStatus("loading");
        try {
            const res = await axios.get(`/api/users/buyer/username/${inputValue}`);
            const message = res.data.message;
            if (message == "available") {
                setUsernameFetchStatus("available")
            } else {
                setUsernameFetchStatus("notAvailable")
            }
        } catch (error) {
            console.log(error)
        }
    }








    return (
        <form className='sm:border-green-500 sm:border-4 sm:p-10   mt-5 flex flex-col w-full gap-5 sm:w-[500px] rounded' onSubmit={handleSubmit(handleSignup)}>
            <h2 className='form_title'>Sign Up</h2>
            <div className="input_field_container">
                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 30, message: "Can't exceed 30 characters" },
                        minLength: { value: 3, message: "Min 3 characters required" },
                        required: "This field is required",
                    }}
                    error={errors?.fullname}
                    type="text"
                    label="full name"
                    value={fullName}
                    setValue={setFullName}
                    classLists="capitalize"
                />

                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                        required: "This field is required",
                        pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Enter a valid Email" },
                    }}
                    error={errors?.email}
                    type="email"
                    label="email"
                    value={email}
                    setValue={setEmail}
                    classLists=""
                />

                <Input
                    required
                    register={register}
                    validation={{
                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                        minLength: { value: 3, message: "Minimum 3 characters required" },
                        required: "This field is required",
                        pattern: {
                            value: /^[a-zA-Z][a-zA-Z0-9._]*$/,
                            message: "Only letters, numbers, underscores, and periods."
                        },
                    }}
                    error={errors?.username}
                    type="text"
                    label="username"
                    value={username}
                    customValidation={handleUsernameAvailavility}
                    setValue={setUsername}
                    classLists=""
                    availabilityState={usernameFetchStatus}
                />

                <Input
                    register={register}
                    type="tel"
                    label="mobile number"
                    value={phone}
                    setValue={setPhone}
                    classLists=""
                />

                <Input
                    required
                    register={register}
                    validation={{
                        required: "This field is required",
                        minLength: { value: 6, message: "Enter 6 characters or more" },
                        pattern: { value: /(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))((?=.*\W)|(?=.*_))^[^ ]+$/, message: "Password must contain letter, symbol & digit" },
                    }}
                    error={errors?.password}
                    type="password"
                    label="password"
                    value={password}
                    setValue={setPassword}
                    classLists=""
                />

                <Input
                    required
                    register={register}
                    password={password}
                    validation={{
                        validate: (fieldValue) => { return fieldValue === password || "Password didn't match" },
                    }}
                    error={errors?.confirmpassword}
                    type="password"
                    label="confirm password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    classLists=""
                />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className={`${isSubmitting && "pointer-events-none"} bg-green-500 text-white hover:bg-green-600`} type="submit" >
                {
                    isSubmitting ? (
                        "Signing up..."
                    ): (
                            "Sign Up"
                        )
                }
            </motion.button>
        </form>
    )
}

export default Signup
