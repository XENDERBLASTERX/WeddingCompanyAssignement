/**
 * Quiz Questions Dataset
 * 
 * Each question includes:
 * - id: Unique identifier
 * - question: The question text
 * - options: Array of possible answers
 * - correctAnswer: Index of the correct option (0-indexed)
 * 
 * Easy to extend - just add more question objects to the array
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    correctAnswer: 1, // Meow-Meow
  },
  {
    id: 2,
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    correctAnswer: 1, // Ice Cream
  },
  {
    id: 3,
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    correctAnswer: 1, // Yellow
  },
  {
    id: 4,
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    correctAnswer: 1, // Infinite
  },
];

/**
 * Calculate quiz score as a percentage
 * @param answers - Array of user's selected answer indices
 * @param questions - Array of question objects
 * @returns Score as a percentage (0-100)
 */
export function calculateScore(
  answers: (number | null)[],
  questions: Question[]
): number {
  if (questions.length === 0) return 0;
  
  const correctCount = answers.reduce((count, answer, index) => {
    if (answer === null) return count;
    return count + (answer === questions[index].correctAnswer ? 1 : 0);
  }, 0);
  
  return Math.round((correctCount / questions.length) * 100);
}
