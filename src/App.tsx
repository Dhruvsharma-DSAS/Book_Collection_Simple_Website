import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { useStore } from './store/useStore'
import { Toaster } from 'react-hot-toast'
import CharacterCrew from './components/character/CharacterCrew'

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'))
const Categories = React.lazy(() => import('./pages/Categories'))
const About = React.lazy(() => import('./pages/About'))
const Support = React.lazy(() => import('./pages/Support'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))

function App() {
  const { theme, addCheckIn } = useStore()
  const location = useLocation()

  useEffect(() => {
    // Handle dark mode class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Auto check-in for streak
    addCheckIn()
  }, [theme, addCheckIn])

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <Toaster position="top-right" />
      <Navbar />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <React.Suspense fallback={<LoadingScreen />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/categories" element={<PageTransition><Categories /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
              <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
              <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            </Routes>
          </React.Suspense>
        </AnimatePresence>
      </main>
      <CharacterCrew />
    </div>
  )
}

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-brand-cream dark:bg-brand-night-bg transition-colors z-50">
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [1, 1.1, 1], opacity: 1, rotate: [0, 5, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="text-5xl md:text-7xl font-heading text-brand-green dark:text-brand-gold drop-shadow-xl"
    >
      EyePagE
    </motion.div>
  </div>
)

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 1.02, y: -10 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
)

export default App
