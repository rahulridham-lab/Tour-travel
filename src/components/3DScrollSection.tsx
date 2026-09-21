import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ThreeDScrollSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  direction?: 'up' | 'down' | 'tilt-left' | 'tilt-right';
  intensity?: 'subtle' | 'medium' | 'deep';
  perspective?: number;
}

export const ThreeDScrollSection: React.FC<ThreeDScrollSectionProps> = ({
  children,
  id,
  className = '',
  direction = 'up',
  intensity = 'subtle',
  perspective = 1200,
}) => {
  // Rotational angles based on intensity
  const rotateAngle = intensity === 'subtle' ? 6 : intensity === 'medium' ? 10 : 16;
  const initialScale = intensity === 'subtle' ? 0.97 : 0.94;

  const initialProps = {
    opacity: 0,
    scale: initialScale,
    rotateX: direction === 'up' ? rotateAngle : direction === 'down' ? -rotateAngle : 0,
    rotateY: direction === 'tilt-left' ? -rotateAngle : direction === 'tilt-right' ? rotateAngle : 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
  };

  const whileInViewProps = {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    y: 0,
  };

  return (
    <div
      id={id}
      style={{ perspective: `${perspective}px` }}
      className={`relative w-full overflow-hidden ${className}`}
    >
      <motion.div
        initial={initialProps}
        whileInView={whileInViewProps}
        viewport={{ once: true, amount: 0.15, margin: '-60px' }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1], // Smooth custom cubic-bezier
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
