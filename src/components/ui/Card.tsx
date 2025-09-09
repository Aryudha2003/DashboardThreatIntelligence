import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  glow = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={clsx(
        'backdrop-blur-sm bg-white/[0.03] border border-white/10 rounded-xl',
        hover && 'transition-all duration-300 hover:border-cyber-cyan/30 hover:shadow-lg hover:shadow-cyber-cyan/10',
        glow && 'shadow-lg shadow-cyber-cyan/20',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
