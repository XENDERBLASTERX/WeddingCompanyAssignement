import { motion, AnimatePresence } from "framer-motion";
import { AnswerOption } from "./AnswerOption";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  /** Direction of slide animation: 1 for forward, -1 for backward */
  direction: number;
}

/**
 * Question display card with animated transitions
 * 
 * Animation logic:
 * - Slides left/right based on navigation direction
 * - Fades in/out with subtle scale
 * - Options animate in with stagger effect
 */
export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
  direction,
}: QuestionCardProps) {
  // Animation variants for question transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.25 },
          scale: { duration: 0.25 },
        }}
        className="w-full"
      >
        {/* Question box */}
        <motion.div
          className="question-box mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="font-semibold">
            {questionNumber}. {question.question}
          </span>
        </motion.div>

        {/* Answer options */}
        <div 
          className="space-y-3"
          role="radiogroup"
          aria-label={`Answers for question ${questionNumber}`}
        >
          {question.options.map((option, index) => (
            <AnswerOption
              key={`${question.id}-${index}`}
              text={option}
              isSelected={selectedAnswer === index}
              onClick={() => onSelectAnswer(index)}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
