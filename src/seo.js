import { useEffect } from 'react'

// Canonical origin for the deployed site. Change here if the domain ever moves.
export const SITE_ORIGIN = 'https://demchenko.design'
const DEFAULT_IMAGE = `${SITE_ORIGIN}/images/OG.png`

// Turn a relative path or already-absolute URL into an absolute URL.
export function absUrl(path) {
  if (!path) return DEFAULT_IMAGE
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`
}

// Upsert a <meta> tag identified by name/property.
function upsertMeta(key, keyName, content) {
  if (content == null) return
  let el = document.head.querySelector(`meta[${keyName}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(keyName, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Inject (or clear) a per-route JSON-LD <script>. Kept separate from the
// static Person schema in index.html.
const JSONLD_ID = 'route-jsonld'
function setJsonLd(data) {
  let el = document.getElementById(JSONLD_ID)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = JSONLD_ID
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

// Imperatively set per-route <head> tags. Dependency-free — works for Google
// (which executes JS) and for the prerender snapshot (which runs the page).
export function useDocumentMeta({ title, description, path = '/', image, keywords, jsonLd }) {
  const url = `${SITE_ORIGIN}${path}`
  const img = absUrl(image)
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null
  useEffect(() => {
    if (title) document.title = title
    upsertMeta('description', 'name', description)
    if (keywords) upsertMeta('keywords', 'name', keywords)
    upsertLink('canonical', url)

    upsertMeta('og:title', 'property', title)
    upsertMeta('og:description', 'property', description)
    upsertMeta('og:url', 'property', url)
    upsertMeta('og:image', 'property', img)

    upsertMeta('twitter:title', 'name', title)
    upsertMeta('twitter:description', 'name', description)
    upsertMeta('twitter:image', 'name', img)

    setJsonLd(jsonLdStr ? JSON.parse(jsonLdStr) : null)
  }, [title, description, url, img, keywords, jsonLdStr])
}
