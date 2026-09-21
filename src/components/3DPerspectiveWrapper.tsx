import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PerspectiveWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  direction?: 'up' | 'down' | 'tilt-left' | 'tilt-right' | 'zoom-in';
  intensity?: 'subtle' | 'medium' | 'deep';
  perspective?: number;
  delay?: number;
}

export const ThreeDPerspectiveWrapper: React.FC<PerspectiveWrapperProps> = ({
  children,
  id,
  className = '',
  direction = 'up',
  intensity = 'subtle',
  perspective = 1000,
  delay = 0,
}) => {
  const rotateAngle = intensity === 'subtle' ? 4 : intensity === 'medium' ? 8 : 12;
  const initialScale = intensity === 'subtle' ? 0.98 : 0.95;

  const initialProps = {
    opacity: 0,
    scale: direction === 'zoom-in' ? 0.92 : initialScale,
    rotateX: direction === 'up' ? rotateAngle : direction === 'down' ? -rotateAngle : 0,
    rotateY: direction === 'tilt-left' ? -rotateAngle : direction === 'tilt-right' ? rotateAngle : 0,
    y: direction === 'up' ? 35 : direction === 'down' ? -35 : 0,
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
      className={`relative w-full overflow-hidden transform-gpu perspective-1000 ${className}`}
    >
      <motion.div
        initial={initialProps}
        whileInView={whileInViewProps}
        viewport={{ once: true, amount: 0.15, margin: '-40px' }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1], // Travexa smooth cubic-bezier
        }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className="w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
