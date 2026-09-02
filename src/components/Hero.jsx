import { motion, useReducedMotion } from 'framer-motion'
import { EASE_LUXE, EASE_OUT, tap, tapTransition } from '../lib/motion'
import { IMG } from '../lib/assets'
import { ArrowUpRight } from './icons'
import { Stars as StarRow } from './primitives'
import ScaledCanvas from './ScaledCanvas'

const HEADLINE = ['CHAQUE FEMME', "MERITE D'ETRE", 'SUBLIME']

function DiscoverPill() {
  return (
    <motion.a
      href="#ecosysteme"
      whileTap={tap}
      transition={tapTransition}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group inline-flex items-center gap-2 rounded-full bg-offwhite py-2 pl-5 pr-2"
    >
      <span className="text-[13px] font-semibold text-espresso">Découvrir MPA</span>
      <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-espresso">
        <motion.span
          className="flex"
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <ArrowUpRight size={17} className="text-offwhite" />
        </motion.span>
      </span>
    </motion.a>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_LUXE } },
  }
  const lineMask = {
    hidden: reduce ? { opacity: 0 } : { y: '110%' },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE_LUXE } },
  }

  const at = (x, y, w) => ({ position: 'absolute', left: x, top: y, width: w })

  return (
    <section className="relative overflow-hidden bg-espresso">
      {/* ================= DESKTOP : plein écran, image collée au bas ================= */}
      <div className="hidden lg:block">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="relative mx-auto h-full max-w-[1440px]">
            <motion.div
              initial={reduce ? { opacity: 0 } : { scale: 1.06, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: EASE_LUXE }}
              className="absolute bottom-0 right-0 h-[100%] w-[840px] bg-contain bg-bottom bg-no-repeat"
              style={{ backgroundImage: `url("${IMG.hero}")`, transformOrigin: 'bottom center' }}
            />
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex min-h-[calc(100svh-117px)] w-full max-w-[1440px] flex-col justify-center px-[80px]"
        >
          <motion.p variants={item} className="text-[11px] tracking-[3px] text-gold">
            MAISON DE BEAUTÉ AFRICAINE · DEPUIS 2014
          </motion.p>
          <h1 className="mt-6 max-w-[620px] text-[80px] font-bold leading-[83px] text-offwhite">
            {HEADLINE.map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.span variants={lineMask} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p variants={item} className="mt-8 max-w-[460px] text-[16px] leading-[26px] text-white">
            Un écosystème beauté complet pensé pour la femme africaine d'aujourd'hui.
          </motion.p>
          <motion.div variants={item} className="mt-7">
            <DiscoverPill />
          </motion.div>
          <motion.div variants={item} className="mt-6 flex items-center gap-2">
            <StarRow className="text-gold" size={13} />
            <span className="text-[12px] text-mocha">4.9 · 200+ clientes satisfaites</span>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-[1440px] justify-end px-[80px]">
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_LUXE, delay: 0.7 }}
              className="mb-10 w-[250px] text-right text-[13px] italic text-mocha"
            >
              « L'élégance africaine
              <br />
              réinventée pour le monde. »
            </motion.p>
          </div>
        </div>
      </div>

      {/* ================= MOBILE : reproduction exacte de la frame "Hero mobile" (375×670) ================= */}
      <div className="lg:hidden">
        <ScaledCanvas width={375} height={670}>
          {/* Image @ (0,111) 446×559, bg-cover, rounded-8 */}
          <motion.div
            aria-hidden
            initial={reduce ? { opacity: 0 } : { scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: EASE_LUXE }}
            className="absolute rounded-[8px] bg-cover bg-center bg-no-repeat"
            style={{ left: 0, top: 111, width: 446, height: 559, backgroundImage: `url("${IMG.hero}")`, transformOrigin: 'center bottom', zIndex: 0 }}
          />

          <motion.div variants={container} initial="hidden" animate="show" style={{ position: 'relative', zIndex: 1 }}>
            <motion.p variants={item} style={at(20, 36)} className="whitespace-nowrap text-[9px] tracking-[2px] text-gold">
              MAISON DE BEAUTÉ AFRICAINE · DEPUIS 2014
            </motion.p>

            <h1 style={at(20, 68, 335)} className="text-[38px] font-bold leading-[40px] text-offwhite">
              {HEADLINE.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span variants={lineMask} className="block">
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p variants={item} style={at(20, 488, 335)} className="text-[14px] leading-[23px] text-white">
              Un écosystème beauté complet pensé pour la femme africaine d'aujourd'hui.
            </motion.p>

            <motion.div variants={item} style={at(20, 554)}>
              <DiscoverPill />
            </motion.div>

            <motion.div variants={item} style={at(20, 613)} className="flex items-center gap-2">
              <StarRow className="text-gold" size={12} />
              <span className="whitespace-nowrap text-[11px] text-mocha">
                4.9 · 200+ clientes satisfaites
              </span>
            </motion.div>
          </motion.div>
        </ScaledCanvas>
      </div>
    </section>
  )
}
