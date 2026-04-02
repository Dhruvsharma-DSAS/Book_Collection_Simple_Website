import React from 'react'
import { motion } from 'framer-motion'
import UncleBuku from '../components/character/UncleBuku'
import { Link } from 'react-router-dom'
import { Search, Mail, MessageCircle, HelpCircle, FileText, Settings, ShieldCheck, Zap } from 'lucide-react'
import { useStore } from '../store/useStore'

const Support = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'
  return (
    <div className="py-24 px-8 md:px-16 lg:px-24 container mx-auto">
      <header className="mb-24 text-center max-w-4xl mx-auto relative">
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-brand-green/10 dark:bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-green dark:text-brand-gold mx-auto mb-10 border border-brand-green/20"
          >
            <HelpCircle size={32} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl mb-8 text-brand-brown dark:text-white font-heading"
        >
          We're Here to Help
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold text-brand-brown/60 dark:text-gray-400"
        >
          Lost in a chapter? Need a hand with your library?
        </motion.p>
        
        <div className="absolute -top-12 -right-24 hidden xl:block pointer-events-none scale-110">
            <UncleBuku expression="dramatic" isNight={isNight} />
        </div>
      </header>

      {/* Global Search */}
      <div className="max-w-4xl mx-auto mb-32 group">
        <div className="relative">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-brand-brown/30 group-focus-within:text-brand-green dark:group-focus-within:text-brand-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search for answers, guides, or help..."
            className="w-full bg-brand-cream/50 dark:bg-brand-night-bg/30 border-2 border-transparent focus:border-brand-green/30 dark:focus:border-brand-gold/30 rounded-[40px] py-10 pl-20 pr-10 font-bold text-2xl shadow-premium outline-none transition-all placeholder:text-brand-brown/20 dark:placeholder:text-white/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
          <HelpCard icon={<MessageCircle />} title="Live Portal" desc="Chat with EyePagE curators 24/7." />
          <HelpCard icon={<FileText />} title="Help Guides" desc="Learn how to master your reading habits." />
          <HelpCard icon={<Settings />} title="Account Info" desc="Manage your streak and membership settings." />
          <HelpCard icon={<ShieldCheck />} title="Privacy Box" desc="How we protect your reading data." />
      </div>

      <div className="max-w-5xl mx-auto glass p-12 lg:p-24 rounded-[60px] border-b-8 border-brand-green/20 dark:border-brand-gold/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              <div className="flex-1 space-y-10">
                  <h2 className="text-4xl md:text-6xl font-heading text-brand-brown dark:text-white">Still Unsure?</h2>
                  <p className="text-2xl font-bold text-brand-brown/60 dark:text-gray-400">Direct message our support team and we'll get back to you in a heartbeat.</p>
                  <button className="btn btn-primary text-xl px-12 py-5 shadow-premium flex items-center justify-center gap-4 group uppercase tracking-[0.2em] font-black">
                     Send Message <Zap className="group-hover:rotate-12 transition-transform h-6 w-6" />
                  </button>
              </div>
              <div className="flex-1 w-full bg-brand-green/5 dark:bg-brand-brown/10 p-12 rounded-[40px] border border-white/10 shadow-inner group">
                  <form className="space-y-6">
                      <input placeholder="Your Name" className="w-full bg-white dark:bg-brand-night-bg/50 px-8 py-6 rounded-[24px] outline-none border-2 border-transparent focus:border-brand-green/30 dark:focus:border-brand-gold/30 font-bold text-lg" />
                      <input placeholder="Your Email" className="w-full bg-white dark:bg-brand-night-bg/50 px-8 py-6 rounded-[24px] outline-none border-2 border-transparent focus:border-brand-green/30 dark:focus:border-brand-gold/30 font-bold text-lg" />
                      <textarea placeholder="Tell us everything..." rows={4} className="w-full bg-white dark:bg-brand-night-bg/50 px-8 py-6 rounded-[24px] outline-none border-2 border-transparent focus:border-brand-green/30 dark:focus:border-brand-gold/30 font-bold text-lg resize-none"></textarea>
                  </form>
              </div>
          </div>
      </div>
    </div>
  )
}

const HelpCard = ({ icon, title, desc }: any) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02, rotate: 1 }}
    className="glass p-10 rounded-[40px] border-b-4 border-brand-green/10 dark:border-brand-gold/10 flex flex-col items-center text-center transition-all group hover:bg-brand-green/5 dark:hover:bg-brand-gold/5"
  >
    <div className="mb-6 p-4 rounded-2xl bg-brand-green/10 dark:bg-brand-gold/10 text-brand-green dark:text-brand-gold group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 36, strokeWidth: 2.5 })}
    </div>
    <h3 className="text-2xl font-heading text-brand-brown dark:text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-lg font-bold text-brand-brown/50 dark:text-gray-500 leading-tight">{desc}</p>
  </motion.div>
)

export default Support
