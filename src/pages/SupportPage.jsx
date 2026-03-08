import { Link } from 'react-router-dom'
import {
  IoCallOutline,
  IoChatboxEllipsesOutline,
  IoChevronForwardOutline,
  IoMailOutline,
} from 'react-icons/io5'
import { hotels } from '../data/hotels'

const supportChannels = [
  {
    title: 'Call Support',
    value: '+91 98765 43210',
    body: 'Best for urgent help like check-in issues, booking errors, or immediate cancellation support.',
    icon: IoCallOutline,
    image: hotels[0].images[2],
  },
  {
    title: 'Email Desk',
    value: 'help@aarambhstays.com',
    body: 'Ideal for billing questions, invoice updates, and non-urgent follow-ups with full context.',
    icon: IoMailOutline,
    image: hotels[1].images[0],
  },
  {
    title: 'Live Chat',
    value: 'Avg reply under 3 min',
    body: 'Quick updates on booking status, policy clarifications, and travel assistance before arrival.',
    icon: IoChatboxEllipsesOutline,
    image: hotels[2].images[0],
  },
]

const supportTopics = [
  'Booking creation, modifications, and date changes',
  'Cancellation requests and refund tracking',
  'Hotel check-in support and special requests',
  'Corporate invoicing and GST documentation',
  'Escalations for unresolved property-side issues',
]

function SupportPage() {
  return (
    <section>
      {/* Header */}
      <header className="mb-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
          We're Here To Help
        </p>
        <h1 className="font-serif mt-3 text-4xl font-semibold text-[var(--color-charcoal)] sm:text-5xl">
          Help Center
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          Need help with booking, modification, cancellation, or check-in? Our support team is available 24x7.
        </p>
        <div className="divider-gold mx-auto mt-5" />

        <div className="relative mt-8 overflow-hidden rounded-lg">
          <img
            src={hotels[1].images[1]}
            alt="Support team assistance"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-end p-5 sm:p-8">
            <p className="max-w-md text-left text-sm leading-relaxed text-white/90 sm:text-base">
              Every query is tracked with priority so you get clear updates from booking to check-in.
            </p>
          </div>
        </div>
      </header>

      {/* Support Channels */}
      <div className="grid gap-6 md:grid-cols-3">
        {supportChannels.map((channel) => (
          <article key={channel.title} className="card-hover overflow-hidden rounded-lg bg-white">
            <img
              src={channel.image}
              alt={channel.title}
              className="h-36 w-full object-cover"
            />
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)]">
                <channel.icon className="text-xl text-[var(--color-gold)]" />
              </div>
              <h2 className="font-serif mt-4 text-xl font-semibold text-[var(--color-charcoal)]">
                {channel.title}
              </h2>
              <p className="mt-2 text-sm font-semibold text-[var(--color-charcoal)]">{channel.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{channel.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Topics Section */}
      <div className="mt-12 rounded-lg bg-white p-6 sm:p-8">
        <h3 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">
          What We Can Help You With
        </h3>
        <div className="divider-gold mt-3" />
        <div className="mt-6 grid gap-3">
          {supportTopics.map((topic) => (
            <p key={topic} className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
              <IoChevronForwardOutline className="text-xs text-[var(--color-gold)]" />
              {topic}
            </p>
          ))}
        </div>
        <div className="mt-6 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs text-[var(--color-muted)]">
          <span className="font-semibold">Escalation desk:</span> grievance@aarambhstays.com - Standard resolution time: within 24 hours
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <Link to="/faq" className="btn-primary">
          Read FAQ
        </Link>
        <Link to="/contact" className="btn-outline">
          Contact Us
        </Link>
      </div>
    </section>
  )
}

export default SupportPage
