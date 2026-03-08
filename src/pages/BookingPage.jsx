import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaCcVisa,
  FaCcMastercard,
  FaGooglePay,
} from 'react-icons/fa6'
import {
  IoCheckmarkCircleOutline,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoCardOutline,
  IoWalletOutline,
  IoPhonePortraitOutline,
  IoPrintOutline,
  IoHomeOutline,
} from 'react-icons/io5'
import { hotels } from '../data/hotels'
import { useAuth } from '../context/AuthContext'
import { saveBooking } from '../utils/bookingsStorage'
import NotFoundPage from './NotFoundPage'

// ── Steps: 'form' → 'payment' → 'ticket' ──

function BookingPage() {
  const { hotelId } = useParams()
  const hotel = useMemo(() => hotels.find((item) => item.id === hotelId), [hotelId])
  const { user, isLoggedIn } = useAuth()

  const [step, setStep] = useState('form') // form | payment | ticket
  const [bookingForm, setBookingForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1,
    specialRequest: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    upiId: '',
  })
  const [processing, setProcessing] = useState(false)
  const [ticketData, setTicketData] = useState(null)

  if (!hotel) {
    return <NotFoundPage />
  }

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-6xl font-light text-[var(--color-gold)]">🔒</p>
          <h2 className="font-serif mt-4 text-2xl font-semibold text-[var(--color-charcoal)]">
            Login Required
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Please sign in to book {hotel.name}.
          </p>
          <Link
            to="/login"
            state={{ from: `/booking/${hotel.id}` }}
            className="btn-primary mt-6"
          >
            Sign In to Continue
          </Link>
        </div>
      </section>
    )
  }

  const nights = (() => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) return 1
    const diff = new Date(bookingForm.checkOut) - new Date(bookingForm.checkIn)
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  })()

  const totalAmount = hotel.pricePerNight * nights * bookingForm.rooms
  const taxes = Math.round(totalAmount * 0.12)
  const grandTotal = totalAmount + taxes

  const onFormChange = (e) => {
    const { name, value } = e.target
    setBookingForm((c) => ({
      ...c,
      [name]: name === 'guests' || name === 'rooms' ? Number(value) : value,
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (bookingForm.checkOut <= bookingForm.checkIn) {
      return alert('Check-out date should be after check-in date.')
    }
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePayment = (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const createdAt = new Date().toISOString()
      const ticket = {
        id: `AB${Date.now().toString().slice(-8)}`,
        hotelId: hotel.id,
        hotelImage: hotel.images[0],
        hotel: hotel.name,
        location: hotel.location,
        guest: bookingForm.fullName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        nights,
        guests: bookingForm.guests,
        rooms: bookingForm.rooms,
        roomType: hotel.roomType,
        amount: grandTotal,
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking',
        paidAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'Confirmed',
        specialRequest: bookingForm.specialRequest,
        ownerEmail: user?.email || bookingForm.email,
        createdAt,
      }
      saveBooking(ticket)
      setTicketData(ticket)
      setProcessing(false)
      setStep('ticket')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 2200)
  }

  const inputClasses =
    'w-full rounded-sm border border-black/10 bg-[var(--color-ivory)] px-4 py-3 text-sm text-[var(--color-charcoal)] outline-none transition-all focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/10'

  // ─── STEP: BOOKING FORM ───
  if (step === 'form') {
    return (
      <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div>
          <Link
            to={`/hotel/${hotel.id}`}
            className="inline-flex text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase no-underline transition-colors hover:text-[var(--color-charcoal)]"
          >
            ← Back to hotel details
          </Link>

          {/* Step Indicator */}
          <div className="mt-6 flex items-center gap-3">
            <StepBadge num="1" label="Details" active />
            <div className="h-px flex-1 bg-black/10" />
            <StepBadge num="2" label="Payment" />
            <div className="h-px flex-1 bg-black/10" />
            <StepBadge num="3" label="Ticket" />
          </div>

          <div className="mt-6 rounded-lg bg-white p-6 sm:p-8">
            <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
              Reservation
            </p>
            <h3 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
              Book {hotel.name}
            </h3>
            <div className="divider-gold mt-4" />
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Please confirm your details below to proceed to payment.
            </p>

            <form className="mt-6 grid gap-4" onSubmit={handleFormSubmit}>
              <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                Full Name
                <input name="fullName" value={bookingForm.fullName} onChange={onFormChange} required placeholder="Guest full name" className={inputClasses} />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Email
                  <input name="email" type="email" value={bookingForm.email} onChange={onFormChange} required placeholder="you@example.com" className={inputClasses} />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Phone
                  <input name="phone" type="tel" value={bookingForm.phone} onChange={onFormChange} required placeholder="+91 98765 43210" className={inputClasses} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Check-in
                  <input name="checkIn" type="date" value={bookingForm.checkIn} onChange={onFormChange} required className={inputClasses} />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Check-out
                  <input name="checkOut" type="date" value={bookingForm.checkOut} onChange={onFormChange} required className={inputClasses} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Guests
                  <input name="guests" type="number" min="1" value={bookingForm.guests} onChange={onFormChange} required className={inputClasses} />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Rooms
                  <input name="rooms" type="number" min="1" value={bookingForm.rooms} onChange={onFormChange} required className={inputClasses} />
                </label>
              </div>
              <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                Special Request (optional)
                <textarea name="specialRequest" value={bookingForm.specialRequest} onChange={onFormChange} rows="3" placeholder="e.g. early check-in, high-floor room" className={inputClasses} />
              </label>
              <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
                Proceed to Payment →
              </button>
            </form>
          </div>
        </div>

        <BookingSidebar hotel={hotel} nights={nights} totalAmount={totalAmount} taxes={taxes} grandTotal={grandTotal} bookingForm={bookingForm} />
      </section>
    )
  }

  // ─── STEP: PAYMENT GATEWAY ───
  if (step === 'payment') {
    return (
      <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div>
          <button
            type="button"
            onClick={() => setStep('form')}
            className="inline-flex text-xs font-semibold tracking-wide text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-charcoal)]"
          >
            ← Back to details
          </button>

          {/* Step Indicator */}
          <div className="mt-6 flex items-center gap-3">
            <StepBadge num="1" label="Details" done />
            <div className="h-px flex-1 bg-[var(--color-gold)]" />
            <StepBadge num="2" label="Payment" active />
            <div className="h-px flex-1 bg-black/10" />
            <StepBadge num="3" label="Ticket" />
          </div>

          <div className="mt-6 rounded-lg bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <IoLockClosedOutline className="text-[var(--color-gold)]" />
              <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
                Secure Payment
              </p>
            </div>
            <h3 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)] sm:text-3xl">
              Payment Gateway
            </h3>
            <div className="divider-gold mt-4" />

            <p className="mt-4 text-sm text-[var(--color-muted)]">
              Amount to pay: <span className="font-serif text-lg font-semibold text-[var(--color-charcoal)]">₹{grandTotal.toLocaleString()}</span>
            </p>

            {/* Payment Method Tabs */}
            <div className="mt-6 flex gap-2">
              {[
                { key: 'card', label: 'Card', icon: IoCardOutline },
                { key: 'upi', label: 'UPI', icon: IoPhonePortraitOutline },
                { key: 'netbanking', label: 'Net Banking', icon: IoWalletOutline },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setPaymentMethod(m.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-sm py-3 text-xs font-semibold tracking-wide uppercase transition-all ${paymentMethod === m.key
                      ? 'bg-[var(--color-charcoal)] text-white'
                      : 'border border-black/10 bg-[var(--color-ivory)] text-[var(--color-muted)] hover:border-[var(--color-gold)]'
                    }`}
                >
                  <m.icon className="text-sm" />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Payment Form */}
            <form className="mt-6 grid gap-4" onSubmit={handlePayment}>
              {paymentMethod === 'card' && (
                <>
                  <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                    Card Number
                    <div className="relative">
                      <input
                        value={cardForm.number}
                        onChange={(e) => setCardForm((c) => ({ ...c, number: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                        className={inputClasses}
                      />
                      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 gap-1.5 text-[var(--color-light-muted)]">
                        <FaCcVisa className="text-lg" />
                        <FaCcMastercard className="text-lg" />
                      </div>
                    </div>
                  </label>
                  <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                    Cardholder Name
                    <input
                      value={cardForm.name}
                      onChange={(e) => setCardForm((c) => ({ ...c, name: e.target.value }))}
                      placeholder="Name on card"
                      required
                      className={inputClasses}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                      Expiry
                      <input
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm((c) => ({ ...c, expiry: e.target.value }))}
                        placeholder="MM / YY"
                        maxLength={7}
                        required
                        className={inputClasses}
                      />
                    </label>
                    <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                      CVV
                      <input
                        type="password"
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm((c) => ({ ...c, cvv: e.target.value }))}
                        placeholder="•••"
                        maxLength={4}
                        required
                        className={inputClasses}
                      />
                    </label>
                  </div>
                </>
              )}

              {paymentMethod === 'upi' && (
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  UPI ID
                  <div className="relative">
                    <input
                      value={cardForm.upiId}
                      onChange={(e) => setCardForm((c) => ({ ...c, upiId: e.target.value }))}
                      placeholder="yourname@upi"
                      required
                      className={inputClasses}
                    />
                    <FaGooglePay className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-[var(--color-light-muted)]" />
                  </div>
                </label>
              )}

              {paymentMethod === 'netbanking' && (
                <label className="grid gap-1.5 text-xs font-semibold tracking-wide text-[var(--color-dark)] uppercase">
                  Select Bank
                  <select
                    required
                    className={inputClasses}
                    defaultValue=""
                  >
                    <option value="" disabled>Choose your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </label>
              )}

              {/* Security Note */}
              <div className="flex items-center gap-2 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs text-[var(--color-muted)]">
                <IoShieldCheckmarkOutline className="text-base text-[var(--color-gold)]" />
                Your payment is secured with 256-bit SSL encryption.
              </div>

              <button
                type="submit"
                disabled={processing}
                className="btn-primary w-full justify-center py-3.5 text-sm disabled:opacity-60"
                style={processing ? {} : { background: 'var(--color-gold)' }}
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ₹${grandTotal.toLocaleString()}`
                )}
              </button>
            </form>
          </div>
        </div>

        <BookingSidebar hotel={hotel} nights={nights} totalAmount={totalAmount} taxes={taxes} grandTotal={grandTotal} bookingForm={bookingForm} />
      </section>
    )
  }

  // ─── STEP: BOOKING TICKET ───
  if (step === 'ticket' && ticketData) {
    return (
      <section className="mx-auto max-w-2xl">
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <IoCheckmarkCircleOutline className="text-3xl text-emerald-600" />
          </div>
          <h2 className="font-serif mt-5 text-3xl font-semibold text-[var(--color-charcoal)]">
            Booking Confirmed!
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Your reservation has been successfully processed.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex items-center gap-3">
          <StepBadge num="1" label="Details" done />
          <div className="h-px flex-1 bg-[var(--color-gold)]" />
          <StepBadge num="2" label="Payment" done />
          <div className="h-px flex-1 bg-[var(--color-gold)]" />
          <StepBadge num="3" label="Ticket" active />
        </div>

        {/* Ticket Card */}
        <div className="mt-8 overflow-hidden rounded-lg bg-white">
          {/* Ticket Header */}
          <div className="bg-[var(--color-charcoal)] px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
                  Booking Confirmation
                </p>
                <p className="font-serif mt-1 text-2xl font-semibold">{ticketData.hotel}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
                  Ticket ID
                </p>
                <p className="mt-1 font-mono text-lg font-bold tracking-wider">
                  #{ticketData.id}
                </p>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <TicketRow label="Guest Name" value={ticketData.guest} />
              <TicketRow label="Email" value={ticketData.email} />
              <TicketRow label="Phone" value={ticketData.phone} />
              <TicketRow label="Location" value={ticketData.location} />
              <TicketRow label="Check-in" value={formatDate(ticketData.checkIn)} />
              <TicketRow label="Check-out" value={formatDate(ticketData.checkOut)} />
              <TicketRow label="Duration" value={`${ticketData.nights} Night${ticketData.nights > 1 ? 's' : ''}`} />
              <TicketRow label="Rooms" value={ticketData.rooms} />
              <TicketRow label="Room Type" value={ticketData.roomType} />
              <TicketRow label="Guests" value={ticketData.guests} />
              <TicketRow label="Payment" value={ticketData.paymentMethod} />
              <TicketRow label="Paid On" value={ticketData.paidAt} />
            </div>

            {/* Dashed Divider */}
            <div className="my-5 border-t-2 border-dashed border-black/10" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--color-muted)]">Total Paid</p>
              <p className="font-serif text-3xl font-semibold text-[var(--color-charcoal)]">
                ₹{ticketData.amount.toLocaleString()}
              </p>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2 rounded-sm bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              <IoCheckmarkCircleOutline className="text-lg" />
              Status: {ticketData.status}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="btn-outline text-xs"
          >
            <IoPrintOutline />
            Print Ticket
          </button>
          <Link to="/manage-bookings" className="btn-outline text-xs">
            <IoCheckmarkCircleOutline />
            Manage Bookings
          </Link>
          <Link to="/" className="btn-primary text-xs">
            <IoHomeOutline />
            Back to Home
          </Link>
        </div>
      </section>
    )
  }

  return null
}

