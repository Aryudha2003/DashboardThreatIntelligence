import { useEffect, useRef } from 'react';
import { useStore } from '../stores/useStore';
import { Alert } from '../types';

export const useWebSocket = (url: string = 'ws://localhost:8080') => {
  const ws = useRef<WebSocket | null>(null);
  const { addAlert, setConnectionStatus } = useStore();

  useEffect(() => {
    // Simulate WebSocket connection with mock data
    const simulateConnection = () => {
      setConnectionStatus(true);
      
      // Simulate incoming alerts every 5-10 seconds
      const interval = setInterval(() => {
        const mockAlert: Alert = {
          id: `alert-${Date.now()}`,
          indicator: {
            id: `ind-${Date.now()}`,
            type: Math.random() > 0.5 ? 'ip' : 'domain',
            value: Math.random() > 0.5 ? `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : `malicious-${Math.floor(Math.random() * 1000)}.com`,
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
            score: Math.floor(Math.random() * 100),
            confidence: Math.floor(Math.random() * 100),
            firstSeen: new Date().toISOString(),
            lastSeen: new Date().toISOString(),
            source: ['VirusTotal', 'OTX', 'Shodan', 'Internal SIEM'][Math.floor(Math.random() * 4)],
            geo: {
              country: ['US', 'CN', 'RU', 'DE', 'UK'][Math.floor(Math.random() * 5)],
              lat: (Math.random() - 0.5) * 180,
              lon: (Math.random() - 0.5) * 360,
            },
          },
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          status: 'open',
          summary: `Suspicious activity detected from ${Math.random() > 0.5 ? 'IP address' : 'domain'}`,
          timestamp: new Date().toISOString(),
        };
        
        addAlert(mockAlert);
      }, Math.random() * 5000 + 3000); // 3-8 seconds

      return () => {
        clearInterval(interval);
        setConnectionStatus(false);
      };
    };

    const cleanup = simulateConnection();
    
    return cleanup;
  }, [addAlert, setConnectionStatus]);

  return { isConnected: useStore((state) => state.isConnected) };
};
