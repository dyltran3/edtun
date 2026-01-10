'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useSimulationStore } from '@/store/simulationStore'

interface P5CanvasProps {
  sketch: (p: any) => void
  width?: number
  height?: number
}

const P5Canvas: React.FC<P5CanvasProps> = ({ 
  sketch, 
  width = 600, 
  height = 400 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setP5Instance } = useSimulationStore()

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Dynamically import p5
    import('p5').then((p5Module) => {
      const p5 = p5Module.default

      // Create new p5 instance
      const p5Instance = new p5((p: any) => {
        p.createCanvas(width, height)
        sketch(p)
      }, containerRef.current!)

      setP5Instance(p5Instance)

      // Cleanup
      return () => {
        p5Instance.remove()
        setP5Instance(null)
      }
    })
  }, [sketch, width, height, setP5Instance])

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center bg-white border rounded-lg"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default P5Canvas