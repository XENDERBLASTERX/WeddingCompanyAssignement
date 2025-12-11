import { motion } from "framer-motion";
import { ReactNode } from "react";

interface QuizLayoutProps {
  children: ReactNode;
}

/**
 * Main quiz layout wrapper
 * 
 * Provides:
 * - Gradient background matching design specs
 * - Centered card container with glass effect
 * - Responsive padding and constraints
 */
export function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className="min-h-screen quiz-gradient-bg flex items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Outer container with blue-tinted border effect */}
        <div 
          className="rounded-3xl p-3"
          style={{
            background: "linear-gradient(135deg, hsl(190 40% 85% / 0.6), hsl(195 35% 88% / 0.4))",
            boxShadow: "0 20px 60px -15px hsl(200 50% 30% / 0.15), inset 0 1px 1px hsl(0 0% 100% / 0.4)",
          }}
        >
          {/* Inner card */}
          <div className="quiz-card rounded-2xl p-8 md:p-12">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
