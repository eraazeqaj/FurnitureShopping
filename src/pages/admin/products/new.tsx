import {useState} from "react";
import { useRouter } from "next/router";

export default function AddProductPage(){
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

    const handleSubmit = async(e: React.FormEvent) =>{
        e.preventDefault();
        const res = await fetch("/api/adminproducts",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify ({
                ...formData,
                price: parseFloat(formData.price),
            })
        })

     if(res.ok){
        router.push("/admin/products");
     } else{
        alert("Failed to create product");
     }
};

return(
  <div className="p-6 max-w-xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Shto Produkt te Ri</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
        name="name"
        placeholder="Emri i produktit"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Përshkrimi"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input 
        name="price"
          type="number"
          step="0.01"
          placeholder="Çmimi"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
       <input
          name="categoryId"
          placeholder="ID e kategorisë (opsionale)"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Shto Produktin
        </button>
      </form>
    </div>
  );
}




