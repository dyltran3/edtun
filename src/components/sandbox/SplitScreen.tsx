'use client'

import React, { useState } from 'react'

interface SplitScreenProps {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
  defaultLeftSize?: number
  minLeftSize?: number
  minRightSize?: number
}

export const SplitScreen: React.FC<SplitScreenProps> = ({
  leftPanel,
  rightPanel,
  defaultLeftSize = 50,
  minLeftSize = 30,
  minRightSize = 30,
}) => {
  const [leftSize, setLeftSize] = useState(defaultLeftSize)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const newLeftSize = ((e.clientX - rect.left) / rect.width) * 100

    if (newLeftSize >= minLeftSize && 100 - newLeftSize >= minRightSize) {
      setLeftSize(newLeftSize)
    }
  }

  return (
    <div 
      className="h-full w-full flex"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Left Panel */}
      <div 
        style={{ width: `${leftSize}%` }}
        className="h-full overflow-auto bg-background border-r"
      >
        {leftPanel}
      </div>

      {/* Divider */}
      <div
        onMouseDown={handleMouseDown}
        className={`w-1 bg-gray-200 hover:bg-blue-400 transition-colors ${
          isDragging ? 'bg-blue-500 cursor-col-resize' : 'cursor-col-resize'
        }`}
      />

      {/* Right Panel */}
      <div 
        style={{ width: `${100 - leftSize}%` }}
        className="h-full overflow-auto bg-background"
      >
        {rightPanel}
      </div>
    </div>
  )
}
