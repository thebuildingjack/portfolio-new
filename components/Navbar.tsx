'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Home, Briefcase, FolderOpen, Mail } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const navItems = [
  { icon: Home,         label: 'Home',        href: '#hero',                                    external: false },
  { icon: FolderOpen,   label: 'Projects',    href: '#projects',                                external: false },
  { icon: Briefcase,    label: 'Experience',  href: '#experience',                              external: false },
  { icon: SiGithub,     label: 'GitHub',      href: 'https://github.com/thebuildingjack',       external: true  },/* 
  { icon: FaLinkedinIn, label: 'LinkedIn',    href: 'https://linkedin.com/in/thebuildingjack',  external: true  }, */
  { icon: SiX,          label: 'Twitter / X', href: 'https://x.com/thebuildingjack',             external: true  },
  { icon: Mail,         label: 'Email',       href: 'mailto:francis.i.authority@gmail.com',                      external: false },
]

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted]       = useState(false)
  const [hovered, setHovered]       = useState<number | null>(null)

  // ✅ Key fix: only read resolvedTheme AFTER hydration
  // This prevents the server (light default) vs client (dark preference) mismatch
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  // ✅ Stable server-safe fallback — matches what next-themes SSRs (dark default)
  const dockStyle: React.CSSProperties = {
    background: isDark ? 'rgba(15,15,15,0.88)'     : mounted ? 'rgba(245,245,245,0.88)' : 'rgba(15,15,15,0.88)',
    border:     isDark ? '1px solid rgba(255,255,255,0.1)' : mounted ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
    boxShadow:  isDark ? '0 8px 32px rgba(0,0,0,0.55)'    : mounted ? '0 8px 32px rgba(0,0,0,0.1)' : '0 8px 32px rgba(0,0,0,0.55)',
  }

  const tooltipStyle: React.CSSProperties = {
    background: isDark ? 'rgba(25,25,25,0.95)' : 'rgba(245,245,245,0.95)',
    border:     '1px solid hsl(var(--border))',
    color:      'hsl(var(--foreground))',
    fontFamily: 'DM Mono, monospace',
    fontSize:   '0.68rem',
  }

  const iconColor = (idx: number) =>
    hovered === idx ? 'hsl(var(--accent))' : 'hsl(var(--muted))'

  const btnStyle = (idx: number): React.CSSProperties => ({
    background: hovered === idx
      ? isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'
      : 'transparent',
    transform: hovered === idx ? 'translateY(-3px) scale(1.12)' : 'translateY(0) scale(1)',
  })

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-xl navbar-dock"
      style={dockStyle}
      suppressHydrationWarning
    >
      {navItems.map((item, i) => {
        const Icon = item.icon
        return (
          <a
            key={i}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            title={item.label}
            className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
            style={btnStyle(i)}
          >
            <Icon size={15} style={{ color: iconColor(i) }} />
            {hovered === i && (
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded whitespace-nowrap pointer-events-none"
                style={tooltipStyle}
              >
                {item.label}
              </span>
            )}
          </a>
        )
      })}

      {/* Divider */}
      <div className="w-px h-5 mx-1" style={{ background: 'hsl(var(--border))' }} />

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        onMouseEnter={() => setHovered(99)}
        onMouseLeave={() => setHovered(null)}
        className="relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
        style={btnStyle(99)}
        aria-label="Toggle theme"
      >
        {/* ✅ Render blank until mounted — avoids icon flash & mismatch */}
        {mounted ? (
          isDark
            ? <Sun  size={15} style={{ color: iconColor(99) }} />
            : <Moon size={15} style={{ color: iconColor(99) }} />
        ) : (
          <div className="w-4 h-4" />
        )}
        {hovered === 99 && (
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded whitespace-nowrap pointer-events-none"
            style={tooltipStyle}
          >
            {isDark ? 'Light mode' : 'Dark mode'}
          </span>
        )}
      </button>
    </nav>
  )
}
