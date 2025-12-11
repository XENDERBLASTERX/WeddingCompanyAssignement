import { motion } from "framer-motion";

interface ProgressBarProps {
  totalSteps: number;
  currentStep: number;
  /** Array indicating which questions have been answered */
  answeredSteps: boolean[];
}

/**
 * Segmented progress bar showing quiz completion status
 * Each segment represents one question
 * 
 * Accessibility: Uses aria-label to announce progress to screen readers
 */
export function ProgressBar({ 
  totalSteps, 
  currentStep, 
  answeredSteps 
}: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Question ${currentStep + 1} of ${totalSteps}`}
      className="flex items-center gap-3 w-full max-w-xl mx-auto"
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index <= currentStep;
        const isCompleted = answeredSteps[index];
        
        return (
          <motion.div
            key={index}
            className="flex-1 h-1 rounded-full overflow-hidden"
            style={{
              backgroundColor: "hsl(var(--quiz-progress-inactive))",
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: "hsl(var(--quiz-progress-active))",
              }}
              initial={{ width: 0 }}
              animate={{ 
                width: isActive ? "100%" : "0%",
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                // Stagger the animation slightly for a wave effect
                delay: index * 0.05,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
