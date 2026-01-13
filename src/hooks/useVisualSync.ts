'use client'

import { useEffect } from 'react'
import { parsePythonParams } from '@/lib/utils/codeParser'
import { useEditorStore } from '@/store/editorStore'
import { useSimulationStore } from '@/store/simulationStore'

/**
 * Sync Python code parameters -> simulation store params.
 * For now we do a simple one-way sync on every code change.
 */
export const useVisualSync = () => {
  const { code } = useEditorStore()
  const { setParams } = useSimulationStore()

  useEffect(() => {
    if (!code) {
      setParams({})
      return
    }

    const parsed = parsePythonParams(code)
    setParams(parsed)
  }, [code, setParams])
}

