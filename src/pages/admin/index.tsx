import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@/components/Shared/Button";
import { Product } from "@/api/models/products";

interface Order {
  _id: string;
  userId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    if (status === "authenticated" && !session?.user?.isAdmin) {
      router.push("/register");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.isAdmin) {
      fetchProducts();
      fetchOrders();
      fetchMessages();
    }
  }, [status, session]);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/admin/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching products");
    }
  }

  async function fetchOrders() {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching orders");
    }
  }

  async function fetchMessages() {
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching messages");
    }
  }

  async function handleDeleteProduct(id?: string) {
    if (!id) return;
    if (confirm("A jeni të sigurtë që doni ta fshini këtë produkt?")) {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert("Error deleting product");
      }
    }
  }

  async function updateOrderStatus(id: string, newStatus: string) {
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error updating order: ${errorData.message || res.statusText}`);
        return;
      }

      setOrders((prev) =>
        newStatus === "completed" || newStatus === "cancelled"
          ? prev.filter((o) => o._id !== id)
          : prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      );
    } 
    catch {
      alert("Something went wrong while updating order status.");
    }
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6 space-y-12">
      {/* Products Section */}
      <section>
        <h1 className="text-3xl font-bold text-amber-900 mb-6">Menaxho Produktet</h1>
        <Link href="/admin/products/new">
          <Button text="Shto produkt të ri" variant="primary" />
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {products.map((product) => (
            <div
              key={product._id?.toString()}
              className="bg-white border border-amber-300 shadow-sm p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-amber-900">{product.name}</h2>
              <p className="text-stone-700 mt-1">{product.description}</p>
              <p className="text-amber-800 font-bold mt-2">€{product.price}</p>
              <div className="mt-4 flex justify-between">
                <Link href={`/admin/products/${product._id}/edit`}>
                  <Button text="Përditëso" variant="tertiary" />
                </Link>
                <Button
                  text="Fshi"
                  onClick={() => handleDeleteProduct(product._id?.toString())}
                  variant="secondary"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section>
        <h1 className="text-3xl font-bold text-amber-900 mb-6">Menaxho Porositë</h1>
        {orders.length === 0 && (
          <p className="text-gray-600">Nuk ka porosi për të menaxhuar.</p>
        )}
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-amber-300 p-4 rounded mb-4 shadow"
          >
            <p className="text-amber-800"><strong>ID:</strong> {order._id}</p>
            <p className="text-amber-800"><strong>Status:</strong> {order.status}</p>
            <p className="text-amber-800"><strong>Totali:</strong> €{order.totalAmount.toFixed(2)}</p>
            <p className="text-amber-800"><strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => updateOrderStatus(order._id, "completed")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Përfundo
              </button>
              <button
                onClick={() => updateOrderStatus(order._id, "cancelled")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Anulo
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Contact Messages Section */}
      <section>
        <h1 className="text-3xl font-bold text-amber-900 mb-6">Mesazhet nga Kontakti</h1>
        {messages.length === 0 ? (
          <p className="text-amber-800">Nuk ka mesazhe për të shfaqur.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white border border-amber-300 p-4 rounded shadow"
              >
                <p className="text-amber-800"><strong>Emri:</strong> {msg.name}</p>
                <p className="text-amber-800"><strong>Email:</strong> {msg.email}</p>
                <p className="mt-2 text-amber-800"><strong>Mesazhi:</strong><br />{msg.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Dërguar më: {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
