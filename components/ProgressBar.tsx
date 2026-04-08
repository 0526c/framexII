"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  steps?: string[];
  currentStep?: number;
}

export function ProgressBar({ 
  progress, 
  steps = ["分析创意", "生成剧本", "设计分镜", "渲染预览"],
  currentStep = 0 
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-bright rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  isCompleted
                    ? "bg-gold text-void"
                    : isActive
                    ? "bg-gold/20 text-gold border border-gold"
                    : "bg-white/5 text-cream-dim border border-white/10"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <span className={`text-xs ${isActive ? "text-gold" : "text-cream-dim"}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface GenerationStepsProps {
  currentStep: number;
}

export function GenerationSteps({ currentStep }: GenerationStepsProps) {
  const steps = [
    { icon: "🧠", label: "分析创意", en: "Analyzing" },
    { icon: "📝", label: "生成剧本", en: "Scripting" },
    { icon: "🎬", label: "设计分镜", en: "Storyboarding" },
    { icon: "✨", label: "渲染预览", en: "Rendering" },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            <motion.div
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-300 ${
                isCompleted
                  ? "bg-gold/10 border-gold/30"
                  : isActive
                  ? "bg-gold/20 border-gold shadow-lg shadow-gold-glow"
                  : "bg-white/5 border-white/10"
              }`}
              animate={isActive ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-xl">{step.icon}</span>
              <div className="text-center">
                <div className={`text-sm font-medium ${isActive ? "text-gold" : "text-cream"}`}>
                  {step.label}
                </div>
                <div className="text-xs text-cream-dim">{step.en}</div>
              </div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className={`w-8 h-px mx-2 ${isCompleted ? "bg-gold/50" : "bg-white/10"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
