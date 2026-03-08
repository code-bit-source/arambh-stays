const BOOKINGS_STORAGE_KEY = 'aarambh_bookings'

function getAllBookings() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveBooking(booking) {
  if (!booking) return
  const existing = getAllBookings()
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify([booking, ...existing]))
}

export function getBookingsByEmail(email) {
  if (!email) return []

  return getAllBookings().filter((booking) => {
    if (!booking?.ownerEmail) return false
    return booking.ownerEmail.toLowerCase() === email.toLowerCase()
  })
}

