import { create } from 'zustand'

interface SimulationParams {
  [key: string]: number | string | boolean
}

interface SimulationState {
  isRunning: boolean
  params: SimulationParams
  p5Instance: any | null
  
  setIsRunning: (isRunning: boolean) => void
  updateParam: (key: string, value: number | string | boolean) => void
  setParams: (params: SimulationParams) => void
  setP5Instance: (instance: any) => void
  reset: () => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isRunning: false,
  params: {},
  p5Instance: null,

  setIsRunning: (isRunning) => set({ isRunning }),
  
  updateParam: (key, value) => set((state) => ({
    params: { ...state.params, [key]: value }
  })),
  
  setParams: (params) => set({ params }),
  
  setP5Instance: (instance) => set({ p5Instance: instance }),
  
  reset: () => set({ 
    isRunning: false, 
    params: {}, 
    p5Instance: null 
  }),
}))