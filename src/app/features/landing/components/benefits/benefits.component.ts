import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * BENEFITS COMPONENT DATA INTERFACES
interface Benefit {
  title: string;
  description: string;
  icon: string;
  stats: string;
  color: string;
}

interface ImpactStat {
  value: string;
  label: string;
}

// * BENEFITS COMPONENT
// * Purpose: Showcase the key benefits and impact of using CropFresh
@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css'],
})
export class BenefitsComponent {
  // * BENEFITS DATA
  benefits: Benefit[] = [
    {
      title: 'Increased Income',
      description:
        'Direct market access eliminates middlemen, ensuring farmers get fair prices and higher profits for their produce.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      stats: '+40%',
      color: '#10b981, #059669',
    },
    {
      title: 'Reduced Wastage',
      description:
        'Smart logistics and cold chain management minimize post-harvest losses and ensure fresh produce reaches markets.',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      stats: '-30%',
      color: '#3b82f6, #2563eb',
    },
    {
      title: 'Better Yields',
      description:
        'AI-powered crop advisory and precision farming techniques help optimize resources and maximize production.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      stats: '+25%',
      color: '#f59e0b, #d97706',
    },
    {
      title: 'Time Savings',
      description:
        'Digital transactions and automated processes save valuable time that farmers can invest in productive activities.',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      stats: '60%',
      color: '#8b5cf6, #7c3aed',
    },
    {
      title: 'Risk Mitigation',
      description:
        'Weather alerts, crop insurance, and market intelligence help farmers make informed decisions and reduce risks.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      stats: '-45%',
      color: '#06b6d4, #0891b2',
    },
    {
      title: 'Knowledge Access',
      description:
        'Expert advice, best practices, and educational content in local languages empower farmers with knowledge.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      stats: '100%',
      color: '#ec4899, #db2777',
    },
  ];

  // * IMPACT STATISTICS
  impactStats: ImpactStat[] = [
    { value: '₹500Cr+', label: 'Transaction Volume' },
    { value: '2.5L+', label: 'Active Farmers' },
    { value: '50M+', label: 'Kg Produce Traded' },
    { value: '98%', label: 'User Satisfaction' },
  ];
}
