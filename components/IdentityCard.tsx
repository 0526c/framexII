"use client";

import { motion } from "framer-motion";

interface IdentityCardProps {
  icon: string;
  name: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function IdentityCard({ 
  icon, 
  name, 
  description, 
  selected, 
  onClick 
}: IdentityCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative w-full p-5 rounded-xl border transition-all duration-300 text-left ${
        selected
          ? "bg-gold-dim border-gold shadow-lg shadow-gold-glow"
          : "bg-white/[0.03] border-border hover:border-gold/40"
      }`}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <motion.div 
          className="text-4xl"
          animate={selected ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <div>
          <h3 className={`font-medium mb-1 ${selected ? "text-gold" : "text-cream"}`}>
            {name}
          </h3>
          <p className="text-xs text-cream-dim leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {selected && (
        <motion.div
          className="absolute top-3 right-3 w-5 h-5 bg-gold rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <svg className="w-3 h-3 text-void" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </motion.div>
      )}

      <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
}
