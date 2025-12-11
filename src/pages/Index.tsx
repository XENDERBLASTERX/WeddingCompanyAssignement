/**
 * Quiz App - Main Entry Page
 * 
 * A pixel-perfect quiz application built for a frontend internship portfolio.
 * Features smooth animations, full accessibility, and clean component architecture.
 * 
 * Tech Stack:
 * - React + TypeScript
 * - Tailwind CSS for styling
 * - Framer Motion for animations
 * 
 * Accessibility:
 * - WCAG 2.1 compliant
 * - Full keyboard navigation
 * - Screen reader optimized
 * - Respects prefers-reduced-motion
 */

import { Quiz } from "@/components/quiz";

const Index = () => {
  return (
    <main>
      <Quiz />
    </main>
  );
};

export default Index;
