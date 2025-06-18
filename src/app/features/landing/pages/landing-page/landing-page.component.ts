import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { FeaturesOverviewComponent } from '../../components/features-overview/features-overview.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

// * SECTION INFO INTERFACE
// * Purpose: Define structure for section metadata
interface SectionInfo {
  id: string;
  name: string;
  isVisible: boolean;
  element?: Element;
}

// * LANDING PAGE COMPONENT
// * Purpose: Main landing page orchestrating all sections with enhanced UX
// * Features: Scroll management, intersection observer, performance optimization
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FeaturesOverviewComponent,
    HowItWorksComponent,
    BenefitsComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private intersectionObserver?: IntersectionObserver;
  private isPageLoaded = false;

  // * Section tracking for navigation and analytics
  protected sections: SectionInfo[] = [
    { id: 'hero', name: 'Hero', isVisible: false },
    { id: 'features', name: 'Features', isVisible: false },
    { id: 'how-it-works', name: 'How It Works', isVisible: false },
    { id: 'benefits', name: 'Benefits', isVisible: false },
    { id: 'testimonials', name: 'Testimonials', isVisible: false },
    { id: 'pricing', name: 'Pricing', isVisible: false },
    { id: 'faq', name: 'FAQ', isVisible: false },
    { id: 'cta', name: 'Call to Action', isVisible: false },
  ];

  // * Current active section for navigation highlighting
  protected currentSection = 'hero';

  // * Page loading state
  protected isLoading = true;

  ngOnInit(): void {
    // * Initialize page loading state
    this.initializePageLoading();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // * Setup intersection observer for section visibility
      this.setupIntersectionObserver();

      // * Initialize scroll behavior
      this.initializeScrollBehavior();

      // * Mark page as loaded after initial render
      setTimeout(() => {
        this.markPageAsLoaded();
      }, 500);
    }
  }

  ngOnDestroy(): void {
    // * Cleanup intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  // * Initialize page loading state
  private initializePageLoading(): void {
    this.isLoading = true;

    // * Simulate initial content loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // * Mark page as fully loaded
  private markPageAsLoaded(): void {
    this.isPageLoaded = true;

    // * Add loaded class to enable animations
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('page-loaded');
    }
  }

  // * Setup intersection observer for section visibility tracking
  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1,
    };

    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const section = this.sections.find(s => s.id === sectionId);

        if (section) {
          section.isVisible = entry.isIntersecting;
          section.element = entry.target;

          // * Update current section
          if (entry.isIntersecting) {
            this.currentSection = sectionId;
            this.trackSectionView(sectionId);
          }

          // * Add reveal animation class
          if (entry.isIntersecting) {
            entry.target.classList.add('section-reveal', 'revealed');
          }
        }
      });
    }, options);

    // * Observe all sections
    this.sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        section.element = element;
        this.intersectionObserver?.observe(element);
      }
    });
  }

  // * Initialize smooth scroll behavior
  private initializeScrollBehavior(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // * Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';

    // * Handle hash navigation
    this.handleHashNavigation();
  }

  // * Handle URL hash navigation
  private handleHashNavigation(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const hash = window.location.hash.slice(1);
    if (hash && this.sections.some(s => s.id === hash)) {
      setTimeout(() => {
        this.scrollToSection(hash);
      }, 1000); // Wait for page to load
    }
  }

  // * Scroll to specific section
  protected scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });

      // * Update URL hash
      history.replaceState(null, '', `#${sectionId}`);

      // * Track navigation analytics
      this.trackSectionNavigation(sectionId);
    }
  }

  // * Track section view for analytics
  private trackSectionView(sectionId: string): void {
    // * TODO: Implement analytics tracking
    console.log(`Section viewed: ${sectionId}`);

    // * Example: Google Analytics tracking
    // gtag('event', 'section_view', {
    //   event_category: 'engagement',
    //   event_label: sectionId,
    //   value: 1
    // });
  }

  // * Track section navigation for analytics
  private trackSectionNavigation(sectionId: string): void {
    // * TODO: Implement analytics tracking
    console.log(`Section navigated to: ${sectionId}`);

    // * Example: Google Analytics tracking
    // gtag('event', 'section_navigation', {
    //   event_category: 'navigation',
    //   event_label: sectionId,
    //   value: 1
    // });
  }

  // * Get current visible sections
  protected getVisibleSections(): SectionInfo[] {
    return this.sections.filter(section => section.isVisible);
  }

  // * Check if section is currently active
  protected isSectionActive(sectionId: string): boolean {
    return this.currentSection === sectionId;
  }

  // * Get section progress percentage
  protected getSectionProgress(sectionId: string): number {
    if (!isPlatformBrowser(this.platformId)) return 0;

    const element = document.getElementById(sectionId);
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // * Calculate how much of the section is visible
    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const sectionHeight = rect.height;

    return Math.max(0, Math.min(100, (visibleHeight / sectionHeight) * 100));
  }

  // * Handle scroll to top
  protected scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // * Get page scroll progress
  protected getPageScrollProgress(): number {
    if (!isPlatformBrowser(this.platformId)) return 0;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    return Math.min(100, (scrollTop / documentHeight) * 100);
  }

  // * Preload critical resources
  private preloadCriticalResources(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // * TODO: Preload critical images, fonts, or other resources
    // * Example: Preload hero image
    // const heroImage = new Image();
    // heroImage.src = '/assets/images/hero/farmers-hero.jpg';
  }

  // * Lazy load non-critical content
  private lazyLoadContent(): void {
    // * TODO: Implement lazy loading for non-critical sections
    console.log('Lazy loading non-critical content...');
  }

  // * Handle page visibility change
  private handleVisibilityChange(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // * Page is hidden - pause animations, videos, etc.
        console.log('Page hidden - pausing animations');
      } else {
        // * Page is visible - resume animations, videos, etc.
        console.log('Page visible - resuming animations');
      }
    });
  }
}
