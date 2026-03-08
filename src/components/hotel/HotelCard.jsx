import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import ImageGallery from './ImageGallery'

function HotelCard({ hotel }) {
  return (
    <article className="card-hover group overflow-hidden rounded-lg bg-white">
      <ImageGallery hotel={hotel} />
      <div className="p-5">
        <p className="inline-flex items-center gap-1.5 text-xs text-[var(--color-light-muted)]">
          <IoLocationOutline className="text-sm" />
          {hotel.location}
        </p>
        <h2 className="font-serif mt-2 mb-2 text-xl font-semibold text-[var(--color-charcoal)]">
          {hotel.name}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {hotel.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-[var(--color-cream)] px-2.5 py-1 text-[9px] font-bold tracking-wider text-[var(--color-muted)] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
          {hotel.description}
        </p>

        {/* Room Info */}
        <div className="mt-3 rounded-sm bg-[var(--color-cream)] p-3">
          <p className="text-xs font-semibold text-[var(--color-dark)]">{hotel.roomType}</p>
          <p className="mt-1 text-[11px] text-[var(--color-light-muted)]">{hotel.cancellationPolicy}</p>
        </div>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hotel.amenities.map((amenity) => (
            <span
              key={amenity}
              className="rounded-sm border border-black/[0.06] px-2.5 py-1 text-[9px] font-semibold text-[var(--color-muted)]"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Price & Rating */}
        <div className="my-4 flex items-center justify-between">
          <p className="font-serif text-lg font-semibold text-[var(--color-charcoal)]">
            ₹{hotel.pricePerNight.toLocaleString()}
            <span className="text-xs font-normal text-[var(--color-light-muted)]"> / night</span>
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-charcoal)]">
            <FaStar className="text-xs text-[var(--color-gold)]" />
            {hotel.rating}
          </span>
        </div>

        {/* Actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to={`/hotel/${hotel.id}`}
            className="btn-outline justify-center py-2.5 text-[11px]"
          >
            View Details
          </Link>
          <Link
            to={`/booking/${hotel.id}`}
            className="btn-primary justify-center py-2.5 text-[11px]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  )
}

export default HotelCard
