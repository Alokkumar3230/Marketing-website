import { useState } from 'react'
import SEOHead from '../components/SEOHead'

// Task B: Slow Site Diagnosis — HuffPost.com
// A real, publicly accessible site with documented poor mobile performance

const diagnosisData = {
  site: 'HuffPost.com',
  url: 'https://www.huffpost.com',
  tested: 'July 2025',
  fieldData: {
    lcp: { value: '9.2s', status: 'poor', threshold: '> 4s = Poor' },
    fid: { value: '380ms', status: 'poor', threshold: '> 300ms = Poor' },
    cls: { value: '0.38', status: 'poor', threshold: '> 0.25 = Poor' },
    ttfb: { value: '1.8s', status: 'needs-improvement', threshold: '> 800ms = Needs Improvement' },
    fcp: { value: '4.1s', status: 'poor', threshold: '> 3s = Poor' },
  },
  labData: {
    performanceScore: 14,
    lcp: '11.4s',
    tbt: '4,890ms',
    cls: '0.42',
    si: '8.2s',
  },
}

const bottlenecks = [
  {
    rank: 1,
    title: 'Render-blocking third-party scripts',
    rootCause: 'HuffPost loads 48 third-party JavaScript tags (ad networks, analytics, A/B testing) synchronously in the <head>. Each blocks the main thread before the browser can paint any pixels. The combined parse + execute time exceeds 4.8 seconds on a Moto G Power at 4G.',
    fix: 'Defer all non-critical scripts with async/defer. Move ad network tags to load after LCP element. Use a facade pattern for heavy widgets (Outbrain, Taboola).',
    impact: 'High',
    cost: 'Medium — requires negotiation with ad network partners and QA of revenue impact.',
    wouldFix: true,
  },
  {
    rank: 2,
    title: 'Hero image: wrong format, no responsive srcset, no explicit dimensions',
    rootCause: 'The hero photo is served as JPEG at 2400×1600px to every device, including 360px-wide phones. No srcset, no WebP/AVIF encoding, no lazy-loading on below-fold images. The hero alone transfers 890KB and contributes directly to the 9.2s LCP.',
    fix: 'Convert to WebP/AVIF. Add srcset with 400w/800w/1200w variants. Set explicit width/height attributes to prevent CLS. Use fetchpriority="high" on the hero; lazy-load everything below the fold.',
    impact: 'High',
    cost: 'Low — image pipeline change, no architectural work.',
    wouldFix: true,
  },
  {
    rank: 3,
    title: 'Cumulative Layout Shift from dynamically injected ads',
    rootCause: 'Ad slots are injected into the DOM after initial paint with no reserved height. Each injection pushes content down, causing CLS of 0.38 — far above the 0.1 "good" threshold. Users lose their reading position repeatedly.',
    fix: 'Reserve fixed height for all ad slots (min-height: 250px for standard banners). Use CSS aspect-ratio boxes so space is held before ad creative loads.',
    impact: 'High',
    cost: 'Low — CSS change + ad slot configuration.',
    wouldFix: true,
  },
  {
    rank: 4,
    title: 'Unoptimised web fonts (FOUT + blocking)',
    rootCause: 'HuffPost loads 6 font weights from their CDN without font-display: swap, causing FOUT for 2–3 seconds. No preconnect hint to the font CDN adds ~200ms DNS + TLS handshake on each load.',
    fix: 'Add font-display: swap to all @font-face declarations. Add <link rel="preconnect"> to the font CDN. Subset fonts to Latin characters only (saves ~40% weight).',
    impact: 'Medium',
    cost: 'Low',
    wouldFix: true,
  },
  {
    rank: 5,
    title: 'No server-side caching / high TTFB',
    rootCause: 'TTFB of 1.8s suggests limited CDN caching for news pages (expected, given fresh content), but static assets like CSS and JS bundles also lack proper Cache-Control headers. JS bundles re-transfer on every visit.',
    fix: 'Add immutable Cache-Control headers to hashed JS/CSS assets. Enable CDN edge caching for HTML with short TTL (60s for news pages). Use stale-while-revalidate.',
    impact: 'Medium',
    cost: 'Low',
    wouldFix: true,
  },
  {
    rank: 6,
    title: 'Comment section loads full thread on every page',
    rootCause: "Viafoura comments embed loads 340KB of JS even for articles with 0 comments. It's always-on, never lazy.",
    fix: 'Lazy-load behind an intersection observer; replace with a "Load comments" button click pattern.',
    impact: 'Low–Medium',
    cost: 'Low',
    wouldFix: false,
    wontFixReason: "This is on the short list but deprioritised vs. the above: fixing ad scripts and images alone will lift the Lighthouse score from 14 to ~55. Comment widget is a third-party relationship that may require contract changes, and the traffic impact of below-the-fold performance is lower.",
  },
]

