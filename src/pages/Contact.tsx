import { useState } from 'react'
import SEOHead from '../components/SEOHead'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Clausify',
  url: 'https://clausify.io',
  email: 'hello@clausify.io',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '340 Pine Street, Suite 900',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94104',
    addressCountry: 'US',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'sales@clausify.io',
      telephone: '+1-415-555-0182',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@clausify.io',
    },
  ],
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    contractVolume: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.company.trim()) e.company = 'Company name is required'
    return e
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1400)
  }

  const field = (
    id: keyof typeof form,
    label: string,
    type = 'text',
    required = false,
    placeholder = ''
  ) => (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: 'var(--foreground)' }}
      >
        {label}
        {required && (
          <span aria-hidden="true" style={{ color: 'var(--primary)' }}> *</span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={form[id]}
        onChange={(e) => {
          setForm((f) => ({ ...f, [id]: e.target.value }))
          if (errors[id]) setErrors((er) => ({ ...er, [id]: undefined }))
        }}
        placeholder={placeholder}
        required={required}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        aria-invalid={!!errors[id]}
        className="px-4 py-3 border text-sm transition-colors"
        style={{
          borderColor: errors[id] ? 'var(--primary)' : 'var(--border)',
          backgroundColor: 'var(--card)',
          color: 'var(--foreground)',
          borderRadius: 'var(--radius)',
          outline: 'none',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--ring)')}
        onBlur={(e) => (e.target.style.borderColor = errors[id] ? 'var(--primary)' : 'var(--border)')}
      />
      {errors[id] && (
        <p id={`${id}-error`} role="alert" className="text-xs" style={{ color: 'var(--primary)' }}>
          {errors[id]}
        </p>
      )}
    </div>
  )

  return (
    <>
      <SEOHead
        title="Contact — Clausify"
        description="Talk to the Clausify team about pricing, integration, or a live demo. Reach us at hello@clausify.io or +1-415-555-0182."
        canonicalPath="/contact"
        jsonLd={contactSchema}
      />

      <main id="main-content">
        <section
          className="pt-36 pb-24 px-6"
          aria-labelledby="contact-heading"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-6"
                style={{ color: 'var(--primary)' }}
              >
                Get in touch
              </p>
              <h1
                id="contact-heading"
                className="font-display text-5xl font-semibold leading-tight mb-8"
                style={{ color: 'var(--foreground)' }}
              >
                Let's talk
                <br />contracts.
              </h1>
              <p
                className="text-lg leading-relaxed mb-12"
                style={{ color: 'var(--muted-foreground)' }}
              >
                Whether you want a demo, have a billing question, or need a custom Enterprise quote — we respond within one business day.
              </p>

              <address className="not-italic flex flex-col gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)' }}>
                    Sales
                  </p>
                  <a
                    href="mailto:sales@clausify.io"
                    className="text-base underline underline-offset-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    sales@clausify.io
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)' }}>
                    Phone
                  </p>
                  <a
                    href="tel:+14155550182"
                    className="text-base underline underline-offset-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    +1 (415) 555-0182
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--muted-foreground)' }}>
                    Office
                  </p>
                  <p className="text-base" style={{ color: 'var(--foreground)' }}>
                    340 Pine Street, Suite 900<br />
                    San Francisco, CA 94104
                  </p>
                </div>
              </address>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div
                  className="p-10 border h-full flex flex-col justify-center"
                  style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}
                  role="status"
                  aria-live="polite"
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: 'var(--primary)' }}
                  >
                    Sent
                  </p>
                  <h2
                    className="font-display text-3xl font-semibold mb-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    We'll be in touch shortly.
                  </h2>
                  <p className="text-base" style={{ color: 'var(--muted-foreground)' }}>
                    Expect a reply from our team within one business day. If your request is urgent, call us directly at +1 (415) 555-0182.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-labelledby="form-heading"
                  className="flex flex-col gap-5"
                >
                  <h2
                    id="form-heading"
                    className="font-display text-2xl font-semibold mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Request a demo or ask anything
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {field('name', 'Full name', 'text', true, 'Jane Smith')}
                    {field('email', 'Work email', 'email', true, 'jane@company.com')}
                  </div>
                  {field('company', 'Company', 'text', true, 'Acme Corp')}

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contractVolume"
                      className="text-sm font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Monthly contract volume
                    </label>
                    <select
                      id="contractVolume"
                      name="contractVolume"
                      value={form.contractVolume}
                      onChange={(e) => setForm((f) => ({ ...f, contractVolume: e.target.value }))}
                      className="px-4 py-3 border text-sm"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--card)',
                        color: form.contractVolume ? 'var(--foreground)' : 'var(--muted-foreground)',
                        borderRadius: 'var(--radius)',
                        outline: 'none',
                      }}
                    >
                      <option value="">Select range…</option>
                      <option value="under-50">Under 50</option>
                      <option value="50-200">50 – 200</option>
                      <option value="200-500">200 – 500</option>
                      <option value="500-plus">500+</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      rows={4}
                      placeholder="Tell us what you'd like to discuss…"
                      className="px-4 py-3 border text-sm resize-none"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--card)',
                        color: 'var(--foreground)',
                        borderRadius: 'var(--radius)',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--ring)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="px-6 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      borderRadius: 'var(--radius)',
                    }}
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>

                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    By submitting this form you agree to our{' '}
                    <a
                      href="https://clausify.io/privacy"
                      className="underline underline-offset-2"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
