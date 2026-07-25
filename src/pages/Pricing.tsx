import { useState } from 'react'
import SEOHead from '../components/SEOHead'
import { Link } from 'react-router-dom'

const pricingSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Clausify',
    url: 'https://clausify.io',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Clausify Contract Intelligence Platform',
    provider: { '@type': 'Organization', name: 'Clausify' },
    description: 'AI-powered contract analysis, obligation extraction, and risk scoring for legal and procurement teams.',
    url: 'https://clausify.io/pricing',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Clausify Plans',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '49',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', billingIncrement: 1, unitCode: 'MON' },
          description: 'Up to 50 contracts per month, 2 team members, core extraction features.',
        },
        {
          '@type': 'Offer',
          name: 'Professional',
          price: '199',
          priceCurrency: 'USD',
          priceSpecification: { '@type': 'UnitPriceSpecification', billingIncrement: 1, unitCode: 'MON' },
          description: 'Up to 500 contracts per month, 10 team members, integrations, and playbook enforcement.',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          description: 'Unlimited contracts, unlimited users, SSO, custom deployment, and dedicated support.',
        },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What counts as a contract?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Any document processed through the AI analysis engine counts as one contract — regardless of page count or number of parties.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I change plans later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every plan comes with a 14-day free trial. No credit card required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is data handled?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All contracts are encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your data to train our models. SOC 2 Type II certified.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer annual discounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — pay annually and save 20% on Starter and Professional plans.',
        },
      },
    ],
  },
]

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For small legal teams exploring AI-assisted review.',
    features: [
      '50 contracts / month',
      '2 team members',
      'Obligation extraction',
      'Risk scoring',
      'PDF & Word upload',
      'CSV export',
      'Email support',
    ],
    cta: 'Start free trial',
    highlight: false,
  },
  {
    name: 'Professional',
    monthlyPrice: 199,
    annualPrice: 159,
    description: 'For growing legal and procurement teams with high contract volume.',
    features: [
      '500 contracts / month',
      '10 team members',
      'Everything in Starter',
      'Playbook enforcement',
      'Redline comparison',
      'Salesforce + DocuSign integration',
      'Deadline calendar sync',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For large organisations with complex security and deployment needs.',
    features: [
      'Unlimited contracts',
      'Unlimited users',
      'Everything in Professional',
      'SSO / SAML',
      'Private cloud deployment',
      'Custom taxonomy',
      'SLA guarantee',
      'Dedicated success manager',
    ],
    cta: 'Talk to sales',
    highlight: false,
  },
]

