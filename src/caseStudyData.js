// ─────────────────────────────────────────────────────────────────────────────
// CASE STUDY CONTENT
// ─────────────────────────────────────────────────────────────────────────────
// Each entry drives BOTH the homepage card and a full case study page at
// #/work/<slug>. The page template (CaseStudyPage.jsx) renders the `blocks`
// array in order, so you can reorder, add, or remove sections per project —
// the layout adapts to whatever you give it.
//
// HOW TO EDIT
//   • Replace every [bracketed] string with your real copy.
//   • Swap `heroImage`, `cardImage`, and any block `src` with your own images
//     (drop files in /public/images and reference them as '/images/your-file.png').
//   • `accent` + `heroTheme` set the *vibe* of each study — change them freely.
//
// THEMING (this is what makes each study feel different)
//   accent     — the highlight color used for eyebrows, emphasis, metrics, quote.
//   heroTheme  — 'dark'  : deep background, light text  (bold / premium)
//                'light' : soft background, dark text   (clean / editorial)
//                'tint'  : accent-tinted background      (playful / branded)
//
// BLOCK TYPES (mix & match in any order)
//   { type:'overview', lead, stats:[{value,label}] }
//   { type:'text', eyebrow, heading:[l1,l2], body:[p1,p2] }
//   { type:'image', src, full?, caption? }
//   { type:'problemGrid', eyebrow, heading:[l1,l2], cards:[{title,body}] }
//   { type:'process', eyebrow, heading:[l1,l2], steps:[{label,title,body,src}] }
//   { type:'gallery', eyebrow, heading:[l1,l2], images:[...], cols? }
//   { type:'twoCol', eyebrow, heading, body:[...], src, flip? }
//   { type:'quote', quote, name, role }
//   { type:'results', eyebrow, heading:[l1,l2], metrics:[{value,label}], body }
// ─────────────────────────────────────────────────────────────────────────────

// Standard storytelling skeleton — reused per project so every study has the
// same strong spine. Pass in the project's images + accent. Customize freely.
const buildBlocks = ({ images }) => [
  {
    type: 'overview',
    lead:
      '[Open with the big picture: what is this product, who is it for, and why did it matter? Two or three sentences that frame the story before the reader scrolls in.]',
    stats: [
      { value: '[8 wks]', label: 'Timeline' },
      { value: '[0 → 1]', label: 'Stage' },
      { value: '[Solo]', label: 'Design team' },
    ],
  },
  {
    type: 'text',
    eyebrow: 'The Challenge',
    heading: ['The problem', 'worth solving.'],
    body: [
      '[Describe the core problem in plain language. What was broken, missing, or confusing — and who felt it? Ground it in a real user or business pain.]',
      '[Add the tension that made this hard: a tight timeline, complex data, regulatory limits, or conflicting stakeholders. This is what makes the work impressive.]',
    ],
  },
  {
    type: 'image',
    src: images[0],
    full: true,
    caption:
      '[Set the scene — a before-state, the existing product, or a research artifact that kicked things off.]',
  },
  {
    type: 'problemGrid',
    eyebrow: 'The Situation',
    heading: ['What I was', 'working with.'],
    cards: [
      { title: '[Pain point one]', body: '[A sentence or two on this specific problem and who it affected.]' },
      { title: '[Pain point two]', body: '[A sentence or two on this specific problem and who it affected.]' },
      { title: '[Pain point three]', body: '[A sentence or two on this specific problem and who it affected.]' },
      { title: '[Pain point four]', body: '[A sentence or two on this specific problem and who it affected.]' },
    ],
  },
  {
    type: 'process',
    eyebrow: 'How I Got There',
    heading: ['My', 'workflow.'],
    steps: [
      {
        label: 'Discover',
        title: '[Research & framing]',
        body:
          '[What you did to understand the problem — interviews, audits, data review, competitor analysis. Call out any AI-assisted workflow you used to move faster.]',
        src: images[1],
      },
      {
        label: 'Define',
        title: '[Shaping the direction]',
        body:
          '[How you turned insight into direction — user flows, IA, sketches, prototypes — and what you tested before committing.]',
        src: images[2],
      },
      {
        label: 'Deliver',
        title: '[Design & handoff]',
        body:
          '[The final design and system, and how you shipped it — components, specs, and collaboration with engineering.]',
        src: images[3],
      },
    ],
  },
  {
    type: 'gallery',
    eyebrow: 'The Work',
    heading: ['Selected', 'screens.'],
    images: images.slice(0, 4),
    cols: 2,
  },
  {
    type: 'quote',
    quote:
      '[A short, specific quote from the client or a teammate about the impact of the work. Real words beat adjectives.]',
    name: '[Client name]',
    role: '[Title, Company]',
  },
  {
    type: 'results',
    eyebrow: 'The Outcome',
    heading: ['What', 'changed.'],
    metrics: [
      { value: '[+42%]', label: 'Activation' },
      { value: '[−60%]', label: 'Support tickets' },
      { value: '[4.8★]', label: 'App rating' },
    ],
    body:
      '[Close the loop: what happened after launch, what you learned, and what you would explore next.]',
  },
]

