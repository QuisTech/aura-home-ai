import React from 'react';
import { Shield, Eye, Target, Activity, CreditCard, Zap, ShoppingCart, Clock } from 'lucide-react';

export const AgentDiagnostic = ({ activeAgent }: { activeAgent: string }) => {
  const agentConfig: any = {
    'FIN': {
      title: "Finance Sentinel Diagnostic",
      target: "BANK_API_SYNC",
      stream: "Live Ledger Stream",
      icon: <CreditCard className="w-8 h-8 text-emerald-500" />,
      feedIcon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      feedTitle: "Identified:",
      feedHighlight: "LEAK",
      status: "Analyzing ledgers",
      reasoning: "Scanning 30-day transaction history... Detected recurring anomaly on Visa ending in 4092. Flagging for deep audit.",
      metric1Label: "Confidence", metric1Value: "94.5%", metric1Color: "text-emerald-500", metric1Icon: <Target className="w-4 h-4 text-emerald-500" />,
      metric2Label: "Potential Loss", metric2Value: "$42.99", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-blue-500" />
    },
    'VIS': {
      title: "Vision Advisor Diagnostic",
      target: "PERIMETER_7",
      stream: "Live Multimodal Stream",
      icon: <Eye className="w-8 h-8 text-amber-500" />,
      feedIcon: <Shield className="w-5 h-5 text-amber-500" />,
      feedTitle: "Identified:",
      feedHighlight: "COURIER",
      status: "Identity Verified",
      reasoning: "Analyzing porch feed... Courier matches historical delivery window. Rerouting Guard Protocol to monitor package placement.",
      metric1Label: "Face Match", metric1Value: "98.2%", metric1Color: "text-emerald-500", metric1Icon: <Target className="w-4 h-4 text-emerald-500" />,
      metric2Label: "Object ID", metric2Value: "FEDEX_V1", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-blue-500" />
    },
    'GRD': {
      title: "Guardian Protocol Diagnostic",
      target: "PERIMETER_ALL",
      stream: "Live Sensor Stream",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      feedIcon: <Shield className="w-5 h-5 text-blue-500" />,
      feedTitle: "Threat Level:",
      feedHighlight: "ZERO",
      status: "All Zones Secure",
      reasoning: "Cross-referencing neighborhood watch APIs with local perimeter sensors. No anomalies detected in the last 48 hours.",
      metric1Label: "Sensors", metric1Value: "42/42", metric1Color: "text-blue-500", metric1Icon: <Target className="w-4 h-4 text-blue-500" />,
      metric2Label: "Status", metric2Value: "LOCKED", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-emerald-500" />
    },
    'PNTRY': {
      title: "Pantry Architect Diagnostic",
      target: "INVENTORY_SYNC",
      stream: "Live Stock Stream",
      icon: <ShoppingCart className="w-8 h-8 text-orange-500" />,
      feedIcon: <ShoppingCart className="w-5 h-5 text-orange-500" />,
      feedTitle: "Critical Low:",
      feedHighlight: "EGGS",
      status: "Ordering Replacement",
      reasoning: "Computer vision in fridge detects egg count below threshold. Checking real-time prices across local grocers for best value.",
      metric1Label: "Stock Level", metric1Value: "84%", metric1Color: "text-orange-500", metric1Icon: <Target className="w-4 h-4 text-orange-500" />,
      metric2Label: "Pending", metric2Value: "3 Items", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-blue-500" />
    },
    'NRGY': {
      title: "Energy Optimizer Diagnostic",
      target: "HVAC_MAIN",
      stream: "Live Grid Stream",
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      feedIcon: <Zap className="w-5 h-5 text-yellow-400" />,
      feedTitle: "Grid Status:",
      feedHighlight: "PEAK",
      status: "Load Shedding",
      reasoning: "Smart meter reports transition to peak pricing tier. Pre-cooling phase complete. Shedding non-essential HVAC loads.",
      metric1Label: "Grid Rate", metric1Value: "$0.24/kWh", metric1Color: "text-red-500", metric1Icon: <Target className="w-4 h-4 text-red-500" />,
      metric2Label: "Offset", metric2Value: "-2.4kW", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-emerald-500" />
    },
    'WLNS': {
      title: "Wellness Advisor Diagnostic",
      target: "ENVIRONMENT_1",
      stream: "Live Air Stream",
      icon: <Activity className="w-8 h-8 text-pink-500" />,
      feedIcon: <Activity className="w-5 h-5 text-pink-500" />,
      feedTitle: "Indoor AQI:",
      feedHighlight: "42",
      status: "Optimal",
      reasoning: "Monitoring indoor VOCs and outdoor pollen count. Air purifiers are operating at 30% capacity to maintain optimal air quality.",
      metric1Label: "AQI", metric1Value: "42", metric1Color: "text-emerald-500", metric1Icon: <Target className="w-4 h-4 text-emerald-500" />,
      metric2Label: "Humidity", metric2Value: "45%", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-blue-500" />
    },
    'TIME': {
      title: "Timeline Coordinator Diagnostic",
      target: "SCHEDULE_SYNC",
      stream: "Live Event Stream",
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      feedIcon: <Clock className="w-5 h-5 text-purple-500" />,
      feedTitle: "Next Event:",
      feedHighlight: "GYM",
      status: "Preparing Transit",
      reasoning: "Calendar sync indicates gym session in 45 mins. Pre-conditioning EV battery and adjusting home security protocol for departure.",
      metric1Label: "ETA", metric1Value: "45m", metric1Color: "text-purple-500", metric1Icon: <Target className="w-4 h-4 text-purple-500" />,
      metric2Label: "Conflicts", metric2Value: "0", metric2Color: "text-white", metric2Icon: <Activity className="w-4 h-4 text-blue-500" />
    }
  };

  const config = agentConfig[activeAgent] || agentConfig['VIS'];

  return (
    <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
      {/* Scanning Animation Header */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 animate-scan" />
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
            {config.icon}
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter uppercase leading-none mb-2">{config.title}</h3>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">TARGET: {config.target}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full">
          <span className="text-[10px] text-red-500 font-black tracking-[0.3em] uppercase">{config.stream}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Simulated Feed */}
        <div className="aspect-video bg-slate-800 rounded-[2.5rem] relative overflow-hidden border border-white/5 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3 mb-2">
              {config.feedIcon}
              <span className="text-lg font-black text-white uppercase tracking-tight">
                {config.feedTitle} <span className="text-amber-500">{config.feedHighlight}</span>
              </span>
            </div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full w-fit">{config.status}</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-400/30 animate-scan" />
        </div>

        {/* Intelligence Data */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <label className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mb-4 block">Agent Reasoning Engine</label>
            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/5 italic text-lg text-slate-300 leading-relaxed shadow-xl">
              "{config.reasoning}"
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                {config.metric1Icon}
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{config.metric1Label}</span>
              </div>
              <div className={`text-4xl font-black ${config.metric1Color} tracking-tighter`}>{config.metric1Value}</div>
            </div>
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                {config.metric2Icon}
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{config.metric2Label}</span>
              </div>
              <div className={`text-4xl font-black ${config.metric2Color} tracking-tighter`}>{config.metric2Value}</div>
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
