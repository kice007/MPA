import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  animate as animateValue,
} from 'framer-motion'
import {
  fadeUp,
  scaleIn,
  stagger,
  tap,
  tapTransition,
  EASE_OUT,
  VIEWPORT,
} from '../lib/motion'
import { ArrowRight, ArrowUpRight, Star } from './icons'

/* Flatten movement to opacity-only when the user prefers reduced motion. */
function useSafeVariants(variants) {
  const reduce = useReducedMotion()
  if (!reduce) return variants
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3 } },
  }
}

/* Scroll-triggered reveal (fires once). */
export function Reveal({
  children,
  variants = fadeUp,
  className = '',
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as]
  const safe = useSafeVariants(variants)
  return (
    <MotionTag
      className={className}
      variants={safe}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/* Stagger container — children use <StaggerItem>. */
export function Stagger({
  children,
  className = '',
  as = 'div',
  staggerChildren = 0.07,
  delayChildren = 0.05,
  ...rest
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  variants = fadeUp,
  className = '',
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as]
  const safe = useSafeVariants(variants)
  return (
    <MotionTag className={className} variants={safe} {...rest}>
      {children}
    </MotionTag>
  )
}

export { scaleIn }

/* Count-up number for the stats band. */
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  group = false,
  duration = 0.9,
  className = '',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animateValue(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, reduce, duration])

  const shown = group
    ? display.toLocaleString('fr-FR').replace(/ |,/g, ' ')
    : String(display)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

/* Star rating row. */
export function Stars({ count = 5, className = 'text-gold', size = 13, gap = 2 }) {
  return (
    <span className={`inline-flex ${className}`} style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Pill — the site's signature CTA (label + circular arrow badge).
 * ------------------------------------------------------------------ */
const PILL_VARIANTS = {
  // espresso pill, cream label, gold badge (section CTAs on cream)
  dark: {
    pill: 'bg-espresso',
    label: 'text-cream',
    badge: 'bg-gold',
    arrow: 'text-espresso',
  },
  // cream pill, espresso label, espresso badge (navbar, hero)
  light: {
    pill: 'bg-offwhite',
    label: 'text-espresso',
    badge: 'bg-espresso',
    arrow: 'text-offwhite',
  },
  // gold pill, espresso label, espresso badge (mobile menu primary)
  gold: {
    pill: 'bg-gold',
    label: 'text-espresso',
    badge: 'bg-espresso',
    arrow: 'text-gold',
  },
}

export function Pill({
  label,
  href = '#',
  variant = 'dark',
  icon = 'up-right',
  size = 'md',
  full = false,
  className = '',
  labelColor,
}) {
  const s = PILL_VARIANTS[variant]
  const Icon = icon === 'right' ? ArrowRight : ArrowUpRight
  const pad = size === 'sm' ? 'py-1.5 pl-5 pr-1.5' : 'py-2 pl-6 pr-2'
  const badgeSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const text = size === 'sm' ? 'text-[13px]' : 'text-[15px]'
  return (
    <motion.a
      href={href}
      whileTap={tap}
      transition={tapTransition}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group inline-flex items-center justify-between gap-3 rounded-full ${pad} ${
        s.pill
      } ${full ? 'w-full' : 'w-fit'} ${className}`}
    >
      <span
        className={`${text} font-semibold ${s.label} whitespace-nowrap`}
        style={labelColor ? { color: labelColor } : undefined}
      >
        {label}
      </span>
      <span
        className={`flex ${badgeSize} shrink-0 items-center justify-center rounded-full ${s.badge}`}
      >
        <motion.span
          className="flex"
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: icon === 'up-right' ? -2 : 0 } }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <Icon size={18} className={s.arrow} />
        </motion.span>
      </span>
    </motion.a>
  )
}
