// Motion tokens + shared variants — see animation diagnostic (Emil / animations.dev)
// Strong custom cubic-bezier curves; only transform + opacity are animated.

export const EASE_LUXE = [0.16, 1, 0.3, 1] // reveals, elegant entrances
export const EASE_OUT = [0.23, 1, 0.32, 1] // UI / hover
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] // on-screen movement
export const EASE_DRAWER = [0.32, 0.72, 0, 1] // mobile drawer

// Default viewport for scroll reveals: fire once, slightly before fully in view.
export const VIEWPORT = { once: true, margin: '-100px' }

// Section reveal: fade + gentle rise.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUXE },
  },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_LUXE } },
}

// Photo / card reveal: fade + subtle scale (never from scale 0).
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_LUXE },
  },
}

// Stagger container.
export const stagger = (staggerChildren = 0.07, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Press feedback for any pressable element.
export const tap = { scale: 0.97 }
export const tapTransition = { duration: 0.14, ease: EASE_OUT }
