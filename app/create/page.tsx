"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition from "@/components/PageTransition";
import { GenerationSteps } from "@/components/ProgressBar";
import StoryCard from "@/components/StoryCard";
import { defaultConfig, generateMockScript, generateMockShots } from "@/lib/data";
import { StoryConfig, ScriptScene, Shot } from "@/types";
import { Sparkles, ChevronRight, ChevronLeft, Wand2 } from "lucide-react";

const generationSteps = [
  { emoji: "🧠", label: "分析创意" },
  { emoji: "📝", label: "生成剧本" },
  { emoji: "🎬", label: "设计分镜" },
  { emoji: "✨", label: "渲染预览" },
];

export default function CreatePage() {
  const router = useRouter();
  const [config, setConfig] = useState<StoryConfig>(defaultConfig);
  const [idea, setIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [script, setScript] = useState<ScriptScene[]>([]);
  const [shots, setShots] = useState<Shot[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("framex_config");
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleGenerate = async () => {
    if (!idea.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenStep(0);
    setShowResult(false);

    // Simulate generation steps
    for (let i = 0; i < generationSteps.length; i++) {
      setGenStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    // Generate content
    const generatedScript = generateMockScript(config.genre);
    const generatedShots = generateMockShots(config.genre);

    setScript(generatedScript);
    setShots(generatedShots);
    setShowResult(true);
    setIsGenerating(false);

    // Save to localStorage
    localStorage.setItem("framex_script", JSON.stringify(generatedScript));
    localStorage.setItem("framex_shots", JSON.stringify(generatedShots));
  };

  const handleViewStoryboard = () => {
    router.push("/storyboard/");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={3} totalSteps={5} />

        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-6xl mx-auto h-[calc(100vh-140px)]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Creation Workspace
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                创作空间
              </h1>
              <p className="text-cream-dim text-sm">
                输入创意，AI 实时生成脚本与分镜方案
              </p>
            </motion.div>

            {/* Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5 h-[calc(100%-100px)]">
              {/* Left Panel - Config & Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-4"
              >
                {/* Config Summary */}
                <div className="p-5 rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
                  <h4 className="text-xs font-medium text-gold tracking-wider uppercase mb-4">
                    Current Config
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cream-dim">身份</span>
                      <span className="text-cream font-medium">{config.identityName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-dim">风格</span>
                      <span className="text-cream font-medium">{config.styleName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-dim">类型</span>
                      <span className="text-cream font-medium">{config.genreName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cream-dim">时长</span>
                      <span className="text-cream font-medium">{config.durationName}</span>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex-1 flex flex-col">
                    <label className="text-xs font-medium text-gold tracking-wider uppercase mb-3">
                      Your Idea
                    </label>
                    <textarea
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="描述你的创意，例如：雨夜便利店的偶然相遇，关于孤独与连接的都市故事..."
                      className="flex-1 w-full min-h-[120px] p-4 rounded-xl bg-void-lighter border border-border text-cream text-sm resize-none focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
                      disabled={isGenerating}
                    />
                  </div>

                  <motion.button
                    onClick={handleGenerate}
                    disabled={!idea.trim() || isGenerating}
                    className="w-full py-4 bg-brand-red hover:bg-brand-red-hover rounded-xl font-semibold text-cream flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed vibe-hover glow-red"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isGenerating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                        />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        生成方案
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/config/")}
                    className="text-sm text-cream-dim hover:text-cream transition-colors flex items-center gap-1"
                    whileHover={{ x: -4 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    修改配置
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Panel - Result */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01] overflow-hidden flex flex-col"
              >
                <AnimatePresence mode="wait">
                  {!showResult && !isGenerating && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-cream-dim"
                    >
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-5xl mb-4">
                        ✦
                      </motion.div>
                      <p className="text-sm">输入创意后点击生成，脚本与分镜将在此处呈现</p>
                    </motion.div>
                  )}

                  {isGenerating && (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center"
                    >
                      <GenerationSteps steps={generationSteps} currentStep={genStep} />
                      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold to-gold-bright rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${((genStep + 1) / generationSteps.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {showResult && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col h-full overflow-hidden"
                    >
                      {/* Script */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-gold tracking-wider uppercase">
                            Shooting Script
                          </span>
                          <motion.button
                            onClick={handleViewStoryboard}
                            className="text-xs text-gold hover:text-gold-bright flex items-center gap-1"
                            whileHover={{ x: 4 }}
                          >
                            查看完整分镜
                            <ChevronRight className="w-3 h-3" />
                          </motion.button>
                        </div>
                        
                        <div className="p-4 rounded-xl bg-void-lighter border border-border font-mono text-sm leading-relaxed max-h-40 overflow-y-auto">
                          {script.map((scene, i) => (
                            <div key={i} className="mb-3">
                              {scene.scene && (
                                <div className="text-gold font-semibold uppercase tracking-wider text-xs mb-1">
                                  {scene.scene}
                                </div>
                              )}
                              {scene.action && (
                                <div className="text-cream-dim">{scene.action}</div>
                              )}
                              {scene.character && (
                                <div className="text-cream font-semibold mt-2 ml-4">
                                  {scene.character}
                                </div>
                              )}
                              {scene.dialog && (
                                <div className="text-cream ml-4">{scene.dialog}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Storyboard Preview */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-medium text-gold tracking-wider uppercase">
                            Storyboard Preview
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3">
                          {shots.map((shot, i) => (
                            <StoryCard key={shot.id} shot={shot} index={i} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
