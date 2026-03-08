import { useMemo, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowRightLong, FaStar } from 'react-icons/fa6'
import {
  IoBedOutline,
  IoCalendarOutline,
  IoCardOutline,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from 'react-icons/io5'
import { hotels } from '../data/hotels'
import NotFoundPage from './NotFoundPage'

const paymentOptions = [
  {
    title: 'Pay At Hotel',
    body: 'Book now, pay during check-in with zero hidden charges.',
    dark: false,
  },
  {
    title: 'Card / UPI',
    body: 'Secure digital payment with instant booking confirmation.',
    dark: false,
  },
  {
    title: 'EMI Plans',
    body: 'Split total into flexible monthly installments for long stays.',
    dark: false,
  },
  {
    title: 'Business Billing',
    body: 'Corporate invoicing and GST-ready receipts for teams.',
    dark: true,
  },
]

const bookingSteps = [
  {
    title: 'Consultation',
    body: 'Pick destination, room style, and trip dates based on your travel goal.',
  },
  {
    title: 'Room Selection',
    body: 'Compare features, cancellation terms, and final pricing in one flow.',
  },
  {
    title: 'Booking Confirmed',
    body: 'Complete payment and receive instant confirmation with support details.',
  },
]

function HeroImageSlider({ hotel }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const total = hotel.images.length

  const goNext = useCallback(() => {
    setActiveIdx((i) => (i + 1) % total)
  }, [total])

  const goPrev = useCallback(() => {
    setActiveIdx((i) => (i - 1 + total) % total)
  }, [total])

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Main Image */}
      <div className="relative h-[22rem] w-full sm:h-[28rem]">
        {hotel.images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${hotel.name} — Photo ${idx + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out"
            style={{
              opacity: idx === activeIdx ? 1 : 0,
              transform: idx === activeIdx ? 'scale(1)' : 'scale(1.05)',
            }}
          />
        ))}
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-sm bg-white/90 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm">
        <IoLocationOutline className="text-sm" />
        {hotel.location}
      </div>
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-sm bg-[var(--color-charcoal)]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
        <FaStar className="text-[10px] text-[var(--color-gold)]" />
        {hotel.rating}
      </div>

      {/* Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--color-charcoal)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--color-charcoal)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
          >
            ›
          </button>
        </>
      )}

      {/* Image counter */}
      <div className="absolute bottom-16 right-4 z-10 rounded-sm bg-black/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
        {activeIdx + 1} / {total}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="absolute right-0 bottom-0 left-0 z-10 flex justify-center gap-2 bg-gradient-to-t from-black/40 to-transparent px-4 pb-3 pt-8">
          {hotel.images.map((src, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setActiveIdx(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`h-12 w-16 overflow-hidden rounded-sm border-2 transition-all duration-300 ${idx === activeIdx
                  ? 'border-white shadow-lg scale-105'
                  : 'border-transparent opacity-60 hover:opacity-90'
                }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function HotelDetailPage() {

  const { hotelId } = useParams()
  const hotel = useMemo(() => hotels.find((item) => item.id === hotelId), [hotelId])

  const catalogHotels = useMemo(() => {
    if (!hotel) return []
    const base = [hotel, ...hotels.filter((item) => item.id !== hotel.id)]
    const items = [...base]
    for (let index = 0; items.length < 4; index += 1) {
      items.push(base[index % base.length])
    }
    return items.slice(0, 4)
  }, [hotel])

  if (!hotel) {
    return <NotFoundPage />
  }

  return (
    <section className="space-y-12">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase no-underline transition-colors hover:text-[var(--color-charcoal)]"
      >
        <FaArrowRightLong className="rotate-180 text-[10px]" />
        Back to stays
      </Link>

      {/* Hero Section */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
            Featured Stay
          </p>
          <h1 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl lg:text-5xl">
            {hotel.name}
          </h1>
          <div className="divider-gold mt-4" />
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
            {hotel.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/booking/${hotel.id}`} className="btn-primary">
              Reserve Now
              <FaArrowRightLong className="text-xs" />
            </Link>
            <Link to="/support" className="btn-outline">
              Talk to Support
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="rounded-sm bg-white p-3">
              <p className="text-[9px] font-bold tracking-wider text-[var(--color-light-muted)] uppercase">
                Rating
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-lg font-semibold text-[var(--color-charcoal)]">
                <FaStar className="text-xs text-[var(--color-gold)]" />
                {hotel.rating}
              </p>
            </div>
            <div className="rounded-sm bg-white p-3">
              <p className="text-[9px] font-bold tracking-wider text-[var(--color-light-muted)] uppercase">
                Per Night
              </p>
              <p className="mt-1.5 text-lg font-semibold text-[var(--color-charcoal)]">
                ₹{hotel.pricePerNight.toLocaleString()}
              </p>
            </div>
            <div className="rounded-sm bg-white p-3">
              <p className="text-[9px] font-bold tracking-wider text-[var(--color-light-muted)] uppercase">
                Room
              </p>
              <p className="mt-1.5 line-clamp-2 text-xs font-semibold text-[var(--color-dark)]">
                {hotel.roomType}
              </p>
            </div>
          </div>
        </div>

        <HeroImageSlider hotel={hotel} />
      </div>

      {/* Build Quality Section */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
            Build Quality
          </p>
          <h2 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
            Modern Stay Experience
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
            Signature interiors, curated amenities, and dependable service standards designed for smooth check-in and memorable stays.
          </p>
          <div className="mt-5 overflow-hidden rounded-lg">
            <img
              src={hotel.images[1]}
              alt={`${hotel.name} architecture`}
              className="h-60 w-full object-cover sm:h-72"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:content-center">
          {[hotel.highlights[0], hotel.highlights[1], hotel.inclusions[0]].map((item) => (
            <div key={item} className="rounded-sm bg-white p-5">
              <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
                Feature
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--color-dark)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Catalog Section */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Catalog
            </p>
            <h3 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
              Stays You Can Book This Season
            </h3>
          </div>
          <p className="text-xs text-[var(--color-light-muted)]">
            Curated with trusted partners across India
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {catalogHotels.map((stay, index) => (
            <Link
              key={`${stay.id}-${index}`}
              to={`/hotel/${stay.id}`}
              className="card-hover group overflow-hidden rounded-lg bg-white text-inherit no-underline"
            >
              <div className="overflow-hidden">
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-serif line-clamp-1 text-base font-semibold text-[var(--color-charcoal)]">
                  {stay.name}
                </p>
                <p className="text-xs text-[var(--color-light-muted)]">
                  from ₹{stay.pricePerNight.toLocaleString()} / night
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Payment Options */}
      <div>
        <h4 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
          Payment Options
        </h4>
        <div className="divider-gold mt-3" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {paymentOptions.map((option) => (
            <div
              key={option.title}
              className={`rounded-sm p-5 ${option.dark
                ? 'bg-[var(--color-charcoal)] text-white'
                : 'bg-white text-[var(--color-charcoal)]'
                }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border ${option.dark ? 'border-white/20' : 'border-black/10'
                  }`}
              >
                <IoCardOutline className="text-sm" />
              </div>
              <p className="mt-4 text-sm font-semibold">{option.title}</p>
              <p className={`mt-1.5 text-xs leading-relaxed ${option.dark ? 'text-white/60' : 'text-[var(--color-muted)]'}`}>
                {option.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Steps */}
      <div>
        <h5 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
          Three Steps To Your Stay
        </h5>
        <div className="divider-gold mt-3" />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {bookingSteps.map((step, index) => (
            <div key={step.title} className="rounded-sm bg-white p-5">
              <span className="text-3xl font-light text-[var(--color-gold)]">
                0{index + 1}
              </span>
              <p className="mt-3 text-sm font-semibold text-[var(--color-charcoal)]">
                {step.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 rounded-sm bg-white p-5 text-sm text-[var(--color-muted)] md:grid-cols-2 xl:grid-cols-4">
          <p className="inline-flex items-center gap-2">
            <IoBedOutline className="text-base text-[var(--color-gold)]" />
            {hotel.roomType}
          </p>
          <p className="inline-flex items-center gap-2">
            <IoCalendarOutline className="text-base text-[var(--color-gold)]" />
            {hotel.checkInTime} check-in
          </p>
          <p className="inline-flex items-center gap-2">
            <IoTimeOutline className="text-base text-[var(--color-gold)]" />
            {hotel.checkOutTime} check-out
          </p>
          <p className="inline-flex items-center gap-2">
            <IoShieldCheckmarkOutline className="text-base text-[var(--color-gold)]" />
            {hotel.cancellationPolicy}
          </p>
        </div>
      </div>

      {/* House Rules */}
      <div>
        <h6 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
          House Rules & Inclusions
        </h6>
        <div className="divider-gold mt-3" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-sm bg-white p-5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
              Inclusions
            </p>
            <div className="mt-4 grid gap-2.5">
              {hotel.inclusions.map((item) => (
                <p key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]">
                  <IoCheckmarkCircleOutline className="text-[var(--color-gold)]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-sm bg-white p-5">
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
              House Rules
            </p>
            <div className="mt-4 grid gap-2.5">
              {hotel.houseRules.map((item) => (
                <p key={item} className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]">
                  <IoCheckmarkCircleOutline className="text-[var(--color-muted)]" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HotelDetailPage
