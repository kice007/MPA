import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X, ArrowRight, ArrowUpRight, Phone, ShoppingBag } from './icons'
import { EASE_DRAWER, EASE_OUT, tap, tapTransition } from '../lib/motion'

const NAV_LINKS = [
  'Le salon',
  'Cosmetics',
  'Beauty',
  'Notre histoire',
  'Formation',
  'Contact',
]

const LOGO = '/assets/MPA_hair-Photoroom.png'

function DesktopLink({ label }) {
  return (
    <a
      href="#"
      className="group relative text-[14px] text-offwhite/90 transition-colors duration-200 hover:text-offwhite"
    >
      {label}
      <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  )
}

function NavPill({ label }) {
  return (
    <motion.a
      href="#"
      whileTap={tap}
      transition={tapTransition}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group flex items-center gap-2 rounded-full bg-offwhite py-1.5 pl-5 pr-1.5"
    >
      <span className="text-[13px] font-semibold text-espresso whitespace-nowrap">
        {label}
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-espresso">
        <motion.span
          className="flex"
          variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
        >
          <ArrowUpRight size={15} className="text-offwhite" />
        </motion.span>
      </span>
    </motion.a>
  )
}

function CartButton({ size = 22 }) {
  return (
    <motion.a
      href="#"
      aria-label="Panier"
      whileTap={{ scale: 0.9 }}
      transition={tapTransition}
      className="relative flex h-10 w-10 items-center justify-center text-offwhite transition-colors duration-200 hover:text-gold"
    >
      <ShoppingBag size={size} />
      <span className="absolute right-0.5 top-1 flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-gold px-[3px] text-[9px] font-bold text-espresso">
        2
      </span>
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-espresso transition-shadow duration-300 lg:static ${
          scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.35)]' : ''
        }`}
      >
        {/* Desktop */}
        <div className="mx-auto hidden h-[117px] w-full max-w-[1440px] items-center justify-between px-[72px] lg:flex">
          <img src={LOGO} alt="MPA" className="h-[33px] w-auto object-contain" />
          <nav className="flex items-center gap-[44px]">
            {NAV_LINKS.map((l) => (
              <DesktopLink key={l} label={l} />
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <CartButton />
            <NavPill label="Prendre RDV" />
          </div>
        </div>

        {/* Mobile bar */}
        <div className="flex h-16 items-center justify-between px-5 lg:hidden">
          <img src={LOGO} alt="MPA" className="h-7 w-auto object-contain" />
          <div className="flex items-center gap-1">
            <CartButton size={22} />
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-offwhite"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col bg-espresso lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, x: '100%' }}
          transition={{ duration: 0.34, ease: EASE_DRAWER }}
        >
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <img src={LOGO} alt="MPA" className="h-7 w-auto object-contain" />
            <button
              aria-label="Fermer le menu"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-offwhite"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-px w-full bg-white/10" />

          {/* Body */}
          <div className="flex flex-1 flex-col justify-between px-5 pb-8 pt-7">
            <motion.nav
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } } }}
            >
              <span className="mb-3.5 text-[11px] font-semibold tracking-[2.5px] text-gold">
                EXPLORER
              </span>
              {NAV_LINKS.map((label, i) => (
                <motion.a
                  key={label}
                  href="#"
                  onClick={onClose}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
                  }}
                  className="flex items-center justify-between border-b border-white/10 py-[17px]"
                >
                  <span className="flex items-center gap-3.5">
                    <span className="text-[12px] font-semibold text-gold">
                      0{i + 1}
                    </span>
                    <span className="text-[26px] font-semibold text-offwhite">
                      {label}
                    </span>
                  </span>
                  <ArrowUpRight size={20} className="text-mocha-2" />
                </motion.a>
              ))}
            </motion.nav>

            <div className="flex flex-col gap-5">
              <motion.a
                href="#"
                whileTap={tap}
                transition={tapTransition}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="group flex w-full items-center justify-between rounded-full bg-gold py-2 pl-6 pr-2"
              >
                <span className="text-[15px] font-bold text-espresso">
                  Prendre rendez-vous
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso">
                  <motion.span
                    className="flex"
                    variants={{ rest: { x: 0 }, hover: { x: 2 } }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  >
                    <ArrowRight size={18} className="text-gold" />
                  </motion.span>
                </span>
              </motion.a>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold" />
                <span className="text-[14px] font-medium text-offwhite">
                  +225 01 40 07 07 87
                </span>
              </div>
              <p className="text-[12px] text-white/60">
                @mpaluxuryhair · @mpacosmetics · @mpabeauty_
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