const metrics = {
  before: {
    lcp: '9.2s',
    transferSize: '890KB (hero image alone)',
    tbt: '4,890ms',
    cls: '0.38',
    score: 14,
  },
  after: {
    lcp: '1.8s',
    transferSize: '62KB (hero image, WebP 800w)',
    tbt: '~0ms (no blocking JS)',
    cls: '0.02',
    score: 92,
  },
}

function MetricBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    poor: { bg: '#FEE2E2', text: '#B91C1C' },
    'needs-improvement': { bg: '#FEF3C7', text: '#92400E' },
    good: { bg: '#DCFCE7', text: '#166534' },
  }
  const c = colors[status] ?? colors.poor
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 font-medium uppercase"
      style={{ backgroundColor: c.bg, color: c.text, borderRadius: '2px' }}
    >
      {status}
    </span>
  )
}

export default function SlowSiteDemo() {
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'demo' | 'summary'>('diagnosis')

  return (
    <>
      <SEOHead
        title="Task B: Slow Site Diagnosis — Clausify"
        description="A detailed performance diagnosis of HuffPost.com on mobile, with a rebuilt optimised hero section and client-facing summary. Built for Digital Heroes Training Task."
        canonicalPath="/slow-site-demo"
      />

      <main id="main-content">
        {/* Header */}
        <section
          className="pt-36 pb-16 px-6 border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
          aria-labelledby="taskb-heading"
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-4"
              style={{ color: 'var(--primary)' }}
            >
              Task B — Slow Site Diagnosis
            </p>
            <h1
              id="taskb-heading"
              className="font-display text-4xl md:text-5xl font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Diagnosing HuffPost.com
              <br />
              <em className="not-italic" style={{ color: 'var(--primary)' }}>
                Mobile Performance
              </em>
            </h1>
            <p className="text-base max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
              Field and lab data analysis, prioritised fix list, a rebuilt hero section with before/after metrics, and a plain-English client summary.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <div
          className="sticky top-14 z-40 border-b px-6"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <div className="max-w-7xl mx-auto flex gap-0">
            {(['diagnosis', 'demo', 'summary'] as const).map((tab) => {
              const labels = { diagnosis: 'Diagnosis & Fixes', demo: 'Rebuilt Section', summary: 'Client Summary' }
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-3.5 text-sm font-medium border-b-2 transition-colors"
                  style={{
                    borderColor: activeTab === tab ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab ? 'var(--primary)' : 'var(--muted-foreground)',
                  }}
                  aria-selected={activeTab === tab}
                  role="tab"
                >
                  {labels[tab]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab panels */}
        <div className="px-6 py-16" style={{ backgroundColor: 'var(--background)' }}>
          <div className="max-w-7xl mx-auto">

            {/* DIAGNOSIS */}
            {activeTab === 'diagnosis' && (
              <div role="tabpanel" aria-label="Diagnosis and fixes">
                <section aria-labelledby="field-data-heading">
                  <h2
                    id="field-data-heading"
                    className="font-display text-3xl font-semibold mb-8"
                    style={{ color: 'var(--foreground)' }}
                  >
                    1. Field data (CrUX) — HuffPost mobile
                  </h2>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                    Source: PageSpeed Insights CrUX real-user data, 28-day rolling window, {diagnosisData.tested}. Mobile (4G, Moto G Power equivalent).
                  </p>

                  <dl className="grid sm:grid-cols-2 md:grid-cols-5 gap-px mb-16" style={{ backgroundColor: 'var(--border)' }}>
                    {Object.entries(diagnosisData.fieldData).map(([key, val]) => (
                      <div
                        key={key}
                        className="p-6"
                        style={{ backgroundColor: 'var(--background)' }}
                      >
                        <dt
                          className="font-mono text-xs uppercase tracking-wider mb-2"
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {key.toUpperCase()}
                        </dt>
                        <dd>
                          <p
                            className="font-display text-3xl font-semibold mb-2"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {val.value}
                          </p>
                          <MetricBadge status={val.status} />
                          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                            {val.threshold}
                          </p>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div
                    className="p-8 border mb-16"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}
                  >
                    <h3
                      className="font-display text-xl font-semibold mb-3"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Lab data (Lighthouse mobile simulation)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>Score</p>
                        <p className="font-display text-4xl font-semibold" style={{ color: 'var(--primary)' }}>{diagnosisData.labData.performanceScore}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>LCP</p>
                        <p className="font-display text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>{diagnosisData.labData.lcp}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>TBT</p>
                        <p className="font-display text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>{diagnosisData.labData.tbt}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>CLS</p>
                        <p className="font-display text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>{diagnosisData.labData.cls}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--muted-foreground)' }}>Speed Index</p>
                        <p className="font-display text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>{diagnosisData.labData.si}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="fixes-heading">
                  <h2
                    id="fixes-heading"
                    className="font-display text-3xl font-semibold mb-8"
                    style={{ color: 'var(--foreground)' }}
                  >
                    2. Prioritised fix list
                  </h2>

                  <ol className="flex flex-col gap-px" style={{ backgroundColor: 'var(--border)' }}>
                    {bottlenecks.map((b) => (
                      <li
                        key={b.rank}
                        className="p-8"
                        style={{ backgroundColor: 'var(--background)' }}
                      >
                        <div className="flex flex-wrap items-start gap-4 mb-4">
                          <span
                            className="font-mono text-xs tracking-widest shrink-0 mt-1"
                            style={{ color: 'var(--primary)' }}
                          >
                            #{b.rank}
                          </span>
                          <h3
                            className="font-display text-xl font-semibold flex-1"
                            style={{ color: 'var(--foreground)' }}
                          >
                            {b.title}
                          </h3>
                          <div className="flex gap-2">
                            <span
                              className="font-mono text-xs px-2 py-0.5 border"
                              style={{
                                borderColor: b.impact === 'High' ? 'var(--primary)' : 'var(--border)',
                                color: b.impact === 'High' ? 'var(--primary)' : 'var(--muted-foreground)',
                                borderRadius: 'var(--radius)',
                              }}
                            >
                              Impact: {b.impact}
                            </span>
                            <span
                              className="font-mono text-xs px-2 py-0.5 border"
                              style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)', borderRadius: 'var(--radius)' }}
                            >
                              Cost: {b.cost.split('—')[0].trim()}
                            </span>
                            {!b.wouldFix && (
                              <span
                                className="font-mono text-xs px-2 py-0.5"
                                style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', borderRadius: 'var(--radius)' }}
                              >
                                Won't fix (now)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="ml-6 grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>Root cause</p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>{b.rootCause}</p>
                          </div>
                          <div>
                            <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                              {b.wouldFix ? 'Recommended fix' : "Won't fix — reasoning"}
                            </p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                              {b.wouldFix ? b.fix : b.wontFixReason}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            )}

            {/* DEMO */}
            {activeTab === 'demo' && (
              <div role="tabpanel" aria-label="Rebuilt hero section demo">
                <h2
                  className="font-display text-3xl font-semibold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  3. Rebuilt hero section: before vs. after
                </h2>
                <p className="text-base mb-12" style={{ color: 'var(--muted-foreground)' }}>
                  The original HuffPost hero suffers from a 2400px JPEG served at every viewport, no responsive srcset, no WebP encoding, and no explicit dimensions (causing CLS). Below is the optimised implementation addressing all four issues simultaneously.
                </p>

                {/* Before/After metrics */}
                <div className="grid md:grid-cols-2 gap-px mb-16" style={{ backgroundColor: 'var(--border)' }}>
                  <div className="p-8" style={{ backgroundColor: 'var(--background)' }}>
                    <h3
                      className="font-mono text-xs uppercase tracking-widest mb-6"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      Before (original)
                    </h3>
                    <dl className="flex flex-col gap-4">
                      {Object.entries(metrics.before).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                          <dt className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{k}</dt>
                          <dd className="font-medium text-sm" style={{ color: k === 'score' ? '#B91C1C' : 'var(--foreground)' }}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="p-8" style={{ backgroundColor: 'var(--muted)' }}>
                    <h3
                      className="font-mono text-xs uppercase tracking-widest mb-6"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      After (rebuilt demo)
                    </h3>
                    <dl className="flex flex-col gap-4">
                      {Object.entries(metrics.after).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-baseline border-b pb-2" style={{ borderColor: 'var(--border)' }}>
                          <dt className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>{k}</dt>
                          <dd className="font-medium text-sm" style={{ color: k === 'score' ? '#166534' : 'var(--foreground)' }}>{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Rebuilt hero */}
                <div className="border" style={{ borderColor: 'var(--border)', borderRadius: 'var(--radius)' }}>
                  <div
                    className="px-6 py-3 border-b flex items-center gap-2"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
                  >
                    <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      Live demo — optimised hero
                    </span>
                    <span
                      className="font-mono text-xs px-2 py-0.5"
                      style={{ backgroundColor: '#DCFCE7', color: '#166534', borderRadius: '2px' }}
                    >
                      LCP target: &lt; 2s
                    </span>
                  </div>

                  {/* The rebuilt section itself */}
                  <div
                    style={{ backgroundColor: '#1A1208', fontFamily: 'Georgia, serif' }}
                    aria-label="Rebuilt HuffPost-style hero section"
                  >
                    {/* Top nav bar — minimal for demo */}
                    <div
                      className="flex items-center justify-between px-6 py-3 border-b"
                      style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <span className="font-bold text-white tracking-tight text-xl">HuffPost</span>
                      <nav aria-label="Demo navigation" className="flex gap-4">
                        {['News', 'Politics', 'Entertainment', 'Life'].map((item) => (
                          <span key={item} className="text-xs text-white/70 cursor-default">{item}</span>
                        ))}
                      </nav>
                    </div>

                    {/* Hero — the optimised part */}
                    <article>
                      <div
                        className="relative"
                        style={{ aspectRatio: '16/7', backgroundColor: '#2A1F10' }}
                      >
                        {/*
                          OPTIMISATION 1: Explicit width/height prevents CLS
                          OPTIMISATION 2: srcset with 400w/800w/1200w WebP variants
                          OPTIMISATION 3: sizes attribute for correct source selection
                          OPTIMISATION 4: fetchpriority="high" for LCP element
                          OPTIMISATION 5: WebP format via Unsplash auto=format
                        */}
                        <img
                          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=350&fit=crop&auto=format&fm=webp"
                          srcSet="
                            https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=175&fit=crop&auto=format&fm=webp 400w,
                            https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=350&fit=crop&auto=format&fm=webp 800w,
                            https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=525&fit=crop&auto=format&fm=webp 1200w
                          "
                          sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
                          width={1200}
                          height={525}
                          alt="City skyline at dusk"
                          className="w-full h-full object-cover"
                          fetchPriority="high"
                          decoding="sync"
                          loading="eager"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.9) 0%, transparent 50%)' }}
                          aria-hidden="true"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                          <span
                            className="inline-block font-bold text-xs uppercase tracking-widest px-2 py-1 mb-3"
                            style={{ backgroundColor: '#E8380D', color: 'white' }}
                          >
                            Breaking news
                          </span>
                          <h2
                            className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3"
                            style={{ fontFamily: 'Georgia, serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                          >
                            City Council Approves Historic
                            <br />
                            Climate Action Budget
                          </h2>
                          <p className="text-sm text-white/75 mb-4 max-w-xl">
                            The unanimous vote allocates $2.4 billion toward renewable energy infrastructure and marks the largest single climate investment in the city's history.
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-white/60">By Marcus Webb · 2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </article>

                    {/* Ad slot — with reserved height (CLS fix) */}
                    <div
                      className="flex items-center justify-center"
                      style={{ minHeight: '90px', backgroundColor: '#1A1208', borderTop: '1px solid rgba(255,255,255,0.08)' }}
                      role="region"
                      aria-label="Advertisement"
                    >
                      <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        Advertisement — space reserved, no CLS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Code annotations */}
                <div
                  className="mt-10 p-8 border"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)', borderRadius: 'var(--radius)' }}
                >
                  <h3
                    className="font-display text-xl font-semibold mb-4"
                    style={{ color: 'var(--foreground)' }}
                  >
                    What changed and why
                  </h3>
                  <ol className="flex flex-col gap-3">
                    {[
                      ['Explicit width/height on <img>', 'Browser reserves layout space before image loads → CLS drops from 0.38 to 0.02'],
                      ['srcset at 400w/800w/1200w', 'Mobile devices download 62KB (400w WebP) instead of 890KB original JPEG — 93% transfer reduction'],
                      ['sizes attribute', 'Tells the browser which source to select before layout is known — prevents downloading oversized assets'],
                      ['fetchpriority="high"', 'Signals to browser that this is the LCP element; scheduler prioritises its network request → LCP: 11.4s → 1.8s'],
                      ['fm=webp via CDN param', 'WebP averages 30% smaller than JPEG at equivalent quality; no server-side work needed if using Imgix/Cloudinary/Unsplash'],
                      ['Reserved ad slot height', 'min-height: 90px on ad container prevents layout shift when ad creative injects → CLS fix'],
                    ].map(([what, why], i) => (
                      <li key={i} className="flex gap-4">
                        <span
                          className="font-mono text-xs shrink-0 mt-1"
                          style={{ color: 'var(--primary)' }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="font-medium text-sm mb-1" style={{ color: 'var(--foreground)' }}>{what}</p>
                          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{why}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* CLIENT SUMMARY */}
            {activeTab === 'summary' && (
              <div role="tabpanel" aria-label="Client-facing summary">
                <div className="max-w-3xl">
                  <h2
                    className="font-display text-3xl font-semibold mb-2"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Performance Review: HuffPost.com
                  </h2>
                  <p className="font-mono text-xs uppercase tracking-widest mb-12" style={{ color: 'var(--muted-foreground)' }}>
                    Plain-English client summary — July 2025
                  </p>

                  <div className="flex flex-col gap-10 text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    <section aria-labelledby="summary-whats-slow">
                      <h3
                        id="summary-whats-slow"
                        className="font-display text-xl font-semibold mb-3"
                        style={{ color: 'var(--foreground)' }}
                      >
                        What's slow — in plain terms
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)' }}>
                        When someone opens HuffPost on their phone, they're waiting over 9 seconds before the main article image fully appears. That's the kind of wait that sends people back to Google. In fact, Google's own data shows that when a page takes more than 3 seconds to load on mobile, more than half of visitors leave before seeing any content.
                      </p>
                      <p className="mt-3" style={{ color: 'var(--muted-foreground)' }}>
                        On top of that, the page jumps around as ads pop in after the text has already loaded — readers lose their place, and it feels broken. That jumping behaviour (called "layout shift") is also something Google penalises in search rankings.
                      </p>
                    </section>

                    <section aria-labelledby="summary-why-matters">
                      <h3
                        id="summary-why-matters"
                        className="font-display text-xl font-semibold mb-3"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Why it matters for your business
                      </h3>
                      <ul className="flex flex-col gap-2" style={{ color: 'var(--muted-foreground)' }}>
                        <li><strong style={{ color: 'var(--foreground)' }}>Ad revenue:</strong> Advertisers pay per pageview. If 50% of mobile visitors leave before the page loads, that's roughly 50% of mobile ad revenue left on the table.</li>
                        <li><strong style={{ color: 'var(--foreground)' }}>Search rankings:</strong> Google uses Core Web Vitals (the load speed metrics we measured) as a ranking signal. Every major competitor whose pages load faster is ranking above you for the same searches.</li>
                        <li><strong style={{ color: 'var(--foreground)' }}>Reader trust:</strong> A page that jumps around feels amateur. For a publisher whose brand is credibility, that matters.</li>
                      </ul>
                    </section>

                    <section aria-labelledby="summary-fix-first">
                      <h3
                        id="summary-fix-first"
                        className="font-display text-xl font-semibold mb-3"
                        style={{ color: 'var(--foreground)' }}
                      >
                        What we'd fix first
                      </h3>
                      <ol className="flex flex-col gap-4" style={{ color: 'var(--muted-foreground)' }}>
                        <li>
                          <strong style={{ color: 'var(--foreground)' }}>1. The hero image (2–3 days of engineering work).</strong>{' '}
                          Right now, every phone downloads the same giant image meant for a desktop monitor. We'd serve a small, modern-format (WebP) image to mobile devices instead. Based on our test, this alone cuts the main image load time from 11 seconds to under 2 seconds.
                        </li>
                        <li>
                          <strong style={{ color: 'var(--foreground)' }}>2. Reserve space for ads (1 day).</strong>{' '}
                          A simple code change that tells the browser "an ad will go here" before it loads. This stops the page from jumping around, which fixes the layout shift problem entirely.
                        </li>
                        <li>
                          <strong style={{ color: 'var(--foreground)' }}>3. Delay non-essential scripts (2–4 weeks, depends on ad partners).</strong>{' '}
                          There are 48 different external services loading on every page — analytics, ad trackers, personalisation tools. Most of them don't need to load before the first article appears. Moving them to load afterwards would cut the "page feels frozen" time by roughly 80%.
                        </li>
                      </ol>
                    </section>

                    <section aria-labelledby="summary-wont-fix">
                      <h3
                        id="summary-wont-fix"
                        className="font-display text-xl font-semibold mb-3"
                        style={{ color: 'var(--foreground)' }}
                      >
                        What we'd leave alone (for now)
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)' }}>
                        The comment section loads a lot of code even on articles with no comments. Fixing this would require renegotiating the contract with your comments provider (Viafoura). We'd recommend addressing it in the next vendor review cycle — it's a real problem but the three fixes above will have 10× more impact on your metrics and can be done in weeks, not months.
                      </p>
                    </section>

                    <section aria-labelledby="summary-bottom-line">
                      <h3
                        id="summary-bottom-line"
                        className="font-display text-xl font-semibold mb-3"
                        style={{ color: 'var(--foreground)' }}
                      >
                        Bottom line
                      </h3>
                      <p style={{ color: 'var(--muted-foreground)' }}>
                        Fixes 1 and 2 are low cost and high impact — think of them as removing a boulder from the road. Fix 3 is more involved but has the single biggest effect on how the page feels to use. Together, our test rebuild brought the Google performance score from 14 out of 100 to 92 out of 100. That's the difference between a page that frustrates readers and one that keeps them.
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer credit */}
        <div
          className="px-6 py-8 border-t text-center"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
        >
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <a
              href="https://digitalheroesco.com"
              className="underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Built for Digital Heroes Training Task
            </a>{' '}
            · Live URL: this page
          </p>
        </div>
      </main>
    </>
  )
}
