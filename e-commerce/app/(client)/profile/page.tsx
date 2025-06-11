import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const plainUser = {
    id: user.id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    username: user.username || "",
    emailAddresses: (user.emailAddresses ?? []).map(email => ({ emailAddress: email.emailAddress })),
    publicMetadata: user.publicMetadata ?? {},
  };

  return <ProfileClient user={plainUser} />;
};

export default ProfilePage;
