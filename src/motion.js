// ─── Shared Framer Motion variants ───────────────────────────────────────────
// Subtle, reusable motion presets. Easing matches the site's existing
// cubic-bezier(0.4, 0, 0.2, 1) so CSS and Framer feel like one system.
// Reduced motion is honored globally via <MotionConfig reducedMotion="user">.

const EASE = [0.4, 0, 0.2, 1]

// Page-level route transition. Wrap routed content keyed by route so
// AnimatePresence can cross-fade between Home and case studies.
export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
}

// Stagger container — children with the `fadeUp` variant cascade in.
export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}
