"use client";

import { type ReactNode, type ElementType, type CSSProperties } from "react";
import { useReveal } from "@/lib/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Tag to render. Default: div */
  as?: ElementType;
  /** Delay in ms before the animation starts (for staggered groups) */
  delay?: number;
  /** Direction of the slide. Default: up */
  direction?: "up" | "right" | "left" | "none";
  /** Custom distance in px. Default: 24 */
  distance?: number;
  className?: string;
}

/**
 * Drop-in wrapper that fades + slides its children in when scrolled into view.
 * Pure CSS transition driven by a class toggle — no Framer Motion needed for
 * this. Respects prefers-reduced-motion automatically (global CSS rule).
 *
 * <Reveal delay={100}><h1>Hello</h1></Reveal>
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  direction = "up",
  distance = 24,
  className,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  // Initial transform per direction
  const initialTransform = {
    up: `translateY(${distance}px)`,
    right: `translateX(-${distance}px)`,
    left: `translateX(${distance}px)`,
    none: "none",
  }[direction];

  const style: CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? "none" : initialTransform,
    transition: `opacity 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <Tag ref={ref} style={style} className={cn(className)}>
      {children}
    </Tag>
  );
}
