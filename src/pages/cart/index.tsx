import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/api/models/products";
import Link from "next/link";

interface CartItem {
  _id?: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export default function CartPage() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, [session?.user?.id]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  return (
   
      <div className="max-w-4xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-amber-900 mb-6">Shporta</h1>

        {loading ? (
          <p>Duke ngarkuar...</p>
        ) : cartItems.length === 0 ? (
          <p>Shporta është bosh.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-amber-100 p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  {item.product?.pictureUrl && (
                    <img src={item.product.pictureUrl} alt={item.product.name} className="w-20 h-20 rounded object-cover" />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-amber-900">{item.product?.name}</h2>
                    <p className="text-sm text-gray-700">Sasia: {item.quantity}</p>
                    <p className="text-sm text-amber-800">Çmimi: €{item.product?.price}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-amber-700">€{item.product?.price! * item.quantity}</p>
              </div>
            ))}

            <div className="text-right mt-8">
              <p className="text-xl font-semibold text-amber-800">Totali: €{totalPrice.toFixed(2)}</p>
              <button
                className="mt-4 bg-amber-900 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
                onClick={() => alert("Porosia do implementohet")}
              >
                Porosit tani
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/catalogue" className="text-amber-700 underline text-sm">Vazhdo me blerjet</Link>
        </div>
      </div>
   
  );
}
