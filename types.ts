/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon
  priceStart: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link?: string;
  // New detailed fields
  description?: string;
  challenge?: string;
  solution?: string;
  technologies?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Artist {
  id?: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}