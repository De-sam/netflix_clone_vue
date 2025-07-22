Netflix Clone with Vue.js
Overview
This project is a clone of the Netflix login page with a custom two-factor authentication (2FA) page and a sign-in code page, built using Vue 3 and Vue CLI. The objective is to replicate Netflix’s login experience, including a responsive login page for username/password input, a custom 2FA page to meet the task requirements, and an alternative sign-in code page inspired by Netflix’s “Use a sign-in code” feature. The project uses a modular, component-based architecture, Vue Router for navigation, Pinia for state management, and static mock data for form handling.
Features

Login Page: Captures username (email or phone) and password with client-side validation, error handling, and a password toggle feature.
2FA Page: A custom-designed page for entering a 6-digit 2FA code, styled to match Netflix’s aesthetic, with validation and success/error feedback.
Sign-In Code Page: An alternative login method mimicking Netflix’s “Use a sign-in code” option, accepting a 6-digit code.
Responsive Design: Optimized for mobile (360px+) and desktop (1200px+) with CSS media queries, Flexbox, and Netflix’s dark theme.
Vue Router: Manages navigation between Login, LoginWithCode, and TwoFactor views.
Error Handling: Displays Netflix-style error messages for invalid inputs (e.g., incorrect email, password length, or 2FA code).
State Management: Uses Pinia to manage authentication state and form data reactively.
Animations: Includes subtle hover effects on buttons and a loading spinner for form submissions.

Tech Stack

Vue 3: Frontend framework for reactive components.
Vue CLI: Project scaffolding and development environment.
Vue Router: Client-side routing between pages.
Pinia: State management for authentication and form data.
CSS: Custom styles to replicate Netflix’s dark theme, red buttons, and responsive layout.
Vercel/Netlify: Deployment platform for the live demo.

Project Structure
src/
├── assets/                # Static assets
│   ├── background.webp    # Background image for login pages
│   └── logo.png           # Netflix logo
├── components/            # Reusable Vue components
│   ├── AuthFooter.vue     # Footer component
│   ├── HelloWorld.vue     # Default Vue CLI component (unused)
│   ├── LoginForm.vue      # Login form component
│   └── LogoHeader.vue     # Header with Netflix logo
├── router/                # Vue Router configuration
│   └── index.js
├── stores/                # Pinia store
│   └── auth.js            # Authentication state management
├── views/                 # Page components
│   ├── AboutView.vue      # Default Vue CLI view (unused)
│   ├── HomeView.vue       # Default Vue CLI view (unused)
│   ├── Login.vue          # Login page
│   ├── LoginWithCode.vue  # Sign-in code page
│   └── TwoFactor.vue      # Custom 2FA page
├── App.vue                # Root Vue component
└── main.js                # Entry point

Setup Instructions

Clone the Repository:
git clone <repository-url>
cd netflix-clone


Install Dependencies:
npm install


Run the Development Server:
npm run serve

The app will be available at http://localhost:8080.

Build for Production:
npm run build


Deploy:

The project is deployed on [Vercel/Netlify/GitHub Pages] at: [Insert Live Demo URL].
Follow the platform’s deployment guide to deploy from the repository.



Key Design/Technical Decisions

Component-Based Architecture:

Created reusable components (LogoHeader, LoginForm, AuthFooter) for modularity and maintainability.
Separated pages into Login.vue, LoginWithCode.vue, and TwoFactor.vue, managed by Vue Router.


Netflix-Inspired Design:

Replicated Netflix’s dark theme, red buttons, and typography using a semi-transparent overlay (background.webp) and custom CSS.
Used the official Netflix logo and a background image to match the authentic look.


Responsive Design:

Adopted a mobile-first approach with CSS Flexbox and media queries, adjusting padding and layouts for mobile (max-width: 600px) and desktop.
Ensured the background image and overlay scale correctly across devices.


State Management:

Used Pinia (stores/auth.js) to manage login state, enabling reactive updates after successful login to trigger navigation to the 2FA page.


Error Handling:

Implemented client-side validation for email/phone, password (4-60 characters), and 6-digit 2FA/sign-in codes.
Displayed Netflix-style error messages with orange accents and icons for invalid inputs.


Custom 2FA and Sign-In Code:

Designed a custom 2FA page styled to blend with Netflix’s UI, as Netflix does not have a standard 2FA flow.
Added a LoginWithCode.vue page to replicate Netflix’s “Use a sign-in code” feature, enhancing authenticity.


Animations:

Added a loading spinner for form submissions using CSS animations.
Implemented hover effects on buttons (e.g., red button scaling) for interactivity.



Challenges and Resolutions

Challenge: Replicating Netflix’s sleek UI and dark theme.

Resolution: Used browser dev tools to extract Netflix’s color palette (e.g., #e50914 for red buttons, rgba(0,0,0,0.75) for cards) and typography, applying them via custom CSS.


Challenge: Netflix does not have a standard 2FA page.

Resolution: Created a custom TwoFactor.vue page styled to match Netflix’s aesthetic, with a 6-digit code input and mock validation against a static code (“123456”). Ensured consistency with Netflix’s design language (e.g., dark card, red button).


Challenge: Simulating authentication without a backend.

Resolution: Used mock data (e.g., { username: "samsoncoded@gmail.com", password: "password123" }) and a mock 2FA code (“123456”) to simulate API responses, with Vue Router handling navigation to TwoFactor.vue after successful login.


Challenge: Ensuring responsiveness across devices.

Resolution: Applied mobile-first CSS with media queries (e.g., @media (max-width: 600px)) to adjust padding, logo positioning, and hide the overlay on mobile for performance.

