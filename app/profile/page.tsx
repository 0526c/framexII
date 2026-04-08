"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import PageTransition from "@/components/PageTransition";
import { mockUser } from "@/lib/data";
import { User, Zap, Folder, Settings, ChevronRight, Crown } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);

  const stats = [
    { icon: Zap, label: "剩余次数", value: user.credits },
    { icon: Folder, label: "项目数量", value: user.projects },
    { icon: Crown, label: "会员等级", value: user.tier === "starter" ? "入门" : user.tier === "pro" ? "专业" : "工作室" },
  ];

  const menuItems = [
    { icon: User, label: "个人信息", action: () => {} },
    { icon: Zap, label: "我的积分", action: () => {} },
    { icon: Folder, label: "项目历史", action: () => {} },
    { icon: Settings, label: "设置", action: () => {} },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader />
        
        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center text-void text-3xl font-bold mx-auto mb-4"
                whileHover={{ scale: 1.05 }}
              >
                {user.avatar}
              </motion.div>
              <h1 className="text-2xl font-medium text-cream mb-1">{user.name}</h1>
              <p className="text-cream-dim text-sm">dumccchr@icloud.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-4 rounded-xl border border-border bg-white/[0.02] text-center"
                  whileHover={{ scale: 1.02, borderColor: "rgba(212,168,75,0.3)" }}
                >
                  <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <div className="text-xl font-bold text-cream mb-1">{stat.value}</div>
                  <div className="text-xs text-cream-dim">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              {menuItems.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={item.action}
                  className="w-full p-4 rounded-xl border border-border bg-white/[0.02] flex items-center justify-between group hover:border-gold/30 transition-all"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-cream-dim group-hover:text-gold transition-colors" />
                    <span className="text-cream group-hover:text-gold transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cream-dim group-hover:text-gold transition-colors" />
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <button className="text-sm text-cream-dim hover:text-brand-red transition-colors">
                退出登录
              </button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
