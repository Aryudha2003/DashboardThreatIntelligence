export interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'cve';
  value: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  source: string;
  geo?: {
    country: string;
    lat: number;
    lon: number;
  };
  enrichment?: {
    whois?: any;
    asn?: number;
  };
}

export interface Alert {
  id: string;
  indicator: ThreatIndicator;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'closed';
  summary: string;
  timestamp: string;
  assignee?: string;
}

export interface Feed {
  id: string;
  name: string;
  source: string;
  status: 'healthy' | 'warning' | 'error';
  lastPull: string;
  itemCount: number;
  health: number;
}

export interface KPIData {
  activeAlerts: number;
  criticalIncidents: number;
  avgTriageTime: string;
  feedHealth: number;
}
