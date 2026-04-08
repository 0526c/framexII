"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GrainBackground from "@/components/GrainBackground";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            className="relative inline-flex items-center justify-center w-20 h-20 bg-brand-red rounded-2xl mb-6 mx-auto"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-3xl font-bold text-white">X</span>
            
            <motion.div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-cream mb-4 tracking-tight">
            Frame<span className="text-brand-red">X</span>
          </h1>
          
          <p className="text-lg text-cream-dim max-w-md mx-auto leading-relaxed">
            AI影视创作平台
            <br />
            <span className="text-sm opacity-70">从创意到分镜，一键生成可拍摄的完整方案</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.button
            onClick={() => router.push("/identity/")}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold to-gold-bright rounded-2xl font-semibold text-void text-lg flex items-center gap-3 overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(212,168,75,0.3)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            开始创作
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-cream-dim"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            智能脚本生成
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            专业分镜设计
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            多风格支持
          </span>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 text-xs text-cream-dim"
        >
          联系我们:{" "}
          <a href="mailto:dumccchr@icloud.com" className="text-gold hover:underline">
            dumccchr@icloud.com
          </a>
        </motion.footer>
      </div>
    </main>
  );
}
