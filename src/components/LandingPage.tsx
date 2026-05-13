"use client";
import React from 'react';
import { Shield, CreditCard, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/30 border-b border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-400/20">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Aura <span className="text-amber-500">Home</span></span>
    </div>
    <div className="flex gap-4 items-center">
      <a href="/command" className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all flex items-center justify-center min-h-[40px] whitespace-nowrap shadow-xl">
        Launch Console
      </a>
      <button className="hidden md:flex bg-amber-100 text-amber-700 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-200 transition-all items-center justify-center min-h-[40px]">
        Join Beta
      </button>
    </div>
  </nav>
);

export const Hero = ({ heroImage }: { heroImage: string }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
    {/* Full Screen High-Fidelity Background */}
    <div className="absolute inset-0 z-0">
      <img src={heroImage} alt="Premium Home" className="w-full h-full object-cover scale-105 opacity-100" />
      {/* Soft Pearl Gradients to blend sections */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/10" />
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 max-w-6xl px-8"
    >
      <span className="inline-block px-5 py-2 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-[0.5em] rounded-full mb-10 shadow-sm border border-amber-200">
        Autonomous Life Management
      </span>
      <h1 className="text-6xl md:text-[8rem] font-black text-slate-900 tracking-[-0.05em] mb-10 leading-[0.82] uppercase">
        Live More. <br />
        <span className="text-amber-500">Manage Less.</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto mb-16 leading-[1.6] [text-wrap:balance]">
        Aura is your autonomous home concierge. It manages your bills, secures your space, and optimizes your life—so you can focus on what actually matters.
      </p>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <a href="/command" className="bg-slate-900 text-white px-12 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] hover:scale-105 hover:bg-amber-500 transition-all shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] flex items-center gap-4 min-h-[70px] w-full md:w-fit justify-center">
          Launch Console <ArrowRight className="w-5 h-5" />
        </a>
        <button className="bg-white border-2 border-slate-200 text-slate-900 px-12 py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] hover:border-amber-400 transition-all min-h-[70px] w-full md:w-fit justify-center shadow-lg">
          Watch Film
        </button>
      </div>
    </motion.div>

    {/* Elegant Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-slate-300"
    >
      <div className="w-[1px] h-12 bg-gradient-to-b from-slate-300 to-transparent" />
    </motion.div>
  </section>
);

export const Features = () => (
  <section className="py-48 px-8 bg-white relative overflow-hidden">
    <div className="absolute top-48 left-0 right-0 text-center pointer-events-none opacity-[0.04] select-none">
      <h2 className="text-[25vw] font-black leading-none uppercase tracking-[-0.08em]">Aura</h2>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-40">
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-[-0.04em] mb-8 leading-[0.9] uppercase">Total Home <br/>Sovereignty.</h2>
        <div className="w-32 h-2.5 bg-amber-400 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <FeatureCard 
          icon={<CreditCard className="w-9 h-9 text-amber-500" />}
          title="Finance Sentinel"
          desc="Aura monitors your bills and grocery spending. It autonomously disputes overcharges and switches your orders to find the best local deals."
        />
        <FeatureCard 
          icon={<Shield className="w-9 h-9 text-emerald-500" />}
          title="Guardian Protocol"
          desc="Proactive home security that reasons. Aura distinguishes between the delivery driver and a stranger, managing access and alerts instantly."
        />
        <FeatureCard 
          icon={<Clock className="w-9 h-9 text-blue-500" />}
          title="Time Weaver"
          desc="Your personal life-orchestrator. Aura handles scheduling, appointment booking, and mental load, giving you back 15 hours every week."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-14 bg-[#fafafa] rounded-[4rem] border border-slate-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] hover:translate-y-[-12px] transition-all duration-700 group">
    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-12 shadow-xl group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter leading-tight uppercase">{title}</h3>
    <p className="text-slate-500 leading-[1.7] text-lg font-medium opacity-70 [text-wrap:balance]">{desc}</p>
  </div>
);

export const CTA = () => (
  <section className="py-24 px-4 md:px-8 bg-white">
    <div className="max-w-[1500px] mx-auto bg-slate-900 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_80px_160px_-40px_rgba(0,0,0,0.4)]">
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-amber-500/10 rounded-full blur-[150px] -mr-60 -mt-60" />
      <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-[150px] -ml-60 -mb-60" />
      
      <div className="relative z-10">
        <h2 className="text-5xl md:text-[9rem] font-black text-white tracking-[-0.06em] mb-12 leading-[0.8] uppercase">
          Ready to live <br />
          <span className="text-amber-400">Autopilot?</span>
        </h2>
        <p className="text-slate-400 text-xl md:text-2xl mb-20 max-w-2xl mx-auto font-medium leading-[1.6] [text-wrap:balance]">
          Join the exclusive waitlist for Aura Home AI and be the first to experience the world's first autonomous home concierge.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="bg-white/5 border border-white/10 rounded-[2.5rem] px-10 py-8 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-[500px] h-[80px] text-xl font-bold transition-all"
          />
          <button className="bg-amber-500 text-slate-900 px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all w-full md:w-fit h-[80px] text-sm">
            Reserve Access
          </button>
        </div>
      </div>
    </div>
  </section>
);
