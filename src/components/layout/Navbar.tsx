import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sun, Moon, Flame } from 'lucide-react'
import { useStore } from '../../store/useStore'

export const Navbar = () => {
  const { theme, toggleTheme, streak } = useStore()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 flex items-center justify-between px-8 md:px-16 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.span 
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="text-3xl font-heading text-brand-green dark:text-brand-gold select-none cursor-pointer"
        >
          EyePagE
        </motion.span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-semibold text-brand-brown dark:text-gray-300">
        <Link to="/" className="hover:text-brand-green dark:hover:text-brand-gold transition-colors relative group">
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green dark:bg-brand-gold transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/about" className="hover:text-brand-green dark:hover:text-brand-gold transition-colors relative group">
          About
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green dark:bg-brand-gold transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/categories" className="hover:text-brand-green dark:hover:text-brand-gold transition-colors relative group">
          Library
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green dark:bg-brand-gold transition-all group-hover:w-full"></span>
        </Link>
        <Link to="/support" className="hover:text-brand-green dark:hover:text-brand-gold transition-colors relative group">
          Support
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green dark:bg-brand-gold transition-all group-hover:w-full"></span>
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Streak Widget */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1.5 bg-brand-gold/10 px-3 md:px-4 py-2 rounded-full border border-brand-gold/20"
        >
          <Flame className="w-5 h-5 text-brand-gold animate-pulse" />
          <span className="font-bold text-brand-gold">{streak}</span>
        </motion.div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="relative w-14 md:w-16 h-8 rounded-full bg-brand-beige dark:bg-brand-night-card border border-brand-brown/10 flex items-center p-1 cursor-pointer overflow-hidden transition-colors"
        >
          <motion.div 
            layout
            animate={{ 
              x: theme === 'light' ? 0 : 'auto',
              justifyContent: theme === 'light' ? 'flex-start' : 'flex-end'
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center z-10 ${theme === 'dark' ? 'ml-auto' : ''}`}
          >
            {theme === 'light' ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-night-glow" />}
          </motion.div>
          <div className="absolute inset-0 flex justify-between px-2.5 items-center opacity-30 pointer-events-none">
            <Sun className="w-3.5 h-3.5" />
            <Moon className="w-3.5 h-3.5" />
          </div>
        </button>

        <Link to="/login" className="btn btn-primary h-10 px-6 hidden sm:flex">
          Sign In
        </Link>
      </div>
    </nav>
  )
}
