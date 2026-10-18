# Award-winning portfolios 2025–2026, and three redesign directions

**Recommendation:** build **Direction 1, "Stamp Rally"**.
- **Hero:** a physics pile made of the real app icons, the hanko and the chick.
- **Cost:** about 26 KB gz and little GPU work, so it should look as strong on an iPhone as on desktop.

**Why the current site doesn't feel "wow":**
- Its curved menu, magnetic buttons, name marquee and hover-preview list come from Olivier Larose's public tutorials.
- Those tutorials recreate Dennis Snellenberg's site, which won Site of the Day on 4 Apr 2022.
- Award juries and peers have seen this kit many times (k).

**Method:**
- Crawled 744 Awwwards Sites of the Day (SOTD), Oct 2024 to Oct 2026; 165 are tagged Portfolio.
- Also crawled Site of the Month (SOTM), Site of the Year (SOTY) and the CSSDA WOTY 2025 nominees.
- Probed 22 sites in headless Chrome, at 1440 px and with 390 px iPhone emulation, hooking WebGL and audio creation.
- For "click to enter" pages, used Awwwards element images and the authors' case studies.

## 1. Standout sites

| Site | Award, score | Signature idea | Stack (probed) | Mobile (emulated) |
|---|---|---|---|---|
| bruno-simon.com | SOTM Jan 2026, 8.11; CSSDA 2025 nominee | Drive a toy car through a 3D world that *is* the portfolio | three r183 WebGPU, Rapier, Web Audio | Kept; lower-quality preset with no blur or depth of field, smaller shadows |
| messenger.abeto.co | SOTY 2025 | Tiny multiplayer planet where you deliver mail | three r180, three-mesh-bvh, WebSockets | Kept, built to run "even on an old phone" |
| landonorris.com | SOTY 2025; SOTM Nov 2025, 8.18 | 3D helmet over a portrait; handwritten script over huge type | Webflow, three r174, GSAP, 8 Rive files | Kept |
| oryzo.ai | SOTM Apr 2026, 7.86 | A cork coaster shot as a cinematic 3D product film | three r178 (Lusion fork), Rive | Kept at **1.5× DPR** |
| ponpon-mania.com | SOTM Oct 2025, 7.64 | Black-and-white comic; colour appears only in the mascot's dreams | OGL, GSAP, Matter.js | Kept |
| leoparpeix.com | SOTD Sep 2026, 7.69 | Clay room with a smiling-flower mascot; "click to feed the bee" | three r153, Lenis, GLB/KTX2 | Kept, including the tap |
| pacomepertant.com | SOTD Jun 2026, 7.76 | "Enter with sound"; a 3D spiral of work that turns into a list | three r180, 15 OGG files | Kept, plus an audio bar |
| jesperlandberg.com | SOTD Sep 2026, 7.73 | Projects on a curved WebGL ribbon | three r185, GSAP 3.15 | Becomes 2-column WebGL cards |
| gilhuybrecht.com | SOTD Sep 2026, 7.66 | Archive toggles: Grid/Gallery and Normal/"Star Wars" | three r185, Lenis | **Drops WebGL** for a DOM list plus MP4s |
| huyml.co (HCMC) | SOTD Oct 2026, 7.67 | Giant "83" counter over a wall of work; tilted project cards | Framer, three r179, Rive | Kept, plus sound cues |
| haoqi.design | SOTD Aug 2026, 7.36 | Inflated glossy 3D "hello" among floating 3D stickers | three r184 | Kept |
| mr-pandas-psychologically-safe-portfolio.com | SOTD Mar 2026, 7.44 | Hand-drawn papercraft world on notebook paper | three r182 WebGPU | Kept |
| neuroproductions.be | SOTD Mar 2026, 7.32 | Game-style "choose your hero" screen as the intro | WebGPU | Kept |
| stabondar.com | SOTD Feb 2025, 7.62 | About text whose letters fall and stack | Matter.js, GSAP (from the case study) | (k) |
| cydstumpel.nl | SOTD Mar 2025, 7.22 | All motion in native CSS View Transitions and scroll-driven animations | No WebGL | Same CSS |

## 2. Ideas that fit an app developer

GPU cost is my estimate (k).

