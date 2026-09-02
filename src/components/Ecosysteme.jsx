import { motion } from 'framer-motion'
import { asset } from '../lib/assets'
import { Reveal, Pill } from './primitives'
import { fadeUp, EASE_LUXE } from '../lib/motion'

const PILLARS = [
  {
    category: 'MPA LE SALON',
    title: ['Luxury', 'Hair'],
    desc: 'Du soin capillaire aux tresses les plus sophistiquées, MPA Le Salon redéfinit le luxe pour la femme africaine. Chaque visite est une expérience personnalisée.',
    services: ['Tresses & Extensions premium', 'Tissages & MPA Virgin Hair', 'Soins capillaires & traitements'],
    cta: 'Visiter Le Salon',
    cta_color: '#120803',
    panel: '#111010',
    desc_color: '#B89E7E',
    image: asset('luxury_hair.jpg'),
    imageRight: false,
  },
  {
    category: 'MPA COSMETICS',
    title: ['MPA', 'Cosmetics'],
    desc: 'Des formules pensées pour la peau africaine, développées avec soin pour révéler votre éclat naturel. La science au service de votre beauté quotidienne.',
    services: ['Sérums & soins visage', 'Gamme corps & huiles précieuses', 'Édition LUXE — soins premium'],
    cta: 'Découvrir la gamme',
    cta_color: '#1c1410',
    panel: '#1c1410',
    desc_color: '#c4b49a',
    image: asset('MPA_cosmetic.jpg'),
    imageRight: true,
  },
  {
    category: 'MPA BEAUTY',
    title: ['MPA', 'Beauty'],
    desc: 'Des soins qui révèlent votre beauté sous son meilleur jour. Manucure, maquillage et soins du visage — chaque prestation est une expérience de luxe pensée pour vous.',
    services: ['Manucure & nail art premium', 'Maquillage professionnel', 'Soins du visage & bien-être'],
    cta: 'Prendre rendez-vous',
    cta_color: '#c4848a',
    panel: '#1a1014',
    desc_color: '#d4a8a8',
    image: asset('Screenshot 2026-06-23 202208.png'),
    imageRight: false,
  },
]

const imageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASE_LUXE } },
}

function Pillar({ p }) {
  const image = (
    <Reveal
      variants={imageReveal}
      className="group relative h-[320px] overflow-hidden lg:h-[760px] lg:w-1/2 lg:shrink-0"
    >
      <motion.img
        src={p.image}
        alt={p.title.join(' ')}
        className="h-full w-full object-cover"
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.6, ease: EASE_LUXE }}
      />
    </Reveal>
  )

  const panel = (
    <div
      className="flex w-full flex-col items-start justify-center gap-6 px-7 py-14 lg:w-1/2 lg:gap-7 lg:px-[80px] lg:py-16"
      style={{ backgroundColor: p.panel }}
    >
      <Reveal variants={fadeUp} className="flex flex-col items-start gap-6 lg:gap-7">
        <span className="text-[11px] tracking-[4px] text-gold">{p.category}</span>
        <h3 className="text-[44px] font-bold leading-[1] text-cream lg:text-[64px]">
          {p.title[0]}
          <br />
          {p.title[1]}
        </h3>
        <p
          className="max-w-[540px] text-[15px] leading-[26px]"
          style={{ color: p.desc_color }}
        >
          {p.desc}
        </p>
        <ul className="flex flex-col gap-2.5">
          {p.services.map((s) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="text-[14px]" style={{ color: p.desc_color }}>
                {s}
              </span>
            </li>
          ))}
        </ul>
        <Pill label={p.cta} variant="light" size="sm" labelColor={p.cta_color} />
      </Reveal>
    </div>
  )

  return (
    <div className={`flex flex-col lg:flex-row ${p.imageRight ? 'lg:flex-row-reverse' : ''}`}>
      {image}
      {panel}
    </div>
  )
}

export default function Ecosysteme() {
  return (
    <section id="ecosysteme" className="bg-cream">
      <Reveal variants={fadeUp} className="flex flex-col items-center gap-3 px-5 pb-10 pt-16 text-center lg:pb-12 lg:pt-20">
        <span className="text-[11px] tracking-[3px] text-gold">NOS 3 UNIVERS</span>
        <h2 className="text-[32px] font-bold text-ink lg:text-[48px]">
          L'Écosystème MPA
        </h2>
      </Reveal>

      <div className="flex flex-col gap-4 lg:gap-6">
        {PILLARS.map((p) => (
          <Pillar key={p.category} p={p} />
        ))}
      </div>

      <Reveal variants={fadeUp} className="flex justify-center px-5 py-16 lg:py-[72px]">
        <Pill label="Découvrir tout l'écosystème MPA" variant="dark" />
      </Reveal>
    </section>
  )
}
