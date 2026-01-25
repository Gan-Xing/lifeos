'use client'

import { useEffect, useRef } from 'react'

type RGBA = { r: number; g: number; b: number; a: number }

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  opacity: number
  kind: 'snow' | 'bubble'
}

const parseRgba = (input: string): RGBA | null => {
  const match = input.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)/i)
  if (!match) return null
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: Number(match[4]),
  }
}

const rgba = (rgb: RGBA, alpha: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`

export default function SignalField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    let frame = 0
    const particles: Particle[] = []
    const mouse = { x: 0.5, y: 0.5, lastMove: 0 }

    const themeMap: Record<string, { snow: RGBA; bubble: RGBA }> = {
      onyx: {
        snow: { r: 213, g: 247, b: 255, a: 0.75 },
        bubble: { r: 125, g: 230, b: 255, a: 0.45 },
      },
      ember: {
        snow: { r: 255, g: 235, b: 220, a: 0.8 },
        bubble: { r: 255, g: 184, b: 142, a: 0.45 },
      },
      arctic: {
        snow: { r: 90, g: 130, b: 210, a: 0.75 },
        bubble: { r: 170, g: 210, b: 255, a: 0.45 },
      },
      ivory: {
        snow: { r: 122, g: 175, b: 255, a: 0.7 },
        bubble: { r: 173, g: 224, b: 255, a: 0.45 },
      },
    }

    const updateTheme = () => {
      const themeId = document.documentElement.dataset.theme ?? 'onyx'
      const explicit = themeMap[themeId]
      if (explicit) return explicit

      const rootStyles = getComputedStyle(document.documentElement)
      const snow = parseRgba(rootStyles.getPropertyValue('--anim-snow').trim()) ?? themeMap.onyx.snow
      const bubble = parseRgba(rootStyles.getPropertyValue('--anim-bubble').trim()) ?? themeMap.onyx.bubble
      return { snow, bubble }
    }

    let theme = updateTheme()

    const observer = new MutationObserver(() => {
      theme = updateTheme()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * window.devicePixelRatio)
      canvas.height = Math.floor(window.innerHeight * window.devicePixelRatio)
    }

    const spawnParticles = () => {
      particles.length = 0
      const snowCount = Math.max(54, Math.floor(window.innerWidth / 16))
      const bubbleCount = Math.max(12, Math.floor(window.innerWidth / 120))

      for (let i = 0; i < snowCount; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.18,
          vy: 0.3 + Math.random() * 0.7,
          radius: 1.2 + Math.random() * 2.8,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.7 + Math.random() * 0.3,
          kind: 'snow',
        })
      }

      for (let i = 0; i < bubbleCount; i += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: 18 + Math.random() * 38,
          phase: Math.random() * Math.PI * 2,
          opacity: 0.6 + Math.random() * 0.35,
          kind: 'bubble',
        })
      }
    }

    const drawSnowflake = (x: number, y: number, size: number, angle: number, color: string) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.lineCap = 'round'

      const branchAngles = Math.PI / 3
      const branchStops = [0.35, 0.6, 0.82]
      const branchLens = [0.28, 0.22, 0.16]

      for (let i = 0; i < 6; i += 1) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(size, 0)
        ctx.stroke()

        branchStops.forEach((stop, idx) => {
          const branchLen = size * branchLens[idx]
          ctx.save()
          ctx.translate(size * stop, 0)
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(branchLen * Math.cos(branchAngles), branchLen * Math.sin(branchAngles))
          ctx.moveTo(0, 0)
          ctx.lineTo(branchLen * Math.cos(-branchAngles), branchLen * Math.sin(-branchAngles))
          ctx.stroke()
          ctx.restore()
        })

        ctx.rotate(Math.PI / 3)
      }
      ctx.restore()
    }

    const draw = () => {
      frame += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      const { snow, bubble } = theme

      const now = performance.now()
      const mouseActive = now - mouse.lastMove < 800
      const mouseX = mouse.x * window.innerWidth
      const mouseY = mouse.y * window.innerHeight

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (mouseActive) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180 && dist > 1) {
            const force = (1 - dist / 180) * 0.8
            if (p.kind === 'bubble') {
              p.vx += (dx / dist) * force * 0.02
              p.vy += (dy / dist) * force * 0.02
            } else {
              p.vx += (dx / dist) * force * 0.01
            }
          }
        }

        if (p.kind === 'snow') {
          if (p.y > window.innerHeight + 10) {
            p.y = -10
            p.x = Math.random() * window.innerWidth
          }
          if (p.x < -10) p.x = window.innerWidth + 10
          if (p.x > window.innerWidth + 10) p.x = -10

          const size = p.radius * 2.6
          const angle = p.phase + frame * 0.002
          const color = rgba(snow, Math.min(1, snow.a * p.opacity))
          drawSnowflake(p.x, p.y, size, angle, color)
          return
        }

        if (p.x - p.radius < 0 || p.x + p.radius > window.innerWidth) {
          p.vx *= -1
        }
        if (p.y - p.radius < 0 || p.y + p.radius > window.innerHeight) {
          p.vy *= -1
        }

        const gradient = ctx.createRadialGradient(
          p.x - p.radius * 0.35,
          p.y - p.radius * 0.35,
          p.radius * 0.2,
          p.x,
          p.y,
          p.radius,
        )
        gradient.addColorStop(0, rgba(bubble, Math.min(1, p.opacity)))
        gradient.addColorStop(0.35, rgba(bubble, Math.min(0.7, p.opacity * 0.7)))
        gradient.addColorStop(0.65, rgba(bubble, Math.min(0.3, p.opacity * 0.3)))
        gradient.addColorStop(1, rgba(bubble, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = rgba(bubble, Math.min(0.8, p.opacity * 0.8))
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.stroke()

        const highlight = ctx.createRadialGradient(
          p.x - p.radius * 0.5,
          p.y - p.radius * 0.5,
          0,
          p.x - p.radius * 0.5,
          p.y - p.radius * 0.5,
          p.radius * 0.5,
        )
        highlight.addColorStop(0, rgba(bubble, 0.7))
        highlight.addColorStop(1, rgba(bubble, 0))
        ctx.fillStyle = highlight
        ctx.beginPath()
        ctx.arc(p.x - p.radius * 0.35, p.y - p.radius * 0.35, p.radius * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.restore()
      animationId = window.requestAnimationFrame(draw)
    }

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth
      mouse.y = event.clientY / window.innerHeight
      mouse.lastMove = performance.now()
    }

    resize()
    spawnParticles()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', () => {
      resize()
      spawnParticles()
    })

    draw()

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
