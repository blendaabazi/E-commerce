// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import NotAuthorized from "../not-authorized";

// async function getUsers() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
//   next: { revalidate: 60 },
// });


//   if (!res.ok) {
//     throw new Error("Failed to fetch users");
//   }

//   return res.json();
// }

// const AdminPage = async () => {
//   const user = await currentUser();

//   if (!user) {
//     redirect("/sign-in");
//   }

//   const role = user.publicMetadata?.role;
//   if (role !== "admin") return <NotAuthorized />;

//   const users = await getUsers();

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
//       <h2 className="text-xl font-semibold mb-2">Lista e Përdoruesve</h2>
//       <ul className="space-y-2">
//       {users.data.map((u: any) => (

//           <li key={u.id} className="p-4 border rounded shadow-sm">
//             <p><strong>ID:</strong> {u.id}</p>
//             <p><strong>Email:</strong> {u.emailAddresses[0]?.emailAddress}</p>
//             <p><strong>Emri:</strong> {u.firstName} {u.lastName}</p>
//             <p><strong>Roli:</strong> {u.publicMetadata?.role ?? "user"}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminPage;
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NotAuthorized from "../not-authorized";
import UserListClient from "./UserListClient";

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

const AdminPage = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const role = user.publicMetadata?.role;
  if (role !== "admin") return <NotAuthorized />;

  const users = await getUsers();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <h2 className="text-xl font-semibold mb-2">Lista e Përdoruesve</h2>
      <UserListClient initialUsers={users.data} />
    </div>
  );
};

export default AdminPage;