const faqs = [
  {
    q: 'What counts as a contract?',
    a: 'Any document processed through the AI analysis engine counts as one contract — regardless of page count or number of parties.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Every plan comes with a 14-day free trial. No credit card required.',
  },
  {
    q: 'How is data handled?',
    a: 'All contracts are encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your data to train our models. SOC 2 Type II certified.',
  },
  {
    q: 'Do you offer annual discounts?',
    a: 'Yes — pay annually and save 20% on Starter and Professional plans.',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <SEOHead
        title="Pricing — Clausify"
        description="Simple, transparent pricing for every stage of growth. Starter at $49/mo, Professional at $199/mo, Enterprise custom. 14-day free trial, no credit card required."
        canonicalPath="/pricing"
        jsonLd={pricingSchema}
      />

      <main id="main-content">
        {/* Hero */}
        <section
          className="pt-36 pb-16 px-6"
          aria-labelledby="pricing-heading"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: 'var(--primary)' }}
            >
              Pricing
            </p>
            <h1
              id="pricing-heading"
              className="font-display text-5xl md:text-6xl font-semibold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Simple pricing.
              <br />No surprises.
            </h1>
            <p
              className="text-lg max-w-lg mx-auto mb-10"
              style={{ color: 'var(--muted-foreground)' }}
            >
              14-day free trial on all plans. No credit card required.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 p-1 border" style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}>
              <button
                onClick={() => setAnnual(false)}
                className="px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: !annual ? 'var(--foreground)' : 'transparent',
                  color: !annual ? 'var(--background)' : 'var(--muted-foreground)',
                  borderRadius: 'var(--radius)',
                }}
                aria-pressed={!annual}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className="px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: annual ? 'var(--foreground)' : 'transparent',
                  color: annual ? 'var(--background)' : 'var(--muted-foreground)',
                  borderRadius: 'var(--radius)',
                }}
                aria-pressed={annual}
              >
                Annual
                <span
                  className="ml-2 font-mono text-xs px-1.5 py-0.5"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  −20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section
          className="py-12 px-6"
          aria-label="Pricing plans"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--border)' }}>
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="p-8 flex flex-col"
                  style={{
                    backgroundColor: plan.highlight ? 'var(--secondary)' : 'var(--background)',
                  }}
                  aria-label={`${plan.name} plan`}
                >
                  <h2
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: plan.highlight ? 'rgba(245,244,240,0.5)' : 'var(--muted-foreground)' }}
                  >
                    {plan.name}
                  </h2>
                  <div className="mb-4">
                    {plan.monthlyPrice ? (
                      <p>
                        <span
                          className="font-display text-5xl font-semibold"
                          style={{ color: plan.highlight ? 'var(--background)' : 'var(--foreground)' }}
                        >
                          ${annual ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span
                          className="text-sm ml-1"
                          style={{ color: plan.highlight ? 'rgba(245,244,240,0.5)' : 'var(--muted-foreground)' }}
                        >
                          / month
                        </span>
                      </p>
                    ) : (
                      <p
                        className="font-display text-4xl font-semibold"
                        style={{ color: plan.highlight ? 'var(--background)' : 'var(--foreground)' }}
                      >
                        Custom
                      </p>
                    )}
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ color: plan.highlight ? 'rgba(245,244,240,0.65)' : 'var(--muted-foreground)' }}
                  >
                    {plan.description}
                  </p>

                  <ul className="flex flex-col gap-2.5 mb-10 flex-1" role="list">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: plan.highlight ? 'rgba(245,244,240,0.85)' : 'var(--foreground)' }}
                      >
                        <span
                          className="w-4 h-4 flex items-center justify-center shrink-0"
                          style={{ color: 'var(--primary)' }}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="block text-center px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: plan.highlight ? 'var(--primary)' : 'var(--foreground)',
                      color: 'var(--background)',
                      borderRadius: 'var(--radius)',
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="py-24 px-6 border-t"
          aria-labelledby="faq-heading"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              id="faq-heading"
              className="font-display text-4xl font-semibold mb-12"
              style={{ color: 'var(--foreground)' }}
            >
              Frequently asked questions
            </h2>
            <dl className="flex flex-col divide-y" style={{ borderColor: 'var(--border)' }}>
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="py-5">
                  <dt>
                    <button
                      className="w-full flex items-center justify-between text-left gap-4"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <span
                        className="font-display text-lg font-semibold"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {q}
                      </span>
                      <span
                        className="text-xl shrink-0 transition-transform"
                        style={{
                          color: 'var(--primary)',
                          transform: openFaq === i ? 'rotate(45deg)' : 'none',
                        }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-answer-${i}`}
                    role="region"
                    className="overflow-hidden transition-all"
                    style={{ maxHeight: openFaq === i ? '200px' : '0', opacity: openFaq === i ? 1 : 0 }}
                  >
                    <p className="pt-4 text-base leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {a}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-16 px-6 border-t text-center"
          aria-labelledby="pricing-cta-heading"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <h2
            id="pricing-cta-heading"
            className="font-display text-3xl font-semibold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Still have questions?
          </h2>
          <p className="text-base mb-8" style={{ color: 'var(--muted-foreground)' }}>
            Our team will walk you through the right plan for your contract volume and team size.
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              borderRadius: 'var(--radius)',
            }}
          >
            Talk to sales
          </Link>
        </section>
      </main>
    </>
  )
}
