import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// * FEATURES OVERVIEW COMPONENT INTERFACES
interface Feature {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  details: string[];
  link: string;
  delay: number;
}

interface AIFeature {
  title: string;
  description: string;
  icon: string;
}

interface WeatherDay {
  name: string;
  temp: number;
  weather: string;
}

interface Particle {
  x: number;
  y: number;
  delay: number;
}

// * FEATURES OVERVIEW COMPONENT
// * Purpose: Showcase all platform features with interactive elements
@Component({
  selector: 'app-features-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './features-overview.component.html',
  styleUrls: ['./features-overview.component.css'],
})
export class FeaturesOverviewComponent implements OnInit {
  // * MAIN FEATURES DATA
  features: Feature[] = [
    {
      title: 'DirectConnect Marketplace',
      description:
        'Connect directly with buyers and sellers, eliminating middlemen and ensuring fair prices for everyone.',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      gradient: '#10b981, #059669',
      details: [
        'Real-time price discovery',
        'Secure payment gateway',
        'Quality verification system',
        'Direct farmer-to-business deals',
      ],
      link: '/marketplace',
      delay: 0,
    },
    {
      title: 'AI Crop Advisory',
      description:
        'Get personalized recommendations powered by AI for optimal crop selection and management strategies.',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      gradient: '#3b82f6, #2563eb',
      details: [
        'Disease detection & prevention',
        'Yield prediction models',
        'Personalized farming calendar',
        'Resource optimization',
      ],
      link: '/ai-advisory',
      delay: 0.1,
    },
    {
      title: 'Smart Logistics',
      description:
        'Optimize your supply chain with AI-powered routing and advanced cold storage management.',
      icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
      gradient: '#f59e0b, #d97706',
      details: [
        'Route optimization',
        'Cold chain monitoring',
        'Real-time tracking',
        'Automated scheduling',
      ],
      link: '/logistics',
      delay: 0.2,
    },
    {
      title: 'Financial Services',
      description:
        'Access credit, insurance, and financial planning tools specifically tailored for agriculture.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      gradient: '#8b5cf6, #7c3aed',
      details: [
        'Digital crop records',
        'Easy loan applications',
        'Crop insurance support',
        'Financial planning tools',
      ],
      link: '/finance',
      delay: 0.3,
    },
    {
      title: 'Weather Intelligence',
      description:
        'Hyperlocal weather forecasts and alerts to protect your crops and optimize farming operations.',
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      gradient: '#06b6d4, #0891b2',
      details: [
        'Village-level forecasts',
        'Pest & disease alerts',
        'Irrigation scheduling',
        'Climate risk assessment',
      ],
      link: '/weather',
      delay: 0.4,
    },
    {
      title: 'Knowledge Hub',
      description:
        'Access expert advice, best practices, and educational content in your preferred local language.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      gradient: '#ec4899, #db2777',
      details: [
        'Video tutorials',
        'Expert consultations',
        'Community forums',
        'Government schemes info',
      ],
      link: '/knowledge-hub',
      delay: 0.5,
    },
  ];

  // * AI FEATURES DATA
  aiFeatures: AIFeature[] = [
    {
      title: 'Crop Disease Detection',
      description:
        'Upload a photo and get instant AI diagnosis with treatment recommendations.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Yield Prediction',
      description:
        'AI models analyze multiple factors to forecast your expected harvest accurately.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      title: 'Market Price Prediction',
      description:
        'Know when to sell with AI-powered price forecasts for maximum profitability.',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
    {
      title: 'Smart Irrigation',
      description:
        'Optimize water usage with AI recommendations based on soil, weather, and crop data.',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
  ];

  // * WEATHER DATA FOR AI DASHBOARD
  weatherDays: WeatherDay[] = [
    { name: 'Mon', temp: 28, weather: 'sunny' },
    { name: 'Tue', temp: 26, weather: 'cloudy' },
    { name: 'Wed', temp: 24, weather: 'rainy' },
    { name: 'Thu', temp: 27, weather: 'sunny' },
    { name: 'Fri', temp: 29, weather: 'sunny' },
    { name: 'Sat', temp: 25, weather: 'cloudy' },
    { name: 'Sun', temp: 26, weather: 'sunny' },
  ];

  // * PARTICLE SYSTEM DATA
  particles: Particle[] = [];

  // * LIFECYCLE METHODS
  ngOnInit(): void {
    this.initializeParticles();
  }

  // * PRIVATE METHODS
  private initializeParticles(): void {
    // Initialize particles for AI section
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
      });
    }
  }

  // * EVENT HANDLERS
  onFeatureHover(event: MouseEvent): void {
    // Add interactive hover effect
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
