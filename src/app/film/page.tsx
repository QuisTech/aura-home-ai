"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FilmPage() {
  return (
    <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-amber-500/10 rounded-full blur-[150px] -mr-60 -mt-60" />
      <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-[150px] -ml-60 -mb-60" />

      <nav className="fixed top-0 left-0 right-0 p-8 z-50">
        <a href="/" className="flex items-center gap-3 text-white/50 hover:text-white transition-all group">
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Exit Cinema</span>
        </a>
      </nav>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] border border-white/10 bg-black"
      >
        {/* We use the cinematic webp recording generated during the walkthrough */}
        <img 
          src="https://raw.githubusercontent.com/QuisTech/aura-home-ai/main/public/demo-cinematic.webp" 
          alt="Aura Home AI Cinematic Demo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Aura: Sovereignty</h1>
          <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Official Hackathon Demo · 2026</p>
        </div>
      </motion.div>
    </main>
  );
}
