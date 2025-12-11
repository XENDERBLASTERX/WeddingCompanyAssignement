# Test Your Knowledge - Interactive Quiz App

A pixel-perfect, accessible quiz web application built for a frontend internship portfolio. Features smooth animations, full keyboard navigation, and WCAG 2.1 compliance.

![Quiz Screenshot](./docs/quiz-preview.png)

## ✨ Features

- **Pixel-Perfect Design**: Matches the provided mockups with attention to typography, spacing, gradients, and shadows
- **Smooth Animations**: Powered by Framer Motion with question transitions, progress bar animations, and a rolling score reveal
- **Full Accessibility**: WCAG 2.1 compliant with keyboard navigation, ARIA labels, and `prefers-reduced-motion` support
- **Clean Architecture**: Modular component structure with TypeScript for type safety
- **Responsive**: Optimized for desktop viewing as specified

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Lucide React** for icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quiz-app.git

# Navigate to project directory
cd quiz-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   └── quiz/
│       ├── Quiz.tsx            # Main quiz orchestrator
│       ├── QuizLayout.tsx      # Layout wrapper with gradient background
│       ├── QuizHeader.tsx      # Title and subtitle
│       ├── ProgressBar.tsx     # Segmented progress indicator
│       ├── QuestionCard.tsx    # Question display with animations
│       ├── AnswerOption.tsx    # Individual answer button
│       ├── NavigationControls.tsx # Prev/Next/Submit buttons
│       ├── ResultScreen.tsx    # Score reveal with counting animation
│       └── index.ts            # Barrel exports
├── data/
│   └── questions.ts            # Quiz questions dataset
├── pages/
│   └── Index.tsx               # Main entry point
└── index.css                   # Design system (Tailwind config)
```

## ♿ Accessibility Features

This application meets WCAG 2.1 Level AA requirements:

- **Keyboard Navigation**: Full Tab/Enter support for all interactive elements
- **Focus Management**: Visible focus indicators on all buttons and options
- **Screen Readers**: ARIA labels, roles, and live regions for dynamic content
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Semantic HTML**: Proper heading hierarchy and landmark regions
- **Color Contrast**: Meets minimum 4.5:1 contrast ratio

## 🎬 Animation Details

### Question Transitions
- Slide + fade animation when navigating between questions
- Direction-aware (slides left/right based on navigation)
- Spring physics for natural feel

### Option Selection
- Scale animation on selection (100-160ms ease)
- Background color transition
- Hover state with subtle lift effect

### Progress Bar
- Animated width transitions with staggered timing
- Smooth fill animation when advancing

### Score Reveal
- Rolling odometer-style number animation
- Staged reveal: card → title → digits → percentage
- Bounce effect on completion
- `aria-live` region announces final score

## 📋 Assignment Checklist

- [x] React + TypeScript
- [x] Tailwind CSS
- [x] Framer Motion animations
- [x] Desktop-only responsive layout
- [x] Pixel-perfect design matching screenshots
- [x] Keyboard navigation
- [x] ARIA labels and semantic HTML
- [x] `prefers-reduced-motion` support
- [x] Clean project structure
- [x] Modular components
- [x] TypeScript types for props/state
- [x] Question dataset in `/data`
- [x] Score calculation
- [x] Progress bar with animated segments
- [x] Question slide transitions
- [x] Option selection animations
- [x] Rolling score reveal animation

## 🔧 Suggested Commit History

```
init: project scaffold with Vite + React + TypeScript
feat: add quiz questions dataset
feat: create QuizLayout with gradient background
feat: implement ProgressBar component
feat: add QuestionCard with slide transitions
feat: create AnswerOption with selection states
feat: implement NavigationControls
feat: add ResultScreen with rolling score animation
style: configure Tailwind design system
a11y: add ARIA labels and keyboard navigation
perf: respect prefers-reduced-motion
docs: add README with setup instructions
```

## 📝 Personal Notes

This project was built with a focus on clean, maintainable code and attention to design details. Key decisions:

1. **State Management**: Used `useReducer` instead of multiple `useState` calls for cleaner state logic
2. **Animation Architecture**: Centralized animation variants in components for consistency
3. **Design System**: All colors defined as CSS variables in Tailwind for easy theming
4. **Accessibility First**: ARIA attributes added during initial implementation, not as an afterthought

## 📄 License

MIT License - feel free to use this for your own portfolio!

---

**Time Spent**: ~4 hours (design system setup, component architecture, animations, accessibility, documentation)
