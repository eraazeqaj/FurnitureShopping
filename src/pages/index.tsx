import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <motion.section
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Mirë se vini në aplikacionin tonë të mobiljeve!
          </h1>
          <p className="text-xl mb-6">
            Zbuloni koleksionin tonë të mobiljeve elegante dhe moderne.
          </p>
          <Link
            href="/catalogue"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Shfleto Katalogun
          </Link>
        </motion.section>
      </div>
    </div>
  );
};