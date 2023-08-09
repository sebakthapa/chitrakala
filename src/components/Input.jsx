"use client"
import { useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading } from "react-icons/ai"
import { TiTick } from "react-icons/ti"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { RxCross2 } from "react-icons/rx"

const Input = ({ availabilityState, label, type, value, setValue, classLists, required, register, validation, error, customValidation }) => {

    // password && console.log(label,validation)

    const [showPassword, setShowPassword] = useState(false)
    const id = label?.replaceAll(" ", "")
    return (
        <div className="fullName input_field">
            <label htmlFor={id}>{label && label} {required && <span className="text-red-500 -ml-1">*</span>}</label>
            <div className="relative w-full">

                <input {...register && { ...register(id, { ...validation, onChange: (e) => { setValue(e.target.value); customValidation && customValidation(e.target.value) }, value: value }) }} required={required} className={`${classLists} ${type == "password" ? "pr-[100px]" : ""} w-full`} type={showPassword ? "text" : type} id={id} />
                {
                    type === "password" && value && (
                        <span className="icon cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 opacity-50 hover:opacity-70 transition duration-300 " onClick={() => setShowPassword((prev) => !prev)}>
                            {
                                showPassword ? (
                                    <AiFillEye className="input_icon w-5 h-5" />
                                ) : (
                                    <AiFillEyeInvisible className="input_icon w-5 h-5 " />
                                )
                            }
                        </span>
                    )
                }
            </div>{
                error?.message ? (
                    <p className="text-red-500 text-sm">{error?.message}</p>
                ) : (
                    <p className="text-sm font-semibold text-yellow-500">
                    {availabilityState == "available" && (
                        <span className=' text-green-600 flex items-center '>
                            <MdOutlineVerifiedUser className="mr-2 h-4 w-4 text-green-600" />
                            <span className="text-green-600 ">Available</span>
                        </span>
                    )}
                    {availabilityState == "notAvailable" && (
                        <span className='text-red-500 flex items-center'>
                            <span className="text-red-500"> <RxCross2 className="mr-2 h-4 w-4 text-red-500" /> </span>
                            <span className="text-red-500">Not available</span>
                        </span>
                    )}
                    {availabilityState == "loading" && (
                        <span className='flex items-center font-medium'>
                            <AiOutlineLoading className='mr-2 inline-block animate-spin h-4 w-4 ' />
                            <span className="text-blue-500">Checking availability</span>
                        </span>
                    )}</p>
                )
            }

        </div>
    )
}

export default Input
