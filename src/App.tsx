import React, { useEffect } from 'react';
import { TopNav } from './components/layout/TopNav';
import { SideNav } from './components/layout/SideNav';
import { Overview } from './components/dashboard/Overview';
import { useWebSocket } from './hooks/useWebSocket';
import { useStore } from './stores/useStore';
import { faker } from '@faker-js/faker';

function App() {
  const { isConnected } = useWebSocket();
  const { setKPIData, setFeeds } = useStore();

  useEffect(() => {
    // Initialize mock data
    setKPIData({
      activeAlerts: 24,
      criticalIncidents: 3,
      avgTriageTime: '4.2m',
      feedHealth: 98.5,
    });

    // Initialize mock feeds
    const mockFeeds = [
      {
        id: '1',
        name: 'VirusTotal',
        source: 'virustotal.com',
        status: 'healthy' as const,
        lastPull: new Date().toISOString(),
        itemCount: faker.number.int({ min: 1000, max: 50000 }),
        health: 99.2,
      },
      {
        id: '2',
        name: 'AlienVault OTX',
        source: 'otx.alienvault.com',
        status: 'healthy' as const,
        lastPull: new Date().toISOString(),
        itemCount: faker.number.int({ min: 1000, max: 50000 }),
        health: 97.8,
      },
      {
        id: '3',
        name: 'Shodan',
        source: 'shodan.io',
        status: 'warning' as const,
        lastPull: new Date(Date.now() - 3600000).toISOString(),
        itemCount: faker.number.int({ min: 1000, max: 50000 }),
        health: 89.5,
      },
    ];
    setFeeds(mockFeeds);
  }, [setKPIData, setFeeds]);

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <TopNav />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Threat Intelligence Dashboard</h1>
              <p className="text-gray-400">Real-time monitoring and analysis of global threat landscape</p>
            </div>
            <Overview />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
