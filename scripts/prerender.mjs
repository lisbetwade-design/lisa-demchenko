// Prerender each route to static HTML so crawlers and social scrapers (which
// don't run JS) get real content + per-page meta tags. Runs AFTER `vite build`
// against the built `dist/` served by `vite preview`.
//
// Fail-soft: if Puppeteer/Chromium isn't available (e.g. a constrained CI),
// it logs a warning and exits 0 so the plain SPA build still ships.
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import net from 'node:net'
import { CASE_STUDIES } from '../src/caseStudyData.js'
import { GUIDES } from '../src/guidesData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 4173
const ORIGIN = `http://localhost:${PORT}`

const ROUTES = [
  '/',
  ...CASE_STUDIES.map(c => `/work/${c.slug}`),
  ...GUIDES.map(g => `/guides/${g.slug}`),
]

// Hosts we don't need for a static snapshot — blocking them avoids hangs.
const BLOCK_HOSTS = [
  'platform.twitter.com',
  'syndication.twitter.com',
  'googletagmanager.com',
  'google-analytics.com',
  'gumroad.com',
  'lovable.app',
  'uxai.directory',
]

function waitForPort(port, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = net.connect(port, '127.0.0.1')
      socket.once('connect', () => { socket.destroy(); resolve() })
      socket.once('error', () => {
        socket.destroy()
        if (Date.now() - start > timeoutMs) reject(new Error('preview server timeout'))
        else setTimeout(tryConnect, 300)
      })
    }
    tryConnect()
  })
}

async function main() {
  if (!existsSync(DIST)) {
    console.warn('[prerender] dist/ not found — run `vite build` first. Skipping.')
    return
  }

  let puppeteer
  try {
    puppeteer = (await import('puppeteer')).default
  } catch {
    console.warn('[prerender] puppeteer not installed — skipping prerender (SPA build still valid).')
    return
  }

  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: join(__dirname, '..'),
    stdio: 'ignore',
  })

  let browser
  try {
    await waitForPort(PORT)
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.setRequestInterception(true)
      page.on('request', req => {
        const url = req.url()
        if (req.resourceType() === 'media' || BLOCK_HOSTS.some(h => url.includes(h))) req.abort()
        else req.continue()
      })

      await page.goto(`${ORIGIN}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
      // Give React time to render + set per-route meta.
      await new Promise(r => setTimeout(r, 3000))

      const html = await page.content()
      const outDir = route === '/' ? DIST : join(DIST, route)
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'index.html'), html, 'utf8')
      console.log(`[prerender] ${route} -> ${join(outDir, 'index.html').replace(DIST, 'dist')}`)
      await page.close()
    }
  } catch (err) {
    console.warn(`[prerender] skipped due to error: ${err.message}`)
  } finally {
    if (browser) await browser.close()
    server.kill()
  }
}

main()
