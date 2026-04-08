"use client";

import { motion } from "framer-motion";

interface ConfigChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function ConfigChip({ label, selected, onClick }: ConfigChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        selected
          ? "bg-gold text-void shadow-lg shadow-gold-glow"
          : "bg-white/5 text-cream-dim border border-white/10 hover:border-gold/40 hover:text-cream"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

interface ConfigSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ConfigSection({ title, subtitle, children }: ConfigSectionProps) {
  return (
    <div className="p-5 rounded-xl border border-border bg-gradient-to-b from-white/[0.03] to-transparent">
      <div className="mb-4">
        <h3 className="text-xs font-medium text-gold tracking-wider uppercase">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-cream-dim mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}

export default ConfigChip;
