"use client"
import Input from '@/components/Input';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const Page = ({ searchParams }) => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { register, handleSubmit, watch, clearErrors, setError, setValue, formState: { errors } } = useForm();



    const handleClickSend = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        toast.info("Sending password reset link. This may take few seconds.")


        try {
            const res = await axios.post("/api/password-reset", { email });
            if (res.status == 200) {
                toast.success("Password reset email sent! Check your Mail.");
                router.replace("/auth/login");
            }
        } catch (error) {
            const status = error.response.status;
            const errorMessage = error?.response?.data?.error
            if (status == 400) {
                toast.error(errorMessage)
            } else {
                throw error;
            }
        } finally {
            setEmail("")
            setIsSubmitting(false)

        }


    }

    const handlePasswordReset = async (data) => {
        setIsSubmitting(true)

        try {

            const res = await axios.patch("/api/password-reset", { password, confirmPassword, email: searchParams?.email, token: searchParams?.token });


            if (res.status == 200) {
                toast.success("Password reset successfull.");
                router.replace("/auth/login")
            }


        } catch (err) {
            const { field, message, error: errorMessage } = err?.response?.data;
            if (err?.response?.data?.field) {
                if (field == "multiple") {
                    toast.error(`Unable to proceed! ${message}`)
                } else {
                    setError(field, { message })
                }
            } else {
                if (errorMessage) {
                    toast.error(errorMessage)

                } else {

                    throw err
                }
            }
        } finally {
            setPassword("");
            setConfirmPassword("")
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        const { token, email, st } = searchParams;
        if (st == "create-new-password") {
            if (!token || !email) {
                router.replace("/auth/login");
                toast.error("Invalid URL")
            }
        }
    }, [searchParams])

    if (searchParams?.st == "create-new-password") {


        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] ">
                <div className="center border-2 p-12 max-w-[550px] w-full rounded-lg">
                    <h4 className="text-4xl font-bold text-gray-700">Create New Password. </h4>
                    <h6 className="text-base text-gray-500 mt-2">Create and confirm your new password to continue.</h6>
                    <form className={`${isSubmitting && "pointer-events-none"}`} onSubmit={handleSubmit(handlePasswordReset)}>
                        <div className="input_field_container mt-10">
                            <Input
                                required
                                register={register}
                                validation={{
                                    required: "This field is required",
                                    minLength: { value: 6, message: "Enter 6 characters or more" },
                                    pattern: { value: /(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))((?=.*\W)|(?=.*_))^[^ ]+$/, message: "Password must contain letter, symbol & digit" },
                                }}
                                error={errors?.newpassword}
                                type="password"
                                label="new password"
                                value={password}
                                setValue={setPassword}
                                classLists=""
                                autoComplete="new-password"
                                submitting={isSubmitting}

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
                                autoComplete="new-password"
                                submitting={isSubmitting}

                            />
                        </div>
                        <div className="flex gap-5 mt-5">
                            <button type="submit" className='home bg-blue-500 text-gray-50 py-3 px-6 rounded font-semibold  hover:bg-blue-600 transition duration-300 active:scale-90'>{!isSubmitting ? "Submit" : "Submitting..."}</button>
                        </div>
                    </form>
                </div>

            </div >
        )
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] ">
            <div className="center border-2 p-12 max-w-[550px] w-full rounded-lg">
                <h4 className="text-[2.1rem] font-semibold text-gray-700">Forgot Password? </h4>
                <h6 className="text-base text-gray-500 mt-2">Enter your email to get a password reset link.</h6>
                <form className={`${isSubmitting && "pointer-events-none"}`} onSubmit={handleClickSend}>
                    <div className="input_field_container mt-10">
                        <input
                            required
                            type="email"
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-full  py-3 px-6 rounded border-2 border-gray-300 placeholder:font-light placeholder:text-gray-400"
                            autoComplete="off"
                        />
                    </div>
                    <div className="flex gap-5 mt-5">
                        <button type="submit" className='home bg-blue-500 text-gray-50 py-3 px-6 rounded font-semibold  hover:bg-blue-600 transition duration-300 active:scale-90'>{isSubmitting ? "Processing..." : "Get Link"}</button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default Page
