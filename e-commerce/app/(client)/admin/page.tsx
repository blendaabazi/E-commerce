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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menaxhimi i Produkteve dhe Përdoruesve</h1>
        <div>
          <button
            className={`px-4 py-2 rounded mr-2 ${
              view === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded mr-2 ${
              view === "contacts" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("contacts")}
          >
            Contacts
          </button>
          <button
            className={`px-4 py-2 rounded ${
              view === "products" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("products")}
          >
            Products
          </button>
        </div>
        {view === "products" && (
          <Link href="/admin/products/create">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              + Shto Produkt
            </button>
          </Link>
        )}
      </div>

      {view === "users" && users && <UserListClient initialUsers={users} />}
      {view === "contacts" && <ContactListClient />}
      {view === "products" && products && (
        <ProductListClient initialProducts={products} />
      )}
    </div>
  );
}
