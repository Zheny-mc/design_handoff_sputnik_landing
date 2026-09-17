# Handoff: База отдыха «Спутник» — Landing Page

## Overview

Marketing landing page for **База отдыха Спутник** (Sputnik Recreation Center, sputniknn.ru), a forest-immersion vacation base ~60 km from Nizhny Novgorod. Design goal: convey silence, pine-forest atmosphere, and eco-comfort while driving direct online bookings.

The page is a single long-scroll landing with these primary conversion points:
1. **Hero booking widget** (dates + guests + "Найти номер")
2. **Cabin category cards** with per-card "Забронировать"
3. **Sticky nav CTA** ("Забронировать" button + phone)
4. **Location block CTA** ("Забронировать выезд")

## About the Design Files

The files in this bundle are **design references created in HTML** — a prototype showing the intended look, layout, motion, and behavior. They are **not production code to copy directly**.

The task is to **recreate this design in the target codebase's existing environment** (React / Next.js / Vue / Nuxt / Astro / native templating engine — whatever the sputniknn.ru stack is) using its established patterns, component library, routing, and CMS/booking integrations.

If no target framework has been chosen yet, **Next.js (App Router) + Tailwind** is a natural fit for this design — SSR-friendly, image-optimization built in, easy CMS wiring, and a small motion library (Framer Motion) covers the scroll reveals cleanly.

The HTML/CSS/JS in this bundle demonstrates final colors, typography, spacing, motion, and interaction — treat those as pixel-fidelity spec, not the delivery format.

## Fidelity

**High-fidelity (hifi).** Colors, typography, spacing, iconography, imagery treatment, animation timing, and interaction states are all final and should be reproduced pixel-perfectly. Placeholder items to swap for production content:

- Real photography (currently CC/PD stock — should be replaced with real photos of the base)
- Phone number `+7 (831) 200-00-00` — replace with real reception line
- Address, GPS coordinates — replace with the real values
- Review text and guest names — replace with real reviews (Yandex/2GIS/Google feed)
- Cabin categories, capacities, and pricing — pull from booking system
- Map: currently a stylized SVG matching the eco palette. In production, either keep this stylized SVG (fine as-is) or replace with a styled Yandex/Google map using a custom style that matches the palette below.

---

## Screens / Views

Single scrolling landing page with 8 sections + fixed nav.

### 0. Fixed Nav (`.nav`)

- **Purpose**: brand + section jumps + conversion CTA visible at all times.
- **Layout**: fixed to top, centered pill container `max-width: 1280px`, `padding: 20px 32px` outer, inner pill `padding: 14px 22px`, `border-radius: 999px`.
- **Background**: `rgba(250, 248, 243, 0.75)` with `backdrop-filter: blur(18px) saturate(140%)`; when `.scrolled` (scrollY > 20px), opacity rises to `0.92`.
- **Border**: `1px solid rgba(138, 154, 123, 0.15)`.
- **Shadow**: `0 10px 40px -20px rgba(30, 38, 32, 0.15)`.
- **Contents** (left → right):
  - **Brand mark**: 40×40 rounded-square (`border-radius: 12px`) `background: color-mix(in oklch, var(--sage-soft) 40%, transparent)`. SVG pine-tree glyph inside. Next to it: `Спутник` in Cormorant Garamond 22px/500, and `база отдыха` in Inter 10px uppercase, letter-spacing 0.16em, color `--moss`.
  - **Section links** (centered, flex row, gap 30px): О базе, Проживание, Услуги, Галерея, Отзывы, Контакты. Inter 14px, color `color-mix(in oklch, var(--pine) 80%, transparent)`. Hover: solid `--pine` + a 1px underline that grows left→right in 0.4s ease.
  - **Right cluster**: phone `+7 (831) 200-00-00` (Inter 14px/500) + `.btn-primary.btn-sm` "Забронировать".
- **Responsive**: hide section links below 1080px; hide phone + brand subtitle below 640px (recommend a hamburger drawer at that breakpoint).

### 1. Hero (`.hero`)

