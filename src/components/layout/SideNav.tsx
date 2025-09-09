import React from 'react';
import { Home, Shield, Activity, Search, FileText, Settings, Users } from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Overview', path: '/', active: true },
  { icon: Shield, label: 'Alerts', path: '/alerts' },
  { icon: Activity, label: 'Feeds', path: '/feeds' },
  { icon: Search, label: 'Investigation', path: '/investigation' },
  { icon: FileText, label: 'Playbooks', path: '/playbooks' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const SideNav: React.FC = () => {
  return (
    <nav className="w-64 bg-navy-900/50 backdrop-blur-sm border-r border-white/10 p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              className={clsx(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                item.active
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};
