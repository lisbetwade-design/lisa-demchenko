import { useEffect, useRef, useState } from 'react'
// `motion` is used via namespaced JSX (<motion.div>), which this ESLint config
// (no eslint-plugin-react) can't detect — hence the disable.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, MotionConfig } from 'motion/react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import { pageVariants, staggerContainer, fadeUp } from './motion'
import portrait from './IMG_7244 1.png'
import paprrImg from './paprr.png'
import claudeGuideImg from './claude-guide.png'
import reviuImg from './reviu.png'
import { CASE_STUDIES, getCaseStudy } from './caseStudyData'
import CaseStudyPage from './CaseStudyPage'

// ─── Brand tokens as JS constants ───────────────────────────────────────────
const PURPLE = '#5C3AFF'

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function StatNumber({ value }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const num = parseInt(value.replace(/\D/g, ''), 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let frame = 0
    const totalFrames = 60
    const timer = setInterval(() => {
      frame++
      setCount(Math.round(num * (frame / totalFrames)))
      if (frame >= totalFrames) clearInterval(timer)
    }, 20)
    return () => clearInterval(timer)
  }, [visible, num])

  return <span ref={ref}>{count}{suffix}</span>
}


// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`border-b border-[#EBEBEB] bg-[#FAFAFA] sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'nav-shadow' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#/" className="font-serif text-[#1A1730] text-lg">
          Lisa Demchenko<span style={{ color: PURPLE }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Elizaveta Dobrydneva - CV.pdf"
            download
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B6880] hover:text-[#1A1730] transition-colors"
          >
            Download CV
          </a>
          <a
            href="https://processtopixels.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            Let's work together
          </a>
        </div>
        <button className="md:hidden flex flex-col gap-1.5" aria-label="Menu">
          <span className="block w-6 h-0.5 bg-[#1A1730]" />
          <span className="block w-6 h-0.5 bg-[#1A1730]" />
          <span className="block w-6 h-0.5 bg-[#1A1730]" />
        </button>
      </div>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
      {/* Text */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-6">
          Product Designer · Strategist · Solopreneur
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-serif text-[#1A1730] leading-[1.35] mb-6" style={{ fontSize: 'clamp(32px, 3.8vw, 56px)' }}>
          Hi, I'm Lisa<span style={{ color: PURPLE }}>.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-base leading-relaxed text-[#1A1730] opacity-75 mb-8 max-w-lg">
          I design products for startups, write about working with AI, and enjoy
          building small things on the side.
        </motion.p>
        <motion.p variants={fadeUp} className="text-sm text-[#1A1730] opacity-60 mb-10 max-w-md">
          Currently building{' '}
          <span className="font-semibold text-[#5C3AFF]">"AI-Powered Product Design Workflows"</span> guide.
        </motion.p>
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {[
            {
              label: 'Twitter',
              href: 'https://x.com/llsbetdigital',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2H21l-6.52 7.45L22 22h-6.84l-4.78-6.27L4.8 22H2l7-7.99L1.5 2h6.99l4.32 5.71L18.244 2Zm-1.2 18h1.5L7.04 4H5.46l11.584 16Z" />
                </svg>
              ),
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/lisa-demchenko-5a7490130/',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
                </svg>
              ),
            },
            {
              label: 'Substack',
              href: 'https://processtopixels.substack.com/',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836ZM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46ZM22.54 0H1.46v2.836h21.08V0Z" />
                </svg>
              ),
            },
            {
              label: 'Contra',
              href: 'https://contra.com/elizaveta_demchenko_nwbaq2e9',
              icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 1 0 7.07 17.07l-2.12-2.12A7 7 0 1 1 19 12h3A10 10 0 0 0 12 2Z" />
                </svg>
              ),
            },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex items-center justify-center w-12 h-12 bg-[#8DAA44] text-white hover:bg-[#5C3AFF] transition-colors"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </motion.div>
      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
      >
        <img
          src={portrait}
          alt="Lisa Demchenko"
          className="object-cover object-top"
          style={{
            width: 420,
            height: 500,
            clipPath:
              'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
          }}
        />
      </motion.div>
    </section>
  )
}

