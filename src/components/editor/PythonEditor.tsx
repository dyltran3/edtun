// src/components/editor/PythonEditor.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { CodeEditor } from './CodeEditor'
import { Console } from './Console'
import { useEditorStore } from '@/store/editorStore'
import { runPythonCode } from '@/lib/code-execution/pyodide-runner'
import { Loader2, Play, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useVisualSync } from '@/hooks/useVisualSync'

export const PythonEditor: React.FC = () => {
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
  useVisualSync()

  const handleRun = useCallback(async () => {
    if (isRunning) return

    clearOutput()
    clearErrors()
    setIsRunning(true)
    
    // Chỉ hiện loading lần đầu hoặc khi environment chưa sẵn sàng
    // Ở đây chúng ta giả định initPyodide sẽ handle cache
    setIsInitializing(true) 

    try {
      await runPythonCode(
        code,
        (output) => {
            // Callback này sẽ được gọi real-time nhờ sửa đổi ở bước 1
            addOutput(output)
            setIsInitializing(false) // Tắt loading khi có output đầu tiên hoặc chạy xong init
        },
        (error) => {
            addError(error)
            setIsInitializing(false)
        }
      )
    } catch (error: any) {
      addError(error.message || 'Failed to run Python code')
    } finally {
      setIsRunning(false)
      setIsInitializing(false)
    }
  }, [code, isRunning, clearOutput, clearErrors, setIsRunning, addOutput, addError])

  const handleStop = () => {
    // Lưu ý: Pyodide chạy trên main thread nên khó "stop" triệt để trừ khi dùng Web Worker.
    // Tạm thời set state để UI phản hồi.
    setIsRunning(false)
    addError("Execution interrupted (Note: Browser may still be processing if loop was infinite)")
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Overlay Loading */}
      {isInitializing && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-2xl flex items-center gap-3 border">
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <span className="font-medium text-sm">Đang khởi tạo môi trường Python...</span>
          </div>
        </div>
      )}
      
      {/* Toolbar - Bạn có thể tách thành component riêng */}
      <div className="p-2 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-900">
        <span className="text-xs font-semibold text-gray-500">main.py</span>
        <div className="flex gap-2">
           {!isRunning ? (
             <Button size="sm" onClick={handleRun} className="bg-green-600 hover:bg-green-700 text-white gap-2">
               <Play className="w-4 h-4" /> Chạy
             </Button>
           ) : (
             <Button size="sm" onClick={handleStop} variant="destructive" className="gap-2">
               <Square className="w-4 h-4" /> Dừng
             </Button>
           )}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <CodeEditor 
            // Đảm bảo CodeEditor nhận đúng props
            // Nếu CodeEditor của bạn chưa có props onRun/onStop, hãy cập nhật nó
        />
      </div>
      
      <div className="h-1/3 min-h-150px border-t">
        <Console />
      </div>
    </div>
  )
}