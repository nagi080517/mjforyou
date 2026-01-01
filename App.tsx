/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { 
  Camera, Code, TrendingUp, Check, 
  Menu, X, ArrowRight, Instagram, 
  Linkedin, Mail, ChevronDown, MessageCircle, Star, Users, Smartphone, Zap
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ServiceCard';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import WhatsAppButton from './components/WhatsAppButton';
import ContactForm from './components/ContactForm';
import { Service, Project, PricingTier } from './types';

// DATA
const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Web Architecture',
    description: 'We spin custom, lightning-fast websites that stick. From landing pages to e-commerce, we build digital webs that catch every lead.',
    icon: Code,
    priceStart: '₹24,999'
  },
  {
    id: 'media',
    title: 'Cinematic Media',
    description: 'Cinematic shots from every angle. High-end product photography and reels that capture the multiverse of your brand.',
    icon: Camera,
    priceStart: '₹14,999'
  },
  {
    id: 'marketing',
    title: 'Symbiote Growth',
    description: 'Spread your message like a symbiote. Social media management, SEO, and paid ads that deliver superpower ROI.',
    icon: TrendingUp,
    priceStart: '₹29,999/mo'
  }
];

const PROJECTS: Project[] = [
  { 
    id: '1', 
    title: 'RSR ENGINEERING COLLEGES', 
    category: 'AI Automation · Analytics Dashboard', 
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000',
    description: 'We designed and deployed an AI-powered Academic Feedback Analyzer that automatically processes large volumes of student feedback, classifies responses by department, subject, and faculty, and generates actionable insights through an interactive dashboard. The system significantly reduced manual analysis time and improved data-driven decision-making for institutional quality assessments.',
    challenge: 'Manual analysis of student feedback was time-consuming, inconsistent, and prone to human bias, making it difficult for the institution to derive actionable quality improvements.',
    solution: 'An automated system that processes feedback, classifies responses by department, subject, and faculty, and generates actionable insights through an interactive dashboard for data-driven decision-making.',
    technologies: ['AI/ML', 'NLP', 'Data Analytics', 'Dashboard']
  },
  { 
    id: '3', 
    title: 'PERNIATHI NATURALS', 
    category: 'E-Commerce App', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    description: 'We build e-commerce app where all the purchases happen. A dedicated platform for natural products that streamlines the buying process.',
    challenge: 'The client needed a robust mobile application to handle inventory management and secure transactions for a wide range of natural products.',
    solution: 'We developed a comprehensive e-commerce app with seamless payment integration, real-time order tracking, and an intuitive user interface that maximized sales conversion.',
    technologies: ['React Native', 'Node.js', 'Payment Gateway', 'API Integration']
  },
  { 
    id: '4', 
    title: 'TECH START', 
    category: 'Branding', 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000',
    description: 'We crafted a complete brand identity including logo systems, typography, and digital assets to help the startup establish a strong, modern presence across platforms.',
    challenge: 'Establishing a unique and trustworthy identity for a new startup to stand out in a competitive tech landscape.',
    solution: 'A comprehensive brand system including logos and typography that establishes a strong, modern presence across all digital touchpoints.',
    technologies: ['Brand Identity', 'Logo Design', 'Digital Assets']
  },
  { 
    id: '5', 
    title: 'COFFEE CULTURE', 
    category: 'Social Media Marketing', 
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000',
    description: 'We executed targeted social media campaigns, content strategy, and visual storytelling that increased brand visibility and customer engagement across Instagram and local audiences.',
    challenge: 'Engaging a local audience effectively and driving foot traffic in a competitive food and beverage sector.',
    solution: 'Targeted campaigns and compelling visual storytelling that significantly increased brand visibility and customer engagement on social platforms.',
    technologies: ['Social Media Strategy', 'Content Creation', 'Community Management']
  },
  { 
    id: '6', 
    title: 'URBAN GYM', 
    category: 'Video Production', 
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
    description: 'We produced high-impact promotional videos and reels focused on energy, lifestyle, and motivation, helping the brand connect emotionally with fitness-focused customers.',
    challenge: 'Conveying the raw energy and community spirit of the gym to attract new members through digital media.',
    solution: 'High-impact promotional videos that capture the lifestyle and motivation of the brand, creating an emotional connection with the audience.',
    technologies: ['Video Production', 'Motion Graphics', 'Storytelling']
  },
  { 
    id: '7', 
    title: 'CRYPTO DASH', 
    category: 'Web App', 
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000',
    description: 'We developed a real-time analytics dashboard for crypto tracking with clean UI, responsive charts, and performance-optimized data visualization for active users.',
    challenge: 'Displaying complex, real-time financial data clearly and responsively for active traders and users.',
    solution: 'A clean UI with performance-optimized data visualization and responsive charts that allows for seamless tracking of assets.',
    technologies: ['React', 'Real-time Data', 'UI/UX Design']
  },
  { 
    id: '2', 
    title: 'SANGAMITHRA SCHOOL', 
    category: 'Professional Dashboard · Analytics', 
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1000',
    description: 'We designed a centralized academic and administrative dashboard enabling faculty and management to monitor performance metrics, reports, and operational insights efficiently.',
    challenge: 'The school struggled with fragmented data across various departments, making real-time monitoring of academic performance and administrative operations inefficient.',
    solution: 'We developed a unified professional dashboard that centralizes all metrics, providing faculty and management with clear, real-time reports and operational insights.',
    technologies: ['React', 'Data Visualization', 'School Management Systems']
  },
  { 
    id: '8', 
    title: 'REAL ESTATE MARKETING PROJECTS', 
    category: 'Digital Marketing', 
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000',
    description: 'We delivered end-to-end digital marketing solutions for multiple real estate clients, including lead-generation campaigns, creatives, landing pages, and performance optimization.',
    challenge: 'Generating high-quality, actionable leads consistently in a fluctuating and competitive real estate market.',
    solution: 'Comprehensive marketing solutions including targeted lead-generation campaigns, high-converting creatives, and optimized landing pages.',
    technologies: ['Lead Generation', 'PPC', 'Campaign Optimization']
  }
];

