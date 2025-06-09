import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/api/models/products";
import Button from "@/components/Shared/Button";

export default function EditProductPage() {
  const { id } = useRouter().query;
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      const res = await fetch(`/api/admin/products/${id}`);
      if (!res.ok) return;
      const data: Product = await res.json();

      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(data.price || 0);
      setPictureUrl(data.pictureUrl || "");
    }

    fetchProduct();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, pictureUrl }),
    });

    if (res.ok) {
      alert("Produkti u përditësua me sukses!");
      router.push("/admin");
    } else {
      alert("Dështoi përditësimi i produktit.");
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full p-8 bg-white shadow-xl rounded-lg border border-amber-200">
        <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">Përditëso Produktin</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-amber-800">Emri i Produktit</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-amber-100 border border-amber-500 text-amber-900 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-700"
              placeholder="Shembull: Komodinë"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">Përshkrimi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 bg-amber-100 border border-amber-500 text-amber-900 rounded resize-none focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-700"
              rows={4}
              placeholder="Shkruani përshkrimin e produktit..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">Çmimi (€)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-2 bg-amber-100 border border-amber-500 text-amber-900 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-700"
              placeholder="99.99"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">URL e Fotos</label>
            <input
              type="text"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              className="w-full px-4 py-2 bg-amber-100 border border-amber-500 text-amber-900 rounded focus:outline-none focus:ring-2 focus:ring-amber-600 placeholder:text-amber-700"
              placeholder="https://..."
            />
          </div>

          <div className="text-right">
            <Button
              text = "Ruaj ndryshimet"
              type="submit"
              onClick={() => {}}
              variant = "primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

