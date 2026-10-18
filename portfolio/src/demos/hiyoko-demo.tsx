import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { Lang } from '../data'

type Mood = 'idle' | 'happy' | 'cheer' | 'thinking'
type Word = { jp: string; romaji: string; vi: string; en: string; zh: string }

const WORDS: Word[] = [
  { jp: 'あそこ', romaji: 'asoko', vi: 'ở đó', en: 'there', zh: '那里' },
  { jp: '人', romaji: 'hito', vi: 'người', en: 'person', zh: '人' },
  { jp: 'こんにちは', romaji: 'konnichiwa', vi: 'xin chào', en: 'hello', zh: '你好' },
]

const T = {
  vi: { label: 'Hiyoko · thử lật thẻ', tap: 'chạm để lật', no: 'Chưa nhớ', yes: 'Nhớ rồi', done: 'Xong vòng!', again: 'Chơi lại' },
  en: { label: 'Hiyoko · try a card', tap: 'tap to flip', no: 'Not yet', yes: 'Got it', done: 'Round done!', again: 'Again' },
  zh: { label: 'Hiyoko · 试试翻卡', tap: '点击翻转', no: '还没记住', yes: '记住了', done: '本轮完成！', again: '再来一次' },
} as const

const INK = '#3A2414'
const RED = '#B4412E'
const CARD = '#FFF8EC'
const SPRING = { type: 'spring', stiffness: 260, damping: 24 } as const
const BTN = { touchAction: 'manipulation', userSelect: 'none' } as const
const HIDE_BACK = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const

function Chick({ mood, size, reduce }: { mood: Mood; size: number; reduce: boolean }) {
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, pointerEvents: 'none' }}
    >
      <motion.img
        key={mood}
        src={`assets/demo/hiyo-${mood}.png`}
        alt=""
        draggable={false}
        initial={reduce ? false : { scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={SPRING}
        style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none', WebkitUserSelect: 'none' }}
      />
    </motion.div>
  )
}

