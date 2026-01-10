'use client'

import React from 'react'
import { PanelProps, Panel, PanelResizer } from 'react-resizable-panels'

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
  return (
    <div className="h-full w-full">
      <PanelGroup direction="horizontal">
        <Panel 
          defaultSize={defaultLeftSize}
          minSize={minLeftSize}
        >
          <div className="h-full overflow-auto">
            {leftPanel}
          </div>
        </Panel>
        
        <PanelResizer className="w-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize" />
        
        <Panel 
          defaultSize={100 - defaultLeftSize}
          minSize={minRightSize}
        >
          <div className="h-full overflow-auto">
            {rightPanel}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}