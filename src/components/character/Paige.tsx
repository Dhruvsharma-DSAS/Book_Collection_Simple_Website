import React, { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

interface MascotProps {
  expression?: 'idle' | 'happy' | 'surprised' | 'reading' | 'sleepy'
  isNight?: boolean
  forceSpeech?: boolean
}

const MESSAGES = [
  "Psst... this one's really good! 🎉",
  "Every book is a superpower in disguise. ⚡",
  "You've got great taste. I can tell. 😌",
  "One more chapter won't hurt. Probably. 📖",
  "The best readers are the best dreamers. ✨",
  "Reading is basically time travel. 🕰️",
  "What if I told you... the butler did it? 🫢",
  "Shhh. The books are listening. 👀",
  "A reader today, a leader tomorrow. 💪",
  "This page could change everything. Turn it. 🌀",
  "I've read 10,000 books. I still cry at endings. 🥲",
  "Your next favourite book is one click away. 🎯",
  "Plot twist incoming in 3... 2... 1... 😲",
  "Libraries are just portals with better lighting. 🌟",
  "Don't just read. Inhale stories. Breathe worlds. 🌍"
]

const Paige = ({ expression = 'idle', isNight = false, forceSpeech = false }: MascotProps) => {
  const [showSpeech, setShowSpeech] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const lastIndex = useRef(0)

  useEffect(() => {
    if (forceSpeech) {
        setShowSpeech(true)
        const interval = setInterval(() => {
            let next;
            do {
              next = Math.floor(Math.random() * MESSAGES.length);
            } while (next === lastIndex.current);
            lastIndex.current = next;
            setMsgIndex(next);
        }, 4000)
        return () => clearInterval(interval)
    }
  }, [forceSpeech])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 30
      const y = (e.clientY - window.innerHeight / 2) / 30
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const handleHover = () => {
    if (!forceSpeech) {
      let next;
      do {
        next = Math.floor(Math.random() * MESSAGES.length);
      } while (next === lastIndex.current);
      lastIndex.current = next;
      setMsgIndex(next);
      setShowSpeech(true);
    }
  }

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={handleHover}
      onMouseLeave={() => !forceSpeech && setShowSpeech(false)}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {showSpeech && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                opacity: { duration: 0.2 } 
            }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 bg-white dark:bg-brand-night-card shadow-premium px-6 py-4 rounded-[24px] min-w-[200px] max-w-[260px] border-b-4 border-brand-gold/20 dark:border-brand-gold/30 z-30"
          >
            <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-bold text-sm text-brand-brown dark:text-brand-gold font-body leading-tight text-center whitespace-nowrap"
            >
              {MESSAGES[msgIndex]}
            </motion.p>
            {/* Tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-brand-night-card rotate-45 border-r-2 border-b-2 border-brand-gold/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg 
        width="180" height="180" viewBox="0 0 200 200"
        initial={{ y: 40, opacity: 0 }}
        animate={{ 
            y: [0, -6, 0], 
            opacity: 1,
            scale: expression === 'sleepy' || isNight ? 0.98 : 1
        }}
        transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.5, type: "spring", bounce: 0.5 }
        }}
        className="drop-shadow-2xl"
      >
        {/* Universal Breathe Animation Layer */}
        <motion.g
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Main Body */}
            <circle 
              cx="100" cy="110" r="75" 
              className="fill-brand-green dark:fill-brand-gold transition-colors duration-500" 
            />
            <ellipse cx="100" cy="135" rx="45" ry="38" fill="white" fillOpacity="0.25" />

            {/* Eyes Group */}
            <motion.g style={{ x: springX, y: springY }}>
              <circle cx="68" cy="90" r="24" fill="white" />
              <circle cx="132" cy="90" r="24" fill="white" />
              
              {/* Pupils */}
              <motion.circle 
                cx="68" cy="90" r="11" fill="black" 
                animate={{ 
                    scale: expression === 'surprised' ? 1.45 : (expression === 'sleepy' || isNight ? 0.4 : 1),
                    opacity: expression === 'sleepy' || isNight ? 0.6 : 1
                }}
              />
              <motion.circle 
                cx="132" cy="90" r="11" fill="black" 
                animate={{ 
                    scale: expression === 'surprised' ? 1.45 : (expression === 'sleepy' || isNight ? 0.4 : 1),
                    opacity: expression === 'sleepy' || isNight ? 0.6 : 1
                }}
              />

              {/* Blinking Logic (Random timed via transition) */}
              <motion.g>
                <motion.rect 
                  x="42" y="64" width="52" height="52" 
                  className="fill-brand-green dark:fill-brand-gold"
                  animate={{ scaleY: [0, 0, 1, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 5, times: [0, 0.88, 0.92, 0.96, 1] }}
                  style={{ originY: 0 }}
                />
                <motion.rect 
                  x="106" y="64" width="52" height="52" 
                  className="fill-brand-green dark:fill-brand-gold"
                  animate={{ scaleY: [0, 0, 1, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 5, times: [0, 0.88, 0.92, 0.96, 1] }}
                  style={{ originY: 0 }}
                />
              </motion.g>
            </motion.g>

            {/* Beak */}
            <motion.path 
              d="M88 105 L112 105 L100 128 Z" 
              fill="#FF9900" 
              animate={expression === 'happy' ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
            />

            {/* Night Switch Accessory */}
            {isNight && (
                <text x="140" y="60" className="text-2xl">💤</text>
            )}
        </motion.g>
      </motion.svg>
    </div>
  )
}

export default Paige
