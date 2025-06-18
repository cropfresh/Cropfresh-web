import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * HOW IT WORKS COMPONENT INTERFACE
interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

// * HOW IT WORKS COMPONENT
// * Purpose: Display the step-by-step process of using CropFresh platform
@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css'],
})
export class HowItWorksComponent {
  // * PROCESS STEPS DATA
  steps: Step[] = [
    {
      number: '1',
      title: 'Sign Up & Create Profile',
      description:
        'Register with your mobile number and set up your farm or business profile in minutes. Choose your role - farmer, buyer, or service provider.',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      color: '#10b981, #059669',
    },
    {
      number: '2',
      title: 'Connect & Discover',
      description:
        'Browse the marketplace, find buyers for your produce, source quality inputs, or discover services. Use AI-powered search and recommendations.',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      color: '#3b82f6, #2563eb',
    },
    {
      number: '3',
      title: 'Transact Securely',
      description:
        'Negotiate prices, place orders, and make secure payments through our platform. Track your shipments in real-time with our logistics network.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      color: '#f59e0b, #d97706',
    },
    {
      number: '4',
      title: 'Grow with AI Insights',
      description:
        'Leverage AI-powered analytics, weather forecasts, and crop advisory to optimize your operations and maximize profitability.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: '#8b5cf6, #7c3aed',
    },
  ];
}
