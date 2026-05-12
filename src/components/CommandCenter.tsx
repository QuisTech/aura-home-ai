"use client";
import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, Zap, ShoppingCart, MessageSquare, TrendingDown, Bell, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuraCommandCenter() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'finance', msg: 'Analyzing electricity bill... Discovered $12 solar credit missing.', time: '2m ago' },
    { id: 2, type: 'security', msg: 'System armed. Front porch activity identified as "Courier".', time: '15m ago' },
    { id: 3, type: 'shopping', msg: 'Eggs price spike at Walmart (+22%). Rerouted order to Whole Foods.', time: '1h ago' },
  ]);

  const [savings, setSavings] = useState(142.50);

  useEffect(() => {
    const timer = setInterval(() => {
      const msgs = [
        "Switched your Milk order from Target to Walmart. Saved: $1.25.",
        "Detected unused Netflix subscription. Suggesting cancellation.",
        "Disputing $15 overcharge on your Comcast bill automatically.",
        "AC optimized for peak hours. Saved: $0.80 today.",
        "Package delivered. Identified as 'Amazon' - Safe to retrieve."
      ];
      const newLog = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'finance' : 'security',
        msg: `${msgs[Math.floor(Math.random() * msgs.length)]}`,
        time: 'Just now'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setSavings(s => s + (Math.random() * 0.5));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8 font-['Inter'] selection:bg-amber-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Elite Command Navbar */}
        <nav className="flex justify-between items-center mb-12 px-6 py-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-white">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
            </a>
            <div className="h-6 w-[1px] bg-slate-100" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <span className="text-sm font-black tracking-tighter text-slate-900 uppercase">Aura <span className="text-amber-500">Command</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-50 rounded-xl hover:bg-white hover:shadow-md transition-all relative">
              <Bell className="w-5 h-5 text-slate-400" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-xs text-white">
              AD
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Header Title Section */}
            <div className="px-2">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Home Sovereignty.</h1>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Active Status · 38 Autonomous Decisions Today</p>
            </div>

            {/* Stats Grid - High Depth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                icon={<TrendingDown className="w-6 h-6 text-emerald-500" />}
                label="Commercial Savings"
                value={`$${savings.toFixed(2)}`}
                sub="Auto-Optimized"
                trend="+12% from last week"
              />
              <StatCard 
                icon={<Shield className="w-6 h-6 text-blue-500" />}
                label="Guardian Protocol"
                value="Secure"
                sub="3 interceptions"
                trend="Perimeter Lock Active"
              />
              <StatCard 
                icon={<Zap className="w-6 h-6 text-amber-500" />}
                label="Power Balance"
                value="+12.4%"
                sub="HVAC Optimized"
                trend="Saved $0.80 today"
              />
            </div>

            {/* Live Reasoning Feed */}
            <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Autonomous Feed</h3>
                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Reasoning
                </div>
              </div>
              <div className="space-y-8">
                {logs.map((log) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={log.id} 
                    className="flex gap-8 items-center group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      log.type === 'finance' ? 'bg-amber-100 text-amber-600 shadow-amber-100/50' : 
                      log.type === 'security' ? 'bg-blue-100 text-blue-600 shadow-blue-100/50' : 'bg-emerald-100 text-emerald-600 shadow-emerald-100/50'
                    }`}>
                      {log.type === 'finance' ? <CreditCard className="w-6 h-6" /> : 
                       log.type === 'security' ? <Shield className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                    </div>
                    <div className="flex-1 border-b border-slate-50 pb-6">
                      <p className="text-lg text-slate-800 font-bold leading-tight group-hover:text-amber-600 transition-colors">{log.msg}</p>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{log.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - High Friction Assistant */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white h-full shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 mb-10">
                <h3 className="text-2xl font-black mb-2 flex items-center gap-3">
                  Aura Chat
                </h3>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Natural Language Logic</p>
              </div>

              <div className="flex-1 space-y-6 relative z-10">
                <div className="bg-white/5 rounded-2xl p-6 text-sm text-slate-300 leading-relaxed italic border border-white/10">
                  "Aura, find a better deal on my recurring organic milk order."
                </div>
                <div className="bg-amber-500/20 rounded-2xl p-6 text-sm text-amber-400 font-bold border border-amber-500/20">
                  "Found a 15% discount at Market Fresh. Order rerouted. Saved $2.10."
                </div>
              </div>

              <div className="mt-10 relative z-10">
                <input 
                  type="text" 
                  placeholder="Tell Aura to..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, sub, trend }: any) => (
  <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 border border-white hover:translate-y-[-5px] transition-all group">
    <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{label}</p>
    <div className="flex items-end gap-3 mb-2">
      <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
      <p className="text-emerald-500 text-[10px] font-black uppercase mb-2 tracking-widest">{trend}</p>
    </div>
    <p className="text-slate-500 text-sm font-bold">{sub}</p>
  </div>
);