export const CASE_STUDIES = [
  {
    slug: 'stndby',
    client: 'Stndby',
    category: 'Live Events',
    accent: '#5C3AFF',
    heroTheme: 'tint',
    title: ['Communication built', 'for live event crews.'],
    subtitle:
      'A lightweight mobile app that replaces the chaos of texts, emails, and scattered docs with one calm, trustworthy source of truth for freelance event crews.',
    meta: {
      industry: 'Live Events · Mobile',
      role: 'UX/UI Designer & Strategist',
      timeline: 'May – Jun 2025',
      services: ['UX Strategy', 'User Flows', 'Wireframing', 'UI Design', 'Design System'],
    },
    heroImage: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/obhpm8l0gm6kbacqfz6l.webp',
    // Homepage card
    summary:
      'A lightweight communication app for freelance live-event crews — designed from scratch to replace chaotic texts and scattered docs with a single source of truth.',
    cardImage: '/images/Stndby.png',
    metric: 'MVP',
    metricLabel: 'shipped for pilot',
    blocks: [
      {
        type: 'overview',
        lead:
          'STNDBY is a lightweight communication app purpose-built for freelance crew and production teams working live events. Admins create events, upload show documents, and broadcast last-minute changes — while crew get one central place for the latest info, plus an AI assistant that answers show-specific questions straight from the current documents.',
        stats: [
          { value: 'MVP', label: 'For pilot testing' },
          { value: 'Mobile', label: 'Built in Flutterflow' },
          { value: 'Solo', label: 'Designer & strategist' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'The Challenge',
        heading: ['The problem', 'worth solving.'],
        body: [
          'Crews working live events rely on chaotic, disorganized communication — texts, emails, and scattered documents — that frequently leads to confusion, outdated info, and wasted time when the pressure is highest.',
          'STNDBY had to give admins one place to create events, share documents, and push real-time updates, and give crew a single trustworthy source for the latest show info — designed for dark backstage environments and high-pressure moments.',
        ],
      },
      {
        type: 'problemGrid',
        eyebrow: 'What I Owned',
        heading: ['My', 'responsibilities.'],
        cards: [
          {
            title: 'Strategy & scope',
            body: 'Led UX strategy aligned with MVP scope and production constraints, and built a strategy doc covering research goals, feature prioritization, accessibility standards, and success metrics.',
          },
          {
            title: 'User-centered flows',
            body: 'Developed flows for both Admins and Crew, and wrote JTBD statements to align every design decision with what users were actually trying to get done.',
          },
          {
            title: 'Voice & architecture',
            body: "Defined the product's tone and personality — like someone who's worked a thousand shows — and a clear, role-specific information architecture.",
          },
          {
            title: 'Interface & AI',
            body: 'Designed a clean, distraction-free mobile UI optimized for dark environments, and planned the AI interaction flow for fast, trustworthy, event-specific support.',
          },
        ],
      },
      {
        type: 'process',
        eyebrow: 'The Process',
        heading: ['How I got', 'there.'],
        steps: [
          {
            label: 'Strategy',
            title: 'Defining the problem space & JTBD',
            body: 'Before any visuals, I used a Notion doc to outline the product goals, user needs, and success metrics — then explored what users were really trying to get done using the Jobs To Be Done framework. This kept me focused on what actually mattered.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/bhg1o4g05qyr2vk2g6pp.webp',
          },
          {
            label: 'Mapping',
            title: 'Mapping the experience',
            body: "I explored the client's Figma file to find UX gaps and mapped the key user flows from the provided wireframes. Visualizing the journey surfaced friction points early.",
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/kh3iaunpnvstxmqq2mht.webp',
          },
          {
            label: 'Wireframes',
            title: 'Sketching & structuring',
            body: 'With flows in place, I moved to mid-fidelity wireframes to test layouts quickly, propose alternatives to the original ideas, and brainstorm missing features — staying aligned with the strategy and JTBD.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/zoa5gcnyrfzsougerdes.webp',
          },
          {
            label: 'Iteration',
            title: 'Finding the clearest structure',
            body: 'I explored different options and made quick iterations, focusing on functionality without being distracted by visuals, until the structure was as clear as possible.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/tutthvstpsilw6qh8iyl.webp',
          },
          {
            label: 'Visual language',
            title: 'Exploring the moodboard',
            body: 'Together with Morgan, I gathered inspiration around color palettes, clean and readable typography, and UI patterns that enhance usability. This moodboard guided every visual decision that followed.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/wueph8cylzw9rkw7hogu.webp',
          },
          {
            label: 'Final UI',
            title: 'Designing dev-ready screens',
            body: 'Using all the prior work, I crafted high-fidelity, dev-ready designs in Figma — fully designed screens plus a component library for consistency. Each screen is functional, intuitive, and aligned with the strategy.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/ualyio3ksirrwnyoihm3.webp',
          },
        ],
      },
      {
        type: 'gallery',
        eyebrow: 'The Work',
        heading: ['Selected', 'screens.'],
        images: [
          'https://media.contra.com/image/upload/fl_progressive/q_auto:best/mpvw1mxzvt136xoo00a5.webp',
          'https://media.contra.com/image/upload/fl_progressive/q_auto:best/ualyio3ksirrwnyoihm3.webp',
        ],
        cols: 2,
      },
      {
        type: 'quote',
        quote:
          'Lisa took my chaotic app vision and turned it into something clear and beautiful. She built a full Figma system that brought it to life and made the process enjoyable. She’s sharp, fast, and great at balancing structure with creativity.',
        name: 'Morgan Melto',
        role: 'Founder, Stndby',
      },
      {
        type: 'results',
        eyebrow: 'The Outcome',
        heading: ['What', 'changed.'],
        metrics: [
          { value: 'MVP', label: 'Shipped for pilot testing' },
          { value: '2', label: 'Role-based experiences' },
          { value: 'AI', label: 'Show-specific assistant' },
        ],
        body:
          "STNDBY moved from scattered wireframes to a dev-ready MVP with a full component library — ready for pilot testing with live event crews. The result is a focused, role-aware product that speaks the language of people who’ve worked a thousand shows.",
      },
    ],
  },
  {
    slug: 'energy-dashboard',
    client: 'Gorilla',
    category: 'Energy SaaS',
    accent: '#0E9F8E',
    heroTheme: 'tint',
    title: ['An automation canvas', 'for energy data.'],
    subtitle:
      'A complex in-app automation feature that lets enterprise users chain actions, branch on results, and tailor the Gorilla platform to their own workflows.',
    meta: {
      industry: 'Energy · SaaS',
      role: 'Product Designer',
      timeline: '2024 – 2025',
      services: ['UX Strategy', 'Prototyping', 'Usability Testing', 'High-Fidelity UI'],
    },
    heroImage: '/images/image.png',
    // Homepage card
    summary:
      'A complex automation/orchestration feature for an energy data platform — letting enterprise users build, chain, and branch their own workflows through an intuitive, scalable UI.',
    cardImage: '/images/Energy Data Overview Dashboard.png',
    metric: '6',
    metricLabel: 'design iterations',
    blocks: [
      {
        type: 'overview',
        lead:
          'Gorilla is a software scale-up shaping the future of energy retail — automating the collection, transformation, processing, and analysis of data so enterprises can unlock data-driven pricing, forecasting, and reporting. The automation canvas lets users control and manipulate the processes in their Gorilla setup: chaining actions together and making decisions based on the result of the previous one.',
        stats: [
          { value: '6', label: 'Design iterations' },
          { value: '2', label: 'Build stages' },
          { value: 'Agile', label: 'Design thinking' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'The Objective',
        heading: ['Put workflows', "in users' hands."],
        body: [
          'The goal was to empower users to control and manipulate the processes in their Gorilla setup. Automations let them set repetitive or one-time flows and tailor the platform to exactly how they work.',
          'In-app automation and orchestration configuration would give users a way to chain actions one after another and make decisions based on the result of each previous step.',
        ],
      },
      {
        type: 'text',
        eyebrow: 'The Challenge',
        heading: ['Designing within', 'technical limits.'],
        body: [
          'The main challenge was understanding the technical limitations, feasibility, and which automation configurations were actually possible to build.',
          'To tackle it, software, back-end, and front-end engineers and solution architects were involved in the process from the very beginning — so design and feasibility moved together.',
        ],
      },
      {
        type: 'problemGrid',
        eyebrow: 'What I Owned',
        heading: ['My', 'role.'],
        cards: [
          {
            title: 'Interface for complexity',
            body: 'Created a genuinely user-friendly interface for a highly complex, technical feature.',
          },
          {
            title: 'Prototypes for testing',
            body: 'Delivered prototypes of the major flows for both internal and external testing.',
          },
          {
            title: 'Usability testing',
            body: 'Prepared and facilitated usability testing internally and with users from the client side.',
          },
          {
            title: 'Cross-functional definition',
            body: 'Collaborated with product, industry experts, and engineers to define the feature and plan its execution.',
          },
        ],
      },
      {
        type: 'process',
        eyebrow: 'The Approach',
        heading: ['How I got', 'there.'],
        steps: [
          {
            label: 'Flowcharts',
            title: 'Mapping the logic',
            body: 'I started with flowcharts to define how actions chain together and branch based on results — the backbone of the whole canvas.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/ql92xsvr3qkxucg0v9br.webp',
          },
          {
            label: 'Sketching',
            title: 'Exploring the interaction',
            body: 'Reference research and quick sketching let me explore the interaction model for building and connecting automations before committing to detail.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/l6cbnpttjpr8icyb6r9q.webp',
          },
          {
            label: 'Hi-fi design',
            title: 'High-fidelity designs',
            body: 'I translated the model into detailed UI, informed by backend definition workshops so the designs stayed grounded in what was feasible.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/lcmanytcy36h90zppgjr.webp',
          },
          {
            label: 'Reviews',
            title: 'Reviews with FE & QA',
            body: 'Design reviews and feedback sessions with the Front End and QA teams kept the work feasible and caught edge cases early.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/kxxiugmth62hfvddeb7n.webp',
          },
          {
            label: 'Validation',
            title: 'Client & user input',
            body: 'The feature was introduced to clients before development started, to see whether it sparked interest or raised concerns while changes were still cheap.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/xdv62lwhdmc6n7bhufri.webp',
          },
          {
            label: 'Testing',
            title: 'Usability testing',
            body: 'I created prototypes of the major flows and ran usability testing internally and with client-side users to refine the experience.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/oz9ejihhmz3spbonttor.webp',
          },
        ],
      },
      {
        type: 'results',
        eyebrow: 'The Outcome',
        heading: ['What', 'happened.'],
        metrics: [
          { value: '6', label: 'Iterations to clarity' },
          { value: '2-stage', label: 'Phased rollout' },
          { value: 'Validated', label: 'With real clients' },
        ],
        body:
          "The feature was well accepted and sparked real enthusiasm from users. Development didn't run as one continuous flow, though — we hit technical difficulties with the API and back-end, and had to stay flexible in how some front-end elements were built. Delivery was split into two stages: first a read-only mode of the feature, then the full functionality flows.",
      },
      {
        type: 'text',
        eyebrow: 'Learnings',
        heading: ['What I', 'took away.'],
        body: [
          'Collaborative work across different backgrounds and expertise leads to a far better understanding of the product scope — and makes sure every side of the project is taken care of.',
          'Complex features like this need more time to define the technical part up front, and likely proof-of-concepts in both the back end and front end before committing to a build.',
        ],
      },
    ],
  },
  {
    slug: 'kids-hero',
    client: 'KidsHero',
    category: 'Kids · AI',
    accent: '#3E8EE0',
    heroTheme: 'tint',
    title: ['Every child, the hero', 'of their own story.'],
    subtitle:
      'An AI bedtime-story app that turns each child into the main character — personalized, soothing, and effortless for tired parents.',
    meta: {
      industry: 'Kids · Education',
      role: 'UX/UI Designer',
      timeline: '2025',
      services: ['Market Analysis', 'UX Strategy', 'Wireframing', 'UI Design', 'Illustration', 'Prototyping'],
    },
    heroImage: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/ieozwqdnawn7ysm5p49j.webp',
    // Homepage card
    summary:
      'An AI-powered app that helps parents create personalized bedtime stories starring their own children — blending creativity, bonding, and effortless ease.',
    cardImage: '/images/Kidzhero.png',
    metric: '0 → 1',
    metricLabel: 'concept to hi-fi',
    blocks: [
      {
        type: 'overview',
        lead:
          'KidsHero is an AI-powered mobile app that helps parents create personalized bedtime stories featuring their children as the main characters. I designed an experience that blends creativity, emotional bonding, and effortless usability — supporting tired caregivers and delighting young imaginations.',
        stats: [
          { value: 'Mobile', label: 'AI bedtime stories' },
          { value: '0 → 1', label: 'Concept to hi-fi' },
          { value: 'Solo', label: 'UX, UI & illustration' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'Market Analysis',
        heading: ['Where existing', 'apps fell short.'],
        body: [
          'To understand the landscape, I explored AI storytelling and educational entertainment apps like Storytime AI, Oscar, and BedtimeStory.ai.',
          'Many offered fast generation but lacked emotional depth or customization; some required extra hardware like Alexa or were web-only; others skipped voice narration, making them less soothing for bedtime. The opportunity: combine personalization, a multimedia experience, and family-friendly storytelling in one simple mobile app — no extra devices.',
        ],
      },
      {
        type: 'image',
        src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/xd7avlz6zgrko6ffx3ef.webp',
        full: true,
        caption: 'Competitor and market analysis across the AI-storytelling landscape.',
      },
      {
        type: 'problemGrid',
        eyebrow: 'Jobs To Be Done',
        heading: ['What users', 'really needed.'],
        cards: [
          { title: 'Calm at bedtime', body: '“As a tired parent, I want to create a story fast so I can calm my child down for sleep.”' },
          { title: 'Entertain on the go', body: '“As a parent on the go, I want to entertain my kid without carrying toys or books.”' },
          { title: '“I’m the hero”', body: '“As a child, I want to hear stories where I’m the main character — I feel special when it’s about me.”' },
        ],
      },
      {
        type: 'process',
        eyebrow: 'The Process',
        heading: ['How I got', 'there.'],
        steps: [
          {
            label: 'Strategy',
            title: 'UX strategy & north star',
            body: '“Make every child the hero of their own story.” I set goals around reducing friction for tired parents, reflecting each child’s world, and supporting bonding without extra screen time — with a mobile-first, modular, optionally-narrated direction.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/rplie9yob4ydtlottgcc.webp',
          },
          {
            label: 'Flow',
            title: 'Mapping the user flow',
            body: 'From setup to storytelling: add child profiles, choose a theme (or let AI surprise you), customize details, then generate and preview. I designed for minimal taps, smart defaults, and a joyful flow that works one-handed — even with a baby in your arms.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/mb1igreixvyt6odgrpqq.webp',
          },
          {
            label: 'Wireframes',
            title: 'Testing the core structure',
            body: 'Low-fidelity wireframes validated the layout and flow early: guided onboarding with zero overwhelm, clear navigation between personalization steps, and seamless preview, save, and share.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/opl2v5ajpxxlxurjewbd.webp',
          },
          {
            label: 'Visual language',
            title: 'Moodboard',
            body: 'I gathered inspiration around soft, calming color, rounded shapes, and friendly, expressive characters to set a bedtime mood that still feels playful.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/jhst1hnfqu4ac9c8ozgw.webp',
          },
          {
            label: 'Hi-fi UI',
            title: 'The high-fidelity experience',
            body: 'Soft blues and rounded cards evoke a calming bedtime mood, with cute expressive icons and bubbly avatars that let each child shine — crafted so even a non-tech-savvy parent can use it easily.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/vr1ynuqpzdchekylrhxx.webp',
          },
          {
            label: 'System',
            title: 'Components & illustrations',
            body: 'I built a flexible UI kit for scalability and consistency: customizable kid avatars, unique themed icons (space, jungle, magic), and reusable mobile components — each crafted with emotional resonance and accessibility in mind.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/yymhkyekmfudj8ztbdkc.webp',
          },
        ],
      },
      {
        type: 'image',
        src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/cnxrj6log77rz3x9sih3.webp',
        full: true,
        caption: 'Custom avatars, themed icons, and reusable components — the KidsHero UI kit.',
      },
      {
        type: 'video',
        eyebrow: 'Motion',
        heading: ['Bringing it', 'to life.'],
        body:
          'Subtle animations and interactive transitions make the app feel magical without overwhelming the user — soft loading states during story generation, bouncy avatar and theme selection, and smooth slide transitions that guide parents effortlessly.',
        videos: [
          'https://media.contra.com/video/upload/fl_progressive/q_auto:best,w_1600/t2wdqj8g2alz4gu83yym.mp4',
          'https://media.contra.com/video/upload/fl_progressive/q_auto:best,w_1600/zo9ttzavehygocfycgey.mp4',
          'https://media.contra.com/video/upload/fl_progressive/q_auto:best,w_1600/qwbxlbt611kmrypibjcv.mp4',
        ],
      },
      {
        type: 'results',
        eyebrow: 'The Outcome',
        heading: ['What I', 'delivered.'],
        metrics: [
          { value: '0 → 1', label: 'Concept to hi-fi' },
          { value: 'One-handed', label: 'Bedtime-ready flow' },
          { value: 'Full', label: 'UI kit & illustrations' },
        ],
        body:
          'KidsHero came together as a complete, emotionally-driven concept — from market analysis and JTBD through a validated flow, a delightful high-fidelity UI, a reusable component library, and custom illustrations. The result makes every child feel seen, valued, and inspired: the hero of their own story.',
      },
    ],
  },
  {
    slug: 'reviu',
    client: 'Reviu',
    category: 'SaaS · Feedback',
    accent: '#4F5BD5',
    heroTheme: 'tint',
    title: ['Turning feedback', 'chaos into clarity.'],
    subtitle:
      'A SaaS tool that helps designers and teams centralize scattered feedback from Figma, Slack, email, and clients — and make sense of it with AI.',
    meta: {
      industry: 'SaaS · Design Tools',
      role: 'Product Designer & Strategist',
      timeline: '2025',
      services: ['User Research', 'Product Strategy', 'Information Architecture', 'Wireframing', 'UI Design'],
    },
    heroImage: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/mj9c8eycp0rnydbxxx2n.webp',
    // Homepage card
    summary:
      'A SaaS tool that centralizes scattered design feedback from Figma, Slack, email, and clients — turning feedback chaos into clarity with AI-powered insight.',
    cardImage: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/mj9c8eycp0rnydbxxx2n.webp',
    metric: '12',
    metricLabel: 'user interviews',
    blocks: [
      {
        type: 'overview',
        lead:
          'Reviu is a SaaS tool designed to help freelancers, in-house designers, and design teams centralize and make sense of scattered feedback across Figma, Slack, email, and client channels. The goal: turn feedback chaos into clarity through thoughtful UX, clean interfaces, and AI-powered insight generation.',
        stats: [
          { value: '12', label: 'User interviews' },
          { value: '40+', label: 'Survey responses' },
          { value: '5', label: 'Competitors analyzed' },
        ],
      },
      {
        type: 'text',
        eyebrow: 'The Problem',
        heading: ['Feedback lives', 'everywhere.'],
        body: [
          'Designers receive feedback from everywhere — Slack DMs, Figma comments, voice notes and Looms, client screenshots and videos, developer notes in Jira. The result is fragmented, duplicated, hard-to-track feedback that slows iterations and increases misalignment.',
          'Designers told me they spend 30–60 minutes per round just collecting feedback across channels — before they can even start acting on it.',
        ],
      },
      {
        type: 'problemGrid',
        eyebrow: 'The Situation',
        heading: ['Pain points from', 'the research.'],
        cards: [
          { title: 'No central place', body: 'Feedback has no single home — it’s scattered across channels and easy to lose.' },
          { title: 'Missing the “why”', body: 'A comment in Slack is meaningless without a design reference; the reasoning gets lost.' },
          { title: 'Manual clustering', body: 'Grouping and clustering feedback by hand takes far too long every round.' },
          { title: 'No status view', body: 'There’s no clear view of what’s done vs. pending, so reviews feel overwhelming.' },
        ],
      },
      {
        type: 'process',
        eyebrow: 'The Process',
        heading: ['How I got', 'there.'],
        steps: [
          {
            label: 'Research',
            title: 'Research & methods',
            body: 'I ran 12 user interviews (freelancers, in-house designers, agency founders), a survey with 40+ responses, competitor analysis (Ruttl, Pastel, Figma comments, Filestage, Notion), JTBD analysis, and persona development.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/gioyosxptnzpidbsvsuv.webp',
          },
          {
            label: 'Personas',
            title: 'Who we’re designing for',
            body: 'From the research I defined two primary personas, grounding every later decision in real workflows and frustrations rather than assumptions.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/ose9esyc3smtffbs2bat.webp',
          },
          {
            label: 'Strategy',
            title: 'Vision & MVP scope',
            body: 'Product vision: a calm, intelligent workspace where designers can collect, organize, and act on feedback effortlessly. Guided by principles like clarity over complexity and “AI as an assistant, not a replacement,” I scoped the MVP by value vs. effort.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/t4dzuymzfjuzo5etbuav.webp',
          },
          {
            label: 'Wireframes',
            title: 'Wireframing the structure',
            body: 'Low-fidelity wireframes focused on clear navigation, minimal clutter, and highly scannable feedback lists — with a feedback list on the left and a contextual design-preview panel on the right.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/hqvdhgopaa2xm9itg5dd.webp',
          },
          {
            label: 'UI',
            title: 'The UI design',
            body: 'I brought the experience to life with a consistent, elegant, linear-style UI — calm visuals, always-visible hierarchy, and AI insights surfaced through a focused slide-out panel.',
            src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/mqd591evftkhjzn3gcix.webp',
          },
        ],
      },
      {
        type: 'text',
        eyebrow: 'Information Architecture',
        heading: ['A structure that', 'stays out of the way.'],
        body: [
          'A clear IA aligned the MVP flows: authentication, a Kanban board with an inbox, projects, and a project space holding uploads, feedback, AI summaries, and clusters.',
          'On top of that sit shareable public pages, analytics, and settings — enough structure for teams to get visibility without burying designers in navigation.',
        ],
      },
      {
        type: 'image',
        src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/aqs0c7bht3jqj0ehgt7r.webp',
        full: true,
        caption: 'Key wireframe decisions: contextual preview panel, card-based project overviews, and an onboarding-friendly empty state.',
      },
      {
        type: 'image',
        src: 'https://media.contra.com/image/upload/fl_progressive/q_auto:best/vzcsbhamraqdydpi3j77.webp',
        full: true,
        caption: 'The Reviu marketing site, carrying the calm, elegant product language through to the landing page.',
      },
      {
        type: 'results',
        eyebrow: 'The Outcome',
        heading: ['What I', 'delivered.'],
        metrics: [
          { value: '12+', label: 'Users interviewed' },
          { value: 'Linear-style', label: 'Calm, elegant UX' },
          { value: 'AI', label: 'Insight & clustering' },
        ],
        body:
          'Reviu came together as a research-grounded, end-to-end concept — from interviews and JTBD through personas, a value-vs-effort MVP, a clear information architecture, scannable wireframes, and a calm, linear-style UI. The throughline: turn feedback chaos into clarity, with AI as an assistant rather than a replacement.',
      },
    ],
  },
]

export const getCaseStudy = slug => CASE_STUDIES.find(c => c.slug === slug)
