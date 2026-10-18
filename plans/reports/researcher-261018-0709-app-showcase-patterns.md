# App screen showcase patterns, 2025–2026

**Bottom line:** don't add three.js. Three additions earn their place:

1. Live HTML mini-demos of each app's signature interaction, inside the existing Spotlight phone.
2. One CSS-3D phone tilted by a native scroll timeline.
3. Short screen-recording loops in the phone frame, with today's screenshot as the poster.

None needs a new dependency, and all work with native touch scroll.

**Why not WebGL.** I measured three 0.186.1:

- `three.module.min.js` is 90 KB gz, and it imports `three.core.min.js`, which is another 104 KB gz. That is about 194 KB in total; bundlephobia reports 185 KB.
- R3F 9.8.2 adds 58 KB gz.
- `vite-plugin-singlefile` sets `codeSplitting: false`, so even a desktop-only `import()` ships to every iPhone.
- Today `index.html` is 170 KB gz, so this would more than double it.

Apple ships glTF to phones (WebGL contexts at 390 px); a portfolio can't afford that.

## 1. Patterns

| # | Pattern and where it was verified | Build | iPhone and mobile-safe variant |
|---|---|---|---|
| 1 | **Live HTML UI instead of screenshots.** Linear's board and Slack thread are server-rendered HTML. Cosmos's Show/Blur/Hide control is real buttons. | DOM, React state, Motion springs | Cheapest option; crisp at 3x. Use tap, not hover. |
| 2 | **Phone beside feature copy, screen changes per step.** Structured. **Already shipped** as Spotlight. | Sticky plus an opacity crossfade | Light: one composited fade (k). |
| 3 | **CSS-3D tilt scrubbed by scroll.** Codrops 3DStackMotion (2024), 3DCarousel (2025), RotatingOnScrollAnimations (June 2026) | `perspective: 900–1400px` wrapper; GSAP ScrollTrigger `scrub` on rotationX/Y/Z; Lenis | Transform-only (k). Same keyframes through `animation-timeline`, no Lenis. |
| 4 | **Scroll-scrubbed video.** Apple iPhone 18 Pro and Air (`VideoScrub`; `large.mp4` on desktop, `small_2x.mp4` at 390 px, plus `*_startframe`/`*_endframe` JPGs) | `<video>` `currentTime` from scroll; every frame a keyframe (scrolly-video) | Breaks in iOS Low Power Mode (scrolly-video). Show the end frame instead. |
| 5 | **Screen recordings in a frame.** Family (1170×2532 mp4s), Opal (1180×2556), Flighty (720×1280), Bear (webm) | `<video muted playsinline autoplay loop poster>` | Muted inline video autoplays on iOS, and autoplay pauses offscreen (WebKit). |
| 6 | **Held phone with orbiting UI cards.** Flighty hero (tabs switch the screen) | Framer, layered images | Each card is a layer; keep 2–3, translateY only (k). |
| 7 | **Pre-rendered tilted device art.** Raycast iOS (`hero-screen` PNG plus an icon layer), Flighty bento cards | Rendered once, shipped as an image | Cheapest, but static. |
| 8 | **Floating tilted tiles.** Cosmos hero (45 `perspective-normal` spans plus a 2D canvas) | CSS perspective, drift keyframes | Image decode and layer memory grow per tile (k). Use fewer on touch. |
| 9 | **Zoom into the detail view.** **Already shipped**: on touch, the case study grows from the tapped card's rect through `clip-path`; on desktop, `layoutId` moves the icon. | Motion | Clip-path may repaint every frame (k). |
| 10 | **Staggered screen collage.** Flighty Passport, Codrops 3DStackMotion | Rotate plus translate | Cheap if transform-only (k). StackCards covers touch. |
| 11 | **Infinite draggable wall.** Codrops Infinite Canvas, Edoardo Lunardi, Dec 2025 (R3F 9.4, three 0.182, chunk culling) | WebGL textures | Captures vertical touch scroll. The existing Reel is the mobile version. |
| 12 | **3D scene embed.** Apple (glTF); !Boring, which andy.works now redirects to (Spline viewer 0.9.371, plus an mp4 of the scene) | three/R3F, or the Spline runtime | Heavy (k). Ship a looping video instead. |
| 13 | **Vector state machines.** Flighty loads four `.riv` files and Lottie. | Rive or Lottie runtime | Fits the mascots, but the runtime would be inlined (k). Use SVG sprites. |
| 14 | **Dynamic Island morph, UI sound.** Not seen on any fetched site (k). | Pill animating size and radius; Web Audio after a tap | The silent switch has muted Web Audio since iOS 16.3, which WebKit treats as expected (bug 251532). Make sound opt-in; don't force `audioSession.type = 'playback'`. |

Restraint counts too: Things, Bear, Tot, Halide and lux.camera use no WebGL or canvas.

