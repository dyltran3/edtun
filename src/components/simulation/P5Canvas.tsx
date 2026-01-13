// src/components/simulation/P5Canvas.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import { useSimulationStore } from '@/store/simulationStore'
// Import type cho p5 nếu cần, hoặc dùng any nếu thư viện type chưa tương thích
import type p5Types from 'p5' 

interface P5CanvasProps {
  sketch: (p: p5Types) => void
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
  // Dùng ref để giữ instance, tránh phụ thuộc vào state của store để cleanup
  const p5InstanceRef = useRef<p5Types | null>(null)

  useEffect(() => {
    // Chỉ chạy ở client side
    if (typeof window === 'undefined' || !containerRef.current) return

    let mounted = true

    const initP5 = async () => {
      try {
        // Dynamic import p5 để tránh lỗi "window is not defined" khi build
        const p5Module = (await import('p5')).default
        
        if (!mounted) return

        // Xóa instance cũ nếu tồn tại (phòng trường hợp strict mode)
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove()
        }

        const newP5Instance = new p5Module((p: p5Types) => {
          // Cho phép sketch người dùng override setup/draw, nhưng luôn đảm bảo có canvas
          sketch(p)

          const originalSetup = p.setup
          p.setup = () => {
            p.createCanvas(width, height)
            if (originalSetup) {
              originalSetup()
            }
          }

          // Nếu sketch không định nghĩa draw, tạo draw rỗng để tránh lỗi
          if (!p.draw) {
            p.draw = () => {}
          }
        }, containerRef.current!)

        p5InstanceRef.current = newP5Instance
        setP5Instance(newP5Instance) // Lưu vào store
      } catch (error) {
        console.error("Error initializing P5:", error)
      }
    }

    initP5()

    // Cleanup function
    return () => {
      mounted = false
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
        setP5Instance(null)
      }
    }
  }, [sketch, width, height, setP5Instance])

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center bg-white dark:bg-gray-900 border rounded-lg overflow-hidden"
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
    />
  )
}

export default P5Canvas