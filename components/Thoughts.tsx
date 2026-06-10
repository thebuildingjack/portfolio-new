'use client'

import { motion } from 'framer-motion'

export default function Thoughts() {
  return (
    <section className="relative z-10 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="bracket-heading text-sm">Thoughts in words.</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="dashed-card p-5"
        >
          <p className="text-sm" style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
            Want to read my thoughts on building software, Web3, and the developer journey?{' '}
            <a
              href="#" /* PLACEHOLDER: link to your blog or hashnode */
              className="underline underline-offset-4 hover:opacity-70 transition-opacity"
              style={{ color: 'hsl(var(--foreground))' }}
            >
              My Blog
            </a>{' '}
            page.{/* PLACEHOLDER: add your blog platform link */}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
