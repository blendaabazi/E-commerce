// // app/admin/products/AdminProductsClient.tsx (Client Component)
// "use client";

// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import NotAuthorized from "../../not-authorized";
// import UserListClient from "./UserListClient";
// import ProductListClient from "./products/ProductListClient";

// export default function AdminProductsClient({ initialProducts, initialUsers }) {
//   const { user, isLoaded } = useUser();
//   const [view, setView] = useState("products");

//   if (!isLoaded) return <div>Loading user...</div>;

//   if (!user) {
//     // Redirect client-side (ose mund të përdorësh middleware në server)
//     if (typeof window !== "undefined") window.location.href = "/sign-in";
//     return null;
//   }

//   if (user.publicMetadata?.role !== "admin") return <NotAuthorized />;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Menaxhimi i Produkteve dhe Përdoruesve</h1>
//         <div>
//           <button
//             className={`px-4 py-2 rounded mr-2 ${
//               view === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setView("users")}
//           >
//             Users
//           </button>
//           <button
//             className={`px-4 py-2 rounded ${
//               view === "products" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setView("products")}
//           >
//             Products
//           </button>
//         </div>
//         {view === "products" && (
//           <Link href="/admin/products/create">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
//               + Shto Produkt
//             </button>
//           </Link>
//         )}
//       </div>

//       {view === "users" && <UserListClient initialUsers={initialUsers} />}
//       {view === "products" && <ProductListClient initialProducts={initialProducts} />}
//     </div>
//   );
// }
