import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/product', label: 'Product' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight"
          style={{ color: 'var(--foreground)' }}
          aria-label="Clausify — Home"
        >
          Clausify
          <span style={{ color: 'var(--primary)' }}>.</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium transition-colors"
              style={{
                color: pathname === to ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
              aria-current={pathname === to ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://app.clausify.io/login"
            className="text-sm font-medium px-4 py-2 transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
          >
            Sign in
          </a>
          <Link
            to="/contact"
            className="text-sm font-medium px-4 py-2 transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)',
            }}
          >
            Request demo
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          style={{ color: 'var(--foreground)' }}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium py-1"
              style={{
                color: pathname === to ? 'var(--primary)' : 'var(--foreground)',
              }}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === to ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="text-sm font-medium px-4 py-2 text-center mt-2"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)',
            }}
            onClick={() => setMenuOpen(false)}
          >
            Request demo
          </Link>
        </nav>
      )}
    </header>
  )
}
