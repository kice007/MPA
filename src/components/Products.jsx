import { motion } from 'framer-motion'
import { asset } from '../lib/assets'
import { Reveal, Stagger, StaggerItem, Pill } from './primitives'
import { fadeUp, EASE_OUT, EASE_LUXE } from '../lib/motion'
import { Star } from './icons'

const PRODUCTS = [
  { title: 'MPA Virgin Hair Bundles', price: '10.000F', filled: 5, img: asset('product_1.png') },
  { title: "Éclat d'Afrique Sérum", price: '15.000F', filled: 5, img: asset('product_2.png') },
  { title: 'Masque Lumière Intense', price: '8.000F', filled: 4, img: asset('Screenshot 2026-06-23 203058-Photoroom.png') },
  { title: 'Huile de Soin Capillaire', price: '15.000F', filled: 5, img: asset('aaa.png') },
]

function CardStars({ filled }) {
  return (
    <span className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className={i < filled ? 'text-gold' : 'text-gold/25'} />
      ))}
    </span>
  )
}

function ProductCard({ p }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
      className="group overflow-hidden rounded-[4px] bg-transparent"
    >
      <div className="relative h-[300px] overflow-hidden bg-clay lg:h-[365px]">
        <motion.img
          src={p.img}
          alt={p.title}
          className="absolute inset-0 h-full w-full object-contain p-6"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: EASE_LUXE }}
        />
        {/* Add-to-cart bar — slides up on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink py-3.5 text-center transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="text-[13px] font-semibold text-cream">
            Ajouter au panier →
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 px-4 pb-5 pt-4">
        <p className="text-[14px] font-semibold text-ink">{p.title}</p>
        <CardStars filled={p.filled} />
        <p className="text-[16px] font-bold text-ink">{p.price}</p>
      </div>
    </motion.div>
  )
}

export default function Products() {
  return (
    <section className="bg-cream px-5 py-16 lg:px-20 lg:py-[72px]">
      <div className="mx-auto max-w-[1440px]">
        <Reveal variants={fadeUp} className="mb-10 flex flex-col items-center gap-2.5 text-center lg:mb-12">
          <span className="text-[11px] tracking-[3px] text-gold">
            Produits Vedettes
          </span>
          <h2 className="text-[32px] font-bold text-ink lg:text-[48px]">
            Produits Phares
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5" staggerChildren={0.06}>
          {PRODUCTS.map((p) => (
            <StaggerItem key={p.title} variants={fadeUp}>
              <ProductCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal variants={fadeUp} className="mt-12 flex justify-center">
          <Pill label="Aller à la boutique" variant="dark" />
        </Reveal>
      </div>
    </section>
  )
}
