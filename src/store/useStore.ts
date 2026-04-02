import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  theme: 'light' | 'dark'
  streak: number
  lastCheckIn: string | null
  xp: number
  toggleTheme: () => void
  addCheckIn: () => void
  addXP: (amount: number) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      streak: 0,
      lastCheckIn: null,
      xp: 0,
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      addCheckIn: () => set((state) => {
        const today = new Date().toDateString()
        if (state.lastCheckIn === today) return state
        
        const lastDate = state.lastCheckIn ? new Date(state.lastCheckIn) : null
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        
        let newStreak = state.streak
        if (!lastDate || lastDate.toDateString() === yesterday.toDateString()) {
          newStreak += 1
        } else {
          newStreak = 1
        }
        
        return { streak: newStreak, lastCheckIn: today }
      }),
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
    }),
    { name: 'eyepage-state' }
  )
)
