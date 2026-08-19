'use client';

import React, { useState } from 'react';
import { EmergencyAlert } from '@/types';
import { INITIAL_EMERGENCY_ALERTS } from '@/lib/mockData';
import { ShieldAlert, AlertTriangle, CheckCircle2, Radio, Zap, RefreshCw, Car, Flame, Waves } from 'lucide-react';

export function EmergencyDashboard() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(INITIAL_EMERGENCY_ALERTS);

  const handleMitigate = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'mitigated' } : a));
  };

  const getAlertIcon = (type: EmergencyAlert['type']) => {
    switch (type) {
      case 'gridlock_cycle': return ShieldAlert;
      case 'accident': return Car;
      case 'flooding': return Waves;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Overview Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white">Emergency &amp; Disruption Intelligence</h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800 animate-pulse">
              PRD SECTION 22 • LIVE DISPATCH FEED
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Automated central dispatch dashboard receiving circular-wait deadlock warnings alongside accidents and flooding alerts.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="px-4 py-2 rounded-2xl bg-red-950/40 border border-red-900 text-red-300">
            Active Alerts: <strong className="text-red-400 font-bold">{alerts.filter(a => a.status === 'active').length}</strong>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-950/40 border border-emerald-900 text-emerald-300">
            Mitigated: <strong className="text-emerald-400 font-bold">{alerts.filter(a => a.status === 'mitigated').length}</strong>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const isMitigated = alert.status === 'mitigated';

          return (
            <div
              key={alert.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isMitigated
                  ? 'bg-slate-950/60 border-slate-800 opacity-80'
                  : alert.severity === 'critical'
                  ? 'bg-red-950/30 border-red-500/70 shadow-xl shadow-red-500/10'
                  : 'bg-amber-950/20 border-amber-500/50'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${
                  isMitigated
                    ? 'bg-slate-800 border-slate-700 text-slate-400'
                    : alert.severity === 'critical'
                    ? 'bg-red-500/20 border-red-500/60 text-red-400 animate-pulse'
                    : 'bg-amber-500/20 border-amber-500/60 text-amber-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{alert.title}</h3>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                      isMitigated
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {alert.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono">Location: <strong className="text-slate-100">{alert.location}</strong></p>
                  
                  <p className="text-xs text-slate-400 font-sans mt-2">
                    <strong className="text-emerald-400">Dispatch Recommendation:</strong> {alert.suggestedAction}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {!isMitigated ? (
                  <button
                    onClick={() => handleMitigate(alert.id)}
                    className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    EXECUTE PREEMPTION / MITIGATE
                  </button>
                ) : (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Preemption Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