- **Purpose**: emotional hook + primary booking capture.
- **Layout**: full-viewport (`min-height: 100vh`), padding `140px 32px 60px`, content vertically centered, max-width `1280px`.
- **Background**: full-bleed forest photo (`assets/hero-forest.jpg`) with:
  - **Parallax**: on scroll, `transform: translateY(scrollY * 0.28) scale(1.02 + scrollY * 0.00015)`.
  - **Scrim**: `linear-gradient(180deg, rgba(30, 38, 32, 0.4) 0%, rgba(30, 38, 32, 0.15) 40%, rgba(30, 38, 32, 0.55) 100%)` **plus** `linear-gradient(90deg, rgba(30, 38, 32, 0.4) 0%, transparent 60%)`.
  - **Vignette**: `radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(30, 38, 32, 0.35) 100%)`.
  - Base image filter: `saturate(0.9) brightness(0.95)`.
- **Meta pill** (top): "· Нижегородская область · 60 км от города" inside a `padding: 8px 16px` pill, `background: rgba(30, 38, 32, 0.35) + blur(10px)`, `border: 1px solid rgba(244, 239, 228, 0.15)`. Contains an 8px pulsing sage-soft dot (`--sage-soft #b6c0a4`, `animation: pulse 2.2s`).
- **Headline**: Cormorant Garamond 400, `clamp(2.4rem, 6vw, 5.2rem)`, line-height 1.02, letter-spacing -0.02em, color `--cream`. Line 2 is `<em>` italic in `--sage-soft`. Text: `Отдых и перезагрузка\nв окружении соснового леса`.
- **Subhead**: Inter 400, `clamp(16px, 1.4vw, 19px)`, `rgba(244, 239, 228, 0.85)`, `max-width: 42ch`.
- **Booking widget** (`.booking` — see below).
- **Hero badges** (bottom row, below widget): three items separated by 1px × 32px dividers. Each: Cormorant 26px/500 numeric + Inter 12px caption. Values: `4.9 · 340 отзывов`, `15 лет принимаем гостей`, `24 га соснового леса`.
- **Scroll indicator**: 26×42 rounded rectangle at bottom center, 3×8 white dot animating down (`@keyframes scrollDot`, 2s infinite).
- **Entry animations**: staggered `fadeUp` — meta at 0s, title 0.1s, sub 0.2s, booking 0.3s, badges 0.5s. Duration 0.9–1s, easing `cubic-bezier(.22,.61,.36,1)`.

### 1a. Booking Widget (`.booking`)

- **Layout**: horizontal pill with 4 columns: `grid-template-columns: 1fr 1fr 1.2fr auto` at ≥780px; on mobile collapses to 2×2 + full-width button.
- **Container**: `padding: 10px`, `border-radius: 20px`, `background: rgba(250, 248, 243, 0.96) + blur(16px)`, `border: 1px solid rgba(244, 239, 228, 0.3)`, `box-shadow: 0 20px 60px -20px rgba(30, 38, 32, 0.4)`.
- **Fields**: `padding: 12px 20px`, hover background `rgba(232, 223, 201, 0.5)`, `border-radius: 14px`. 1px `rgba(45,61,47,0.1)` divider between fields.
- **Field label**: Inter 11px, uppercase, letter-spacing 0.14em, color `--moss`.
- **Field value**: Inter 15px/500, color `--pine`.
- **Fields**: `Заезд` (date), `Выезд` (date), `Гости` (select — options: 2 взрослых / 2+1 / 2+2 / 3 взрослых / 4 взрослых / Компания 5+).
- **Submit button**: `.btn-primary` with arrow icon after label; text "Найти номер".
- **Default dates**: today + 3 days (check-in), today + 5 days (check-out) — set on load.
- **Submit behavior** (spec): show a success banner `.booking-msg` below with sage-checkmark + "Спасибо! Мы подобрали для вас 3 свободных варианта — прокрутите ниже." Real implementation: POST to booking search endpoint, then scroll to `#stay` with results filtered.

### 2. About / Atmosphere (`.about`, `#about`)

