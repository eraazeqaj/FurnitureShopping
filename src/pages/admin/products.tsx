import {useEffect, useState} from "react";
import { getProducts } from "../../api/services/products";
import {Product} from "../../api/models/products";
import Link from "next/link";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);

     useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);

    return(
        <div className = "p-6">
            <h1 className="text-3xl font-bold mb-4">Menaxho Produktet</h1>
            
            <Link
                href="/admin/products/new"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6 inline-block"
                > Shto produkt të ri
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product)=>(
                    <div key = {product._id?.toString()} className = "border p-4 rounded">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-amber-800 font-bold">${product.price}</p>

                        <div className="mt-4 flex justify-between">
                            <Link
                                href = {`/admin/products/edit/${product._id}`}
                                className="text-blue-600 hover: underline"
                            > Ndrysho Produktin </Link>

                            <button
                                onClick={() => handleDelete(product._id?.toString())}
                                className="text-red-600 hover:underline"
                            >Delete</button>      
                    </div>

                    </div>

                ))}
            </div>

        </div>
    );  


    async function handleDelete(id: string | undefined){
        if(!id) return;
        if(confirm("A jeni të sigurtë që doni ta fshini këtë produkt?")){
            const res = await fetch (`/api/admin/products/${id}`,{
                method: "DELETE",
            });

            if (res.ok){
                setProducts(products.filter((p)=> p._id !== id))
            }

        }
    }

}