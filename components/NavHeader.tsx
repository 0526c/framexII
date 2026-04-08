"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface NavHeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

export default function NavHeader({ currentStep, totalSteps }: NavHeaderProps) {
  const router = useRouter();

  const steps = [
    { id: 0, label: "Home" },
    { id: 1, label: "Identity" },
    { id: 2, label: "Config" },
    { id: 3, label: "Create" },
    { id: 4, label: "Storyboard" },
    { id: 5, label: "Payment" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-10 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-bold text-white text-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            X
          </motion.div>
          <span className="text-cream font-medium tracking-wide">
            Frame<span className="text-brand-red">X</span>
          </span>
        </motion.div>

        {currentStep !== undefined && totalSteps !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2"
          >
            {steps.slice(0, totalSteps + 1).map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    step.id === currentStep
                      ? "bg-gold scale-125"
                      : step.id < currentStep
                      ? "bg-gold/50"
                      : "bg-white/20"
                  }`}
                />
                {step.id < totalSteps && (
                  <div className="w-8 h-px bg-white/10 mx-1" />
                )}
              </div>
            ))}
          </motion.div>
        )}

        <motion.button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-cream-dim hover:text-cream transition-colors"
          whileHover={{ x: -4 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">返回</span>
        </motion.button>
      </div>
    </header>
  );
}
