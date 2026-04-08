"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition, { StaggerContainer, StaggerItem } from "@/components/PageTransition";
import StoryCard from "@/components/StoryCard";
import { Shot, ScriptScene } from "@/types";
import { ChevronLeft, Play, Download } from "lucide-react";

export default function StoryboardPage() {
  const router = useRouter();
  const [script, setScript] = useState<ScriptScene[]>([]);
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    const savedScript = localStorage.getItem("framex_script");
    const savedShots = localStorage.getItem("framex_shots");
    
    if (savedScript) setScript(JSON.parse(savedScript));
    if (savedShots) setShots(JSON.parse(savedShots));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={4} totalSteps={5} />
        
        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                  Step 04 — Storyboard
                </div>
                <h1 className="text-2xl sm:text-3xl font-medium text-cream">
                  拍摄脚本与分镜
                </h1>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-cream-dim hover:text-cream hover:border-gold/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <Play className="w-4 h-4" />
                  预览
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-void font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  <Download className="w-4 h-4" />
                  导出
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl border border-border bg-white/[0.02]"
              >
                <h2 className="text-lg font-medium text-cream mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold text-sm">01</span>
                  拍摄脚本
                </h2>
                
                <div className="space-y-4 font-mono text-sm leading-relaxed max-h-[500px] overflow-y-auto pr-2">
                  {script.map((scene, i) => (
                    <div key={i} className="pb-4 border-b border-white/5 last:border-0">
                      {scene.scene && (
                        <div className="text-gold font-medium tracking-wider mb-2">
                          {scene.scene}
                        </div>
                      )}
                      {scene.action && (
                        <div className="text-cream-dim italic mb-2">
                          {scene.action}
                        </div>
                      )}
                      {scene.character && (
                        <div className="text-cream font-medium ml-4 mb-1">
                          {scene.character}
                        </div>
                      )}
                      {scene.dialog && (
                        <div className="text-cream ml-8">
                          "{scene.dialog}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-lg font-medium text-cream mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold text-sm">02</span>
                  分镜预览
                </h2>
                
                <StaggerContainer className="grid grid-cols-2 gap-4">
                  {shots.map((shot, i) => (
                    <StaggerItem key={shot.id}>
                      <StoryCard shot={shot} index={i} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-between"
            >
              <motion.button
                onClick={() => router.push("/create/")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-cream-dim hover:text-cream transition-all"
                whileHover={{ x: -4 }}
              >
                <ChevronLeft className="w-4 h-4" />
                返回修改
              </motion.button>
              
              <motion.button
                onClick={() => router.push("/payment/")}
                className="px-8 py-3 bg-gradient-to-r from-gold to-gold-bright rounded-xl font-semibold text-void"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(212,168,75,0.3)" }}
              >
                升级方案
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
