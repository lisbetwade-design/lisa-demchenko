// ─────────────────────────────────────────────────────────────────────────────
// GUIDE / PRODUCT LANDING PAGES
// ─────────────────────────────────────────────────────────────────────────────
// Each entry drives a full landing page at /guides/<slug>, rendered by
// GuidePage.jsx. Content is grounded in the real Gumroad product pages.
//
// FIELD REFERENCE
//   slug, accent            — URL + highlight color
//   badge, price, priceNote — pill shown in the hero
//   title (string[])        — hero headline, one <span> per line
//   tagline                 — one-line positioning under the title
//   lead                    — 1–2 sentence intro paragraph
//   cta / ctaSecondary      — { label, href } buttons (href → Gumroad)
//   ogImage                 — absolute social share image
//   learn                   — "What you'll learn / What's inside" bullet list
//   sectionsTitle, sections — cards (paths or modules): { label, title, body, tag? }
//   audienceTitle, audience — "Who it's for" paragraphs
//   note                    — small reassurance line near the CTA (e.g. "Free")
// ─────────────────────────────────────────────────────────────────────────────

export const GUIDES = [
  {
    slug: 'intro-to-claude-for-designers',
    accent: '#5C3AFF',
    badge: 'Free Guide',
    price: 'Free',
    priceNote: 'No card required',
    title: ['The complete Claude AI', 'guide for designers.'],
    tagline: 'A beginner-friendly introduction to using AI in your UX/UI and product design practice.',
    lead:
      "Curious about Claude but not sure where to start? This is the guide for that — a clear, honest starting point written specifically for designers. No technical background needed, no assumptions about what you already know, and no jargon.",
    cta: { label: 'Start designing with Claude', href: 'https://pixelandprocess.gumroad.com/l/claudeguide' },
    note: "Free · An interactive guide, not a PDF.",
    ogImage: 'https://public-files.gumroad.com/a4iqvwz9tcg5ftx3ee70v1fu3btj',
    priceAmount: '0',
    seoTitle: 'AI for UX/UI Designers: The Complete Claude Guide (Free)',
    metaDescription:
      'Learn to design with AI. A free, beginner-friendly guide to using Claude for UX/UI and product design — real prompts, workflows, and a plain-English intro for designers. No coding needed.',
    keywords: [
      'AI for UX designers', 'AI for UI designers', 'design with AI', 'AI in product design',
      'Claude for designers', 'learn AI for design', 'UX/UI with AI', 'AI for designers course',
    ],
    faq: [
      {
        q: 'Is this an AI course for designers?',
        a: "It's a free, self-paced interactive guide — think of it as a beginner's course in using AI (Claude) for UX/UI and product design. You pick a learning path and work through it at your own speed.",
      },
      {
        q: 'Do I need coding experience to design with AI?',
        a: 'No. This guide is written for designers with no technical background. Every technical term is explained in plain English, and the prompts are ready to copy and paste.',
      },
      {
        q: 'What can I actually do with AI in UX/UI design?',
        a: 'Use it for research, ideation, copywriting, critique, and documentation — before, during, and after Figma. The guide shows exactly where AI fits into a real design workflow.',
      },
      {
        q: 'How is this different from a free AI tutorial on YouTube?',
        a: 'It\'s structured specifically for designers — with paths based on where you\'re starting and a plain-English glossary — so you\'re not wading through developer tutorials to find the parts that apply to design.',
      },
    ],
    learnTitle: "What you'll learn",
    learn: [
      "What Claude actually is, and why it's different from other AI tools you may have tried",
      'The right mindset going in — what to expect and how to get useful results from day one',
      'Where to use it: four access points explained in plain English, simplest to most powerful',
      'Real prompts you can copy for research, ideation, copywriting, critique, and documentation',
      'How Claude fits into a real design workflow — before Figma, during, and after',
      "A plain-English glossary of every technical term you'll come across",
    ],
    sectionsTitle: 'How it works',
    sectionsLead:
      "It's an interactive guide — you pick a path based on where you're starting. Begin with the first; the others will be there when you're ready.",
    sections: [
      {
        label: 'Path 01',
        title: 'New to Claude',
        body: 'What it is, how to think about it, how to set it up, and exactly what to do in your first 30 minutes.',
      },
      {
        label: 'Path 02',
        title: 'Design with Claude',
        body: 'Use cases, copy-ready prompts, and workflow — plus what the shift to AI-assisted design actually feels like.',
      },
      {
        label: 'Path 03',
        title: 'Build with Claude',
        body: "For when you're ready to go further: Figma to code to a live website, by yourself.",
      },
    ],
    audienceTitle: "Who it's for",
    audience: [
      "Designers who are curious about AI but haven't found a resource that speaks their language.",
      'If every guide you\'ve tried assumed you were a developer, this one is different. No jargon. No pressure. Just a clear introduction to a tool that can genuinely change how you work.',
    ],
  },
  {
    slug: 'ai-powered-design-workflows',
    accent: '#8DAA44',
    badge: 'Practical Guide',
    price: '$15',
    priceNote: 'Lifetime access',
    title: ['AI-powered product', 'design workflows.'],
    tagline: 'A hands-on, module-by-module walkthrough of where AI fits inside real product design and UX work.',
    lead:
      "Design is changing fast — and the designers who thrive aren't the ones replacing their craft with AI, they're the ones who know exactly where to plug it in. Every section gives you the actual prompts used in real workflows, annotated to explain not just what to copy, but why it works and how to adapt it. The difference between following a recipe and learning to cook.",
    cta: { label: 'Put AI to work in your design', href: 'https://pixelandprocess.gumroad.com/l/aipowereddesignguide' },
    note: 'Lifetime access — the guide keeps growing as new modules ship.',
    ogImage: 'https://public-files.gumroad.com/5dl5mm0yu3l5xe833untt5wzk9um',
    priceAmount: '15',
    seoTitle: 'AI in Product Design: UX Workflows & Prompts Guide',
    metaDescription:
      'A practical guide to using AI in product design and UX — from research to handoff. Annotated prompts and real workflows for designing with AI across the whole process. Lifetime access.',
    keywords: [
      'AI in product design', 'AI for UX design', 'design with AI', 'UI/UX with AI',
      'AI design workflows', 'AI prompts for designers', 'AI UX research', 'AI for designers course',
    ],
    faq: [
      {
        q: 'Is this an AI design course?',
        a: "It's a practical, module-by-module guide — a self-paced course in applying AI across product design and UX, from research to developer handoff. Seven modules, each with real, annotated prompts.",
      },
      {
        q: 'How does AI fit into a real product design workflow?',
        a: 'The guide walks through every phase — UX research, strategy, UI design, content, handoff, design systems, and Claude skills — showing exactly where AI helps and where it doesn\'t, with prompts you can adapt.',
      },
      {
        q: 'Who is this AI for UX guide for?',
        a: 'Product and UX/UI designers who want to work AI into their actual practice — not to replace their craft, but to know exactly where to plug it in and move faster.',
      },
      {
        q: 'Do the prompts work with ChatGPT or other AI tools?',
        a: 'The prompts are written for Claude, but the thinking behind each one — what to include, why it works, and how to adapt it — transfers to ChatGPT, Gemini, and other assistants. Every prompt is annotated so you can adjust it for any tool.',
      },
    ],
    learnTitle: 'How the guide is structured',
    learn: [
      'Ready-to-use prompts with line-by-line annotations — not just what to copy, but why it works',
      '"Watch Out For" callouts that flag where AI tends to go wrong in each context',
      'Embedded screen recordings showing full workflows in motion, not just the end result',
      'Self-contained use cases — jump straight to what\'s relevant without reading front to back',
      'Built-in progress tracking so you can pick up exactly where you left off',
      'Lifetime access: new modules, use cases, and prompt patterns are added over time',
    ],
    sectionsTitle: 'What\'s inside',
    sectionsLead:
      'Seven focused modules, each covering a distinct phase of the design process with 2–3 self-contained use cases.',
    sections: [
      {
        label: 'Module 01',
        title: 'UX Research & Synthesis',
        body: 'Interview guides, follow-up question sets, screener questions, synthesis, and JTBD mapping — including a recording of connecting Claude directly to Notion notes.',
      },
      {
        label: 'Module 02',
        title: 'UX Strategy & Methodology',
        body: 'Move from raw research to a clear direction: pressure-test assumptions, build methodology rationale, and frame decisions for stakeholders.',
      },
      {
        label: 'Module 03',
        title: 'Visual & UI Design',
        body: 'Generate design-direction options, write component descriptions, and explore layout logic — accelerating ideation without flattening judgment.',
      },
      {
        label: 'Module 04',
        title: 'Content & Copy',
        body: 'Draft interface copy, error and empty states, onboarding flows, and microcopy — in the right voice, at speed.',
      },
      {
        label: 'Module 05',
        title: 'Handoff & Documentation',
        body: 'Component specs, annotation notes, decision logs, and dev-ready docs that actually get read because they\'re clear and structured.',
      },
      {
        label: 'Module 06',
        title: 'Design Systems',
        body: 'A dedicated module on AI within design-system workflows — token documentation, component governance, and more.',
      },
      {
        label: 'Module 07',
        title: 'Claude Skills',
        body: 'A practical intro to Cowork skills — connecting tools, automating recurring tasks, and extending Claude beyond single prompts.',
      },
    ],
    audienceTitle: 'Why lifetime access',
    audience: [
      'AI in design is not a settled topic. New tools, capabilities, and best practices are emerging constantly — and this guide is built to evolve with them.',
      'Buying it means access to everything it becomes, not just what it is today — new modules, use cases, and prompt patterns are added as workflows are tested and refined.',
    ],
  },
]

export const getGuide = slug => GUIDES.find(g => g.slug === slug)

// Build Course + FAQ structured data for a guide. Course signals relevance for
// "AI for UX course"–style queries; FAQPage adds keyword-rich Q&A.
export function guideJsonLd(g, origin = 'https://demchenko.design') {
  const url = `${origin}/guides/${g.slug}`
  const name = g.title.join(' ').replace(/\.\s*$/, '')
  const course = {
    '@type': 'Course',
    name,
    description: g.metaDescription,
    url,
    image: g.ogImage,
    inLanguage: 'en',
    provider: { '@type': 'Person', name: 'Lisa Demchenko', url: `${origin}/` },
    keywords: (g.keywords || []).join(', '),
    offers: {
      '@type': 'Offer',
      price: g.priceAmount,
      priceCurrency: 'USD',
      url: g.cta.href,
      availability: 'https://schema.org/InStock',
      category: g.priceAmount === '0' ? 'Free' : 'Paid',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT3H',
    },
  }
  const graph = [course]
  if (g.faq && g.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: g.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
