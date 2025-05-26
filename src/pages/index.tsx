import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Shared/Button"; 

export default function Home() {
  return (
    <div className="min-h-screen">
      <motion.section
        className="flex flex-col items-center justify-center h-screen bg-amber-200 text-gray-900 text-center px-4"
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
        <Link href="/catalogue">
          <Button text="Shfleto Katalogun" onClick={() => {}} variant="primary" type="button" />
        </Link>
      </motion.section>
    </div>
  );
}
