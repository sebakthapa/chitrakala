"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input/Input';
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { app } from '@/lib/firebase';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import UploadImage from './Input/UploadImage';
import { addUserData } from '@/redux/features/userSlice';
import { BiQuestionMark } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';
import isAuthenticated from './isAuthenticated';



const UpdateDetails = ({ title, subtitle, form }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams();
    const { data: session, status: sessionStatus, update: updateSession } = useSession()
    const user = useSelector(state => state.user)

    const { register, handleSubmit, watch, clearErrors, setError, setValue, formState: { errors } } = useForm();


    //for password form type
    const [currentPassword, setCurrentPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")



    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.user?.email || "");
    const [username, setUsername] = useState(user?.user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [phone, setPhone] = useState(user?.user?.phone || "");
    const [dob, setDob] = useState(user?.dob?.split("T")[0] || "");
    //address states
    const [address, setAddress] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [dragging, setDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(user?.photo || null);
    const [dataModified, setDataModified] = useState(false);

    let uploadedImage = null;

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        uploadedImage = null;

        if (!session?.user.id) {
            toast.error("Login to update details.");
            router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
            return;
        }
        if (!user?.user._id) {
            toast.error("wait a few seconds or reload and try again.");
            router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
            return;
        }

        try {
            let res;
            const data = {};

            if (username && username != user?.user.username) data.username = username;
            if (phone != user?.user.phone) data.phone = phone;


            if (bio != user?.bio) data.bio = bio;
            if (name != user?.name) data.name = name;
            if (dob != user?.dob) data.dob = dob;
            if (address != user?.address) data.address = address;

            // userDetailsData
            if (imageUrl != user?.image) {
                const imageData = await handleFileUpload();
                if (imageData) {
                    uploadedImage = imageData?.storageRef;
                    data.image = imageData.downloadURL;
                } else {
                    toast("unable to upload image at the moment.")
                }
            } else {
            }

            if (Object.keys(data).length > 0) {
                res = await axios.patch(`/api/userdetails/${session?.user.id}`, data);
                if (res?.status == 200) {
                    res?.data && dispatch(addUserData(res?.data));
                    router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
                    toast("Details updated successfully")
                    await updateSession();
                } else {
                    await deleteObject(storageRef);
                }
            } else {
                toast("No changes made to update!")
                router.push(searchParams.get("returnurl") ? searchParams.get("returnurl") : "/");
                return;
            }

        } catch (error) {
            uploadedImage && await deleteObject(uploadedImage);
            uploadedImage = null;
            if (error?.response?.data?.field) {
                const { field, message } = error?.response?.data;
                if (field == "multiple") {
                    toast.error(`Unable to proceed! ${message}`);
                } else {
                    setError(field, { message })
                }
            } else {
                if (error?.response?.data?.field) {
                    const { field, message } = error?.response?.data;
                    if (field == "multiple") {
                        toast.error(`Unable to Update! ${message}`)
                    } else {
                        setError(field, { message })
                    }
                } else {
                    throw error
                }
                throw error;
            }

        } finally {
            setIsSubmitting(false)
        }
    }


    const handleFileUpload = async () => {
        if (!session?.user.id) {
            toast("Please login to add details")
            return;
        };
        if (image) {
            try {
                const storage = getStorage(app);
                var today = new Date();
                const storageRef = ref(storage, `gallery/${today}.png`);
                await uploadBytes(storageRef, image);

                // Get the download URL of the uploaded image
                const downloadURL = await getDownloadURL(storageRef);
                return { downloadURL, storageRef };

                // You can now save the downloadURL to your database or use it in your application as needed
            } catch (error) {
                setLoading(false);

            }
        }
    };

    const handleSkip = () => {
        const returnUrl = searchParams.get("returnUrl")
        returnUrl ? router.push(returnUrl) : router.push("/")
    }



    useEffect(() => {
        if (user?.user?._id && !dataModified) {
            const { name, user: userData, bio, image, dob, address } = user;
            const { email, phone, username } = userData;
            setName(name || "")
            setBio(bio || "")
            setImageUrl(image || null)
            setEmail(email || "")
            setPhone(phone || "")
            setUsername(username || "")
            setDob(dob?.split("T")[0] || "");
            setAddress(address || "")
        }
    }, [user])


    

    if (form == "password") {
        const handlePasswordChangeClick = async (data) => {
            setIsSubmitting(true)
            try {
                const res = await axios.patch(`/api/users/changepassword`, { userId: session?.user.id, currentPassword, newPassword, confirmNewPassword });
                if (res.status == 200) {
                    toast.success("Password Changed successfully!");
                    const res = await signOut({ redirect: "/auth/login" });
                    if (res) {
                        router.push("/auth/login")
                        dispatch(clearUserData());
                    }
                }
            } catch (error) {
                if (error?.response?.data?.field) {
                    const { field, message } = error?.response?.data;
                    if (field == "multiple") {
                        toast.error(`Unable to proceed! ${message}`)
                    } else {
                        setError(field, { message })
                    }
                } else {
                    throw error
                }
            } finally {
                setCurrentPassword("")
                setNewPassword("")
                setConfirmNewPassword("")
                setIsSubmitting(false)
            }
        }

        return (
            <motion.div className={`${isSubmitting && "pointer-events-none"} w-full max-w-[500px] m-auto font-serif border- p-2 xs:p-5 mt-10 rounded-lg`
            }
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <form action="" onSubmit={handleSubmit(handlePasswordChangeClick)} className=''>
                    <motion.h1
                        className="text-2xl font-bold xxs:text-3xl xs:text-4xl xxs:font-semibold text-gray-700"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        {title}
                    </motion.h1>
                    <div className="input_field_container flex flex-col gap-20 ">
                        <Input
                            value={user?.user.email}
                            type={"email"}
                            hidden
                            autoComplete="off"
                        />
                        <Input
                            value={user?.user.username}
                            type={"text"}
                            hidden
                            autoComplete="off"
                        />
                        <Input
                            required
                            register={register}
                            validation={{
                                required: "This field is required",
                            }}
                            error={errors?.currentpassword}
                            type="password"
                            label="current password"
                            value={currentPassword}
                            setValue={setCurrentPassword}
                            classLists=""
                            autoComplete="current-password"
                            submitting={isSubmitting}

                        />
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
                            value={newPassword}
                            setValue={setNewPassword}
                            classLists=""
                            autoComplete="new-password"
                            submitting={isSubmitting}

                        />

                        <Input
                            required
                            register={register}
                            password={newPassword}
                            validation={{
                                validate: (fieldValue) => { return fieldValue === newPassword || "Password didn't match" },
                            }}
                            error={errors?.confirmnewpassword}
                            type="password"
                            label="confirm new password"
                            value={confirmNewPassword}
                            setValue={setConfirmNewPassword}
                            classLists=""
                            autoComplete="new-password"
                            submitting={isSubmitting}
                        />



                    </div>
                    <div className="buttons flex gap-7 mt-5">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-[#0276FF] text-white hover:bg-[#1C84FF] w-fit mt-5`}
                            type="submit" >
                            {
                                isSubmitting ? (
                                    "Submitting..."
                                ) : (
                                    "Submit"
                                )
                            }
                        </motion.button>
                        <motion.button
                            onClick={handleSkip}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-red-600 rounded text-white hover:bg-red-500 w-fit mt-5`}
                            title="Skip for now? You an always update your details later."
                        >
                            Skip Now
                        </motion.button>
                    </div>


                </form>
            </motion.div >
        )
    }


    return (
        <motion.div className='w-full aa max-w-[600px] border- m-auto mt- font-serif border- p-2 xs:p-5 mt-10  rounded-lg'
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
        >

            <form action="" onSubmit={handleSubmit(handleFormSubmit)} className=''>
                <motion.h1
                    className="text-2xl font-bold xxs:text-3xl xs:text-4xl xxs:font-semibold text-gray-700"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {title}
                </motion.h1>
                <motion.h5
                    className=' text-gray-500 text-sm italic mt-1 xxs:mt-2 xxs:text-base flex gap-2 items-center'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {subtitle}
                    <div className='block relative border-[1px] cursor-help border-gray-300 w-fit rounded-full'>
                        <a id="extra-message">
                            <BiQuestionMark className='' fill="#11111188" />
                        </a>
                        <Tooltip anchorSelect="#extra-message" place={"right"}>
                            Only fields you change will be updated.
                        </Tooltip>
                        {/* <p className="message absolute w-auto max-w-screen w-[300px] bg-red-500">Only fields you change will be updated.</p> */}
                    </div>
                </motion.h5>
                <div className="input_field_container flex flex-col gap-20 mt-20 xxs:mt-10">
                    <div className="input_row flex-col xs:flex-row items-center xs:gap-10  h-fit border-">

                        <div className='shrink-0 xs:scale-[0.85] -my-7 '>
                            <UploadImage
                                key={"profileImage"}
                                label={"your photo"}
                                type={"profile"}
                                placeholder={"About you (in short)..."}
                                setImage={setImage}
                                setImageUrl={setImageUrl}
                                imageUrl={imageUrl}
                                setDragging={setDragging}
                            />
                        </div>


                        <div className='flex flex-col xs:py-2 h-full xs:items-between gap-5 xs:gap-10 xs:mb-12 w-full'>
                            <Input
                                key={"fullname"}
                                label={"full name"}
                                type={"text"}
                                value={name}
                                setValue={setName}
                                register={register}
                                validation={{
                                    maxLength: { value: 30, message: "Can't exceed 30 characters" },
                                    minLength: { value: 3, message: "Min 3 characters required" },
                                }}
                                error={errors?.fullname}
                            />

                            <Input
                                key={"username"}
                                label={"username"}
                                type={"text"}
                                required
                                value={username}
                                setValue={setUsername}
                                register={register}
                                validation={{
                                    maxLength: { value: 30, message: "Enter less than 30 characters" },
                                    minLength: { value: 5, message: "Minimum 5 characters required" },
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9._]*$/,
                                        message: "Only letters, numbers, underscores, and periods."
                                    },
                                }}
                                error={errors?.username}
                                clearErrors={clearErrors}
                            />
                        </div>
                    </div>



                    {/* <Input
                    label={"email"}
                    type={"email"}
                    value={email}
                    setValue={setEmail}
                    register={register}
                    validation={{
                        maxLength: { value: 50, message: "Enter less than 50 characters" },
                        pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Enter a valid Email" },
                    }}
                    error={errors?.email}
                    clearErrors={clearErrors}
                /> */}

                    <Input
                        key={"phone"}
                        register={register}
                        validation={{
                            pattern: {
                                maxLength: { value: 10, message: "Enter 10 digit phone number." },
                                minLength: { value: 10, message: "Enter 10 digit phone number." },
                                value: /^\d{10}$/,
                                message: "Enter 10 digits phone number."
                            },
                        }}
                        error={errors?.phone}
                        clearErrors={clearErrors}
                        type="tel"
                        label="phone"
                        value={phone}
                        setValue={setPhone}
                        classLists=""

                    />

                    <Input
                        label={"bio"}
                        type={"textarea"}
                        placeholder={"About you (in short)..."}
                        value={bio}
                        setValue={setBio}
                    />

                    <Input
                        label={"date of birth"}
                        type={"date"}
                        value={dob}
                        setValue={setDob}
                    />

                    <Input
                        label={"address"}
                        type="text"
                        value={address}
                        setValue={setAddress}
                        classLists={"capitalize"}
                    />



                </div>
                <div className="buttons flex gap-7 mt-5">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-[#0276FF] text-white hover:bg-[#1C84FF] w-fit mt-5`}
                        type="submit" >
                        {
                            isSubmitting ? (
                                "Submitting..."
                            ) : (
                                "Submit"
                            )
                        }
                    </motion.button>
                    <motion.button
                        onClick={handleSkip}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className={`${isSubmitting || (errors?.email?.message || errors?.phone?.message || errors?.username?.message) && "pointer-events-none"} bg-red-600 rounded text-white hover:bg-red-500 w-fit mt-5`}
                        title="Skip for now? You an always update your details later."
                    >
                        Skip Now
                    </motion.button>
                </div>


            </form>
        </motion.div>
    )
}

export default isAuthenticated(UpdateDetails, { authenticateUserDetails: true })
