'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Home, Briefcase, FolderOpen, Mail } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const navItems = [
  { icon: Home, label: 'Home', href: '#hero', type: 'link' as const },
  { icon: FolderOpen, label: 'Projects', href: '#projects', type: 'link' as const },
  { icon: Briefcase, label: 'Experience', href: '#experience', type: 'link' as const },
  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/thebuildingjack', type: 'external' as const },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/in/[your-linkedin]', type: 'external' as const },
  { icon: SiX, label: 'Twitter / X', href: 'https://x.com/[your-handle]', type: 'external' as const },
  { icon: Mail, label: 'Email', href: 'mailto:[your-email]', type: 'link' as const },
]

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full navbar-dock"
      style={{
        background: isDark ? 'rgba(15,15,15,0.88)' : 'rgba(245,245,245,0.88)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.55)' : '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      {navItems.map((item, i) => {
        const Icon = item.icon
        const isHovered = hoveredIdx === i
        return (
          <a
            key={i}
            href={item.href}
            target={item.type === 'external' ? '_blank' : undefined}
            rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            title={item.label}
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={{
              background: isHovered ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)') : 'transparent',
              transform: isHovered ? 'translateY(-3px) scale(1.12)' : 'translateY(0) scale(1)',
            }}
          >
            <Icon
              size={15}
              style={{ color: isHovered ? 'hsl(var(--accent))' : 'hsl(var(--muted))' }}
            />
            {isHovered && (
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap pointer-events-none"
                style={{
                  background: isDark ? 'rgba(25,25,25,0.95)' : 'rgba(245,245,245,0.95)',
                  border: `1px solid hsl(var(--border))`,
                  color: 'hsl(var(--foreground))',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.68rem',
                }}
              >
                {item.label}
              </span>
            )}
          </a>
        )
      })}

      <div className="w-px h-5 mx-1" style={{ background: 'hsl(var(--border))' }} />

      <button
        onClick={toggleTheme}
        onMouseEnter={() => setHoveredIdx(99)}
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
        style={{
          background: hoveredIdx === 99 ? (isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)') : 'transparent',
          transform: hoveredIdx === 99 ? 'translateY(-3px) scale(1.12)' : 'translateY(0) scale(1)',
        }}
      >
        {mounted ? (
          isDark
            ? <Sun size={15} style={{ color: hoveredIdx === 99 ? 'hsl(var(--accent))' : 'hsl(var(--muted))' }} />
            : <Moon size={15} style={{ color: hoveredIdx === 99 ? 'hsl(var(--accent))' : 'hsl(var(--muted))' }} />
        ) : <div className="w-4 h-4" />}
        {hoveredIdx === 99 && (
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded whitespace-nowrap pointer-events-none"
            style={{
              background: isDark ? 'rgba(25,25,25,0.95)' : 'rgba(245,245,245,0.95)',
              border: `1px solid hsl(var(--border))`,
              color: 'hsl(var(--foreground))',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.68rem',
            }}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        )}
      </button>
    </nav>
  )
}
