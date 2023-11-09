import ChangePassword from '@/components/ChangePassword';
import UpdateDetails from '@/components/UpdateDetails';
import PersonalDetails from '@/components/profileSetup/PersonalDetails';
import Welcome from "@/components/profileSetup/Welcome";

export const metadata = {
    title: 'Profile setup - Chitrakala',
    description: 'Art marketplace and showcase.',
}

const Page = ({ searchParams }) => {
    const step = searchParams?.step;

    if (step == "welcome" || step == undefined) {
        return (
            <Welcome />
        )
    } else if (step == "personal-details") {
        return (
            <UpdateDetails />
        )
    } else if (step == "change-password") {
        return (
            <UpdateDetails title={"Change password"} form="password" />
        )
    }

    return (
        <div>
            This is profile setup page

        </div>
    )
}

export default Page
