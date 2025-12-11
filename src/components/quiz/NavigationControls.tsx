import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  hasSelectedAnswer: boolean;
}

/**
 * Navigation controls for quiz
 * Shows prev/next arrows and submit button on last question
 * 
 * Accessibility:
 * - All buttons have aria-labels
 * - Disabled states clearly communicated
 * - Focus visible on keyboard navigation
 */
export function NavigationControls({
  onPrevious,
  onNext,
  onSubmit,
  canGoPrevious,
  canGoNext,
  isLastQuestion,
  hasSelectedAnswer,
}: NavigationControlsProps) {
  return (
    <motion.div
      className="flex items-center justify-end gap-2 mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      {/* Previous button */}
      <motion.button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="quiz-nav-btn"
        whileHover={canGoPrevious ? { scale: 1.05 } : {}}
        whileTap={canGoPrevious ? { scale: 0.95 } : {}}
        aria-label="Previous question"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Next button (or Submit on last question) */}
      {isLastQuestion ? (
        <motion.button
          type="button"
          onClick={onSubmit}
          className="quiz-submit-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Submit quiz"
        >
          Submit
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="quiz-nav-btn"
          whileHover={canGoNext ? { scale: 1.05 } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
          aria-label="Next question"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
}
