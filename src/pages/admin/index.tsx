import {useEffect, useState} from "react";
import { getProducts } from "../../api/services/products";
import {Product} from "../../api/models/products";
import Link from "next/link";
import Button from "@/components/Shared/Button"

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
        <div className = "min-h-screen bg-amber-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-amber-900">Menaxho Produktet</h1>
            
            <Link href="/admin/products/new">
                <Button
                    text = "Shto produkt të ri"
                    onClick={()=>{}}
                    variant="primary"
                /> 
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {products.map((product)=>(
                    <div key = {product._id?.toString()} className = "bg-white border border-amber-300 shadow-sm p-4 rounded-lg">
                        <h2 className="text-xl fobt-semibold text-amber-900">{product.name}</h2>
                        <p className="text-stone-700 mt-1">{product.description}</p>
                        <p className="text-amber-800 font-bold mt-2">${product.price}</p>

                        <div className="mt-4 flex justify-between">
                        <Link href={`/admin/products/${product._id}/edit`}>
                            <Button
                            text = "Përditëso produktin"
                            onClick={() => {}}
                            variant = "tertiary"
                            /> 
                        </Link>



                        <Button
                            text = "Fshi produktin"
                            onClick={() => handleDelete(product._id?.toString())}
                            variant="secondary"
                        />         
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