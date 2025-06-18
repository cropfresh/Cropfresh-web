import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing/pages/landing-page/landing-page.component';

// * CROPFRESH APPLICATION ROUTES
// * Main routing configuration for the application
export const routes: Routes = [
  // * LANDING PAGE ROUTE
  {
    path: '',
    component: LandingPageComponent,
    title: 'CropFresh - Transform Agriculture with Digital Innovation',
  },

  // ? TODO: Add feature-specific routes
  // NOTE: Routes for farmers, business, partners, and other sections will be added here

  // * WILDCARD ROUTE - MUST BE LAST
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
