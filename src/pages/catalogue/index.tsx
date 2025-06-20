import { useEffect, useState } from "react";
import { Product } from "@/api/models/products";
import Link from "next/link";

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("❌ API returned non-array data:", data);
          setProducts([]);
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-bold text-amber-900 mb-6">Katalogu i Produkteve</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id?.toString()}
            className="bg-amber-100 border border-amber-300 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/products/${product._id}`} className="block">
              {product.pictureUrl && (
                <img
                  src={product.pictureUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-amber-900">{product.name}</h2>
              <p className="text-amber-800 mt-1">{product.description}</p>
              <p className="text-amber-700 font-bold mt-2">{product.price} €</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
