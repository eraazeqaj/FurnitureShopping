import React from "react";
import { motion } from "framer-motion";

interface Props {
  icon?: any;
  imageUrl?: string;
  title: string;
  description: string;
  price?: number;
}

const Card: React.FC<Props> = ({ icon: Icon, imageUrl, title, description, price }) => {
  return (
    <motion.div
      className="bg-amber-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      ) : Icon ? (
        <div className="flex items-center justify-center h-48">
          <Icon className="text-yellow-600 w-12 h-12" />
        </div>
      ) : null}

      <div className="p-6">
        <h3 className="text-2xl font-bold text-amber-900">{title}</h3>
        <p className="text-amber-800 mt-2">{description}</p>
        {price !== undefined && (
          <p className="mt-3 font-semibold text-lg text-amber-700">{price.toFixed(2)} €</p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
