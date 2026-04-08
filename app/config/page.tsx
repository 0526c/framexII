"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import ConfigChip, { ConfigSection } from "@/components/ConfigChip";
import PageTransition from "@/components/PageTransition";
import { styles, genres, durations, defaultConfig } from "@/lib/data";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ConfigPage() {
  const router = useRouter();
  const [config, setConfig] = useState(defaultConfig);
  const [identityName, setIdentityName] = useState("视频创作者");

  useEffect(() => {
    const savedIdentity = localStorage.getItem("framex_identity_name");
    const savedConfig = localStorage.getItem("framex_config");
    
    if (savedIdentity) setIdentityName(savedIdentity);
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch {}
    }
  }, []);

  const saveConfig = (updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem("framex_config", JSON.stringify(newConfig));
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={2} totalSteps={5} />

        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Step 02 — Configuration
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                配置创作风格
              </h1>
              <p className="text-cream-dim text-sm sm:text-base">
                风格选择将统一控制脚本、分镜与视觉表达
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
            >
              <ConfigSection title="Visual Style" subtitle="视觉风格">
                {styles.map((s) => (
                  <ConfigChip
                    key={s.id}
                    label={s.name}
                    selected={config.style === s.id}
                    onClick={() => saveConfig({ style: s.id, styleName: s.name })}
                  />
                ))}
              </ConfigSection>

              <ConfigSection title="Genre" subtitle="类型">
                {genres.map((g) => (
                  <ConfigChip
                    key={g.id}
                    label={g.name}
                    selected={config.genre === g.id}
                    onClick={() => saveConfig({ genre: g.id, genreName: g.name })}
                  />
                ))}
              </ConfigSection>

              <ConfigSection title="Duration" subtitle="时长">
                {durations.map((d) => (
                  <ConfigChip
                    key={d.value}
                    label={d.name}
                    selected={config.duration === d.value}
                    onClick={() => saveConfig({ duration: d.value, durationName: d.name })}
                  />
                ))}
              </ConfigSection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01] mb-8"
            >
              <h3 className="text-xs font-medium text-gold tracking-wider uppercase mb-4">
                Current Configuration
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-cream-dim text-xs mb-1">身份</div>
                  <div className="text-cream font-medium">{identityName}</div>
                </div>
                <div>
                  <div className="text-cream-dim text-xs mb-1">风格</div>
                  <div className="text-cream font-medium">{config.styleName}</div>
                </div>
                <div>
                  <div className="text-cream-dim text-xs mb-1">类型</div>
                  <div className="text-cream font-medium">{config.genreName}</div>
                </div>
                <div>
                  <div className="text-cream-dim text-xs mb-1">时长</div>
                  <div className="text-cream font-medium">{config.durationName}</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between"
            >
              <motion.button
                onClick={() => router.push("/identity/")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-cream-dim hover:text-cream hover:border-gold/40 transition-all"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="w-4 h-4" />
                返回
              </motion.button>

              <motion.button
                onClick={() => router.push("/create/")}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gold to-gold-bright rounded-xl font-semibold text-void"
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 10px 30px rgba(212,168,75,0.3)' 
                }}
                whileTap={{ scale: 0.98 }}
              >
                下一步
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