const PRICING: PricingTier[] = [
  {
    id: 'starter',
    name: 'Vigilante',
    price: '₹24,999',
    features: ['One-Page Website', 'Basic SEO Setup', 'Contact Form', 'Mobile Responsive', '1 Week Delivery'],
    recommended: false
  },
  {
    id: 'growth',
    name: 'Heroic',
    price: '₹49,999',
    features: ['5-Page Website', 'Social Media Kit', 'Google Maps Integration', 'CMS Content Management', '3 Days Support', 'Logo Design'],
    recommended: true
  },
  {
    id: 'pro',
    name: 'Multiverse',
    price: 'Custom',
    features: ['Full E-Commerce', 'Brand Video Production', 'Ad Campaign Setup', 'Advanced Analytics', 'Priority Support'],
    recommended: false
  }
];

const TEAM = [
  {
    name: 'Sandeep',
    role: 'Lead AI Developer',
    speciality: 'Static Websites & Architecture',
    description: 'The architect behind the matrix. Specializes in building high-performance static websites and integrating cutting-edge AI solutions.',
    phone: '9346577461'
  },
  {
    name: 'Ram',
    role: 'Dashboard Expert',
    speciality: 'Digital Marketing & Analytics',
    description: 'The strategist. Master of dashboards and digital marketing campaigns that drive growth and visibility in the digital realm.',
    phone: '9182239496'
  }
];

const STATS = [
  { label: 'Webs Spun', value: '50+' },
  { label: 'Allies Made', value: '20+' },
  { label: 'Years Experience', value: '2+' },
];

