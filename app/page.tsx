"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-brand-glow"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative text-white font-bold text-xl">X</span>
            </motion.div>
            <div className="text-xl font-semibold">
              Frame
              <span className="text-brand-red font-bold">X</span>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <motion.div
              className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-brand-red to-brand-red-hover rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 30px 80px rgba(139,38,53,0.5)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative text-white font-bold text-6xl sm:text-7xl">X</span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide">
              Frame
              <span className="text-brand-red font-bold">X</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-cream-dim text-base sm:text-lg max-w-md mb-12 leading-relaxed"
          >
            AI影视创作平台
            <br />
            从创意到分镜，一键生成可拍摄的完整方案
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/identity/">
              <motion.button
                className="group relative px-10 py-4 bg-brand-red hover:bg-brand-red-hover rounded-xl font-semibold text-cream text-lg overflow-hidden vibe-hover glow-red"
                whileHover={{ 
                  scale: 1.03, 
                  y: -3
                }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-2">
                  开始创作
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Features hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 flex items-center gap-8 text-xs text-cream-dim"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              脚本生成
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              智能分镜
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              动画预览
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
