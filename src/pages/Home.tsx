import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Clausify',
  url: 'https://clausify.io',
  logo: 'https://clausify.io/logo.png',
  description: 'AI-powered contract intelligence for legal and procurement teams.',
  sameAs: [
    'https://twitter.com/clausify',
    'https://linkedin.com/company/clausify',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@clausify.io',
  },
}

const stats = [
  { value: '94%', label: 'Reduction in contract review time' },
  { value: '12 sec', label: 'Average per-contract analysis' },
  { value: '340+', label: 'Enterprise customers' },
  { value: '99.97%', label: 'Uptime SLA' },
]

const features = [
  {
    num: '01',
    title: 'Obligation extraction',
    body: 'Every payment term, renewal clause, and liability cap surfaced automatically — searchable and exportable.',
  },
  {
    num: '02',
    title: 'Risk scoring',
    body: 'Each contract receives a 0–100 risk score based on your playbook. Outliers are flagged before they reach signature.',
  },
  {
    num: '03',
    title: 'Deadline intelligence',
    body: 'Renewal dates, notice windows, and milestones flow into your calendar. Nothing slips through.',
  },
  {
    num: '04',
    title: 'Redline comparison',
    body: 'Upload two versions of a contract and receive a structured diff with legal significance ratings in seconds.',
  },
]

const logos = [
  'Meridian Capital', 'Oakhurst Legal', 'NovaPharma', 'Strata Logistics', 'Vectis Group', 'Brightline Rail',
]

export default function Home() {
  return (
    <>
      <SEOHead
        title="Clausify — AI Contract Intelligence"
        description="Clausify extracts obligations, risks, and deadlines from any contract in seconds. Trusted by 340+ enterprise legal and procurement teams."
        canonicalPath="/"
        jsonLd={orgSchema}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          className="pt-36 pb-24 px-6"
          aria-labelledby="hero-heading"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <p
                className="font-mono text-xs uppercase tracking-widest mb-6"
                style={{ color: 'var(--primary)' }}
              >
                Contract Intelligence Platform
              </p>
              <h1
                id="hero-heading"
                className="font-display text-5xl md:text-7xl font-semibold leading-tight mb-8"
                style={{ color: 'var(--foreground)' }}
              >
                Every clause,
                <br />
                <em className="not-italic" style={{ color: 'var(--primary)' }}>understood</em>
                <br />
                instantly.
              </h1>
              <p
                className="text-lg md:text-xl leading-relaxed max-w-xl mb-10"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Clausify uses trained legal AI to extract obligations, score risks, and track deadlines across your entire contract portfolio — in seconds, not days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-block px-6 py-3.5 text-sm font-medium text-center transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  Request a demo
                </Link>
                <Link
                  to="/product"
                  className="inline-block px-6 py-3.5 text-sm font-medium text-center border transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  See how it works →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hero image */}
        <section className="px-6 pb-24" aria-hidden="true">
          <div className="max-w-7xl mx-auto">
            <div
              className="w-full rounded-sm overflow-hidden"
              style={{
                height: '420px',
                backgroundColor: 'var(--secondary)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&h=420&fit=crop&auto=format"
                alt="Legal team reviewing contracts"
                width={1400}
                height={420}
                className="w-full h-full object-cover"
                style={{ opacity: 0.7 }}
                loading="eager"
                decoding="async"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, rgba(28,27,24,0.5) 0%, transparent 60%)',
                }}
              />
              <div className="absolute bottom-8 left-8">
                <p
                  className="font-display text-3xl font-medium"
                  style={{ color: '#F5F4F0' }}
                >
                  "We cut contract review<br />from 3 days to 4 hours."
                </p>
                <p className="mt-3 text-sm" style={{ color: 'rgba(245,244,240,0.7)' }}>
                  — Sarah Chen, VP Legal, Meridian Capital
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section
          className="py-12 border-y px-6"
          style={{ borderColor: 'var(--border)' }}
          aria-label="Trusted by leading companies"
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="font-mono text-xs uppercase tracking-widest text-center mb-8"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Trusted by 340+ companies
            </p>
            <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4" role="list">
              {logos.map((name) => (
                <li
                  key={name}
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--muted-foreground)', opacity: 0.55 }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stats */}
        <section
          className="py-20 px-6"
          aria-labelledby="stats-heading"
          style={{ backgroundColor: 'var(--secondary)' }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 id="stats-heading" className="sr-only">Platform statistics</h2>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <dt
                    className="font-display text-4xl md:text-5xl font-semibold mb-2"
                    style={{ color: 'var(--primary)' }}
                  >
                    {value}
                  </dt>
                  <dd
                    className="text-sm leading-snug"
                    style={{ color: 'rgba(245,244,240,0.65)' }}
                  >
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Features */}
        <section
          className="py-24 px-6"
          aria-labelledby="features-heading"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: 'var(--primary)' }}
              >
                Capabilities
              </p>
              <h2
                id="features-heading"
                className="font-display text-4xl md:text-5xl font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                Built for legal precision,
                <br />
                scaled for enterprise speed.
              </h2>
            </div>

            <dl className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border)' }}>
              {features.map(({ num, title, body }) => (
                <div
                  key={num}
                  className="p-10"
                  style={{ backgroundColor: 'var(--background)' }}
                >
                  <dt>
                    <span
                      className="font-mono text-xs tracking-widest"
                      style={{ color: 'var(--primary)' }}
                    >
                      {num}
                    </span>
                    <h3
                      className="font-display text-2xl font-semibold mt-3 mb-4"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {title}
                    </h3>
                  </dt>
                  <dd className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-24 px-6"
          aria-labelledby="cta-heading"
          style={{ backgroundColor: 'var(--muted)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2
                id="cta-heading"
                className="font-display text-4xl font-semibold mb-4"
                style={{ color: 'var(--foreground)' }}
              >
                Ready to review contracts
                <br />at machine speed?
              </h2>
              <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
                Join 340+ legal and procurement teams. Setup takes under 30 minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to="/pricing"
                className="inline-block px-6 py-3.5 text-sm font-medium text-center border transition-colors"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius)',
                }}
              >
                View pricing
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3.5 text-sm font-medium text-center transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  borderRadius: 'var(--radius)',
                }}
              >
                Request demo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
