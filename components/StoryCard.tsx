"use client";

import { motion } from "framer-motion";
import { Shot } from "@/types";

interface StoryCardProps {
  shot: Shot;
  index: number;
}

export default function StoryCard({ shot, index }: StoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-xl overflow-hidden border border-border bg-void-lighter"
    >
      <div className="aspect-video relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-void-light to-void"
          style={{
            background: `linear-gradient(135deg, hsl(${220 + index * 30}, 20%, ${15 + index * 3}%) 0%, hsl(${240 + index * 20}, 15%, ${8 + index * 2}%) 100%)`
          }}
        />
        
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="rgba(212,168,75,0.3)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
          </svg>
        </div>

        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-void/80 backdrop-blur-sm border border-white/10">
          <span className="text-xs font-mono text-gold">{shot.number}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-cream mb-2 line-clamp-2">{shot.description}</p>
        <div className="flex items-center gap-2 text-xs text-cream-dim">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          {shot.movement}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/30 transition-colors pointer-events-none" />
    </motion.div>
  );
}
