import { Stagger, StaggerItem, CountUp } from './primitives'
import { fadeUp } from '../lib/motion'

const STATS = [
  { count: { value: 2014 }, label: 'Fondée à Abidjan', sub: 'par Marie-Paule Adjé' },
  { count: { value: 5000, prefix: '+', group: true }, label: 'Femmes sublimées', sub: "depuis l'ouverture" },
  { count: { value: 3 }, label: 'Univers beauté', sub: 'Salon · Cosmetics · Beauty' },
  { count: { value: 200, suffix: '+' }, label: 'Soins & produits', sub: 'dans notre catalogue' },
]

export default function Stats() {
  return (
    <section className="bg-espresso px-5 py-14 lg:px-20 lg:py-0 lg:h-[311px] lg:flex lg:items-center">
      <Stagger
        as="div"
        className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-y-10 lg:flex lg:items-center lg:justify-between lg:gap-0"
        staggerChildren={0.1}
      >
        {STATS.map((s, i) => (
          <StaggerItem
            key={i}
            variants={fadeUp}
            className="flex flex-1 flex-col items-center gap-2 text-center lg:relative"
          >
            <span className="text-[52px] font-bold leading-none tracking-[-1px] text-cream lg:text-[64px]">
              {s.count ? <CountUp {...s.count} /> : s.display}
            </span>
            <span className="text-[13px] font-semibold tracking-[1px] text-gold">
              {s.label}
            </span>
            <span className="text-[11px] text-quote">{s.sub}</span>
            {i < STATS.length - 1 && (
              <span className="absolute right-0 hidden h-16 w-px bg-[#2E1A0E] lg:block" />
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
