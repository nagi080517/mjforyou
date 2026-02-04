/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
  onDetailsClick: (title: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onDetailsClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="matte-card p-8 rounded-sm group hover:border-[#ff3366]/40 transition-all duration-500 relative overflow-hidden"
    >
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff3366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500 text-[#ff3366]">
        <service.icon size={120} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="w-14 h-14 border border-[#ff3366]/30 bg-[#ff3366]/5 rounded-sm flex items-center justify-center mb-6 text-[#ffb6c1] shadow-[0_0_15px_rgba(255,51,102,0.1)] group-hover:shadow-[0_0_25px_rgba(255,51,102,0.3)] group-hover:scale-105 transition-all duration-300">
          <service.icon size={28} />
        </div>
        
        <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-[#ffb6c1] transition-colors tracking-wide">{service.title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base font-light border-l-2 border-[#ff3366]/20 pl-4">{service.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-xs font-heading font-bold text-[#ff3366] tracking-widest uppercase">
            {service.priceStart}
          </span>
          
          <button 
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest group/btn text-white hover:text-[#ffb6c1] transition-colors"
            onClick={() => onDetailsClick(service.title)}
          >
            Details
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-[#ff3366]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;