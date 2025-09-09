import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { useStore } from '../../stores/useStore';
import { format, subHours } from 'date-fns';

export const AlertsTimeline: React.FC = () => {
  const { alerts } = useStore();

  // Generate hourly data for the last 24 hours
  const generateTimelineData = () => {
    const hours = [];
    for (let i = 23; i >= 0; i--) {
      const hour = subHours(new Date(), i);
      const hourAlerts = alerts.filter(alert => {
        const alertHour = new Date(alert.timestamp);
        return alertHour.getHours() === hour.getHours() && 
               alertHour.getDate() === hour.getDate();
      });

      hours.push({
        time: format(hour, 'HH:mm'),
        alerts: hourAlerts.length,
        critical: hourAlerts.filter(a => a.severity === 'critical').length,
        high: hourAlerts.filter(a => a.severity === 'high').length,
        medium: hourAlerts.filter(a => a.severity === 'medium').length,
        low: hourAlerts.filter(a => a.severity === 'low').length,
      });
    }
    return hours;
  };

  const data = generateTimelineData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-800 border border-cyber-cyan/30 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Alerts Timeline (24h)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="critical" 
              stroke="#ff6b6b" 
              strokeWidth={2}
              dot={{ fill: '#ff6b6b', strokeWidth: 2, r: 3 }}
              name="Critical"
            />
            <Line 
              type="monotone" 
              dataKey="high" 
              stroke="#ff9f43" 
              strokeWidth={2}
              dot={{ fill: '#ff9f43', strokeWidth: 2, r: 3 }}
              name="High"
            />
            <Line 
              type="monotone" 
              dataKey="medium" 
              stroke="#feca57" 
              strokeWidth={2}
              dot={{ fill: '#feca57', strokeWidth: 2, r: 3 }}
              name="Medium"
            />
            <Line 
              type="monotone" 
              dataKey="low" 
              stroke="#48dbfb" 
              strokeWidth={2}
              dot={{ fill: '#48dbfb', strokeWidth: 2, r: 3 }}
              name="Low"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
