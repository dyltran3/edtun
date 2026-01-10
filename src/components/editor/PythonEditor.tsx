'use client'

import React, { useState } from 'react'
import { JSX } from 'react'
import { CodeEditor } from './CodeEditor'
import { Console } from './Console'
import { useEditorStore } from '@/store/editorStore'
import { runPythonCode } from '@/lib/code-execution/pyodide-runner'
import { Loader2 } from 'lucide-react'

export const PythonEditor: React.FC<void> = (): JSX.Element => {
  const { 
    code, 
    isRunning, 
    setIsRunning, 
    addOutput, 
    addError, 
    clearOutput, 
    clearErrors 
  } = useEditorStore()
  
  const [isInitializing, setIsInitializing] = useState(false)

  const handleRun = async () => {
    clearOutput()
    clearErrors()
    setIsRunning(true)
    setIsInitializing(true)

    try {
      await runPythonCode(
        code,
        (output) => addOutput(output),
        (error) => addError(error)
      )
    } catch (error: any) {
      addError(error.message || 'Failed to run Python code')
    } finally {
      setIsRunning(false)
      setIsInitializing(false)
    }
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col h-full">
      {isInitializing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Initializing Python environment...</span>
          </div>
        </div>
      )}
      
      <div className="flex-1">
        <CodeEditor 
          onRun={handleRun}
          onStop={handleStop}
        />
      </div>
      
      <div className="h-48 border-t">
        <Console />
      </div>
    </div>
  )
}