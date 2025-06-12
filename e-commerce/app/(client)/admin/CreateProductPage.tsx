"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");
  const [intro, setIntro] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number | "">("");
  const [status, setStatus] = useState("new");
  const [variant, setVariant] = useState("tshirt");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  function createSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (name.trim() === "" || price === "" || discount === "" || Number(price) <= 0) {
      alert("Ju lutem plotësoni fushat e detyrueshme dhe me vlera të sakta.");
      setLoading(false);
      return;
    }

    try {
      const slug = createSlug(name);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());
      formData.append("intro", intro);
      formData.append("description", description);
      formData.append("stock", stock.toString());
      formData.append("status", status);
      formData.append("variant", variant);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Gabim gjatë shtimit të produktit.");
      }

      alert("Produkti u shtua me sukses!");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Ndodhi një gabim gjatë shtimit të produktit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shto Produkt të Ri</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageFile(file);
          }}
          className="block border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Emri i produktit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          placeholder="Çmimi"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="border p-2 w-full"
          required
        />

        <input
          type="number"
          placeholder="Zbritja"
          value={discount}
          onChange={(e) => setDiscount(e.target.value === "" ? "" : Number(e.target.value))}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Përshkrimi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
          className="border p-2 w-full"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full">
          <option value="new">New</option>
          <option value="hot">Hot</option>
          <option value="sale">Sale</option>
        </select>

        <select value={variant} onChange={(e) => setVariant(e.target.value)} className="border p-2 w-full">
          <option value="tshirt">Tshirt</option>
          <option value="jacket">Jacket</option>
          <option value="pants">Pants</option>
          <option value="hoodie">Hoodie</option>
          <option value="short">Short</option>
          <option value="others">Others</option>
        </select>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Duke ruajtur..." : "Shto Produkt"}
        </button>
      </form>
    </div>
  );
}
