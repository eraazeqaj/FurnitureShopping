import { motion } from "framer-motion";
import cs from "classnames";
import React from "react";

interface Props {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  type?: "button" | "submit" | "reset";
}


const Button = ({text, onClick, variant = "primary", type = "button"} : Props) => {

  const buttonStyles ={

    primary: "bg-amber-900 hover:bg-amber-700 text-white",
    secondary: "bg-amber-800 hover:bg-amber-700 text-white",
    tertiary: "bg-amber-600 hover:bg-amber-500 text-white-800", 
    quaternary: "bg-amber-300 hover:bg-amber-400 text-white-800",

  };
        
  return (

    <motion.button
      type={type}
      className={cs(
        "px-6 py-3 rounded-full font-medium transition-all duration-200",
        buttonStyles[variant]
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  );
};

export default Button;