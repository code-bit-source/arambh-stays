import { Link } from 'react-router-dom'
import { IoLogoInstagram, IoLogoTwitter, IoLogoLinkedin } from 'react-icons/io5'

const footerSections = [
  {
    title: 'Explore',
    links: [
      { label: 'Destinations', to: '/destinations' },
      { label: 'Offers', to: '/offers' },
      { label: 'Support', to: '/support' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Manage Bookings', to: '/manage-bookings' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact', to: '/contact' },
      { label: 'Travel Guidelines', to: '/guidelines' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Cancellation', to: '/cancellation' },
    ],
  },
]

function Footer() {
  return (
    <footer className="mt-20 border-t border-black/[0.06]" style={{ background: 'var(--color-ivory)' }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div className="pr-8">
            <h3 className="font-serif text-3xl font-semibold tracking-wide">
              Aarambh<span className="text-gold">.</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
              A curated hotel booking experience built on trust, transparency, and timeless hospitality.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-[var(--color-light-muted)] transition-colors hover:text-[var(--color-charcoal)]" aria-label="Instagram">
                <IoLogoInstagram className="text-lg" />
              </a>
              <a href="#" className="text-[var(--color-light-muted)] transition-colors hover:text-[var(--color-charcoal)]" aria-label="Twitter">
                <IoLogoTwitter className="text-lg" />
              </a>
              <a href="#" className="text-[var(--color-light-muted)] transition-colors hover:text-[var(--color-charcoal)]" aria-label="LinkedIn">
                <IoLogoLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-light-muted)] uppercase">
                {section.title}
              </h4>
              <div className="mt-5 flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-[var(--color-muted)] no-underline transition-colors hover:text-[var(--color-charcoal)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/[0.06] py-5 text-[11px] tracking-wide text-[var(--color-light-muted)]">
          (c) {new Date().getFullYear()} Aarambh Stays. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
