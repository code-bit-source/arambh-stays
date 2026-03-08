import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoLocationOutline,
  IoPricetagOutline,
  IoTimeOutline,
} from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
import { hotels } from '../data/hotels'
import { getBookingsByEmail } from '../utils/bookingsStorage'

function ManageBookingsPage() {
  const { user, isLoggedIn } = useAuth()

  const bookings = useMemo(() => {
    const rows = getBookingsByEmail(user?.email)
    return rows.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
  }, [user?.email])

  const summary = useMemo(() => {
    const totals = {
      upcoming: 0,
      ongoing: 0,
      completed: 0,
      totalSpent: 0,
    }

    bookings.forEach((booking) => {
      const status = getBookingTimelineStatus(booking.checkIn, booking.checkOut)
      totals[status] += 1
      totals.totalSpent += Number(booking.amount) || 0
    })

    return totals
  }, [bookings])

  if (!isLoggedIn) {
    return (
      <section className="flex min-h-[55vh] items-center justify-center">
        <div className="max-w-md text-center">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
            Account Required
          </p>
          <h1 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)]">
            Sign in to view bookings
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
            Your confirmed bookings and stay history are available after login.
          </p>
          <Link
            to="/login"
            state={{ from: '/manage-bookings' }}
            className="btn-primary mt-6 justify-center"
          >
            Sign In
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-9">
      <header>
        <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
          Guest Dashboard
        </p>
        <h1 className="font-serif mt-3 text-4xl font-semibold text-[var(--color-charcoal)] sm:text-5xl">
          Manage Bookings
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-muted)]">
          Track upcoming stays, view booking details, and book your next trip quickly.
        </p>
        <div className="divider-gold mt-5" />
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Upcoming" value={summary.upcoming} />
        <SummaryCard label="Ongoing" value={summary.ongoing} />
        <SummaryCard label="Completed" value={summary.completed} />
        <SummaryCard label="Total Spent" value={`INR ${summary.totalSpent.toLocaleString('en-IN')}`} />
      </section>

      {bookings.length === 0 ? (
        <section className="rounded-lg bg-white p-8 text-center sm:p-10">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-light-muted)] uppercase">
            No Reservations Yet
          </p>
          <h2 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)]">
            Start your first booking
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-muted)]">
            Explore curated stays and complete your first reservation in a few steps.
          </p>
          <Link to="/destinations" className="btn-primary mt-6">
            Explore Destinations
          </Link>
        </section>
      ) : (
        <section className="grid gap-5">
          {bookings.map((booking) => {
            const status = getBookingTimelineStatus(booking.checkIn, booking.checkOut)
            const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
            const statusClass =
              status === 'upcoming'
                ? 'bg-sky-50 text-sky-700'
                : status === 'ongoing'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-emerald-50 text-emerald-700'

            const linkedHotel =
              hotels.find((hotel) => hotel.id === booking.hotelId) ||
              hotels.find((hotel) => hotel.name === booking.hotel)

            const hotelImage = booking.hotelImage || linkedHotel?.images?.[0]
            const hotelLink = booking.hotelId ? `/hotel/${booking.hotelId}` : '/destinations'
            const rebookLink = booking.hotelId ? `/booking/${booking.hotelId}` : '/destinations'

            return (
              <article key={booking.id} className="card-hover overflow-hidden rounded-lg bg-white">
                <div className="grid gap-0 md:grid-cols-[260px_1fr]">
                  <div className="h-52 w-full overflow-hidden md:h-full">
                    {hotelImage ? (
                      <img src={hotelImage} alt={booking.hotel} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[var(--color-cream)] text-[var(--color-light-muted)]">
                        <IoHomeOutline className="text-3xl" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] font-bold tracking-[0.22em] text-[var(--color-gold)] uppercase">
                          Booking #{booking.id}
                        </p>
                        <h3 className="font-serif mt-1 text-2xl font-semibold text-[var(--color-charcoal)]">
                          {booking.hotel}
                        </h3>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[var(--color-light-muted)]">
                          <IoLocationOutline />
                          {booking.location}
                        </p>
                      </div>
                      <span className={`rounded-sm px-3 py-1 text-xs font-semibold tracking-wide uppercase ${statusClass}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                      <InfoRow icon={IoCalendarOutline} label="Check-in" value={formatDate(booking.checkIn)} />
                      <InfoRow icon={IoCalendarOutline} label="Check-out" value={formatDate(booking.checkOut)} />
                      <InfoRow
                        icon={IoTimeOutline}
                        label="Duration"
                        value={`${booking.nights || 1} Night${booking.nights > 1 ? 's' : ''}`}
                      />
                      <InfoRow icon={IoPricetagOutline} label="Total Paid" value={`INR ${Number(booking.amount || 0).toLocaleString('en-IN')}`} />
                    </div>

                    <div className="mt-5 border-t border-black/[0.06] pt-4">
                      <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-light-muted)] uppercase">
                        Guest
                      </p>
                      <p className="mt-1 text-sm font-medium text-[var(--color-charcoal)]">
                        {booking.guest} - {booking.rooms} Room(s), {booking.guests} Guest(s)
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to={hotelLink} className="btn-outline py-2.5 text-[11px]">
                        View Hotel
                      </Link>
                      <Link to={rebookLink} className="btn-primary py-2.5 text-[11px]">
                        Book Again
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </section>
  )
}

function SummaryCard({ label, value }) {
  return (
    <article className="rounded-md border border-black/[0.06] bg-white p-4">
      <p className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-light-muted)] uppercase">
        {label}
      </p>
      <p className="font-serif mt-2 text-3xl font-semibold text-[var(--color-charcoal)]">
        {value}
      </p>
    </article>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="rounded-sm bg-[var(--color-ivory)] px-3 py-2.5">
      <p className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-[var(--color-light-muted)] uppercase">
        <Icon className="text-sm" />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--color-charcoal)]">
        {value}
      </p>
    </div>
  )
}

function getBookingTimelineStatus(checkIn, checkOut) {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const checkInDate = checkIn ? new Date(checkIn) : null
  const checkOutDate = checkOut ? new Date(checkOut) : null

  if (!checkInDate || !checkOutDate) {
    return 'upcoming'
  }

  checkInDate.setHours(0, 0, 0, 0)
  checkOutDate.setHours(0, 0, 0, 0)

  if (now < checkInDate) return 'upcoming'
  if (now > checkOutDate) return 'completed'
  return 'ongoing'
}

function formatDate(dateValue) {
  if (!dateValue) return '--'

  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default ManageBookingsPage
