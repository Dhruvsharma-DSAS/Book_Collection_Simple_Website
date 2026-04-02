import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'

const MESSAGES = [
  "In 1967, I read this book by candlelight. No electricity, full wisdom. 🕯️",
  "Hmm? Oh! Yes. Reading. Very important. What were we saying? 🧓",
  "I have lived 84 years. Books taught me everything. Except cooking. 🍳",
  "Sit beta. Let Dada tell you about this author... *3 hours later* ...and THAT is why. 😅",
  "I fell asleep at chapter 3 but the title was excellent. ⭐",
  "Za-ma-na badal gaya. But a good story? Always the same. 📜",
  "My eyes are weak. But my taste in books? Razor sharp. 👴",
  "I have given this same advice for 60 years. Nobody listened. Now you listen. 🫵",
  "ZZZ... oh! Yes! Books! Very good! ZZZ... 💤",
  "When I was young, there was no internet. Just books and wisdom. And mosquitoes. 🦟",
  "Page 247 is where the real story begins. I know because I peeked. 🤫",
  "A good book is like a good granddaughter. Takes care of your soul. 🥹",
  "In my village, the one with the most books was the most respected. Be that person. 🏆",
  "I am 84. I read 3 pages a day. Still better than watching that Reel nonsense. 📱❌",
  "Come back when you've read 100 books. Then we can REALLY talk. 😌"
]

const GrandpaGyaan = ({ expression = 'idle', isNight = false, forceSpeech = false }: any) => {
  const [showSpeech, setShowSpeech] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const lastIndex = useRef(0)
  const [isDozing, setIsDozing] = useState(false)

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
        }, 5000)
        return () => clearInterval(interval)
    }
  }, [forceSpeech])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50
      const y = (e.clientY - window.innerHeight / 2) / 50
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
      const interval = setInterval(() => {
          if (!showSpeech) setIsDozing(prev => !prev)
      }, 8000)
      return () => clearInterval(interval)
  }, [showSpeech])

  const handleHover = () => {
    if (!forceSpeech) {
      setIsDozing(false)
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
            className="absolute -top-32 left-1/2 -translate-x-1/2 bg-white dark:bg-brand-night-card shadow-premium px-6 py-4 rounded-[24px] min-w-[240px] border-b-4 border-brand-brown/30 z-20"
          >
            <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-bold text-xs text-brand-brown/90 dark:text-brand-gold font-body leading-tight text-center italic"
            >
              "{MESSAGES[msgIndex]}"
            </motion.p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-brand-night-card rotate-45 border-r-2 border-b-2 border-brand-brown/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg 
        width="220" height="220" viewBox="0 0 200 200"
        initial={{ y: 40, opacity: 0 }}
        animate={{ 
            y: [0, -4, 0], 
            rotate: isDozing ? [0, 5, 0] : 0,
            opacity: 1 
        }}
        transition={{ 
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="drop-shadow-2xl"
      >
        <motion.g animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 3.5, repeat: Infinity }}>
            {/* Round Face */}
            <circle cx="106" cy="110" r="70" fill="#FFDBAC" />
            
            {/* Fluffy White Hair */}
            <circle cx="60" cy="80" r="30" fill="white" />
            <circle cx="152" cy="80" r="30" fill="white" />
            <circle cx="106" cy="60" r="35" fill="white" />

            {/* Dhoti / Body */}
            <path d="M40 160 Q106 140 172 160 L180 220 L32 220 Z" fill="#F0F0F0" />
            <path d="M106 140 L40 220 L172 220 Z" fill="#E0E0E0" />

            {/* Coke Bottle Glasses */}
            <motion.g style={{ x: springX, y: springY }}>
                <circle cx="80" cy="100" r="22" fill="white" fillOpacity="0.3" stroke="#A0A0A0" strokeWidth="4" />
                <circle cx="132" cy="100" r="22" fill="white" fillOpacity="0.3" stroke="#A0A0A0" strokeWidth="4" />
                <path d="M102 100 L110 100" stroke="#A0A0A0" strokeWidth="4" />
                
                {/* Tiny Eyes */}
                <motion.circle 
                    cx="80" cy="100" r="3" fill="black" 
                    animate={{ scaleY: isDozing || isNight ? 0.1 : 1 }}
                />
                <motion.circle 
                    cx="132" cy="100" r="3" fill="black" 
                    animate={{ scaleY: isDozing || isNight ? 0.1 : 1 }}
                />
            </motion.g>

            {/* Long White Beard */}
            <path d="M70 135 Q106 195 142 135 Z" fill="white" />

            {/* Big Bushy Eyebrows */}
            <motion.rect 
                x="60" y="75" width="40" height="8" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"
                animate={{ y: isDozing ? 5 : 0 }}
            />
            <motion.rect 
                x="112" y="75" width="40" height="8" rx="4" fill="white" stroke="#E0E0E0" strokeWidth="1"
                animate={{ y: isDozing ? 5 : 0 }}
            />

            {/* Walking Stick Animation */}
            <motion.g
                animate={{ 
                    rotate: isDozing ? 0 : [0, 5, 0],
                    x: isDozing ? 0 : [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <rect x="30" y="100" width="8" height="100" rx="4" fill="#5D4037" />
                <path d="M30 100 Q10 100 10 120" fill="none" stroke="#5D4037" strokeWidth="8" />
            </motion.g>

            {/* Dozing ZZZ Bubbles */}
            <AnimatePresence>
                {(isDozing || isNight) && (
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.text 
                            x="160" y="60" className="text-xl font-bold fill-brand-green/40 dark:fill-brand-gold/40"
                            animate={{ y: [0, -20], x: [0, 10], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >z</motion.text>
                        <motion.text 
                            x="170" y="45" className="text-2xl font-bold fill-brand-green/50 dark:fill-brand-gold/50"
                            animate={{ y: [0, -20], x: [0, 10], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        >Z</motion.text>
                        <motion.text 
                            x="180" y="30" className="text-3xl font-bold fill-brand-green/60 dark:fill-brand-gold/60"
                            animate={{ y: [0, -20], x: [0, 10], opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                        >Z</motion.text>
                    </motion.g>
                )}
            </AnimatePresence>

        </motion.g>
      </motion.svg>
    </div>
  )
}

export default GrandpaGyaan
