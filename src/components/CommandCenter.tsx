"use client";
import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, Zap, ShoppingCart, MessageSquare, TrendingDown, Bell } from 'lucide-react';
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
        "Scanning for insurance discounts...",
        "detected smart-thermostat inefficiency (-12%).",
        "Comparison shopping for recurring household items complete.",
        "Security check: All perimeter sensors nominal.",
        "Disputing duplicate Netflix charge with provider..."
      ];
      const newLog = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'finance' : 'security',
        msg: `Aura: ${msgs[Math.floor(Math.random() * msgs.length)]}`,
        time: 'Just now'
      };
      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setSavings(s => s + (Math.random() * 0.5));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Home Command</h1>
            <p className="text-slate-500 font-medium">Good Morning. Aura is protecting your home.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all relative">
              <Bell className="w-6 h-6 text-slate-600" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-amber-500 rounded-full" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center font-bold text-amber-700">
              AD
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            icon={<TrendingDown className="w-6 h-6 text-emerald-500" />}
            label="Total Saved"
            value={`$${savings.toFixed(2)}`}
            sub="Auto-Optimized this month"
          />
          <StatCard 
            icon={<Shield className="w-6 h-6 text-blue-500" />}
            label="Home Security"
            value="Active"
            sub="3 detections suppressed today"
          />
          <StatCard 
            icon={<Zap className="w-6 h-6 text-amber-500" />}
            label="Energy Efficiency"
            value="+12.4%"
            sub="Compared to last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reasoning Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 h-full">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">AI Reasoning Loop</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Live Autonomy
                </span>
              </div>
              <div className="space-y-6">
                {logs.map((log) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={log.id} 
                    className="flex gap-6 items-start group"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      log.type === 'finance' ? 'bg-amber-100 text-amber-600' : 
                      log.type === 'security' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {log.type === 'finance' ? <CreditCard className="w-5 h-5" /> : 
                       log.type === 'security' ? <Shield className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold leading-snug group-hover:text-amber-600 transition-colors">{log.msg}</p>
                      <p className="text-slate-400 text-xs font-medium mt-1 uppercase tracking-widest">{log.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Assistant Box */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-amber-400" /> Aura Chat
              </h3>
              <div className="bg-white/5 rounded-2xl p-4 mb-8 text-sm text-slate-400 leading-relaxed italic border border-white/10">
                "Aura, why is my energy bill so high?"
              </div>
              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Aura responds using autonomous reasoning to explain your home's performance in simple, everyday terms.
              </p>
              <input 
                type="text" 
                placeholder="Ask Aura anything..." 
                className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, label, value, sub }: any) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/30 border border-slate-100 hover:scale-[1.02] transition-all">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-black text-slate-900 mb-2">{value}</p>
    <p className="text-slate-400 text-xs font-medium italic">{sub}</p>
  </div>
);
