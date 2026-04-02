import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'

const MESSAGES = [
  "Beta, in my time we read 5 books a day! No excuses. 😤",
  "Close your phone. Open a book. I said what I said. 📵",
  "Reading is the best investment. Trust your uncle. 💼",
  "In this house, we finish chapters before dinner. 🍽️",
  "Ab padh lo! Netflix baad mein hoga. 📺❌",
  "Back in my day, books didn't need Wi-Fi. Just wisdom. 📡",
  "I knew the ending. I ALWAYS know the ending. 🧐",
  "One cup of chai + one good book = perfect evening. ☕",
  "Arrey, you still haven't read this? Sit. I'll explain. 🪑",
  "The author is a genius. I discovered them first, obviously. 🏆",
  "You want good advice? Read more. That's it. That's the advice. 🎯",
  "This book? Changed my life. Had to call my brother immediately. 📞",
  "Don't tell me the plot. I already guessed it 3 chapters ago. 😏",
  "My grandchildren don't know what they're missing. READ! 👴",
  "This is even better than my evening news. And that's saying something. 📰"
]

const UncleBuku = ({ expression = 'idle', isNight = false, forceSpeech = false }: any) => {
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
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40
      const y = (e.clientY - window.innerHeight / 2) / 40
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
      <AnimatePresence>
        {showSpeech && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute -top-28 left-1/2 -translate-x-1/2 bg-white dark:bg-brand-night-card shadow-premium px-6 py-4 rounded-[24px] min-w-[220px] border-b-4 border-brand-brown/10 z-20"
          >
            <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-bold text-sm text-brand-brown/80 dark:text-brand-gold font-body leading-tight text-center"
            >
              {MESSAGES[msgIndex]}
            </motion.p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-brand-night-card rotate-45 border-r-2 border-b-2 border-brand-brown/5"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg 
        width="200" height="200" viewBox="0 0 200 200"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: [0, -6, 0], opacity: 1 }}
        transition={{ 
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.6, type: "spring", bounce: 0.4 }
        }}
        className="drop-shadow-2xl"
      >
        <motion.g animate={{ scale: [1, 1.015, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            {/* Round Face */}
            <circle cx="100" cy="100" r="75" fill="#8D5524" />
            
            {/* Sweater / Vest */}
            <path d="M40 140 Q100 120 160 140 L160 200 L40 200 Z" fill="#2D6A4F" />
            <path d="M100 120 L130 150 L100 180 L70 150 Z" fill="#1B4332" />

            {/* Glasses */}
            <motion.g style={{ x: springX, y: springY }}>
                <circle cx="70" cy="90" r="24" fill="none" stroke="black" strokeWidth="4" />
                <circle cx="130" cy="90" r="24" fill="none" stroke="black" strokeWidth="4" />
                <path d="M94 90 L106 90" stroke="black" strokeWidth="4" />
                
                {/* Eyes */}
                <circle cx="70" cy="90" r="4" fill="black" />
                <circle cx="130" cy="90" r="4" fill="black" />

                {/* Eyebrows */}
                <motion.path 
                    d="M50 65 Q70 60 90 65" 
                    fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"
                    animate={{ y: expression === 'dramatic' ? [0, -5, 0] : 0 }}
                />
                <motion.path 
                    d="M110 65 Q130 60 150 65" 
                    fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"
                    animate={{ y: expression === 'dramatic' ? [0, -5, 0] : 0 }}
                />
            </motion.g>

            {/* Thick Mustache */}
            <path d="M80 115 Q100 105 120 115 Q130 125 100 125 Q70 125 80 115" fill="black" />

            {/* Chai Cup Animation */}
            <motion.g
                animate={{ 
                    y: isNight ? 0 : [0, -20, 0],
                    rotate: isNight ? 0 : [0, 10, 0]
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    times: [0, 0.4, 1],
                    ease: "easeInOut"
                }}
            >
                <rect x="140" y="110" width="40" height="50" rx="4" fill={isNight ? "#FDF8F0" : "#BC6C25"} />
                <path d="M180 120 Q195 135 180 150" fill="none" stroke={isNight ? "#FDF8F0" : "#BC6C25"} strokeWidth="4" />
                {/* Steam */}
                <motion.path 
                    d="M150 100 Q155 90 150 80" 
                    fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                    animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />
            </motion.g>

            {/* Night Switch Accessory */}
            {isNight && (
                <text x="145" y="140" className="text-xl">🥛</text>
            )}
        </motion.g>
      </motion.svg>
    </div>
  )
}

export default UncleBuku
