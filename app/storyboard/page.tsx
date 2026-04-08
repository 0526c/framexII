"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition, { StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { Shot, ScriptScene } from "@/types";
import { generateMockShots, generateMockScript } from "@/lib/data";
import { ChevronLeft, ChevronRight, Play, Pause, Download, Maximize2 } from "lucide-react";

export default function StoryboardPage() {
  const router = useRouter();
  const [shots, setShots] = useState<Shot[]>([]);
  const [script, setScript] = useState<ScriptScene[]>([]);
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0);

  useEffect(() => {
    // Load saved data or generate new
    const savedShots = localStorage.getItem("framex_shots");
    const savedScript = localStorage.getItem("framex_script");
    const savedGenre = localStorage.getItem("framex_config");
    
    let genre = "romance";
    if (savedGenre) {
      try {
        const config = JSON.parse(savedGenre);
        genre = config.genre || "romance";
      } catch {}
    }

    if (savedShots) {
      try {
        setShots(JSON.parse(savedShots));
      } catch {
        setShots(generateMockShots(genre));
      }
    } else {
      setShots(generateMockShots(genre));
    }

    if (savedScript) {
      try {
        setScript(JSON.parse(savedScript));
      } catch {
        setScript(generateMockScript(genre));
      }
    } else {
      setScript(generateMockScript(genre));
    }
  }, []);

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentPlayIndex((prev) => {
        if (prev >= shots.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, shots.length]);

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setCurrentPlayIndex(0);
    } else {
      setCurrentPlayIndex(0);
      setIsPlaying(true);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={4} totalSteps={5} />

        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
            >
              <div>
                <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                  Storyboard
                </div>
                <h1 className="text-2xl sm:text-3xl font-medium text-cream">
                  分镜预览
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gold-dim border border-gold/30 rounded-xl text-gold text-sm font-medium"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(212,168,75,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isPlaying ? (
                    <> <Pause className="w-4 h-4" /> 停止预览 </>
                  ) : (
                    <> <Play className="w-4 h-4" /> 播放预览 </>
                  )}
                </motion.button>

                <motion.button
                  className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-xl text-cream-dim text-sm hover:text-cream hover:border-gold/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  导出
                </motion.button>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
              {/* Storyboard Grid */}
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {shots.map((shot, i) => (
                  <StaggerItem key={shot.id}>
                    <motion.div
                      onClick={() => setSelectedShot(i)}
                      className={`relative aspect-video rounded-xl border overflow-hidden cursor-pointer ${
                        selectedShot === i 
                          ? 'border-gold ring-2 ring-gold/30' 
                          : isPlaying && currentPlayIndex === i
                            ? 'border-gold'
                            : 'border-border'
                      }`}
                      whileHover={{ scale: 1.02, y: -4 }}
                      animate={
                        isPlaying && currentPlayIndex === i
                          ? { 
                              scale: [1, 1.02, 1],
                              borderColor: '#d4a84b',
                              boxShadow: '0 0 20px rgba(212,168,75,0.3)'
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {/* Gradient background */}
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, hsla(${340 + i * 45}, 30%, 14%, 1) 0%, hsla(${340 + i * 45 + 20}, 25%, 10%, 1) 100%)`
                        }}
                      />

                      {/* Silhouette */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-24 rounded-full"
                        style={{ 
                          background: `hsla(${340 + i * 45}, 25%, 28%, 0.35)`,
                          filter: 'blur(1px)'
                        }}
                      />

                      {/* Info overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-void via-void/80 to-transparent">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-gold mb-0.5">{shot.number}</div>
                            <div className="text-[10px] text-cream-dim">{shot.movement}</div>
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-cream-dim" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Playing indicator */}
                      <AnimatePresence>
                        {isPlaying && currentPlayIndex === i && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-gold/10"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                              className="w-12 h-12 rounded-full bg-gold/30 flex items-center justify-center"
                            >
                              <Play className="w-5 h-5 text-gold fill-gold" />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Script Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01] h-fit"
              >
                <h3 className="text-xs font-medium text-gold tracking-wider uppercase mb-4">
                  Shooting Script
                </h3>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {script.map((scene, i) => (
                    <motion.div 
                      key={i} 
                      className="pb-4 border-b border-border/50 last:border-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {scene.scene && (
                        <div className="text-gold font-semibold uppercase tracking-wider text-xs mb-2">
                          {scene.scene}
                        </div>
                      )}
                      {scene.action && (
                        <div className="text-cream-dim text-sm leading-relaxed mb-2">{scene.action}</div>
                      )}
                      {scene.character && (
                        <div className="text-cream font-semibold text-sm mt-2 ml-4">
                          {scene.character}
                        </div>
                      )}
                      {scene.dialog && (
                        <div className="text-cream text-sm ml-4">{scene.dialog}</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-between mt-10"
            >
              <motion.button
                onClick={() => router.push("/create/")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-cream-dim hover:text-cream hover:border-gold/40 transition-all"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="w-4 h-4" />
                返回创作
              </motion.button>

              <motion.button
                onClick={() => router.push("/payment/")}
                className="flex items-center gap-2 px-8 py-3 bg-brand-red hover:bg-brand-red-hover rounded-xl font-semibold text-cream vibe-hover glow-red"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                升级会员
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
