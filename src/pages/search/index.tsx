import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/api/models/products";


export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;

  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q || typeof q !== "string") return;

    setLoading(true);
    fetch(`/api/products/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6">
          Rezultatet për: “{q}”
        </h1>

        {loading ? (
          <p>Duke kërkuar...</p>
        ) : results.length === 0 ? (
          <p>Asnjë produkt nuk u gjet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((product) => (
              <div
                key={product._id?.toString()}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                {product.pictureUrl && (
                  <img
                    src={product.pictureUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="text-lg font-semibold text-amber-800">{product.name}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-amber-700 mt-2 font-bold">€{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
   
  );
}
