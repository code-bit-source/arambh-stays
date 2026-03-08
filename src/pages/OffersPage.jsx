import { Link } from 'react-router-dom'
import { IoGiftOutline } from 'react-icons/io5'
import { hotels } from '../data/hotels'

const offers = [
  {
    title: 'Early Bird Saver',
    details: 'Book 14+ days in advance and get up to 20% off on selected premium rooms.',
    badge: 'Popular',
    image: hotels[0].images[1],
  },
  {
    title: 'Weekend Escape',
    details: 'Flat INR 1,500 off on 2-night weekend stays with complimentary breakfast.',
    badge: 'Limited',
    image: hotels[1].images[2],
  },
  {
    title: 'Family Retreat',
    details: 'Free extra bed and meal plan for one child on family-friendly properties.',
    badge: 'Family',
    image: hotels[2].images[1],
  },
]

function OffersPage() {
  return (
    <section>
      {/* Header */}
      <header className="mb-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
          Special Deals
        </p>
        <h1 className="font-serif mt-3 text-4xl font-semibold text-[var(--color-charcoal)] sm:text-5xl">
          Current Offers
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-muted)]">
          Save more with active seasonal deals designed for smarter travel planning.
        </p>
        <div className="divider-gold mx-auto mt-5" />

        <div className="relative mt-8 overflow-hidden rounded-lg">
          <img
            src={hotels[0].images[0]}
            alt="Seasonal hotel offers"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-end p-5 sm:p-8">
            <p className="max-w-md text-left text-sm leading-relaxed text-white/90 sm:text-base">
              Limited-time pricing, long-stay perks, and curated add-ons across our most loved destinations.
            </p>
          </div>
        </div>
      </header>

      {/* Offers Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <article
            key={offer.title}
            className="card-hover group relative overflow-hidden rounded-lg bg-white"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-cream)]">
                  <IoGiftOutline className="text-lg text-[var(--color-gold)]" />
                </div>
                <span className="rounded-sm bg-[var(--color-charcoal)] px-2.5 py-1 text-[9px] font-bold tracking-wider text-white uppercase">
                  {offer.badge}
                </span>
              </div>
              <h2 className="font-serif mt-5 text-xl font-semibold text-[var(--color-charcoal)]">
                {offer.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {offer.details}
              </p>
              <Link
                to="/destinations"
                className="mt-6 inline-block text-xs font-semibold tracking-wide text-[var(--color-charcoal)] uppercase no-underline transition-colors hover:text-[var(--color-gold)]"
              >
                View eligible stays {'->'}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default OffersPage