- **Purpose**: emotional value proposition + brand values.
- **Layout**: `grid-template-columns: 1.1fr 1fr`, gap 100px, vertically centered. Collapses to single column below 960px.
- **Left column**:
  - Eyebrow: `Атмосфера` (Inter 12px, uppercase, letter-spacing 0.16em, color `--moss`, preceded by 22px×1px sage rule).
  - H2: `Место, где время\nзамедляет ход` (Cormorant, clamp 2rem–3.2rem, 500).
  - Lead paragraph (17px/1.7, `max-width: 52ch`, color `color-mix(in oklch, var(--pine) 78%, transparent)`).
  - **Values grid** (2 × 2): four items, each = 44×44 sage-tinted icon square (`border-radius: 12px`, `background: color-mix(in oklch, var(--sage-soft) 30%, transparent)`, stroke 1.4 icon) + heading (Inter 15px/600) + description (14px/1.55, `color-mix(in oklch, var(--pine) 65%, transparent)`).
  - Values: Чистый лесной воздух / Приватность и покой / Комфорт как дома / Для семей и компаний.
- **Right column** (`.about-gallery`): 3-image collage.
  - `grid-template-columns: 1fr 1fr`, rows `240px 200px`, gap 20px.
  - Fig 1 (`.tall`): full-height left (`grid-row: 1 / 3`) — forest atmosphere.
  - Fig 2: top-right — pine macro.
  - Fig 3 (`.wide`): bottom-right — cabin evening.
  - `border-radius: 20px`, `overflow: hidden`, `box-shadow: var(--shadow-md)`. Hover: image `transform: scale(1.06)` over 1s.

### 3. Stay / Accommodation (`.stay`, `#stay`)

- **Purpose**: category picker + price anchor.
- **Background**: `linear-gradient(180deg, --fog 0%, --cream 100%)`.
- **Section head**: 2-column grid — eyebrow "Проживание" + H2 "Три формата тишины" on the left; supporting paragraph (17px/1.65) right-aligned on the right.
- **Card grid**: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap 28px. Four cards.
- **Card** (`.stay-card`):
  - `background: --fog`, `border-radius: 24px`, `border: 1px solid rgba(138, 154, 123, 0.12)`, `box-shadow: var(--shadow-sm)`.
  - Hover: `translateY(-4px)` + `box-shadow: var(--shadow-lg)`, transition 0.5s.
  - **Media**: aspect-ratio 4/3, image `transform: scale(1.08)` on card hover (1.4s ease).
    - Optional pill top-left "Хит сезона" (Inter 11px uppercase, `--pine` bg, `--cream` text).
    - Pill bottom-right "1 из N" (`rgba(30, 38, 32, 0.55) + blur(8px)`).
  - **Body** (`padding: 24px 24px 22px`, flex column):
    - Title (Cormorant 26px/500).
    - Capacity (Inter 13px, `color-mix(in oklch, var(--pine) 60%, transparent)`).
    - Amenity chips (`padding: 5px 11px`, `background: color-mix(in oklch, var(--sand) 60%, transparent)`, `--moss` text, Inter 12px/500, `border-radius: 6px`).
    - Dashed 1px separator (`rgba(138, 154, 123, 0.35)`).
    - Footer row: price on left (Inter "от" 12px + Cormorant 24px/500 value + Inter "/ сутки" 12px) + `.btn-outline.btn-sm "Забронировать"` on right.
- **Four cards** (photo, title, capacity, amenities, price):
  1. `cabin-dome.jpg` — **Дом-сфера «Купол»**, до 2 гостей · 34 м², [Панорамный купол на лес, Тёплый пол, Мангальная зона, Wi-Fi], от **8 900 ₽/сутки**. Badge: "Хит сезона". Count: "1 из 6".
  2. `cabin-cottage.jpg` — **Коттедж «Хвоя»**, до 6 гостей · 78 м² · 2 спальни, [Собственная баня, Терраса с видом, Полная кухня, Камин], от **14 500 ₽**. Count: "1 из 4".
  3. `cabin-aframe.jpg` — **A-Frame «Клин»**, до 4 гостей · 48 м², [Треугольные окна в пол, Второй свет, Своя веранда, Wi-Fi], от **11 200 ₽**. Count: "1 из 8".
  4. `room-interior.jpg` — **Стандартный номер**, до 2 гостей · 22 м², [Вид на лес, Завтрак включён, Тихий этаж, Wi-Fi], от **4 200 ₽**. Count: "1 из 12".

