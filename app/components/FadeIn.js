"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  onLoad = false,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={onLoad ? undefined : { once: true, amount: 0.35 }}
      transition={{ duration: 0.95, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
