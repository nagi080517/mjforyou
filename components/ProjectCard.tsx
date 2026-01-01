/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={() => onClick(project)}
      className="group relative rounded-sm overflow-hidden aspect-[16/10] cursor-pointer border border-white/5 hover:border-[#ff3366]/30 transition-colors duration-500"
    >
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.7] contrast-[1.1] group-hover:brightness-[0.9]"
      />
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="inline-block text-[#ff3366] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 border-b border-[#ff3366] pb-1">
            {project.category}
            </span>
            <h3 className="text-3xl font-heading font-bold mb-2 text-white text-glow">
            {project.title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors uppercase mt-4 opacity-0 group-hover:opacity-100 duration-500 delay-100">
            View Mission Details <ExternalLink size={12} />
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;