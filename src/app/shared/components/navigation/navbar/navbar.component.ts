import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal,
  computed,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  effect,
  Renderer2,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

// * FUTURISTIC NAVBAR WITH ADVANCED INTERACTIONS
interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  description?: string;
  badge?: string;
  children?: NavigationItem[];
  aiPowered?: boolean;
}

interface ParticleConfig {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('navbar', { static: true }) navbarRef!: ElementRef;
  @ViewChild('magneticCursor', { read: ElementRef })
  magneticCursorRef!: ElementRef;
  @ViewChild('particleCanvas', { read: ElementRef }) canvasRef!: ElementRef;

  // * FUTURISTIC REACTIVE SIGNALS
  private isScrolled = signal(false);
  protected mobileMenuOpen = signal(false);
  protected activeDropdown = signal<string | null>(null);
  protected activeMobileDropdown = signal<string | null>(null);
  protected scrollProgress = signal(0);
  protected aiAssistantActive = signal(false);
  protected magneticActive = signal(false);
  protected cursorPosition = signal({ x: 0, y: 0 });
  protected hoverElement = signal<string | null>(null);
  protected glitchActive = signal(false);
  protected holographicMode = signal(false);
  protected isHoveringDropdown = signal<string | null>(null);

  // * PARTICLE SYSTEM
  private particles: ParticleConfig[] = [];
  private canvasContext!: CanvasRenderingContext2D;
  private animationFrame!: number;

  // * ENHANCED NAVIGATION WITH AI FEATURES
  protected navigationItems: NavigationItem[] = [
    { label: 'Home', route: '/', icon: '🏠' },
    {
      label: 'AI Solutions',
      route: '/ai',
      icon: '🤖',
      aiPowered: true,
      children: [
        {
          label: 'Smart Farming AI',
          route: '/ai/smart-farming',
          description: 'Predictive analytics & automation',
          badge: 'AI-Powered',
          icon: '🧠',
        },
        {
          label: 'Crop Vision Pro',
          route: '/ai/vision',
          description: 'Computer vision for crop health',
          icon: '👁️',
        },
        {
          label: 'Weather AI',
          route: '/ai/weather',
          description: 'ML-powered weather predictions',
          badge: 'Beta',
          icon: '🌤️',
        },
        {
          label: 'Market Intelligence',
          route: '/ai/market',
          description: 'Price prediction algorithms',
          icon: '📊',
        },
      ],
    },
    {
      label: 'Digital Farm',
      route: '/farm',
      icon: '🌾',
      children: [
        {
          label: 'IoT Dashboard',
          route: '/farm/iot',
          description: 'Real-time sensor monitoring',
          badge: 'Live',
          icon: '📡',
        },
        {
          label: 'Drone Fleet',
          route: '/farm/drones',
          description: 'Autonomous field surveillance',
          icon: '🚁',
        },
        {
          label: 'Robotics Hub',
          route: '/farm/robotics',
          description: 'Automated farming robots',
          badge: 'New',
          icon: '🤖',
        },
        {
          label: 'Blockchain Ledger',
          route: '/farm/blockchain',
          description: 'Supply chain transparency',
          icon: '⛓️',
        },
      ],
    },
    {
      label: 'Metaverse',
      route: '/metaverse',
      icon: '🌐',
      badge: 'VR Ready',
      children: [
        {
          label: 'Virtual Farm Tours',
          route: '/metaverse/tours',
          description: '3D immersive experiences',
          icon: '🥽',
        },
        {
          label: 'AR Training',
          route: '/metaverse/training',
          description: 'Augmented reality education',
          icon: '📱',
        },
        {
          label: 'Digital Twins',
          route: '/metaverse/twins',
          description: 'Virtual farm replicas',
          icon: '👥',
        },
      ],
    },
    { label: 'Analytics', route: '/analytics', icon: '📈' },
    { label: 'About', route: '/about', icon: 'ℹ️' },
  ];

