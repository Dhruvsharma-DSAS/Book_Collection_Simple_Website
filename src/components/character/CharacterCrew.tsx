import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Paige from './Paige'
import UncleBuku from './UncleBuku'
import AuntyKitab from './AuntyKitab'
import GrandpaGyaan from './GrandpaGyaan'
import { X, MessageCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

const CharacterCrew = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCharacter, setActiveCharacter] = useState<string | null>(null)
  const { theme } = useStore()
  const isNight = theme === 'dark'

  const characters = [
    { id: 'paige', component: Paige, name: 'Paige' },
    { id: 'uncle', component: UncleBuku, name: 'Uncle Buku' },
    { id: 'aunty', component: AuntyKitab, name: 'Aunty Kitab' },
    { id: 'grandpa', component: GrandpaGyaan, name: 'Grandpa Gyaan' }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-6 pointer-events-none">
      
      {/* Active Character Overlay (Middle of screen or relative to bubble) */}
      <AnimatePresence>
        {activeCharacter && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="pointer-events-auto bg-white/20 dark:bg-brand-night-card/80 backdrop-blur-3xl rounded-[48px] p-12 border-2 border-white/20 shadow-2xl relative mb-4 min-w-[320px] md:min-w-[450px]"
          >
             <button 
                onClick={() => setActiveCharacter(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-black/10 dark:bg-white/10 hover:bg-red-400/20 hover:text-red-500 transition-all z-[60] group shadow-lg"
             >
                <X size={28} className="group-hover:rotate-90 transition-transform" />
             </button>
             
             <div className="flex flex-col items-center pt-24 min-h-[450px]">
                {activeCharacter === 'paige' && <Paige expression="happy" isNight={isNight} forceSpeech={true} />}
                {activeCharacter === 'uncle' && <UncleBuku expression="dramatic" isNight={isNight} forceSpeech={true} />}
                {activeCharacter === 'aunty' && <AuntyKitab expression="excited" isNight={isNight} forceSpeech={true} />}
                {activeCharacter === 'grandpa' && <GrandpaGyaan expression="idle" isNight={isNight} forceSpeech={true} />}
                
                <div className="mt-4 text-center">
                    <p className="font-heading text-4xl text-brand-brown dark:text-brand-gold">
                        {characters.find(c => c.id === activeCharacter)?.name}
                    </p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Panel Bar */}
      <motion.div 
        layout
        className="pointer-events-auto glass rounded-[32px] p-4 flex items-center gap-4 shadow-premium border-2 border-white/20 relative"
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.div 
              key="expanded"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-4 px-2"
            >
              {characters.map((char) => (
                <motion.button
                  key={char.id}
                  whileHover={{ scale: 1.2, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveCharacter(activeCharacter === char.id ? null : char.id)}
                  className={`w-12 h-12 rounded-full overflow-hidden transition-all border-2 flex items-center justify-center bg-white/50 dark:bg-white/10 ${activeCharacter === char.id ? 'border-brand-green dark:border-brand-gold shadow-lg' : 'border-transparent'}`}
                >
                  <div className="scale-[0.22] transform-gpu">
                     {React.createElement(char.component, { isNight })}
                  </div>
                </motion.button>
              ))}
              <div className="w-[1px] h-8 bg-brand-brown/10 mx-2"></div>
            </motion.div>
          ) : (
             <motion.div
                key="collapsed"
                className="flex items-center -space-x-4 pl-2 pointer-events-none pr-4"
             >
                {characters.map((char, i) => (
                    <div key={char.id} className="w-8 h-8 overflow-hidden relative rounded-full bg-white/30 backdrop-blur-sm border border-white/20" style={{ zIndex: 10 - i }}>
                        <div className="scale-[0.15] -translate-y-2 transform-gpu">
                            {React.createElement(char.component, { isNight })}
                        </div>
                    </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-brown/5 text-brand-brown dark:text-white' : 'bg-brand-green dark:bg-brand-gold text-white shadow-lg shadow-brand-green/30'}`}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.button>
      </motion.div>
    </div>
  )
}

export default CharacterCrew
