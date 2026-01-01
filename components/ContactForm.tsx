/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Identity required';
    if (!formData.email.trim()) {
      newErrors.email = 'Frequency channel required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid frequency format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Mission objective required';
    if (!formData.message.trim()) newErrors.message = 'Intel required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Format the message for WhatsApp
    const whatsappMessage = `🚨 *INCOMING TRANSMISSION* 🚨

*Identity:* ${formData.name}
*Frequency (Email):* ${formData.email}
*Objective:* ${formData.subject}

*Intel:*
${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const sandeepNumber = "919346577461";

    // Simulate "Encrypting" delay for effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Open WhatsApp
    window.open(`https://wa.me/${sandeepNumber}?text=${encodedMessage}`, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-12 bg-[#ff3366]/10 border border-[#ff3366]/30 rounded-sm mt-8"
      >
        <CheckCircle className="w-16 h-16 text-[#ff3366] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2 font-heading">Transmission Encoded</h3>
        <p className="text-gray-400">Redirecting to secure frequency (WhatsApp) to complete transmission.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-[#ff3366] text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          Send Another Transmission
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-2xl mx-auto mt-12 mb-12 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Alias / Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-black/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-sm p-4 text-white focus:border-[#ff3366] focus:outline-none transition-colors backdrop-blur-sm`}
            placeholder="Peter Parker"
          />
          {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Secure Channel / Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-sm p-4 text-white focus:border-[#ff3366] focus:outline-none transition-colors backdrop-blur-sm`}
            placeholder="spidey@dailybugle.com"
          />
           {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">Objective / Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full bg-black/50 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-sm p-4 text-white focus:border-[#ff3366] focus:outline-none transition-colors backdrop-blur-sm`}
          placeholder="Project Collaboration"
        />
         {errors.subject && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.subject}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Intel / Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full bg-black/50 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-sm p-4 text-white focus:border-[#ff3366] focus:outline-none transition-colors resize-none backdrop-blur-sm`}
          placeholder="Brief us on your mission requirements..."
        />
         {errors.message && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#ff3366] text-white font-bold uppercase tracking-widest py-4 rounded-sm hover:bg-[#cc1f4b] transition-all shadow-[0_0_20px_rgba(255,51,102,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        data-hover="true"
      >
        {isSubmitting ? 'Encrypting & Sending...' : <><Send size={18} className="group-hover:translate-x-1 transition-transform" /> Establish Connection</>}
      </button>
    </form>
  );
};

export default ContactForm;