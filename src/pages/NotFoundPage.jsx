import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-8xl font-light text-[var(--color-gold)]">404</p>
        <h1 className="font-serif mt-3 text-3xl font-semibold text-[var(--color-charcoal)]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn-primary mt-8">
          Go to Home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
