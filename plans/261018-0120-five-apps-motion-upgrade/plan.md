# Five apps + motion upgrade

Status: in progress · Branch: main · Deploy: GitHub Pages (kanglee079.github.io)

## Outcome
The portfolio reflects all five App Store apps with current, verified facts, and gains
richer motion that stays smooth on iOS Safari.

## Design brief (fixed)
- Register: Brand
- Scene: recruiters, clients and peers opening a shared link, mostly on a phone, sometimes on a laptop
- Direction: existing editorial index (Dennis Snellenberg / Olivier Larose), approved by the user
- Color: Restrained; paper #F3F2EC, ink #171A17, accent leaf #1F6B47 used sparingly
- Type: Hanken Grotesk 450 + Newsreader italic for emphasis
- Signature: a "Shipped" ledger where each release lands like a hanko stamp (Hiyoko's own motif)
- Dials: variance 7, motion 7, density 3

## Content (verified 2026-10-18)
- App Store: Hiyoko 2.0.3 (2026-10-17), Ganba 1.1.0 (2026-10-14), Peapod 1.0, Học Tiếng Tiều 1.2.0, SmartMeal AI 2.1
- Google Play: DoneDrop only
- Code size on release branches, generated/fixture files excluded: Hiyoko ~85k Swift, Ganba ~59k, shared package ~20k, Go ~13k, tests ~77k
- Not shipped, left out: Parlecho (support repo only)

## Motion work, each with a touch variant
1. Shared-element morph: list row icon and name → case-study header (`layoutId`)
2. Shipped ledger with stamp landing: pinned horizontal pan on desktop, scroll-snap row on touch
3. CSS `animation-timeline: view()` reveals under `@supports`, fallback to `whileInView`
4. View Transitions on language switch, instant fallback, skipped under reduced motion
5. Desktop-only WebGL distortion on the cursor preview, lazy-initialised, DOM fallback

## Acceptance
- Facts match store and code; three languages updated
- No console errors, no broken images, no horizontal overflow at 375 and 1440
- Scripted full-page scroll in the browser pane reports p95 frame time near 16.7ms
- Reduced-motion users get static, readable content
- Built, committed (conventional, no AI references), pushed, Pages build verified
