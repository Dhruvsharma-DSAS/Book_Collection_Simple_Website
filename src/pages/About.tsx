import React from 'react'
import { motion } from 'framer-motion'
import Paige from '../components/character/Paige'
import UncleBuku from '../components/character/UncleBuku'
import AuntyKitab from '../components/character/AuntyKitab'
import GrandpaGyaan from '../components/character/GrandpaGyaan'
import { History, Users, Rocket, Heart } from 'lucide-react'
import { useStore } from '../store/useStore'

const About = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'

  return (
    <div className="py-24 px-8 md:px-16 lg:px-24 container mx-auto">
      <header className="mb-32 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-brand-green/10 dark:bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-green dark:text-brand-gold mx-auto mb-10 border border-brand-green/20"
          >
            <Heart size={36} className="fill-current" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl mb-10 text-brand-brown dark:text-white font-heading tracking-tight"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl text-brand-brown/70 dark:text-gray-400 font-bold leading-tight"
          >
            EyePagE was built to transform every book into a living, breathing vision.
          </motion.p>
      </header>

      {/* The Character Crew Introduction */}
      <div className="mb-48 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 overflow-visible py-12 px-8 bg-brand-green/5 dark:bg-brand-gold/5 rounded-[60px] border border-white/20">
          <CharacterIntro component={Paige} name="Paige" isNight={isNight} delay={0.1} />
          <CharacterIntro component={UncleBuku} name="Buku Uncle" isNight={isNight} delay={0.2} expression="dramatic" />
          <CharacterIntro component={AuntyKitab} name="Kitab Aunty" isNight={isNight} delay={0.3} expression="excited" />
          <CharacterIntro component={GrandpaGyaan} name="Dada Gyaan" isNight={isNight} delay={0.4} />
      </div>

      <div className="space-y-48">
          <Section 
            icon={<History />}
            title="The Genesis"
            subtitle="It started with one book..."
            desc="EyePagE was founded by Dhruv in 2026 with a singular vision: to make reading feel as addictive as social media, but as enriching as life itself."
            delay={0.1}
          />
          <Section 
            icon={<Users />}
            title="The Tribe"
            subtitle="Building a Global Sanctuary"
            desc="Today, we connect thousands of dreamers, scholars, and curious souls who believe that every page turned is a step toward collective wisdom."
            reverse
            delay={0.2}
          />
          <Section 
            icon={<Rocket />}
            title="The Horizon"
            subtitle="Redefining the Magic of Ink"
            desc="By merging 3D technology, gamification, and interactive characters, we've bridged the gap between physical paper and digital magic."
            delay={0.3}
          />
      </div>

      <div className="mt-48 py-24 px-12 bg-brand-green/5 dark:bg-brand-gold/5 rounded-[60px] border border-brand-green/10 dark:border-brand-gold/10 overflow-hidden relative flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 text-center lg:text-left">
          <div className="flex-1">
              <h2 className="text-5xl md:text-8xl font-heading text-brand-brown dark:text-white mb-8 relative z-10 leading-tight">Welcome to <br className="hidden lg:block"/> the Crew</h2>
              <p className="text-2xl font-bold text-brand-brown/40 dark:text-gray-500">Your journey as a visionary reader begins now.</p>
          </div>
          <div className="flex-1 flex justify-center scale-125 lg:scale-150">
            <Paige expression="happy" isNight={isNight} />
          </div>
      </div>
    </div>
  )
}

const CharacterIntro = ({ component, name, isNight, delay, expression = 'idle' }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="text-center group"
    >
        <div className="scale-75 lg:scale-90 mb-4 group-hover:-translate-y-4 transition-transform duration-500">
            {React.createElement(component, { isNight, expression })}
        </div>
        <h3 className="font-heading text-2xl text-brand-brown/80 dark:text-brand-gold group-hover:scale-110 transition-transform">{name}</h3>
    </motion.div>
)

const Section = ({ icon, title, subtitle, desc, reverse, delay }: any) => (
  <motion.div 
     initial={{ opacity: 0, y: 80 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, margin: "-100px" }}
     transition={{ duration: 0.8, ease: "easeOut", delay }}
     className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-20`}
  >
    <div className="flex-1 w-full min-h-[400px] md:min-h-[500px] rounded-[60px] glass flex items-center justify-center text-brand-green dark:text-brand-gold shadow-2xl relative group overflow-hidden border-2 border-white/10">
       <div className="absolute inset-0 bg-brand-green/5 dark:bg-brand-gold/5 group-hover:scale-110 transition-transform duration-700"></div>
       <motion.div 
         whileHover={{ scale: 1.1, rotate: reverse ? -5 : 5 }}
         className="relative z-10"
       >
         {React.cloneElement(icon, { size: 140, strokeWidth: 1.5, className: "drop-shadow-2xl" })}
       </motion.div>
    </div>
    <div className="flex-1 space-y-8 text-center lg:text-left px-4">
       <div className="space-y-4">
         <span className="text-brand-green dark:text-brand-gold font-black uppercase tracking-[0.4em] text-sm">{title}</span>
         <h2 className="text-5xl md:text-7xl font-heading text-brand-brown dark:text-white leading-tight">{subtitle}</h2>
       </div>
       <p className="text-2xl md:text-3xl font-bold leading-relaxed text-brand-brown/60 dark:text-gray-400 font-body">{desc}</p>
    </div>
  </motion.div>
)

export default About
