import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * NEWSLETTER SUBSCRIPTION INTERFACE
// * Purpose: Define structure for newsletter subscription data
interface NewsletterSubscription {
  email: string;
  timestamp: Date;
  source: string;
}

// * SOCIAL LINK INTERFACE
// * Purpose: Define structure for social media links
interface SocialLink {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

// * FOOTER COMPONENT
// * Purpose: Enhanced website footer with navigation, contact info, and subscription
// * Features: Newsletter subscription, social links, responsive design, analytics
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // * Current year for copyright display
  protected readonly currentYear = new Date().getFullYear();

  // * Component statistics for footer display
  protected readonly companyStats = {
    foundedYear: 2023,
    activeUsers: '250K+',
    countriesServed: 12,
    totalFarms: '500+',
  };

  // * Social media links configuration
  protected readonly socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/cropfresh',
      icon: 'facebook',
      ariaLabel: 'Follow CropFresh on Facebook',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/cropfresh',
      icon: 'twitter',
      ariaLabel: 'Follow CropFresh on Twitter',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/cropfresh',
      icon: 'linkedin',
      ariaLabel: 'Connect with CropFresh on LinkedIn',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/cropfresh',
      icon: 'instagram',
      ariaLabel: 'Follow CropFresh on Instagram',
    },
  ];

  // * Newsletter subscription state
  protected newsletterEmail = '';
  protected isSubscribing = false;
  protected subscriptionStatus: 'idle' | 'loading' | 'success' | 'error' =
    'idle';
  protected subscriptionMessage = '';

  // * Newsletter subscription handler
  protected onNewsletterSubscribe(): void {
    // * Validate email before processing
    if (!this.isValidEmail(this.newsletterEmail)) {
      this.showSubscriptionMessage(
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    this.isSubscribing = true;
    this.subscriptionStatus = 'loading';

    // * TODO: Implement actual newsletter subscription API call
    // ! IMPORTANT: Replace with real API endpoint
    this.simulateNewsletterSubscription()
      .then(() => {
        this.showSubscriptionMessage(
          'Successfully subscribed to our newsletter!',
          'success'
        );
        this.newsletterEmail = ''; // Clear form on success

        // * Analytics tracking for subscription
        this.trackNewsletterSubscription();
      })
      .catch(error => {
        console.error('Newsletter subscription failed:', error);
        this.showSubscriptionMessage(
          'Subscription failed. Please try again later.',
          'error'
        );
      })
      .finally(() => {
        this.isSubscribing = false;
      });
  }

  // * Email validation utility
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // * Show subscription feedback message
  private showSubscriptionMessage(
    message: string,
    status: 'success' | 'error'
  ): void {
    this.subscriptionMessage = message;
    this.subscriptionStatus = status;

    // * Auto-hide message after 5 seconds
    setTimeout(() => {
      this.subscriptionMessage = '';
      this.subscriptionStatus = 'idle';
    }, 5000);
  }

  // * Simulate newsletter subscription (replace with real implementation)
  private simulateNewsletterSubscription(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // * Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated subscription failure'));
        }
      }, 1500);
    });
  }

  // * Track newsletter subscription for analytics
  private trackNewsletterSubscription(): void {
    // * TODO: Implement analytics tracking
    // NOTE: Replace with your analytics service
    const subscriptionData: NewsletterSubscription = {
      email: this.newsletterEmail,
      timestamp: new Date(),
      source: 'footer',
    };

    console.log('Newsletter subscription tracked:', subscriptionData);

    // * Example: Google Analytics tracking
    // gtag('event', 'newsletter_signup', {
    //   event_category: 'engagement',
    //   event_label: 'footer'
    // });
  }

  // * Handle social link clicks
  protected onSocialLinkClick(socialLink: SocialLink): void {
    // * TODO: Add analytics tracking for social link clicks
    console.log(`Social link clicked: ${socialLink.name}`);

    // * Track social media engagement
    this.trackSocialEngagement(socialLink.name);

    // * Open link in new tab
    window.open(socialLink.url, '_blank', 'noopener,noreferrer');
  }

  // * Track social media engagement
  private trackSocialEngagement(platform: string): void {
    // * TODO: Implement analytics tracking
    console.log(`Social engagement tracked: ${platform}`);

    // * Example: Analytics tracking
    // gtag('event', 'social_click', {
    //   event_category: 'engagement',
    //   event_label: platform
    // });
  }

  // * Handle footer link navigation
  protected onFooterLinkClick(linkName: string, url: string): void {
    // * TODO: Add analytics tracking for footer link clicks
    console.log(`Footer link clicked: ${linkName}`);

    // * Track internal navigation
    this.trackFooterNavigation(linkName);
  }

  // * Track footer navigation
  private trackFooterNavigation(linkName: string): void {
    // * TODO: Implement analytics tracking
    console.log(`Footer navigation tracked: ${linkName}`);

    // * Example: Analytics tracking
    // gtag('event', 'footer_navigation', {
    //   event_category: 'navigation',
    //   event_label: linkName
    // });
  }

  // * Get subscription button text based on state
  protected getSubscriptionButtonText(): string {
    switch (this.subscriptionStatus) {
      case 'loading':
        return 'Subscribing...';
      case 'success':
        return 'Subscribed!';
      case 'error':
        return 'Try Again';
      default:
        return 'Subscribe';
    }
  }

  // * Get subscription button CSS classes
  protected getSubscriptionButtonClasses(): string {
    const baseClasses = 'newsletter-button';

    switch (this.subscriptionStatus) {
      case 'loading':
        return `${baseClasses} loading`;
      case 'success':
        return `${baseClasses} success`;
      case 'error':
        return `${baseClasses} error`;
      default:
        return baseClasses;
    }
  }

  // * Handle newsletter input keypress
  protected onNewsletterKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onNewsletterSubscribe();
    }
  }

  // * Utility method to get company age
  protected getCompanyAge(): number {
    return this.currentYear - this.companyStats.foundedYear;
  }
}