### 4. Infrastructure / Activities (`.infra`, `#infra`)

- **Background**: `--cream`.
- **Bento grid**: `grid-template-columns: 1.6fr 1fr 1fr`, rows `320px 320px`, gap 20px. The first card spans both rows (hero card).
- Below 1000px: 2 columns; hero card spans full width, 400px min-height. Below 640px: single column.
- **Cards** (`.infra-card`): full-bleed image + linear scrim `rgba(30, 38, 32, 0.15) → 0.75`, radius 24px. Icon tile 42×42 (`rgba(244, 239, 228, 0.15) + blur(6px)`, `border: 1px solid rgba(244, 239, 228, 0.3)`). Heading Cormorant 24px/500 (hero card 34px), cream. Body 14px/1.5. Link `.infra-link` sage-soft with animated bottom border.
- **Cards**:
  - Hero: `banya.jpg` — **Русская баня на дровах** — "Парная, купель, чан под открытым небом. Аренда от 2 часов." CTA: "Забронировать баню →".
  - `mangal.jpg` — **Мангальные зоны и беседки** — "10 беседок с мангалами, дровами и посудой."
  - `trail-family.jpg` — **Эко-тропы по лесу** — "3 маршрута: 2, 5 и 12 км с указателями и точками отдыха." CTA: "Смотреть карту →".
  - `trail-kids.jpg` — **Детские и спортивные площадки** — "Игровой городок, мини-футбол, волейбол, настольный теннис."
  - `aerial-cabins.jpg` — **Прокат инвентаря** — "Велосипеды, самокаты, скандинавские палки, зимой — лыжи."
- Hover: card `translateY(-3px)` + `box-shadow: var(--shadow-lg)`, image `scale(1.08)`.

### 5. Gallery (`.gallery`, `#gallery`)

- **Layout**: 3-column masonry via `grid-template-columns: 1fr 1fr 1fr`, gap 20px. Column 2 has `padding-top: 40px`, column 3 has `padding-top: 20px` — creates the staggered masonry rhythm.
- **Figures**: `border-radius: 20px`, `box-shadow: var(--shadow-sm)`. Varied aspect ratios (4/5, 1/1, 5/4, 3/4). Hover: image `scale(1.06)` over 1.2s.
- Below 720px: 2 columns, hide column 3.
- **Images used**: cabin-twilight, pine-macro-2, room-bedroom, aerial-cabins, cabin-dome-2, mangal, forest-atmosphere, trail-family, cabin-evening.

### 6. Reviews (`.reviews`, `#reviews`)

- **Background**: `--cream`.
- **Section head** has a rating cluster right-aligned: Cormorant 52px/500 "4.9" + amber stars `★★★★★` (18px, letter-spacing 0.14em) + "На основе 340+ отзывов" (13px).
- **Grid**: `repeat(auto-fit, minmax(280px, 1fr))`, gap 24px.
- **Card** (`.review`): `background: --fog`, `padding: 32px 30px`, `border-radius: 20px`, `border: 1px solid rgba(138, 154, 123, 0.15)`, flex column, gap 20px. Hover: `translateY(-3px)` + `box-shadow: var(--shadow-md)`.
- **Contents**: amber stars line + Cormorant 20px italic quote (text-wrap pretty) + 1px sage separator + avatar (42×42 gradient circle, initials, cream text) + name (Inter 14px/600) + meta (12px, muted).
- **3 reviews**: Анна М. (Дом-сфера) / Дмитрий К. (Коттедж «Хвоя») / Елена С. (A-Frame). See HTML for exact text.

### 7. Location (`.location`, `#location`)

