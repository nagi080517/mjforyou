/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020001]">
      
      {/* Deep Crimson Shadow Blob */}
      <motion.div
        className="absolute top-[-20%] left-[-20%] w-[100vw] h-[100vw] bg-[#3d000a] rounded-full mix-blend-screen filter blur-[120px] opacity-40 will-change-transform"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Muted Violet/Black Nebula */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-[#1a0526] rounded-full mix-blend-screen filter blur-[100px] opacity-30 will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Drifting Red Smoke Overlay (CSS Gradient Trick) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#800020_0%,_transparent_60%)] mix-blend-overlay pointer-events-none" />

      {/* Noise Texture for Cinematic Grain - Reduced opacity for performance */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Subtle Web Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb6c1" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffb6c1" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffb6c1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 0 L100vw 100vh M100vw 0 L0 100vh" stroke="url(#webGradient)" strokeWidth="0.5" />
      </svg>
      
      {/* Heavy Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] pointer-events-none" />
    </div>
  );
};

export default FluidBackground;