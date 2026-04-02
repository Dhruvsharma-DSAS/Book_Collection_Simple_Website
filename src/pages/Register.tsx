import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Paige from '../components/character/Paige'
import UncleBuku from '../components/character/UncleBuku'
import AuntyKitab from '../components/character/AuntyKitab'
import GrandpaGyaan from '../components/character/GrandpaGyaan'
import { Link } from 'react-router-dom'
import { User, Mail, Lock, CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import { useStore } from '../store/useStore'

const Register = () => {
  const { theme } = useStore()
  const isNight = theme === 'dark'
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(s => s + 1)
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 md:p-12 lg:p-24 bg-brand-cream dark:bg-brand-night-bg transition-colors duration-500">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row glass rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/20 dark:border-white/5 relative">
        {/* Left Visual with All Characters */}
        <div className="flex-1 bg-brand-green/20 dark:bg-brand-night-card/50 p-12 lg:p-24 flex flex-col items-center justify-center text-center">
            {step === 3 ? (
                <div className="grid grid-cols-2 gap-4 scale-75 lg:scale-100">
                    <Paige expression="happy" isNight={isNight} />
                    <AuntyKitab expression="excited" isNight={isNight} />
                    <UncleBuku expression="dramatic" isNight={isNight} />
                    <GrandpaGyaan isNight={isNight} />
                </div>
            ) : (
                <Paige expression={step === 2 ? "happy" : "idle"} isNight={isNight} />
            )}
            
            <h2 className="text-5xl lg:text-7xl font-heading text-brand-brown dark:text-white mt-12 mb-6">Explore EyePagE</h2>
            <p className="text-xl lg:text-2xl font-bold text-brand-brown/40 dark:text-white/20">Step {step} of 3</p>
            
            {/* Progress Pills */}
            <div className="mt-8 flex gap-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-12 h-2 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-green dark:bg-brand-gold w-16' : 'bg-brand-brown/10 dark:bg-white/10'}`} />
                ))}
            </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 p-12 lg:p-24 bg-white/90 dark:bg-brand-night-card/90">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="max-w-md mx-auto"
                >
                    {step === 1 && (
                        <div className="space-y-10">
                            <h3 className="text-4xl font-heading text-brand-brown dark:text-white mb-10">Personal Identity</h3>
                            <div className="space-y-6">
                                <Input label="What's your name?" icon={<User />} placeholder="Dhruv Sharma" />
                                <Input label="Email Address" icon={<Mail />} placeholder="dhruv@magic.com" />
                            </div>
                            <button onClick={nextStep} className="btn btn-primary w-full py-6 text-xl mt-12 font-black uppercase tracking-widest gap-4">
                                Continue <ChevronRight />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-10">
                             <h3 className="text-4xl font-heading text-brand-brown dark:text-white mb-10">Secure Your Portal</h3>
                            <div className="space-y-6">
                                <Input label="Your Secret Key" icon={<Lock />} type="password" placeholder="••••••••" />
                                <Input label="Confirm Key" icon={<CheckCircle2 />} type="password" placeholder="••••••••" />
                            </div>
                            <button onClick={nextStep} className="btn btn-primary w-full py-6 text-xl mt-12 font-black uppercase tracking-widest gap-4">
                                Almost Done <ChevronRight />
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-10 text-center">
                             <h3 className="text-4xl font-heading text-brand-brown dark:text-white mb-10">Perfect!</h3>
                             <p className="text-2xl font-bold text-brand-brown/60 dark:text-white/40 mb-12">The crew is ready to guide your journeyβ</p>
                             <Link to="/login" className="btn btn-primary w-full py-6 text-2xl mt-12 font-black uppercase tracking-[0.2em] shadow-premium gap-4">
                                Start Magic <Zap />
                             </Link>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const Input = ({ label, icon, placeholder, type = "text" }: any) => (
    <div className="space-y-3 group">
        <label className="text-sm font-black uppercase tracking-[0.3em] text-brand-brown/40 dark:text-white/20 ml-2">{label}</label>
        <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-brown/30 group-focus-within:text-brand-green dark:group-focus-within:text-brand-gold transition-colors">
                {React.cloneElement(icon, { size: 24 })}
            </span>
            <input 
                type={type}
                placeholder={placeholder}
                className="w-full bg-brand-cream/50 dark:bg-brand-night-bg/30 border-b-4 border-transparent focus:border-brand-green dark:focus:border-brand-gold rounded-[24px] py-6 pl-16 pr-8 font-black text-lg outline-none transition-all shadow-inner"
            />
        </div>
    </div>
)

export default Register
