import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoCallOutline, IoMenuOutline, IoCloseOutline, IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Offers', to: '/offers' },
  { label: 'Support', to: '/support' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-[var(--color-ivory)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        {/* Brand */}
        <Link to="/" className="text-inherit no-underline">
          <h2 className="font-serif m-0 text-2xl font-semibold tracking-wide sm:text-[1.7rem]">
            Aarambh<span className="text-gold">.</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] font-semibold tracking-[0.18em] uppercase no-underline transition-colors duration-300 ${isActive
                  ? 'text-[var(--color-charcoal)]'
                  : 'text-[var(--color-light-muted)] hover:text-[var(--color-charcoal)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="hidden items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-muted)] no-underline transition-colors hover:text-[var(--color-charcoal)] lg:inline-flex"
          >
            <IoCallOutline className="text-sm" />
            +91 98765 43210
          </a>

          {isLoggedIn ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/manage-bookings"
                className="rounded-sm border border-black/10 px-3 py-2 text-[10px] font-semibold tracking-wider text-[var(--color-muted)] uppercase no-underline transition-colors hover:border-[var(--color-charcoal)] hover:text-[var(--color-charcoal)]"
              >
                My Bookings
              </Link>
              <div className="flex items-center gap-2 rounded-sm bg-[var(--color-cream)] px-3 py-2">
                <IoPersonCircleOutline className="text-lg text-[var(--color-gold)]" />
                <span className="max-w-[100px] truncate text-xs font-semibold text-[var(--color-charcoal)]">
                  {user.fullName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-sm text-[var(--color-muted)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]"
                title="Logout"
              >
                <IoLogOutOutline className="text-base" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-sm bg-[var(--color-charcoal)] px-4 py-2 text-[10px] font-semibold tracking-wider text-white uppercase no-underline transition-colors hover:bg-[var(--color-gold-dark)] md:inline-block"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-xl md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-black/5 bg-[var(--color-ivory)] px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-2 text-sm font-medium no-underline transition-colors ${isActive
                    ? 'text-[var(--color-charcoal)]'
                    : 'text-[var(--color-muted)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile auth area */}
            <div className="mt-2 border-t border-black/5 pt-3">
              {isLoggedIn ? (
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IoPersonCircleOutline className="text-lg text-[var(--color-gold)]" />
                      <span className="text-sm font-semibold text-[var(--color-charcoal)]">
                        {user.fullName}
                      </span>
                    </div>
                    <button
                      onClick={() => { handleLogout(); setMobileOpen(false) }}
                      className="text-xs font-semibold text-red-600"
                    >
                      Logout
                    </button>
                  </div>

                  <Link
                    to="/manage-bookings"
                    onClick={() => setMobileOpen(false)}
                    className="btn-outline w-full justify-center py-2.5 text-[11px]"
                  >
                    My Bookings
                  </Link>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center py-2.5 text-[11px]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
