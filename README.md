# Apex Auto - Car Customization Platform

A professional, modern web application for car customization services. Built with Next.js 16, React 19, and TypeScript, Apex Auto provides a seamless user experience for browsing automotive customization services and creating custom car builds.

## Overview

Apex Auto is a full-stack automotive customization platform that allows users to:
- Browse and explore professional car customization services
- Register and authenticate with secure JWT-based authentication
- Create and manage custom car builds with selected services and parts
- Customize vehicles with different colors and components
- Track customization history and build configurations
- Access a responsive, modern interface optimized for all devices

## Tech Stack

### Frontend Framework & Libraries
- **Next.js 16.0.1** - React framework with App Router for optimized performance
- **React 19.2.0** - Modern UI library with the latest React features
- **TypeScript 5** - Static typing for improved code quality and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Framer Motion 12.23.24** - Animation library for smooth, delightful interactions

### Form Handling & Validation
- **React Hook Form 7.65.0** - Performant, flexible form management
- **Yup 1.7.1** - Schema validation library for data integrity
- **@hookform/resolvers 5.2.2** - Validation resolver adapter

### State Management & Authentication
- **JWT Decode 4.0.0** - JWT token parsing and validation
- **Context API** - Built-in React state management for authentication

### HTTP Client & API Communication
- **Axios 1.13.1** - Promise-based HTTP client for API requests

### UI Components & Icons
- **Lucide React 0.548.0** - Beautiful, consistent icon set

### Development Tools
- **ESLint 9** - Code quality and style enforcement
- **Node.js 20+** - JavaScript runtime environment

## Project Structure

```
apex-client-side/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page with hero section
│   ├── globals.css              # Global styles
│   ├── customize/               # Car customization page
│   ├── dashboard/               # User dashboard
│   ├── login/                   # Login page
│   └── register/                # Registration page
├── components/                   # Reusable React components
│   ├── BuildCard.tsx            # Car build display card
│   ├── Navbar.tsx               # Navigation bar
│   ├── ProtectedRoute.tsx        # Route protection wrapper
│   ├── ServiceCard.tsx           # Service listing card
│   └── ui/                       # UI component library
├── hooks/                        # Custom React hooks
│   ├── useApi.ts                # API communication hook
│   └── useAuth.tsx              # Authentication context hook
├── lib/                          # Utility functions and services
│   ├── api.ts                   # Axios instance configuration
│   ├── auth.ts                  # Authentication services
│   └── utils.ts                 # Helper utilities
├── types/                        # TypeScript type definitions
│   └── index.ts                 # Centralized type exports
├── public/                       # Static assets
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # Project documentation
```

## Features

### User Authentication
- Secure user registration with email and password
- JWT-based login system with token persistence
- Automatic token validation on app initialization
- Protected routes for authenticated users only
- Seamless logout functionality with local storage cleanup

### Service Management
- Browse comprehensive list of car customization services
- View service details including name, description, price, and category
- Dynamic service icons for visual distinction
- Category-based service organization

### Build Customization
- Create custom car builds with selected services
- Choose vehicle models and colors
- Add and remove services/parts from builds
- Real-time price calculation
- Save build configurations to database
- Update and delete existing builds

### User Interface
- Responsive design optimized for mobile, tablet, and desktop
- Modern glassmorphism design patterns
- Smooth animations using Framer Motion
- Professional color scheme with orange accent colors
- Intuitive navigation and user flows
- High-quality imagery and visual hierarchy

### Form Handling
- Comprehensive form validation for registration and login
- Real-time validation feedback
- User-friendly error messages
- Secure password handling

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager
- Modern web browser
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone https://github.com/adeeshperera/apex-client-side.git
cd apex-client-side
```

2. Install project dependencies:
```bash
npm install
```

3. Create environment configuration file (`.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

The application will automatically reload when you make changes to the code.

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement.

### Production Build
```bash
npm run build
npm start
```
Builds the application for production and starts the production server.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style compliance.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note:** Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser. Server-side environment variables should not have this prefix.

## API Integration

The application integrates with a backend API for:
- User authentication (registration, login, profile retrieval)
- Service catalog management
- Car build persistence and retrieval

### Authentication Flow
1. User registers or logs in
2. Backend returns JWT token and user data
3. Token is stored in localStorage
4. Token is included in Authorization header for subsequent requests
5. Token validity is checked on app initialization

### API Endpoints

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Retrieve current user profile
- `GET /services` - List all services
- `GET /services/:id` - Get specific service
- `GET /builds/user/:userId` - Get user's builds
- `POST /builds` - Create new build
- `PUT /builds/:id` - Update existing build
- `DELETE /builds/:id` - Delete build
- `GET /builds/:id` - Get specific build

## Key Components

### Navbar
Navigation component featuring authentication state indicators, site branding, and navigation links.

### ServiceCard
Displays individual service information with icon, name, description, price, and category badge.

### BuildCard
Shows car build details including model, color, selected parts, and total price.

### ProtectedRoute
Higher-order component ensuring only authenticated users can access specific routes.

## Authentication System

The application uses a context-based authentication system (`AuthContext`) that provides:
- User state management
- Login and registration functions
- Logout functionality
- Loading state for async operations
- Token validation and persistence

Access authentication through the `useAuth()` hook in any component.

## Styling

The project uses Tailwind CSS v4 for styling with the following conventions:
- Responsive design utilities for mobile-first approach
- Custom color palette with orange accent colors
- Glassmorphism effects for modern aesthetic
- Custom CSS for animations and advanced effects
- PostCSS for CSS processing and optimization

## Type Safety

All TypeScript types are centralized in `types/index.ts`:
- `User` - Basic user information
- `AuthUser` - User with authentication token
- `Service` - Car customization service
- `Build` - Custom car build configuration
- `Part` - Component part for customization
- `AuthContextType` - Authentication context type definition
- `CustomizerContextType` - Customizer context type definition

## Performance Optimization

- Image optimization through Next.js Image component
- Lazy loading for images and components
- Optimized CSS delivery with Tailwind CSS
- Code splitting through Next.js dynamic imports
- Efficient state management to prevent unnecessary re-renders

## Security Considerations

- JWT tokens for secure API authentication
- HttpOnly localStorage for token storage (where applicable)
- CORS configuration on backend API
- Input validation on forms
- Secure password handling practices

## Browser Support

Supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

