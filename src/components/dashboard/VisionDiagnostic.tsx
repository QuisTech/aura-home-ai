import React from 'react';
import { Shield, Eye, Target, Activity } from 'lucide-react';

export const VisionDiagnostic = () => {
  return (
    <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
      {/* Scanning Animation Header */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 animate-scan" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
            <Eye className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-2">Vision Advisor Diagnostic</h3>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">TARGET: PERIMETER_7</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full">
          <span className="text-[10px] text-red-500 font-black tracking-[0.3em] uppercase">Live Multimodal Stream</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Simulated Camera Feed */}
        <div className="aspect-video bg-slate-800 rounded-[2.5rem] relative overflow-hidden border border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-lg font-black text-white uppercase tracking-tight">
                [Guardian] Identified: <span className="text-amber-500">COURIER</span>
              </span>
            </div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full w-fit">Identity Verified</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400/30 animate-scan" />
        </div>

        {/* Intelligence Data */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <label className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mb-4 block">Vision Reasoning Engine</label>
            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5 italic text-lg text-slate-300 leading-relaxed shadow-xl">
              "Analyzing porch feed... Courier matches historical delivery window. Rerouting Guard Protocol to monitor package placement."
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Face Match</span>
              </div>
              <div className="text-4xl font-black text-emerald-500 tracking-tighter">98.2%</div>
            </div>
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Object ID</span>
              </div>
              <div className="text-4xl font-black text-white tracking-tighter">FEDEX_V1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} 
      />
    </div>
  );
};
