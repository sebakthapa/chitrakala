"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingComponent from "./LoadingComponent";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function isAuthenticated(Component, { authenticateUserDetails }) {
    return function IsAuthenticated(props) {
        const router = useRouter();
        const {data:session, status: sessionStatus } = useSession();
        const user = useSelector(store => store.user)

        let authenticationStatus = "loading";
        const [authstatus, setAuthStatus] = useState("loading")

        useEffect(() => {
            if (authenticateUserDetails) {
                if (sessionStatus == "authenticated" && !user?.user._id) {
                    setAuthStatus("loadingUser")
                } else {
                    setAuthStatus(sessionStatus)
                }
            } else {
                setAuthStatus(sessionStatus)
            }
        }, [sessionStatus, user])


        if (authstatus == "unauthenticated") {
            toast.warn("You must be logged in to perform this action!")
            return router.replace("/")
        } else if (authstatus == "loading") {
            return <LoadingComponent  />
        } else if (authstatus == "loadingUser") {
            return <LoadingComponent message="Downloading User Data..." />
        } else {
            return <Component {...props} />;
        }
    };
}