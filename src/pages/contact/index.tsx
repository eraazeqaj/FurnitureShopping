import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-amber-100 flex items-center justify-center px-6 pt-14">
      <motion.section
        className="w-full max-w-4xl py-20 bg-yellow-700 text-white-900 text-center rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-6">Na Kontaktoni</h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Keni pyetje ose dëshironi të dini më shumë? Na dërgoni mesazh dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left">
          <label className="block mb-2 font-semibold text-white-900" htmlFor="name">
            Emri:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 mb-4 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-white bg-yellow-600 placeholder:text-white"
            placeholder="Shkruani emrin tuaj"
            required
          />

          <label className="block mb-2 font-semibold text-white-900" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 mb-4 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-white bg-yellow-600 placeholder:text-white"
            placeholder="Shkruani email-in tuaj"
            required
          />

          <label className="block mb-2 font-semibold text-white-900" htmlFor="message">
            Mesazhi:
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 mb-6 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-yellow-600 text-white placeholder:text-white"
            placeholder="Shkruani mesazhin tuaj"
            required
          />

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-yellow-900 text-white px-6 py-3 rounded hover:bg-yellow-800 transition disabled:opacity-50"
          >
            {status === "sending" ? "Duke dërguar..." : "Dërgo"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-green-200">Mesazhi u dërgua me sukses!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-200">Ndodhi një gabim. Ju lutem provoni sërish.</p>
          )}
        </form>
      </motion.section>
    </div>
  );
}
