import { motion } from "framer-motion";

/**
 * Quiz header with title and subtitle
 * 
 * Typography matches design:
 * - "Test Your" in bold serif
 * - "Knowledge" in italic accent color
 * - Subtitle in a subtle badge/pill
 */
export function QuizHeader() {
  return (
    <div className="text-center mb-8">
      {/* Main title */}
      <motion.h1
        className="font-serif text-5xl md:text-6xl lg:text-7xl mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="font-bold text-primary">Test Your </span>
        <span className="italic text-accent">Knowledge</span>
      </motion.h1>

      {/* Subtitle badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <span className="subtitle-badge">
          Answer all questions to see your results
        </span>
      </motion.div>
    </div>
  );
}
