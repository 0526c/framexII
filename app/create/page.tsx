"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition from "@/components/PageTransition";
import { GenerationSteps } from "@/components/ProgressBar";
import { generateMockScript, generateMockShots } from "@/lib/data";
import { Sparkles, ChevronRight } from "lucide-react";

export default function CreatePage() {
  const router = useRouter();
  const [config, setConfig] = useState({
    identityName: "视频创作者",
    styleName: "胶片 Film",
    genreName: "爱情 Romance",
    durationName: "1分钟",
  });
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    const saved = localStorage.getItem("framex_config");
    const identity = localStorage.getItem("framex_identity_name");
    if (saved) {
      const parsed = JSON.parse(saved);
      setConfig({
        identityName: identity || "视频创作者",
        styleName: parsed.styleName,
        genreName: parsed.genreName,
        durationName: parsed.durationName,
      });
    }
  }, []);

  const handleGenerate = async () => {
    if (!idea.trim() || isGenerating) return;
    
    setIsGenerating(true);
    
    // Simulate generation steps
    for (let i = 0; i < 4; i++) {
      setCurrentStep(i);
      await new Promise(r => setTimeout(r, 800));
    }
    
    // Save results
    const script = generateMockScript(config.genreName.split(" ")[0].toLowerCase());
    const shots = generateMockShots(config.genreName.split(" ")[0].toLowerCase());
    
    localStorage.setItem("framex_script", JSON.stringify(script));
    localStorage.setItem("framex_shots", JSON.stringify(shots));
    
    setIsGenerating(false);
    setCurrentStep(-1);
    
    router.push("/storyboard/");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={3} totalSteps={5} />
        
        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Step 03 — Create
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                创作你的想法
              </h1>
              <p className="text-cream-dim text-sm">
                输入创意，AI 将为你生成完整的拍摄方案
              </p>
            </motion.div>

            {/* Config Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-xl border border-border bg-white/[0.03] mb-8"
            >
              <h3 className="text-xs font-medium text-gold tracking-wider uppercase mb-4">
                Current Configuration
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {Object.entries(config).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-cream-dim text-xs mb-1">
                      {key === "identityName" ? "身份" :
                       key === "styleName" ? "风格" :
                       key === "genreName" ? "类型" : "时长"}
                    </div>
                    <div className="text-cream font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <label className="block text-sm font-medium text-cream mb-3">
                Your Idea / 你的创意
              </label>
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="描述你的创意：场景、人物、情绪、想要表达的主题..."
                className="w-full h-40 p-5 rounded-xl bg-void-lighter border border-border text-cream placeholder:text-cream-dim/50 resize-none focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mb-12"
            >
              <motion.button
                onClick={handleGenerate}
                disabled={!idea.trim() || isGenerating}
                className="group relative px-10 py-4 bg-gradient-to-r from-gold to-gold-bright rounded-2xl font-semibold text-void text-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(212,168,75,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? "生成中..." : "生成方案"}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </motion.button>
            </motion.div>

            {/* Generation Steps */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center"
                >
                  <GenerationSteps currentStep={currentStep} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
