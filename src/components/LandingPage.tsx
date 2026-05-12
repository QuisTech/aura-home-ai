"use client";
import React from 'react';
import { Shield, CreditCard, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/30 border-b border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Aura <span className="text-amber-500">Home</span></span>
    </div>
    <div className="flex gap-4 items-center">
      <a href="/command" className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center justify-center min-h-[40px] whitespace-nowrap">
        Launch Console
      </a>
      <button className="hidden md:flex bg-amber-100 text-amber-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-amber-200 transition-all items-center justify-center min-h-[40px]">
        Join Beta
      </button>
    </div>
  </nav>
);

export const Hero = ({ heroImage }: { heroImage: string }) => (
  <section className="relative min-h-screen pt-32 pb-20 px-8 flex flex-col items-center text-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img src={heroImage} alt="Premium Home" className="w-full h-full object-cover opacity-20 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-slate-50" />
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-4xl"
    >
      <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
        Autonomous Life Management
      </span>
      <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
        Live More. <br />
        <span className="text-amber-500">Manage Less.</span>
      </h1>
      <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
        Aura is your autonomous home concierge. It manages your bills, secures your space, and optimizes your life—so you can focus on what actually matters.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <a href="/command" className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3 min-h-[60px] w-full md:w-fit justify-center">
          Launch Console <ArrowRight className="w-4 h-4" />
        </a>
        <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-amber-400 transition-all min-h-[60px] w-full md:w-fit justify-center">
          Watch Film
        </button>
      </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="relative z-10 mt-20 w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/20"
    >
      <img src={heroImage} alt="Aura Interface" className="w-full h-auto" />
    </motion.div>
  </section>
);

export const Features = () => (
  <section className="py-40 px-8 bg-white relative overflow-hidden">
    <div className="absolute top-40 left-0 right-0 text-center pointer-events-none opacity-[0.03] select-none">
      <h2 className="text-[20vw] font-black leading-none uppercase tracking-tighter">Concierge</h2>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-32">
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">Total Home Sovereignty.</h2>
        <div className="w-24 h-2 bg-amber-400 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard 
          icon={<CreditCard className="w-8 h-8 text-amber-500" />}
          title="Finance Sentinel"
          desc="Aura monitors your bills and grocery spending. It autonomously disputes overcharges and switches your orders to find the best local deals."
        />
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-emerald-500" />}
          title="Guardian Protocol"
          desc="Proactive home security that reasons. Aura distinguishes between the delivery driver and a stranger, managing access and alerts instantly."
        />
        <FeatureCard 
          icon={<Clock className="w-8 h-8 text-blue-500" />}
          title="Time Weaver"
          desc="Your personal life-orchestrator. Aura handles scheduling, appointment booking, and mental load, giving you back 15 hours every week."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-12 bg-[#fafafa] rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 hover:translate-y-[-10px] transition-all duration-500 group">
    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-base font-medium opacity-80">{desc}</p>
  </div>
);

export const CTA = () => (
  <section className="py-20 px-4 md:px-8 bg-white">
    <div className="max-w-[1400px] mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-amber-500/10 rounded-full blur-[120px] -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[120px] -ml-40 -mb-40" />
      
      <div className="relative z-10">
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.85]">
          Ready to live on <br />
          <span className="text-amber-400">Autopilot?</span>
        </h2>
        <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          Join the exclusive waitlist for Aura Home AI and be the first to experience the world's first autonomous home concierge.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="bg-white/5 border border-white/10 rounded-[2rem] px-8 py-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-[400px] h-[70px] text-lg font-bold"
          />
          <button className="bg-amber-500 text-slate-900 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all w-full md:w-fit h-[70px]">
            Reserve Access
          </button>
        </div>
      </div>
    </div>
  </section>
);
