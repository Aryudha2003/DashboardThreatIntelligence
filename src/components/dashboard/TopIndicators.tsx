import React from 'react';
import { ExternalLink, MapPin, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useStore } from '../../stores/useStore';
import { formatDistanceToNow } from 'date-fns';

export const TopIndicators: React.FC = () => {
  const { alerts } = useStore();
  
  // Get top indicators by severity and recency
  const topIndicators = alerts
    .slice(0, 10)
    .map(alert => alert.indicator)
    .sort((a, b) => b.score - a.score);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ip':
        return '🌐';
      case 'domain':
        return '🔗';
      case 'hash':
        return '#️⃣';
      case 'cve':
        return '🛡️';
      default:
        return '❓';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Top Indicators</h3>
        <Badge variant="info" size="sm">
          {topIndicators.length} active
        </Badge>
      </div>
      
      <div className="space-y-3">
        {topIndicators.map((indicator) => (
          <div
            key={indicator.id}
            className="flex items-center justify-between p-3 rounded-lg bg-navy-800/50 border border-white/5 hover:border-cyber-cyan/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <span className="text-lg">{getTypeIcon(indicator.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-white truncate">
                    {indicator.value}
                  </p>
                  <Badge variant={indicator.severity} size="sm">
                    {indicator.severity}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3" />
                    <span>{indicator.geo?.country || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(indicator.lastSeen), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-cyber-cyan">
                  {indicator.score}/100
                </p>
                <p className="text-xs text-gray-400">Risk Score</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-cyber-cyan transition-colors" />
            </div>
          </div>
        ))}
      </div>
      
      {topIndicators.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No indicators detected</p>
          <p className="text-sm text-gray-500 mt-1">Waiting for threat intelligence data...</p>
        </div>
      )}
    </Card>
  );
};
