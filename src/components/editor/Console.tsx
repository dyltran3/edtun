'use client'

import React from 'react'
import { useEditorStore } from '@/store/editorStore'
import { Button } from '@/components/ui/button'
import { Trash2, Terminal } from 'lucide-react'

export const Console: React.FC = () => {
  const { output, errors, clearOutput, clearErrors } = useEditorStore()

  const handleClear = () => {
    clearOutput()
    clearErrors()
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100">
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          <span className="text-sm font-medium">Console</span>
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-100"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {output.length === 0 && errors.length === 0 ? (
          <div className="text-gray-500 italic">
            Console output will appear here...
          </div>
        ) : (
          <div className="space-y-1">
            {output.map((line, index) => (
              <div key={`output-${index}`} className="text-green-400">
                {line}
              </div>
            ))}
            
            {errors.map((error, index) => (
              <div key={`error-${index}`} className="text-red-400">
                Error: {error}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}