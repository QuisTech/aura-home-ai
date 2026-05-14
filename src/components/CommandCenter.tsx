"use client";
import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, Zap, ShoppingCart, MessageSquare, TrendingDown, Bell, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuraCommandCenter() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'finance', msg: 'Analyzing electricity bill... Discovered $12 solar credit missing.', time: '2m ago' },
    { id: 2, type: 'security', msg: 'System armed. Front porch activity identified as "Courier".', time: '15m ago' },
    { id: 3, type: 'shopping', msg: 'Eggs price spike at Walmart (+22%). Rerouted order to Whole Foods.', time: '1h ago' },
  ]);

  const [savings, setSavings] = useState(142.50);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'model', text: 'Multimodal Agentic Sensors: ONLINE. I have autonomously resolved 12 financial leaks and committed the audit to the Sovereign MongoDB Vault. Specify intent for further resolution.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg, 
          history: chatHistory.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'model', text: "I'm currently optimizing home systems. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 font-['Inter'] selection:bg-amber-100">
      <div className="max-w-[1500px] mx-auto">
        
        {/* Elite Command Navbar */}
        <nav className="flex justify-between items-center mb-16 px-10 py-6 bg-white rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-white">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Home</span>
            </a>
            <div className="h-8 w-[1px] bg-slate-100" />
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg shadow-amber-200">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
              <span className="text-base font-black tracking-[-0.04em] text-slate-900 uppercase">Aura <span className="text-amber-500">Command</span></span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all relative group">
              <Bell className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-lg shadow-amber-200" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-xs text-white shadow-xl shadow-slate-200">
              AD
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Header Title Section */}
            <div className="px-4">
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-[-0.06em] mb-4 uppercase leading-none">Home Sovereignty.</h1>
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Multimodal Agentic Sensors: Active · 7 Specialist Agents · 38 Decisions
              </p>
            </div>

            {/* Stats Grid - High Depth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard 
                icon={<TrendingDown className="w-7 h-7 text-emerald-500" />}
                label="Commercial Savings"
                value={`$${savings.toFixed(2)}`}
                sub="Auto-Optimized"
                trend="+12% weekly"
              />
              <StatCard 
                icon={<Shield className="w-7 h-7 text-blue-500" />}
                label="Guardian Protocol"
                value="Secure"
                sub="Perimeter Active"
                trend="3 interceptions"
              />
              <StatCard 
                icon={<Zap className="w-7 h-7 text-amber-500" />}
                label="Power Balance"
                value="+12.4%"
                sub="HVAC Optimized"
                trend="Saved $0.80"
              />
            </div>

            {/* Vision Diagnostics - Multimodal Proof */}
            <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Live Multimodal Stream</span>
                 </div>
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-8 text-slate-400">Vision Advisor Diagnostic</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="aspect-video bg-slate-800 rounded-3xl relative overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Target: PERIMETER_7</p>
                       <p className="text-xs font-bold text-white uppercase">[Guardian] Identified: COURIER (Verified)</p>
                    </div>
                    {/* Simulated Scanner Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400/30 animate-[scan_3s_ease-in-out_infinite]" />
                 </div>
                 <div className="flex flex-col justify-center space-y-6">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Vision Reasoning</p>
                       <p className="text-sm font-medium text-slate-300 italic">"Analyzing porch feed... Courier matches historical delivery window. Rerouting Guard Protocol to monitor package placement."</p>
                    </div>
                    <div className="flex gap-4">
                       <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase rounded-lg">Face Match: 98.2%</div>
                       <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[8px] font-black uppercase rounded-lg">Object ID: FEDEX_V1</div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Live Reasoning Feed */}
            <div className="bg-white rounded-[4rem] p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="flex justify-between items-center mb-14">
                <h3 className="text-3xl font-black text-slate-900 tracking-[-0.04em] uppercase">Sovereign Logic Trace</h3>
                <div className="flex gap-4">
                   <AgentPillar label="FIN" active />
                   <AgentPillar label="GRD" />
                   <AgentPillar label="PNTRY" />
                   <AgentPillar label="NRGY" />
                   <AgentPillar label="WLNS" />
                   <AgentPillar label="TIME" />
                   <AgentPillar label="VIS" />
                </div>
              </div>
              <div className="space-y-12">
                {logs.map((log) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={log.id} 
                    className="flex gap-10 items-center group"
                  >
                    <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shrink-0 shadow-2xl transition-all duration-500 group-hover:scale-110 ${
                      log.type === 'finance' ? 'bg-amber-100 text-amber-600 shadow-amber-100/50' : 
                      log.type === 'security' ? 'bg-blue-100 text-blue-600 shadow-blue-100/50' : 'bg-emerald-100 text-emerald-600 shadow-emerald-100/50'
                    }`}>
                      {log.type === 'finance' ? <CreditCard className="w-7 h-7" /> : 
                       log.type === 'security' ? <Shield className="w-7 h-7" /> : <ShoppingCart className="w-7 h-7" />}
                    </div>
                    <div className="flex-1 border-b border-slate-50 pb-8">
                      <p className="text-xl text-slate-800 font-black leading-tight group-hover:text-amber-600 transition-colors uppercase tracking-tight">{log.msg}</p>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mt-3">{log.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - High Friction Assistant */}
          <div className="lg:col-span-1 space-y-12">
            <div className="bg-slate-900 rounded-[4rem] p-12 text-white h-full shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
              
              <div className="relative z-10 mb-14">
                <h3 className="text-3xl font-black mb-3 tracking-tighter uppercase leading-none">Aura Chat</h3>
                <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.4em]">Natural Logic</p>
              </div>

              <div className="flex-1 space-y-6 relative z-10 overflow-y-auto max-h-[400px] mb-8 pr-2 custom-scrollbar">
                {chatHistory.map((h, i) => (
                  <div key={i} className={`p-6 rounded-3xl text-sm leading-relaxed ${
                    h.role === 'user' ? 'bg-white/10 text-white ml-8 border border-white/10' : 'bg-amber-500/10 text-amber-500 font-black border border-amber-500/10'
                  }`}>
                    {h.text}
                  </div>
                ))}
                {isLoading && <div className="text-amber-500 animate-pulse font-black text-[10px] uppercase tracking-widest">Aura is reasoning...</div>}
              </div>

              <form onSubmit={handleChat} className="mt-auto relative z-10">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="COMMAND AURA..." 
                  className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-8 py-6 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-black uppercase tracking-widest text-xs"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AgentPillar = ({ label, active }: any) => (
  <div className={`px-4 py-2 rounded-xl text-[8px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${
    active ? 'bg-amber-400 text-white shadow-lg shadow-amber-200 scale-110' : 'bg-slate-50 text-slate-300'
  }`}>
    {label}
  </div>
);

const StatCard = ({ icon, label, value, sub, trend }: any) => (
  <div className="bg-white p-12 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-white hover:translate-y-[-8px] transition-all duration-500 group">
    <div className="w-16 h-16 bg-[#fafafa] rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner">
      {icon}
    </div>
    <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em] mb-4">{label}</p>
    <div className="flex items-end gap-3 mb-3">
      <p className="text-5xl font-black text-slate-900 tracking-[-0.06em] leading-none uppercase">{value}</p>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Multimodal Agentic Sensors: ONLINE</span>
      </div>
    </div>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">{trend}</p>
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-60">{sub}</p>
  </div>
);