## 2. The three picks for these apps

**1. Live mini-demos in the Spotlight phone (highest value).** Steps 1 to n−1 keep their screenshots. The last step becomes a tappable HTML version of the app's signature interaction:

- **Hiyoko:** tap the card 猫 and it flips to ねこ (`rotateY(180deg)` with `backface-visibility: hidden`). Tapping "Good" drops a hanko stamp (scale 1.8→1 on a spring, reusing the Ledger's `Stamp`), and the chick turns happy.
- **Peapod:** each tap springs the SVG pea's scale 1→1.12→1. After N taps, a leaf draws in (`pathLength`).
- **Ganba:** a "minutes per day" slider drives an SVG arc gauge (`stroke-dasharray`) through `useSpring`.
- **Học Tiếng Tiều:** tap a syllable and its tone contour draws on a pitch staff.
- **SmartMeal:** tapped ingredient chips fly into a bowl (layout animation), and then the dish card appears.

It proves he builds interfaces, which a screenshot can't, as on Linear and Cosmos.

Rules: taps only on touch, `touch-action: manipulation`, transform and opacity only, and instant state changes under reduced motion.

Peapod and SmartMeal are not `spot: true` yet.

**2. One CSS-3D phone tilted by scroll**, for example opening the Hiyoko Spotlight. It gives Apple-style depth for about 1 KB of CSS, the technique Codrops' 2024–2026 demos use.

**3. Screen-recording loops** of 5–10 s per app, inside the Spotlight or case-study frame. This is how Family, Opal and Flighty show real motion. The files stay in `assets/`, so the bundle doesn't grow; the screenshot is the poster, which also stays under reduced motion.

## 3. CSS-3D phone (no WebGL)

Verified in Chrome 155 from this exact snippet: it renders, and `matrix3d` changes with scroll.

```html
<div class="stage"><div class="shadow"></div><div class="phone">
  <i class="edge l"></i><i class="edge r"></i><i class="edge t"></i><i class="edge b"></i>
  <div class="front"><div class="screen"><img src="assets/shot-hiyoko-1.jpg" alt=""><i class="island"></i><i class="glare"></i></div></div>
</div></div>
```
```css
.stage { --w: 240px; --t: 9px; --r: 38px; perspective: 1400px; perspective-origin: 50% 35%; height: 640px;
         view-timeline: --phone block; display: grid; place-items: center; position: relative; }
.phone { position: relative; width: var(--w); aspect-ratio: 600/1304; transform-style: preserve-3d;
         transform: rotateX(8deg) rotateY(-18deg); }                     /* resting pose = fallback */
.phone > * { position: absolute; inset: 0; }
.front  { transform: translateZ(calc(var(--t)/2)); border-radius: var(--r); padding: 7px; background: #0c0c0d;
          box-shadow: inset 0 0 0 1.5px #5a5d61, inset 0 0 0 3px #111; backface-visibility: hidden; }
.screen { position: relative; height: 100%; border-radius: calc(var(--r) - 7px); overflow: hidden; } /* clip on the leaf */
.screen img { width: 100%; height: 100%; object-fit: cover; display: block; }
.island { position: absolute; top: 2.2%; left: 35%; width: 30%; height: 3.6%; border-radius: 99px; background: #000; }
.glare  { position: absolute; inset: 0 -100%; background: linear-gradient(115deg, transparent 40%, #fff3 50%, transparent 60%); }
.edge   { background: linear-gradient(90deg, #2a2b2e, #8d9196 45%, #3a3c3f); }
.edge.l, .edge.r { inset: var(--r) auto; width: var(--t); }
.edge.l { left: 0;  transform: translateX(calc(var(--t)/-2)) rotateY(-90deg); }
.edge.r { right: 0; transform: translateX(calc(var(--t)/2))  rotateY(90deg); }
.edge.t, .edge.b { inset: auto var(--r); height: var(--t); }
.edge.t { top: 0;    transform: translateY(calc(var(--t)/-2)) rotateX(90deg); }
.edge.b { bottom: 0; transform: translateY(calc(var(--t)/2))  rotateX(-90deg); }
.shadow { position: absolute; bottom: 4%; width: 200px; height: 28px; background: radial-gradient(closest-side, #0004, transparent); }
@supports (animation-timeline: view()) { @media (prefers-reduced-motion: no-preference) {
  .phone  { animation: tilt linear both;   animation-timeline: --phone; animation-range: cover 10% cover 90%; }
  .glare  { animation: sweep linear both;  animation-timeline: --phone; }
  .shadow { animation: squash linear both; animation-timeline: --phone; }
}}
@keyframes tilt   { from { transform: rotateX(14deg) rotateY(-28deg) } to { transform: rotateX(-4deg) rotateY(22deg) } }
@keyframes sweep  { from { transform: translateX(-30%) } to { transform: translateX(30%) } }
@keyframes squash { from { transform: scaleX(.8); opacity: .6 } to { transform: scaleX(1); opacity: 1 } }
```

- **Clip only on the leaf.** These flatten a `preserve-3d` node (CSS Transforms 2 grouping properties): `overflow` other than visible or clip, `opacity < 1`, `filter`, `clip-path`, `mask-image`, `isolation`, `mix-blend-mode`, `contain: paint`. In Chrome, `overflow: hidden` flattened a test cube. Keep the `Fade`/`whileInView` wrapper outside `.stage`.
- **Keep |rotateY| at or below 30°.** Beyond that, gaps show where the inset edge strips meet the rounded corners, and the screen text foreshortens.
- **Scrub with the native timeline.**
  - Safari 26.0 (2025-09-15) shipped scroll-driven animations, and Safari 26.4 (2026-03-24) made them threaded.
  - Lenis scrolls the real document, so desktop should work too (k).
  - On iOS below 26, fall back to the resting pose plus the existing `whileInView` entrance, as in the site's current `@supports` pattern.
- **Sticky column.** In Chrome the scrub still progressed with the timeline named on `.stage` inside a sticky box, and also with it named on the tall wrapper. WebKit is unverified (k); if it stalls, name the timeline on the wrapper.
- **Don't use `useScroll` for this.** In framer-motion 13.4.0, a `useScroll` target only gets native acceleration when its offset matches a named preset (entry/exit/cover/contain). Other offsets run on the main thread.
- **Animate transforms only.** The glare moves with `translateX`, not `background-position`, which would repaint.
- **Layer budget (estimate).** The front face is about 4.5 MB at 3x. Show one phone per viewport.

## Limitations

- **No real-iPhone test.** Playwright WebKit 27.2 screenshots flatten `preserve-3d` (a CSS cube rendered as a single face), so WebKit 3D is unverified.
- **Codrops returns 403**, so I took its demos from GitHub instead.
- **Gaps in sources:** arc.net redirects to Notion, apple.com/invites and /journal return 404, opal.so resolves to opalapp.com, and Mercury and Craft were not analysed.
- **The probe can miss 3D.** It sampled in-view elements at 25 scroll positions only.
- **Flighty's WebGL subject is a guess.** Its `.glb` probably renders the Airports control tower, not a phone (k).

## Unresolved questions

1. Do Peapod and SmartMeal get Spotlights, or do their demos live in the case study?
2. Can he record the Simulator loops for pick 3? File size per loop is unmeasured.
3. Is iOS 26 an acceptable floor for the scrub, or does iOS 18 need a JS fallback?

## Sources

- Apple: [iPhone 18 Pro](https://www.apple.com/iphone-18-pro/), [iPhone Air](https://www.apple.com/iphone-air/), [iOS 27](https://www.apple.com/os/ios/); Safari notes [26.0](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes), [26.4](https://developer.apple.com/documentation/safari-release-notes/safari-26_4-release-notes); [WebKit video policies](https://webkit.org/blog/6784/new-video-policies-for-ios/)
- [Linear](https://linear.app/), [Cosmos](https://www.cosmos.so/), [Flighty](https://flighty.com/), [Opal](https://www.opalapp.com/), [Family](https://family.co/), [Structured](https://structured.app/), [Raycast iOS](https://www.raycast.com/ios), [Things](https://culturedcode.com/things/), [Bear](https://bear.app/), [Tot](https://tot.rocks/), [Halide](https://halide.cam/), [!Boring](https://notbor.ing/), [Rive](https://rive.app/)
- Codrops: [RotatingOnScrollAnimations](https://github.com/codrops/RotatingOnScrollAnimations), [3DCarousel](https://github.com/codrops/3DCarousel), [3DStackMotion](https://github.com/codrops/3DStackMotion), [infinite-canvas](https://github.com/edoardolunardi/infinite-canvas)
- [CSS Transforms 2](https://drafts.csswg.org/css-transforms-2/), [MDN transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style), [scrolly-video](https://github.com/dkaoster/scrolly-video), [WebKit bug 251532](https://bugs.webkit.org/show_bug.cgi?id=251532), [Motion useScroll](https://motion.dev/docs/react-use-scroll), [bundlephobia three](https://bundlephobia.com/package/three@0.186.1)

Status: DONE_WITH_CONCERNS
Summary: Recommend three zero-dependency additions: live HTML mini-demos in the Spotlight phone, a CSS-3D phone scrubbed by a native scroll timeline, and screen-recording loops with screenshot posters. three.js (~250 KB gz with R3F, and not splittable in the single-file build) doesn't earn its place. Concerns: no real-iPhone test, and headless WebKit can't render `preserve-3d`, so only Chrome verified the CSS phone.
