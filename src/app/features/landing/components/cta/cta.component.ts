import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * CTA COMPONENT
// * Purpose: Final call-to-action section to convert visitors
// * Features: Futuristic design, holographic effects, particle systems
@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
})
export class CtaComponent {
  // * Component properties for dynamic content
  protected readonly stats = {
    rating: '4.9/5',
    trialDays: '14-Day',
    security: 'Enterprise',
    users: '250,000+',
  };

  protected readonly urgencyOffer = {
    text: 'Limited time: Get 2 months free with annual plans',
    highlight: '2 months free',
  };

  // * Call-to-action handlers
  protected onStartTrial(): void {
    // * TODO: Implement trial signup logic
    console.log('Starting free trial...');
  }

  protected onWatchDemo(): void {
    // * TODO: Implement demo video logic
    console.log('Opening demo video...');
  }

  protected onLearnMore(): void {
    // * TODO: Navigate to features page
    console.log('Navigating to learn more...');
  }
}
