import { create } from 'zustand'

export type EditorLanguage = 'python' | 'javascript' | 'html' | 'css'

interface EditorState {
  code: string
  language: EditorLanguage
  isRunning: boolean
  output: string[]
  errors: string[]
  
  setCode: (code: string) => void
  setLanguage: (language: EditorLanguage) => void
  setIsRunning: (isRunning: boolean) => void
  addOutput: (output: string) => void
  addError: (error: string) => void
  clearOutput: () => void
  clearErrors: () => void
  reset: () => void
}

export const useEditorStore = create<EditorState>((set) => ({
  code: '',
  language: 'python',
  isRunning: false,
  output: [],
  errors: [],

  setCode: (code) => set({ code }),
  
  setLanguage: (language) => set({ language }),
  
  setIsRunning: (isRunning) => set({ isRunning }),
  
  addOutput: (output) => set((state) => ({ 
    output: [...state.output, output] 
  })),
  
  addError: (error) => set((state) => ({ 
    errors: [...state.errors, error] 
  })),
  
  clearOutput: () => set({ output: [] }),
  
  clearErrors: () => set({ errors: [] }),
  
  reset: () => set({ 
    code: '', 
    output: [], 
    errors: [], 
    isRunning: false 
  }),
}))