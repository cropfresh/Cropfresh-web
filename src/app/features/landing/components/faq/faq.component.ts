import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

// * FAQ COMPONENT
// * Purpose: Display frequently asked questions with expandable answers
// * Features: Futuristic design, holographic effects, AI-powered animations
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  faqs: FaqItem[] = [
    {
      question: 'What is CropFresh and how does it work?',
      answer:
        'CropFresh is an AI-powered agricultural platform that helps farmers optimize their crop production, connect with buyers, and manage their operations more efficiently. Our platform uses advanced analytics, weather data, and market insights to provide actionable recommendations.',
      isOpen: false,
    },
    {
      question: 'How much does CropFresh cost?',
      answer:
        'We offer flexible pricing plans starting from $29/month for small farms. Our Professional plan at $79/month includes advanced AI features and marketplace access. Enterprise plans are available for large operations. All plans include a 14-day free trial.',
      isOpen: false,
    },
    {
      question: 'What crops and regions do you support?',
      answer:
        'CropFresh supports over 50 different crop types including grains, vegetables, fruits, and cash crops. We currently operate in North America, parts of Europe, and expanding to Asia and Africa. Our AI models are trained on diverse agricultural data from various climate zones.',
      isOpen: false,
    },
    {
      question: 'Is my data secure and private?',
      answer:
        'Absolutely. We use enterprise-grade security measures including SSL encryption, secure data centers, and comply with international data protection regulations. Your farm data remains private and is never shared with competitors or third parties without your explicit consent.',
      isOpen: false,
    },
    {
      question:
        'Can I integrate CropFresh with my existing farm management software?',
      answer:
        'Yes! CropFresh offers APIs and integrations with popular farm management systems, IoT devices, and agricultural equipment. Our team can help you set up custom integrations to ensure seamless data flow between systems.',
      isOpen: false,
    },
    {
      question: 'What kind of support do you provide?',
      answer:
        'We provide comprehensive support including email support for all plans, priority support for Professional users, and dedicated account managers for Enterprise customers. We also offer training resources, webinars, and a knowledge base.',
      isOpen: false,
    },
    {
      question: 'How accurate are your AI predictions and recommendations?',
      answer:
        'Our AI models achieve 85-95% accuracy in crop yield predictions and weather forecasting. Pest and disease detection accuracy exceeds 90%. Our recommendations are continuously improved based on real-world outcomes and feedback from thousands of farmers.',
      isOpen: false,
    },
    {
      question: 'Do you offer mobile apps?',
      answer:
        'Yes! CropFresh is available on iOS and Android devices. Our mobile apps provide full access to monitoring, alerts, marketplace features, and reporting. You can manage your farm operations from anywhere with an internet connection.',
      isOpen: false,
    },
  ];

  // * Toggle FAQ item open/closed state
  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;

    // * Optional: Close other FAQs when opening one (accordion behavior)
    // this.faqs.forEach((faq, i) => {
    //   if (i !== index) {
    //     faq.isOpen = false;
    //   }
    // });
  }

  // * Support action handlers
  protected onContactSupport(): void {
    // * TODO: Implement support contact logic
    console.log('Opening support contact...');
  }

  protected onWatchTutorial(): void {
    // * TODO: Implement tutorial video logic
    console.log('Opening tutorial video...');
  }
}
