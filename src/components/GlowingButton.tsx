import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlowingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function GlowingButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}: GlowingButtonProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-8 py-3 rounded-lg overflow-hidden
        ${isPrimary 
          ? 'bg-[#007BFF] text-white' 
          : 'bg-white text-[#007BFF] border-2 border-[#007BFF]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Pulsing glow effect */}
      <motion.div
        className={`
          absolute inset-0 rounded-lg
          ${isPrimary ? 'bg-[#007BFF]' : 'bg-[#007BFF]'}
        `}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          boxShadow: [
            '0 0 20px rgba(0, 123, 255, 0.5)',
            '0 0 40px rgba(0, 123, 255, 0.8)',
            '0 0 20px rgba(0, 123, 255, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Hover glow enhancement */}
      <motion.div
        className={`
          absolute inset-0 rounded-lg
          ${isPrimary ? 'bg-white' : 'bg-[#007BFF]'}
        `}
        initial={{ opacity: 0 }}
        whileHover={disabled ? {} : {
          opacity: 0.2,
          boxShadow: '0 0 60px rgba(0, 123, 255, 1)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
