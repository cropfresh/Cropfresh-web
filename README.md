# CropFresh Web Application

A modern Angular-based web platform for digital agriculture, connecting farmers, businesses, and partners in a comprehensive ecosystem.

## 🚀 Features

### ✨ Current Implementation

- **Glassmorphism Navigation Bar**
  - Responsive design with mobile hamburger menu
  - Dynamic glassmorphism effects on scroll
  - Dropdown menus for complex navigation
  - Dark mode support

- **Dynamic Hero Section**
  - Rotating banners for different user types (Farmers, Business, Partners)
  - Animated statistics counters
  - Gradient backgrounds with particle effects
  - Call-to-action buttons for user registration

- **Features Overview**
  - Tabbed interface showcasing platform capabilities
  - User-type specific feature cards
  - Interactive hover effects
  - Responsive grid layout

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20 (Latest)
- **Styling**: Tailwind CSS 4 (Latest)
- **Architecture**: Standalone Components
- **State Management**: Angular Signals
- **Routing**: Angular Router
- **Build Tool**: Angular CLI
- **TypeScript**: Latest version with strict typing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (v20 or higher)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Open in browser**
   ```
   http://localhost:4200
   ```

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests

## 🏗️ Architecture

### Standalone Components
- All components use Angular's modern standalone architecture
- No NgModules for better tree-shaking and performance
- Direct imports for dependencies

### Signal-based State Management
- Reactive state management using Angular Signals
- Improved performance with fine-grained reactivity
- Better development experience with type safety

## 🎯 User Types & Features

### 👨‍🌾 For Farmers
- **Direct Marketplace**: Sell produce without intermediaries
- **Smart Logistics**: Efficient transportation solutions
- **Input Procurement**: Access to quality farming inputs
- **Advisory Services**: Expert agricultural guidance

### 🏢 For Business
- **Supplier Network**: Connect with verified suppliers
- **Quality Assurance**: Comprehensive testing and certification
- **Business Analytics**: Data-driven decision making
- **Supply Chain**: End-to-end supply chain optimization

### 🤝 For Partners
- **Service Opportunities**: Provide specialized services
- **Technology Tools**: Access cutting-edge agtech
- **Growth Potential**: Scale with comprehensive support
- **Network Access**: Connect with agricultural stakeholders

## 🌟 Features Roadmap

### ✅ Completed
- [x] Glassmorphism navbar with responsive design
- [x] Dynamic hero section with rotating banners
- [x] Features overview with tabbed interface
- [x] Basic routing configuration
- [x] Responsive design implementation

### 📋 Planned
- [ ] Success stories section
- [ ] How it works section
- [ ] Trust & credibility section
- [ ] User registration/authentication
- [ ] Dashboard functionality

## 📁 Project Structure

```
cropfresh_web/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   └── landing/
│   │   │       ├── components/
│   │   │       │   ├── hero-section/
│   │   │       │   └── features-overview/
│   │   │       └── pages/
│   │   │           └── landing-page/
│   │   ├── shared/
│   │   │   └── components/
│   │   │       └── navigation/
│   │   │           └── navbar/
│   │   ├── app.routes.ts
│   │   └── app.component.ts
│   └── styles.css
└── public/assets/
```

## 🎨 Design System

### Color Palette
- **Primary**: Green gradient (#22c55e to #16a34a)
- **Secondary**: Blue gradient (#3b82f6 to #2563eb)
- **Accent**: Purple gradient (#8b5cf6 to #7c3aed)

### Components
- **Glassmorphism Effects**: Backdrop blur with transparency
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliance

---

**Built with ❤️ using Angular 20 and Tailwind CSS 4**
