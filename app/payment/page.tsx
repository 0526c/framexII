"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition, { StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { Check, Sparkles, Zap, Building2 } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "STARTER",
    price: "免费",
    period: "永久",
    description: "适合个人体验与轻量创作",
    features: [
      "每日 3 次生成",
      "最长 3 分钟",
      "基础风格",
      "标准分辨率",
    ],
    cta: "当前方案",
    featured: false,
    icon: Sparkles,
  },
  {
    id: "pro",
    name: "PROFESSIONAL",
    price: "¥99",
    period: "/ 月",
    description: "适合专业创作者与小型团队",
    features: [
      "无限次生成",
      "最长 30 分钟",
      "全部风格解锁",
      "4K 分辨率导出",
      "优先处理队列",
    ],
    cta: "升级 Pro",
    featured: true,
    icon: Zap,
  },
  {
    id: "studio",
    name: "STUDIO",
    price: "¥299",
    period: "/ 月",
    description: "适合制作公司与团队",
    features: [
      "5 个团队席位",
      "API 接入",
      "自定义模型训练",
      "专属支持",
      "白标方案",
    ],
    cta: "联系销售",
    featured: false,
    icon: Building2,
  },
];

export default function PaymentPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={5} totalSteps={5} />

        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Membership
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                选择你的计划
              </h1>
              <p className="text-cream-dim text-sm">
                解锁更多创作可能
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {plans.map((plan) => (
                <StaggerItem key={plan.id}>
                  <motion.div
                    className={`relative p-6 rounded-2xl border ${
                      plan.featured
                        ? "border-gold bg-gradient-to-b from-gold-dim/40 to-gold-dim/10"
                        : "border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01]"
                    }`}
                    whileHover={{ 
                      y: -6,
                      boxShadow: plan.featured 
                        ? "0 20px 40px rgba(212,168,75,0.2)" 
                        : "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                  >
                    {/* Featured badge */}
                    
                    {plan.featured && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 bg-gold rounded-b-lg text-xs font-bold text-void"
                      >
                        推荐
                      </motion.div>
                    )}

                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gold-dim flex items-center justify-center mb-4">
                        <plan.icon className="w-6 h-6 text-gold" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gold mb-2">{plan.name}</h3>
                      
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-light text-cream">{plan.price}</span>
                        <span className="text-cream-dim text-sm">{plan.period}</span>
                      </div>
                      
                      <p className="text-sm text-cream-dim">{plan.description}</p>
                    </div>

                    <div className="border-t border-border pt-6 mb-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-cream">
                            <Check className="w-4 h-4 text-gold flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.button
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                        plan.featured
                          ? "bg-brand-red hover:bg-brand-red-hover text-cream vibe-hover glow-red"
                          : "border border-border text-cream hover:border-brand-red/50 hover:bg-brand-subtle"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.cta}
                    </motion.button>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* FAQ hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 text-sm text-cream-dim"
            >
              有问题？
              <motion.a 
                href="mailto:dumccchr@icloud.com"
                className="text-gold hover:text-gold-bright ml-1"
                whileHover={{ textDecoration: "underline" }}
              >
                联系我们
              </motion.a>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between mt-12"
            >
              <motion.button
                onClick={() => router.push("/storyboard/")}
                className="text-sm text-cream-dim hover:text-cream transition-colors"
                whileHover={{ x: -4 }}
              >
                ← 返回分镜
              </motion.button>

              <motion.button
                onClick={() => router.push("/profile/")}
                className="text-sm text-cream-dim hover:text-cream transition-colors"
                whileHover={{ x: 4 }}
              >
                个人中心 →
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
