"use client"
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function isAuthenticated(Component) {
    return function IsAuthenticated(props) {
        const { status: sessionStatus } = useSession();

        useEffect(() => {
            if (sessionStatus == "unauthenticated") {
                return redirect("/");
            }
        }, [sessionStatus]);

        if (sessionStatus == "unauthenticated") {
            return null;
        }

        if (sessionStatus == "loading") {
            return <h1>Loading... </h1>
        }

        return <Component {...props} />;
    };
}