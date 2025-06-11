import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/Shared/Button";

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pictureUrl: "",
    price: "",
    categoryId: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // New handler for image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", "product_photos"); // Use your unsigned preset here

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dr1v46ym9/image/upload",
        {
          method: "POST",
          body: formDataImage,
        }
      );

      const data = await res.json();
      setFormData((prev) => ({ ...prev, pictureUrl: data.secure_url }));
    } catch (error) {
      alert("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
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
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full p-8 bg-white shadow-xl rounded-lg border border-amber-200">
        <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">
          Shto Produkt të Ri
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-amber-800">
              Emri i produktit
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 text-amber-900 rounded focus:outline-none focus:ring-2 focus:border-amber-400"
              placeholder="Shembull: Tavolinë druri"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">
              Përshkrimi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 text-amber-900 rounded resize-none focus:outline-none focus:ring-2 focus:border-amber-400"
              rows={4}
              placeholder="Shkruaj përshkrimin e produktit..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">
              Çmimi (€)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-amber-300 text-amber-900 rounded focus:outline-none focus:ring-2 focus:border-amber-400"
              placeholder="99.99"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">
              Foto e Produktit
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full px-4 py-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:border-amber-400"
            />

            {formData.pictureUrl && (
              <img
                src={formData.pictureUrl}
                alt="Preview"
                className="mt-2 w-40 h-40 object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-amber-800">
              ID e Kategorisë (opsionale)
            </label>
            <input
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-amber-300 text-amber-900 rounded focus:outline-none focus:ring-2 focus:border-amber-400"
              placeholder="ObjectId e kategorisë"
            />
          </div>

          <div className="text-right">
            <Button
              text={uploading ? "Uploading..." : "Shto produktin"}
              type="submit"
              disabled={uploading}
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
