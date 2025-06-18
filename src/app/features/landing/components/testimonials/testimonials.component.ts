import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * TESTIMONIALS COMPONENT INTERFACE
interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

// * TESTIMONIALS COMPONENT
// * Purpose: Display customer testimonials and reviews
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  // * TESTIMONIALS DATA
  testimonials: Testimonial[] = [
    {
      content:
        'CropFresh has revolutionized how I manage my farm. The AI insights helped me increase my yield by 40% while reducing costs significantly.',
      author: 'Sarah Johnson',
      role: 'Farm Owner',
      company: 'Green Valley Farms',
      rating: 5,
    },
    {
      content:
        "The platform's marketplace feature connected me with buyers I never would have reached before. My profits have doubled in just six months.",
      author: 'Michael Chen',
      role: 'Agricultural Entrepreneur',
      company: 'Fresh Harvest Co.',
      rating: 5,
    },
    {
      content:
        'Outstanding customer support and innovative features. CropFresh made transitioning to digital agriculture smooth and profitable.',
      author: 'David Rodriguez',
      role: 'Cooperative Manager',
      company: 'United Farmers Coop',
      rating: 5,
    },
  ];
}
