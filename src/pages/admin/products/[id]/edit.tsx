import { GetServerSideProps } from "next";
import { ObjectId } from "mongodb";
import { useState } from "react";
import { useRouter } from "next/router";
import dbConnect from "@/lib/mongodb"; // This is a Promise<MongoClient>

type ProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  categoryId?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  const client = await dbConnect;
  const db = client.db(); 

  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id as string) });

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: {
        ...product,
        _id: product._id.toString(),
        price: Number(product.price),
      },
    },
  };
};

export default function EditProductPage({ product }: { product: ProductType }) {
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
    <div>
      <h1>Ndrysho Produktin</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Emri i produktit</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Përshkrimi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div>
          <label>Çmimi (€)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>URL e Fotos</label>
          <input
            name="pictureUrl"
            value={formData.pictureUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>ID e Kategorisë</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Ruaj Ndryshimet</button>
        </div>
      </form>
    </div>
  );
}