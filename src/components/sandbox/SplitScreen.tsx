'use client'

import React from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

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
          id="left-panel"
        >
          <div className="h-full overflow-auto bg-background">
            {leftPanel}
          </div>
        </Panel>
        
        <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-blue-400 transition-colors cursor-col-resize flex items-center justify-center group">
          <div className="w-1 h-8 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors" />
        </PanelResizeHandle>
        
        <Panel 
          defaultSize={100 - defaultLeftSize}
          minSize={minRightSize}
          id="right-panel"
        >
          <div className="h-full overflow-auto bg-background">
            {rightPanel}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}