import { GetServerSideProps } from "next";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "@/lib/mongodb"; // This is a Promise<MongoClient>
import { Product } from "@/api/models/products";


export const getServerSideProps: GetServerSideProps<{ product: Product }> = async (context) => {
  const { id } = context.params!;

  const client = await dbConnect;
  const db = client.db();

  const productFromDb = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id as string) });

  if (!productFromDb) {
    return { notFound: true };
  }

  const product: Product = {
    ...productFromDb,
    _id: productFromDb._id.toString(),
    price: Number(productFromDb.price),
  };

  return {
    props: {
      product,
    },
  };
};

export default function EditProductPage({ product }: { product: Product }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price.toString(),
    pictureUrl: product.pictureUrl,
    categoryId: product.categoryId || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ndrysho Produktin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Emri i produktit</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Përshkrimi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Çmimi (€)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">URL e Fotos</label>
          <input
            name="pictureUrl"
            value={formData.pictureUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">ID e Kategorisë</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Ruaj Ndryshimet
        </button>
      </form>
    </div>
  );
}


