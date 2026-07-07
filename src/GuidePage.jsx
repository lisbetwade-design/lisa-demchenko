import { useEffect } from 'react'
// `motion` is used via namespaced JSX (<motion.div>), which this ESLint config
// (no eslint-plugin-react) can't detect — hence the disable.
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import { GUIDES } from './guidesData'

const EASE = [0.4, 0, 0.2, 1]

// ─── Local scroll reveal (re-runs per guide) ─────────────────────────────────
function useReveal(dep) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.cs-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [dep])
}

function CheckIcon({ color }) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <path d="M4 10.5l4 4 8-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ g }) {
  const { accent, badge, price, priceNote, title, tagline, lead, cta, note } = g
  return (
    <header style={{ background: accent + '14' }}>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-16">
        <motion.a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase mb-12 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(26,23,48,0.45)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          ← Back home
        </motion.a>

        <motion.div
          className="grid md:grid-cols-12 gap-8 items-end"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        >
          <div className="md:col-span-8">
            <motion.div
              variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase px-3 py-1" style={{ background: accent, color: '#fff' }}>
                {badge}
              </span>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase" style={{ color: accent }}>
                {price}{priceNote ? ` · ${priceNote}` : ''}
              </span>
            </motion.div>
            <motion.h1
              variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              className="font-serif text-[#1A1730] leading-[1.2]"
              style={{ fontSize: 'clamp(32px, 4vw, 58px)' }}
            >
              {title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>
            <motion.p
              variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              className="mt-6 text-lg leading-relaxed text-[#1A1730] opacity-75 max-w-xl"
            >
              {tagline}
            </motion.p>
          </div>

          <motion.div
            variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
            className="md:col-span-4"
          >
            <p className="text-base leading-relaxed text-[#1A1730] opacity-70">{lead}</p>
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: accent }}
            >
              {cta.label} →
            </a>
            {note && <p className="mt-3 text-xs text-[#1A1730] opacity-50">{note}</p>}
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

// ─── What you'll learn ───────────────────────────────────────────────────────
function Learn({ g }) {
  return (
    <section className="bg-white border-b border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4 cs-reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: g.accent }}>
            {g.learnTitle}
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.3]" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}>
            Everything you get.
          </h2>
        </div>
        <ul className="md:col-span-8 cs-reveal grid sm:grid-cols-2 gap-x-8 gap-y-5">
          {g.learn.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#1A1730] opacity-80">
              <CheckIcon color={g.accent} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Sections (paths / modules) ──────────────────────────────────────────────
function Sections({ g }) {
  return (
    <section className="bg-[#FAFAFA] border-b border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12 cs-reveal max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: g.accent }}>
            {g.sectionsTitle}
          </p>
          {g.sectionsLead && (
            <p className="text-base leading-relaxed text-[#1A1730] opacity-70">{g.sectionsLead}</p>
          )}
        </div>
        <div className="cs-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
          {g.sections.map(s => (
            <div key={s.title} className="bg-white p-8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: g.accent }}>
                  {s.label}
                </span>
                {s.tag && (
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1A1730] opacity-40 border border-[#EBEBEB] px-2 py-0.5">
                    {s.tag}
                  </span>
                )}
              </div>
              <h3 className="font-serif text-[#1A1730] text-xl leading-snug">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#1A1730] opacity-65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Audience ────────────────────────────────────────────────────────────────
function Audience({ g }) {
  return (
    <section className="bg-white border-b border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4 cs-reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: g.accent }}>
            {g.audienceTitle}
          </p>
        </div>
        <div className="md:col-span-8 cs-reveal space-y-5 text-lg leading-relaxed text-[#1A1730] opacity-80">
          {g.audience.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function Faq({ g }) {
  if (!g.faq || !g.faq.length) return null
  return (
    <section className="bg-[#FAFAFA] border-b border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-4 cs-reveal">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: g.accent }}>
            FAQ
          </p>
          <h2 className="font-serif text-[#1A1730] leading-[1.3]" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)' }}>
            Questions, answered.
          </h2>
        </div>
        <div className="md:col-span-8 cs-reveal divide-y divide-[#EBEBEB] border-t border-[#EBEBEB]">
          {g.faq.map(f => (
            <div key={f.q} className="py-6">
              <h3 className="font-serif text-[#1A1730] text-lg mb-2 leading-snug">{f.q}</h3>
              <p className="text-[15px] leading-relaxed text-[#1A1730] opacity-70 max-w-2xl">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ───────────────────────────────────────────────────────────────
function CTA({ g }) {
  return (
    <section className="px-6 py-20" style={{ background: g.accent }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {g.price}{g.priceNote ? ` · ${g.priceNote}` : ''}
          </p>
          <h2 className="font-serif text-white leading-[1.25]" style={{ fontSize: 'clamp(24px, 2.8vw, 40px)' }}>
            {g.title.join(' ')}
          </h2>
        </div>
        <a
          href={g.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#1A1730] bg-white whitespace-nowrap transition-transform hover:-translate-y-0.5"
        >
          {g.cta.label} →
        </a>
      </div>
    </section>
  )
}

// ─── Guide page ──────────────────────────────────────────────────────────────
export default function GuidePage({ g }) {
  useReveal(g.slug)
  return (
    <main>
      <Hero g={g} />
      <Learn g={g} />
      <Sections g={g} />
      <Audience g={g} />
      <Faq g={g} />
      <CTA g={g} />
    </main>
  )
}

// Keep bundlers aware the data module is part of this feature.
export { GUIDES }
