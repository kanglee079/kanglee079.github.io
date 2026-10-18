import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useAnimationControls, useMotionValue, useTransform } from 'framer-motion'
import type { Lang } from '../data'

const T = {
  vi: { label: 'Peapod · thử nuôi đậu', demo: 'bản demo', focus: 'Tập trung 5 phút', give: 'Bỏ cuộc', again: 'Chơi lại', min: 'phút',
    sad: 'Đậu buồn một chút, vậy thôi.', done: 'Golden Pod! Đủ 60 phút tập trung.', hint: 'Mỗi lần chạm là 5 phút tập trung.',
    stages: ['Hạt giống', 'Vỏ đậu', 'Hạt đậu', 'Golden Pod'] },
  en: { label: 'Peapod · grow a pea', demo: 'demo', focus: 'Focus 5 min', give: 'Give up', again: 'Again', min: 'min',
    sad: "Your pea is sad for a moment. That's all.", done: 'Golden Pod! 60 focused minutes.', hint: 'Each tap is 5 focused minutes.',
    stages: ['Seed', 'Pod', 'Pea', 'Golden Pod'] },
  zh: { label: 'Peapod · 养一颗豆子', demo: '演示', focus: '专注 5 分钟', give: '放弃', again: '再来一次', min: '分钟',
    sad: '豆子难过一会儿，仅此而已。', done: '金豆荚！专注满 60 分钟。', hint: '每次点按代表专注 5 分钟。',
    stages: ['种子', '豆荚', '豌豆', '金豆荚'] },
} as const

const ART = ['pea-seed-happy', 'pea-pod-growing', 'pea-pod-happy', 'pea-pea-happy', 'pea-golden-happy']
const NAME_IDX = [0, 1, 1, 2, 3]
const GOAL = 60
const C = 2 * Math.PI * 100
const stageOf = (m: number) => (m >= GOAL ? 4 : m >= 45 ? 3 : m >= 25 ? 2 : m >= 10 ? 1 : 0)
const ink = '#14301A'
const green = '#2E9B48'
const btnBase = { touchAction: 'manipulation', userSelect: 'none', WebkitTapHighlightColor: 'transparent', WebkitTouchCallout: 'none' } as const

type Burst = { id: number; p: { x: number; y: number; c: string; ch: string }[] }