| Idea (sources) | How it's built | GPU | What winners do on mobile |
|---|---|---|---|
| Mascot scene as hero (Léo, Haoqi, Panda) | three, GLB/KTX2, an idle loop plus one tap reaction | Medium | Keep it, cap DPR at 1.5 |
| Physics objects or text (Stas, Ponpon) | Matter.js on a 2D canvas | Low | Tap to poke; drag only starting on a body |
| Opt-in sound (Pacôme, Bruno, Huy) | Short audio cues behind "enter with sound" | None | Kept; iOS needs a tap first |
| Work wall with view modes (Gil, Jesper) | Instanced quads bent in a vertex shader | Medium | Gil swaps to DOM |
| Native CSS motion (Cyd) | `animation-timeline: view()` plus View Transitions | Compositor-only | Scroll timelines need iOS 26; View Transitions need iOS 18 |
| One hero object (Oryzo, Lando's helmet) | One GLB, camera scrubbed by scroll | Medium–high | Kept at reduced DPR |

## 3. Trends

Figures are the share of all SOTD winners carrying each tag. Caveats:
- Submitters choose their own tags.
- 2026 H2 is partial (n=109).
- Tech tags only exist from mid-2025.

**Fresh:**
- **Storytelling:** 15% in 2024 H2 → 23–24% in 2026.
- **WebGL:** 19% in 2025 H2 → 41% in 2026 H2.
- **Three.js:** 16% → 32% over the same period.
- **Playable portfolios:** Bruno, Messenger, Kris.
- **Handmade materials** like paper, clay and stickers (k).
- **Opt-in sound.**
- **Deliberate mobile downgrades:** DPR caps, quality presets, DOM swaps.
- **WebGPU:** 4 of the 22 hand-picked sites. That is a sample, not a trend.

**Tired:**
- **Minimal:** 20% → 7%.
- **Illustration:** 13% → 4%.
- **Parallax:** 11% → 5%.
- **Transitions:** 34% → 17%.
- **Colorful:** 23% → 13%.
- **The Larose/Snellenberg kit (k).**

## 4. Directions, ranked

### 1. Stamp Rally (recommended)

**Concept:** a Japanese stamp-rally card. Each app is a station that gets stamped as you scroll past it.

**Palette:**
- `#FFD84D` chick yellow, used only for the hero and footer fields. One field colour, as Haoqi and Ponpon use, is not the declining multi-colour look.
- `#1A1714` ink, `#D2372B` seal, `#FFFDF6` card.
- `#3E8E4F` Peapod accent.

**Type:**
- Bricolage Grotesque 800 for display.
- Be Vietnam Pro, roman and italic, for text.
- Dela Gothic One for the kana stamps (ひよこ, がんば), loaded via `&text=`. I verified it returns only those glyphs.
- All three have the Vietnamese subset.

**Hero:** the name at about 18vw, with app icons, hanko and the chick falling onto it and piling up.

**Desktop:** grab, throw and shove the pieces.

**Mobile:** the same pile.
- Tap a piece to make it hop and re-stamp.
- A drag starts only on a piece.
- No tilt or vibration: iOS has no `vibrate`, and tilt needs `requestPermission()`.

### 2. Tiny Worlds (boldest departure)

**Concept:** one three.js archipelago with an island per app. Hiyoko gets a nest with hanko, Ganba an exam desk, Teochew a tea table, Peapod a pod, SmartMeal a plate.

**Palette:** `#0F1218` night, `#EADFCB` clay, `#FFC93C` chick, `#E4572E` seal, `#8CC152` pea.

**Type:** Unbounded 700, Onest and JetBrains Mono, all with the Vietnamese subset.

**Hero:** the camera drifts over the islands while the mascots idle.

**Desktop:** scroll flies from island to island, and the mascots react to hover.

**Mobile:**
- Snap one island at a time.
- DPR capped at 1.5, with no shadows or post-processing (as in Bruno's preset).
- A pre-rendered loop per island under reduced motion or on weak devices.

### 3. Every Screen (safest; keeps the current paper look)

**Concept:** one wall of every shipped screen.

**Palette:** the current `#F3F2EC`, `#171A17`, `#1F6B47` and `#B4412E`.

**Type:** Hanken Grotesk plus Newsreader italic. Both have the Vietnamese subset, including the italic.

**Hero:** a curved ribbon of screens (Jesper).

**Desktop:** Grid / Ribbon / By-app toggles, built by extending the existing WebGL shader.

**Mobile:** following Gil, scroll-snap DOM rows, a CSS scroll-driven scale, and a View Transition between modes.

### Trade-offs

| | 1 Stamp Rally | 2 Tiny Worlds | 3 Every Screen |
|---|---|---|---|
| Added to today's 170 KB gz | +26 KB gz | ≈ +190 KB gz three, plus models | ≈0 |
| GPU (k) | Low | High | Medium desktop, ≈0 phone |
| Assets needed | Already exist | Five Blender dioramas | Already exist |
| iPhone risk | Low (see Matter note) | High: memory, heat, Low Power Mode (k) | Low |
| Library risk | Matter.js last release 0.20.0 (Jun 2024); repo active Sep 2026 | three r153–r186 among the winners | None |
| Wow (k) | High, also on mobile | Highest | Medium |

### Sections: keep or change

| Section | 1 | 2 | 3 |
|---|---|---|---|
| Preloader, curved Menu, NameMarquee | Drop | Drop | Drop |
| Hero + Portrait | Physics hero; portrait moves to About | World hero; portrait moves to About | Wall hero; portrait moves to About |
| WorkIndex + cursor preview | Becomes the station list | Becomes island signposts | Becomes the "By app" mode |
| Reel / StackCards | Drop / Keep | Drop / Drop | Merged into the wall / Keep |
| Spotlight | Keep, as the slot for live app demos | Drop | Keep |
| Ledger | Becomes the stamp card (CSS `view()`, IntersectionObserver fallback) | Signposts | Keep |
| Intro, HowIBuild, Archive, About, Footer, CaseStudy morph, language View Transition | Keep | Keep | Keep |

### Verified constraints

- **Matter.js:** its `Mouse` module binds non-passive `wheel`, `touchstart` and `touchmove` listeners that call `preventDefault`. I checked this in the 0.20.0 source. Over the canvas, that kills page scroll and Lenis. Write your own pointer handling, and call `preventDefault` only when the touch hits a body.
- **Single-file build:** `vite-plugin-singlefile` sets `inlineDynamicImports: true`, so even an `import()` ships to every visitor. Direction 2 must load three from `/assets/`, or drop the single-file build.
- **Vietnamese diacritics:** at line-height 0.92, the stacked marks (ế, ề, ỷ) sit above the line box, so `overflow:hidden` line masks clip them. Pad the masks by at least 0.15em.
- **Chinese:** use the system PingFang font.

## Limitations

- **Other galleries weren't checked.** Godly now redirects to recent.design, a JS-only app. Lapa returned 403. FWA is JS-only. Orpetron and httpster have no portfolio filter.
- **The mobile results are emulation.** They come from Chrome, not real iPhones, and no frame rates were measured.

## Unresolved questions

1. Does Rive or vector art for the mascots exist? Rive's canvas-lite runtime is about 430 KB gz.
2. Is there budget for Blender work?
3. Is opt-in sound acceptable?
4. Must the build stay single-file?

**Sources:**
- Awwwards: [SOTD](https://www.awwwards.com/websites/sites_of_the_day/), [SOTM](https://www.awwwards.com/websites/?award=sites_of_the_month), [SOTY](https://www.awwwards.com/websites/?award=sites_of_the_year)
- Case studies: [Bruno](https://www.awwwards.com/brunos-portfolio-case-study.html), [Messenger](https://www.awwwards.com/messenger.html), [Ponpon](https://www.awwwards.com/ponpon-mania-a-comic-that-breathes-through-web-interaction.html), [Stas](https://www.awwwards.com/case-study-stas-bondar-25.html)
- [CSSDA WOTY 2025](https://www.cssdesignawards.com/woty2025/)
- [Larose tutorials](https://blog.olivierlarose.com/tutorials)
- Browser support: [MDN BCD](https://github.com/mdn/browser-compat-data), [caniuse](https://github.com/Fyrd/caniuse)
- [Google Fonts css2](https://fonts.googleapis.com/css2?family=Bricolage+Grotesque)
- [matter-js on npm](https://www.npmjs.com/package/matter-js)

Status: DONE_WITH_CONCERNS
Summary: 15 award sites were verified by crawl, probe and case study, and three directions are ranked with their trade-offs; Stamp Rally is recommended. FWA, Godly and Lapa couldn't be checked, and nothing was measured on a real iPhone.
