import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type MouseEvent as RMouseEvent } from 'react'
import {
  AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useMotionValueEvent, useReducedMotion,
  useScroll, useSpring, useTransform, useVelocity, wrap,
} from 'framer-motion'
import Lenis from 'lenis'
import { APPSTORE, EMAIL, GITHUB, LANGS, PLAYSTORE, content, meta, type Content, type Lang, type Meta, type PText } from './data'

const EXPO = [0.16, 1, 0.3, 1] as const
const SWIFT = [0.7, 0, 0.2, 1] as const
let lenis: Lenis | null = null

type Proj = Meta & PText
const I18n = createContext<{ lang: Lang; t: Content; setLang: (l: Lang) => void; projects: Proj[] }>(null as never)
const useT = () => useContext(I18n)

/* ---------------------------------------------------------------- */
/* primitives                                                        */
/* ---------------------------------------------------------------- */

/** "từ *ý tưởng* cho tới" → phần giữa dấu sao đặt serif nghiêng */
function Rich({ s }: { s: string }) {
  return <>{s.split('*').map((part, i) => (i % 2 ? <span key={i} className="serif">{part}</span> : <span key={i}>{part}</span>))}</>
}

function Lines({ lines, delay = 0, start = true }: { lines: ReactNode[]; delay?: number; start?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  return (
    <span ref={ref}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[.16em] -mb-[.16em]">
          <motion.span className="block will-change-transform" initial={{ y: '112%' }} animate={seen && start ? { y: 0 } : { y: '112%' }}
            transition={{ duration: 1.05, ease: EXPO, delay: delay + i * 0.085 }}>{l}</motion.span>
        </span>
      ))}
    </span>
  )
}

function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.9, ease: EXPO, delay }}>{children}</motion.div>
  )
}

function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 170, damping: 14, mass: 0.6 }), sy = useSpring(y, { stiffness: 170, damping: 14, mass: 0.6 })
  const move = (e: RMouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength); y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  return <motion.div className="inline-block" style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
}

/** Chữ cuộn lên khi hover */
function Roll({ children }: { children: ReactNode }) {
  const c = 'block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full'
  return <span className="relative block h-[1.55em] overflow-hidden leading-[1.55em]"><span className={c}>{children}</span><span aria-hidden className={c}>{children}</span></span>
}

function useClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const f = () => setT(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh', hour12: false }).format(new Date()))
    f(); const id = setInterval(f, 20000); return () => clearInterval(id)
  }, [])
  return t
}

const go = (id: string) => (e?: { preventDefault: () => void }) => {
  e?.preventDefault()
  const el = document.querySelector(id) as HTMLElement | null
  if (el) lenis ? lenis.scrollTo(el, { duration: 1.5 }) : el.scrollIntoView()
}

