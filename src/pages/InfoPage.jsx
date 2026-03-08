import {
  IoBriefcaseOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoChevronForwardOutline,
  IoDocumentTextOutline,
  IoHelpCircleOutline,
  IoMapOutline,
  IoShieldCheckmarkOutline,
  IoTimerOutline,
} from 'react-icons/io5'
import { hotels } from '../data/hotels'

const pageVisuals = {
  about: {
    image: hotels[0].images[0],
    tag: 'Brand Story',
    caption: 'Crafting modern stays with timeless hospitality values.',
    overlay: 'linear-gradient(108deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.06) 100%)',
    panelClass: 'bg-white/92 text-[var(--color-charcoal)]',
  },
  careers: {
    image: hotels[2].images[1],
    tag: 'Career Path',
    caption: 'High ownership teams, clear growth tracks, and meaningful product problems.',
    overlay: 'linear-gradient(108deg, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.55) 60%, rgba(0,0,0,0.15) 100%)',
    panelClass: 'border border-white/20 bg-[var(--color-charcoal)]/85 text-white',
  },
  contact: {
    image: hotels[1].images[1],
    tag: 'Always Reachable',
    caption: 'Support, corporate bookings, and escalations handled through dedicated desks.',
    overlay: 'linear-gradient(108deg, rgba(25,25,25,0.8) 0%, rgba(25,25,25,0.45) 58%, rgba(0,0,0,0.1) 100%)',
    panelClass: 'bg-white/90 text-[var(--color-charcoal)]',
  },
  faq: {
    image: hotels[2].images[0],
    tag: 'Guest Q and A',
    caption: 'Fast answers for confirmation, payments, refunds, and check-in prep.',
    overlay: 'linear-gradient(108deg, rgba(20,20,20,0.82) 0%, rgba(20,20,20,0.45) 58%, rgba(0,0,0,0.1) 100%)',
    panelClass: 'bg-[var(--color-cream)]/92 text-[var(--color-charcoal)]',
  },
  privacy: {
    image: hotels[0].images[1],
    tag: 'Data Protection',
    caption: 'Transparent data practices across every booking and support interaction.',
    overlay: 'linear-gradient(108deg, rgba(18,18,18,0.8) 0%, rgba(18,18,18,0.45) 58%, rgba(0,0,0,0.08) 100%)',
    panelClass: 'bg-white/92 text-[var(--color-charcoal)]',
  },
  terms: {
    image: hotels[1].images[0],
    tag: 'Usage Framework',
    caption: 'Rules and responsibilities designed for clarity between guests and properties.',
    overlay: 'linear-gradient(108deg, rgba(16,16,16,0.84) 0%, rgba(16,16,16,0.5) 58%, rgba(0,0,0,0.08) 100%)',
    panelClass: 'bg-white/92 text-[var(--color-charcoal)]',
  },
  cancellation: {
    image: hotels[2].images[2],
    tag: 'Refund Journey',
    caption: 'Understand cancellation windows, deductions, and payment reversal timelines.',
    overlay: 'linear-gradient(108deg, rgba(16,16,16,0.84) 0%, rgba(16,16,16,0.5) 58%, rgba(0,0,0,0.08) 100%)',
    panelClass: 'bg-white/92 text-[var(--color-charcoal)]',
  },
  guidelines: {
    image: hotels[1].images[2],
    tag: 'Travel Readiness',
    caption: 'Simple guidance for smooth arrivals, safe stays, and rule-compliant travel.',
    overlay: 'linear-gradient(108deg, rgba(16,16,16,0.82) 0%, rgba(16,16,16,0.48) 58%, rgba(0,0,0,0.08) 100%)',
    panelClass: 'bg-white/92 text-[var(--color-charcoal)]',
  },
}

const sectionImages = [
  hotels[0].images[2],
  hotels[1].images[0],
  hotels[2].images[1],
  hotels[1].images[2],
]

