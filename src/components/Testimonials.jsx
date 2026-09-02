import { Reveal } from './primitives'
import { fadeUp } from '../lib/motion'
import { Star } from './icons'

const ITEMS = [
  { name: 'Amina K.', city: 'Abidjan', filled: 5, date: 'Mars 2025', quote: '« MPA Le Salon a complètement transformé ma relation à mes cheveux. Les tresses que j\'ai reçues sont d\'une finesse exceptionnelle. »' },
  { name: 'Fatoumata D.', city: 'Paris', filled: 5, date: 'Avril 2025', quote: '« La gamme MPA Cosmetics est la seule qui respecte vraiment ma peau. Des produits pensés pour nous, par quelqu\'un qui nous comprend. »' },
  { name: 'Chloé M.', city: 'Lyon', filled: 4, date: 'Mai 2025', quote: '« L\'institut MPA Beauty est une parenthèse de luxe. Le nail art que j\'ai eu était parfait, l\'ambiance est incroyable. »' },
  { name: 'Aïcha B.', city: 'Dakar', filled: 5, date: 'Février 2025', quote: '« Mes tissages MPA Virgin Hair tiennent des mois sans perdre leur éclat. La qualité est tout simplement incomparable. »' },
  { name: 'Nadège K.', city: 'Abidjan', filled: 5, date: 'Mars 2025', quote: '« Le sérum Éclat d\'Afrique a changé ma peau en quelques semaines. Enfin une marque qui comprend nos carnations. »' },
  { name: 'Sarah T.', city: 'Bruxelles', filled: 5, date: 'Janvier 2025', quote: '« Un maquillage MPA Beauty pour mon mariage : sublime et tenue parfaite toute la journée. Merci à toute l\'équipe. »' },
  { name: 'Mariam S.', city: 'Bamako', filled: 4, date: 'Avril 2025', quote: '« Accueil chaleureux et vrai savoir-faire. MPA Le Salon est devenu mon rendez-vous beauté incontournable. »' },
]

function CardStars({ filled }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < filled ? 'text-gold' : 'text-gold/25'} />
      ))}
    </span>
  )
}

function Card({ t }) {
  return (
    <article className="flex h-[300px] w-[300px] shrink-0 flex-col justify-between rounded-[4px] bg-offwhite p-7 lg:w-[380px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-bold text-ink">{t.name}</p>
          <p className="text-[11px] text-gold">{t.city}</p>
        </div>
        <CardStars filled={t.filled} />
      </div>
      <p className="text-[15px] leading-[26px] text-quote">{t.quote}</p>
      <p className="text-[11px] text-[#B89E7E]">{t.date}</p>
    </article>
  )
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-cream py-16 lg:py-[72px]">
      <Reveal variants={fadeUp} className="mb-10 flex flex-col items-center gap-2.5 px-5 text-center lg:mb-12">
        <span className="text-[11px] tracking-[3px] text-gold">TÉMOIGNAGES</span>
        <h2 className="text-[30px] font-bold text-ink lg:text-[44px]">
          Ce que disent nos clientes
        </h2>
      </Reveal>

      {/* Auto slider — right to left, seamless loop, pauses on hover */}
      <div className="relative z-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee flex w-max gap-5" style={{ '--marquee-duration': '55s' }}>
          {ITEMS.map((t, i) => (
            <Card key={'a' + i} t={t} />
          ))}
          {ITEMS.map((t, i) => (
            <Card key={'b' + i} t={t} aria-hidden />
          ))}
        </div>
      </div>
    </section>
  )
}
