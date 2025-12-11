import { motion } from "framer-motion";

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  /** Index for staggered animation */
  index: number;
  disabled?: boolean;
}

/**
 * Individual answer option button
 * 
 * Features:
 * - Smooth selection animation with scale and background change
 * - Keyboard accessible with visible focus states
 * - Staggered entrance animation
 */
export function AnswerOption({
  text,
  isSelected,
  onClick,
  index,
  disabled = false,
}: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`quiz-option ${isSelected ? "selected" : ""}`}
      // Entrance animation - staggered fade and slide up
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.08 + 0.15, // Slight offset for more natural feel
        ease: [0.4, 0, 0.2, 1],
      }}
      // Selection animation
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      aria-label={`${text}${isSelected ? ", selected" : ""}`}
    >
      <motion.span
        animate={{
          scale: isSelected ? 1.02 : 1,
        }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      >
        {text}
      </motion.span>
    </motion.button>
  );
}
