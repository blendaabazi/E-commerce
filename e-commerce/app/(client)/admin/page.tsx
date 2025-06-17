"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import NotAuthorized from "../not-authorized";
import UserListClient from "./UserListClient";
import ProductListClient from "./products/ProductListClient";
import ContactListClient from "./contact/ContactListClient";

export default function AdminProductsPage() {
  const { user, isLoaded } = useUser();
  const [view, setView] = useState("products");
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    const role = user.publicMetadata?.role;
    if (role !== "admin") {
      setLoadingData(false);
      return;
    }

    async function fetchData() {
      try {
        const [prodRes, usersRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/users"),
        ]);

        const prodData = await prodRes.json();
        const usersData = await usersRes.json();

        setProducts(prodData.data);
        setUsers(usersData.data);
      } catch (e) {
        console.error("Gabim gjatë marrjes së të dhënave", e);
      }
      setLoadingData(false);
    }

    fetchData();
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading user...</div>;
  if (!user) return null;
  if (user.publicMetadata?.role !== "admin") return <NotAuthorized />;
  if (loadingData) return <div>Loading data...</div>;

  // Sidebar menu items
  const menuItems = [
    { key: "products", label: "Products" },
    { key: "users", label: "Users" },
    { key: "contacts", label: "Contacts" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Manage</h2>
        <nav className="flex flex-col space-y-3">
          {menuItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                view === key
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-200 hover:text-blue-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {view === "products" && (
          <Link
            href="/admin/products/create"
            className="mt-auto block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-center"
          >
            + Shto Produkt
          </Link>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {view}
        </h1>

        <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
          {view === "users" && users && <UserListClient initialUsers={users} />}
          {view === "contacts" && <ContactListClient />}
         {view === "products" && products && (
  <div>
 <Link
  href="/admin/products/create"
  className="mt-2 block w-40 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-center mb-4"
>
  + Shto Produkt
</Link>



    <ProductListClient initialProducts={products} />
  </div>
)}

        </div>
      </main>
    </div>
  );
}
