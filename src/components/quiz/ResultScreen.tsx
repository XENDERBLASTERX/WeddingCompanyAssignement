import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface ResultScreenProps {
  score: number;
  onRestart: () => void;
}

/**
 * Result screen with animated score reveal
 * 
 * Animation sequence:
 * 1. Card fades in
 * 2. "Keep Learning!" badge appears
 * 3. "Your Final score is" text slides up
 * 4. Score counts up from 0 with odometer effect
 * 5. Subtle bounce when landing on final number
 * 
 * Accessibility:
 * - aria-live region announces final score
 * - Reduced motion respected via CSS media query
 */
export function ResultScreen({ score, onRestart }: ResultScreenProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Motion value for smooth counting animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // Subscribe to rounded value changes
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayScore(latest);
    });

    // Animate from 0 to final score with custom easing
    const controls = animate(count, score, {
      duration: 1.5,
      delay: 0.8, // Wait for card entrance
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth count
      onComplete: () => setAnimationComplete(true),
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [score, count, rounded]);

  // Split score into digits for staggered reveal effect
  const scoreDigits = displayScore.toString().padStart(2, "0").split("");

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center quiz-gradient-bg p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Keep Learning badge */}
        <motion.div
          className="inline-block mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="subtitle-badge">Keep Learning!</span>
        </motion.div>

        {/* Score title */}
        <motion.h1
          className="font-serif text-4xl md:text-5xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="font-bold text-primary">Your </span>
          <span className="italic text-accent">Final score is</span>
        </motion.h1>

        {/* Animated score display */}
        <motion.div
          className="flex items-baseline justify-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          // Announce score to screen readers
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Score digits with odometer effect */}
          <div className="flex overflow-hidden">
            {scoreDigits.map((digit, index) => (
              <motion.span
                key={index}
                className="font-serif text-8xl md:text-9xl font-bold text-primary inline-block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                }}
                transition={{
                  delay: 0.9 + index * 0.1,
                  duration: 0.4,
                  ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
                }}
              >
                {digit}
              </motion.span>
            ))}
          </div>
          
          {/* Percentage symbol */}
          <motion.span
            className="font-serif text-5xl md:text-6xl text-accent"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            %
          </motion.span>
        </motion.div>

        {/* Bounce effect on completion */}
        {animationComplete && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Screen reader announcement */}
        <span className="sr-only">
          Your final score is {score} percent
        </span>

        {/* Restart button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <motion.button
            onClick={onRestart}
            className="quiz-submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Start the quiz again"
          >
            Start Again
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

