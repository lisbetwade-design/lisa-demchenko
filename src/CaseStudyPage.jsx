import { useEffect } from 'react'
import { CASE_STUDIES } from './caseStudyData'

// ─── Local scroll reveal (re-runs per case study) ────────────────────────────
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

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero({ cs }) {
  const { accent, heroTheme, client, category, title, subtitle, meta, heroImage } = cs

  const themes = {
    dark: { bg: '#FAFAFA', text: '#1A1730', sub: 'rgba(26,23,48,0.7)', meta: 'rgba(26,23,48,0.45)', rule: '#EBEBEB' },
    light: { bg: '#FAFAFA', text: '#1A1730', sub: 'rgba(26,23,48,0.7)', meta: 'rgba(26,23,48,0.45)', rule: '#EBEBEB' },
    tint: { bg: accent + '16', text: '#1A1730', sub: 'rgba(26,23,48,0.7)', meta: 'rgba(26,23,48,0.45)', rule: accent + '33' },
  }
  const t = themes[heroTheme] || themes.light

  return (
    <header style={{ background: t.bg, color: t.text }}>
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-0">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase mb-12 transition-opacity hover:opacity-70"
          style={{ color: t.meta }}
        >
          ← Back to work
        </a>

        <div className="grid md:grid-cols-12 gap-8 items-end pb-12">
          <div className="md:col-span-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-6" style={{ color: accent }}>
              {client} · {category}
            </p>
            <h1 className="font-serif leading-[1.25]" style={{ fontSize: 'clamp(32px, 3.8vw, 56px)' }}>
              {title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="text-base leading-relaxed" style={{ color: t.sub }}>
              {subtitle}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 py-8"
          style={{ borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}` }}
        >
          {[
            { k: 'Industry', v: meta.industry },
            { k: 'Role', v: meta.role },
            { k: 'Timeline', v: meta.timeline },
            { k: 'Services', v: meta.services.join(', ') },
          ].map(({ k, v }) => (
            <div key={k}>
              <p className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: t.meta }}>{k}</p>
              <p className="text-sm leading-snug" style={{ color: t.text }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hero image bleeds over the section break. `heroRatio` (e.g. '16 / 9')
          crops to a uniform banner; omit it to show the image in full. */}
      <div className="max-w-6xl mx-auto px-6 pt-12" style={{ marginBottom: -64 }}>
        <img
          src={heroImage}
          alt={typeof cs.title === 'object' ? cs.title.join(' ') : cs.title}
          className={`w-full border border-[#EBEBEB] rounded-[4px] ${cs.heroRatio ? 'object-cover' : 'h-auto'}`}
          style={cs.heroRatio ? { aspectRatio: cs.heroRatio } : undefined}
        />
      </div>
    </header>
  )
}

// ─── Block renderers ─────────────────────────────────────────────────────────
function Eyebrow({ children, accent }) {
  return (
    <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: accent }}>
      {children}
    </p>
  )
}

function Heading({ lines, accent }) {
  return (
    <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
      {lines[0]}
      {lines[1] && (
        <>
          <br />
          <em style={{ color: accent }}>{lines[1]}</em>
        </>
      )}
    </h2>
  )
}

function OverviewBlock({ block, accent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <p className="cs-reveal md:col-span-8 text-[#3D3A5C]" style={{ fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: 1.6 }}>
          {block.lead}
        </p>
        <div className="cs-reveal md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-6 md:border-l md:pl-8" style={{ borderColor: '#EBEBEB' }}>
          {block.stats.map(s => (
            <div key={s.label}>
              <div className="font-serif leading-none mb-1" style={{ color: accent, fontSize: 28 }}>{s.value}</div>
              <div className="text-xs text-[#1A1730] opacity-55">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TextBlock({ block, accent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <div className="cs-reveal md:col-span-5">
          <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>
          <Heading lines={block.heading} accent={accent} />
        </div>
        <div className="cs-reveal md:col-span-7 space-y-5 md:pt-2">
          {block.body.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-[#1A1730] opacity-75">{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageBlock({ block }) {
  return (
    <section className={block.full ? 'px-6 py-10' : 'max-w-6xl mx-auto px-6 py-10'}>
      <figure className={block.full ? 'max-w-[1400px] mx-auto cs-reveal' : 'cs-reveal'}>
        <img
          src={block.src}
          alt={block.caption || ''}
          className={`w-full bg-[#F2F4ED] rounded-[4px] ${block.ratio ? 'object-cover' : 'h-auto'}`}
          style={block.ratio ? { aspectRatio: block.ratio } : undefined}
          loading="lazy"
        />
        {block.caption && (
          <figcaption className="text-xs text-[#1A1730] opacity-45 mt-3 max-w-2xl">{block.caption}</figcaption>
        )}
      </figure>
    </section>
  )
}

function ProblemGridBlock({ block, accent }) {
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="cs-reveal mb-12">
          <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>
          <Heading lines={block.heading} accent={accent} />
        </div>
        <div className="cs-reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
          {block.cards.map((c, i) => (
            <div key={i} className="bg-white p-8 flex gap-5">
              <span className="font-serif text-lg leading-none pt-1" style={{ color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-[#1A1730] text-xl mb-2 leading-snug">{c.title}</h3>
                <p className="text-sm leading-relaxed text-[#1A1730] opacity-65">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessBlock({ block, accent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="cs-reveal mb-14">
        <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>
        <Heading lines={block.heading} accent={accent} />
      </div>
      <div className="space-y-16 md:space-y-24">
        {block.steps.map((step, i) => (
          <div key={i} className={`cs-reveal grid md:grid-cols-2 gap-10 items-center ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
            <div className="md:[direction:ltr]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2 py-1" style={{ background: accent + '14', color: accent }}>
                  {String(i + 1).padStart(2, '0')} · {step.label}
                </span>
              </div>
              <h3 className="font-serif text-[#1A1730] text-2xl mb-3 leading-snug">{step.title}</h3>
              <p className="text-base leading-relaxed text-[#1A1730] opacity-70">{step.body}</p>
            </div>
            <div className="md:[direction:ltr]">
              {/* `ratio` (e.g. '4 / 3') crops to a uniform tile; omit it to show the artifact in full. */}
              <img
                src={step.src}
                alt={step.title}
                loading="lazy"
                className={`w-full bg-[#F2F4ED] border border-[#EBEBEB] rounded-[4px] ${step.ratio ? 'object-cover' : 'h-auto'}`}
                style={step.ratio ? { aspectRatio: step.ratio } : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GalleryBlock({ block, accent }) {
  const cols = block.cols === 1 ? 'grid-cols-1' : block.cols === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
  // Default: show every image in full at its natural aspect (Patricia-style).
  // Set `fit: 'cover'` (+ optional `ratio`) on the block for uniform cropped tiles instead.
  const crop = block.fit === 'cover'
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="cs-reveal mb-12">
          <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>
          <Heading lines={block.heading} accent={accent} />
        </div>
        <div className={`cs-reveal grid ${cols} gap-5 items-start`}>
          {block.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="lazy"
              className={`w-full bg-[#F2F4ED] border border-[#EBEBEB] rounded-[4px] ${crop ? 'object-cover' : 'h-auto'}`}
              style={crop ? { aspectRatio: block.ratio || '4 / 3' } : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TwoColBlock({ block, accent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className={`cs-reveal grid md:grid-cols-2 gap-12 items-center ${block.flip ? 'md:[direction:rtl]' : ''}`}>
        <div className="md:[direction:ltr]">
          {block.eyebrow && <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>}
          {block.heading && <h3 className="font-serif text-[#1A1730] text-2xl mb-4 leading-snug">{block.heading}</h3>}
          <div className="space-y-4">
            {block.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-[#1A1730] opacity-75">{p}</p>
            ))}
          </div>
        </div>
        <div className="md:[direction:ltr]">
          <img src={block.src} alt={block.heading || ''} loading="lazy" className="w-full object-cover bg-[#F2F4ED] border border-[#EBEBEB]" />
        </div>
      </div>
    </section>
  )
}

function QuoteBlock({ block, accent }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="cs-reveal max-w-4xl mx-auto text-center rounded-[20px] px-8 py-16" style={{ background: accent + '12' }}>
        <span className="font-quote leading-none block mb-4" style={{ color: accent, fontSize: 64 }}>"</span>
        <p className="font-quote text-[#1A1730] mb-8" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.45 }}>
          {block.quote}
        </p>
        <div className="text-sm font-semibold text-[#1A1730]">{block.name}</div>
        <div className="text-xs mt-1" style={{ color: accent }}>{block.role}</div>
      </div>
    </section>
  )
}

function ResultsBlock({ block, accent }) {
  return (
    <section style={{ background: accent + '12', borderTop: `1px solid ${accent}33`, borderBottom: `1px solid ${accent}33` }}>
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="cs-reveal mb-12">
          <p className="text-xs font-semibold tracking-[0.12em] uppercase mb-3" style={{ color: accent }}>{block.eyebrow}</p>
          <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
            {block.heading[0]}
            {block.heading[1] && (<><br /><em style={{ color: accent }}>{block.heading[1]}</em></>)}
          </h2>
        </div>
        <div className="cs-reveal grid grid-cols-1 sm:grid-cols-3 gap-px border mb-12 rounded-[20px] overflow-hidden" style={{ background: accent + '33', borderColor: accent + '33' }}>
          {block.metrics.map(m => (
            <div key={m.label} className="bg-white px-8 py-10">
              <div className="font-serif leading-none mb-2" style={{ color: accent, fontSize: 48 }}>{m.value}</div>
              <div className="text-sm text-[#6B6880]">{m.label}</div>
            </div>
          ))}
        </div>
        {block.body && (
          <p className="cs-reveal text-base leading-relaxed text-[#3D3A5C] max-w-2xl">{block.body}</p>
        )}
      </div>
    </section>
  )
}

function VideoBlock({ block, accent }) {
  const cols = block.cols === 1 ? 'grid-cols-1' : block.cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="cs-reveal mb-8">
          <Eyebrow accent={accent}>{block.eyebrow}</Eyebrow>
          <Heading lines={block.heading} accent={accent} />
        </div>
        {block.body && (
          <p className="cs-reveal text-base leading-relaxed text-[#3D3A5C] max-w-2xl mb-12">{block.body}</p>
        )}
        <div className={`cs-reveal grid ${cols} gap-5 items-start`}>
          {block.videos.map((src, i) => (
            <video
              key={i}
              src={src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto rounded-[4px] border border-[#EBEBEB] bg-[#F2F4ED]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const RENDERERS = {
  overview: OverviewBlock,
  text: TextBlock,
  image: ImageBlock,
  problemGrid: ProblemGridBlock,
  process: ProcessBlock,
  gallery: GalleryBlock,
  twoCol: TwoColBlock,
  quote: QuoteBlock,
  video: VideoBlock,
  results: ResultsBlock,
}

// ─── Prev / Next + Related ───────────────────────────────────────────────────
function NextProjects({ cs }) {
  const others = CASE_STUDIES.filter(c => c.slug !== cs.slug).slice(0, 3)
  const idx = CASE_STUDIES.findIndex(c => c.slug === cs.slug)
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length]

  return (
    <section className="bg-white border-t border-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#8DAA44] mb-3">Keep exploring</p>
            <h2 className="font-serif text-[#1A1730] leading-[1.35]" style={{ fontSize: 'clamp(24px, 2.8vw, 38px)' }}>
              More <em style={{ color: cs.accent }}>case studies.</em>
            </h2>
          </div>
          <a href={`#/work/${next.slug}`} className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[#1A1730] hover:opacity-70 transition-opacity">
            Next: {next.client} →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#EBEBEB] border border-[#EBEBEB]">
          {others.map(o => (
            <a key={o.slug} href={`#/work/${o.slug}`} className="group bg-white flex flex-col hover:bg-[#F2F4ED] transition-colors" style={{ '--cs-accent': o.accent }}>
              <div className="overflow-hidden bg-[#F2F4ED]" style={{ aspectRatio: '16 / 10' }}>
                <img src={o.cardImage} alt={o.client} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-2" style={{ color: o.accent }}>{o.category}</p>
                <h3 className="font-serif text-[#1A1730] text-lg leading-snug transition-colors group-hover:[color:var(--cs-accent)]">
                  {Array.isArray(o.title) ? o.title.join(' ') : o.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CaseStudyPage({ cs }) {
  useReveal(cs.slug)

  return (
    <main>
      <Hero cs={cs} />
      {cs.blocks.map((block, i) => {
        const Renderer = RENDERERS[block.type]
        return Renderer ? <Renderer key={i} block={block} accent={cs.accent} /> : null
      })}
      <NextProjects cs={cs} />
    </main>
  )
}
