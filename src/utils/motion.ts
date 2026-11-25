import type { Variants } from 'motion/react';

export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/**
 * Global backup transition applied automatically by <MotionConfig> whenever
 * an individual motion element does not specify its own timing.
 */
export const DEFAULT_TRANSITION = {
  duration: 0.22,
  ease: EASE_SMOOTH,
} as const;

export const PILL_SPRING = {
  type: 'spring' as const,
  stiffness: 460,
  damping: 36,
};

/**
 * Primary route / tab switch transition: directional horizontal glide paired
 * with a clean fade in/out (no scale transform, avoiding vertical shift on tall pages).
 */
export const pageVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.22, ease: EASE_SMOOTH },
      x: { duration: 0.26, ease: EASE_SMOOTH },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -16 : 16,
    transition: {
      opacity: { duration: 0.18, ease: EASE_SMOOTH },
      x: { duration: 0.2, ease: EASE_SMOOTH },
    },
  }),
};

/**
 * In-page horizontal sub-tab switch (e.g., Maths / Further Maths / More Papers).
 */
export const subTabVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 16 : -16,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      opacity: { duration: 0.2, ease: EASE_SMOOTH },
      x: { duration: 0.24, ease: EASE_SMOOTH },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -14 : 14,
    transition: {
      opacity: { duration: 0.16, ease: EASE_SMOOTH },
      x: { duration: 0.18, ease: EASE_SMOOTH },
    },
  }),
};

/**
 * Vertical panel / filter / tab content fade transition used uniformly across views.
 */
export const contentFadeVariants: Variants = {
  enter: {
    opacity: 0,
    y: 6,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: EASE_SMOOTH,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.16,
      ease: EASE_SMOOTH,
    },
  },
};

/**
 * Overlay & full-screen modal transitions.
 */
export const overlayFadeVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 0.22, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: EASE_SMOOTH },
  },
};

export const modalPanelVariants: Variants = {
  enter: { opacity: 0, scale: 0.985, y: 6 },
  center: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.24, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.985,
    y: 4,
    transition: { duration: 0.18, ease: EASE_SMOOTH },
  },
};
