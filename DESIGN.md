# RealFinanceTools Design System

A premium, Apple-inspired design language for a static finance tools platform. Calm, confident, and editorial — never dashboard-heavy or template-driven.

**Inspiration:** Apple.com, Apple Wallet, Apple Savings, Linear, Vercel, Stripe  
**Avoid:** Calculator.net aesthetics, generic SaaS dashboards, crypto neon, dense data UIs

---

## Design principles

1. **Clarity over decoration** — Content and numbers are the hero; chrome stays quiet.
2. **Generous space** — Whitespace signals quality; never pack controls tightly.
3. **Restrained motion** — Fade, opacity, and micro-scale only; respect `prefers-reduced-motion`.
4. **Dual theme parity** — Light and dark are first-class, not an inverted afterthought.
5. **Accessible by default** — Contrast, focus rings, touch targets ≥ 44px, semantic HTML.

---

## Color system

### Light theme (primary)

| Token | Value | Usage |
|-------|-------|--------|
| `bg-primary` | `#ffffff` | Page background |
| `bg-secondary` | `#f5f5f7` | Sections, footer |
| `bg-tertiary` | `#fbfbfd` | Subtle panels |
| `bg-elevated` | `#ffffff` | Cards (on secondary bg) |
| `text-primary` | `#1d1d1f` | Headlines, body |
| `text-secondary` | `#6e6e73` | Supporting copy |
| `text-tertiary` | `#86868b` | Captions, hints |
| `border-subtle` | `rgba(0,0,0,0.06)` | Hairlines |
| `border-default` | `#d2d2d7` | Inputs, cards |
| `accent` | `#0071e3` | Links, focus, highlights |
| `accent-hover` | `#0077ed` | Link hover |
| `cta` | `#1d1d1f` | Primary button fill |
| `cta-hover` | `#333336` | Primary button hover |

### Dark theme (near-black)

| Token | Value | Usage |
|-------|-------|--------|
| `bg-primary` | `#000000` | Page background |
| `bg-secondary` | `#1c1c1e` | Sections |
| `bg-tertiary` | `#2c2c2e` | Panels |
| `bg-elevated` | `#1c1c1e` | Cards |
| `text-primary` | `#f5f5f7` | Headlines, body |
| `text-secondary` | `#a1a1a6` | Supporting copy |
| `text-tertiary` | `#86868b` | Captions |
| `border-subtle` | `rgba(255,255,255,0.08)` | Hairlines |
| `border-default` | `#424245` | Inputs, cards |
| `accent` | `#2997ff` | Links (Apple dark blue) |
| `cta` | `#f5f5f7` | Primary button fill |
| `cta-hover` | `#e8e8ed` | Primary button hover |

### Semantic

| Token | Light | Dark |
|-------|-------|------|
| `success` | `#34c759` | `#30d158` |
| `warning` | `#ff9500` | `#ff9f0a` |
| `error` | `#ff3b30` | `#ff453a |

---

## Typography

**Family:** Inter (variable, self-hosted via `@fontsource-variable/inter`)

| Scale | Size | Line height | Weight | Letter-spacing | Class |
|-------|------|-------------|--------|----------------|-------|
| Display | 3.5rem (56px) | 1.05 | 600 | -0.02em | `.text-display` |
| Title 1 | 3rem (48px) | 1.08 | 600 | -0.02em | `.text-title-1` |
| Title 2 | 2.5rem (40px) | 1.1 | 600 | -0.015em | `.text-title-2` |
| Title 3 | 1.75rem (28px) | 1.15 | 600 | -0.01em | `.text-title-3` |
| Title 4 | 1.5rem (24px) | 1.2 | 600 | — | `.text-title-4` |
| Body large | 1.3125rem (21px) | 1.5 | 400 | — | `.text-body-lg` |
| Body | 1.0625rem (17px) | 1.55 | 400 | — | `.text-body` |
| Body small | 0.875rem (14px) | 1.45 | 400 | — | `.text-body-sm` |
| Caption | 0.75rem (12px) | 1.35 | 500 | 0.02em | `.text-caption` |
| Eyebrow | 0.75rem (12px) | 1.35 | 600 | 0.08em | `.text-eyebrow` |

**Reading width:** `max-width: 42rem` (672px) — `.prose-width`  
**Page width:** `max-width: 72rem` (1152px) — `.container-page`

---

## Spacing scale

Base unit: **4px**

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |
| `space-24` | 96px |
| `space-32` | 128px |

**Section rhythm:** `py-16` mobile → `py-24` desktop between major blocks.

---

## Radius

| Token | Value | Use |
|-------|-------|-----|
| `radius-sm` | 8px | Inputs, small chips |
| `radius-md` | 12px | Secondary surfaces |
| `radius-lg` | 18px | Cards |
| `radius-xl` | 24px | Hero panels |
| `radius-full` | 9999px | Buttons (pill) |

---

## Shadows

| Token | Light | Dark |
|-------|-------|------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | `0 1px 2px rgba(0,0,0,0.3)` |
| `shadow-md` | `0 4px 24px rgba(0,0,0,0.06)` | `0 4px 24px rgba(0,0,0,0.4)` |
| `shadow-lg` | `0 12px 48px rgba(0,0,0,0.08)` | `0 12px 48px rgba(0,0,0,0.5)` |
| `shadow-header` | Appears on navbar scroll | Same, stronger blur |

---

## Motion

| Token | Value |
|-------|-------|
| `ease-standard` | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `duration-fast` | 150ms |
| `duration-normal` | 250ms |
| `duration-slow` | 400ms |

**Allowed:** opacity, transform scale(0.98→1), translateY(4px→0)  
**Avoid:** Bounce, parallax, infinite loops, large slides

---

## Components

### Buttons

- **Primary:** Pill, `cta` fill, white/near-black label, subtle hover darken/lighten
- **Secondary:** Pill, hairline border, elevated bg, hover bg shift
- **Ghost:** Text only, accent on hover

### Cards

- `radius-lg`, `shadow-md`, 1px `border-subtle`, padding `space-8` (32px)
- Interactive: `hover:shadow-lg`, `scale(1.01)` over `duration-normal`

### Navigation

- Sticky, 52px height, transparent at top
- On scroll: frosted glass (`backdrop-filter: blur(20px) saturate(180%)`), hairline border, `shadow-header`

### Forms

- Inputs: 48px height, `radius-sm`, focus ring uses `accent`
- Labels: `text-body-sm`, `text-secondary`

### Dark mode

- Class `html.dark` toggled via `localStorage` key `rft-theme`
- Inline boot script prevents flash
- `color-scheme: light | dark` on root

---

## Implementation

| File | Role |
|------|------|
| `src/styles/tokens.css` | CSS custom properties (light + dark) |
| `src/styles/global.css` | Tailwind theme + component classes |
| `src/config/design.ts` | Token constants for TS |
| `DESIGN.md` | This document |

---

## Quality bar

The experience should feel like Apple designed a financial education platform: quiet confidence, impeccable spacing, and typography that leads the eye — not a wall of form fields and ads.
