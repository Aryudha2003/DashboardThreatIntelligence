import React from 'react';
import { KPICards } from './KPICards';
import { WorldMap } from './WorldMap';
import { AlertsTimeline } from './AlertsTimeline';
import { TopIndicators } from './TopIndicators';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <KPICards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorldMap />
        </div>
        <div>
          <TopIndicators />
        </div>
      </div>
      
      <AlertsTimeline />
    </div>
  );
};
