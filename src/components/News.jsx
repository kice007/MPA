import { motion } from 'framer-motion'
import { asset } from '../lib/assets'
import { Reveal, Stagger, StaggerItem } from './primitives'
import { fadeUp, EASE_LUXE } from '../lib/motion'

const FEATURED = {
  cat: 'Beauté Africaine',
  date: '2 Juin 2025',
  title: 'Comment choisir les meilleurs soins pour votre type de peau',
  img: asset('news-huile-pailletee.jpg'),
}

const ARTICLES = [
  {
    cat: 'Soin Capillaire',
    date: '15 Juin 2025',
    title: 'Les secrets d\'une repousse saine pour les cheveux texturés',
    img: 'https://images.unsplash.com/photo-1770664615146-7b954eab5673?auto=format&fit=crop&w=300&q=70',
  },
  {
    cat: 'Beauté Africaine',
    date: '2 Juin 2025',
    title: 'Comment choisir les meilleurs soins pour votre type de peau',
    img: 'https://images.unsplash.com/photo-1646987116480-682aacd6ff32?auto=format&fit=crop&w=300&q=70',
  },
  {
    cat: 'Nail Art',
    date: '20 Mai 2025',
    title: 'Tendances nail art été 2025 : les couleurs qui subliment les peaux foncées',
    img: 'https://images.unsplash.com/photo-1699726242756-54a80b68405a?auto=format&fit=crop&w=300&q=70',
  },
]

const imageReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASE_LUXE } },
}

function Meta({ cat, date }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] tracking-[2px] text-gold">{cat}</span>
      <span className="text-[10px] text-[#B89E7E]">{date}</span>
    </div>
  )
}

export default function News() {
  return (
    <section className="bg-cream px-5 py-16 lg:px-20 lg:py-[72px]">
      <div className="mx-auto max-w-[1440px]">
        <Reveal variants={fadeUp} className="mb-8 flex items-center justify-between lg:mb-12">
          <h2 className="text-[30px] font-bold text-ink lg:text-[44px]">News &amp; Blog</h2>
          <a
            href="#"
            className="group inline-flex items-center gap-1 text-[13px] font-semibold text-gold"
          >
            Tous les articles
            <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
          {/* Featured */}
          <a href="#" className="group block">
            <Reveal variants={imageReveal} className="overflow-hidden rounded-sm">
              <motion.img
                src={FEATURED.img}
                alt={FEATURED.title}
                className="aspect-[781/506] w-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: EASE_LUXE }}
              />
            </Reveal>
            <div className="flex flex-col gap-2 pt-5">
              <Meta cat={FEATURED.cat} date={FEATURED.date} />
              <h3 className="max-w-[560px] text-[18px] font-semibold leading-[24px] text-ink transition-colors duration-200 group-hover:text-gold lg:text-[16px]">
                {FEATURED.title}
              </h3>
            </div>
          </a>

          {/* Article list */}
          <Stagger className="flex flex-col">
            {ARTICLES.map((a) => (
              <StaggerItem key={a.title} variants={fadeUp}>
                <a
                  href="#"
                  className="group flex items-start gap-3.5 border-b border-[#E8E0D0] py-5"
                >
                  <div className="h-[68px] w-[96px] shrink-0 overflow-hidden rounded-sm">
                    <motion.img
                      src={a.img}
                      alt=""
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: EASE_LUXE }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Meta cat={a.cat} date={a.date} />
                    <p className="text-[14px] font-semibold leading-[20px] text-ink transition-colors duration-200 group-hover:text-gold">
                      {a.title}
                    </p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
