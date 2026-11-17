"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the entrance animation. */
  delay?: number;
  as?: "section" | "div" | "article" | "li";
  id?: string;
}

/**
 * Fades + rises content 12px as it enters the viewport.
 * prefers-reduced-motion disables the transition entirely.
 */
export function MotionSection({
  children,
  className,
  delay = 0,
  as = "section",
  id,
}: MotionSectionProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