function LangSwitch({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useT()
  return (
    <div className="mono flex items-center gap-3" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l.id} onClick={() => setLang(l.id)} aria-pressed={lang === l.id} title={l.name}
          className={`transition-opacity duration-300 ${lang === l.id ? 'link-on opacity-100' : 'opacity-45 hover:opacity-100'} ${dark ? 'text-[var(--paper)]' : ''}`}>{l.short}</button>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* preloader                                                         */
/* ---------------------------------------------------------------- */

const HELLO = ['Xin chào', 'Hello', '你好', '汝好', 'Xin chào']
const CAP_DOWN = '0 0 50% 50% / 0 0 100% 100%'
const CAP_UP = '50% 50% 0 0 / 100% 100% 0 0'

function Preloader({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i === HELLO.length - 1) { const t = setTimeout(onDone, 480); return () => clearTimeout(t) }
    const t = setTimeout(() => setI(i + 1), i === 0 ? 680 : 180); return () => clearTimeout(t)
  }, [i, onDone])
  return (
    <motion.div className="fixed inset-0 z-[300] bg-[var(--ink)] text-[var(--paper)] will-change-transform" exit={{ y: '-125%' }} transition={{ duration: 1, ease: SWIFT }}>
      <div className="absolute inset-x-0 top-full h-[22vh] bg-[var(--ink)]" style={{ borderRadius: CAP_DOWN }} />
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="grid h-full place-items-center text-[clamp(28px,3.4vw,44px)]">
        <span className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[var(--paper)]" />{HELLO[i]}</span>
      </motion.p>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- */
/* header + menu                                                     */
/* ---------------------------------------------------------------- */

function Header({ ready }: { ready: boolean }) {
  const { t } = useT()
  return (
    <motion.header initial={{ opacity: 0, y: -14 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: EXPO, delay: 0.5 }}
      className="absolute inset-x-0 top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="wrap flex items-center justify-between py-7">
        <a href="#top" onClick={go('#top')} className="group flex items-center gap-1.5">
          <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)] group-hover:rotate-[360deg]">©</span>
          <span className="relative block h-[1.55em] overflow-hidden leading-[1.55em]">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full"><span className="max-sm:hidden">Code by </span>Hỷ Khang</span>
            <span className="block transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:-translate-y-full">Vương Hỷ Khang</span>
          </span>
        </a>
        <div className="flex items-center gap-9 max-sm:gap-5">
          <nav className="flex gap-7 max-md:hidden">
            {([['#work', t.nav.work], ['#about', t.nav.about], ['#contact', t.nav.contact]] as const).map(([h, l]) => (
              <Magnetic key={h} strength={0.25}><a href={h} onClick={go(h)} className="group block"><Roll>{l}</Roll></a></Magnetic>
            ))}
          </nav>
          <LangSwitch />
        </div>
      </div>
    </motion.header>
  )
}

