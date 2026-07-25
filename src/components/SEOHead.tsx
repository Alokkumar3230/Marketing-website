import { useEffect } from 'react'

interface SEOHeadProps {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalPath?: string
  jsonLd?: object | object[]
}

export default function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = 'https://clausify.io/og-default.png',
  canonicalPath = '',
  jsonLd,
}: SEOHeadProps) {
  const siteUrl = 'https://clausify.io'
  const fullTitle = title.includes('Clausify') ? title : `${title} — Clausify`

  useEffect(() => {
    document.title = fullTitle

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('og:title', ogTitle ?? fullTitle, true)
    setMeta('og:description', ogDescription ?? description, true)
    setMeta('og:image', ogImage, true)
    setMeta('og:url', siteUrl + canonicalPath, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', 'Clausify', true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', ogTitle ?? fullTitle)
    setMeta('twitter:description', ogDescription ?? description)
    setMeta('twitter:image', ogImage)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link') as HTMLLinkElement
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = siteUrl + canonicalPath

    const existing = document.querySelectorAll('script[data-seo-jsonld]')
    existing.forEach((s) => s.remove())

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      schemas.forEach((schema) => {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-seo-jsonld', 'true')
        script.textContent = JSON.stringify(schema)
        document.head.appendChild(script)
      })
    }

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove())
    }
  }, [fullTitle, description, ogTitle, ogDescription, ogImage, canonicalPath, jsonLd])

  return null
}