// ─── Quick Links Strip ────────────────────────────────────────────────────────
function QuickLinks() {
  const items = [
    { label: 'Notion Setups', sub: 'Notion systems for work', href: 'https://www.notion.com/@llsbetnotion?assetsVersion=23.13.20251202.0957' },
    { label: 'Templates', sub: 'Figma templates & resources', href: 'https://www.figma.com/@posttesting' },
    { label: 'Writing', sub: "Product designer's stories", href: 'https://medium.com/@llsbet' },
    { label: 'Weekly Read', sub: 'Newsletter for designers', href: 'https://processtopixels.substack.com/' },
    { label: 'AI-Powered Workflows', sub: 'Experiments & insights', href: '#' },
  ]
  return (
    <section className="border-y border-[#EBEBEB] bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-[#EBEBEB]">
          {items.map(({ label, sub, href }) => (
            <a
              key={label}
              href={href}
              target={href !== '#' ? '_blank' : undefined}
              rel={href !== '#' ? 'noopener noreferrer' : undefined}
              className="flex flex-col gap-1 px-6 py-5 hover:bg-[#F2F4ED] transition-colors group"
            >
              <span className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44]">
                {label}
              </span>
              <span className="text-sm font-medium text-[#1A1730] group-hover:text-[#5C3AFF] transition-colors">
                {sub}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Work Showcase ────────────────────────────────────────────────────────────
const WORK_COLS = [
  {
    dir: 'up',
    speed: 30,
    items: [
      '/images/Crypto app - light mode.png',
      '/images/Oooff.png',
      '/images/Screening.png',
      '/images/Board.png',
    ],
  },
  {
    dir: 'down',
    speed: 24,
    items: [
      '/images/Kidzhero.png',
      '/images/Energy Data Overview Dashboard.png',
      '/images/Ledger.png',
      '/images/SP app.png',
    ],
  },
  {
    dir: 'up',
    speed: 34,
    items: [
      '/images/Stndby.png',
      '/images/Portfolio bento exploration.png',
      '/images/Peekaboost - Web design.png',
      '/images/SF.png',
    ],
  },
  {
    dir: 'down',
    speed: 27,
    items: [
      '/images/Spray path landing page.png',
      '/images/Medical.png',
      '/images/Modern Optics Website.png',
      '/images/Pixelo.png',
    ],
  },
]

function Projects() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 flex items-end justify-between">
        <div className="reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
            Recent Projects
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            Product design<br />
            <em className="text-[#5C3AFF]">and exploration.</em>
          </h2>
        </div>
        <a
          href="https://contra.com/elizaveta_demchenko_nwbaq2e9"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex btn btn-outline whitespace-nowrap"
        >
          View all work
        </a>
      </div>

      <div className="work-grid-section">
        {WORK_COLS.map((col, ci) => (
          <div
            key={ci}
            className={`work-col work-col-${col.dir}`}
            style={{ animationDuration: `${col.speed}s` }}
          >
            {[...col.items, ...col.items].map((src, ii) => (
              <img
                key={ii}
                src={src}
                alt=""
                className="work-grid-item"
                loading={ii < 4 ? 'eager' : 'lazy'}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-4 mt-6 md:hidden">
        <a
          href="https://contra.com/elizaveta_demchenko_nwbaq2e9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex btn btn-outline"
        >
          View all work
        </a>
      </div>
    </section>
  )
}

// ─── Projects & Case Studies ─────────────────────────────────────────────────
// Content lives in caseStudyData.js. Each card links to a full page at #/work/<slug>.
function CaseStudyCard({ cs }) {
  const { slug, accent, category, client, title, summary, cardImage, metric, metricLabel, meta } = cs
  return (
    <motion.a
      href={`#/work/${slug}`}
      className="group bg-white flex flex-col hover:bg-[#F2F4ED] transition-colors"
      style={{ '--cs-accent': accent }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F2F4ED]" style={{ aspectRatio: '16 / 10' }}>
        <img
          src={cardImage}
          alt={client}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.12em] uppercase bg-white/95 px-2.5 py-1" style={{ color: accent }}>
          {category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-8">
        <h3 className="font-serif text-[#1A1730] text-2xl mb-2 leading-snug transition-colors group-hover:[color:var(--cs-accent)]">
          {client}
        </h3>
        <p className="text-sm leading-relaxed text-[#1A1730] opacity-65 mb-8">
          {summary}
        </p>

        {/* Meta + metric */}
        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-[#EBEBEB] pt-5">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-40 mb-1">Role</p>
            <p className="text-xs text-[#1A1730] opacity-70 leading-snug">{meta.role}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-40 mb-1">Timeline</p>
            <p className="text-xs text-[#1A1730] opacity-70 leading-snug">{meta.timeline}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-40 mb-1">Impact</p>
            <p className="font-serif text-xl leading-none" style={{ color: accent }}>{metric}</p>
            <p className="text-[10px] text-[#1A1730] opacity-50 leading-snug mt-1">{metricLabel}</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold transition-colors group-hover:text-[#8DAA44]" style={{ color: accent }}>
          Read case study →
        </span>
      </div>
    </motion.a>
  )
}

function CaseStudies() {
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
              Projects & Case Studies
            </p>
            <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
              The thinking<br />
              <em className="text-[#5C3AFF]">behind the work.</em>
            </h2>
          </div>
          <a
            href="https://contra.com/elizaveta_demchenko_nwbaq2e9"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn btn-outline whitespace-nowrap"
          >
            View all work
          </a>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
          {CASE_STUDIES.map(cs => <CaseStudyCard key={cs.slug} cs={cs} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Writing ──────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    tag: 'AI Workflow',
    readTime: '7 min read',
    title: 'How to Write a DESIGN.md File Claude Can Actually Use',
    excerpt: 'A practical guide to documenting your design system so Claude produces UI that actually matches your intent.',
    tool: 'Claude',
    href: 'https://medium.com/user-experience-design-1/how-to-write-a-design-md-file-claude-can-actually-use-2d89d183f823',
  },
  {
    tag: 'Design Systems',
    readTime: '8 min read',
    title: "Planning a Design System: Insights from Nathan Curtis's Framework",
    excerpt: 'Documenting my design process with Notion and lessons learned structuring a system from scratch.',
    tool: null,
    href: 'https://medium.com/ux-planet/planning-a-design-system-work-insights-from-nathan-curtiss-framework-902b27dc81c4?source=user_profile_page---------12-------------578bc4cbe04e----------------------',
  },
  {
    tag: 'Strategy',
    readTime: '5 min read',
    title: "Essential Principles for a Comprehensive Design Strategy",
    excerpt: "A solo designer's journey at a fast-growing startup and the strategic frameworks that kept me sane.",
    tool: null,
    href: 'https://medium.com/design-bootcamp/essential-principles-of-comprehensive-ux-strategy-1b57cccb6643?source=user_profile_page---------13-------------578bc4cbe04e----------------------',
  },
  {
    tag: 'AI Workflow',
    readTime: '6 min read',
    title: "AI Didn't Replace Designers, It Promoted Them",
    excerpt: 'Why AI tools are elevating designers from pixel-pushers to strategic decision-makers — not making them obsolete.',
    tool: null,
    href: 'https://medium.com/user-experience-design-1/ai-didnt-replace-designers-it-promoted-them-5b6d24de4e26',
  },
]

function ArticleCard({ tag, readTime, title, excerpt, tool, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-t border-[#EBEBEB] py-8 hover:bg-[#F2F4ED] transition-colors -mx-6 px-6"
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8DAA44]">
          {tag}
        </span>
        {tool && (
          <span className="text-[10px] font-semibold tracking-[0.12em] uppercase bg-[#EDE8FF] text-[#5C3AFF] px-2 py-0.5">
            {tool}
          </span>
        )}
        <span className="text-xs text-[#1A1730] opacity-40 ml-auto">{readTime}</span>
      </div>
      <h3 className="font-serif text-[#1A1730] text-xl mb-2 leading-snug group-hover:text-[#5C3AFF] transition-colors">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#1A1730] opacity-60 max-w-2xl">
        {excerpt}
      </p>
    </a>
  )
}

// ─── Things I'm Building ─────────────────────────────────────────────────────
const BUILDS = [
  {
    num: '01',
    title: 'Paprr',
    subtitle: 'Mobile App',
    desc: "Your daily reading limit — 3 articles, intentionally chosen, and then you're done.",
    tags: [{ label: 'On App Store', tool: false }],
    img: paprrImg,
    href: 'https://apps.apple.com/be/app/paprr/id6760342520',
  },
  {
    num: '02',
    title: 'Intro to Claude for Designers',
    subtitle: 'Guide',
    desc: 'A practical, beginner-friendly guide to using Claude as a design partner.',
    tags: [{ label: 'Live', tool: false }],
    img: claudeGuideImg,
    href: 'https://pixelandprocess.gumroad.com/l/claudeguide',
  },
  {
    num: '03',
    title: 'Prompt Library',
    subtitle: 'Dribbble for Prompts',
    desc: "A fun project I've built with my husband for SheBuilds on Lovable (March 8th, 2026).",
    tags: [{ label: 'Lovable', tool: true }],
    href: 'https://prompt-copy-paste.lovable.app',
    preview: 'https://prompt-copy-paste.lovable.app',
  },
  {
    num: '04',
    title: 'UX AI Directory',
    subtitle: 'Resource Hub',
    desc: 'A curated, searchable directory of AI tools built specifically for UX and product designers.',
    tags: [
      { label: 'WIP', tool: false },
      { label: 'Figma Make', tool: true },
    ],
    href: 'https://uxai.directory/',
    preview: 'https://uxai.directory/',
  },
  {
    num: '05',
    title: 'AI-Powered Product Design Workflows',
    subtitle: 'Guide',
    desc: 'A practical guide showing exactly how AI fits inside real design work — from research to handoff, with annotated prompts you can use today.',
    tags: [{ label: 'Live', tool: false }],
    href: 'https://pixelandprocess.gumroad.com/l/aipowereddesignguide',
    preview: 'https://pixelandprocess.gumroad.com/l/aipowereddesignguide',
    cta: 'Get it',
  },
  {
    num: '06',
    title: 'Reviu',
    subtitle: 'Figma Plugin',
    desc: 'A Figma plugin that brings structured design review right into your canvas.',
    tags: [{ label: 'On Figma Community', tool: true }],
    img: reviuImg,
    href: 'https://www.figma.com/community/plugin/1635632275322551079/reviu',
    cta: 'Try it',
  },
]

function Building() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12 reveal">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
          Side Projects
        </p>
        <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
          Things I'm <em className="text-[#5C3AFF]">Building.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
        {BUILDS.map(({ title, subtitle, desc, tags, img, href, preview, cta }) => (
          <motion.div
            key={title}
            className="bg-white p-8 hover:bg-[#F2F4ED] transition-colors flex flex-col justify-between gap-8"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-start justify-end gap-4">
              <div className="flex flex-wrap gap-1.5 justify-end">
                {tags.map(t => (
                  <span
                    key={t.label}
                    className={`text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-0.5 ${
                      t.tool ? 'bg-[#EDE8FF] text-[#5C3AFF]' : 'text-[#8DAA44]'
                    }`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
            {img && (
              <img src={img} alt={title} className="w-full object-cover" />
            )}
            {preview && (
              <a href={href} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden border border-[#EBEBEB]" style={{ height: 360 }}>
                <iframe
                  src={preview}
                  title={title}
                  className="absolute top-0 left-0 border-0 pointer-events-none"
                  style={{ height: 720, width: '200%', transformOrigin: 'top left', transform: 'scale(0.5)' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-end p-3">
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#5C3AFF] bg-white border border-[#EBEBEB] px-2 py-1">
                    Visit site →
                  </span>
                </div>
              </a>
            )}
            <div>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-40 mb-2">{subtitle}</p>
              <h3 className="font-serif text-[#1A1730] text-xl mb-3 leading-snug">{title}</h3>
              <p className="text-sm leading-relaxed text-[#1A1730] opacity-65">{desc}</p>
              {href && (!preview || cta) && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#5C3AFF] hover:text-[#8DAA44] transition-colors"
                >
                  {cta || 'Get it'} →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Writing() {
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-4">
          <div className="reveal">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
              Things I've Written
            </p>
            <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
              Real talk from the UX,<br />
              <em className="text-[#5C3AFF]">AI & builder journey.</em>
            </h2>
          </div>
          <a
            href="https://medium.com/@llsbet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn btn-outline whitespace-nowrap"
          >
            View all articles
          </a>
        </div>
        <div>
          {ARTICLES.map(a => <ArticleCard key={a.title} {...a} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Twitter / X Posts ───────────────────────────────────────────────────────
const TWEETS_HTML = [
  `<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Syncing my Design System: from <a href="https://twitter.com/figma">@figma</a> to Storybook, with <a href="https://twitter.com/NotionHQ">@NotionHQ</a> for documentation.<br><br>Enabled by <a href="https://twitter.com/claudeai">@claudeai</a>.<br><br>I know there are lots of tutorials for similar workflows, but it&#39;s much more fun to find your own ways.</p>&mdash; Lisa Demchenko (@llsbetdigital) <a href="https://twitter.com/llsbetdigital/status/2033655042365132967">March 16, 2026</a></blockquote>`,
  `<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Playing around with <a href="https://twitter.com/paper">@paper</a> and <a href="https://twitter.com/claudeai">@claudeai</a>.<br><br>My app prerequisites were in Notion: planning, market research, user research, competitors, JTBD, ideation.<br><br>I asked Claude to read this page and design an app in Paper, based on what it just learned.</p>&mdash; Lisa Demchenko (@llsbetdigital) <a href="https://twitter.com/llsbetdigital/status/2028577877718184329">March 2, 2026</a></blockquote>`,
  `<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Needed a more structured documentation of this brainstorming.<br>From FigJam board to <a href="https://twitter.com/NotionHQ">@NotionHQ</a> - thanks <a href="https://twitter.com/claudeai">@claudeai</a> 💙<br>I already had a Notion template I use for project documentation and Claude filled it where it was relevant. Pretty accurate and easy to follow.</p>&mdash; Lisa Demchenko (@llsbetdigital) <a href="https://twitter.com/llsbetdigital/status/2028474687802491362">March 2, 2026</a></blockquote>`,
]

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function TwitterSection() {
  useEffect(() => {
    const load = () => window.twttr?.widgets?.load()
    if (window.twttr?.widgets) {
      load()
    } else {
      window.addEventListener('load', load)
      return () => window.removeEventListener('load', load)
    }
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div className="reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
            On X / Twitter
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            Insights from AI-powered workflows<br />
            <em className="text-[#5C3AFF]">and experiments.</em>
          </h2>
        </div>
        <a
          href="https://x.com/llsbetdigital"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 btn btn-outline whitespace-nowrap"
        >
          <XIcon /> Follow on X
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6 items-start">
        {TWEETS_HTML.map((html, i) => (
          <div key={i} className="flex justify-center"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Lisa took my chaotic app vision and turned it into something clear and beautiful. She built a full Figma system that brought it to life and made the process enjoyable. She's sharp, fast, and great at balancing structure with creativity.",
    name: 'Morgan Melto',
    role: 'Founder, Stndby',
  },
  {
    quote: "Lisa was truly amazing to work with. She was thoughtful, thorough, and the quality of her work was great. She has amazing attention to detail and is really hard working. Would recommend working with her!",
    name: 'Marina Romero',
    role: 'CMO, o.xyz',
  },
  {
    quote: "Your work has made organizing projects much easier, and I really appreciate the thought and effort you put into designing it.",
    name: 'Fransu',
    role: 'Happy Customer',
  },
]

function Testimonials() {
  return (
    <section className="px-6 py-20" style={{ background: '#E8F0D2' }}>
      <div className="max-w-6xl mx-auto">
      <div className="mb-14 reveal">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
          Some Kind Words
        </p>
        <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
          Designers & founders<br />
          <em className="text-[#5C3AFF]">who trust the work.</em>
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#EBEBEB] border border-[#EBEBEB] mb-14">
        {[
          { num: '1000+', label: 'Templates sold' },
          { num: '1300+', label: 'Newsletter subscribers' },
          { num: '6+', label: 'Years experience' },
          { num: '15+', label: 'Products designed' },
        ].map(({ num, label }) => (
          <div key={label} className="bg-white px-8 py-8">
            <div className="font-serif text-[#5C3AFF] mb-1" style={{ fontSize: 40 }}><StatNumber value={num} /></div>
            <div className="text-sm text-[#1A1730] opacity-60">{label}</div>
          </div>
        ))}
      </div>

      {/* Quote cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <motion.div
            key={name}
            className="border border-[#EBEBEB] bg-white p-8 hover:bg-[#F2F4ED] transition-colors"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="font-quote text-[#1A1730] opacity-80 mb-6" style={{ fontSize: 17, lineHeight: 1.5 }}>
              "{quote}"
            </p>
            <div>
              <div className="text-sm font-semibold text-[#1A1730]">{name}</div>
              <div className="text-xs text-[#8DAA44]">{role}</div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="bg-[#8DAA44] py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-60 mb-4">
            Work together
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            Ready to design something<br />
            <em className="text-white">people actually love?</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://cal.com/elizaveta-demchenko-oz4d4o/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent"
          >
            Book a call
          </a>
          <a
            href="https://processtopixels.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light"
          >
            View services
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const navCols = [
    {
      heading: 'Lisa Demchenko',
      links: [
        { label: 'About', href: '#' },
        { label: 'Work', href: 'https://contra.com/elizaveta_demchenko_nwbaq2e9' },
        { label: 'Writing', href: 'https://medium.com/@llsbet' },
        { label: 'Start Here', href: '#' },
      ],
    },
    {
      heading: 'Products',
      links: [
        { label: 'Notion Setups', href: 'https://www.notion.com/@llsbetnotion?assetsVersion=23.13.20251202.0957' },
        { label: 'Templates', href: 'https://www.figma.com/@posttesting' },
        { label: 'Newsletter', href: 'https://processtopixels.substack.com/' },
        { label: 'Directory', href: '#' },
        { label: 'Reviu', href: '#' },
        { label: 'Kinfare', href: '#' },
      ],
    },
    {
      heading: 'Connect',
      links: ['Twitter', 'LinkedIn', 'Email'],
    },
  ]
  return (
    <footer className="bg-[#FAFAFA] border-t border-[#EBEBEB] text-[#1A1730] px-6 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-serif text-[#1A1730] text-xl mb-3">
              Process to Pixels<span style={{ color: PURPLE }}>.</span>
            </div>
            <p className="text-sm text-[#6B6880] leading-relaxed max-w-xs">
              Strategic product design studio. Pixel by pixel.
            </p>
          </div>
          {/* Nav cols */}
          {navCols.map(({ heading, links }) => (
            <div key={heading}>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-5">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map(l => {
                  const label = typeof l === 'string' ? l : l.label
                  const href  = typeof l === 'string' ? '#' : l.href
                  return (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#6B6880] hover:text-[#1A1730] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#EBEBEB] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#B0AEC4]">
            © 2025 Lisa Demchenko. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-xs text-[#B0AEC4] hover:text-[#1A1730] transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2016', event: 'Moved to Germany' },
  { year: '2017', event: 'Dropped out of MA in Cultural Studies, discovered UX Design' },
  { year: '2018', event: 'Moved to Ireland, started MSc in Digital Media & UX' },
  { year: '2019', event: 'Started freelancing' },
  { year: '2020', event: 'Graduated, landed a role in Product Design' },
  { year: '2022', event: 'Moved to Belgium, became a solo Product Designer in a startup' },
  { year: '2024', event: 'Became a mom, started a career break' },
  { year: '2025', event: 'Never returned to work — became an independent designer instead' },
  { year: '2025', event: 'Founded Process to Pixels newsletter' },
  { year: '2026', event: 'To be continued ✦' },
]

function About() {
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-14 reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
            About
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            Who I <em className="text-[#5C3AFF]">am.</em>
          </h2>
        </div>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div className="reveal space-y-5 text-base leading-relaxed text-[#1A1730] opacity-75">
            <p>
              I'm Lisa — product designer, studio founder, and perpetual tinkerer at the edge of design and AI.
            </p>
            <p>
              I spent years doing in-house design at companies that moved fast and broke things (sometimes on purpose), before going independent to do the work I actually care about. Now I run Process to Pixels, a fractional design studio in Brussels, where I partner with startups to help their products look and feel as good as the vision in the founder's head. UX research, product design, design systems — whatever it takes to get there.
            </p>
            <p>
              The other thing I do is write. Process to Pixels on Substack is where I think out loud about designing with AI — not the hype, but the actual workflows, the prompts that work, the shortcuts that don't, and what it means to do this job well when the tools are changing faster than the job descriptions. I share my thoughts and insights on X (Twitter), LinkedIn and Medium as well.
            </p>
          </div>
          <div className="reveal reveal-delay-1 space-y-5 text-base leading-relaxed text-[#1A1730] opacity-75">
            <p>
              I live in Brussels with my husband, our toddler, and a dog named Rassol. When I'm not in Figma or Claude, I'm shooting on my old film camera, creating ceramics pieces, enjoying family bike rides or planning the next slow trip somewhere worth getting lost in.
            </p>
            <p>
              If you're a designer trying to figure out how AI fits into your actual practice — or a founder who needs a design partner who gets both the craft and the constraints — you're in the right place.
            </p>
          </div>
        </div>

        {/* Horizontal timeline */}
        <div className="reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-10">
            My Journey
          </p>
          <div className="overflow-x-auto pb-6">
            <div className="relative flex min-w-max">
              {/* Connecting line */}
              <div className="absolute top-[28px] left-0 right-0 h-px bg-[#EBEBEB]" />
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center" style={{ minWidth: 180 }}>
                  {/* Year */}
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
                    {item.year}
                  </p>
                  {/* Dot */}
                  <div className="timeline-dot w-3 h-3 bg-[#5C3AFF] relative z-10 flex-shrink-0" />
                  {/* Event */}
                  <p className="text-sm text-[#1A1730] opacity-65 mt-4 text-center leading-snug" style={{ maxWidth: 140 }}>
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Featured & Talks ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    platform: 'Substack',
    pub: 'Ileana Marcut',
    title: 'Product in the Age of AI: Designers on How Their Role Is Changing',
    desc: 'Featured as a contributor sharing how AI is transforming daily design workflows and the evolving skill set for 2026.',
    href: 'https://open.substack.com/pub/ileanamarcut/p/designer-role-2026?utm_campaign=post-expanded-share&utm_medium=web',
  },
  {
    platform: 'Event',
    pub: 'Tokyo Design Community',
    title: 'Design & AI — How Designers Are Adapting',
    desc: 'Talk at the Tokyo Design Community online meetup exploring how designers adapt to AI-powered workflows.',
    href: 'https://www.linkedin.com/posts/tokyo-design-community_last-sunday-we-hosted-design-ai-how-activity-7446176974450077696-Akre?utm_source=share&utm_medium=member_desktop&rcm=ACoAACAbTE8BEgtoh0xQCa8AjJQXCTW_6sQIuXk',
  },
  {
    platform: 'Newsletter',
    pub: 'User Weekly',
    title: 'User Research is Like Planning a Party',
    desc: 'Featured in User Weekly — a newsletter covering user research trends and best practices for product teams.',
    href: 'https://www.userweekly.com/like-planning-a-party/',
  },
]

function FeaturedSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div className="reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
            Features & Talks
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            As seen <em className="text-[#5C3AFF]">out there.</em>
          </h2>
        </div>
      </div>

      <div className="reveal grid md:grid-cols-3 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
        {FEATURES.map(({ platform, pub, title, desc, href }) => (
          <motion.a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-8 hover:bg-[#F2F4ED] transition-colors flex flex-col justify-between gap-8"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8DAA44]">
                  {platform}
                </span>
                <span className="text-[10px] text-[#1A1730] opacity-30">·</span>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase bg-[#EDE8FF] text-[#5C3AFF] px-2 py-0.5">
                  {pub}
                </span>
              </div>
              <h3 className="font-serif text-[#1A1730] text-lg mb-3 leading-snug group-hover:text-[#5C3AFF] transition-colors">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#1A1730] opacity-60">
                {desc}
              </p>
            </div>
            <span className="text-sm font-semibold text-[#5C3AFF] group-hover:text-[#8DAA44] transition-colors">
              Read →
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  useScrollReveal()
  return (
    <main>
      <Hero />
      <QuickLinks />
      <Projects />
      <CaseStudies />
      <Building />
      <Writing />
      <About />
      <FeaturedSection />
      <TwitterSection />
      <Testimonials />
      <CTABanner />
    </main>
  )
}

// ─── Hash router ──────────────────────────────────────────────────────────────
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const hash = useHashRoute()
  const match = hash.match(/^#\/work\/([\w-]+)/)
  const cs = match ? getCaseStudy(match[1]) : null

  // Scroll to top whenever the route changes
  useEffect(() => { window.scrollTo(0, 0) }, [hash])

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={cs ? `work-${cs.slug}` : 'home'}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {cs ? <CaseStudyPage cs={cs} /> : <Home />}
        </motion.div>
      </AnimatePresence>
      <Footer />
      <Analytics />
    </MotionConfig>
  )
}
