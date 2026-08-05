import React from "react";
import { motion } from "framer-motion";

interface TimelineNodeProps {
  active: boolean;
  onClick: () => void;
}

export function TimelineNode({ active, onClick }: TimelineNodeProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Timeline node"
      className="relative flex h-8 w-8 items-center justify-center focus:outline-none"
      animate={{
        scale: active ? 1.25 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-foreground"
        animate={{
          opacity: active ? 0.15 : 0,
          scale: active ? 1.6 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.span
        className="relative h-3 w-3 rounded-full border-2 border-foreground bg-background"
        animate={{
          backgroundColor: active ? "var(--foreground)" : "var(--background)",
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
}
