'use client'

import { motion } from 'framer-motion'
import { SiGithub, SiX } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { Mail, FileText } from 'lucide-react'

const socials = [
  { icon: SiX, label: 'Twitter / X', href: 'https://x.com/thebuildingjack' },
  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/thebuildingjack' },
  { icon: FileText, label: 'Resume', href: 'https://docs.google.com/document/d/1QO8Oh6aEYbr9pxiNrAqIisSzv1pdLUoTR4erwdEaiR4/edit?usp=drivesdk' },/* 
  { icon: FaLinkedinIn, label: 'LinkedIn', href: '#' }, */
  { icon: Mail, label: 'Email', href: 'mailto:francis.i.authority@gmail.com' },
]

export default function Connect() {
  return (
    <section id="connect" className="relative z-10 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}  
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="dashed-card p-8 text-center"
        >
          <h2 className="text-xl font-semibold mb-2" style={{ letterSpacing: '-0.01em' }}>
            Let&apos;s Connect
          </h2>
          <p className="text-xs mb-7" style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace' }}>
            Feel free to reach out through any of these platforms
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {socials.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="social-btn"
                >
                  <Icon size={13} />
                  {s.label}
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
