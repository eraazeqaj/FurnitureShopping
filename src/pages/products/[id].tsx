import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import {Product} from "@/api/models/products";

export default function ProductDetailsPage(){
    const router = useRouter();
    const {id} = router.query;

    const[product, setProduct] = useState<Product | null>(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!id || typeof id !== "string") return;

        fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .finally(()=> setLoading(false));
    }, [id]);

    if(loading) return <div className="p-8">Loading...</div>;
    if(!product) return <div className="p-8">Product not found</div>;

    return(
       <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.pictureUrl}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-amber-700 mb-6">€{product.price}</p>

          <button
            className="bg-amber-900 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
            onClick={() => alert("Add to cart coming soon!")}
          >
            Shto në shportë
          </button>
        </div>
      </div> 
    )
}