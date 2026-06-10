'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { ArrowRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  image?: string
  liveUrl?: string
  githubUrl?: string
  tags: string[]
  badge?: string
  badgeColor?: string
}

// PLACEHOLDER projects — replace these with your real projects
const projects: Project[] = [
  {
    title: 'DocuAI',
    description:
      'AI-powered PDF analyzer built with Next.js and Claude. Upload any document to get instant summaries, key points, and an interactive Q&A chat interface.',
    liveUrl: '#', // PLACEHOLDER
    githubUrl: 'https://github.com/thebuildingjack/docuai',
    tags: ['Next.js', 'TypeScript', 'Anthropic SDK', 'Supabase', 'Clerk', 'shadcn/ui'],
    badge: 'AI',
    badgeColor: '#7c3aed',
  },
  {
    title: 'ChainPulse AI',
    description:
      'Full-stack Solana AI agent for the Buildifi hackathon. Monitors on-chain data and surfaces AI-generated signals via a Next.js frontend + Express API.',
    liveUrl: '#', // PLACEHOLDER
    githubUrl: 'https://github.com/thebuildingjack/chainpulse-ai',
    tags: ['Next.js', 'TypeScript', 'Solana', 'Express', 'Groq AI', 'Vercel'],
    badge: 'Web3',
    badgeColor: '#9945FF',
  },
  {
    title: 'MVTINY – Polo Club',
    description:
      'Luxury streetwear brand website. Built a sleek, responsive product showcase with custom hero layout and modern animations.',
    liveUrl: '#', // PLACEHOLDER
    githubUrl: '#', // PLACEHOLDER
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    badge: 'Client',
    badgeColor: '#d97706',
  },
  // PLACEHOLDER — add more projects here
  {
    title: 'Your Next Project',
    description:
      'PLACEHOLDER — describe your project here. What problem does it solve? What technologies did you use? What makes it interesting?',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'TypeScript', 'Add', 'Your', 'Stack'],
    badge: 'WIP',
    badgeColor: '#059669',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="dashed-card overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row gap-0">
        {/* Screenshot / preview */}
        <div
          className="relative sm:w-56 flex-shrink-0 overflow-hidden"
          style={{
            background: 'hsl(var(--tag-bg))',
            borderRight: '1px dashed hsl(var(--card-border))',
            minHeight: '140px',
          }}
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center" style={{ color: 'hsl(var(--muted))' }}>
                <div
                  className="w-16 h-12 mx-auto mb-2 rounded"
                  style={{ background: 'hsl(var(--border))' }}
                />
                <p className="text-xs">Preview</p>
              </div>
            </div>
          )}
          {/* Badge top-left */}
          {project.badge && (
            <span
              className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded font-semibold"
              style={{
                background: `${project.badgeColor}22`,
                color: project.badgeColor,
                border: `1px solid ${project.badgeColor}44`,
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
              }}
            >
              {project.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h3 className="font-semibold text-sm">{project.title}</h3>
            <div className="flex items-center gap-2">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn text-xs"
                >
                  <ExternalLink size={11} />
                  Live
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn text-xs"
                >
                  <SiGithub size={11} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--foreground) / 0.75)' }}>
            {project.description}
          </p>

          <div className="mt-auto">
            <p className="text-xs mb-2" style={{ color: 'hsl(var(--muted))', fontFamily: 'DM Mono, monospace' }}>
              Technologies Used:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    background: 'hsl(var(--tag-bg))',
                    border: '1px solid hsl(var(--tag-border))',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.7rem',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-7"
        >
          <span className="bracket-heading text-sm">My Projects</span>
        </motion.div>

        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-end mt-6"
        >
          <a
            href="https://github.com/thebuildingjack"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn text-xs"
          >
            More Projects
            <ArrowRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
