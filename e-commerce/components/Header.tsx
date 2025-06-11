import { auth, currentUser } from "@clerk/nextjs/server";
import { getAllCategories, getMyOrders } from "@/sanity/helpers/queries";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();

  const categories = await getAllCategories(3);

  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  const userInfo = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses?.[0]?.emailAddress,
      }
    : null;

  return (
    <HeaderClient
      user={userInfo}
      categories={categories}
      orders={orders}
    />
  );
};

export default Header;
