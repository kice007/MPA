import { motion } from 'framer-motion'
import { IMG } from '../lib/assets'
import { Reveal } from './primitives'
import { fadeUp, EASE_LUXE, tap, tapTransition } from '../lib/motion'

const COLUMNS = [
  { heading: 'Nos Univers', links: ['MPA Le Salon', 'MPA Cosmetics', 'MPA Beauty'] },
  { heading: 'MPA', links: ['Notre Histoire', 'Instagram', 'Contact'] },
  {
    heading: 'INFORMATIONS LÉGALES',
    links: [
      'Mentions légales',
      'Conditions générales de vente',
      'Politique de confidentialité',
      'Politique des cookies',
    ],
  },
]

const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0.4 },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_LUXE },
  },
}

export default function Footer() {
  return (
    <footer className="bg-espresso px-5 pb-10 pt-16 lg:px-20 lg:pb-10 lg:pt-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Watermark */}
          <Reveal variants={clipReveal} className="shrink-0 self-center lg:self-start">
            <img
              src={IMG.logo}
              alt="MPA"
              className="mx-auto h-36 w-auto object-contain lg:h-[130px]"
            />
          </Reveal>

          {/* Links + newsletter */}
          <div className="flex flex-col gap-10 lg:items-end">
            <Reveal
              variants={fadeUp}
              className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3 lg:gap-x-20"
            >
              {COLUMNS.map((c) => (
                <div key={c.heading} className="flex flex-col gap-4">
                  <p className="text-[11px] tracking-[2px] text-gold">{c.heading}</p>
                  {c.links.map((l) => (
                    <a
                      key={l}
                      href="#"
                      className="text-[14px] text-offwhite/90 transition-colors duration-200 hover:text-gold"
                    >
                      {l}
                    </a>
                  ))}
                </div>
              ))}
            </Reveal>

            {/* Newsletter */}
            <form
              className="flex w-full items-center gap-1.5 lg:w-[549px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="h-[45px] flex-1 rounded-sm bg-[#1E0E06] px-3 text-[11px] text-offwhite outline outline-1 outline-[#2E1A0E] placeholder:text-[#5A4434] focus:outline-gold"
              />
              <motion.button
                type="submit"
                whileTap={tap}
                transition={tapTransition}
                aria-label="S'inscrire"
                className="flex h-[43px] w-[49px] items-center justify-center rounded-sm bg-gold text-[14px] font-bold text-espresso"
              >
                →
              </motion.button>
            </form>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-[#2E1A0E]" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-quote">© 2025 MPA. Tous droits réservés.</p>
          <p className="text-[12px] text-gold">
            @mpalesalon · @mpacosmetics · @mpabeauty_
          </p>
        </div>
      </div>
    </footer>
  )
}
