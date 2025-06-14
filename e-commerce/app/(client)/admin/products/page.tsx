import Link from "next/link";

export default function AdminProductsPage() {
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

      {/* Më vonë: Lista e produkteve */}
      <p className="text-gray-500">Lista e produkteve do të shfaqet këtu.</p>
    </div>
  );
}