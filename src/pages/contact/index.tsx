import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
        <motion.section
          className="w-full max-w-4xl py-20 bg-yellow-600 text-black text-center rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Na Kontaktoni</h1>
          <p className="text-xl mb-6">
            Keni pyetje ose dëshironi të dini më shumë? Na dërgoni mesazh dhe do t'ju përgjigjemi sa më shpejt të jetë e mundur.
          </p>
          <form className="max-w-md mx-auto text-left">
            <label className="block mb-2 font-semibold" htmlFor="name">
              Emri:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 mb-4 rounded border border-gray-300"
              placeholder="Shkruani emrin tuaj"
            />
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mb-4 rounded border border-gray-300"
              placeholder="Shkruani email-in tuaj"
            />
            <label className="block mb-2 font-semibold" htmlFor="message">
              Mesazhi:
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full p-2 mb-4 rounded border border-gray-300"
              placeholder="Shkruani mesazhin tuaj"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Dërgo
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
