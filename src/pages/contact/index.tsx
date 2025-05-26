import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
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

        <form className="max-w-md mx-auto text-left">
          <label className="block mb-2 font-semibold text-white-900" htmlFor="name">
            Emri:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 mb-4 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-white"
            placeholder="Shkruani emrin tuaj"
          />

          <label className="block mb-2 font-semibold text-white-900" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 mb-4 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 text-white"
            placeholder="Shkruani email-in tuaj"
          />

          <label className="block mb-2 font-semibold text-white-900" htmlFor="message">
            Mesazhi:
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full p-3 mb-6 rounded border border-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="Shkruani mesazhin tuaj"
          />

          <button
            type="submit"
            className="bg-yellow-900 text-white px-6 py-3 rounded hover:bg-yellow-800 transition"
          >
            Dërgo
          </button>
        </form>
      </motion.section>
    </div>
  );
}

