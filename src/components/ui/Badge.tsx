import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant: 'critical' | 'high' | 'medium' | 'low' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  variant, 
  size = 'md', 
  children, 
  pulse = false 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    critical: 'bg-status-critical/20 text-status-critical border border-status-critical/30',
    high: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    success: 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    info: 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        pulse && 'animate-pulse-glow'
      )}
    >
      {children}
    </span>
  );
};
