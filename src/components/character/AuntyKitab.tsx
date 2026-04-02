import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'

const MESSAGES = [
  "Oh ho! You're here! I was just about to call your mother. 📞",
  "Beta, this book made me cry 3 times. On the bus. Loudly. 🚌😭",
  "Have you eaten? Also, read this. Both are important. 🍛",
  "The hero of this book... JUST LIKE YOUR FATHER. 😤❤️",
  "I told everyone in my kitty party about this book! 🎉",
  "Arre, don't skip pages! Every word is important! 🫵",
  "I gave this same book to 7 relatives. All of them cried. 😢",
  "Come, sit. I'll make chai and we'll discuss the ending. ☕",
  "This romance novel? Better than any movie. Trust me. 🎬",
  "My daughter-in-law doesn't read. That's a red flag. 🚩",
  "I've read this 4 times and I find something new each time! ✨",
  "You look tired. A good book will fix everything. 📖💊",
  "Don't worry beta, the ending is happy. I peeked. 🤭",
  "This author is my favourite. Don't tell the others. 🤫",
  "Books are better than gossip. Well... almost. 😜"
]

const AuntyKitab = ({ expression = 'idle', isNight = false, forceSpeech = false }: any) => {
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
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 35
      const y = (e.clientY - window.innerHeight / 2) / 35
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
            className="absolute -top-28 left-1/2 -translate-x-1/2 bg-white dark:bg-brand-night-card shadow-premium px-6 py-4 rounded-[24px] min-w-[220px] border-b-4 border-pink-400/20 z-20"
          >
            <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-bold text-sm text-brand-brown dark:text-brand-gold font-body leading-tight text-center"
            >
              {MESSAGES[msgIndex]}
            </motion.p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-brand-night-card rotate-45 border-r-2 border-b-2 border-pink-100"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg 
        width="200" height="200" viewBox="0 0 200 200"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: [0, -6, 0], opacity: 1 }}
        transition={{ 
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.6, type: "spring", bounce: 0.4 }
        }}
        className="drop-shadow-2xl"
      >
        <motion.g animate={{ scale: [1, 1.015, 1] }} transition={{ duration: 2.8, repeat: Infinity }}>
            {/* Round Face */}
            <circle cx="100" cy="100" r="75" fill="#FFE0BD" />
            
            {/* Saree Bun */}
            <circle cx="150" cy="70" r="25" fill="#1A1A1A" />
            <circle cx="160" cy="70" r="8" fill="#FFB6C1" /> {/* Flower */}
            
            {/* Saree / Kurta */}
            <path d="M40 140 Q100 120 160 140 L170 200 L30 200 Z" fill="#D4A017" />
            <path d="M40 140 L100 200 L160 140 Z" fill="#B8860B" />

            {/* Bindi */}
            <circle cx="100" cy="75" r="4" fill="#D0021B" />

            {/* Rosy Cheeks */}
            <circle cx="65" cy="115" r="8" fill="#FFC0CB" opacity="0.4" />
            <circle cx="135" cy="115" r="8" fill="#FFC0CB" opacity="0.4" />

            {/* Eyes with Lashes */}
            <motion.g style={{ x: springX, y: springY }}>
                <circle cx="75" cy="100" r="5" fill="black" />
                <circle cx="125" cy="100" r="5" fill="black" />
                {/* Lashes */}
                <path d="M70 93 L65 88 M80 93 L85 88" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <path d="M120 93 L115 88 M130 93 L135 88" stroke="black" strokeWidth="2" strokeLinecap="round" />
            </motion.g>

            {/* Enthusiastic Smile */}
            <motion.path 
                d="M80 135 Q100 150 120 135" 
                fill="none" stroke="black" strokeWidth="3" strokeLinecap="round"
                animate={{ d: expression === 'excited' ? "M75 135 Q100 160 125 135" : "M80 135 Q100 150 120 135" }}
            />

            {/* Fanning Hand Animation */}
            <motion.g
                animate={{ 
                    x: [0, -15, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <circle cx="45" cy="150" r="12" fill="#FFE0BD" />
                <rect x="25" y="130" width="30" height="40" rx="4" fill="#FFB6C1" stroke="white" strokeWidth="2" />
            </motion.g>

            {/* Night Switch Accessory */}
            {isNight && (
                <text x="50" y="80" className="text-xl">🌸</text>
            )}
        </motion.g>
      </motion.svg>
    </div>
  )
}

export default AuntyKitab