// ─── HELPER COMPONENTS ───

function StepBadge({ num, label, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${done
            ? 'bg-[var(--color-gold)] text-white'
            : active
              ? 'bg-[var(--color-charcoal)] text-white'
              : 'border border-black/15 text-[var(--color-light-muted)]'
          }`}
      >
        {done ? '✓' : num}
      </span>
      <span
        className={`hidden text-[10px] font-semibold tracking-wider uppercase sm:block ${active || done ? 'text-[var(--color-charcoal)]' : 'text-[var(--color-light-muted)]'
          }`}
      >
        {label}
      </span>
    </div>
  )
}

function TicketRow({ label, value }) {
  return (
    <div>
      <p className="text-[9px] font-bold tracking-[0.2em] text-[var(--color-light-muted)] uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--color-charcoal)]">{value}</p>
    </div>
  )
}

function BookingSidebar({ hotel, nights, totalAmount, taxes, grandTotal, bookingForm }) {
  return (
    <aside className="rounded-lg bg-white p-6 lg:sticky lg:top-24">
      <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
        Summary
      </p>
      <h4 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)]">
        Booking Details
      </h4>
      <div className="divider-gold mt-3" />

      <div className="mt-5 overflow-hidden rounded-sm">
        <img src={hotel.images[0]} alt={hotel.name} className="h-36 w-full object-cover" />
      </div>

      <p className="mt-4 font-serif text-lg font-semibold text-[var(--color-charcoal)]">
        {hotel.name}
      </p>
      <p className="mt-1 text-xs text-[var(--color-light-muted)]">{hotel.location}</p>

      <div className="mt-5 space-y-2.5 border-t border-black/[0.06] pt-5 text-sm">
        <PriceRow label="Price per night" value={`₹${hotel.pricePerNight.toLocaleString()}`} />
        <PriceRow label="Nights" value={nights} />
        <PriceRow label="Rooms" value={bookingForm.rooms} />
        <PriceRow label="Guests" value={bookingForm.guests} />
        <PriceRow label="Subtotal" value={`₹${totalAmount.toLocaleString()}`} />
        <PriceRow label="Taxes (12%)" value={`₹${taxes.toLocaleString()}`} />
        <div className="border-t border-black/[0.06] pt-2.5">
          <PriceRow label="Grand Total" value={`₹${grandTotal.toLocaleString()}`} bold />
        </div>
      </div>

      <div className="mt-5 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
        Free cancellation up to 24 hours before check-in.
      </div>
    </aside>
  )
}

function PriceRow({ label, value, bold }) {
  return (
    <p className="flex justify-between text-[var(--color-muted)]">
      <span className={bold ? 'font-semibold text-[var(--color-charcoal)]' : ''}>{label}</span>
      <span className={`font-semibold ${bold ? 'font-serif text-lg text-[var(--color-charcoal)]' : 'text-[var(--color-charcoal)]'}`}>
        {value}
      </span>
    </p>
  )
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default BookingPage
