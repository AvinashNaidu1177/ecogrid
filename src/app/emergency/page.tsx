'use client';

import React from 'react';
import { EmergencyDashboard } from '@/components/emergency/EmergencyDashboard';

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <EmergencyDashboard />
      </div>
    </div>
  );
}
