// app/admin/products/page.tsx
import React from "react";
import Link from "next/link";
import { getAllProducts } from "@/sanity/helpers/queries";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menaxhimi i Produkteve</h1>
        <Link href="/admin/products/create">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            + Shto Produkt
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Nuk ka produkte për t'u shfaqur.</p>
      ) : (
        <ul>
          {products.map((product: any) => (
            <li key={product._id} className="border-b py-2 flex justify-between">
              <span>{product.name}</span>
              <span>${product.price?.toFixed(2) ?? "0.00"}</span>
              <Link href={`/admin/products/${product.slug?.current}/edit`}>
                <button className="text-blue-600 hover:underline">Edito</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
