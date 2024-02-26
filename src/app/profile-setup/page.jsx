import UpdateDetails from "@/components/profileSetup/UpdateDetails";
import Welcome from "@/components/profileSetup/Welcome";

export const metadata = {
  title: "Profile setup - Chitrakala",
  description: "Art marketplace and showcase.",
};

const Page = ({ searchParams }) => {
  const step = searchParams?.step;

  if (step == "welcome" || step == undefined) {
    return <Welcome />;
  } else if (step == "personal-details") {
    return (
      <UpdateDetails
        title="Update your Profile"
        subtitle="Fill these details so that your viewer can know more about you."
      />
    );
  } else if (step == "change-password") {
    return <UpdateDetails title={"Change password"} form="password" />;
  }

  return <div>This is profile setup page</div>;
};

export default Page;
