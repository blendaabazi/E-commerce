'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  intro?: string;
  description?: string;
  stock?: number;
  status?: string;
  variant?: string;
  slug?: { current: string };
  image?: { asset: { _ref: string } };
}

export default function ProductListClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});
  const router = useRouter();

  // Fshi produktin
  const deleteProduct = async (productId: string) => {
    const confirmed = confirm('A jeni të sigurt që dëshironi ta fshini këtë produkt?');
    if (!confirmed) return;

    setLoadingId(productId);

    const res = await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      setProducts(products.filter((p) => p._id !== productId));
    } else {
      alert('Fshirja dështoi.');
      router.refresh();
    }

    setLoadingId(null);
  };

  // Fillon editimin - vendos të dhënat në formë
  const startEditing = (product: Product) => {
    setEditingId(product._id);
    setEditFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  // Ndryshon fushat e formës
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  // Ruaj ndryshimet në backend
const saveEdit = async () => {
  if (!editingId) return;

  setLoadingId(editingId);

  const res = await fetch(`/api/products/${editingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editFormData),
  });

  if (res.ok) {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === editingId ? { ...p, ...editFormData } as Product : p
      )
    );
    setEditingId(null);
    setEditFormData({});
      router.refresh(); // shto këtë

  } else {
    alert('Ndryshimet nuk u ruajtën.');
  }

  setLoadingId(null);
};

  // Anulo editimin
  const cancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  return (
    <ul className="space-y-4">
      {products.map((p) => (
        <li
          key={p._id}
          className="p-4 border rounded shadow flex justify-between items-center"
        >
          {editingId === p._id ? (
            // Forma e editimit
            <div className="flex flex-col space-y-2 w-full">
              <input
                type="text"
                name="name"
                value={editFormData.name || ''}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Emri"
              />
              <input
                type="number"
                name="price"
                value={editFormData.price ?? ''}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Cmimi"
              />
              <input
                type="number"
                name="stock"
                value={editFormData.stock ?? ''}
                onChange={handleChange}
                className="border p-1 rounded"
                placeholder="Stoku"
              />
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loadingId === editingId}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loadingId === editingId ? 'Duke ruajtur...' : 'Ruaj'}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Anulo
                </button>
              </div>
            </div>
          ) : (
            // Shfaqja normale e produktit me butonat
            <>
              <div>
                <p><strong>Emri:</strong> {p.name}</p>
                <p><strong>Cmimi:</strong> {p.price} EUR</p>
                <p><strong>Stoku:</strong> {p.stock ?? 0}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(p)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p._id)}
                  disabled={loadingId === p._id}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loadingId === p._id ? 'Duke fshirë...' : 'Fshi'}
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
