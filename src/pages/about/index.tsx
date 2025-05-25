import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
        <motion.section
          className="w-full max-w-4xl py-20 bg-yellow-600 text-black text-center rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-xl">
            Ne jemi të përkushtuar të ofrojmë mobilje elegante dhe moderne për
            çdo shtëpi dhe zyrë. Historia jonë filloi me një vizion për të sjellë
            stil dhe cilësi në çdo hapësirë.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
