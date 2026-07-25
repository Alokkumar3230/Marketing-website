import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'

const productSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clausify',
    url: 'https://clausify.io',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Clausify',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'AI-powered contract intelligence platform that extracts obligations, scores risks, and tracks deadlines across enterprise contract portfolios.',
    url: 'https://clausify.io/product',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '49',
      highPrice: '199',
      priceCurrency: 'USD',
      offerCount: '3',
    },
    provider: {
      '@type': 'Organization',
      name: 'Clausify',
    },
  },
]

const steps = [
  {
    num: '01',
    title: 'Upload any contract',
    body: 'Drag in PDFs, Word documents, or Google Docs. Clausify handles MSAs, NDAs, SOWs, employment agreements, real estate leases, and 60+ other contract types.',
    img: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop&auto=format',
    alt: 'Person uploading documents on laptop',
  },
  {
    num: '02',
    title: 'AI reads every clause',
    body: "Our fine-tuned legal language model, trained on 4.2 million attorney-reviewed contracts, identifies every obligation, risk, right, and remedy — categorised by type and party.",
    img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&auto=format',
    alt: 'AI processing data on screen',
  },
  {
    num: '03',
    title: 'Review. Approve. Export.',
    body: 'Attorneys confirm extractions, sign off on risk scores, and export clean obligation matrices to Excel or your CLM. Full audit trail for compliance.',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop&auto=format',
    alt: 'Team reviewing documents',
  },
]

const integrations = [
  'Salesforce', 'DocuSign', 'Ironclad', 'SharePoint', 'Slack', 'Jira', 'Workday', 'SAP',
]

const detailFeatures = [
  { title: 'Playbook enforcement', body: 'Define your legal standards once. Clausify flags every deviation automatically, across every contract.' },
  { title: 'Multi-party support', body: 'Handle contracts with 3, 5, even 12 parties. Obligations are assigned to the correct counterparty, every time.' },
  { title: 'Version tracking', body: 'Every redline is preserved. Understand how a contract evolved from first draft to execution in a single timeline view.' },
  { title: 'Bulk portfolio analysis', body: 'Upload 500 contracts at once. Receive a complete risk dashboard and obligation matrix within the hour.' },
  { title: 'SOC 2 Type II', body: 'All data encrypted at rest and in transit. Annual third-party audits. Private cloud deployment available.' },
  { title: 'Custom taxonomy', body: 'Map Clausify\'s extraction categories to your own clause library. No vendor lock-in to our ontology.' },
]

export default function Product() {
  return (
    <>
      <SEOHead
        title="Product — Clausify"
        description="Learn how Clausify's legal AI extracts obligations, scores risks, and tracks deadlines across your contract portfolio. Integrates with Salesforce, DocuSign, Ironclad and more."
        canonicalPath="/product"
        jsonLd={productSchema}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          className="pt-36 pb-20 px-6"
          aria-labelledby="product-heading"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: 'var(--primary)' }}
            >
              How it works
            </p>
            <h1
              id="product-heading"
              className="font-display text-5xl md:text-6xl font-semibold leading-tight mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Contract intelligence
              <br />
              that works like a
              <br />
              <em className="not-italic" style={{ color: 'var(--primary)' }}>senior attorney.</em>
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Clausify doesn't just parse contracts — it understands them. Built on 4.2 million attorney-reviewed agreements, it thinks in the same categories your legal team does.
            </p>
          </div>
        </section>

        {/* How it works — steps */}
        <section
          className="py-24 px-6"
          aria-labelledby="how-it-works-heading"
          id="how-it-works"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="how-it-works-heading"
              className="font-display text-3xl font-semibold mb-16"
              style={{ color: 'var(--foreground)' }}
            >
              Three steps from upload to insight
            </h2>
            <ol className="flex flex-col gap-24" role="list">
              {steps.map(({ num, title, body, img, alt }, i) => (
                <li
                  key={num}
                  className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
                >
                  <div>
                    <span
                      className="font-mono text-xs tracking-widest"
                      style={{ color: 'var(--primary)' }}
                    >
                      Step {num}
                    </span>
                    <h3
                      className="font-display text-3xl font-semibold mt-3 mb-5"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {body}
                    </p>
                  </div>
                  <div
                    className="overflow-hidden rounded-sm"
                    style={{ backgroundColor: 'var(--muted)', height: '320px' }}
                  >
                    <img
                      src={img}
                      alt={alt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features grid */}
        <section
          className="py-24 px-6 border-t"
          aria-labelledby="features-heading"
          id="features"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="features-heading"
              className="font-display text-4xl font-semibold mb-16"
              style={{ color: 'var(--foreground)' }}
            >
              Everything legal operations
              <br />teams need.
            </h2>
            <dl className="grid sm:grid-cols-2 md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border)' }}>
              {detailFeatures.map(({ title, body }) => (
                <div key={title} className="p-8" style={{ backgroundColor: 'var(--muted)' }}>
                  <dt
                    className="font-display text-lg font-semibold mb-3"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {title}
                  </dt>
                  <dd className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Integrations */}
        <section
          className="py-20 px-6 border-t"
          aria-labelledby="integrations-heading"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="integrations-heading"
              className="font-display text-3xl font-semibold mb-10"
              style={{ color: 'var(--foreground)' }}
            >
              Plugs into your existing stack
            </h2>
            <ul className="flex flex-wrap gap-4" role="list">
              {integrations.map((name) => (
                <li
                  key={name}
                  className="px-5 py-2.5 border text-sm font-medium"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Plus REST API and webhooks for custom integrations.{' '}
              <a href="https://docs.clausify.io/integrations" className="underline underline-offset-2">
                View all integrations →
              </a>
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-20 px-6 border-t"
          aria-labelledby="product-cta-heading"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2
              id="product-cta-heading"
              className="font-display text-3xl font-semibold"
              style={{ color: 'var(--background)' }}
            >
              See Clausify in action
              <br />with your own contracts.
            </h2>
            <Link
              to="/contact"
              className="shrink-0 inline-block px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius)',
              }}
            >
              Request a live demo
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
