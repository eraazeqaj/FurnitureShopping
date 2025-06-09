import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/api/models/products";

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
      alert("Product updated successfully!");
      router.push("/admin");
    } else {
      alert("Failed to update product.");
    }
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label>Photo URL</label>
          <input
            type="text"
            value={pictureUrl}
            onChange={(e) => setPictureUrl(e.target.value)}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
