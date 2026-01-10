'use client'

import React, { useState } from 'react'
import { SplitScreen } from './SplitScreen'
import { PythonEditor } from '../editor/PythonEditor'
import dynamic from 'next/dynamic'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AIAssistant } from '@/components/ai/AIAssistant'

const P5Canvas = dynamic(() => import('../simulation/P5Canvas'), { ssr: false })

interface SandboxContainerProps {
  lessonId?: string
  initialCode?: string
  theoryContent?: React.ReactNode
  simulationSketch?: (p: any) => void
}

export const SandboxContainer: React.FC<SandboxContainerProps> = ({
  lessonId,
  initialCode,
  theoryContent,
  simulationSketch,
}) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'simulation' | 'ai'>('theory')

  const leftPanel = (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="h-full flex flex-col">
      <TabsList className="w-full justify-start border-b rounded-none">
        <TabsTrigger value="theory">Theory</TabsTrigger>
        <TabsTrigger value="simulation">Simulation</TabsTrigger>
        <TabsTrigger value="ai">AI Assistant</TabsTrigger>
      </TabsList>

      <div className="flex-1 overflow-auto">
        <TabsContent value="theory" className="h-full m-0 p-4">
          {theoryContent || (
            <Card>
              <CardHeader>
                <CardTitle>Lesson Theory</CardTitle>
                <CardDescription>Read the concepts before coding</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Theory content will appear here...</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="simulation" className="h-full m-0 p-4">
          {simulationSketch ? (
            <div className="w-full h-full flex items-center justify-center">
              <P5Canvas sketch={simulationSketch} width={600} height={400} />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Interactive Simulation</CardTitle>
                <CardDescription>Visualize concepts in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No simulation available for this lesson</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ai" className="h-full m-0">
          <AIAssistant />
        </TabsContent>
      </div>
    </Tabs>
  )

  const rightPanel = <PythonEditor />

  return (
    <div className="h-screen">
      <SplitScreen 
        leftPanel={leftPanel} 
        rightPanel={rightPanel}
        defaultLeftSize={45}
      />
    </div>
  )
}