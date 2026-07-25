import { Link } from 'react-router-dom'

const cols = [
  {
    heading: 'Product',
    links: [
      { to: '/product', label: 'Overview' },
      { to: '/product#features', label: 'Features' },
      { to: '/pricing', label: 'Pricing' },
      { href: 'https://docs.clausify.io', label: 'Documentation' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: 'https://clausify.io/about', label: 'About' },
      { href: 'https://clausify.io/blog', label: 'Blog' },
      { href: 'https://clausify.io/careers', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: 'https://clausify.io/privacy', label: 'Privacy policy' },
      { href: 'https://clausify.io/terms', label: 'Terms of service' },
      { href: 'https://clausify.io/security', label: 'Security' },
      { href: 'https://clausify.io/dpa', label: 'DPA' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t mt-24"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              className="font-display text-xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Clausify<span style={{ color: 'var(--primary)' }}>.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              AI contract intelligence for legal and procurement teams. Extract obligations, risks, and deadlines in seconds.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <h3
                className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'to' in link ? (
                      <Link
                        to={link.to as string}
                        className="text-sm transition-colors hover:text-foreground"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm transition-colors hover:text-foreground"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            © {new Date().getFullYear()} Clausify, Inc. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <a
              href="https://digitalheroesco.com"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
              style={{ color: 'var(--muted-foreground)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Built for Digital Heroes Training Task
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
