import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Analytics } from '@vercel/analytics/react'
import portrait from './IMG_7244 1.png'
import paprrImg from './paprr.png'
import claudeGuideImg from './claude-guide.png'

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
    <nav className={`border-b border-[#EBEBEB] bg-[#FAFAFA] sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'nav-shadow' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="font-serif font-bold text-[#1A1730] text-lg">
          Lisa Demchenko<span style={{ color: PURPLE }}>.</span>
        </a>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Elizaveta Dobrydneva - CV.pdf"
            download
            className="text-sm font-semibold text-[#1A1730] hover:text-[#5C3AFF] transition-colors"
          >
            Download CV
          </a>
          <a
            href="https://processtopixels.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A1730] text-white text-sm font-semibold px-5 py-2.5 hover:bg-[#8DAA44] transition-colors"
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
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
      {/* Text */}
      <div>
        <p className="hero-item text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-6">
          Product Designer · Strategist · Solopreneur
        </p>
        <h1 className="hero-item font-serif font-bold text-[#1A1730] leading-tight mb-6" style={{ fontSize: 'clamp(44px, 6vw, 72px)' }}>
          Hi, I'm Lisa<span style={{ color: PURPLE }}>.</span>
        </h1>
        <p className="hero-item text-base leading-relaxed text-[#1A1730] opacity-75 mb-8 max-w-lg">
          I turn messy stakeholder feedback and complex data into clean, intuitive
          interfaces — mostly mobile apps and SaaS tools. Obsessed with Notion,
          Figma, and using AI to kill the boring stuff so humans can focus on the
          brilliant parts.
        </p>
        <p className="hero-item text-sm text-[#1A1730] opacity-60 mb-10 max-w-md">
          Currently building{' '}
          <span className="font-semibold text-[#5C3AFF]">"AI-Powered Product Design Workflows"</span> guide.
        </p>
        <div className="hero-item flex flex-wrap gap-3">
          <a
            href="https://contra.com/elizaveta_demchenko_nwbaq2e9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1A1730] text-white text-sm font-semibold px-6 py-3 hover:bg-[#8DAA44] transition-colors"
          >
            View my work
          </a>
          <a
            href="https://processtopixels.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1A1730] text-[#1A1730] text-sm font-semibold px-6 py-3 hover:bg-[#F2F4ED] transition-colors"
          >
            Read the blog
          </a>
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <img src={portrait} alt="Lisa Demchenko" className="object-cover object-top" style={{ width: 420, height: 500 }} />
      </div>
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
          <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
            Product design<br />
            <em className="text-[#5C3AFF]">and exploration.</em>
          </h2>
        </div>
        <a
          href="https://contra.com/elizaveta_demchenko_nwbaq2e9"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex border border-[#1A1730] text-[#1A1730] text-sm font-semibold px-5 py-2.5 hover:bg-[#F2F4ED] transition-colors whitespace-nowrap"
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
          className="inline-flex border border-[#1A1730] text-[#1A1730] text-sm font-semibold px-5 py-2.5 hover:bg-[#F2F4ED] transition-colors"
        >
          View all work
        </a>
      </div>
    </section>
  )
}

// ─── Writing ──────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    tag: 'Process',
    readTime: '6 min read',
    title: 'Teaming With AI: Building a Design Library with ChatGPT',
    excerpt: 'How I used AI to accelerate component documentation and cut library setup time by 60%.',
    tool: 'MagicPathAI',
    href: 'https://medium.com/ux-planet/teaming-up-with-ai-building-a-design-library-with-chatgpt-magicpathai-26f18473b2fa?source=user_profile_page---------5-------------578bc4cbe04e----------------------',
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
      <h3 className="font-serif font-bold text-[#1A1730] text-xl mb-2 leading-snug group-hover:text-[#5C3AFF] transition-colors">
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
    desc: 'A minimal paper-feel note-taking app for designers who think better with pen and paper.',
    tags: [{ label: 'Soon on App Store', tool: false }],
    img: paprrImg,
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
]

function Building() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12 reveal">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
          Side Projects
        </p>
        <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
          Things I'm <em className="text-[#5C3AFF]">Building.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
        {BUILDS.map(({ title, subtitle, desc, tags, img, href, preview }) => (
          <div key={title} className="bg-white p-8 hover:bg-[#F2F4ED] transition-colors flex flex-col justify-between gap-8">
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
              <h3 className="font-serif font-bold text-[#1A1730] text-xl mb-3 leading-snug">{title}</h3>
              <p className="text-sm leading-relaxed text-[#1A1730] opacity-65">{desc}</p>
              {href && !preview && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#5C3AFF] hover:text-[#8DAA44] transition-colors"
                >
                  Get it →
                </a>
              )}
            </div>
          </div>
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
            <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
              Real talk from the UX,<br />
              <em className="text-[#5C3AFF]">AI & builder journey.</em>
            </h2>
          </div>
          <a
            href="https://medium.com/@llsbet"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex border border-[#1A1730] text-[#1A1730] text-sm font-semibold px-5 py-2.5 hover:bg-[#F2F4ED] transition-colors whitespace-nowrap"
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
          <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
            Insights from AI-powered workflows<br />
            <em className="text-[#5C3AFF]">and experiments.</em>
          </h2>
        </div>
        <a
          href="https://x.com/llsbetdigital"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 border border-[#1A1730] text-[#1A1730] text-sm font-semibold px-5 py-2.5 hover:bg-[#F2F4ED] transition-colors whitespace-nowrap"
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
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-14 reveal">
        <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">
          Some Kind Words
        </p>
        <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
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
            <div className="font-serif font-bold text-[#5C3AFF] mb-1" style={{ fontSize: 40 }}><StatNumber value={num} /></div>
            <div className="text-sm text-[#1A1730] opacity-60">{label}</div>
          </div>
        ))}
      </div>

      {/* Quote cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <div key={name} className="border border-[#EBEBEB] bg-white p-8 hover:bg-[#F2F4ED] transition-colors">
            <p className="text-sm leading-relaxed text-[#1A1730] opacity-75 mb-6 italic font-serif">
              "{quote}"
            </p>
            <div>
              <div className="text-sm font-semibold text-[#1A1730]">{name}</div>
              <div className="text-xs text-[#8DAA44]">{role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="bg-[#1A1730] py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-4">
            Work together
          </p>
          <h2 className="font-serif font-bold text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Ready to design something<br />
            <em className="text-[#5C3AFF]">people actually love?</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://cal.com/elizaveta-demchenko-oz4d4o/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#5C3AFF] text-white text-sm font-semibold px-7 py-3.5 hover:bg-[#7B5FFF] transition-colors"
          >
            Book a call
          </a>
          <a
            href="https://processtopixels.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white text-white text-sm font-semibold px-7 py-3.5 hover:bg-white hover:text-[#1A1730] transition-colors"
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
    <footer className="bg-[#0f0d1f] border-t border-white/10 text-white px-6 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="font-serif font-bold text-white text-xl mb-3">
              Process to Pixels<span style={{ color: PURPLE }}>.</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
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
                      className="text-sm text-white/60 hover:text-white transition-colors"
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
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 Lisa Demchenko. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
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
          <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
            Who I <em className="text-[#5C3AFF]">am.</em>
          </h2>
        </div>

        {/* Bio */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <p className="reveal text-base leading-relaxed text-[#1A1730] opacity-75">
            I'm a product designer and solopreneur with 6+ years turning messy briefs and complex systems into clean, intuitive interfaces — mostly mobile apps and SaaS tools. I work with startups figuring out product-market fit and scale-ups moving fast. Outside client work I run Process to Pixels, teach AI-powered design, and build side projects that scratch my own itches.
          </p>
          <p className="reveal reveal-delay-1 text-base leading-relaxed text-[#1A1730] opacity-75">
            I'm obsessed with the intersection of design and AI — not as a replacement for creative thinking, but as a tool that removes the boring parts so humans can focus on the brilliant ones. Based in Europe, working with clients worldwide.
          </p>
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
          <h2 className="font-serif font-bold text-[#1A1730] leading-tight" style={{ fontSize: 'clamp(34px, 4vw, 54px)' }}>
            As seen <em className="text-[#5C3AFF]">out there.</em>
          </h2>
        </div>
      </div>

      <div className="reveal grid md:grid-cols-3 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
        {FEATURES.map(({ platform, pub, title, desc, href }) => (
          <a
            key={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-8 hover:bg-[#F2F4ED] transition-colors flex flex-col justify-between gap-8"
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
              <h3 className="font-serif font-bold text-[#1A1730] text-lg mb-3 leading-snug group-hover:text-[#5C3AFF] transition-colors">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#1A1730] opacity-60">
                {desc}
              </p>
            </div>
            <span className="text-sm font-semibold text-[#5C3AFF] group-hover:text-[#8DAA44] transition-colors">
              Read →
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useScrollReveal()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuickLinks />
        <Projects />
        <Building />
        <Writing />
        <About />
        <FeaturedSection />
        <TwitterSection />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <Analytics />
    </>
  )
}
