/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#050000] border border-[#ff3366]/20 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-[#ff3366] hover:text-white transition-colors border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-transparent to-transparent opacity-60 z-10 md:bg-gradient-to-r" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#050000] relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff3366]/5 rounded-full blur-[80px] pointer-events-none" />

            <span className="text-[#ff3366] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
              Mission Report: {project.category}
            </span>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white text-glow leading-tight">
              {project.title}
            </h2>

            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 border-l-2 border-[#ff3366] pl-3">
                  Overview
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  {project.description || "Project details classified. Please contact for full mission report."}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 border-l-2 border-[#ffb6c1] pl-3">
                    The Challenge
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.challenge || "Overcoming digital obstacles to secure the client's objective."}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 border-l-2 border-[#ffb6c1] pl-3">
                    The Solution
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.solution || "Deploying advanced frameworks and creative strategies."}
                  </p>
                </div>
              </div>

              {project.technologies && (
                <div>
                   <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-gray-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/5">
                <button className="w-full py-4 bg-[#ff3366] hover:bg-[#cc1f4b] text-white font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,51,102,0.2)]">
                  Launch Live Preview
                </button>
              </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;