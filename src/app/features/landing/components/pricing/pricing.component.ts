import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// * PRICING PLAN INTERFACE
// * Purpose: Define structure for pricing plan data
interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  buttonText: string;
  features: string[];
  popular?: boolean;
  savings?: string;
  originalPrice?: number;
}

// * PRICING COMPONENT
// * Purpose: Display pricing plans and subscription options with enhanced features
// * Features: Futuristic design, popular badge, animations, responsive layout
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  // * Pricing plans data with enhanced structure
  protected pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small farms',
      price: 29,
      period: 'month',
      buttonText: 'Start Free Trial',
      features: [
        'Up to 5 hectares coverage',
        'Basic crop monitoring',
        'Weather alerts & forecasts',
        'Mobile app access',
        'Email support',
      ],
      popular: false,
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing businesses',
      price: 79,
      period: 'month',
      buttonText: 'Start Free Trial',
      features: [
        'Up to 50 hectares coverage',
        'Advanced AI insights & analytics',
        'Marketplace access & trading',
        'Priority support 24/7',
        'Advanced reporting & exports',
      ],
      popular: true,
      savings: '2 months free',
      originalPrice: 99,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large operations',
      price: 199,
      period: 'month',
      buttonText: 'Contact Sales',
      features: [
        'Unlimited hectares coverage',
        'Full AI suite & automation',
        'Dedicated account manager',
        'Custom integrations & API',
        'SLA guarantee & white-label',
      ],
      popular: false,
    },
  ];

  // * Component statistics for trust building
  protected readonly stats = {
    activeFarmers: '250K+',
    cropsTradedMonthly: '50M+',
    averageYieldIncrease: '35%',
    customerSatisfaction: '98%',
  };

  // * Plan selection handler
  protected onSelectPlan(plan: PricingPlan, index: number): void {
    // * TODO: Implement plan selection logic
    // ? Consider adding analytics tracking here
    console.log(`Selected plan: ${plan.name} (${plan.id})`, {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      index: index,
      timestamp: new Date().toISOString(),
    });

    // * Handle different button actions
    if (plan.buttonText === 'Contact Sales') {
      this.onContactSales(plan);
    } else {
      this.onStartTrial(plan);
    }
  }

  // * Start trial handler
  private onStartTrial(plan: PricingPlan): void {
    // * TODO: Implement trial signup navigation
    // ! IMPORTANT: Validate user authentication state
    console.log(`Starting trial for ${plan.name}...`);

    // * Example: Navigate to signup with plan preselected
    // this.router.navigate(['/signup'], {
    //   queryParams: { plan: plan.id, trial: true }
    // });
  }

  // * Contact sales handler
  private onContactSales(plan: PricingPlan): void {
    // * TODO: Implement sales contact logic
    // NOTE: Enterprise plans require sales consultation
    console.log(`Contacting sales for ${plan.name}...`);

    // * Example: Open contact modal or navigate to contact page
    // this.modalService.openContactModal({
    //   planId: plan.id,
    //   planName: plan.name
    // });
  }

  // * Utility method to check if plan is popular
  protected isPlanPopular(index: number): boolean {
    return index === 1; // Professional plan (middle)
  }

  // * Utility method to format price display
  protected formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  // * Utility method to get plan savings text
  protected getPlanSavings(plan: PricingPlan): string | null {
    if (plan.savings && plan.originalPrice) {
      const savingsAmount = plan.originalPrice - plan.price;
      const savingsPercent = Math.round(
        (savingsAmount / plan.originalPrice) * 100
      );
      return `Save ${savingsPercent}% - ${plan.savings}`;
    }
    return null;
  }

  // * Track by function for ngFor optimization
  protected trackByPlanId(index: number, plan: PricingPlan): string {
    return plan.id;
  }
}
