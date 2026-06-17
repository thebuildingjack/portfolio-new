'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

const MONTHS_DISPLAY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKS = 52
const DAYS = 7

function generateGrid() {
  const grid: number[][] = []
  let seed = 42
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff
    return Math.abs(seed) / 0xffffffff
  }
  for (let w = 0; w < WEEKS; w++) {
    const week: number[] = []
    for (let d = 0; d < DAYS; d++) {
      const r = rng()
      const recent = w > 36
      const veryRecent = w > 44
      if (r < (veryRecent ? 0.18 : recent ? 0.28 : 0.45)) week.push(0)
      else if (r < (veryRecent ? 0.38 : recent ? 0.48 : 0.64)) week.push(1)
      else if (r < (veryRecent ? 0.60 : recent ? 0.68 : 0.78)) week.push(2)
      else if (r < (veryRecent ? 0.80 : recent ? 0.84 : 0.90)) week.push(3)
      else week.push(4)
    }
    grid.push(week)
  }
  return grid
}

function getMonthLabels(): Array<{ label: string; weekIdx: number }> {
  const labels: Array<{ label: string; weekIdx: number }> = []
  const today = new Date()
  for (let i = 0; i < 12; i++) {
    const d = new Date(today)
    d.setMonth(today.getMonth() - (11 - i))
    const weekIdx = Math.round((i / 12) * WEEKS)
    labels.push({ label: MONTHS_DISPLAY[d.getMonth()], weekIdx })
  }
  return labels
}

export default function GitHubGraph() {
  const grid = useMemo(() => generateGrid(), [])
  const monthLabels = useMemo(() => getMonthLabels(), [])
  const totalContributions = useMemo(() => {
    return grid.reduce((sum, week) => sum + week.reduce((s, d) => s + (d > 0 ? d * 3 + 1 : 0), 0), 0)
  }, [grid])

  return (
    <section className="w-full relative z-10 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="dashed-card p-5"
        >
          <div className="overflow-x-auto scrollbar-none">
            <div style={{ minWidth: `${WEEKS * 13}px` }}>
              {/* Month row */}
              <div className="flex mb-1.5">
                {monthLabels.map((m, i) => {
                  const nextIdx = monthLabels[i + 1]?.weekIdx ?? WEEKS
                  const width = (nextIdx - m.weekIdx) * 13
                  return (
                    <div
                      key={i}
                      style={{
                        width: `${width}px`,
                        flexShrink: 0,
                        color: 'hsl(var(--muted))',
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.62rem',
                      }}
                    >
                      {m.label}
                    </div>
                  )
                })}
              </div>

              {/* Grid */}
              <div className="flex gap-px">
                {grid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-px">
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        className={`contrib-cell contrib-bg-${level}`}
                        title={`${level === 0 ? 'No' : level} contribution${level !== 1 ? 's' : ''}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <p className="text-xs" style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace', fontSize: '0.7rem' }}>
              This year, I achieved{' '}
              <span style={{ color: 'hsl(var(--foreground))' }}>{totalContributions.toLocaleString()} contributions</span>
            </p>
            <div className="flex items-center gap-1.5">
              <span style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace', fontSize: '0.62rem' }}>Less</span>
              {[0, 1, 2, 3, 4].map((l) => (
                <div key={l} className={`contrib-level w-2.5 h-2.5 rounded-sm`} data-level={String(l)} />
              ))}
              <span style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace', fontSize: '0.62rem' }}>More</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
