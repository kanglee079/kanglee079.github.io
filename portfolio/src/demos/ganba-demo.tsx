import { useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import type { Lang } from '../data'

// Numbers mirror the real app screenshot: 103 / 180, pass mark 95, 41 + 23 + 39.
const TOTAL = 180
const PASS = 95
const SCORE = 103
const R = 100
const ARC_LEN = Math.PI * R
const NAVY = '#1A2350'
const INK = '#F4F1EA'
const ORANGE = '#F28C4B'
const SEAL = '#B4412E'

// Pass-mark tick on the semicircle (left = 0, right = 180).
const passAngle = Math.PI * (1 - PASS / TOTAL)
const tick = (r: number) => ({ x: 120 + r * Math.cos(passAngle), y: 120 - r * Math.sin(passAngle) })
const tickIn = tick(R - 11)
const tickOut = tick(R + 11)

const T: Record<Lang, {
  label: string; demo: string; submit: string; again: string; pass: string; passOver: string; near: string
  sections: [string, string, string]
}> = {
  vi: {
    label: 'Ganba · nộp bài thử', demo: 'bản demo', submit: 'Nộp bài', again: 'Làm lại',
    pass: 'Điểm đỗ 95', passOver: 'Điểm đỗ 95 · vượt +8', near: 'Gần điểm liệt',
    sections: ['Ngôn ngữ', 'Đọc hiểu', 'Nghe hiểu'],
  },
  en: {
    label: 'Ganba · submit a mock test', demo: 'demo', submit: 'Submit', again: 'Again',
    pass: 'Pass mark 95', passOver: 'Pass mark 95 · over by 8', near: 'Near min',
    sections: ['Language', 'Reading', 'Listening'],
  },
  zh: {
    label: 'Ganba · 试交一份模考', demo: '演示', submit: '交卷', again: '再来一次',
    pass: '及格线 95', passOver: '及格线 95 · 超出 8 分', near: '接近最低线',
    sections: ['语言知识', '读解', '听解'],
  },
}

const SECTIONS = [
  { kanji: '語', value: 41, warn: false },
  { kanji: '読', value: 23, warn: true },
  { kanji: '聴', value: 39, warn: false },
] as const

export default function GanbaDemo({ lang, touch, reduce }: { lang: Lang; touch: boolean; reduce: boolean }) {
  const t = T[lang] ?? T.en
  const gradId = `ganba-arc-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>('idle')
  const [shown, setShown] = useState(0)
  const score = useMotionValue(0)
  const ctrl = useRef<AnimationPlaybackControls | null>(null)
  const offset = useTransform(score, (v) => ARC_LEN * (1 - Math.min(Math.max(v, 0), TOTAL) / TOTAL))

  useMotionValueEvent(score, 'change', (v) => setShown(Math.round(Math.min(Math.max(v, 0), SCORE))))
  useEffect(() => () => ctrl.current?.stop(), [])

  const run = () => {
    if (phase !== 'idle') return
    ctrl.current?.stop()
    if (reduce) {
      score.set(SCORE)
      setPhase('done')
      return
    }
    setPhase('running')
    ctrl.current = animate(score, SCORE, {
      type: 'spring', duration: 1.2, bounce: 0,
      onComplete: () => setPhase('done'),
    })
  }

  const reset = () => {
    ctrl.current?.stop()
    setPhase('idle')
    if (reduce) score.set(0)
    else ctrl.current = animate(score, 0, { duration: 0.45, ease: 'easeOut' })
  }

  const sealed = shown >= PASS
  const btn = 'inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-[15px] font-semibold'
  const tap = reduce ? undefined : { scale: 0.96 }
  const hover = reduce || touch ? undefined : { scale: 1.03 }

  return (
    <div
      className="relative mx-auto flex h-[520px] w-full max-w-[380px] flex-col overflow-hidden rounded-[22px] p-5"
      style={{ background: NAVY, color: INK }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="mono" style={{ fontSize: 11, opacity: 0.72 }}>{t.label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="mono" style={{ fontSize: 11 }}>N3 · test 1</span>
          <span
            className="mono rounded-full px-2 py-[2px]"
            style={{ fontSize: 9, border: '1px solid rgba(244,241,234,.4)', opacity: 0.8 }}
          >
            {t.demo}
          </span>
        </span>
      </div>

      <div className="relative mx-auto mt-4 w-[88%]">
        <svg viewBox="0 0 240 135" className="block w-full" aria-hidden="true">
          <defs>
            <linearGradient id={gradId}gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="220" y2="0">
              <stop offset="0" stopColor="#7C93FF" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <path d={`M${120 - R} 120 A${R} ${R} 0 0 1 ${120 + R} 120`} fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="14" strokeLinecap="round" />
          <motion.path
            d={`M${120 - R} 120 A${R} ${R} 0 0 1 ${120 + R} 120`}
            fill="none" stroke={`url(#${gradId})`} strokeWidth="14" strokeLinecap="round"
            strokeDasharray={ARC_LEN} style={{ strokeDashoffset: offset }}
          />
          <line x1={tickIn.x} y1={tickIn.y} x2={tickOut.x} y2={tickOut.y} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-x-0 bottom-[6%] flex flex-col items-center leading-none">
          <span className="display text-[60px] font-semibold tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>{shown}</span>
          <span className="mono mt-1" style={{ fontSize: 12, opacity: 0.6 }}>/{TOTAL}</span>
        </div>
        {sealed && (
          <motion.div
            className="absolute -right-1 -top-3 flex h-[58px] w-[58px] items-center justify-center rounded-full"
            style={{ border: `2px solid ${SEAL}`, background: INK, color: SEAL, rotate: -12 }}
            initial={reduce ? false : { scale: 1.9, opacity: 0 }}
            animate={{ scale: reduce ? 1 : [1.9, 0.94, 1], opacity: 1 }}
            transition={reduce ? { duration: 0 } : { scale: { duration: 0.42, times: [0, 0.65, 1], ease: 'easeOut' }, opacity: { duration: 0.12 } }}
            aria-hidden="true"
          >
            <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full" style={{ border: `1px solid ${SEAL}` }}>
              <span className="serif text-[17px] font-bold" style={{ fontStyle: 'normal', letterSpacing: 0, lineHeight: 1 }}>合格</span>
            </span>
          </motion.div>
        )}
      </div>

      <p role="status" className="mono mt-2 text-center" style={{ fontSize: 11, opacity: 0.8 }}>
        {phase === 'done' ? t.passOver : t.pass}
      </p>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        {phase === 'done' ? (
          <>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.kanji}
                  className="rounded-[14px] px-3 py-2"
                  style={{ background: 'rgba(255,255,255,.08)' }}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.14, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="serif w-6 text-center text-[20px]" style={{ fontStyle: 'normal', color: s.warn ? ORANGE : INK }}>{s.kanji}</span>
                    <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 text-[13px]">
                      {t.sections[i]}
                      {s.warn && (
                        <span className="mono rounded-full px-2 py-[1px]" style={{ fontSize: 9, color: ORANGE, border: `1px solid ${ORANGE}` }}>{t.near}</span>
                      )}
                    </span>
                    <span className="text-[14px] font-semibold tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}/60</span>
                  </div>
                  <div className="mt-2 h-[4px] overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,.14)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: s.warn ? ORANGE : '#6F86FF' }}
                      initial={reduce ? false : { width: 0 }}
                      animate={{ width: `${(s.value / 60) * 100}%` }}
                      transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.14 + 0.15, ease: 'easeOut' }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex justify-center">
              <motion.button
                type="button" onClick={reset} whileTap={tap} whileHover={hover}
                className={`${btn} mono`}
                style={{ touchAction: 'manipulation', minWidth: 44, fontSize: 12, border: '1px solid rgba(244,241,234,.4)', color: INK, background: 'transparent' }}
              >
                {t.again}
              </motion.button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <motion.button
              type="button" onClick={run} disabled={phase === 'running'} whileTap={tap} whileHover={hover}
              className={btn}
              style={{ touchAction: 'manipulation', background: '#FFFFFF', color: NAVY, opacity: phase === 'running' ? 0.6 : 1 }}
            >
              {t.submit}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
