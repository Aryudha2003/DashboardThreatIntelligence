import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-900';
  
  const variants = {
    primary: 'bg-cyber-cyan text-navy-900 hover:bg-opacity-90 focus:ring-cyber-cyan shadow-lg shadow-cyber-cyan/25',
    secondary: 'bg-navy-700 text-white border border-navy-600 hover:bg-navy-600 focus:ring-navy-500',
    ghost: 'text-cyber-cyan hover:bg-cyber-cyan/10 focus:ring-cyber-cyan',
    danger: 'bg-status-critical text-white hover:bg-opacity-90 focus:ring-status-critical shadow-lg shadow-status-critical/25',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
