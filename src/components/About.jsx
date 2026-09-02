import { motion } from 'framer-motion'
import { asset, IMG } from '../lib/assets'
import ScaledCanvas from './ScaledCanvas'
import { EASE_LUXE, VIEWPORT } from '../lib/motion'
import { ArrowUpRight } from './icons'

// Collage images (verbatim filenames from design.pen)
const P = {
  strongboy: asset('about-strongboy.png'),
  masque: asset('about_4.png'),
  saveclip: asset('SaveClip.App_586701294_18397300210125511_3165108400937685293_n-Photoroom.png'),
  fardpaup: asset('about-fard-paupieres.png'),
  fardjoues: asset('about-fard-joues.png'),
  gemini: asset('Gemini_Generated_Image_2tj9id2tj9id2tj9-Photoroom.png'),
}

// Decorative rotated overlays ("Frame 9") — mobile only.
const M_FRAMES = [
  { x: 3.304, y: 36.299, w: 92, h: 143, rot: -97.686, z: 6 },
  { x: 245, y: 18.307, w: 92, h: 143, rot: -82.965, z: 7 },
]

function Frame9({ f }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: f.x,
        top: f.y,
        width: f.w,
        height: f.h,
        transform: `rotate(${f.rot}deg)`,
        transformOrigin: 'top left',
        zIndex: f.z,
        backgroundImage: `url("${P.gemini}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  )
}

// px positions read verbatim from the exported frames.
const D_BLOCKS = [
  { x: 37, y: 0, w: 310, h: 262, c: '#d3ac8b' },
  { x: 522, y: 0, w: 310, h: 262, c: '#120803' },
  { x: 1061, y: 0, w: 310, h: 262, c: '#d3ac8b' },
  { x: 279, y: 262, w: 310, h: 262, c: '#120803' },
  { x: 814, y: 262, w: 310, h: 262, c: '#120803' },
]
const D_PHOTOS = [
  { x: 37, y: -99, w: 285, h: 361, img: P.strongboy },
  { x: 546, y: -72, w: 250, h: 334, img: P.fardjoues },
  { x: 334, y: 185, w: 255, h: 339, img: P.fardpaup },
  { x: 814, y: 163, w: 285, h: 361, img: P.masque },
  { x: 1061, y: -115, w: 310, h: 377, img: P.saveclip },
]

const M_BLOCKS = [
  { x: 9, y: 41, w: 92, h: 86, c: '#d3ac8b' },
  { x: 69, y: 127, w: 92, h: 86, c: '#120803' },
  { x: 143, y: 41, w: 92, h: 86, c: '#120803' },
  { x: 218, y: 127, w: 92, h: 86, c: '#120803' },
  { x: 274, y: 41, w: 92, h: 86, c: '#d3ac8b' },
]
const M_PHOTOS = [
  { x: 9, y: 9, w: 92, h: 118, img: P.strongboy },
  { x: 90, y: 118, w: 71, h: 95, img: P.fardpaup },
  { x: 145, y: 9, w: 86, h: 118, img: P.fardjoues },
  { x: 275, y: -15, w: 96, h: 142, img: P.saveclip },
  { x: 218, y: 102, w: 82, h: 111, img: P.masque },
]

const tileVariant = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: EASE_LUXE } },
}
const staggerBox = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const headerVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_LUXE } },
}

function box({ x, y, w, h }, extra = {}) {
  return { position: 'absolute', left: x, top: y, width: w, height: h, ...extra }
}

function Strip({ blocks, photos }) {
  return (
    <motion.div variants={staggerBox} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {blocks.map((b, i) => (
        <motion.div key={'b' + i} variants={tileVariant} style={box(b, { background: b.c })} />
      ))}
      {photos.map((p, i) => (
        <motion.div key={'p' + i} variants={tileVariant} style={box(p, { overflow: 'hidden' })}>
          <img src={p.img} alt="" className="h-full w-full object-cover" />
        </motion.div>
      ))}
    </motion.div>
  )
}

function DarkPill({ label }) {
  return (
    <motion.a
      href="#"
      whileTap={{ scale: 0.97 }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group inline-flex items-center gap-3.5 rounded-full bg-espresso py-2 pl-[26px] pr-2"
    >
      <span className="text-[15px] font-semibold text-cream whitespace-nowrap">{label}</span>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold">
        <motion.span className="flex" variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }} transition={{ duration: 0.2 }}>
          <ArrowUpRight size={18} className="text-espresso" />
        </motion.span>
      </span>
    </motion.a>
  )
}

export default function About() {
  return (
    <section className="bg-cream">
      {/* ---------- Desktop : About Section (a4N7Aw), 1440×1066 ---------- */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1440px]">
          <ScaledCanvas width={1440} height={1220}>
            {/* Header */}
            <motion.div variants={headerVariant} initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <div style={box({ x: 80, y: 72, w: 560, h: 200 })}>
                <p className="text-[11px] tracking-[3px] text-gold">À PROPOS</p>
                <h2 className="mt-7 text-[60px] font-bold leading-[63px] text-ink">
                  Plus a propos de
                  <br />
                  MPA
                </h2>
              </div>
              <div style={box({ x: 720, y: 82, w: 640, h: 240 })} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img src={IMG.founder} alt="Marie-Paule Adjé" className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="text-[16px] font-bold text-ink">Marie-Paule Adjé</p>
                    <p className="text-[10px] tracking-[1px] text-gold">FONDATRICE · ACTRICE · ENTREPRENEUSE</p>
                  </div>
                </div>
                <p className="text-[15px] leading-[26px] text-quote">
                  « Plonger dans l'univers MPA, c'est rencontrer une vision où l'héritage africain se
                  mêle à l'exigence du luxe. Depuis 2014, nous accompagnons chaque femme dans sa propre
                  définition de l'élégance — avec expertise, passion et authenticité. »
                </p>
              </div>
            </motion.div>

            {/* Photo collage strip — pushed down to breathe below the header */}
            <div style={box({ x: 0, y: 470, w: 1440, h: 559 }, { zIndex: 1 })}>
              <Strip blocks={D_BLOCKS} photos={D_PHOTOS} />
            </div>

            {/* CTA pill — spaced below the collage */}
            <div style={box({ x: 608, y: 1110, w: 'auto', h: 'auto' }, { zIndex: 4 })}>
              <DarkPill label="Notre histoire" />
            </div>
          </ScaledCanvas>
        </div>
      </div>

      {/* ---------- Mobile : About Section (z4Q9sc), 375×746 ---------- */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-[440px]">
          <ScaledCanvas width={375} height={760}>
            <motion.div variants={headerVariant} initial="hidden" whileInView="show" viewport={VIEWPORT}>
              <p style={box({ x: 20, y: 48, w: 335, h: 'auto' })} className="text-[10px] tracking-[3px] text-gold">
                À PROPOS
              </p>
              <h2 style={box({ x: 20, y: 85, w: 335, h: 'auto' })} className="text-[36px] font-bold leading-[38px] text-ink">
                Plus a propos de
                <br />
                MPA
              </h2>
              <div style={box({ x: 20, y: 185, w: 335, h: 'auto' })} className="flex items-center gap-3">
                <img src={IMG.founder} alt="Marie-Paule Adjé" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-[14px] font-bold text-ink">Marie-Paule Adjé</p>
                  <p className="text-[9px] tracking-[1px] text-gold">FONDATRICE · ACTRICE · ENTREPRENEUSE</p>
                </div>
              </div>
              <p style={box({ x: 20, y: 257, w: 335, h: 'auto' })} className="text-[13px] leading-[22px] text-quote">
                « Plonger dans l'univers MPA, c'est rencontrer une vision où l'héritage africain se
                mêle à l'exigence du luxe. Depuis 2014, nous accompagnons chaque femme dans sa propre
                définition de l'élégance — avec expertise, passion et authenticité. »
              </p>
            </motion.div>

            {/* Photo collage strip — pushed down to breathe below the header */}
            <div style={box({ x: 0, y: 445, w: 375, h: 244 })}>
              <Strip blocks={M_BLOCKS} photos={M_PHOTOS} />
            </div>

            {/* Mobile CTA — compact, centered below the collage */}
            <div style={box({ x: 0, y: 710, w: 375 })} className="flex justify-center">
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 rounded-full bg-espresso py-1.5 pl-5 pr-1.5"
              >
                <span className="text-[13px] font-semibold text-cream">Notre histoire</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold">
                  <ArrowUpRight size={15} className="text-espresso" />
                </span>
              </a>
            </div>

            {/* Decorative overlays */}
            {M_FRAMES.map((f, i) => (
              <Frame9 key={i} f={f} />
            ))}
          </ScaledCanvas>
        </div>
      </div>
    </section>
  )
}
