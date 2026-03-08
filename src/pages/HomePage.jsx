import { Link } from 'react-router-dom'
import { FaArrowRightLong } from 'react-icons/fa6'
import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoFlashOutline,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
  IoStarSharp,
} from 'react-icons/io5'
import { hotels } from '../data/hotels'

const featuredStays = [...hotels, hotels[0]].slice(0, 4).map((hotel, index) => ({
  ...hotel,
  projectYear: 2024 - index,
}))

const partnerMarks = ['ARCHITECTURE', 'TRENDS', 'INTERIORS', 'BUILDING', 'STYLE', 'DESIGN']

const stayPillars = [
  {
    title: 'Design-Led Comfort',
    description: 'Thoughtful layouts, natural textures, and calming palettes that feel premium from first step.',
    points: ['Layered lighting', 'Quiet sleep zones'],
    icon: IoSparklesOutline,
  },
  {
    title: 'Fast, Flexible Booking',
    description: 'Clear plans and cancellation terms so guests can book confidently without hidden surprises.',
    points: ['Plan transparency', 'Real-time support'],
    icon: IoFlashOutline,
  },
  {
    title: 'Trusted Stay Standards',
    description: 'Every property follows quality checks on hygiene, hospitality readiness, and service response.',
    points: ['Verified listings', 'Guest-first response'],
    icon: IoShieldCheckmarkOutline,
  },
]

const bookingFlow = [
  {
    step: '01',
    title: 'Pick Your Destination',
    description: 'Browse verified stays across top cities and compare room styles in one view.',
    icon: IoLeafOutline,
  },
  {
    step: '02',
    title: 'Choose The Right Plan',
    description: 'Select flexible or value plans with complete check-in and cancellation details.',
    icon: IoCalendarOutline,
  },
  {
    step: '03',
    title: 'Confirm In Seconds',
    description: 'Receive instant booking confirmation and travel-ready support from our team.',
    icon: IoCheckmarkCircleOutline,
  },
]

const faqPreview = [
  {
    question: 'How quickly is booking confirmed?',
    answer: 'Most stays are confirmed instantly once your payment succeeds.',
  },
  {
    question: 'Can I change travel dates later?',
    answer: 'Yes, flexible plans allow smoother date changes based on room availability.',
  },
  {
    question: 'What payment methods are available?',
    answer: 'UPI, cards, and net banking are supported for secure checkout.',
  },
  {
    question: 'When does refund get processed?',
    answer: 'Approved refunds are generally completed within 5-7 working days.',
  },
]