const guidelineIcons = [
  IoDocumentTextOutline,
  IoTimerOutline,
  IoShieldCheckmarkOutline,
  IoCallOutline,
]

function renderDefaultPoints(points, textClass = 'text-[var(--color-muted)]') {
  if (!points?.length) {
    return null
  }

  return (
    <div className="mt-4 grid gap-2.5">
      {points.map((point) => (
        <p key={point} className={`flex items-center gap-2.5 text-sm ${textClass}`}>
          <IoChevronForwardOutline className="text-xs text-[var(--color-gold)]" />
          {point}
        </p>
      ))}
    </div>
  )
}

function renderHero(variant, title, subtitle) {
  const visual = pageVisuals[variant] ?? pageVisuals.about

  return (
    <header className="mb-10 text-center">
      <p className="text-[10px] font-bold tracking-[0.3em] text-[var(--color-gold)] uppercase">
        Information
      </p>
      <h1 className="font-serif mt-3 text-4xl font-semibold text-[var(--color-charcoal)] sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
        {subtitle}
      </p>
      <div className="divider-gold mx-auto mt-5" />

      <div className="relative mt-8 overflow-hidden rounded-lg">
        <img
          src={visual.image}
          alt={title}
          className="h-64 w-full object-cover sm:h-80 lg:h-96"
        />
        <div className="absolute inset-0" style={{ background: visual.overlay }} />
        <div className="absolute inset-0 flex items-end p-5 sm:p-8">
          <div className={`max-w-md rounded-sm px-4 py-3 text-left backdrop-blur-sm ${visual.panelClass}`}>
            <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
              {visual.tag}
            </p>
            <p className="mt-2 text-sm leading-relaxed sm:text-base">
              {visual.caption}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

function renderAboutLayout(sections) {
  return (
    <div className="grid gap-6">
      {sections.map((section, index) => {
        const image = sectionImages[index % sectionImages.length]
        const reverse = index % 2 === 1

        return (
          <article key={section.heading} className="rounded-lg bg-white p-4 sm:p-6">
            <div className="grid gap-5 md:grid-cols-[1.05fr_1.2fr] md:items-center">
              <div className={`${reverse ? 'md:order-2' : ''} overflow-hidden rounded-md`}>
                <img src={image} alt={section.heading} className="h-56 w-full object-cover sm:h-64" />
              </div>
              <div className={`${reverse ? 'md:order-1' : ''}`}>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[var(--color-light-muted)] uppercase">
                  Chapter {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)]">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>
                {renderDefaultPoints(section.points)}
                {section.note ? (
                  <div className="mt-5 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                    {section.note}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function renderCareersLayout(sections) {
  return (
    <div className="relative pl-2">
      <div className="absolute top-0 left-3 h-full w-px bg-black/[0.08]" />
      <div className="grid gap-6">
        {sections.map((section, index) => (
          <article key={section.heading} className="relative ml-8 rounded-lg bg-[var(--color-charcoal)] p-6 text-white sm:p-7">
            <div className="absolute -left-10 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-[var(--color-gold)] text-[11px] font-bold text-black">
              {index + 1}
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">Hiring Stage</p>
            <h2 className="font-serif mt-2 text-2xl font-semibold">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{section.body}</p>

            {section.points?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {section.points.map((point) => (
                  <span key={point} className="rounded-sm border border-white/20 px-3 py-1 text-[11px] text-white/80">
                    {point}
                  </span>
                ))}
              </div>
            ) : null}

            {section.note ? (
              <div className="mt-5 rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-xs text-white/85">
                {section.note}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}

function renderContactLayout(sections) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sections.map((section, index) => {
        const image = sectionImages[(index + 1) % sectionImages.length]

        return (
          <article key={section.heading} className={`overflow-hidden rounded-lg border border-black/[0.06] bg-white ${index === 0 ? 'md:col-span-2' : ''}`}>
            <div className="relative">
              <img src={image} alt={section.heading} className={`w-full object-cover ${index === 0 ? 'h-52 sm:h-60' : 'h-40 sm:h-44'}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <p className="absolute bottom-3 left-3 text-[10px] font-bold tracking-[0.2em] text-[var(--color-gold)] uppercase">
                Desk {String(index + 1).padStart(2, '0')}
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>
              {renderDefaultPoints(section.points)}
              {section.note ? (
                <div className="mt-5 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                  {section.note}
                </div>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function renderFaqLayout(sections) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sections.map((section, index) => {
        const alternate = index % 2 === 1

        return (
          <article key={section.heading} className={`rounded-lg border-l-4 p-5 sm:p-6 ${alternate ? 'border-[var(--color-charcoal)] bg-[var(--color-cream)]' : 'border-[var(--color-gold)] bg-white'}`}>
            <p className="text-[10px] font-bold tracking-[0.18em] text-[var(--color-light-muted)] uppercase">
              Question {String(index + 1).padStart(2, '0')}
            </p>
            <h2 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)]">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>

            {section.points?.length ? (
              <div className="mt-4 grid gap-2.5">
                {section.points.map((point) => (
                  <p key={point} className="flex items-center gap-2.5 text-sm text-[var(--color-muted)]">
                    <IoHelpCircleOutline className="text-[13px] text-[var(--color-gold)]" />
                    {point}
                  </p>
                ))}
              </div>
            ) : null}

            {section.note ? (
              <div className="mt-5 rounded-sm bg-white px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                {section.note}
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}

function renderPrivacyLayout(sections) {
  return (
    <div className="grid gap-5">
      {sections.map((section, index) => (
        <article key={section.heading} className="rounded-lg border border-black/[0.08] bg-white p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <div className="rounded-md bg-[var(--color-cream)] p-4">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[var(--color-light-muted)] uppercase">
                Policy Block {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="font-serif mt-2 text-2xl font-semibold text-[var(--color-charcoal)]">{section.heading}</h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>

              {section.points?.length ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {section.points.map((point) => (
                    <p key={point} className="rounded-sm border border-black/[0.07] px-3 py-2 text-[12px] text-[var(--color-muted)]">
                      {point}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.note ? (
                <div className="mt-5 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                  {section.note}
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function renderTermsLayout(sections) {
  return (
    <div className="grid gap-5">
      {sections.map((section, index) => (
        <article key={section.heading} className="overflow-hidden rounded-lg border border-black/[0.08] bg-white">
          <div className={`h-1 ${index % 2 === 0 ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-charcoal)]'}`} />
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <p className="font-serif text-4xl leading-none text-[var(--color-charcoal)]">{String(index + 1).padStart(2, '0')}</p>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">{section.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>
                {renderDefaultPoints(section.points)}
                {section.note ? (
                  <div className="mt-5 rounded-sm bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                    {section.note}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function renderCancellationLayout(sections) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sections.map((section, index) => {
        const image = sectionImages[(index + 2) % sectionImages.length]

        return (
          <article key={section.heading} className="overflow-hidden rounded-lg border border-black/[0.06] bg-white">
            <div className="relative">
              <img src={image} alt={section.heading} className="h-40 w-full object-cover" />
              <span className="absolute top-3 left-3 rounded-sm bg-black/65 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[var(--color-gold)] uppercase">
                Policy Step {index + 1}
              </span>
            </div>
            <div className="p-5">
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-charcoal)]">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{section.body}</p>

              {section.points?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {section.points.map((point) => (
                    <span key={point} className="rounded-sm border border-black/[0.08] bg-[var(--color-cream)] px-3 py-1 text-[11px] text-[var(--color-muted)]">
                      {point}
                    </span>
                  ))}
                </div>
              ) : null}

              {section.note ? (
                <div className="mt-5 rounded-sm border border-black/[0.08] bg-[var(--color-cream)] px-4 py-3 text-xs font-medium text-[var(--color-muted)]">
                  {section.note}
                </div>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function renderGuidelinesLayout(sections) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {sections.map((section, index) => {
        const image = sectionImages[index % sectionImages.length]
        const Icon = guidelineIcons[index % guidelineIcons.length]

        return (
          <article key={section.heading} className="relative overflow-hidden rounded-lg">
            <img src={image} alt={section.heading} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/65 to-black/45" />
            <div className="relative p-6 text-white sm:p-7">
              <div className="flex items-center gap-2">
                <Icon className="text-lg text-[var(--color-gold)]" />
                <p className="text-[10px] font-bold tracking-[0.18em] text-white/65 uppercase">
                  Guide {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <h2 className="font-serif mt-3 text-2xl font-semibold">{section.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{section.body}</p>

              {section.points?.length ? (
                <div className="mt-4 grid gap-2">
                  {section.points.map((point) => (
                    <p key={point} className="flex items-center gap-2.5 text-sm text-white/82">
                      <IoCheckmarkCircleOutline className="text-[13px] text-[var(--color-gold)]" />
                      {point}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.note ? (
                <div className="mt-5 rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-xs text-white/88">
                  {section.note}
                </div>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

function renderVariantLayout(variant, sections) {
  if (variant === 'careers') {
    return renderCareersLayout(sections)
  }

  if (variant === 'contact') {
    return renderContactLayout(sections)
  }

  if (variant === 'faq') {
    return renderFaqLayout(sections)
  }

  if (variant === 'privacy') {
    return renderPrivacyLayout(sections)
  }

  if (variant === 'terms') {
    return renderTermsLayout(sections)
  }

  if (variant === 'cancellation') {
    return renderCancellationLayout(sections)
  }

  if (variant === 'guidelines') {
    return renderGuidelinesLayout(sections)
  }

  return renderAboutLayout(sections)
}

function renderVariantFooter(variant) {
  if (variant === 'careers') {
    return (
      <div className="mt-8 rounded-lg border border-black/[0.08] bg-white px-5 py-4 text-sm text-[var(--color-muted)] sm:px-6">
        <p className="inline-flex items-center gap-2 font-medium text-[var(--color-charcoal)]">
          <IoBriefcaseOutline className="text-[var(--color-gold)]" />
          Interested in joining? Send your profile to careers@aarambhstays.com.
        </p>
      </div>
    )
  }

  if (variant === 'privacy') {
    return (
      <div className="mt-8 rounded-lg border border-black/[0.08] bg-white px-5 py-4 text-sm text-[var(--color-muted)] sm:px-6">
        <p className="inline-flex items-center gap-2 font-medium text-[var(--color-charcoal)]">
          <IoShieldCheckmarkOutline className="text-[var(--color-gold)]" />
          Privacy concerns are reviewed on priority at privacy@aarambhstays.com.
        </p>
      </div>
    )
  }

  if (variant === 'terms') {
    return (
      <div className="mt-8 rounded-lg border border-black/[0.08] bg-white px-5 py-4 text-sm text-[var(--color-muted)] sm:px-6">
        <p className="inline-flex items-center gap-2 font-medium text-[var(--color-charcoal)]">
          <IoDocumentTextOutline className="text-[var(--color-gold)]" />
          Please review these terms before any booking confirmation.
        </p>
      </div>
    )
  }

  if (variant === 'guidelines') {
    return (
      <div className="mt-8 rounded-lg border border-black/[0.08] bg-white px-5 py-4 text-sm text-[var(--color-muted)] sm:px-6">
        <p className="inline-flex items-center gap-2 font-medium text-[var(--color-charcoal)]">
          <IoMapOutline className="text-[var(--color-gold)]" />
          For urgent trip help, contact our 24x7 support line: +91 98765 43210.
        </p>
      </div>
    )
  }

  return null
}

function InfoPage({ title, subtitle, sections, variant = 'about' }) {
  return (
    <section>
      {renderHero(variant, title, subtitle)}
      {renderVariantLayout(variant, sections)}
      {renderVariantFooter(variant)}
    </section>
  )
}

export default InfoPage