- **Layout**: `grid-template-columns: 1.4fr 1fr`, gap 40px. Collapses below 900px.
- **Left — stylized SVG map** (`.map`, min-height 440px):
  - Background gradient `#e8ebd8 → #d5dcc0` + repeating sage dot pattern (`fill="#8a9a7b" opacity=".25"`).
  - Curved river path in `#a8c1c5` (width 18) with `#c5d8db` inner (width 10).
  - Three forest patches (sage circles, opacity 0.55).
  - Dashed amber route (`stroke="#c9a878"`, `stroke-dasharray: 6 5`) from lower-left (Nizhny Novgorod) to upper-right (Sputnik marker).
  - **NN marker**: 8px pine dot + 3px cream inner + label "Нижний Новгород" (Inter 12px/500).
  - **Sputnik marker**: layered — 18px moss halo (opacity 0.18) + 10px moss + 4px cream. Label: Cormorant italic 18px "Спутник" + Inter 11px "база отдыха".
  - Compass rose top-right (opacity 0.7).
  - **Legend pill** absolute bottom-left: dashed amber rule + "маршрут ~60 км, ~1 час".
  - **In production**: keep this stylized SVG, OR replace with a Yandex.Maps/Google Maps embed styled with the palette below. See "Map style" under Design Tokens.
- **Right — pine info card** (`.location-info`):
  - `background: --pine`, `color: --cream`, `padding: 40px 36px`, `border-radius: 24px`, flex column, gap 26px.
  - Blocks: Адрес / GPS-координаты (mono) / Как ехать / Ресепшн 24/7.
  - Phone displayed as Cormorant 22px/500. Coordinates: `56.6234° N · 43.4712° E`.
  - CTA button: cream background, pine text, "Забронировать выезд".

### 8. Footer (`.footer`)

- **Background**: `--bark #1e2620`, text `rgba(244, 239, 228, 0.7)`.
- **Grid**: 4 columns `1.4fr 1fr 1fr 1.2fr`, gap 48px. Collapses to 2 columns below 900px, 1 column below 560px.
- **Col 1 — brand block**: pine-tree glyph on dark, brand name + subtitle, tagline (max-width 32ch, 14px/1.6), 4 social icons (38×38 rounded squares, hover: moss bg + `translateY(-2px)`).
- **Col 2 — Разделы**: section anchors.
- **Col 3 — Контакты**: phone / email / hours / region.
- **Col 4 — Бронирование онлайн**: note + `.btn-primary.btn-sm`.
- **Bottom bar**: 1px top border `rgba(244, 239, 228, 0.08)`, copyright left, policy links right, 12px.

---

## Interactions & Behavior

### Nav
- Adds `.scrolled` class when `window.scrollY > 20`, transitioning background opacity `0.75 → 0.92` over 0.5s.
- All anchor links (`a[href^="#"]`) get JS smooth scroll with a **90px offset** to account for the fixed nav pill.

### Hero parallax
- On scroll, hero image gets `transform: translateY(scrollY * 0.28)px scale(1.02 + scrollY * 0.00015)`. Runs only while `scrollY < window.innerHeight * 1.5` to avoid off-screen work.
- Attach on `scroll` with `{ passive: true }`.

### Reveal-on-scroll
- Every `.reveal` element starts at `opacity: 0`, `translateY(24px)`.
- `IntersectionObserver` with `threshold: 0.12`, `rootMargin: '0px 0px -60px 0px'` adds `.in` when visible → transitions to `opacity: 1`, `translateY(0)` over 1s.
- Stagger via CSS var: `style="--d: .05s | .1s | .15s | .2s | .25s | .3s | .35s"`.
- Observer unobserves each element after first reveal (one-shot).

### Card hover
- All image cards (stay, infra, gallery, about) use the same recipe:
  - Card: `translateY(-3px|-4px)` + shadow upgrade, 0.5s.
  - Inner image: `scale(1.06 | 1.08)`, 1–1.4s ease.

### Booking submit
- Prevents default and reveals `.booking-msg` (`display: inline-flex`) with fadeUp 0.4s.
- **Production**: POST to booking API, then either navigate to results page or scroll to `#stay` with filtered availability + occupancy dates in the URL query.

