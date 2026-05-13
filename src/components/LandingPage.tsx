"use client";
import React from 'react';
import { 
  Shield, CreditCard, Clock, ArrowRight, ChevronDown, 
  Zap, ShoppingCart, Activity, Eye, 
  Database, Brain
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md bg-white/10 border-b border-white/5">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-400/20">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
      <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Aura <span className="text-amber-500">Home</span></span>
    </div>
    <div className="flex gap-4 items-center">
      <a href="/command" className="bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-500 transition-all flex items-center justify-center min-h-[40px] shadow-xl">
        Launch Console
      </a>
    </div>
  </nav>
);

export const Hero = () => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Earliest
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop", // Current
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop", // Zen Bedroom
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"  // Luxury Exterior
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Fold 1: Pure Visual Inspiration (Carousel) */}
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0 flex">
          {images.map((img, i) => (
            <motion.img 
              key={i}
              src={img} 
              alt={`Inspiration ${i}`} 
              initial={{ opacity: 0 }}
              animate={{ opacity: i === currentImage ? 0.9 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover scale-105" 
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40" />
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
        >
          <div className="flex gap-2 mb-2">
            {images.map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full transition-all duration-500 ${i === currentImage ? 'w-4 bg-amber-500' : 'bg-white/20'}`} />
            ))}
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/50">Discover Sovereignty</span>
          <ChevronDown className="w-5 h-5 text-amber-500" />
        </motion.div>
      </section>

    {/* Fold 2: The Logic Pipeline */}
    <section className="py-32 px-8 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-20 uppercase leading-none">
          Sensor. <span className="text-amber-500">Reason.</span> Resolve.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <PipelineStep icon={<Eye />} title="01. SENSE" desc="Home sensors & APIs capture environmental, financial, and security data." />
          <PipelineStep icon={<Brain />} title="02. REASON" desc="Gemini 2.0 processes intent and devises an autonomous path." />
          <PipelineStep icon={<Database />} title="03. PERSIST" desc="Decisions are committed to the Sovereign MongoDB Vault via MCP." />
          <PipelineStep icon={<Zap />} title="04. RESOLVE" desc="Aura executes. Bills disputed. Orders rerouted. Home secured." />
        </div>
      </div>
    </section>

    {/* Fold 3: The Seven Pillars */}
    <section className="py-48 px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40">
          <h2 className="text-5xl md:text-9xl font-black text-slate-900 tracking-[-0.05em] mb-8 uppercase leading-none">
            The <br/><span className="text-amber-500">Aura Seven.</span>
          </h2>
          <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">Core Autopilot Orchestration · Total Home Sovereignty</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SpecialistCard id="001" title="Finance Sentinel" icon={<CreditCard />} desc="Disputes overcharges and manages household debt automatically." />
          <SpecialistCard id="002" title="Guardian Protocol" icon={<Shield />} desc="Proactive security that reasons between couriers and intruders." />
          <SpecialistCard id="003" title="Time Weaver" icon={<Clock />} desc="Orchestrates complex schedules and automates mental load." />
          <SpecialistCard id="004" title="Pantry Pilot" icon={<ShoppingCart />} desc="Monitors inventory and reroutes orders for local deals." />
          <SpecialistCard id="005" title="Energy Architect" icon={<Zap />} desc="Optimizes HVAC and power usage against peak utility rates." />
          <SpecialistCard id="006" title="Wellness Warden" icon={<Activity />} desc="Tracks family health metrics and automates prescriptions." />
          <SpecialistCard id="007" title="Vision Advisor" icon={<Eye />} desc="Uses Gemini Vision to analyze live camera feeds for context." />
          <div className="p-12 bg-slate-900 rounded-[3.5rem] text-white flex flex-col justify-center items-center text-center shadow-2xl">
            <Database className="w-12 h-12 text-amber-500 mb-6" />
            <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">Sovereign Vault</h3>
            <p className="text-slate-500 text-xs font-medium">Powered by MongoDB Atlas via Model Context Protocol (MCP)</p>
          </div>
        </div>
      </div>
    </section>

    {/* Fold 4: The Data (Impact) */}
    <section className="py-32 px-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <ImpactCard 
          title="Subscription Creep" 
          stat="-$920/yr" 
          desc="Average household loses $920 annually to unused recurring subscriptions."
          ref="Aura Research · 2026"
        />
        <ImpactCard 
          title="Energy Leakage" 
          stat="24.5%" 
          desc="Autonomous HVAC optimization reduces waste by nearly a quarter."
          ref="Department of Energy · 2025"
        />
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1500px] mx-auto bg-slate-900 rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
        <h2 className="text-5xl md:text-[9rem] font-black text-white tracking-[-0.06em] mb-12 uppercase leading-[0.8]">
          Ready to live <br />
          <span className="text-amber-400">Autopilot?</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="/command" className="bg-amber-500 text-slate-900 px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all h-[80px] flex items-center">
            Reserve Access
          </a>
          <a href="/film" className="bg-white/10 text-white px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-slate-900 transition-all h-[80px] flex items-center">
            Watch Film
          </a>
        </div>
      </div>
    </section>
  </>
);

const PipelineStep = ({ icon, title, desc }: any) => (
  <div className="flex flex-col items-center group">
    <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-xl">
      <div className="text-amber-500 w-10 h-10">{icon}</div>
    </div>
    <h3 className="text-sm font-black tracking-widest uppercase mb-4">{title}</h3>
    <p className="text-slate-500 text-xs leading-relaxed max-w-[200px]">{desc}</p>
  </div>
);

const SpecialistCard = ({ id, title, icon, desc }: any) => (
  <div className="p-10 bg-[#fafafa] rounded-[3rem] border border-slate-100 hover:translate-y-[-10px] transition-all duration-500 group">
    <div className="text-slate-300 text-[8px] font-black uppercase tracking-[0.5em] mb-6">{id} Specialist</div>
    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
      <div className="text-amber-500 w-6 h-6">{icon}</div>
    </div>
    <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight uppercase leading-none">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-xs font-medium opacity-80">{desc}</p>
  </div>
);

const ImpactCard = ({ title, stat, desc, ref }: any) => (
  <div className="p-16 bg-white rounded-[4rem] border border-slate-100 shadow-xl">
    <div className="flex justify-between items-start mb-10">
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{title}</h3>
      <div className="px-4 py-1.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-[0.3em] rounded-full">
        {ref}
      </div>
    </div>
    <div className="text-7xl font-black text-amber-500 tracking-tighter mb-8">{stat}</div>
    <p className="text-slate-500 text-lg font-medium leading-relaxed">{desc}</p>
  </div>
);
