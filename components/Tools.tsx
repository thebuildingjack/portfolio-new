'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript,
  SiJavascript, SiNodedotjs, SiExpress, SiMongodb,
  SiSupabase, SiPrisma, SiDocker, SiGit, SiGithub,
  SiPostgresql, SiFirebase, SiFigma, SiVercel, SiSolana,
  SiFramer, SiThreedotjs, SiTon
} from 'react-icons/si'
import { TbBrandVscode } from 'react-icons/tb'

const tools = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#68A063' },
  { name: 'Express.js', Icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Prisma', Icon: SiPrisma, color: '#2D3748' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'GitHub', Icon: SiGithub, color: '#ffffff' },
  /* { name: 'Firebase', Icon: SiFirebase, color: '#FFCA28' }, */
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { name: 'Vercel', Icon: SiVercel, color: '#ffffff' },
  { name: 'Solana', Icon: SiSolana, color: '#9945FF' },
  { name: 'Ton', Icon: SiTon, color: '#0055FF' },
  { name: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
  /* { name: 'Three.js', Icon: SiThreedotjs, color: '#ffffff' }, */
  { name: 'VS Code', Icon: TbBrandVscode, color: '#007ACC' },
]

const ENTRANCE_INITIAL = { opacity: 0, scale: 0.88 }
const ENTRANCE_VISIBLE = { opacity: 1, scale: 1 }
const DRAG_SCALE = { scale: 1.08, zIndex: 50, cursor: 'grabbing' as const }

function DraggablePill({ name, Icon, color, delay }: {
  name: string
  Icon: React.ComponentType<{ size?: number; color?: string }>
  color: string
  delay: number
}) {
  return (
    <motion.div
      drag
      dragElastic={0.08}
      dragMomentum={false}
      dragSnapToOrigin={false}
      whileDrag={DRAG_SCALE}
      initial={ENTRANCE_INITIAL}
      whileInView={ENTRANCE_VISIBLE}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="tool-pill select-none"
      style={{ position: 'relative', zIndex: 1 }}
      // ✅ NEW — kills the browser's native HTML5 drag-and-drop
      // before it can hijack the gesture from Framer Motion.
      // This is the actual fix: native drag has its own "snap
      // back to origin if no valid drop target" behavior that
      // runs completely outside Framer Motion's control.
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <Icon size={15} color={color} />
      <span className="text-xs">{name}</span>
    </motion.div>
  )
}

export default function Tools() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="tools" className="relative z-10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h2 className="display-title">Tools that I&apos;ve used</h2>

          <div
            className="absolute top-0 right-0 flex flex-col items-end gap-0.5 pointer-events-none"
            style={{ color: 'hsl(var(--muted))' }}
          >
            <span className="text-xs" style={{ fontFamily: 'DM Mono, monospace' }}>drag me!</span>
            <svg width="36" height="12" viewBox="0 0 36 12" fill="none">
              <path
                d="M2 6 Q12 2 24 6 Q28 7.5 34 6"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 2"
                fill="none"
              />
              <path d="M30 3 L34 6 L30 9" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </motion.div>

        <div
          ref={containerRef}
          className="flex flex-wrap gap-2.5"
          style={{ minHeight: '120px' }}
        >
          {tools.map((tool, i) => (
            <DraggablePill
              key={tool.name}
              name={tool.name}
              Icon={tool.Icon}
              color={tool.color}
              delay={i * 0.03}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