export default function PeapodDemo({ lang, touch, reduce }: { lang: Lang; touch: boolean; reduce: boolean }) {
  const t = T[lang]
  const [minutes, setMinutes] = useState(0)
  const [sad, setSad] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])
  const bounce = useAnimationControls()
  const prog = useMotionValue(0)
  const dash = useTransform(prog, (v) => `${(v / GOAL) * C} ${C}`)
  const shown = useTransform(prog, (v) => Math.round(v))
  const timer = useRef<number | undefined>(undefined)
  const nextId = useRef(0)

  useEffect(() => {
    if (reduce) { prog.set(minutes); return }
    const a = animate(prog, minutes, { type: 'spring', stiffness: 90, damping: 18 })
    return () => a.stop()
  }, [minutes, reduce, prog])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const done = minutes >= GOAL
  const stage = stageOf(minutes)
  const src = `assets/demo/${sad ? 'pea-pea-sad' : ART[stage]}.png`

  const pop = (count: number) => {
    const id = nextId.current++
    const p = Array.from({ length: count }, (_, i) => {
      const a = Math.random() * Math.PI * 2, r = 78 + Math.random() * 30
      return { x: Math.cos(a) * r, y: Math.sin(a) * r - 10, c: i % 3 === 0 ? '#E0B73A' : green, ch: i % 2 ? '✦' : '●' }
    })
    setBursts((b) => [...b, { id, p }])
  }

  const focus = () => {
    if (done) return
    window.clearTimeout(timer.current)
    setSad(false)
    const next = Math.min(GOAL, minutes + 5)
    setMinutes(next)
    if (reduce) return
    pop(next >= GOAL ? 8 : 4)
    void bounce.start({ scaleY: 0.88, scaleX: 1.1, transition: { duration: 0.08 } }).then(() =>
      bounce.start({ scaleY: 1, scaleX: 1, transition: { type: 'spring', stiffness: 420, damping: 9 } }))
  }
  const giveUp = () => {
    window.clearTimeout(timer.current)
    setSad(true)
    timer.current = window.setTimeout(() => setSad(false), 1200)
  }
  const reset = () => { window.clearTimeout(timer.current); setSad(false); setMinutes(0) }

  return (
    <div className="relative mx-auto flex h-[520px] w-full max-w-[380px] select-none flex-col items-center overflow-hidden rounded-[22px] px-6 pb-5 pt-5"
      style={{ background: '#DDEFD6', color: ink }}>
      <div className="flex w-full items-center justify-between">
        <span className="mono" style={{ color: ink }}>{t.label}</span>
        <span className="mono rounded-full px-2 py-0.5" style={{ background: 'rgba(20,48,26,.1)', color: ink }}>{t.demo}</span>
      </div>

      <div className="relative mt-3.5 h-[220px] w-[220px] shrink-0">
        <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
          <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(46,155,72,.18)" strokeWidth="8" />
          <motion.circle cx="110" cy="110" r="100" fill="none" stroke={done ? '#E0B73A' : green} strokeWidth="8" strokeLinecap="round" style={{ strokeDasharray: dash }} />
        </svg>
        <motion.div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -ml-[85px] -mt-[85px]" animate={bounce} style={{ transformOrigin: '50% 90%' }}>
          <AnimatePresence>
            <motion.img key={src} src={src} alt="" draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduce ? 1 : 1.12 }}
              transition={reduce ? { duration: 0 } : { opacity: { duration: 0.25 }, scale: { type: 'spring', stiffness: 260, damping: 16 } }} />
          </AnimatePresence>
        </motion.div>
        {bursts.map((b) => (
          <div key={b.id} className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden>
            {b.p.map((q, i) => (
              <motion.span key={i} className="absolute -ml-1.5 -mt-2.5 text-[13px] leading-none" style={{ color: q.c }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }} animate={{ x: q.x, y: q.y, opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                onAnimationComplete={i === 0 ? () => setBursts((all) => all.filter((x) => x.id !== b.id)) : undefined}>{q.ch}</motion.span>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex h-6 items-center">
        <AnimatePresence mode="wait">
          <motion.span key={NAME_IDX[stage]} className="mono rounded-full px-3 py-1" style={{ background: green, color: '#fff' }}
            initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 20 }}>{t.stages[NAME_IDX[stage]]}</motion.span>
        </AnimatePresence>
      </div>
      <p className="display mt-1.5 text-[28px] leading-none" style={{ fontVariantNumeric: 'tabular-nums', color: ink }}>
        <motion.span>{shown}</motion.span> / {GOAL} <span className="text-[16px]">{t.min}</span>
      </p>
      <p role="status" className="serif mt-2 min-h-[22px] px-2 text-center text-[15px] leading-snug" style={{ color: ink }}>
        {sad ? t.sad : done ? t.done : t.hint}
      </p>

      <div className="mt-auto flex w-full flex-col items-center gap-1">
        {done ? (
          <motion.button type="button" onClick={reset} whileTap={reduce ? undefined : { scale: 0.96 }}
            className="h-[52px] min-w-[44px] w-full rounded-full text-center text-[16px] font-semibold" style={{ ...btnBase, background: ink, color: '#fff' }}>{t.again}</motion.button>
        ) : (
          <>
            <motion.button type="button" onClick={focus} whileTap={reduce ? undefined : { scale: 0.96 }} whileHover={reduce || touch ? undefined : { scale: 1.02 }}
              className="h-[52px] w-full rounded-full text-center text-[16px] font-semibold" style={{ ...btnBase, background: green, color: '#fff' }}>{t.focus}</motion.button>
            <button type="button" onClick={giveUp} className="h-11 min-w-[44px] px-4 text-[14px] underline-offset-4 hover:underline" style={{ ...btnBase, color: ink, opacity: 0.75 }}>{t.give}</button>
          </>
        )}
      </div>
    </div>
  )
}
