# CheapDeals Mobile App

A modern React mobile application for finding the best deals, built with clean architecture and responsive design.

## 🚀 Features

- **Clean Architecture**: Organized with pages and shared components
- **Responsive Design**: Works perfectly on all mobile screen sizes
- **Modern UI**: Based on Figma designs with glassmorphism effects
- **React Router**: Smooth navigation between pages
- **Reusable Components**: Modular and maintainable code structure

## 📁 Project Structure

```
src/
├── components/
│   └── shared/
│       ├── MobileFrame.jsx      # Mobile device frame wrapper
│       ├── Logo.jsx             # App logo component
│       ├── FormInput.jsx        # Reusable form input
│       ├── Button.jsx           # Reusable button component
│       └── *.css               # Component styles
├── pages/
│   ├── GetStarted/
│   │   ├── GetStarted.jsx      # Welcome/landing page
│   │   └── GetStarted.css
│   ├── SignIn/
│   │   ├── SignInForm.jsx      # Sign in page
│   │   └── SignInForm.css
│   └── SignUp/
│       ├── SignUpForm.jsx      # Sign up page
│       └── SignUpForm.css
├── App.jsx                     # Main app with routing
├── App.css                     # Global app styles
└── main.jsx                    # App entry point
```

## 🎨 Design System

### Colors
- Primary: `rgba(21, 21, 21, 0.65)` - Dark glassmorphism
- Secondary: `rgba(255, 255, 255, 0.65)` - Light glassmorphism
- Text: `#000000`
- Background: Mobile background image with gradient overlay

### Typography
- **Primary Font**: Poppins
- **Secondary Font**: Padyakke Expanded One (for specific elements)
- **Sizes**: 48px (titles), 18px (taglines), 13px (body text)

### Components
- **Glassmorphism Effects**: `backdrop-filter: blur(8px)`
- **Border Radius**: 6px for inputs/buttons, 16-20px for containers
- **Shadows**: Subtle shadows for depth

## 🛠️ Technologies

- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern CSS with flexbox and grid
- **Responsive Design** - Mobile-first approach

## 📱 Pages

### 1. Get Started (`/get-started`)
- Welcome screen with app logo
- Call-to-action button
- Tagline: "Your Deal - Your Way - Just One Click"

### 2. Sign In (`/signin`)
- Email and password fields
- Remember me checkbox
- Terms of service links
- Navigation to sign up

### 3. Sign Up (`/signup`)
- Full name, email, password, confirm password fields
- Password visibility toggles
- Form validation
- Navigation to sign in

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📱 Responsive Breakpoints

- **Desktop**: > 480px (centered mobile frame)
- **Mobile Large**: ≤ 480px (full screen)
- **Mobile Small**: ≤ 375px (optimized spacing)

## 🎯 Key Features

### Reusable Components
- **MobileFrame**: Provides mobile device UI with status bar and navigation
- **Logo**: Scalable logo component with different sizes
- **FormInput**: Consistent form inputs with validation states
- **Button**: Flexible button component with variants

### Clean Code Practices
- Separation of concerns
- Consistent naming conventions
- Modular CSS architecture
- Proper component composition
- Type-safe prop handling

## 🔧 Development Notes

- All images are served from the `public/` directory
- CSS uses modern features like `backdrop-filter` and `clip-path`
- Components are designed to be easily maintainable and extensible
- Responsive design follows mobile-first principles

## 📄 License

This project is part of a development exercise focusing on clean architecture and modern React practices.
