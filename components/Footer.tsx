'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Simple local view counter (replace with a real analytics solution like Umami/Vercel Analytics)
function useViewCount() {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // PLACEHOLDER: integrate real analytics here
    // For now, just shows a static number
    setViews(42) // replace with actual API call
  }, [])

  return views
}

export default function Footer() {
  const views = useViewCount()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 pb-24 px-4 pt-6">
      <div className="max-w-3xl mx-auto">
        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'hsl(var(--border))' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <blockquote
            className="text-sm italic"
            style={{ color: 'hsl(var(--foreground) / 0.65)', fontFamily: 'DM Mono, monospace' }}
          >
            {/* PLACEHOLDER: put your own quote here */}
            &ldquo;Ship it. Then make it better.&rdquo;
          </blockquote>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center text-xs mb-6"
          style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace' }}
        >
          Designed & Made with ❤️
        </motion.div>

        <div
          className="flex items-center justify-between text-xs"
          style={{
            color: 'hsl(var(--muted))',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
          }}
        >
          <span>{year}. All rights reserved</span>
          {views !== null && (
            <span>Views #{views.toLocaleString()}</span>
          )}
        </div>
      </div>
    </footer>
  )
}
