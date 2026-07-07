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

// Imperatively set per-route <head> tags. Dependency-free — works for Google
// (which executes JS) and for the prerender snapshot (which runs the page).
export function useDocumentMeta({ title, description, path = '/', image }) {
  const url = `${SITE_ORIGIN}${path}`
  const img = absUrl(image)
  useEffect(() => {
    if (title) document.title = title
    upsertMeta('description', 'name', description)
    upsertLink('canonical', url)

    upsertMeta('og:title', 'property', title)
    upsertMeta('og:description', 'property', description)
    upsertMeta('og:url', 'property', url)
    upsertMeta('og:image', 'property', img)

    upsertMeta('twitter:title', 'name', title)
    upsertMeta('twitter:description', 'name', description)
    upsertMeta('twitter:image', 'name', img)
  }, [title, description, url, img])
}
