# Netflix Clone with Vue.js

## 📌 Overview

This project is a clone of the **Netflix login experience**, built using **Vue 3 and Vue CLI**. It replicates the **login page**, includes a custom **two-factor authentication (2FA)** flow, and features a **sign-in code page**. The goal was to match Netflix’s frontend design and user flow as closely as possible for an interview challenge.

> ⚠️ **Note on Deployment:**  
> Due to the project’s visual and functional similarity to Netflix, public hosting platforms like **Vercel flagged the deployment** as suspicious (possibly phishing-related).  
> This reflects how **closely the clone resembles the real platform** — a challenge outcome that demonstrates strong frontend skills but also raises awareness about brand compliance when deploying replicas of copyrighted products.

## ✨ Features

- **Login Page**: Responsive layout for email/phone and password input, Netflix-style error messages, and password visibility toggle.
- **2FA Page**: Custom 6-digit input field styled to look like a native Netflix feature (even though Netflix doesn’t currently use this flow).
- **Sign-In Code Page**: Mimics Netflix’s “Use a sign-in code” feature with a dedicated screen.
- **Vue Router**: Seamless page navigation between views.
- **Pinia State Management**: Handles authentication state reactively.
- **Animations**: Loading spinners, button hovers, and form transition effects.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Mock Authentication**: Uses static credentials and codes for simulating login without a backend.

## 🧱 Tech Stack

- **Vue 3**
- **Vue CLI**
- **Vue Router**
- **Pinia**
- **CSS (Custom Netflix-styled theme)**
- **Vercel (for deployment testing)**

## 🗂 Project Structure

src/ ├── assets/                # Static assets │   ├── background.webp    # Login page background │   └── logo.png           # Netflix logo ├── components/            # Reusable components │   ├── AuthFooter.vue │   ├── LoginForm.vue │   └── LogoHeader.vue ├── router/                # Vue Router setup │   └── index.js ├── stores/                # Pinia store │   └── auth.js ├── views/                 # Page-level components │   ├── Login.vue │   ├── LoginWithCode.vue │   └── TwoFactor.vue ├── App.vue                # Root component └── main.js                # App entry point

## 🚀 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone

2. Install Dependencies

npm install


3. Run the Development Server

npm run serve

> App will run at http://localhost:8080




4. Build for Production

npm run build


5. Deployment Due to Netflix trademark resemblance, some platforms may flag the project. To deploy:

Rename or remove the Netflix logo.

Add a disclaimer in the UI or README.

Consider platforms like Netlify, Surge.sh, or private links if flagged.


> Live demo: [Insert your private/demo link or deployment video]






---

🧠 Key Design & Technical Decisions

Component-Based Architecture

Modular and reusable components (LogoHeader, LoginForm, AuthFooter).

Pages like Login, TwoFactor, and LoginWithCode routed via Vue Router.


Netflix-Inspired Design

Color palette extracted from Netflix using browser dev tools.

Official logo and UI style applied with responsive, mobile-first design.


Mock Authentication

Static login credentials and 2FA codes simulate user flows without a backend.

Navigation is managed based on form validation and mock state.


UX Enhancements

Subtle animations (loading, button hover).

Error message feedback replicating Netflix’s look and feel.



---

🔧 Challenges Faced

Challenge	Resolution

⚠️ Flagged Deployment	Replicated Netflix so closely that Vercel flagged the clone. Treated as a success from a UI replication standpoint and used it to demonstrate real-world brand deployment challenges.
🎨 Replicating UI	Used dev tools to copy fonts, spacing, shadows, and red/dark color tones from Netflix’s live site.
🔐 No real backend	Simulated login and code validation using hardcoded data and navigation guards.
📱 Responsive layout	Applied mobile-first design with media queries and tested responsiveness across breakpoints.
🔢 No real 2FA flow in Netflix	Created a custom TwoFactor.vue page that blends with Netflix’s design language to fulfill task requirements.



---

📁 Mock Credentials

Use the following for testing:

{
  "email": "samsoncoded@gmail.com",
  "password": "password123",
  "2fa_code": "123456"
}


---

🧾 Disclaimer

> This project is intended solely for educational purposes.
It is not affiliated with, endorsed by, or connected to Netflix, Inc.
All branding, trademarks, and styles belong to their respective owners.


