import { Link } from 'react-router-dom'
import { IoLocationOutline, IoStarSharp } from 'react-icons/io5'
import { hotels } from '../data/hotels'

function DestinationsPage() {
  return (
    <section>
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
          Explore
        </p>
        <h1 className="font-serif mt-3 text-4xl font-semibold text-[var(--color-charcoal)] sm:text-5xl">
          Popular Destinations
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[var(--color-muted)]">
          Curated locations with top-rated stays for family trips, workcations, and luxury breaks.
        </p>
        <div className="divider-gold mx-auto mt-5" />
      </header>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <article key={hotel.id} className="card-hover group overflow-hidden rounded-lg bg-white">
            <div className="relative overflow-hidden">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-sm bg-white/90 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <IoStarSharp className="text-[var(--color-gold)]" />
                {hotel.rating}
              </div>
            </div>
            <div className="p-5">
              <p className="inline-flex items-center gap-1.5 text-xs text-[var(--color-light-muted)]">
                <IoLocationOutline />
                {hotel.location}
              </p>
              <h2 className="font-serif mt-2 text-xl font-semibold text-[var(--color-charcoal)]">
                {hotel.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {hotel.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-serif text-lg font-semibold text-[var(--color-charcoal)]">
                  ₹{hotel.pricePerNight.toLocaleString()}
                  <span className="text-xs font-normal text-[var(--color-light-muted)]"> / night</span>
                </p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  to={`/hotel/${hotel.id}`}
                  className="btn-outline justify-center py-2.5 text-[11px]"
                >
                  Explore
                </Link>
                <Link
                  to={`/booking/${hotel.id}`}
                  className="btn-primary justify-center py-2.5 text-[11px]"
                >
                  Reserve
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DestinationsPage
