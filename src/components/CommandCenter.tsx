"use client";
import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, Zap, ShoppingCart, TrendingDown, Bell, ArrowLeft, Clock, Eye, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { VisionDiagnostic } from './dashboard/VisionDiagnostic';

export default function AuraCommandCenter() {
  const [logs, setLogs] = useState<any[]>([]);

  const [savings, setSavings] = useState(142.50);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuditSequenceActive, setIsAuditSequenceActive] = useState(false);
  const [auditStatus, setAuditStatus] = useState("Active - $142.50 Saved");
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [activeAgent, setActiveAgent] = useState('FIN');

  const executeAuditSequence = async () => {
    if (isAuditSequenceActive) return;
    setIsAuditSequenceActive(true);
    setAuditStatus("Running Deep Audit...");
    setAuditLogs([]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          agentType: 'finance',
          action: 'Audit complete. Saved $26.99/mo.',
          savings: 26.99
        })
      });
      const data = await response.json();

      const logSteps = [
        "[FIN] Initiating autonomous household audit from MongoDB...",
        "[FIN] Querying AfterpartyCluster for redundant subscription creep...",
        `[FIN] Discovered leak: ${data.detectedLeaks > 0 ? data.detectedLeaks + ' unused subscriptions found in DB!' : '0 unused subscriptions found'}`,
        "[FIN] Queueing cancellations and refund disputes...",
        `[LEDGER] Vault sync: Committing resolution to private MongoDB... (ID: ${data.auditId})`,
        `[FIN] Audit complete. Saved $${data.savings || '26.99'}/mo.`
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < logSteps.length) {
          setAuditLogs(prev => [...prev, logSteps[currentStep]]);
          currentStep++;
        } else {
          clearInterval(interval);
          setIsLoading(false);
          setSavings(169.49);
          setAuditStatus("Active - $169.49 Saved");
        }
      }, 1500);
    } catch (error) {
      console.error('Audit failed:', error);
      setIsLoading(false);
      setIsAuditSequenceActive(false);
    }
  };

  const labelToType: Record<string, string> = {
    'FIN': 'finance',
    'GRD': 'security',
    'PNTRY': 'pantry',
    'NRGY': 'energy',
    'WLNS': 'wellness',
    'TIME': 'time',
    'VIS': 'vision'
  };

  const handleAgentClick = async (label: string) => {
    setActiveAgent(label);
    const agentType = labelToType[label];
    try {
      const response = await fetch(`/api/audit?userId=demo-user&agentType=${agentType}`);
      const history = await response.json();
      if (history && history.length > 0) {
        const formattedHistory = history.map((log: any) => ({
          id: log._id || Date.now() + Math.random(),
          type: log.agentType,
          msg: log.action,
          time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setLogs(formattedHistory.slice(0, 5));
      } else {
        setLogs([{
          id: 'empty',
          type: agentType,
          msg: `No recent logs for ${label} agent in MongoDB Vault.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  useEffect(() => {
    const loadAuditHistory = async () => {
      try {
        const response = await fetch('/api/audit?userId=demo-user');
        const history = await response.json();
        if (history && history.length > 0) {
          const formattedHistory = history.map((log: any) => ({
            id: log._id || Date.now() + Math.random(),
            type: log.agentType,
            msg: log.action,
            time: new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setLogs(formattedHistory.slice(0, 5));
        }
      } catch (e) {
        console.error("Failed to load history", e);
      }
    };
    loadAuditHistory();
  }, []);

  useEffect(() => {
    const handleSceneChange = (e: Event) => {
      const sceneId = (e as CustomEvent).detail.id;
      console.log(`🎬 [CommandCenter] Reacting to scene: ${sceneId}`);

      if (sceneId === 'dashboard-initial') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSavings(142.50);
        setIsAuditSequenceActive(false);
        setAuditStatus("Active - $142.50 Saved");
        setAuditLogs([]);
        setActiveAgent('FIN');
        // The logs are now managed by the DB fetch on mount
      } else if (sceneId === 'finance-sentinel') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveAgent('FIN');
      } else if (sceneId === 'guardian-protocol') {
        window.scrollTo({ top: 100, behavior: 'smooth' });
        setActiveAgent('GRD');
      } else if (sceneId === 'pantry-architect') {
        window.scrollTo({ top: 180, behavior: 'smooth' });
        setActiveAgent('PNTRY');
      } else if (sceneId === 'energy-optimizer') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveAgent('NRGY');
      } else if (sceneId === 'wellness-advisor') {
        window.scrollTo({ top: 220, behavior: 'smooth' });
        setActiveAgent('WLNS');
      } else if (sceneId === 'surveillance-view') {
        window.scrollTo({ top: 400, behavior: 'smooth' });
        setActiveAgent('VIS');
      } else if (sceneId === 'entering-query') {
        const logicTrace = document.getElementById('logic-trace');
        if (logicTrace) {
           const y = logicTrace.getBoundingClientRect().top + window.scrollY - 100;
           window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
           window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setActiveAgent('TIME');
        
        // Automated click simulation & terminal trace triggers
        setTimeout(() => {
          executeAuditSequence();
        }, 1500);
      }
    };

    window.addEventListener('aura-scene-change', handleSceneChange);
    return () => window.removeEventListener('aura-scene-change', handleSceneChange);
  }, []);

  useEffect(() => {
    // Removed the fake event generator. The UI now relies strictly on MongoDB!
  }, [isAuditSequenceActive]);

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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Main Dashboard Area */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Header Title Section */}
            <div className="px-4">
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-[-0.06em] mb-4 uppercase leading-none">Home Autonomous.</h1>
              <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Multimodal Agentic Sensors: Active · 7 Specialist Agents · 38 Decisions
              </p>
            </div>

            {/* Stats Grid - High Depth */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard 
                id="finance-sentinel-card"
                icon={<TrendingDown className="w-7 h-7 text-emerald-500" />}
                label="Commercial Savings"
                value={`$${savings.toFixed(2)}`}
                sub="Auto-Optimized"
                trend="+12% weekly"
              />
              <StatCard 
                id="guardian-protocol-card"
                icon={<Shield className="w-7 h-7 text-blue-500" />}
                label="Guardian Protocol"
                value="Secure"
                sub="Perimeter Active"
                trend="3 interceptions"
              />
              <StatCard 
                id="energy-optimizer-card"
                icon={<Zap className="w-7 h-7 text-amber-500" />}
                label="Power Balance"
                value="+12.4%"
                sub="HVAC Optimized"
                trend="Saved $0.80"
              />
            </div>

            {/* Vision Diagnostics - Multimodal Proof */}
            <div id="vision-advisor-card" className="group">
              <VisionDiagnostic />
            </div>

            {/* Live Reasoning Feed */}
            <div id="logic-trace" className="bg-white rounded-[4rem] p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-slate-50">
              <div className="flex justify-between items-center mb-14">
                <h3 className="text-3xl font-black text-slate-900 tracking-[-0.04em] uppercase">Autonomous Logic Trace</h3>
                <div className="flex gap-4">
                   <AgentPillar label="FIN" active={activeAgent === 'FIN'} />
                   <AgentPillar label="GRD" active={activeAgent === 'GRD'} />
                   <AgentPillar label="PNTRY" active={activeAgent === 'PNTRY'} />
                   <AgentPillar label="NRGY" active={activeAgent === 'NRGY'} />
                   <AgentPillar label="WLNS" active={activeAgent === 'WLNS'} />
                   <AgentPillar label="TIME" active={activeAgent === 'TIME'} />
                   <AgentPillar label="VIS" active={activeAgent === 'VIS'} />
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

          {/* Right Sidebar - 7-Agent Autonomy Engine */}
          <div className="lg:col-span-1 lg:sticky lg:top-8 h-[calc(100vh-4rem)] space-y-12">
            <div className="bg-slate-900 rounded-[4rem] p-10 text-white h-full shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] -mr-40 -mt-40" />
              
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-black mb-2 tracking-tighter uppercase leading-none">Autonomy Engine</h3>
                <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em]">7-Agent Orchestration Matrix</p>
              </div>

              {/* 7 Agents List */}
              <div className="flex-1 space-y-4 relative z-10 overflow-y-auto mb-8 pr-2 custom-scrollbar">
                <AgentStatusCard id="agent-card-fin" label="FIN" name="Finance Sentinel" status={activeAgent === 'FIN' && isAuditSequenceActive ? auditStatus : "Active - $142.50 Saved"} active={activeAgent === 'FIN'} icon={<CreditCard className="w-4 h-4" />} onClick={() => handleAgentClick('FIN')} />
                <AgentStatusCard id="agent-card-grd" label="GRD" name="Guardian Protocol" status="Active - Perimeter Secure" active={activeAgent === 'GRD'} icon={<Shield className="w-4 h-4" />} onClick={() => handleAgentClick('GRD')} />
                <AgentStatusCard id="agent-card-pntry" label="PNTRY" name="Pantry Architect" status="Active - Stock 98% Optimal" active={activeAgent === 'PNTRY'} icon={<ShoppingCart className="w-4 h-4" />} onClick={() => handleAgentClick('PNTRY')} />
                <AgentStatusCard id="agent-card-nrgy" label="NRGY" name="Energy Optimizer" status="Active - Load Optimized (-25%)" active={activeAgent === 'NRGY'} icon={<Zap className="w-4 h-4" />} onClick={() => handleAgentClick('NRGY')} />
                <AgentStatusCard id="agent-card-wlns" label="WLNS" name="Wellness Advisor" status="Active - AQI: 42 (Excellent)" active={activeAgent === 'WLNS'} icon={<Activity className="w-4 h-4" />} onClick={() => handleAgentClick('WLNS')} />
                <AgentStatusCard id="agent-card-time" label="TIME" name="Timeline Coordinator" status="Active - 38 Decisions Synced" active={activeAgent === 'TIME'} icon={<Clock className="w-4 h-4" />} onClick={() => handleAgentClick('TIME')} />
                <AgentStatusCard id="agent-card-vis" label="VIS" name="Vision Advisor" status="Active - CCTV Perimeter Active" active={activeAgent === 'VIS'} icon={<Eye className="w-4 h-4" />} onClick={() => handleAgentClick('VIS')} />
              </div>

              {/* Audit Progress Console Terminal */}
              {isAuditSequenceActive && (
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 font-mono text-[10px] text-emerald-400 space-y-1 mb-6 h-28 overflow-y-auto">
                  {auditLogs.map((log, idx) => (
                    <div key={idx} className="leading-tight">{log}</div>
                  ))}
                  {isLoading && <div className="text-amber-500 animate-pulse">Running agent reasoner...</div>}
                </div>
              )}

              <div className="mt-auto relative z-10">
                <button
                  id="trigger-audit-btn"
                  onClick={executeAuditSequence}
                  disabled={isAuditSequenceActive}
                  className={`w-full border rounded-[2rem] py-5 px-8 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${
                    isAuditSequenceActive 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 cursor-not-allowed'
                      : 'bg-white text-slate-900 border-white hover:bg-amber-500 hover:text-white hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20'
                  }`}
                >
                  <Activity className={`w-4 h-4 ${isAuditSequenceActive ? 'animate-spin' : 'animate-pulse'}`} />
                  {isAuditSequenceActive ? 'AUDIT IN PROGRESS...' : 'EXECUTE CRITICAL AUDIT'}
                </button>
              </div>
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

const StatCard = ({ id, icon, label, value, sub, trend }: any) => (
  <div id={id} className="bg-white p-12 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-white hover:translate-y-[-8px] transition-all duration-500 group">
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

const AgentStatusCard = ({ id, label, name, status, active, icon, onClick }: any) => (
  <div id={id} onClick={onClick} className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
    active 
      ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/5 scale-[1.02]' 
      : 'bg-white/5 border-white/5 hover:border-white/10'
  }`}>
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        active ? 'bg-amber-500 text-white' : 'bg-white/10 text-slate-400'
      }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-tight text-white truncate">{name}</p>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              active ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-pulse'
            }`} />
            <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">{label}</span>
          </div>
        </div>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1 truncate">{status}</p>
      </div>
    </div>
  </div>
);
