import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-amber-100 flex items-center justify-center px-6 pt-14">
      <motion.section
        className="w-full max-w-4xl py-20 bg-yellow-700 text-white-900 text-center rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-6">Rreth Nesh</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Ne jemi të përkushtuar për të ofruar mobilje elegante dhe moderne për
          çdo shtëpi dhe zyrë. Historia jonë filloi me një vizion për të sjellë
          stil dhe cilësi në çdo hapësirë.
        </p>
      </motion.section>
    </div>
  );
}