### Default dates
- On mount, check-in = today + 3d, check-out = today + 5d. Format `YYYY-MM-DD` for `<input type="date">`.

### Motion tokens
- Master easing: `cubic-bezier(.22, .61, .36, 1)` (used everywhere as `--ease`).
- Durations: `0.3s` (color/small), `0.5s` (card lift), `0.9–1s` (reveal + entry), `1–1.4s` (image scale).
- Pulse dot (hero meta): `2.2s ease-out infinite`, box-shadow ripple `0 → 12px` sage-soft.

### Accessibility notes for the developer
- Provide `prefers-reduced-motion` media queries that disable the hero parallax and reveal transitions.
- All decorative SVGs have `aria-hidden="true"`.
- Icon-only social links have `aria-label`.
- Hit targets: nav pill CTAs are ≥40px tall; card CTAs `padding: 11px 20px` (≥40px). Keep.
- Contrast: cream on pine and cream on bark both pass AA. Verify chip text (`--moss` on `--sand`) — currently borderline; if failing AA, darken the chip text to `--pine`.

### State management (recommended)
- **Booking form**: `{ checkIn: string, checkOut: string, guests: string }`. On submit → route to `/search?ci=&co=&guests=`.
- **Availability chips** on stay cards (`1 из N`) should be live from inventory API — treat "N" as remaining count for the selected dates when the user has filled the widget; fall back to total inventory otherwise.
- **Reviews**: fetch from Yandex/2GIS aggregator or CMS; keep the 3-card layout even with fewer/more (show latest 3).
- **Gallery**: production should lazy-load with `loading="lazy"` on all `<img>` (all except hero).

### Responsive behavior
- Breakpoints used: 1080px (hide nav links → hamburger recommended), 1000px (infra grid to 2 cols), 960px (about to 1 col), 900px (section-head to stacked, footer to 2 cols, location to stacked), 780px (hero booking widget wraps), 720px (gallery to 2 cols, section padding shrinks), 640px (infra to 1 col, nav phone hidden), 560px (footer to 1 col).
- The design is fluid inside those breakpoints — clamp() is used on hero title and lead sizes.

---

## Design Tokens

### Colors (all defined as CSS custom properties in `styles.css`)

| Token           | Value      | Use                                    |
|-----------------|------------|----------------------------------------|
| `--bark`        | `#1e2620`  | Footer background                      |
| `--pine`        | `#2d3d2f`  | Primary text, primary button, location card |
| `--moss`        | `#4a5d3f`  | Eyebrows, accents, chip text           |
| `--sage`        | `#8a9a7b`  | Rules, subtle borders                  |
| `--sage-soft`   | `#b6c0a4`  | Hero italic accent, pulse dot          |
| `--cream`       | `#f4efe4`  | Primary light text, button-on-dark bg  |
| `--sand`        | `#e8dfc9`  | Amenity chip bg                        |
| `--fog`         | `#faf8f3`  | Page/card background                   |
| `--amber`       | `#c9a878`  | Star rating, map route                 |
| `--amber-dk`    | `#8a6a3b`  | (reserved)                             |

Body text at 78% opacity of `--pine`: use `color-mix(in oklch, var(--pine) 78%, transparent)`. Muted at 65%, meta at 55–60%.

### Typography

