/*
 * CSS-only 3D iPhone that tilts while it scrolls through the viewport.
 * The tilt is driven by a native view timeline, so it runs on the compositor and
 * follows native touch scrolling with no JS. Nothing above .p3d-screen may clip,
 * fade, filter or contain paint: any of those flattens preserve-3d.
 */

const css = `
.p3d-stage{--t:9px;--pw:var(--w,240px);position:relative;display:grid;place-items:center;height:min(640px,80svh);perspective:1400px;perspective-origin:50% 35%;view-timeline:--p3d block}
.p3d-shadow{position:absolute;left:50%;top:calc(50% + var(--pw) * 1.0867 - 6px);width:calc(var(--pw) * 1.15);height:calc(var(--pw) * .16);translate:-50% -50%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.42),rgba(0,0,0,.18) 55%,transparent);pointer-events:none}
.p3d-phone{position:relative;width:var(--pw);aspect-ratio:600/1304;transform-style:preserve-3d;transform:rotateX(8deg) rotateY(-18deg);will-change:transform}
.p3d-edge{position:absolute;--a:90deg;background:linear-gradient(var(--a),#2e2e32,#d4d4da 28%,#77777e 52%,#ececf0 74%,#3a3a3f);border-radius:4px}
.p3d-edge.l,.p3d-edge.r{top:24px;bottom:24px;width:var(--t)}
.p3d-edge.t,.p3d-edge.b{left:24px;right:24px;height:var(--t);--a:180deg}
.p3d-edge.l{left:calc(var(--t) / -2);transform:rotateY(-90deg)}
.p3d-edge.r{right:calc(var(--t) / -2);transform:rotateY(90deg)}
.p3d-edge.t{top:calc(var(--t) / -2);transform:rotateX(90deg)}
.p3d-edge.b{bottom:calc(var(--t) / -2);transform:rotateX(-90deg)}
.p3d-front{position:absolute;inset:0;box-sizing:border-box;padding:7px;border-radius:38px;background:#0c0c0d;transform:translateZ(calc(var(--t) / 2));backface-visibility:hidden;box-shadow:0 0 0 1.5px #9a9aa1,0 0 0 2.5px #2a2a2e,inset 0 0 0 1px rgba(255,255,255,.07),inset 0 0 0 3px #000}
.p3d-screen{position:relative;width:100%;height:100%;overflow:hidden;border-radius:31px;background:#000}
.p3d-screen img{display:block;width:100%;height:100%;object-fit:cover}
.p3d-island{position:absolute;top:calc(var(--pw) * .035);left:50%;width:32%;aspect-ratio:126/37;translate:-50% 0;border-radius:999px;background:#000}
.p3d-glare{position:absolute;inset:0 -50%;background:linear-gradient(115deg,transparent 38%,rgba(255,255,255,.2) 50%,transparent 62%);pointer-events:none}
@supports (animation-timeline: view()){@media (prefers-reduced-motion: no-preference){
.p3d-phone{animation:p3d-tilt linear both;animation-timeline:--p3d;animation-range:cover 10% cover 90%}
.p3d-glare{animation:p3d-sweep linear both;animation-timeline:--p3d}
.p3d-shadow{animation:p3d-squash linear both;animation-timeline:--p3d}
}}
.p3d-still .p3d-phone,.p3d-still .p3d-glare,.p3d-still .p3d-shadow{animation:none}
@keyframes p3d-tilt{from{transform:rotateX(14deg) rotateY(-28deg) rotateZ(-3deg)}to{transform:rotateX(-4deg) rotateY(22deg) rotateZ(2deg)}}
@keyframes p3d-sweep{from{transform:translateX(-30%)}to{transform:translateX(30%)}}
@keyframes p3d-squash{from{transform:scaleX(.8);opacity:.6}to{transform:scaleX(1);opacity:1}}
`

/** 'assets/shot-1.jpg' -> 'assets/shot-1-sm.jpg' (the 380px variant shipped next to every shot). */
const smallVariant = (src: string) => src.replace(/(\.[a-z0-9]+)$/i, '-sm$1')

export default function Phone3D({ src, reduce, className }: { src: string; reduce: boolean; className?: string }) {
  const stage = ['p3d-stage', reduce ? 'p3d-still' : '', className ?? ''].filter(Boolean).join(' ')
  return (
    <div className={stage}>
      <style href="p3d-phone-3d" precedence="default">{css}</style>
      <div className="p3d-shadow" aria-hidden="true" />
      <div className="p3d-phone">
        <div className="p3d-edge l" aria-hidden="true" />
        <div className="p3d-edge r" aria-hidden="true" />
        <div className="p3d-edge t" aria-hidden="true" />
        <div className="p3d-edge b" aria-hidden="true" />
        <div className="p3d-front">
          <div className="p3d-screen">
            <img src={src} srcSet={`${smallVariant(src)} 380w, ${src} 600w`} sizes="240px" width={600} height={1304}
              alt="" loading="lazy" decoding="async" draggable={false} />
            <div className="p3d-island" aria-hidden="true" />
            <div className="p3d-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}
