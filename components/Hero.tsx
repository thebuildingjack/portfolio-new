'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'
import { Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

// Tech badge inline component
function TechBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="tech-inline">
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  )
}

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-NG', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{time} WAT</span>
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="w-full relative z-10 pt-20 pb-8 flex flex-col items-center justify-center"
    >
      <div className=" w-full mx-auto flex flex-col items-start justify-center gap-3">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-start gap-6"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative shrink-0 flex gap-3"
          >
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden relative"
              style={{ border: '1px solid hsl(var(--border))' }}
            >
              {/* Placeholder avatar */}
              {/* <div
                className="w-full h-full flex items-center justify-center text-3xl font-bold"
                style={{ background: 'hsl(var(--tag-bg))', color: 'hsl(var(--muted))' }}
              >
                F
              </div> */}
              {/* Replace the div above with this once you have a photo: */}
              <Image loading='eager' width={112} height={112} src="/thebuildingjackpfp.png" alt="Francis" className="object-cover" />
            </div>
            {/* Small badge bottom-right */}
            <div
              className="absolute bottom-[0.5px] left-22 w-6 h-6 rounded-md flex items-center justify-center text-xs"
              style={{
                background: 'hsl(var(--tag-bg))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              ⚡
            </div>
            <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-1.5"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                Francis {/* PLACEHOLDER: replace with your full name */}
              </h1>
              {/* Available for work badge */}
              <span
                className="avail-badge flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: 'hsl(142 71% 45% / 0.12)',
                  border: '1px solid hsl(142 71% 45% / 0.4)',
                  color: 'hsl(var(--accent))',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'hsl(var(--accent))' }}
                />
                Available for work
              </span>
            </div>

            <p
              className="text-sm font-medium"
              style={{ color: 'hsl(var(--accent))' }}
            >
              @thebuildingjack {/* PLACEHOLDER: your handle */}
            </p>

            <a
              href="https://github.com/thebuildingjack/docuai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm w-fit hover:underline underline-offset-4 transition-all"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              Building DocuAI {/* PLACEHOLDER: your current project */}
              <ExternalLink size={12} style={{ color: 'hsl(var(--muted))' }} />
            </a>

            <div className="flex flex-wrap items-center gap-3 text-xs mt-0.5" style={{ color: 'hsl(var(--muted))' }}>
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                Lagos, Nigeria {/* PLACEHOLDER */}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                <LiveClock />
              </span>
            </div>
          </motion.div>
        </motion.div>

          {/* Info */}
          
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-7 text-sm leading-relaxed max-w-2xl"
          style={{ color: 'hsl(var(--foreground) / 0.82)', lineHeight: '1.85' }}
        >
          {/* PLACEHOLDER: write your own bio below */}
          Yup! I&apos;m a <TechBadge icon="⚡" label="Frontend Engineer" /> turning designs into fast, polished
          products. But wait — there&apos;s more! I&apos;m actively growing into full-stack with{' '}
          <TechBadge icon="🔷" label="TypeScript" />, <TechBadge icon="⚛️" label="React" />, and{' '}
          <TechBadge icon="▲" label="Next.js" />, building on{' '}
          <TechBadge icon="🟢" label="Node.js" /> backends with <TechBadge icon="🗄️" label="Supabase" />.
          I also ship <TechBadge icon="🌐" label="Web3" /> products and live on the{' '}
          <TechBadge icon="⬛" label="terminal" /> mostly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="flex flex-wrap items-center gap-2 mt-6"
        >
          <a
            href="https://x.com/thebuildingjack"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <SiX size={13} />
            Twitter DM
          </a>
          <span className="text-xs" style={{ color: 'hsl(var(--muted))' }}>OR</span>
          <a
            href="mailto:francis.i.authority@gmail.com"
            className="social-btn"
          >
            <Mail size={13} />
            Email Me
          </a>
          <span style={{ color: 'hsl(var(--border))' }}>|</span>
          <a
            href="https://github.com/thebuildingjack"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <SiGithub size={13} />
            Github
          </a>
          <a
            href="[your-resume-link]" /* PLACEHOLDER */
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
          >
            <span className="text-xs">📄</span>
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
