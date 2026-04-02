import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Book3D } from '../components/three/Book3D'
import Paige from '../components/character/Paige'
import UncleBuku from '../components/character/UncleBuku'
import { ArrowRight, BookOpen, Sparkles, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'

const Home = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'
  const [paigeExpression, setPaigeExpression] = useState<'idle' | 'happy' | 'surprised'>('idle')

  return (
    <div className="relative overflow-hidden bg-brand-cream dark:bg-brand-night-bg transition-colors duration-500">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 z-0 w-[60vw] h-[60vw] bg-brand-green/3 dark:bg-brand-gold/3 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 z-0 w-[50vw] h-[50vw] bg-brand-gold/5 dark:bg-brand-night-glow/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 z-10 text-center lg:text-left relative isolation-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-brand-green/10 dark:bg-brand-gold/10 border border-brand-green/20 dark:border-brand-gold/20 px-4 py-2 rounded-full mb-8 font-bold text-xs md:text-sm text-brand-green dark:text-brand-gold uppercase tracking-[0.2em] relative z-20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Your magical reading companion</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl leading-[1.1] mb-8 font-heading relative z-20"
          >
            <span className="text-brand-brown dark:text-white drop-shadow-sm bg-transparent inline-block will-change-transform">Step Into Stories</span><br/>
            <span className="text-brand-green dark:text-brand-gold italic bg-transparent inline-block will-change-transform">That Change You</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-2xl text-brand-brown/70 dark:text-gray-400 mb-12 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0 font-medium relative z-20"
          >
            Every Page is a New Vision, Every Book a New World. <br className="hidden md:block"/>
            Build your reading habit. Transform your mind.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.6 }}
             className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start relative z-20"
          >
            <Link to="/categories" className="btn btn-primary text-xl px-10 py-5 w-full sm:w-auto shadow-2xl shadow-brand-green/40 dark:shadow-brand-gold/20 group">
              Start Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn btn-secondary text-xl px-10 py-5 w-full sm:w-auto overflow-hidden group">
              <span className="relative z-10">Explore Library</span>
              <BookOpen className="w-6 h-6 relative z-10 opacity-70" />
            </Link>
          </motion.div>

          {/* Animated Stats Count */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex gap-12 justify-center lg:justify-start flex-wrap relative z-20"
          >
            <div className="flex flex-col gap-1 text-center lg:text-left">
              <span className="text-4xl font-heading text-brand-brown dark:text-brand-gold">2K+</span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-brown/40 dark:text-white/30">Curated Books</span>
            </div>
            <div className="flex flex-col gap-1 border-x border-brand-brown/10 dark:border-white/10 px-8 md:px-12 text-center lg:text-left">
              <span className="text-4xl font-heading text-brand-brown dark:text-brand-gold">50+</span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-brown/40 dark:text-white/30">Literary Genres</span>
            </div>
            <div className="flex flex-col gap-1 text-center lg:text-left">
              <span className="text-4xl font-heading text-brand-brown dark:text-brand-gold">10K</span>
              <span className="text-xs font-black uppercase tracking-widest text-brand-brown/40 dark:text-white/30">Daily Readers</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3D and Mascot */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative mt-12 lg:mt-0 flex items-center justify-center">
          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} shadows>
              <ambientLight intensity={1.2} />
              <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <Book3D />
            </Canvas>
          </div>

          {/* Floating Paige Positioning */}
          <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 z-30 scale-90 md:scale-110 lg:scale-125 hover:rotate-6 transition-transform">
            <motion.div
              onHoverStart={() => setPaigeExpression('happy')}
              onHoverEnd={() => setPaigeExpression('idle')}
              onClick={() => setPaigeExpression('surprised')}
            >
              <Paige expression={paigeExpression} isNight={isNight} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-brand-beige/30 dark:bg-brand-night-card/20 py-32 px-8 lg:px-24">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center max-w-6xl mx-auto mb-24"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-brand-green dark:text-brand-gold font-black uppercase tracking-[0.3em] text-sm mb-4 block text-center lg:text-left">Core Experience</span>
              <h2 className="text-5xl md:text-7xl mb-8 text-brand-brown dark:text-white font-heading text-center lg:text-left">Why EyePagE?</h2>
              <p className="text-xl md:text-2xl text-brand-brown/60 dark:text-gray-400 font-medium text-center lg:text-left">Discover a better way to experience literature and grow your mind through addictive reading habits.</p>
            </div>
            <div className="scale-90 md:scale-110">
               <UncleBuku isNight={isNight} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <FeatureCard 
            icon={<BookOpen className="w-12 h-12" />}
            title="Curated Worlds"
            desc="Unlike massive libraries, we hand-pick only the most transformative stories that actually change your perspective."
            delay={0.1}
          />
          <FeatureCard 
            icon={<Trophy className="w-12 h-12" />}
            title="Addictive Streaks"
            desc="Borrowing from the best in gamification to ensure you never go a day without turning a page. Build your reading fire!"
            delay={0.2}
          />
          <FeatureCard 
            icon={<Sparkles className="w-12 h-12" />}
            title="Alive with Paige"
            desc="Meet Paige, your interactive companion who tracks your progress, celebrates your wins, and guides your journey."
            delay={0.3}
          />
        </div>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.7, ease: "easeOut" }}
    whileHover={{ y: -15, scale: 1.02 }}
    className="glass p-10 rounded-3xl border-b-8 border-brand-green/20 dark:border-brand-gold/20 flex flex-col items-center lg:items-start text-center lg:text-left transition-all group overflow-hidden relative"
  >
    <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-green/5 dark:bg-brand-gold/5 rounded-full blur-2xl group-hover:bg-brand-green/10 transition-colors"></div>
    
    <div className="w-24 h-24 rounded-3xl bg-brand-green/10 dark:bg-brand-gold/10 flex items-center justify-center text-brand-green dark:text-brand-gold mb-8 group-hover:rotate-12 transition-all duration-300 shadow-inner">
      {icon}
    </div>
    <h3 className="text-3xl mb-5 text-brand-brown dark:text-white font-heading">{title}</h3>
    <p className="text-brand-brown/70 dark:text-gray-400 leading-relaxed font-semibold">{desc}</p>
  </motion.div>
)

export default Home
