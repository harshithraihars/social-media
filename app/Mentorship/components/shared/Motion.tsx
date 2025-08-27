"use client"

import { type HTMLMotionProps, motion as framerMotion } from "framer-motion"

// Re-export motion components
export const motion = framerMotion

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

// Animation components with preset animations
export const FadeIn = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={fadeIn} {...props}>
    {children}
  </motion.div>
)

export const SlideUp = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={slideUp} {...props}>
    {children}
  </motion.div>
)

export const SlideIn = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={slideIn} {...props}>
    {children}
  </motion.div>
)

export const ScaleIn = ({ children, ...props }: HTMLMotionProps<"div">) => (
  <motion.div initial="hidden" animate="visible" variants={scaleIn} {...props}>
    {children}
  </motion.div>
)