export default function HiyokoDemo({ lang, touch, reduce }: { lang: Lang; touch: boolean; reduce: boolean }) {
  const t = T[lang]
  const [idx, setIdx] = useState(0)
  const [backIdx, setBackIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [stamped, setStamped] = useState(false)
  const [mood, setMood] = useState<Mood>('idle')
  const [done, setDone] = useState(false)
  const timers = useRef<number[]>([])

  const later = useCallback((fn: () => void, ms: number) => {
    if (reduce) return fn()
    timers.current.push(window.setTimeout(fn, ms))
  }, [reduce])
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clearTimers, [])

  // The back face keeps the previous word until the card has turned away, so the next answer never flashes.
  useEffect(() => {
    if (idx === backIdx) return
    const id = window.setTimeout(() => { setBackIdx(idx); setStamped(false) }, reduce ? 0 : 520)
    return () => clearTimeout(id)
  }, [idx, backIdx, reduce])

  const flip = () => { if (!flipped) { setFlipped(true); setMood('idle') } }
  const notYet = () => { setMood('thinking'); setFlipped(false) }
  const gotIt = () => {
    const last = idx === WORDS.length - 1
    setStamped(true)
    later(() => setMood(last ? 'cheer' : 'happy'), 450)
    // Reduced motion skips the animation, not the beat that lets the stamp and chick be read.
    timers.current.push(window.setTimeout(() => {
      if (last) { setDone(true); setFlipped(false); return }
      setFlipped(false)
      setIdx(idx + 1)
      setMood('idle')
    }, reduce ? 900 : 1500))
  }
  const reset = () => {
    clearTimers()
    setIdx(0); setBackIdx(0); setFlipped(false); setStamped(false); setMood('idle'); setDone(false)
  }

  const w = WORDS[idx]
  const bw = WORDS[backIdx]
  const hover = touch || reduce ? undefined : { y: -1 }

  return (
    <div
      className="relative mx-auto flex h-[520px] w-full max-w-[380px] flex-col rounded-[22px] p-5"
      style={{ background: '#FBEBD4', color: INK, userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      <div className="flex items-center justify-between">
        <span className="mono" style={{ color: INK, opacity: 0.7 }}>{t.label}</span>
        <span className="mono" style={{ color: INK, opacity: 0.7 }}>{done ? WORDS.length : idx + 1}/{WORDS.length}</span>
      </div>

      {done ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <Chick mood="cheer" size={150} reduce={reduce} />
          <div className="serif text-[24px]">{WORDS.length}/{WORDS.length} · {t.done}</div>
          <motion.button
            type="button"
            onClick={reset}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            whileHover={hover}
            className="min-h-[48px] min-w-[140px] rounded-full px-6 text-[15px] font-semibold"
            style={{ ...BTN, background: INK, color: '#FBEBD4' }}
          >
            {t.again}
          </motion.button>
        </div>
      ) : (
        <>
          <div className="mt-4 h-[250px]" style={{ perspective: 1100 }}>
            <motion.div
              className="relative h-full w-full"
              initial={false}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={reduce ? { duration: 0 } : SPRING}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <button
                type="button"
                onClick={flip}
                disabled={flipped}
                aria-label={`${w.jp} — ${t.tap}`}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-[18px]"
                style={{ ...BTN, ...HIDE_BACK, background: CARD, border: '1px solid rgba(58,36,20,.14)', boxShadow: '0 10px 24px -14px rgba(58,36,20,.5)', color: INK }}
              >
                <span className="font-semibold leading-none" style={{ fontSize: w.jp.length > 2 ? 52 : 78 }}>{w.jp}</span>
                <span className="mono" style={{ opacity: 0.55 }}>{t.tap}</span>
              </button>

              <div
                aria-hidden={!flipped}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[18px]"
                style={{ ...HIDE_BACK, transform: 'rotateY(180deg)', background: CARD, border: '1px solid rgba(58,36,20,.14)', boxShadow: '0 10px 24px -14px rgba(58,36,20,.5)' }}
              >
                <span className="serif text-[34px] leading-none">{bw.romaji}</span>
                <span className="text-[24px] font-semibold">{bw[lang]}</span>
                {stamped && (
                  <motion.div
                    key={backIdx}
                    initial={{ scale: 1.9, opacity: 0, rotate: -10 }}
                    animate={{ scale: reduce ? 1 : [1.9, 0.94, 1], opacity: 1, rotate: -10 }}
                    transition={reduce ? { duration: 0 } : { scale: { duration: 0.45, times: [0, 0.65, 1], ease: 'easeOut' }, opacity: { duration: 0.2 }, rotate: { duration: 0 } }}
                    className="absolute bottom-4 right-4 flex h-[64px] w-[64px] items-center justify-center rounded-full text-[30px] font-bold"
                    style={{ border: `2px solid ${RED}`, color: RED, boxShadow: `inset 0 0 0 3px ${CARD}, inset 0 0 0 4.5px ${RED}`, pointerEvents: 'none' }}
                  >
                    覚
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="mt-4 flex h-[52px] gap-3">
            {flipped && (
              <>
                {[
                  { label: t.no, onClick: notYet, solid: false },
                  { label: t.yes, onClick: gotIt, solid: true },
                ].map((b) => (
                  <motion.button
                    key={b.label}
                    type="button"
                    onClick={b.onClick}
                    disabled={stamped}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileTap={reduce ? undefined : { scale: 0.96 }}
                    whileHover={hover}
                    className="min-h-[48px] flex-1 rounded-full px-3 text-[15px] font-semibold disabled:opacity-60"
                    style={{ ...BTN, background: b.solid ? INK : 'transparent', color: b.solid ? '#FBEBD4' : INK, border: `1.5px solid ${INK}` }}
                  >
                    {b.label}
                  </motion.button>
                ))}
              </>
            )}
          </div>

          <div className="relative flex-1">
            <div className="absolute bottom-3 left-0 flex gap-1.5" aria-hidden="true">
              {WORDS.map((_, i) => (
                <span key={i} className="h-[7px] w-[7px] rounded-full" style={{ background: INK, opacity: i <= idx ? 0.75 : 0.18 }} />
              ))}
            </div>
            <div className="absolute bottom-0 right-0">
              <Chick mood={mood} size={96} reduce={reduce} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