| Role              | Font                     | Size (px / clamp)                    | Weight | Line-height | Letter-spacing |
|-------------------|--------------------------|--------------------------------------|--------|-------------|----------------|
| Hero H1           | Cormorant Garamond       | `clamp(2.4rem, 6vw, 5.2rem)`         | 400    | 1.02        | -0.02em        |
| Section H2        | Cormorant Garamond       | `clamp(2rem, 3.5vw, 3.2rem)`         | 500    | 1.05        | -0.01em        |
| Card title (stay) | Cormorant Garamond       | 26                                   | 500    | 1.1         | —              |
| Infra hero title  | Cormorant Garamond       | 34                                   | 500    | 1.1         | —              |
| Review quote      | Cormorant Garamond italic| 20                                   | 400    | 1.4         | —              |
| Price value       | Cormorant Garamond       | 24                                   | 500    | —           | —              |
| Rating "4.9"      | Cormorant Garamond       | 52                                   | 500    | 1           | —              |
| Brand name        | Cormorant Garamond       | 22                                   | 500    | 1           | 0.01em         |
| Lead paragraph    | Inter                    | 17                                   | 400    | 1.7         | —              |
| Section sub       | Inter                    | 17                                   | 400    | 1.65        | —              |
| Body / card body  | Inter                    | 14–16                                | 400    | 1.5–1.6     | —              |
| Nav link          | Inter                    | 14                                   | 400    | —           | —              |
| Button            | Inter                    | 14–15                                | 500    | —           | 0.01em         |
| Eyebrow           | Inter                    | 12                                   | 500    | —           | 0.16em (upper) |
| Field label       | Inter                    | 11                                   | 500    | —           | 0.14em (upper) |
| Chip              | Inter                    | 12                                   | 500    | —           | —              |
| Mono (coords)     | JetBrains Mono           | 15                                   | 400    | —           | 0.02em         |

Font imports (Google Fonts):
```
Cormorant+Garamond:wght@400;500;600
Inter:wght@300;400;500;600
```

### Spacing scale

- Page horizontal: `32px` (desktop) / `20px` (≤720px), container `max-width: 1280px`.
- Section vertical: `120px` (desktop) / `72px` (≤720px).
- Card padding: `24px 24px 22px` (stay), `28–36px` (infra), `32px 30px` (reviews), `40px 36px` (location card).
- Grid gaps: 20px (galleries, bento), 24px (reviews), 28px (stay cards), 32–48px (multi-col text sections), 100px (about main split).

### Border radius

- 999px — buttons, pills, meta chips, nav.
- 24px — large cards (stay, infra, map, location-info).
- 20px — figures, review cards, gallery items, booking pill.
- 14px — booking field hover, inner tiles.
- 12px — brand mark tile, value icons, infra icon, socials.
- 10px — social hover tile.
- 6px — amenity chips.

### Shadows

```css
--shadow-sm: 0 2px 12px -2px rgba(30, 38, 32, 0.08);
--shadow-md: 0 12px 40px -12px rgba(30, 38, 32, 0.18);
--shadow-lg: 0 30px 80px -20px rgba(30, 38, 32, 0.25);
```

Also inline:
- Nav: `0 10px 40px -20px rgba(30, 38, 32, 0.15)` → `0 12px 40px -18px rgba(30, 38, 32, 0.2)` when scrolled.
- Primary button: `0 4px 20px -6px rgba(45, 61, 47, 0.4)` → `0 8px 28px -8px rgba(45, 61, 47, 0.5)` on hover.
- Booking widget: `0 20px 60px -20px rgba(30, 38, 32, 0.4)`.

### Map style (if replacing SVG with real map SDK)

Aim for the same palette. For Yandex/Google/Mapbox custom styles, target:
- Land: `#e8ebd8 → #d5dcc0` gradient (or flat `#dfe5cf`).
- Water: `#a8c1c5` fill with `#c5d8db` core (thin cyan-sage).
- Roads: hidden or muted `#c9a878` (amber).
- Labels: `#2d3d2f` on transparent.
- Forest/park polygons: `#7b8f6b` at 40–55% opacity.
- Sputnik pin: custom SVG matching the moss/cream marker in the SVG.

---

## Assets

All images in `assets/` are **CC0 / Public Domain** stock (`sspark.genspark.ai` proxy URLs originally from Pickpik, PxHere, Pixnio, Rawpixel, StockCake, Freerange, Dreamstime CC listings). **Replace all of them with real photography of the base** for production. Recommended shot list:

