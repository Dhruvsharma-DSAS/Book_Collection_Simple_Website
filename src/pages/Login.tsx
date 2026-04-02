import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Paige from '../components/character/Paige'
import AuntyKitab from '../components/character/AuntyKitab'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useStore } from '../store/useStore'

const Login = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      toast.success("Welcome back to EyePagE!")
    } else {
        toast.error("Please fill in all fields.")
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 md:p-12 lg:p-24 bg-brand-cream dark:bg-brand-night-bg transition-colors duration-500">
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl w-full flex flex-col lg:flex-row glass rounded-[50px] overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/5 relative"
      >
        {/* Left Panel */}
        <div className="flex-1 bg-brand-green/20 dark:bg-brand-night-card/50 p-12 lg:p-24 flex flex-col items-center justify-center text-center relative z-10">
          <div className="mb-12 flex gap-8 scale-110 lg:scale-125 transform">
            <Paige expression="happy" isNight={isNight} />
            <div className="mt-8">
                <AuntyKitab isNight={isNight} expression="excited" />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-heading text-brand-brown dark:text-white mb-8 leading-tight">Join the Circle</h2>
          <p className="text-2xl md:text-3xl font-bold text-brand-brown/60 dark:text-gray-400 max-w-sm font-body">Connect your mind to the world's greatest stories.</p>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-10 md:p-16 lg:p-24 bg-white/90 dark:bg-brand-night-card/90 backdrop-blur-2xl relative z-10">
          <div className="max-w-md mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl md:text-6xl font-heading text-brand-brown dark:text-brand-gold mb-4">Login</h1>
              <p className="text-xl font-bold text-brand-brown/40 dark:text-white/20">Welcome back to EyePagE</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-3 group">
                <label className="text-sm font-black uppercase tracking-[0.3em] text-brand-brown/50 dark:text-white/30 ml-2">Email Identity</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-brown/30 group-focus-within:text-brand-green dark:group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dhruv@magic.com"
                    className="w-full bg-brand-cream/50 dark:bg-brand-night-bg/30 border-b-4 border-transparent focus:border-brand-green dark:focus:border-brand-gold rounded-[24px] py-6 pl-16 pr-8 font-black text-lg outline-none transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="text-sm font-black uppercase tracking-[0.3em] text-brand-brown/50 dark:text-white/30 ml-2">Secret Key</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-brand-brown/30 group-focus-within:text-brand-green dark:group-focus-within:text-brand-gold transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-brand-cream/50 dark:bg-brand-night-bg/30 border-b-4 border-transparent focus:border-brand-green dark:focus:border-brand-gold rounded-[24px] py-6 pl-16 pr-16 font-black text-lg outline-none transition-all shadow-inner"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6 opacity-40 hover:opacity-100 transition-opacity" /> : <Eye className="w-6 h-6 opacity-40 hover:opacity-100 transition-opacity" />}
                  </button>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary w-full py-6 text-2xl shadow-2xl shadow-brand-green/30 dark:shadow-brand-gold/20 flex items-center justify-center gap-4 font-black"
              >
                Enter Library <ArrowRight className="w-8 h-8" />
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
