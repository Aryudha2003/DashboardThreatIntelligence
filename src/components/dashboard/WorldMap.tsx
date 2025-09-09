import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../stores/useStore';

interface AttackFlow {
  id: string;
  source: { lat: number; lon: number; country: string };
  target: { lat: number; lon: number; country: string };
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const WorldMap: React.FC = () => {
  const { alerts } = useStore();
  const [attackFlows, setAttackFlows] = useState<AttackFlow[]>([]);

  useEffect(() => {
    // Generate attack flows from recent alerts
    const flows = alerts.slice(0, 20).map((alert, index) => ({
      id: `flow-${index}`,
      source: alert.indicator.geo || { lat: 0, lon: 0, country: 'Unknown' },
      target: { lat: 37.7749, lon: -122.4194, country: 'US' }, // Default to SF
      severity: alert.severity,
    }));
    setAttackFlows(flows);
  }, [alerts]);

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: '#ff6b6b',
      high: '#ff9f43',
      medium: '#feca57',
      low: '#48dbfb',
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  return (
    <Card className="p-6 h-[400px]">
      <h3 className="text-lg font-semibold text-white mb-4">Global Threat Map</h3>
      <div className="relative h-full bg-navy-800/50 rounded-lg overflow-hidden">
        {/* World Map SVG Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-full h-64 bg-gradient-to-br from-navy-700 to-navy-800 rounded-lg relative overflow-hidden">
              {/* Animated threat flows */}
              {attackFlows.slice(0, 8).map((flow, index) => (
                <div
                  key={flow.id}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 60 + 20}%`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ 
                      backgroundColor: getSeverityColor(flow.severity),
                      boxShadow: `0 0 10px ${getSeverityColor(flow.severity)}`,
                    }}
                  />
                  {/* Attack flow line */}
                  <div
                    className="absolute w-16 h-px animate-flow"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${getSeverityColor(flow.severity)}, transparent)`,
                      top: '50%',
                      left: '100%',
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />
                </div>
              ))}
              
              {/* Geographic regions overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 opacity-30">
                  <div className="text-cyber-cyan text-xs">North America</div>
                  <div className="text-cyber-cyan text-xs">Europe</div>
                  <div className="text-cyber-cyan text-xs">Asia Pacific</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-status-critical"></div>
                <span className="text-xs text-gray-400">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-gray-400">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-400">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-400">Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
