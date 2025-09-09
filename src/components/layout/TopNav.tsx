import React from 'react';
import { Shield, Bell, Settings, User, Wifi, WifiOff } from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { Badge } from '../ui/Badge';

export const TopNav: React.FC = () => {
  const { alerts, isConnected } = useStore();
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;

  return (
    <nav className="bg-navy-900/80 backdrop-blur-sm border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyber-cyan" />
            <span className="text-xl font-bold text-white">CyberGuard</span>
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="h-4 w-4 text-cyber-green" />
            ) : (
              <WifiOff className="h-4 w-4 text-status-critical" />
            )}
            <span className="text-sm text-gray-300">
              {isConnected ? 'Live Feed' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            {criticalAlerts > 0 && (
              <Badge variant="critical" size="sm" pulse>
                <span className="sr-only">Critical alerts</span>
                {criticalAlerts}
              </Badge>
            )}
          </div>
          <Settings className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-300" />
            <span className="text-sm text-gray-300">SOC Analyst</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
