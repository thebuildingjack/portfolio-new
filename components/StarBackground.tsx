'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  twinkleOffset: number
  size: 'small' | 'medium' | 'large'
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const animRef = useRef<number>(0)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      starsRef.current = Array.from({ length: Math.min(count, 280) }, () => {
        const rand = Math.random()
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.7 + 0.1,
          speed: Math.random() * 0.004 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          size: rand < 0.7 ? 'small' : rand < 0.92 ? 'medium' : 'large',
        }
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isDark = resolvedTheme === 'dark'
      t += 0.012

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t + star.twinkleOffset) * 0.35 + 0.65
        const alpha = star.opacity * twinkle * (isDark ? 0.9 : 0.25)

        ctx.beginPath()

        if (star.size === 'large') {
          // Cross/plus shaped larger stars
          const s = star.radius * 2.2
          ctx.save()
          ctx.translate(star.x, star.y)
          ctx.strokeStyle = isDark
            ? `rgba(255,255,255,${alpha})`
            : `rgba(0,0,0,${alpha})`
          ctx.lineWidth = 0.6
          ctx.beginPath()
          ctx.moveTo(-s, 0)
          ctx.lineTo(s, 0)
          ctx.moveTo(0, -s)
          ctx.lineTo(0, s)
          ctx.stroke()
          ctx.restore()
        } else {
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
          ctx.fillStyle = isDark
            ? `rgba(255,255,255,${alpha})`
            : `rgba(30,30,30,${alpha})`
          ctx.fill()
        }
      })

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(document.documentElement)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