| Slot                              | Current file                | Needed real photo                                    |
|-----------------------------------|-----------------------------|------------------------------------------------------|
| Hero background                   | `hero-forest.jpg`           | Wide, atmospheric pine forest at golden hour on-site |
| About tall                        | `forest-atmosphere.jpg`     | Portrait of the forest / trail on-site               |
| About top-right                   | `pine-macro-2.jpg`          | Close-up detail: pine needles, moss, or cone         |
| About bottom-right                | `cabin-evening.jpg`         | Evening exterior of a cabin, warm lit windows        |
| Stay — Дом-сфера                  | `cabin-dome.jpg`            | Actual dome exterior                                 |
| Stay — Коттедж «Хвоя»             | `cabin-cottage.jpg`         | Actual cottage exterior                              |
| Stay — A-Frame                    | `cabin-aframe.jpg`          | Actual A-frame exterior                              |
| Stay — Стандартный номер          | `room-interior.jpg`         | Interior of a real standard room                     |
| Infra — Баня                      | `banya.jpg`                 | Interior of the banya complex                        |
| Infra — Мангал                    | `mangal.jpg`                | On-site gazebo with mangal at dusk                   |
| Infra — Эко-тропа                 | `trail-family.jpg`          | People on the wooden trail                           |
| Infra — Площадки                  | `trail-kids.jpg`            | Kids play / sports area                              |
| Infra — Прокат                    | `aerial-cabins.jpg`         | Rental gear or aerial of grounds                     |
| Gallery ×9                        | see HTML                    | Mix of nature, cabins, interiors, evenings           |

All images are JPEG. Recommend serving via `next/image` (or equivalent) with `sizes` hints. Total imagery weight in this bundle: ~7 MB uncompressed — production should be ≤2 MB using AVIF/WebP.

### Icons
All icons in the design are **inline SVGs** in the HTML (stroke-based, 1.4–1.5 stroke weight, `stroke-linecap="round"`, `stroke-linejoin="round"`). No icon library dependency. If the target codebase uses `lucide-react` or similar, the closest matches are:
- Value icons: `Leaf`, `Eye`, `Home`, `Users`
- Infra icons: custom (steam, flame, trail-arrow, playground, bike) — recommend keeping the inline SVGs to preserve the hand-drawn feel.
- Social: Telegram / VK / WhatsApp / Instagram — inline SVGs in HTML.

### Fonts
- **Cormorant Garamond** — Google Fonts, weights 400/500/600.
- **Inter** — Google Fonts, weights 300/400/500/600.
- **JetBrains Mono** — used only for GPS coordinates; falls back to `ui-monospace`. Load optionally.

---

## Files

Everything you need is bundled in this folder:

- `README.md` — this document
- `Landing Page.html` — full HTML markup (single-file structure)
- `styles.css` — all styles, tokens, animations, breakpoints
- `scripts.js` — nav scroll state, hero parallax, IntersectionObserver reveals, default booking dates, smooth-scroll offset

**Not bundled** (list-only, to keep the handoff lightweight): the `assets/*.jpg` images. See the Assets table above for the shot list — swap in real photography.

## Recommendations for Genspark Code / production port

1. **Framework**: Next.js 14 (App Router) + Tailwind CSS.
2. **Component decomposition**:
   - `<Nav />`, `<Hero />` (contains `<BookingWidget />`), `<About />`, `<StayGrid />` (map over `<StayCard />`), `<InfraBento />` (map over `<InfraCard />`), `<Gallery />`, `<Reviews />` (map over `<ReviewCard />`), `<Location />` (contains `<MapSVG />` + `<LocationInfo />`), `<Footer />`.
3. **Data sources**: cabin list, reviews, availability all belong in a CMS (Strapi / Sanity) or the existing booking system API. Reviews can pull from Yandex Maps API.
4. **Motion**: Framer Motion `whileInView` replaces the custom IntersectionObserver reveals; keep the same easing curve.
5. **Images**: `next/image` with priority on hero, lazy on everything else.
6. **i18n**: currently RU-only; if EN is needed, wrap all copy in `next-intl` or similar. All copy is captured in this bundle's HTML.
7. **Booking integration**: the `#book` form should POST to the current sputniknn.ru booking engine (or Bnovo / TravelLine / whatever they use) and either open its results page or embed results inline. The visual submit-success banner is a placeholder.
