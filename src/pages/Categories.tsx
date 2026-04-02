import React from 'react'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import Paige from '../components/character/Paige'
import AuntyKitab from '../components/character/AuntyKitab'
import { Link } from 'react-router-dom'
import { Compass, Ghost, Microscope, Moon, Star, Zap } from 'lucide-react'
import { useStore } from '../store/useStore'

const GENRES = [
  { id: 'fiction', name: 'Fiction', desc: 'Dive into imaginative worlds and live a thousand lives.', color: 'text-brand-green', icon: <Star /> },
  { id: 'mystery', name: 'Mystery', desc: 'Unravel the secrets hidden between the lines.', color: 'text-brand-gold', icon: <Compass /> },
  { id: 'scifi', name: 'Sci-Fi', desc: 'Journey to the stars and beyond the horizon.', color: 'text-blue-500', icon: <Moon /> },
  { id: 'horror', name: 'Horror', desc: 'Faces your deepest fears in the dark.', color: 'text-brand-brown', icon: <Ghost /> },
  { id: 'biography', name: 'Biography', desc: 'Step into the real lives of legendary souls.', color: 'text-brand-green', icon: <Microscope /> },
  { id: 'energy', name: 'Self Help', desc: 'Ignite the fire within and transform yourself.', color: 'text-orange-500', icon: <Zap /> },
]

const Categories = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'

  return (
    <div className="py-24 px-8 md:px-16 lg:px-24 container mx-auto">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <div className="max-w-2xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-brand-green dark:text-brand-gold font-black tracking-[0.4em] text-sm mb-6"
          >
            THE CURATED LIBRARY
          </motion.div>
          <h1 className="text-6xl md:text-8xl mb-8 text-brand-brown dark:text-white font-heading leading-tight">
             Select Your <span className="text-brand-green dark:text-brand-gold italic">Portal</span>
          </h1>
          <p className="text-2xl text-brand-brown/60 dark:text-gray-400 font-bold leading-relaxed">
            Every genre is a heartbeat. Choose the rhythm of your next transformation.
          </p>
        </div>
        
        <div className="flex gap-4 scale-75 md:scale-100 items-end">
           <div className="hover:-translate-y-4 transition-transform">
             <Paige expression="happy" isNight={isNight} />
           </div>
           <div className="hover:-translate-y-4 transition-transform">
             <AuntyKitab isNight={isNight} />
           </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {GENRES.map((genre, index) => (
          <motion.div
            key={genre.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Tilt 
              perspective={1000} 
              glareEnable={true} 
              glareMaxOpacity={0.15} 
              scale={1.02}
              className="h-full"
            >
              <Link to={`/categories/${genre.id}`}>
                <div className="h-full glass p-10 rounded-[40px] border-b-8 border-brand-green/20 dark:border-brand-gold/20 flex flex-col items-center text-center transition-all group hover:bg-brand-green/5 dark:hover:bg-brand-gold/5">
                  <div className={`mb-8 p-6 rounded-3xl bg-brand-green/10 dark:bg-brand-gold/10 ${genre.color} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    {React.cloneElement(genre.icon as React.ReactElement, { size: 48, strokeWidth: 2.5 })}
                  </div>
                  <h3 className="text-3xl font-heading text-brand-brown dark:text-white mb-4 tracking-tighter">{genre.name}</h3>
                  <p className="text-lg font-bold text-brand-brown/50 dark:text-gray-500 leading-tight mb-8">{genre.desc}</p>
                  <div className="mt-auto opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all font-black text-xs tracking-widest uppercase text-brand-green dark:text-brand-gold">
                    Enter Portal →
                  </div>
                </div>
              </Link>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Categories