function HomePage() {
  return (
    <section className="space-y-16">
      {/* Hero Section */}
      <header className="text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
          Curated Hospitality
        </p>
        <h1 className="font-serif mt-4 text-4xl font-semibold leading-tight text-[var(--color-charcoal)] sm:text-5xl lg:text-6xl">
          Where Every Stay Tells<br />
          <span className="italic text-[var(--color-gold)]">A Beautiful Story</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          Premium residences designed around comfort, clarity, and modern living. Discover stays that redefine your travel experience.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/destinations" className="btn-primary">
            Explore Stays
            <FaArrowRightLong className="text-xs" />
          </Link>
          <Link to="/about" className="btn-outline">
            Our Story
          </Link>
        </div>
      </header>

      {/* Featured Stays Grid */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Featured Collection
            </p>
            <h2 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
              Handpicked Stays
            </h2>
          </div>
          <Link
            to="/destinations"
            className="hidden items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase no-underline transition-colors hover:text-[var(--color-charcoal)] sm:inline-flex"
          >
            View all
            <FaArrowRightLong className="text-[10px]" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStays.map((hotel, index) => (
            <article
              key={`${hotel.id}-${index}`}
              className="card-hover group relative overflow-hidden rounded-lg bg-white"
            >
              <Link
                to={`/hotel/${hotel.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${hotel.name}`}
              />
              <div className="overflow-hidden">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
                  {hotel.location}
                </p>
                <h3 className="font-serif mt-1.5 text-lg font-semibold text-[var(--color-charcoal)]">
                  {hotel.name}
                </h3>
                <p className="mt-1 text-xs text-[var(--color-light-muted)]">
                  From INR {hotel.pricePerNight.toLocaleString()} / night
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-muted)]">
                  <IoStarSharp className="text-[12px] text-[var(--color-gold)]" />
                  {hotel.rating.toFixed(1)} guest rating
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Large Featured Image */}
      <section className="overflow-hidden rounded-lg">
        <div className="relative">
          <img
            src={hotels[1].images[1]}
            alt="Modern stay exterior"
            className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Live Collection
            </p>
            <h3 className="font-serif mt-2 max-w-md text-2xl font-semibold text-white sm:text-3xl">
              Experience Spaces Designed For Living
            </h3>
          </div>
        </div>
      </section>

      {/* Signature Pillars */}
      <section className="rounded-lg border border-black/[0.06] bg-white/70 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Why Guests Prefer Aarambh
            </p>
            <h3 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
              Signature Hospitality Layers
            </h3>
          </div>
          <Link
            to="/guidelines"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase no-underline transition-colors hover:text-[var(--color-charcoal)]"
          >
            View stay guidelines
            <FaArrowRightLong className="text-[10px]" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {stayPillars.map(({ title, description, points, icon: Icon }) => (
            <article
              key={title}
              className="card-hover rounded-md border border-black/[0.06] bg-[var(--color-ivory)] p-5"
            >
              <Icon className="text-xl text-[var(--color-gold)]" />
              <h4 className="font-serif mt-3 text-2xl font-semibold text-[var(--color-charcoal)]">
                {title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {points.map((point) => (
                  <span
                    key={point}
                    className="border border-black/[0.08] px-3 py-1 text-[10px] font-semibold tracking-wider text-[var(--color-light-muted)] uppercase"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-lg">
            <img
              src={hotels[0].images[2]}
              alt="Client experience"
              className="h-72 w-full object-cover sm:h-80 lg:h-96"
            />
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Guest Stories
            </p>
            <h3 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
              Voices Of Trust
            </h3>
            <div className="divider-gold mt-4" />

            <blockquote className="mt-6 border-l-2 border-[var(--color-gold)] pl-5 text-[15px] italic leading-relaxed text-[var(--color-muted)]">
              &ldquo;The clean lines, natural tones, and minimalist interior create such a calming atmosphere. Every detail was thoughtful. Highly recommend their stay curation.&rdquo;
            </blockquote>

            <div className="mt-5">
              <p className="text-sm font-semibold text-[var(--color-charcoal)]">Morgan Dufresne</p>
              <p className="text-xs text-[var(--color-light-muted)]">Founder, Vision Build</p>
            </div>

            <div className="mt-6 flex items-center gap-6">
              <div>
                <p className="font-serif text-4xl font-semibold text-[var(--color-charcoal)]">4.80</p>
                <p className="text-[10px] font-semibold tracking-wider text-[var(--color-light-muted)] uppercase">
                  Avg Rating
                </p>
              </div>
              <div className="h-10 w-px bg-black/10" />
              <div className="grid gap-1.5 text-sm text-[var(--color-muted)]">
                <p className="inline-flex items-center gap-2">
                  <IoCheckmarkCircleOutline className="text-[var(--color-gold)]" />
                  Premium Interiors
                </p>
                <p className="inline-flex items-center gap-2">
                  <IoCheckmarkCircleOutline className="text-[var(--color-gold)]" />
                  Transparent Pricing
                </p>
                <p className="inline-flex items-center gap-2">
                  <IoCheckmarkCircleOutline className="text-[var(--color-gold)]" />
                  Seamless Booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Journey */}
      <section>
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
            Booking Journey
          </p>
          <h3 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
            Three Steps To Check-In Ready
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
            From discovery to confirmation, each step is designed to stay quick, clear, and guest-friendly.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {bookingFlow.map(({ step, title, description, icon: Icon }) => (
            <article
              key={step}
              className="card-hover rounded-lg border border-black/[0.06] bg-white p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-4xl font-semibold text-[var(--color-charcoal)]">{step}</p>
                <Icon className="text-xl text-[var(--color-gold)]" />
              </div>
              <h4 className="font-serif mt-4 text-2xl font-semibold text-[var(--color-charcoal)]">
                {title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Partner Marks */}
      <section className="border-t border-black/[0.06] pt-10">
        <p className="text-center text-[10px] font-bold tracking-[0.3em] text-[var(--color-light-muted)] uppercase">
          Partnered With Industry Leaders
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {partnerMarks.map((mark) => (
            <span
              key={mark}
              className="rounded-none border border-black/[0.06] px-6 py-3 text-[10px] font-bold tracking-[0.2em] text-[var(--color-light-muted)] uppercase"
            >
              {mark}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="rounded-lg bg-[var(--color-cream)] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Before You Book
            </p>
            <h3 className="font-serif mt-2 text-3xl font-semibold text-[var(--color-charcoal)] sm:text-4xl">
              Quick Answers For Guests
            </h3>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase no-underline transition-colors hover:text-[var(--color-charcoal)]"
          >
            Full FAQ
            <FaArrowRightLong className="text-[10px]" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqPreview.map(({ question, answer }) => (
            <article
              key={question}
              className="rounded-md border border-black/[0.06] bg-white p-5"
            >
              <h4 className="font-serif text-xl font-semibold text-[var(--color-charcoal)]">
                {question}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/faq" className="btn-primary">
            Read All FAQs
            <FaArrowRightLong className="text-xs" />
          </Link>
          <Link to="/support" className="btn-outline">
            Contact Support
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden rounded-lg">
        <div className="relative">
          <img
            src={hotels[2].images[1]}
            alt="Luxury suite preview"
            className="h-64 w-full object-cover sm:h-72 lg:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-6 sm:p-10">
            <div className="max-w-lg">
              <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
                Next Experience
              </p>
              <h3 className="font-serif mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Your Perfect Escape Awaits
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Explore curated offers, business-friendly packages, and signature rooms across our destinations.
              </p>
              <Link to="/offers" className="btn-primary mt-6" style={{ background: 'var(--color-gold)' }}>
                View Offers
                <FaArrowRightLong className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HomePage
