'use client'

import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, MapPin } from 'lucide-react'

interface Experience {
  company: string
  companyUrl?: string
  role: string
  period: string
  location: string
  status: 'Completed' | 'Current' | 'Ongoing'
  logo?: string
  bullets: string[]
}

// PLACEHOLDER — replace with your actual experience
const experiences: Experience[] = [
  {
    company: 'Ophir',
    companyUrl: 'https://x.com/instituteophir',
    role: 'Frontend Engineer',
    period: 'Mar 2023 – Aug 2023',
    location: 'Remote',
    status: 'Completed',
    bullets: [
      'Built responsive user interfaces BlockPay using Next.js and Javascript.',
      'Collaborated with designers and stakeholders to implement product requirements.',
      'Improved usability and responsiveness arcoss multiple user-facing pages.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Frontend Engineer',
    period: 'Aug 2023 – Present',
    location: 'Lagos, NG (Remote)',
    status: 'Current',
    bullets: [
      'Built modern frontend interfaces for clients Saas and Web3 products using React, Next.js and TypeScript.',
      'Delivered responsive dashboards, landing pages and user-facing features for clients',
      'Collaborated with teams to transform product requirements into production-ready interfaces.',
    ],
  },
]

const statusColors: Record<string, { bg: string; dot: string; text: string }> = {
  Completed: { bg: 'hsl(142 71% 45% / 0.1)', dot: 'hsl(142 71% 45%)', text: 'hsl(142 71% 45%)' },
  Current: { bg: 'hsl(217 91% 60% / 0.1)', dot: 'hsl(217 91% 60%)', text: 'hsl(217 91% 60%)' },
  Ongoing: { bg: 'hsl(38 92% 50% / 0.1)', dot: 'hsl(38 92% 50%)', text: 'hsl(38 92% 50%)' },
}

export default function WorkExperience() {
  return (
    <section id="experience" className="w-full relative z-10 py-10 flex flex-col items-center justify-center">
      <div className=" w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex justify-start"
        >
          <span className="bracket-heading text-sm">Work Experience</span>
        </motion.div>

        <div className="flex flex-col gap-4">
          {experiences.map((exp, i) => {
            const sc = statusColors[exp.status]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="dashed-card p-5"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  {/* Left */}
                  <div className="flex justify-between w-full">
                    <div className="flex items-start justify-between gap-3">
                      {/* Company icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: 'hsl(var(--tag-bg))',
                          border: '1px solid hsl(var(--border))',
                        }}
                      >
                        <Briefcase size={16} style={{ color: 'hsl(var(--muted))' }} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-xs" style={{ color: 'hsl(var(--foreground))' }}>
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline underline-offset-4 inline-flex items-center gap-1"
                                style={{ color: 'hsl(var(--foreground))' }}
                              >
                                {exp.company}
                                <ExternalLink size={11} style={{ color: 'hsl(var(--muted))' }} />
                              </a>
                            ) : (
                              exp.company
                            )}
                          </span>
                          <span
                            className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: sc.bg,
                              color: sc.text,
                              border: `1px solid ${sc.dot}40`,
                            }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
                            {exp.status}
                          </span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted))' }}>
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Right — period + location */}
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                        {exp.period}
                      </p>
                      <p className="text-xs flex items-center justify-end gap-1 mt-0.5" style={{ color: 'hsl(var(--muted))' }}>
                        <MapPin size={10} />
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  {exp.bullets.length > 0 && (
                    <ul className="flex flex-col gap-1 pl-1">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-xs flex items-center gap-2"
                          style={{ color: 'hsl(var(--foreground) / 0.8)' }}
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'hsl(var(--muted))' }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
