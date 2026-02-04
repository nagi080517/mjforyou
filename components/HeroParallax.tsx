/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroParallax: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax Logic:
  // Scroll Down -> Content moves UP naturally.
  // To make something look FAR (background), we move it DOWN (counteracting scroll).
  // To make something look NEAR (foreground), we move it UP (accelerating scroll).
  
  const yFar = useTransform(scrollY, [0, 800], [0, 400]); // Moves down, stays in view longer
  const yMid = useTransform(scrollY, [0, 800], [0, 150]); // Moves down slightly
  const yNear = useTransform(scrollY, [0, 800], [0, -150]); // Moves up faster than scroll
  const yVeryNear = useTransform(scrollY, [0, 800], [0, -400]); // Moves up very fast

  // Rotations for dynamic feel
  const rotateRight = useTransform(scrollY, [0, 800], [0, 15]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* LAYER 1: FAR (Stars/Particles) - Moves slowly */}
      <motion.div style={{ y: yFar }} className="absolute inset-0 opacity-40">
        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </motion.div>

      {/* LAYER 2: MID (Abstract City/Tech Shapes) */}
      <motion.div style={{ y: yMid, rotate: rotateRight }} className="absolute inset-0 opacity-20">
         <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-[#ff3366]/30 rounded-full blur-[1px]" />
         <div className="absolute bottom-[30%] right-[15%] w-48 h-48 border border-white/10 rounded-full blur-[1px]" />
         <div className="absolute top-[60%] left-[20%] w-20 h-20 bg-gradient-to-tr from-[#ff3366]/10 to-transparent rounded-lg transform rotate-45" />
         {/* Abstract Building Silhouette Gradient */}
         <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      </motion.div>

      {/* LAYER 3: NEAR (Web Strands) */}
      <motion.div style={{ y: yNear }} className="absolute inset-0 opacity-60">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <motion.path
            d="M-10,10 Q50,60 110,10"
            stroke="url(#web-gradient-para)"
            strokeWidth="0.15"
            fill="none"
            animate={{ d: ["M-10,10 Q50,60 110,10", "M-10,10 Q50,65 110,10", "M-10,10 Q50,60 110,10"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           />
           <motion.path
            d="M-10,90 Q50,40 110,90"
            stroke="url(#web-gradient-para)"
            strokeWidth="0.15"
            fill="none"
            animate={{ d: ["M-10,90 Q50,40 110,90", "M-10,90 Q50,35 110,90", "M-10,90 Q50,40 110,90"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
           />
           {/* Connecting strand */}
           <motion.path
            d="M20,-10 Q40,50 80,110"
            stroke="url(#web-gradient-para)"
            strokeWidth="0.1"
            fill="none"
           />
           <defs>
             <linearGradient id="web-gradient-para" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="transparent" />
               <stop offset="20%" stopColor="#ff3366" />
               <stop offset="80%" stopColor="#ffb6c1" />
               <stop offset="100%" stopColor="transparent" />
             </linearGradient>
           </defs>
        </svg>
      </motion.div>

      {/* LAYER 4: VERY NEAR (Speed Lines/Blur) - Moves very fast */}
      <motion.div style={{ y: yVeryNear }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[40%] right-[5%] w-[2px] h-32 bg-gradient-to-b from-transparent via-[#ff3366]/40 to-transparent blur-[2px]" />
          <div className="absolute bottom-[20%] left-[8%] w-[2px] h-48 bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[2px]" />
          <div className="absolute top-[10%] left-[50%] w-[1px] h-24 bg-gradient-to-b from-transparent via-[#ffb6c1]/30 to-transparent blur-[1px]" />
      </motion.div>

    </div>
  );
};

export default HeroParallax;
