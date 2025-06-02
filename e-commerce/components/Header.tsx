import { auth, currentUser } from "@clerk/nextjs/server";
import { getAllCategories } from "@/sanity/helpers/queries";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  const categories = await getAllCategories(3);

  // Zgjedh vetëm vlera primitive që i duhen HeaderClient
  const userInfo = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress,
      }
    : null;

  return <HeaderClient user={userInfo} categories={categories} />;
};

export default Header;
