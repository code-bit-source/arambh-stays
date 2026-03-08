import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoEyeOutline, IoEyeOffOutline, IoPersonOutline, IoMailOutline, IoLockClosedOutline, IoCallOutline } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const { login, signup } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.state?.from || '/'

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (isSignup) {
            if (!form.fullName.trim()) {
                setError('Please enter your full name.')
                return
            }
            if (!form.phone.trim()) {
                setError('Please enter your phone number.')
                return
            }
            if (form.password.length < 6) {
                setError('Password must be at least 6 characters.')
                return
            }
            if (form.password !== form.confirmPassword) {
                setError('Passwords do not match.')
                return
            }
            signup({
                fullName: form.fullName,
                email: form.email,
                phone: form.phone,
                joinedAt: new Date().toISOString(),
            })
        } else {
            if (!form.email || !form.password) {
                setError('Please enter email and password.')
                return
            }
            login({
                fullName: form.fullName || form.email.split('@')[0],
                email: form.email,
                phone: form.phone || '',
                joinedAt: new Date().toISOString(),
            })
        }

        navigate(redirectTo, { replace: true })
    }

    const inputClasses =
        'w-full rounded-sm border border-black/10 bg-[var(--color-ivory)] px-4 py-3 pl-11 text-sm text-[var(--color-charcoal)] outline-none transition-all focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/10'

    return (
        <section className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="font-serif text-3xl font-semibold text-[var(--color-charcoal)] no-underline">
                        Aarambh<span className="text-gold">.</span>
                    </Link>
                    <h1 className="font-serif mt-6 text-3xl font-semibold text-[var(--color-charcoal)]">
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                        {isSignup
                            ? 'Sign up to start booking premium stays.'
                            : 'Sign in to manage your bookings.'}
                    </p>
                    <div className="divider-gold mx-auto mt-4" />
                </div>

                {/* Form */}
                <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="relative">
                            <IoPersonOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-light-muted)]" />
                            <input
                                name="fullName"
                                value={form.fullName}
                                onChange={onChange}
                                placeholder="Full Name"
                                className={inputClasses}
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <IoMailOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-light-muted)]" />
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="Email Address"
                            className={inputClasses}
                            required
                        />
                    </div>

                    {isSignup && (
                        <div className="relative">
                            <IoCallOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-light-muted)]" />
                            <input
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={onChange}
                                placeholder="Phone Number"
                                className={inputClasses}
                                required
                            />
                        </div>
                    )}

                    <div className="relative">
                        <IoLockClosedOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-light-muted)]" />
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={onChange}
                            placeholder="Password"
                            className={inputClasses}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--color-light-muted)] hover:text-[var(--color-charcoal)]"
                            aria-label="Toggle password"
                        >
                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </button>
                    </div>

                    {isSignup && (
                        <div className="relative">
                            <IoLockClosedOutline className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-light-muted)]" />
                            <input
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={form.confirmPassword}
                                onChange={onChange}
                                placeholder="Confirm Password"
                                className={inputClasses}
                                required
                            />
                        </div>
                    )}

                    {error && (
                        <p className="rounded-sm bg-red-50 px-4 py-2.5 text-xs font-medium text-red-700">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="btn-primary w-full justify-center py-3.5 text-sm">
                        {isSignup ? 'Create Account' : 'Sign In'}
                    </button>
                </form>

                {/* Toggle */}
                <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup)
                            setError('')
                        }}
                        className="font-semibold text-[var(--color-charcoal)] underline underline-offset-2 transition-colors hover:text-[var(--color-gold)]"
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </section>
    )
}

export default LoginPage
