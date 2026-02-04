/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ComicStickers: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Multi-layered Parallax Depths
  // 1. Far Layer (City Silhouettes/Background) - Slow movement
  const yCityFar = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // 2. Mid Layer (Structural Elements) - Medium movement
  const yCityMid = useTransform(scrollYProgress, [0, 1], [0, -350]);
  
  // 3. Close Layer (Foreground Elements) - Fast movement
  const yCityClose = useTransform(scrollYProgress, [0, 1], [0, -700]);

  // 4. Speed Lines - Very fast vertical movement
  const ySpeedLines = useTransform(scrollYProgress, [0, 1], [0, 1200]);
  
  // Dynamic Rotations
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateFast = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      
      {/* --- LAYER 1: FAR BACKGROUND (City Silhouettes) --- */}
      {/* Blurred vertical gradients simulating distant buildings */}
      <motion.div 
        style={{ y: yCityFar }}
        className="absolute top-[5%] left-[5%] w-48 h-[800px] bg-gradient-to-b from-[#1a0526]/0 via-[#1a0526]/20 to-[#1a0526]/0 blur-3xl will-change-transform"
      />
      <motion.div 
        style={{ y: yCityFar }}
        className="absolute top-[15%] right-[10%] w-64 h-[900px] bg-gradient-to-b from-[#3d000a]/0 via-[#3d000a]/20 to-[#3d000a]/0 blur-3xl will-change-transform"
      />

      {/* --- LAYER 2: MID GROUND (Abstract Shapes) --- */}
      {/* Floating geometric shapes representing tech/structure */}
      <motion.div 
        style={{ y: yCityMid, rotate: rotateSlow }}
        className="absolute top-[30%] left-[12%] w-40 h-40 border border-[#ff3366]/5 rounded-lg blur-[2px] will-change-transform"
      />
      <motion.div 
        style={{ y: yCityMid, rotate: rotateFast }}
        className="absolute top-[60%] right-[5%] w-56 h-56 border border-[#6600cc]/5 rounded-full blur-[2px] will-change-transform"
      />
       {/* Vertical dark strips representing building edges passing by */}
      <motion.div 
        style={{ y: yCityMid }}
        className="absolute top-[20%] right-[25%] w-2 h-[500px] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-sm will-change-transform"
      />

      {/* --- LAYER 3: SPEED LINES (Velocity) --- */}
      {/* Sharp lines moving rapidly to create a 'hyperlapse' feel without lag */}
      <motion.div style={{ y: ySpeedLines }} className="absolute inset-0 h-[150%] -top-[25%]">
         <div className="absolute left-[8%] top-[10%] w-[1px] h-[150px] bg-gradient-to-b from-transparent via-[#ff3366]/20 to-transparent" />
         <div className="absolute left-[25%] top-[50%] w-[1px] h-[100px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
         <div className="absolute right-[12%] top-[30%] w-[1px] h-[250px] bg-gradient-to-b from-transparent via-[#6600cc]/20 to-transparent" />
         <div className="absolute right-[35%] top-[70%] w-[1px] h-[120px] bg-gradient-to-b from-transparent via-[#ffb6c1]/10 to-transparent" />
         <div className="absolute left-[50%] top-[85%] w-[1px] h-[100px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </motion.div>

      {/* --- LAYER 4: CLOSE FOREGROUND (Iconic Elements) --- */}
      {/* Spider Mask - Top Right */}
      <motion.div
        style={{ y: yCityClose, rotate: rotateSlow }}
        className="absolute top-[15%] right-[8%] w-24 h-24 md:w-40 md:h-40 opacity-20 drop-shadow-[0_0_15px_rgba(255,51,102,0.4)] will-change-transform"
      >
         <svg viewBox="0 0 24 24" fill="none" stroke="#ff3366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z" />
            <path d="M7 11c0-1.5 1.5-3 2.5-3s2.5 1.5 2.5 3" />
            <path d="M12 11c0-1.5 1.5-3 2.5-3s2.5 1.5 2.5 3" />
            <path d="M12 16s-1-1.5-2.5-1.5" />
            <path d="M12 16s1-1.5 2.5-1.5" />
         </svg>
      </motion.div>

      {/* Webbing - Bottom Left */}
      <motion.div
        style={{ y: yCityClose, rotate: rotateFast }}
        className="absolute bottom-[10%] left-[5%] w-48 h-48 md:w-64 md:h-64 opacity-10 will-change-transform"
      >
         <svg viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.8">
            <path d="M0 100 Q50 50 100 0" />
            <path d="M20 100 Q50 60 80 0" />
            <path d="M0 80 Q40 50 100 20" />
            <circle cx="0" cy="100" r="20" />
            <circle cx="0" cy="100" r="40" />
         </svg>
      </motion.div>
      
      {/* Lightning/Zap - Top Left */}
      <motion.div
        style={{ y: yCityClose, rotate: rotateFast }}
        className="absolute top-[25%] left-[8%] w-16 h-16 opacity-15 will-change-transform"
      >
        <svg viewBox="0 0 24 24" fill="#ff3366" stroke="none">
           <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </motion.div>

    </div>
  );
};

export default ComicStickers;