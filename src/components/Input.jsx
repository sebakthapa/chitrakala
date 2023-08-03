"use client"
import { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

const Input = ({ label, type, value, setValue, classLists, required }) => {
    const [showPassword, setShowPassword] = useState(false)
    const id = label?.replaceAll(" ", "")
    return (
        <div className="fullName input_field">
            <label htmlFor={id}>{label && label} { required && <span className="text-red-500 -ml-1">*</span> }</label>
            <div className="relative w-full">

                <input required={required} className={`${classLists} ${type == "password" ? "pr-[100px]" : ""} w-full`} value={value} onChange={(e) => setValue(e.target.value)} type={showPassword ? "text" : type} id={id} />
                {
                    type === "password" && (
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
            </div>
        </div>
    )
}

export default Input