function Menu() {
  const { t } = useT()
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => { const s = v > window.innerHeight * 0.55; setShow((p) => (p === s ? p : s)) })
  useEffect(() => { if (open) lenis?.stop(); else lenis?.start() }, [open])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])
  const links: [string, string][] = [['#top', 'Vương Hỷ Khang'], ['#work', t.nav.work], ['#about', t.nav.about], ['#contact', t.nav.contact]]
  const jump = (h: string) => () => { setOpen(false); setTimeout(() => go(h)(), 380) }
  return (
    <>
      <motion.div className="fixed right-[clamp(16px,3vw,40px)] z-[120]" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 22px)' }}
        initial={false} animate={{ scale: show || open ? 1 : 0 }} transition={{ duration: 0.5, ease: SWIFT }}>
        <Magnetic strength={0.4}>
          <button onClick={() => setOpen(!open)} aria-label={t.nav.menu} aria-expanded={open}
            className={`grid h-[68px] w-[68px] place-items-center rounded-full transition-colors duration-500 max-sm:h-[58px] max-sm:w-[58px] ${open ? 'bg-[var(--leaf)]' : 'bg-[var(--ink)]'}`}>
            <span className="relative block h-[10px] w-[26px]">
              <span className={`absolute left-0 top-0 h-px w-full bg-[var(--paper)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-[var(--paper)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </span>
          </button>
        </Magnetic>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[100] bg-black/35" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} onClick={() => setOpen(false)} />
            <motion.aside data-lenis-prevent className="fixed inset-y-0 right-0 z-[110] w-[min(580px,100vw)] bg-[var(--ink)] text-[var(--paper)] will-change-transform"
              initial={{ x: 'calc(100% + 110px)' }} animate={{ x: 0 }} exit={{ x: 'calc(100% + 110px)' }} transition={{ duration: 0.85, ease: SWIFT }}>
              <svg className="absolute right-full top-0 h-full w-[110px] translate-x-px" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <motion.path fill="#171A17" initial={{ d: 'M100 0 L100 100 Q-100 50 100 0' }} animate={{ d: 'M100 0 L100 100 Q100 50 100 0' }} exit={{ d: 'M100 0 L100 100 Q-100 50 100 0' }} transition={{ duration: 0.95, ease: SWIFT }} />
              </svg>
              <div className="flex h-full flex-col justify-between px-[clamp(28px,5vw,90px)] pb-12 pt-[18vh]">
                <div>
                  <p className="mono border-b border-[var(--hair-dark)] pb-6 text-[var(--grey)]">{t.nav.menu}</p>
                  <ul className="mt-8">
                    {links.map(([h, l], i) => (
                      <motion.li key={h} initial={{ x: 90, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ duration: 0.85, ease: EXPO, delay: 0.12 + i * 0.06 }}>
                        <button onClick={jump(h)} className="group flex items-center gap-4 py-2 text-[clamp(36px,4.2vw,58px)] leading-[1.15] tracking-[-0.03em]">
                          <span className="h-2.5 w-2.5 scale-0 rounded-full bg-[var(--paper)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-100" />
                          <span className="-ml-[26px] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-x-[26px]">{l}</span>
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex flex-wrap items-end justify-between gap-6">
                  <div className="flex gap-6 text-[15px]">
                    <a className="link" href={APPSTORE} target="_blank" rel="noopener">App Store</a>
                    <a className="link" href={PLAYSTORE} target="_blank" rel="noopener">Google Play</a>
                    <a className="link" href={GITHUB} target="_blank" rel="noopener">GitHub</a>
                  </div>
                  <LangSwitch dark />
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------------------------------------------------------------- */
/* hero                                                              */
/* ---------------------------------------------------------------- */

function NameMarquee() {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const dir = useRef(-1)
  const reduce = useReducedMotion()
  useAnimationFrame((_, dt) => {
    if (reduce) return
    const f = v.get() / 250
    if (f < -0.05) dir.current = 1; else if (f > 0.05) dir.current = -1
    base.set(base.get() + dir.current * 2 * (Math.min(dt, 50) / 1000) * (1 + Math.min(Math.abs(f), 8)))
  })
  const x = useTransform(base, (b) => `${wrap(-25, 0, b)}%`)
  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden>
      <motion.div style={{ x }} className="display flex w-max text-[clamp(80px,15.5vw,250px)] leading-[1.2] will-change-transform">
        {[0, 1, 2, 3].map((k) => <span key={k} className="pr-[.35em]">Vương Hỷ Khang <span className="serif">—</span></span>)}
      </motion.div>
    </div>
  )
}

/** Khung ảnh ở hero: lần lượt lật qua từng app, mỗi lần một lớp mới quét từ dưới lên */
function HeroPanel({ ready }: { ready: boolean }) {
  const { projects } = useT()
  const items = useMemo(() => projects.filter((p) => p.shots), [projects])
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!ready || reduce) return
    const id = setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % items.length) }, 3600)
    return () => clearInterval(id)
  }, [ready, reduce, items.length])
  const prev = items[(i - 1 + items.length) % items.length], cur = items[i]
  const Layer = ({ p }: { p: Proj }) => (
    <div className="grid h-full w-full place-items-center" style={{ background: p.panel }}>
      <img src={p.shots![0]} alt="" decoding="async" className="h-[88%] w-auto rounded-[clamp(16px,1.6vw,26px)]" style={{ boxShadow: '0 30px 60px -30px rgba(0,0,0,.5)' }} />
    </div>
  )
  return (
    <div>
      <motion.div className="relative aspect-[4/5] h-[min(54vh,560px)] overflow-hidden max-md:h-auto max-md:w-full"
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} animate={ready ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}} transition={{ duration: 1.3, ease: SWIFT, delay: 0.25 }}>
        <div className="absolute inset-0"><Layer p={prev} /></div>
        <motion.div key={i} className="absolute inset-0" initial={i === 0 ? false : { clipPath: 'inset(100% 0% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 1.05, ease: SWIFT }}>
          <motion.div className="h-full w-full" initial={i === 0 ? false : { scale: 1.18, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 1.3, ease: EXPO }}><Layer p={cur} /></motion.div>
        </motion.div>
      </motion.div>
      <div className="mono mt-4 flex justify-between text-[var(--grey)]">
        <span className="tabular-nums">0{i + 1} / 0{items.length}</span>
        <span className="relative block h-[1.6em] overflow-hidden text-right">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={cur.id} className="block" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.6, ease: SWIFT }}>{cur.name} · {cur.kind}</motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  )
}

function Hero({ ready }: { ready: boolean }) {
  const { t } = useT()
  const time = useClock()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 70])
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <h1 className="sr-only">{t.hero.sr}</h1>
      <motion.div style={{ y }} className="wrap grid flex-1 items-center gap-x-10 gap-y-12 pb-8 pt-32 will-change-transform md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="display text-[clamp(34px,5.1vw,78px)]"><Lines start={ready} delay={0.2} lines={t.hero.lines.map((l) => <Rich key={l} s={l} />)} /></p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: EXPO, delay: 0.85 }} className="mt-10 flex max-w-[40ch] flex-col gap-5">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden><path d="M2 2l18 18M20 5v15H5" stroke="currentColor" strokeWidth="1.4" /></svg>
            <p className="text-[19px] leading-[1.5]">{t.hero.sub}</p>
            <p className="mono text-[var(--grey)]">{t.hero.place} · <span className="tabular-nums">{time}</span> GMT+7</p>
          </motion.div>
        </div>
        <div className="md:col-span-5 md:justify-self-end"><HeroPanel ready={ready} /></div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 60 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.3, ease: EXPO, delay: 0.55 }} className="relative z-10 bg-[var(--paper)] pb-3">
        <NameMarquee />
      </motion.div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* intro — chữ sáng dần theo cuộn (một biến CSS, không phải 60 motion value) */
/* ---------------------------------------------------------------- */

function Intro() {
  const { t } = useT()
  const words = t.intro.text.split(/(?<=[\s，。：；、])/u).flatMap((w) => (w.length > 8 && !/\s/.test(w) ? w.match(/.{1,4}/gu)! : [w]))
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => ref.current?.style.setProperty('--p', String(v * 1.12)))
  return (
    <section className="wrap grid gap-10 py-[clamp(90px,14vw,200px)] md:grid-cols-12">
      <p className="mono pt-3 text-[var(--grey)] md:col-span-3">{t.intro.label}</p>
      <p ref={ref} className="text-[clamp(24px,2.9vw,42px)] leading-[1.34] tracking-[-0.02em] md:col-span-9" style={{ ['--p' as string]: 0 }}>
        {words.map((w, i) => <span key={i} style={{ opacity: `clamp(.16, calc((var(--p) - ${(i / words.length).toFixed(3)}) * 14 + .16), 1)` }}>{w}</span>)}
      </p>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* work index                                                        */
/* ---------------------------------------------------------------- */

function WorkIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, projects } = useT()
  const [active, setActive] = useState<number | null>(null)
  const [last, setLast] = useState(0)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.7 }), y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.7 })
  const lx = useSpring(mx, { stiffness: 260, damping: 24 }), ly = useSpring(my, { stiffness: 260, damping: 24 })
  const on = active !== null
  return (
    <section id="work" className="relative pb-[clamp(70px,9vw,130px)]" onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY) }}>
      <div className="wrap">
        <div className="flex items-baseline justify-between border-b border-[var(--hair)] pb-5">
          <p className="mono text-[var(--grey)]">{t.work.label}</p><p className="mono text-[var(--grey)]">2024 — 2026</p>
        </div>
        <ul onMouseLeave={() => setActive(null)}>
          {projects.map((p, i) => (
            <li key={p.id} className="border-b border-[var(--hair)]">
              <button onClick={() => onOpen(p.id)} onMouseEnter={() => { setActive(i); setLast(i) }} onFocus={() => { setActive(i); setLast(i) }}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-[clamp(24px,3.3vw,52px)] transition-opacity duration-500" style={{ opacity: on && active !== i ? 0.3 : 1 }}>
                <span className="display flex items-center gap-[.35em] text-[clamp(32px,6vw,96px)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[.22em]">
                  {p.icon && <img src={p.icon} alt="" className="hidden h-[.62em] w-[.62em] rounded-[22%] sm:block" />}{p.name}
                </span>
                <span className="text-right transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-[1.2em]">
                  <span className="block text-[clamp(14px,1.2vw,18px)]">{p.kind}</span><span className="mono text-[var(--grey)]">{p.year}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[430px] w-[360px] overflow-hidden will-change-transform md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }} initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.45, ease: SWIFT }}>
        <div className="h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(.7,0,.2,1)]" style={{ transform: `translate3d(0,-${last * 100}%,0)` }}>
          {projects.map((p) => (
            <div key={p.id} className="grid h-full w-full place-items-center" style={{ background: p.panel, color: p.ink }}>
              {p.shots ? <img src={p.shots[0]} alt="" loading="lazy" decoding="async" className="h-[84%] w-auto rounded-[22px]" /> : <span className="display px-8 text-center text-[42px]">{p.name}</span>}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div aria-hidden className="mono pointer-events-none fixed left-0 top-0 z-40 hidden h-[76px] w-[76px] place-items-center rounded-full bg-[var(--leaf)] text-[#F3F2EC] will-change-transform md:grid"
        style={{ x: lx, y: ly, translateX: '-50%', translateY: '-50%' }} initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ duration: 0.4, ease: SWIFT, delay: on ? 0.06 : 0 }}>{t.work.view}</motion.div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* reel — hai dải ảnh trượt ngược chiều theo cuộn                    */
/* ---------------------------------------------------------------- */

function Reel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = useTransform(scrollYProgress, [0, 1], ['-2%', '-24%']), b = useTransform(scrollYProgress, [0, 1], ['-24%', '-2%'])
  const pick = (id: string, n: number) => { const m = meta.find((x) => x.id === id)!; return { src: m.shots![n], bg: m.panel } }
  const rows = [
    [pick('tieu', 1), pick('meal', 0), pick('pea', 0), pick('drop', 0), pick('tieu', 3)],
    [pick('meal', 2), pick('tieu', 2), pick('drop', 1), pick('pea', 1), pick('meal', 1)],
  ]
  return (
    <div ref={ref} className="space-y-[clamp(12px,1.6vw,24px)] overflow-hidden pb-[clamp(90px,12vw,170px)]" aria-hidden>
      {rows.map((r, k) => (
        <motion.div key={k} style={{ x: k ? b : a }} className="flex w-max gap-[clamp(12px,1.6vw,24px)] will-change-transform">
          {r.map((tile) => (
            <div key={tile.src} className="relative aspect-[4/3] w-[clamp(240px,29vw,460px)] overflow-hidden" style={{ background: tile.bg }}>
              <img src={tile.src} alt="" loading="lazy" decoding="async" className="absolute left-1/2 top-[13%] w-[40%] -translate-x-1/2 rounded-[clamp(12px,1.3vw,20px)]" style={{ boxShadow: '0 24px 50px -26px rgba(0,0,0,.5)' }} />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* spotlight                                                         */
/* ---------------------------------------------------------------- */

function FeatureBlock({ i, title, text, onActive }: { i: number; title: string; text: string; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-48% 0px -48% 0px' })
  useEffect(() => { if (inView) onActive(i) }, [inView, i, onActive])
  return (
    <div ref={ref} className="flex min-h-[62vh] flex-col justify-center max-md:min-h-0 max-md:py-8">
      <p className="mono opacity-60">{String(i + 1).padStart(2, '0')}</p>
      <h4 className="mt-4 text-[clamp(26px,2.8vw,40px)] leading-[1.14] tracking-[-0.025em]">{title}</h4>
      <p className="mt-4 max-w-[40ch] text-[18px] leading-[1.6] opacity-80">{text}</p>
    </div>
  )
}

function Spotlight({ p, onOpen }: { p: Proj; onOpen: (id: string) => void }) {
  const { t } = useT()
  const [a, setA] = useState(0)
  const feats = p.features!, shots = p.shots!
  return (
    <section style={{ background: p.panel, color: p.ink }}>
      <div className="wrap py-[clamp(70px,9vw,130px)]">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b pb-10" style={{ borderColor: `${p.ink}2E` }}>
          <div className="flex items-center gap-6">
            <img src={p.icon} alt="" className="h-[92px] w-[92px] rounded-[22%] max-sm:h-[68px] max-sm:w-[68px]" />
            <div><p className="mono opacity-60">{p.kind} · {p.year}</p><h3 className="display mt-2 text-[clamp(34px,5vw,72px)]"><Lines lines={[p.name]} /></h3></div>
          </div>
          <Fade className="max-w-[44ch] text-[19px] leading-[1.5]">{p.lead}</Fade>
        </div>
        <div className="grid grid-cols-1 gap-x-16 md:grid-cols-2">
          <div className="max-md:hidden">
            <div className="sticky top-0 grid h-screen place-items-center">
              <div className="relative aspect-[506/1100] h-[min(74vh,680px)] overflow-hidden rounded-[38px] bg-black/10" style={{ boxShadow: '0 50px 90px -40px rgba(0,0,0,.5)' }}>
                {shots.map((s, i) => (
                  <motion.img key={s} src={s} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover will-change-[opacity]" initial={false}
                    animate={{ opacity: a === i ? 1 : 0, scale: a === i ? 1 : 1.04 }} transition={{ duration: 0.7, ease: [0.32, 0.08, 0.24, 1] }} />
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 md:py-[19vh]">
            <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pt-10 md:hidden" data-lenis-prevent>
              {shots.map((s) => <img key={s} src={s} alt="" loading="lazy" className="w-[58vw] max-w-[260px] shrink-0 rounded-[26px]" />)}
            </div>
            {feats.map((f, i) => <FeatureBlock key={f.title} i={i} title={f.title} text={f.text} onActive={setA} />)}
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 text-[17px]">
              <button onClick={() => onOpen(p.id)} className="link-on">{t.work.more}</button>
              {p.href && <a href={p.href} target="_blank" rel="noopener" className="link-on">{p.linkLabel} ↗</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* archive + about                                                   */
/* ---------------------------------------------------------------- */

function Archive() {
  const { t } = useT()
  return (
    <section className="wrap py-[clamp(90px,12vw,170px)]">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="mono text-[var(--grey)]">{t.archive.label}</p>
          <Fade className="mt-5 max-w-[26ch] text-[var(--grey)]">{t.archive.note}</Fade>
        </div>
        <ul className="border-t border-[var(--hair)] md:col-span-9">
          {t.archive.rows.map(([yr, name, note, stack], i) => (
            <motion.li key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.04 }} className="group border-b border-[var(--hair)]">
              <div className="grid grid-cols-[64px_1fr] items-baseline gap-x-6 gap-y-1 py-5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 md:grid-cols-[90px_1.1fr_1.6fr_auto]">
                <span className="mono text-[var(--grey)]">{yr}</span><span className="text-[19px]">{name}</span>
                <span className="text-[var(--grey)] max-md:col-start-2">{note}</span><span className="mono text-[var(--grey)] max-md:col-start-2">{stack}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function About() {
  const { t } = useT()
  return (
    <section id="about" className="border-t border-[var(--hair)]">
      <div className="wrap grid gap-x-10 gap-y-14 py-[clamp(90px,12vw,170px)] md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="mono text-[var(--grey)]">{t.about.label}</p>
          <h2 className="display mt-6 text-[clamp(34px,4.4vw,64px)]"><Lines lines={t.about.lines.map((l) => <Rich key={l} s={l} />)} /></h2>
          <Fade delay={0.2} className="mt-10 space-y-5 text-[18px] leading-[1.62] text-[#3c403c] md:max-w-[40ch]">{t.about.paras.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</Fade>
        </div>
        <ol className="md:col-span-6 md:col-start-7">
          {t.about.journey.map(([yr, tx], i) => (
            <motion.li key={yr} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.9, ease: EXPO, delay: i * 0.03 }}
              className="grid grid-cols-[76px_1fr] gap-6 border-t border-[var(--hair)] py-7 last:border-b">
              <span className="mono pt-1 text-[var(--grey)]">{yr}</span>
              <span className={`text-[19px] leading-[1.5] ${yr === '2028' ? 'serif text-[22px]' : ''}`}>{tx}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- */
/* footer                                                            */
/* ---------------------------------------------------------------- */

function Footer() {
  const { t } = useT()
  const time = useClock()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], [-160, 0])
  const cap = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const [copied, setCopied] = useState(false)
  const copy = async () => { try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { location.href = `mailto:${EMAIL}` } }
  const pill = 'group block rounded-full border border-[var(--hair-dark)] px-8 py-5 transition-colors duration-500 hover:border-[var(--paper)]'
  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
      <motion.div aria-hidden className="absolute inset-x-[-10%] -top-px h-[11vw] origin-top bg-[var(--paper)] will-change-transform" style={{ scaleY: cap, borderRadius: CAP_DOWN }} />
      <motion.div style={{ y }} className="wrap pb-10 pt-[clamp(150px,18vw,260px)] will-change-transform">
        <h2 className="display text-[clamp(46px,9vw,148px)]"><Lines lines={t.footer.lines.map((l) => <Rich key={l} s={l} />)} /></h2>
        <div className="relative mt-[clamp(40px,6vw,90px)] border-t border-[var(--hair-dark)]">
          <div className="absolute right-[8%] top-0 -translate-y-1/2 max-sm:right-4">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="group relative grid h-[172px] w-[172px] place-items-center overflow-hidden rounded-full bg-[var(--leaf)] text-[#F3F2EC] max-sm:h-[132px] max-sm:w-[132px]">
                <span className="absolute inset-0 translate-y-[101%] rounded-full bg-[var(--paper)] transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:translate-y-0" />
                <span className="relative text-[15px] transition-colors duration-500 group-hover:text-[var(--ink)]">{t.footer.write}</span>
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-[clamp(110px,10vw,140px)]">
          <Magnetic strength={0.2}><button onClick={copy} className={pill}>{copied ? t.footer.copied : EMAIL}</button></Magnetic>
          <Magnetic strength={0.2}><a href={APPSTORE} target="_blank" rel="noopener" className={pill}><Roll>App Store ↗</Roll></a></Magnetic>
          <Magnetic strength={0.2}><a href={PLAYSTORE} target="_blank" rel="noopener" className={pill}><Roll>Google Play ↗</Roll></a></Magnetic>
          <Magnetic strength={0.2}><a href={GITHUB} target="_blank" rel="noopener" className={pill}><Roll>GitHub ↗</Roll></a></Magnetic>
        </div>
        <div className="mt-[clamp(60px,8vw,110px)] flex flex-wrap justify-between gap-6">
          <div><p className="mono text-[var(--grey)]">{t.footer.version}</p><p className="mt-1">2026 © Vương Hỷ Khang</p></div>
          <div><p className="mono text-[var(--grey)]">{t.footer.time}</p><p className="mt-1 tabular-nums">{time} GMT+7</p></div>
          <div className="sm:text-right"><p className="mono text-[var(--grey)]">{t.footer.storeName}</p><p className="mt-1">VUONG HY KHANG</p></div>
        </div>
      </motion.div>
    </footer>
  )
}

/* ---------------------------------------------------------------- */
/* case study                                                        */
/* ---------------------------------------------------------------- */

function CaseStudy({ p, onClose, onNext }: { p: Proj; onClose: () => void; onNext: () => void }) {
  const { t, projects } = useT()
  const next = projects[(projects.findIndex((x) => x.id === p.id) + 1) % projects.length]
  const scroller = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k); lenis?.stop()
    return () => { window.removeEventListener('keydown', k); lenis?.start() }
  }, [onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-[200] will-change-transform"
      initial={{ y: '112%' }} animate={{ y: 0 }} exit={{ y: '112%' }} transition={{ duration: 0.95, ease: SWIFT }}>
      <div aria-hidden className="absolute inset-x-[-10%] bottom-full h-[12vh] translate-y-px bg-[var(--paper)]" style={{ borderRadius: CAP_UP }} />
      <div ref={scroller} data-lenis-prevent className="no-scrollbar h-full overflow-y-auto bg-[var(--paper)]">
        <div className="sticky top-0 z-10 border-b border-[var(--hair)] bg-[var(--paper)]">
          <div className="wrap flex justify-between py-5"><span>{p.name}</span><button onClick={onClose} className="group"><Roll>{t.work.close} ✕</Roll></button></div>
        </div>
        <div className="wrap pb-24 pt-[clamp(40px,7vw,110px)]">
          <p className="mono text-[var(--grey)]">{p.kind} · {p.year}</p>
          <h2 className="display mt-5 text-[clamp(44px,9.5vw,150px)]"><Lines delay={0.5} lines={[p.name]} /></h2>
          <div className="mt-[clamp(40px,6vw,90px)] grid gap-x-10 gap-y-12 md:grid-cols-12">
            <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.9 }} className="md:col-span-4">
              {p.facts.map(([k, v]) => <div key={k} className="border-t border-[var(--hair)] py-4 last:border-b"><dt className="mono text-[var(--grey)]">{k}</dt><dd className="m-0 mt-1.5">{v}</dd></div>)}
              {p.href && <a href={p.href} target="_blank" rel="noopener" className="link-on mt-7 inline-block">{p.linkLabel} ↗</a>}
            </motion.dl>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 1, ease: EXPO }} className="md:col-span-7 md:col-start-6">
              <p className="text-[clamp(22px,2.3vw,32px)] leading-[1.36] tracking-[-0.015em]">{p.lead}</p>
              <div className="mt-9 space-y-5 text-[18px] leading-[1.68] text-[#3c403c]">{p.body.map((b) => <p key={b.slice(0, 24)}>{b}</p>)}</div>
            </motion.div>
          </div>
        </div>
        {p.shots && (
          <div style={{ background: p.panel }} className="py-[clamp(50px,7vw,110px)]">
            <div className="no-scrollbar wrap flex gap-[clamp(16px,2.4vw,36px)] overflow-x-auto md:justify-center">
              {p.shots.map((s, i) => (
                <motion.img key={s} src={s} alt={`${p.name} ${i + 1}`} loading="lazy" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, root: scroller }}
                  transition={{ duration: 1, ease: EXPO, delay: i * 0.09 }} className="w-[min(60vw,270px)] shrink-0 rounded-[28px]" style={{ boxShadow: '0 40px 70px -36px rgba(0,0,0,.5)' }} />
              ))}
            </div>
          </div>
        )}
        <button onClick={onNext} className="group block w-full border-t border-[var(--hair)] py-[clamp(60px,8vw,120px)] text-center">
          <span className="mono text-[var(--grey)]">{t.work.next}</span>
          <span className="display mt-3 block text-[clamp(36px,6.4vw,100px)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1.5">{next.name}</span>
        </button>
      </div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- */

function initialLang(): Lang {
  try { const s = localStorage.getItem('lang'); if (s === 'vi' || s === 'en' || s === 'zh') return s } catch { /* storage unavailable */ }
  const n = (navigator.language || 'vi').toLowerCase()
  return n.startsWith('vi') ? 'vi' : n.startsWith('zh') ? 'zh' : 'en'
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)
  const [lang, setLangState] = useState<Lang>(initialLang)
  const reduce = useReducedMotion()

  const setLang = useCallback((l: Lang) => { setLangState(l); try { localStorage.setItem('lang', l) } catch { /* ignore */ } }, [])
  useEffect(() => { document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang }, [lang])

  const ctx = useMemo(() => {
    const t = content[lang]
    return { lang, t, setLang, projects: meta.map((m) => ({ ...m, ...t.projects[m.id] })) }
  }, [lang, setLang])

  useEffect(() => {
    if (reduce) return
    lenis = new Lenis({ lerp: 0.12, autoRaf: true })
    return () => { lenis?.destroy(); lenis = null }
  }, [reduce])
  useEffect(() => { if (loading) { lenis?.stop(); window.scrollTo(0, 0) } else lenis?.start() }, [loading])

  const done = useCallback(() => setLoading(false), [])
  const open = ctx.projects.find((p) => p.id === openId) ?? null
  return (
    <I18n.Provider value={ctx}>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <Header ready={!loading} />
      <Menu />
      <main key={lang}>
        <Hero ready={!loading} />
        <Intro />
        <WorkIndex onOpen={setOpenId} />
        <Reel />
        {ctx.projects.filter((p) => p.features).map((p) => <Spotlight key={p.id} p={p} onOpen={setOpenId} />)}
        <Archive />
        <About />
      </main>
      <Footer key={`f-${lang}`} />
      <AnimatePresence mode="wait">
        {open && <CaseStudy key={open.id} p={open} onClose={() => setOpenId(null)} onNext={() => setOpenId(ctx.projects[(ctx.projects.findIndex((x) => x.id === open.id) + 1) % ctx.projects.length].id)} />}
      </AnimatePresence>
    </I18n.Provider>
  )
}
