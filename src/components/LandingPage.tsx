"use client";
import React from 'react';
import { Shield, CreditCard, Clock, CheckCircle, ArrowRight, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/30 border-b border-white/10">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Aura <span className="text-amber-500">Home</span></span>
    </div>
    <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-600 uppercase tracking-widest">
      <a href="#" className="hover:text-amber-500 transition-colors">Concierge</a>
      <a href="#" className="hover:text-amber-500 transition-colors">Security</a>
      <a href="#" className="hover:text-amber-500 transition-colors">Pricing</a>
    </div>
    <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-all">
      Join Beta
    </button>
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
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3">
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
        <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-5 rounded-2xl text-sm font-bold uppercase tracking-widest hover:border-amber-400 transition-all">
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
  <section className="py-32 px-8 bg-slate-50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">The Concierge Experience.</h2>
        <p className="text-slate-500 font-medium">Three pillars of total home autonomy.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<CreditCard className="w-6 h-6 text-amber-500" />}
          title="Finance Sentinel"
          desc="Aura monitors your bills and grocery spending. It autonomously disputes overcharges and switches your orders to find the best local deals."
        />
        <FeatureCard 
          icon={<Shield className="w-6 h-6 text-emerald-500" />}
          title="Guardian Protocol"
          desc="Proactive home security that reasons. Aura distinguishes between the delivery driver and a stranger, managing access and alerts instantly."
        />
        <FeatureCard 
          icon={<Clock className="w-6 h-6 text-blue-500" />}
          title="Time Weaver"
          desc="Your personal life-orchestrator. Aura handles scheduling, appointment booking, and mental load, giving you back 15 hours every week."
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="p-10 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 hover:scale-105 transition-all">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

export const CTA = () => (
  <section className="py-32 px-8">
    <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-16 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 relative z-10">
        Ready to live on <br />
        <span className="text-amber-400">Autopilot?</span>
      </h2>
      <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto relative z-10">
        Join the exclusive waitlist for Aura Home AI and be the first to experience the world's first autonomous home concierge.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-80"
        />
        <button className="bg-amber-500 text-slate-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-all">
          Reserve Access
        </button>
      </div>
    </div>
  </section>
);
