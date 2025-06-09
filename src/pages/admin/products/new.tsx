import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pictureUrl: "",
    price: "",
    categoryId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Shto Produkt të Ri</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Emri i produktit</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Shembull: Tavolinë druri"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Përshkrimi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring focus:border-blue-400"
            rows={4}
            placeholder="Shkruaj përshkrimin e produktit..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Çmimi (€)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="99.99"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">URL e Fotos</label>
          <input
            name="pictureUrl"
            value={formData.pictureUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">ID e Kategorisë (opsionale)</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
            placeholder="ObjectId e kategorisë"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Shto Produktin
          </button>
        </div>
      </form>
    </div>
  );
}
