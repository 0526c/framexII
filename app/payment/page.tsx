"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      "基础分镜模板",
      "标准导出格式",
    ],
    cta: "当前方案",
    popular: false,
  },
  {
    id: "pro",
    name: "PRO",
    price: "¥29",
    period: "月",
    description: "专业创作者的首选方案",
    features: [
      "无限次生成",
      "最长 30 分钟",
      "高级分镜模板",
      "4K 导出 + 水印去除",
      "优先客服支持",
    ],
    cta: "立即升级",
    popular: true,
  },
  {
    id: "studio",
    name: "STUDIO",
    price: "¥99",
    period: "月",
    description: "团队与工作室解决方案",
    features: [
      "Pro 全部功能",
      "最长 90 分钟",
      "团队协作空间",
      "API 接入权限",
      "专属客户经理",
    ],
    cta: "联系销售",
    popular: false,
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Step 05 — Upgrade
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                选择你的方案
              </h1>
              <p className="text-cream-dim text-sm max-w-md mx-auto">
                解锁更多创作可能，让 FrameX 成为你专业的创作伙伴
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <StaggerItem key={plan.id}>
                  <motion.div
                    className={`relative p-6 rounded-2xl border h-full flex flex-col ${
                      plan.popular
                        ? "bg-gradient-to-b from-gold/10 to-transparent border-gold/50"
                        : "bg-white/[0.02] border-border"
                    }`}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-void text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        最受欢迎
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-cream mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold text-gold">{plan.price}</span>
                        {plan.period !== "永久" && (
                          <span className="text-cream-dim text-sm">/{plan.period}</span>
                        )}
                      </div>
                      <p className="text-sm text-cream-dim">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-cream">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-gold" : "text-cream-dim"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-gold to-gold-bright text-void"
                          : plan.id === "starter"
                          ? "bg-white/10 text-cream cursor-default"
                          : "border border-gold/50 text-gold hover:bg-gold/10"
                      }`}
                      whileHover={plan.id !== "starter" ? { scale: 1.02 } : {}}
                      whileTap={plan.id !== "starter" ? { scale: 0.98 } : {}}
                    >
                      {plan.cta}
                    </motion.button>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 p-6 rounded-2xl border border-border bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-cream">企业定制方案</h3>
                  <p className="text-sm text-cream-dim">专属部署、定制训练、私有 API</p>
                </div>
              </div>
              <motion.button
                className="px-6 py-3 rounded-xl border border-gold/50 text-gold hover:bg-gold/10 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                联系我们
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
