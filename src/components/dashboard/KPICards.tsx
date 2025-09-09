import React from 'react';
import { AlertTriangle, Shield, Clock, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { useStore } from '../../stores/useStore';

export const KPICards: React.FC = () => {
  const { alerts, kpiData } = useStore();
  
  const activeAlerts = alerts.filter(alert => alert.status === 'open').length;
  const criticalIncidents = alerts.filter(alert => alert.severity === 'critical').length;

  const kpis = [
    {
      title: 'Active Alerts',
      value: activeAlerts.toString(),
      icon: AlertTriangle,
      color: 'text-status-critical',
      bgColor: 'bg-status-critical/20',
      trend: '+12%',
    },
    {
      title: 'Critical Incidents',
      value: criticalIncidents.toString(),
      icon: Shield,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      trend: '-8%',
    },
    {
      title: 'Avg Triage Time',
      value: '4.2m',
      icon: Clock,
      color: 'text-cyber-green',
      bgColor: 'bg-cyber-green/20',
      trend: '-15%',
    },
    {
      title: 'Feed Health',
      value: '98.5%',
      icon: Activity,
      color: 'text-cyber-cyan',
      bgColor: 'bg-cyber-cyan/20',
      trend: '+2%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} hover className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">{kpi.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{kpi.value}</p>
                <p className={`text-sm mt-1 ${kpi.trend.startsWith('+') ? 'text-cyber-green' : 'text-status-critical'}`}>
                  {kpi.trend} from last hour
                </p>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <Icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
