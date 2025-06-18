import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface StatData {
  value: number;
  animated: number;
  suffix: string;
  label: string;
  icon: string;
  color: string;
}

interface PartnerLogo {
  name: string;
  description: string;
  industry: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('canvas3d', { static: true }) canvas3d!: ElementRef;
  @ViewChild('particleCanvas', { static: true }) particleCanvas!: ElementRef;

  // * THREE.js Scene
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animationFrameId: any;

  // * Reactive State
  protected mouseX = signal(0);
  protected mouseY = signal(0);
  protected scrollY = signal(0);
  protected isLoaded = signal(false);
  protected currentTextIndex = signal(0);
  protected glitchActive = signal(false);
  protected matrixRainActive = signal(true);
  protected hologramActive = signal(false);
  protected aiTyping = signal(false);
  protected typedText = signal('');

  // * Dynamic Text Rotation
  protected dynamicTexts = [
    'Agricultural Future',
    'Smart Farming Era',
    'Digital Revolution',
    'Sustainable Growth',
    'AI-Powered Success',
  ];

  // * Particle System
  protected particles: Particle[] = [];
  private particleContext!: CanvasRenderingContext2D;

  // * Enhanced Statistics
  protected stats: StatData[] = [
    {
      value: 250,
      animated: 0,
      suffix: 'K+',
      label: 'Active Farmers',
      icon: '👨‍🌾',
      color: '#00ff88',
    },
    {
      value: 50,
      animated: 0,
      suffix: 'M+',
      label: 'Crops Traded',
      icon: '🌾',
      color: '#00d4ff',
    },
    {
      value: 98,
      animated: 0,
      suffix: '%',
      label: 'AI Accuracy',
      icon: '🤖',
      color: '#ff00ff',
    },
    {
      value: 500,
      animated: 0,
      suffix: '+',
      label: 'Smart Farms',
      icon: '🏭',
      color: '#ffaa00',
    },
  ];

  // * Partner Ecosystem
  protected partnerLogos: PartnerLogo[] = [
    {
      name: 'AgriTech AI',
      description: 'Leading AI Solutions',
      industry: 'Technology',
    },
    {
      name: 'FarmConnect Pro',
      description: 'IoT Infrastructure',
      industry: 'Hardware',
    },
    {
      name: 'GreenField Labs',
      description: 'Research Partner',
      industry: 'Research',
    },
    {
      name: 'CropWise Analytics',
      description: 'Data Intelligence',
      industry: 'Analytics',
    },
    {
      name: 'Blockchain Farms',
      description: 'Supply Chain',
      industry: 'Blockchain',
    },
    {
      name: 'Quantum Harvest',
      description: 'Quantum Computing',
      industry: 'Quantum',
    },
  ];

  // * Feature Cards
  protected features = [
    {
      icon: '🛸',
      title: 'Drone Monitoring',
      description: 'Autonomous field surveillance 24/7',
    },
    {
      icon: '🧬',
      title: 'Crop DNA Analysis',
      description: 'Genetic optimization for yield',
    },
    {
      icon: '⚡',
      title: 'Real-time Analytics',
      description: 'Instant insights & predictions',
    },
  ];

  private platformId = inject(PLATFORM_ID);

  // * Computed Properties
  protected currentDynamicText = computed(() => {
    return this.dynamicTexts[this.currentTextIndex()];
  });

