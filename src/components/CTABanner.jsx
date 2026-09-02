import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { asset } from '../lib/assets'
import { EASE_LUXE, EASE_OUT, tap, tapTransition } from '../lib/motion'
import { ArrowUpRight } from './icons'

const BG = asset('cta-strong.jpg')

export default function CTABanner() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section ref={ref} className="bg-cream px-5 py-16 lg:px-20 lg:py-[72px]">
      <div className="relative mx-auto max-w-[1273px] overflow-hidden rounded-[20px]">
        {/* Parallax background */}
        <motion.img
          src={BG}
          alt=""
          aria-hidden
          style={{ y }}
          className="absolute inset-0 h-[116%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/70" />

        {/* Content */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
          className="relative mx-auto flex max-w-[600px] flex-col items-center gap-5 px-6 py-24 text-center lg:py-32"
        >
          <span className="text-[11px] tracking-[3px] text-gold">
            VOTRE BEAUTÉ, VOTRE HISTOIRE
          </span>
          <h2 className="text-[36px] font-bold leading-[1.08] text-cream lg:text-[52px] lg:leading-[56px]">
            Prenez rendez-vous
            <br />
            dès aujourd'hui.
          </h2>
          <p className="text-[15px] text-[#B89E7E]">
            MPA vous reçoit dans un cadre d'exception.
          </p>
          <motion.a
            href="#"
            whileTap={tap}
            transition={tapTransition}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2"
          >
            <span className="text-[13px] font-semibold text-espresso">
              Réserver maintenant
            </span>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-espresso">
              <motion.span
                className="flex"
                variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <ArrowUpRight size={17} className="text-white" />
              </motion.span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
