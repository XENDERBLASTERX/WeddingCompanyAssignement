import { useState, useCallback, useReducer } from "react";
import { motion } from "framer-motion";
import { QuizLayout } from "./QuizLayout";
import { QuizHeader } from "./QuizHeader";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { NavigationControls } from "./NavigationControls";
import { ResultScreen } from "./ResultScreen";
import { questions, calculateScore } from "@/data/questions";

// State management types
interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  isComplete: boolean;
  direction: number; // 1 for forward, -1 for backward
}

type QuizAction =
  | { type: "SELECT_ANSWER"; questionIndex: number; answerIndex: number }
  | { type: "NEXT_QUESTION" }
  | { type: "PREV_QUESTION" }
  | { type: "SUBMIT" }
  | { type: "RESET" };

/**
 * Quiz state reducer
 * Handles all quiz navigation and answer selection logic
 */
function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_ANSWER":
      const newAnswers = [...state.answers];
      newAnswers[action.questionIndex] = action.answerIndex;
      return { ...state, answers: newAnswers };
    
    case "NEXT_QUESTION":
      if (state.currentQuestion < questions.length - 1) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          direction: 1,
        };
      }
      return state;
    
    case "PREV_QUESTION":
      if (state.currentQuestion > 0) {
        return {
          ...state,
          currentQuestion: state.currentQuestion - 1,
          direction: -1,
        };
      }
      return state;
    
    case "SUBMIT":
      return { ...state, isComplete: true };
    
    case "RESET":
      return {
        currentQuestion: 0,
        answers: new Array(questions.length).fill(null),
        isComplete: false,
        direction: 1,
      };
    
    default:
      return state;
  }
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: new Array(questions.length).fill(null),
  isComplete: false,
  direction: 1,
};

/**
 * Main Quiz Component
 * 
 * Orchestrates the entire quiz experience:
 * - Question navigation with keyboard support
 * - Answer selection and validation
 * - Score calculation and result display
 * 
 * Accessibility features:
 * - Full keyboard navigation (Tab, Enter, Arrow keys)
 * - ARIA labels and roles
 * - Screen reader announcements
 * - Respects prefers-reduced-motion
 */
export function Quiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  
  const currentQuestion = questions[state.currentQuestion];
  const selectedAnswer = state.answers[state.currentQuestion];
  
  // Check which questions have been answered
  const answeredSteps = state.answers.map((a) => a !== null);
  
  // Navigation handlers
  const handleSelectAnswer = useCallback((answerIndex: number) => {
    dispatch({
      type: "SELECT_ANSWER",
      questionIndex: state.currentQuestion,
      answerIndex,
    });
  }, [state.currentQuestion]);

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const handlePrevious = useCallback(() => {
    dispatch({ type: "PREV_QUESTION" });
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch({ type: "SUBMIT" });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Calculate score when quiz is complete
  const score = calculateScore(state.answers, questions);

  // Show result screen when complete
  if (state.isComplete) {
    return <ResultScreen score={score} onRestart={handleRestart} />;
  }

  return (
    <QuizLayout>
      {/* Accessible heading for screen readers */}
      <h1 className="sr-only">Knowledge Quiz</h1>
      
      {/* Visual header */}
      <QuizHeader />
      
      {/* Progress indicator */}
      <div className="mb-10">
        <ProgressBar
          totalSteps={questions.length}
          currentStep={state.currentQuestion}
          answeredSteps={answeredSteps}
        />
      </div>

      {/* Question content area */}
      <div className="max-w-xl mx-auto">
        <QuestionCard
          question={currentQuestion}
          questionNumber={state.currentQuestion + 1}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
          direction={state.direction}
        />

        {/* Navigation */}
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canGoPrevious={state.currentQuestion > 0}
          canGoNext={state.currentQuestion < questions.length - 1}
          isLastQuestion={state.currentQuestion === questions.length - 1}
          hasSelectedAnswer={selectedAnswer !== null}
        />
      </div>

      {/* Keyboard hint for accessibility */}
      <motion.p
        className="text-center text-muted-foreground text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="sr-only">
          Use Tab to navigate between options and Enter to select
        </span>
      </motion.p>
    </QuizLayout>
  );
}
