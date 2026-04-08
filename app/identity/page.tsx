"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GrainBackground from "@/components/GrainBackground";
import NavHeader from "@/components/NavHeader";
import IdentityCard from "@/components/IdentityCard";
import PageTransition, { StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { identities } from "@/lib/data";
import { CreatorIdentity } from "@/types";

export default function IdentityPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<CreatorIdentity | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("framex_identity");
    if (saved) {
      setSelected(saved as CreatorIdentity);
    }
  }, []);

  const handleSelect = (id: CreatorIdentity, name: string) => {
    setSelected(id);
    localStorage.setItem("framex_identity", id);
    localStorage.setItem("framex_identity_name", name);
    
    setTimeout(() => {
      router.push("/config/");
    }, 600);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GrainBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <NavHeader currentStep={1} totalSteps={5} />

        <PageTransition className="flex-1 px-6 lg:px-10 py-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="text-xs font-medium text-gold tracking-wider uppercase mb-2">
                Step 01 — Identity
              </div>
              <h1 className="text-2xl sm:text-3xl font-medium text-cream mb-3">
                选择你的创作者身份
              </h1>
              <p className="text-cream-dim text-sm sm:text-base">
                系统将基于身份优化生成逻辑与镜头语言
              </p>
            </motion.div>

            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {identities.map((identity) => (
                <StaggerItem key={identity.id}>
                  <IdentityCard
                    icon={identity.icon}
                    name={identity.name}
                    description={identity.desc}
                    selected={selected === identity.id}
                    onClick={() => handleSelect(identity.id, identity.name)}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <motion.button
                onClick={() => router.push("/")}
                className="text-sm text-cream-dim hover:text-cream transition-colors"
                whileHover={{ x: -4 }}
              >
                ← 返回首页
              </motion.button>
            </motion.div>
          </div>
        </PageTransition>
      </div>
    </main>
  );
}