  protected heroClasses = computed(() => {
    const classes = ['hero-section'];

    if (this.hologramActive()) {
      classes.push('hologram-mode');
    }

    if (this.glitchActive()) {
      classes.push('glitch-active');
    }

    return classes.join(' ');
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize all futuristic elements
      this.initializeThreeJS();
      this.initializeParticleSystem();
      this.startTextRotation();
      this.initializeAnimations();
      this.startAITypingEffect();

      // Trigger loaded state after a delay
      setTimeout(() => {
        this.isLoaded.set(true);
        this.animateStats();
      }, 500);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Clean up THREE.js
      if (this.renderer) {
        this.renderer.dispose();
      }

      // Cancel animation frames
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      // Clean up GSAP
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }

  // * MOUSE TRACKING WITH PARALLAX
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId)) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    this.mouseX.set(((event.clientX - centerX) / centerX) * 100);
    this.mouseY.set(((event.clientY - centerY) / centerY) * 100);

    // Add floating particles on movement
    if (Math.random() > 0.98) {
      this.addFloatingParticle(event.clientX, event.clientY);
    }
  }

  // * SCROLL TRACKING
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.scrollY.set(window.pageYOffset);

    // Parallax effect for 3D scene
    if (this.camera) {
      this.camera.position.y = -window.pageYOffset * 0.002;
    }
  }

  // * THREE.JS 3D SCENE INITIALIZATION
  private initializeThreeJS(): void {
    if (!this.canvas3d) return;

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 1, 1000);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas3d.nativeElement,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add futuristic elements
    this.createFuturisticGrid();
    this.createFloatingCubes();
    this.createParticleField();
    this.addLighting();

    // Start animation
    this.animate3D();

    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  // * CREATE FUTURISTIC GRID
  private createFuturisticGrid(): void {
    const geometry = new THREE.PlaneGeometry(50, 50, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });

    const grid = new THREE.Mesh(geometry, material);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2;
    this.scene.add(grid);

    // Animate grid
    gsap.to(grid.rotation, {
      z: Math.PI * 2,
      duration: 60,
      repeat: -1,
      ease: 'none',
    });
  }

  // * CREATE FLOATING CUBES
  private createFloatingCubes(): void {
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    for (let i = 0; i < 20; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        emissive: new THREE.Color().setHSL(Math.random(), 1, 0.5),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8,
      });

      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );

      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      this.scene.add(cube);

      // Animate cubes
      gsap.to(cube.rotation, {
        x: cube.rotation.x + Math.PI * 2,
        y: cube.rotation.y + Math.PI * 2,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(cube.position, {
        y: cube.position.y + (Math.random() - 0.5) * 2,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }

  // * CREATE PARTICLE FIELD
  private createParticleField(): void {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color().setHSL(Math.random(), 1, 0.5);
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    // Animate particles
    gsap.to(particles.rotation, {
      y: Math.PI * 2,
      duration: 100,
      repeat: -1,
      ease: 'none',
    });
  }

  // * ADD LIGHTING
  private addLighting(): void {
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 1, 100);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    this.scene.add(pointLight2);

    // Animate lights
    gsap.to(pointLight1.position, {
      x: -5,
      y: -5,
      z: -5,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    gsap.to(pointLight2.position, {
      x: 5,
      y: 5,
      z: 5,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }

  // * 3D ANIMATION LOOP
  private animate3D = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate3D);

    // Rotate camera based on mouse position
    if (this.camera) {
      this.camera.position.x = this.mouseX() * 0.01;
      this.camera.position.y = -this.mouseY() * 0.01;
      this.camera.lookAt(0, 0, 0);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  // * WINDOW RESIZE HANDLER
  private onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  // * PARTICLE SYSTEM INITIALIZATION
  private initializeParticleSystem(): void {
    if (!this.particleCanvas) return;

    const canvas = this.particleCanvas.nativeElement;
    this.particleContext = canvas.getContext('2d')!;
    this.resizeParticleCanvas();

    window.addEventListener('resize', () => this.resizeParticleCanvas());
    this.animateParticles();
  }

  private resizeParticleCanvas(): void {
    if (!this.particleCanvas) return;
    const canvas = this.particleCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private addFloatingParticle(x: number, y: number): void {
    const colors = ['#00ff88', '#00d4ff', '#ff00ff', '#ffaa00'];

    this.particles.push({
      x,
      y,
      z: Math.random() * 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 1,
      vz: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 100 + Math.random() * 100,
    });

    // Limit particles
    if (this.particles.length > 200) {
      this.particles.shift();
    }
  }

  private animateParticles = (): void => {
    if (!this.particleContext || !this.particleCanvas) return;

    const canvas = this.particleCanvas.nativeElement;
    this.particleContext.clearRect(0, 0, canvas.width, canvas.height);

    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.z += particle.vz;
      particle.life++;

      const lifeRatio = particle.life / particle.maxLife;
      const alpha = 1 - lifeRatio;
      const scale = 1 + particle.z / 100;

      this.particleContext.globalAlpha = alpha * 0.8;
      this.particleContext.fillStyle = particle.color;
      this.particleContext.shadowBlur = 10;
      this.particleContext.shadowColor = particle.color;

      this.particleContext.beginPath();
      this.particleContext.arc(
        particle.x,
        particle.y,
        particle.size * scale,
        0,
        Math.PI * 2
      );
      this.particleContext.fill();

      return particle.life < particle.maxLife;
    });

    requestAnimationFrame(this.animateParticles);
  };

  // * TEXT ROTATION EFFECT
  private startTextRotation(): void {
    setInterval(() => {
      this.currentTextIndex.update(
        index => (index + 1) % this.dynamicTexts.length
      );
      this.triggerGlitchEffect();
    }, 3000);
  }

  // * AI TYPING EFFECT
  private startAITypingEffect(): void {
    const text = 'Empowering farmers with cutting-edge AI technology';
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index <= text.length) {
        this.typedText.set(text.substring(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          this.typedText.set('');
          this.startAITypingEffect();
        }, 3000);
      }
    }, 50);
  }

  // * GLITCH EFFECT
  protected triggerGlitchEffect(): void {
    this.glitchActive.set(true);
    setTimeout(() => {
      this.glitchActive.set(false);
    }, 300);
  }

  // * INITIALIZE GSAP ANIMATIONS
  private initializeAnimations(): void {
    // Hero content animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.7,
      ease: 'power3.out',
    });

    gsap.from('.cta-button', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: '.stats-section',
      start: 'top 80%',
      onEnter: () => this.animateStats(),
    });

    ScrollTrigger.create({
      trigger: '.features-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.feature-card', {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        });
      },
    });
  }

  // * ANIMATE STATISTICS
  protected animateStats(): void {
    this.stats.forEach((stat, index) => {
      const duration = 2500;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuart(frame / totalFrames);
        stat.animated = Math.round(stat.value * progress);

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  }

  // * TOGGLE FEATURES
  protected toggleMatrixRain(): void {
    this.matrixRainActive.set(!this.matrixRainActive());
  }

  protected toggleHologram(): void {
    this.hologramActive.set(!this.hologramActive());
  }

  // * CTA ACTIONS
  protected onGetStarted(): void {
    console.log('Get Started clicked');
    // Add navigation logic
  }

  protected onWatchDemo(): void {
    console.log('Watch Demo clicked');
    // Add demo modal logic
  }

  protected onExploreAI(): void {
    console.log('Explore AI clicked');
    // Add AI exploration logic
  }
}