  private platformId = inject(PLATFORM_ID);
  private renderer = inject(Renderer2);

  // * COMPUTED NAVBAR CLASSES WITH FUTURISTIC STYLING
  protected navbarClasses = computed(() => {
    const classes = ['navbar-container'];

    if (this.isScrolled()) {
      classes.push('scrolled');
    }

    if (this.holographicMode()) {
      classes.push('holographic');
    }

    if (this.glitchActive()) {
      classes.push('glitch-effect');
    }

    return classes.join(' ');
  });

  // * Enhanced responsive tracking
  protected isMobile = signal(false);
  protected isTablet = signal(false);
  protected isDesktop = signal(false);
  protected viewportWidth = signal(0);

  // * Dropdown state management
  private dropdownTimeout: any = null;
  private isClickingDropdown = signal(false);

  // * LIFECYCLE HOOKS
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // * Initialize responsive tracking
      this.onWindowResize();

      this.initializeParticleSystem();
      this.initializeAnimations();
      this.startAIAssistantPulse();
      this.initializeMagneticEffect();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');

      // * Clear any pending dropdown timeouts
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
      }

      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
    }
  }

  // * ENHANCED SCROLL LISTENER WITH PARALLAX
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // * Update scroll state with smooth transition
      this.isScrolled.set(scrollTop > 50);

      // * Calculate scroll progress
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      this.scrollProgress.set(progress);

      // * Trigger glitch effect at certain scroll points
      if (scrollTop % 500 < 10) {
        this.triggerGlitchEffect();
      }
    }
  }

  // * MAGNETIC CURSOR EFFECT
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cursorPosition.set({ x: event.clientX, y: event.clientY });

    // * Update magnetic cursor position
    if (this.magneticCursorRef) {
      const cursor = this.magneticCursorRef.nativeElement;
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    }

    // * Add particles on movement
    if (Math.random() > 0.95) {
      this.addParticle(event.clientX, event.clientY);
    }
  }

  // * Enhanced responsive tracking
  @HostListener('window:resize')
  onWindowResize(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth;
      this.viewportWidth.set(width);

      // * Update device type signals
      this.isMobile.set(width < 768);
      this.isTablet.set(width >= 768 && width < 1024);
      this.isDesktop.set(width >= 1024);

      // * Close dropdowns on screen size change
      if (this.isMobile()) {
        this.closeDropdown();
      }

      this.resizeCanvas();
    }
  }

  // * ENHANCED CLICK OUTSIDE LISTENER WITH BETTER DETECTION
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as Element;
    const navbar = this.navbarRef?.nativeElement;

    // * Don't close if we're actively clicking on dropdown elements
    if (this.isClickingDropdown()) {
      return;
    }

    // * Check if click is truly outside the navbar area
    if (navbar && !navbar.contains(target)) {
      // * Clear any pending timeout
      if (this.dropdownTimeout) {
        clearTimeout(this.dropdownTimeout);
      }

      // * Immediate close for clicks outside
      this.activeDropdown.set(null);
      this.isHoveringDropdown.set(null);
      this.closeMobileDropdown();
    }
  }

  // * ENHANCED DROPDOWN INTERACTION HANDLERS WITH BETTER STATE MANAGEMENT
  protected onDropdownTriggerClick(route: string, event: Event): void {
    // * Prevent event bubbling
    event.stopPropagation();
    event.preventDefault();

    // * Mark that we're interacting with dropdown
    this.isClickingDropdown.set(true);

    // * Clear any existing timeout
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }

    const isCurrentlyOpen = this.activeDropdown() === route;

    if (isCurrentlyOpen) {
      // * Close the dropdown
      this.activeDropdown.set(null);
      this.isHoveringDropdown.set(null);
    } else {
      // * Open the dropdown
      this.activeDropdown.set(route);
      this.isHoveringDropdown.set(route);

      // * Animate dropdown opening
      setTimeout(() => {
        const dropdownElement = document.querySelector('.dropdown-menu');
        if (dropdownElement && isPlatformBrowser(this.platformId)) {
          gsap.fromTo(
            dropdownElement,
            {
              opacity: 0,
              y: -20,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'back.out(1.7)',
            }
          );
        }
      }, 10);
    }

    // * Reset clicking state after a short delay
    setTimeout(() => {
      this.isClickingDropdown.set(false);
    }, 100);
  }

  protected onDropdownContainerEnter(route: string): void {
    // * Clear any pending timeout
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    this.isHoveringDropdown.set(route);
  }

  protected onDropdownContainerLeave(route: string): void {
    this.isHoveringDropdown.set(null);

    // * Set timeout for closing dropdown
    this.dropdownTimeout = setTimeout(() => {
      if (this.activeDropdown() === route && !this.isHoveringDropdown()) {
        this.activeDropdown.set(null);
      }
    }, 500); // * Increased delay for better UX
  }

  // * PREVENT DROPDOWN CLOSE ON CONTENT INTERACTION
  protected onDropdownContentClick(event: Event): void {
    // * Stop all event propagation
    event.stopPropagation();
    event.stopImmediatePropagation();

    // * Mark as actively clicking
    this.isClickingDropdown.set(true);

    // * Reset after delay
    setTimeout(() => {
      this.isClickingDropdown.set(false);
    }, 200);
  }

  protected onDropdownContentMouseEnter(route: string): void {
    // * Clear any timeout
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    this.isHoveringDropdown.set(route);
  }

  protected onDropdownContentMouseLeave(route: string): void {
    // * Don't immediately clear hover state, use timeout
    this.dropdownTimeout = setTimeout(() => {
      this.isHoveringDropdown.set(null);

      // * Check if we should close dropdown
      if (this.activeDropdown() === route && !this.isHoveringDropdown()) {
        this.activeDropdown.set(null);
      }
    }, 300);
  }

  // * DROPDOWN LINK CLICK HANDLER
  protected onDropdownLinkClick(): void {
    // * Close dropdown when navigating
    this.activeDropdown.set(null);
    this.isHoveringDropdown.set(null);
    this.closeMobileMenu();
  }

  // * PARTICLE SYSTEM INITIALIZATION
  private initializeParticleSystem(): void {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    this.canvasContext = canvas.getContext('2d')!;
    this.resizeCanvas();

    window.addEventListener('resize', () => this.resizeCanvas());
    this.animateParticles();
  }

  private resizeCanvas(): void {
    if (!this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = this.navbarRef.nativeElement.offsetHeight;
  }

  private addParticle(x: number, y: number): void {
    const colors = ['#10b981', '#34d399', '#6ee7b7', '#ff5722', '#ffb74d'];

    this.particles.push({
      x,
      y: y - this.navbarRef.nativeElement.offsetTop,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      life: 0,
      maxLife: 60 + Math.random() * 60,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    // * Limit particles for performance
    if (this.particles.length > 100) {
      this.particles.shift();
    }
  }

  private animateParticles(): void {
    if (!this.canvasContext) return;

    this.canvasContext.clearRect(
      0,
      0,
      this.canvasRef.nativeElement.width,
      this.canvasRef.nativeElement.height
    );

    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life++;

      const lifeRatio = particle.life / particle.maxLife;
      const alpha = 1 - lifeRatio;

      this.canvasContext.globalAlpha = alpha * 0.6;
      this.canvasContext.fillStyle = particle.color;
      this.canvasContext.beginPath();
      this.canvasContext.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );
      this.canvasContext.fill();

      return particle.life < particle.maxLife;
    });

    this.animationFrame = requestAnimationFrame(() => this.animateParticles());
  }

  // * FUTURISTIC ANIMATIONS
  private initializeAnimations(): void {
    // * Holographic shimmer effect
    gsap.to('.holographic-layer', {
      backgroundPosition: '200% 0%',
      duration: 3,
      repeat: -1,
      ease: 'none',
    });

    // * Floating elements animation
    gsap.to('.floating-element', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2,
    });

    // * Neural network animation
    gsap.to('.neural-path', {
      strokeDashoffset: 0,
      duration: 2,
      repeat: -1,
      ease: 'linear',
    });
  }

  // * AI ASSISTANT PULSE
  private startAIAssistantPulse(): void {
    setInterval(() => {
      this.aiAssistantActive.set(!this.aiAssistantActive());
    }, 3000);
  }

  // * MAGNETIC EFFECT FOR BUTTONS
  private initializeMagneticEffect(): void {
    const magneticElements = document.querySelectorAll('.magnetic-element');

    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', e =>
        this.magneticAttract(e as MouseEvent)
      );
      element.addEventListener('mouseleave', e =>
        this.magneticRelease(e as MouseEvent)
      );
      element.addEventListener('mousemove', e =>
        this.magneticMove(e as MouseEvent)
      );
    });
  }

  private magneticAttract(event: MouseEvent): void {
    this.magneticActive.set(true);
    const element = event.currentTarget as HTMLElement;
    gsap.to(element, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  private magneticRelease(event: MouseEvent): void {
    this.magneticActive.set(false);
    const element = event.currentTarget as HTMLElement;
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.3)',
    });
  }

  private magneticMove(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    gsap.to(element, {
      x: deltaX * 0.3,
      y: deltaY * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  }

  // * GLITCH EFFECT
  protected triggerGlitchEffect(): void {
    this.glitchActive.set(true);
    setTimeout(() => {
      this.glitchActive.set(false);
    }, 200);
  }

  // * HOLOGRAPHIC MODE TOGGLE
  protected toggleHolographicMode(): void {
    this.holographicMode.set(!this.holographicMode());
  }

  // * LEGACY SUPPORT - REDIRECT TO NEW METHOD
  protected toggleDropdown(route: string, event?: Event): void {
    if (event) {
      this.onDropdownTriggerClick(route, event);
    }
  }

  protected getDropdownButtonClasses(route: string): string {
    const isActive = this.activeDropdown() === route;
    return `nav-link dropdown-trigger magnetic-element ${
      isActive ? 'active' : ''
    }`;
  }

  protected closeDropdown(): void {
    this.activeDropdown.set(null);
  }

  protected toggleMobileDropdown(route: string): void {
    this.activeMobileDropdown.set(
      this.activeMobileDropdown() === route ? null : route
    );
  }

  protected getMobileDropdownButtonClasses(route: string): string {
    const isActive = this.activeMobileDropdown() === route;
    return `mobile-nav-link mobile-dropdown-trigger ${
      isActive ? 'active' : ''
    }`;
  }

  protected closeMobileDropdown(): void {
    this.activeMobileDropdown.set(null);
  }

  // * ENHANCED MOBILE MENU WITH FUTURISTIC ANIMATIONS
  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());

    if (isPlatformBrowser(this.platformId)) {
      if (this.mobileMenuOpen()) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('mobile-menu-open');

        // * Animate mobile menu items
        setTimeout(() => {
          gsap.from('.mobile-nav-item', {
            x: -50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
          });
        }, 100);
      } else {
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
        this.closeMobileDropdown();
      }
    }
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.closeMobileDropdown();

    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }
  }

  // * ACCESSIBILITY: ESC KEY TO CLOSE MENUS
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
    this.closeMobileMenu();
  }

  // * AI ASSISTANT INTERACTION
  protected openAIAssistant(): void {
    console.log('Opening AI Assistant...');
    // Implement AI assistant modal/chat interface
  }

  // * ELEMENT HOVER TRACKING
  protected onElementHover(elementId: string): void {
    this.hoverElement.set(elementId);
  }

  protected onElementLeave(): void {
    this.hoverElement.set(null);
  }
}