// Particle Component for Hero
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#ff3366] rounded-full opacity-0"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "100%", 
            opacity: 0 
          }}
          animate={{ 
            y: "-20%", 
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Pulsing Web Strands Component
const GlowingWebStrands = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
       <svg className="absolute w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Top Left to Bottom Right */}
          <motion.path
            d="M0,0 Q50,50 100,100"
            stroke="url(#web-gradient)"
            strokeWidth="0.2"
            fill="none"
            animate={{
              strokeWidth: ["0.1", "0.3", "0.1"],
              strokeOpacity: [0.3, 0.8, 0.3],
              d: ["M0,0 Q50,45 100,100", "M0,0 Q55,50 100,100", "M0,0 Q50,45 100,100"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Top Right to Bottom Left */}
          <motion.path
            d="M100,0 Q50,50 0,100"
            stroke="url(#web-gradient)"
            strokeWidth="0.2"
            fill="none"
            animate={{
              strokeWidth: ["0.1", "0.3", "0.1"],
              strokeOpacity: [0.3, 0.8, 0.3],
              d: ["M100,0 Q55,50 0,100", "M100,0 Q45,50 0,100", "M100,0 Q55,50 0,100"]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Random connecting strand */}
          <motion.path
            d="M20,0 Q50,80 80,0"
            stroke="url(#web-gradient)"
            strokeWidth="0.1"
            fill="none"
             animate={{
              strokeOpacity: [0.1, 0.5, 0.1],
              strokeWidth: ["0.05", "0.15", "0.05"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <defs>
            <linearGradient id="web-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="#ff3366" />
              <stop offset="50%" stopColor="#ffb6c1" />
              <stop offset="80%" stopColor="#ff3366" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
       </svg>
    </div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#e0e0e0] selection:bg-[#ff3366] selection:text-white cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <WhatsAppButton />
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hanging Web Decoration (Top Left) - Stylized */}
      <div className="fixed top-0 left-8 w-px h-64 bg-gradient-to-b from-white/20 to-transparent z-0 hidden md:block hanging-web">
         <div className="absolute bottom-0 -left-1 w-3 h-3 border border-[#ff3366] rotate-45" />
      </div>
      <div className="fixed top-0 right-12 w-px h-96 bg-gradient-to-b from-white/10 to-transparent z-0 hidden md:block hanging-web" style={{ animationDelay: '-2s' }}>
         <div className="absolute bottom-0 -left-1 w-2 h-2 bg-[#ff3366]/50 rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 flex items-center justify-between mix-blend-difference bg-gradient-to-b from-black to-transparent backdrop-blur-[1px]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-[#ff3366] flex items-center justify-center font-heading font-bold text-white text-lg bg-[#ff3366]/10 shadow-[0_0_10px_#ff3366]">M</div>
          <span className="font-heading text-xl font-bold tracking-widest text-white">MJ<span className="text-[#ff3366]">FORYOU</span></span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.2em] uppercase">
          {['Services', 'Work', 'Pricing', 'Team', 'About'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#ff3366] transition-colors relative group"
              data-hover="true"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ff3366] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:flex items-center gap-2 border border-white/20 px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:border-[#ff3366] hover:text-[#ff3366] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,51,102,0.3)] bg-black/50 backdrop-blur-md"
          data-hover="true"
        >
          Get Quote <ArrowRight size={14} />
        </button>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2 text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-30 bg-[#050000] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Services', 'Work', 'Pricing', 'Team', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-3xl font-heading font-bold hover:text-[#ff3366] transition-colors tracking-widest uppercase"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen flex flex-col justify-center relative pt-20 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
             src="https://images.hdqwalls.com/wallpapers/spider-gwen-4k-artwork-j0.jpg" 
             alt="Spider Gwen Theme" 
             className="w-full h-full object-cover opacity-80"
             style={{ objectPosition: 'center 20%' }} 
          />
          {/* Heavy Gradients for Cinematic Feel */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050000] via-transparent to-[#050000]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050000] via-[#050000]/40 to-[#050000]" />
          <div className="absolute inset-0 bg-[#3d000a] mix-blend-overlay opacity-40" />
        </div>

        <FloatingParticles />
        <GlowingWebStrands />

        <div className="max-w-7xl mx-auto px-6 md:px-20 z-10 w-full relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1 border border-[#ff3366]/50 bg-black/50 text-[10px] font-bold uppercase text-[#ffb6c1] tracking-[0.3em] backdrop-blur-sm shadow-[0_0_15px_rgba(255,51,102,0.2)]">
                The Multiverse Awaits
              </span>
            </motion.div>

            <motion.h1 
              variants={{ hidden: { y: 50, opacity: 0, scale: 0.95 }, visible: { y: 0, opacity: 1, scale: 1 } }}
              className="text-5xl md:text-8xl lg:text-[7rem] font-heading font-bold leading-[0.9] tracking-tighter mb-8 text-white drop-shadow-2xl"
            >
              BECAUSE ALL DON'T<br />
              HAVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3366] via-[#ffb6c1] to-white text-glow italic pr-4">MJ</span> IN<br />
              THEIR LIFE...
            </motion.h1>

            <motion.div 
               variants={{ hidden: { width: 0 }, visible: { width: '100px' } }}
               className="h-1 bg-[#ff3366] mb-8 shadow-[0_0_10px_#ff3366]" 
            />

            <motion.p 
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="text-xl md:text-2xl text-white font-light max-w-2xl leading-relaxed mb-12 tracking-wide font-heading"
            >
              WE WILL BE THERE FOR YOU.
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              className="flex flex-wrap gap-6"
            >
              <button 
                onClick={() => scrollToSection('work')}
                className="bg-[#ff3366] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#cc1f4b] transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:shadow-[0_0_30px_rgba(255,51,102,0.6)] hover:-translate-y-1"
                data-hover="true"
              >
                Start Mission
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="border border-white/20 text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:border-white/50 hover:bg-white/5 transition-all backdrop-blur-sm"
                data-hover="true"
              >
                Identify Targets
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff3366]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#ff3366] to-transparent" />
        </motion.div>
      </section>

      {/* STATS BANNER */}
      <section className="py-16 border-y border-[#ff3366]/10 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3d000a_0%,_transparent_70%)] opacity-30" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left border-l border-[#ff3366]/20 pl-6"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold mb-2 text-white">{stat.value}</div>
              <div className="text-xs text-[#ffb6c1] uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </motion.div>
          ))}
           <div className="flex items-center justify-center md:justify-start pl-6">
             <div className="flex -space-x-4">
               {[1,2,3].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full border border-[#ff3366] bg-black overflow-hidden relative group cursor-pointer">
                    <img src={`https://i.pravatar.cc/150?img=${i+25}`} alt="client" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                 </div>
               ))}
               <div className="w-12 h-12 rounded-full border border-[#ff3366] bg-black flex items-center justify-center text-[#ff3366] font-bold text-xs relative z-10">
                 +20
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6 md:px-20 relative bg-[#050000]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3d000a]/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-[1px] bg-[#ff3366]" />
                <span className="text-[#ff3366] font-bold text-xs uppercase tracking-[0.3em]">Our Abilities</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mt-2 text-white">SUPERNATURAL <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3366] to-[#ffb6c1]">SOLUTIONS</span></h2>
            </div>
            <p className="max-w-md text-gray-400 font-light leading-relaxed border-l border-white/10 pl-6">
              We weave the digital strands that connect your brand to the world. Precision, agility, and power in every pixel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WORK / PORTFOLIO */}
      <section id="work" className="py-32 px-6 md:px-20 bg-[#080203] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col items-center text-center">
            <span className="text-[#ff3366] font-bold text-xs uppercase tracking-[0.3em] mb-4">Battle Records</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">SELECTED MISSIONS</h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#ff3366] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                onClick={(proj) => setSelectedProject(proj)}
              />
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <button className="border border-[#ff3366]/30 text-[#ff3366] px-10 py-4 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#ff3366] hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_#ff3366]" data-hover="true">
              View All Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-32 px-6 md:px-20 relative overflow-hidden bg-[#050000]">
        {/* Decorative BG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[#3d000a]/20 to-[#1a0526]/20 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">ALLIANCE TIERS</h2>
            <p className="text-gray-400 max-w-xl mx-auto font-light">Choose the power level that suits your mission objectives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-10 rounded-sm border ${
                  tier.recommended 
                  ? 'border-[#ff3366] bg-gradient-to-b from-[#ff3366]/10 to-black' 
                  : 'border-white/10 bg-black/40'
                } backdrop-blur-md flex flex-col hover:-translate-y-2 transition-transform duration-500`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff3366] text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_#ff3366]">
                    Most Powerful
                  </div>
                )}
                
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wider text-gray-300">{tier.name}</h3>
                <div className="text-5xl font-heading font-bold mb-8 text-white">{tier.price}</div>
                
                <ul className="space-y-6 mb-10 flex-1">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-sm text-gray-400">
                      <div className={`w-1 h-1 rounded-full ${tier.recommended ? 'bg-[#ff3366] shadow-[0_0_5px_#ff3366]' : 'bg-white/30'}`} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300 ${
                    tier.recommended 
                    ? 'bg-[#ff3366] text-white hover:bg-[#cc1f4b] shadow-[0_0_20px_rgba(255,51,102,0.3)]' 
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30'
                  }`}
                  data-hover="true"
                >
                  Select {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-32 px-6 md:px-20 bg-[#080203] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col items-center text-center">
            <span className="text-[#ff3366] font-bold text-xs uppercase tracking-[0.3em] mb-4">Core Squad</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">THE ARCHITECTS</h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#ff3366] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group relative flex flex-col bg-[#0a0505] border border-white/5 rounded-sm overflow-hidden hover:border-[#ff3366]/30 transition-all duration-500"
              >
                 <div className="w-full p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="text-2xl font-heading font-bold text-white mb-1">{member.name}</h3>
                      <span className="text-[#ff3366] text-xs font-bold uppercase tracking-widest">{member.role}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed border-l-2 border-[#ff3366]/20 pl-4">
                      {member.description}
                    </p>

                    <div className="mt-auto space-y-3">
                       <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-widest">
                         <Zap size={14} className="text-[#ff3366]" />
                         {member.speciality}
                       </div>
                       <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">
                         <Smartphone size={14} className="text-[#ff3366]" />
                         <a href={`tel:${member.phone}`} className="hover:text-[#ff3366] transition-colors">{member.phone}</a>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" className="py-32 px-6 md:px-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#3d000a_0%,_transparent_60%)] opacity-40" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="matte-card p-12 md:p-24 rounded-sm border border-[#ff3366]/20 relative overflow-hidden"
          >
             {/* Glows */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff3366]/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6600cc]/10 rounded-full blur-[100px]" />

             <h2 className="text-4xl md:text-7xl font-heading font-bold mb-8 relative z-10 text-white">
               NEED A <span className="text-[#ff3366] text-glow">PARTNER?</span>
             </h2>
             <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto relative z-10 font-light">
               The city needs saving. Let's turn your vision into reality. Book a secure line, transmit your request below, or chat directly.
             </p>
             
             {/* Form Component */}
             <ContactForm />
             
             <div className="flex flex-col md:flex-row gap-6 justify-center relative z-10 mt-12 pt-12 border-t border-white/10">
               <a 
                 href="https://wa.me/919346577461"
                 target="_blank"
                 rel="noreferrer" 
                 className="bg-white text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-3" data-hover="true">
                 <Smartphone size={18} /> Call Sandeep
               </a>
               <a 
                 href="https://wa.me/919182239496" 
                 target="_blank" 
                 rel="noreferrer"
                 className="bg-[#25D366] text-white px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,211,102,0.3)]" 
                 data-hover="true"
               >
                 <span className="fill-current"><MessageCircle size={18} /></span> Chat with Ram
               </a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* FALLING WEB FOOTER */}
      <div className="relative w-full h-[300px] overflow-hidden pointer-events-none -mt-40 z-10">
         <svg className="absolute bottom-0 left-0 w-full h-full text-[#ff3366]/10" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="currentColor" fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
         
         <div className="absolute top-0 right-20 hanging-web opacity-30">
            <svg width="200" height="400" viewBox="0 0 100 200">
               <path d="M50,0 Q60,100 50,200" stroke="#ff3366" strokeWidth="1" fill="none" />
               <path d="M20,50 L80,50 M30,100 L70,100 M40,150 L60,150" stroke="#ff3366" strokeWidth="0.5" fill="none" opacity="0.5" />
            </svg>
         </div>
      </div>

      {/* FOOTER */}
      <footer className="py-16 px-6 md:px-20 border-t border-[#ff3366]/10 bg-[#020001] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#ff3366] flex items-center justify-center font-heading font-bold text-white text-xs bg-[#ff3366]/10">M</div>
            <span className="font-heading font-bold text-xl tracking-widest">MJ<span className="text-[#ff3366]">FORYOU</span></span>
          </div>
          
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-[#ff3366] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#ff3366] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#ff3366] transition-colors">Sitemap</a>
          </div>

          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#ff3366] hover:text-[#ff3366] transition-all duration-300" data-hover="true"><Instagram size={16} /></a>
             <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-300" data-hover="true"><Linkedin size={16} /></a>
          </div>
        </div>
        <div className="text-center mt-10 text-[10px] uppercase tracking-widest text-gray-700">
          © 2025 MJ For You Agency. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;