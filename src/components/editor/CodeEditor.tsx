'use client'

import React, { useRef } from 'react'
import Editor from '@monaco-editor/react'
import { useEditorStore } from '@/store/editorStore'
import { Button } from '@/components/ui/button'
import { Play, Square, RotateCcw } from 'lucide-react'

interface CodeEditorProps {
  onRun?: () => void
  onStop?: () => void
  height?: string
  readOnly?: boolean
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  onRun,
  onStop,
  height = '100%',
  readOnly = false,
}) => {
  const editorRef = useRef<any>(null)
  const { code, language, isRunning, setCode } = useEditorStore()

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor
  }

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '')
  }

  const getLanguageForMonaco = () => {
    switch (language) {
      case 'python':
        return 'python'
      case 'javascript':
        return 'javascript'
      case 'html':
        return 'html'
      case 'css':
        return 'css'
      default:
        return 'javascript'
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language.toUpperCase()}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setCode('')
            }}
            disabled={isRunning}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          
          {isRunning ? (
            <Button
              size="sm"
              variant="destructive"
              onClick={onStop}
            >
              <Square className="w-4 h-4 mr-1" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onRun}
              disabled={!code.trim()}
            >
              <Play className="w-4 h-4 mr-1" />
              Run Code
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height={height}
          language={getLanguageForMonaco()}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly: readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  )
}