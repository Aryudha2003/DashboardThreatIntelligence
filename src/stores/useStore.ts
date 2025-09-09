import { create } from 'zustand';
import { Alert, ThreatIndicator, Feed, KPIData } from '../types';

interface AppState {
  alerts: Alert[];
  indicators: ThreatIndicator[];
  feeds: Feed[];
  kpiData: KPIData;
  isConnected: boolean;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  setIndicators: (indicators: ThreatIndicator[]) => void;
  setFeeds: (feeds: Feed[]) => void;
  setKPIData: (kpi: KPIData) => void;
  setConnectionStatus: (status: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  alerts: [],
  indicators: [],
  feeds: [],
  kpiData: {
    activeAlerts: 0,
    criticalIncidents: 0,
    avgTriageTime: '0m',
    feedHealth: 0,
  },
  isConnected: false,
  setAlerts: (alerts) => set({ alerts }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  setIndicators: (indicators) => set({ indicators }),
  setFeeds: (feeds) => set({ feeds }),
  setKPIData: (kpiData) => set({ kpiData }),
  setConnectionStatus: (isConnected) => set({ isConnected }),
}));
