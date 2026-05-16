// ================================
// GENERAL KNOWLEDGE QUIZ APP LOGIC
// Now includes Progress Bar + More Questions
// ================================

// Array of quiz questions
const questions = [
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Lisbon", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mercury", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Pacific Ocean", correct: true },
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "7", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false }
    ]
  },
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "NaCl", correct: false }
    ]
  },
  {
    question: "Which country is home to the Great Wall?",
    answers: [
      { text: "China", correct: true },
      { text: "Japan", correct: false },
      { text: "India", correct: false },
      { text: "South Korea", correct: false }
    ]
  },
  {
    question: "How many sides does a hexagon have?",
    answers: [
      { text: "6", correct: true },
      { text: "5", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false },
      { text: "Earth", correct: false }
    ]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Diamond", correct: true },
      { text: "Gold", correct: false },
      { text: "Iron", correct: false },
      { text: "Quartz", correct: false }
    ]
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    answers: [
      { text: "Africa", correct: true },
      { text: "Asia", correct: false },
      { text: "Australia", correct: false },
      { text: "South America", correct: false }
    ]
  },
  {
    question: "How many bones are in the adult human body?",
    answers: [
      { text: "206", correct: true },
      { text: "210", correct: false },
      { text: "201", correct: false },
      { text: "190", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Carbon Dioxide", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "Which country invented pizza?",
    answers: [
      { text: "Italy", correct: true },
      { text: "France", correct: false },
      { text: "Spain", correct: false },
      { text: "Mexico", correct: false }
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "Mount Everest", correct: true },
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Mount Kilimanjaro", correct: false }
    ]
  }
];

// Selecting important HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreText = document.getElementById("score-text");

// Progress bar + progress text
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Variables to track quiz progress
let currentQuestionIndex = 0;
let score = 0;

// ================================
// FUNCTION: START QUIZ
// Resets everything and loads first question
// ================================
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreText.textContent = "Score: 0";
  nextBtn.style.display = "none";
  showQuestion();
  updateProgress(); // Update progress bar when quiz starts
}

// ================================
// FUNCTION: SHOW QUESTION
// Displays current question and answers
// ================================
function showQuestion() {
  resetState(); // Clear old buttons first

  // Get current question from array
  const currentQuestion = questions[currentQuestionIndex];

  // Display question text
  questionElement.textContent = currentQuestion.question;

  // Create answer buttons dynamically
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;

    // Store correct answer info in button dataset
    button.dataset.correct = answer.correct;

    // Add click event listener
    button.addEventListener("click", selectAnswer);

    // Add button to page
    answerButtons.appendChild(button);
  });

  // Update progress each time a question loads
  updateProgress();
}

// ================================
// FUNCTION: RESET STATE
// Clears previous answers and hides next button
// ================================
function resetState() {
  nextBtn.style.display = "none";

  // Remove all previous answer buttons
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// ================================
// FUNCTION: SELECT ANSWER
// Handles answer selection and scoring
// ================================
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  // If correct, increase score
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Show correct answer after user clicks
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    // Disable all buttons after selection
    button.disabled = true;
  });

  // Update score display
  scoreText.textContent = `Score: ${score}`;

  // Show the next button
  nextBtn.style.display = "block";
}

// ================================
// FUNCTION: UPDATE PROGRESS
// Updates progress bar width + question counter text
// ================================
function updateProgress() {
  const totalQuestions = questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;

  // Update progress text (example: Question 3 of 15)
  progressText.textContent = `Question ${currentQuestionNumber} of ${totalQuestions}`;

  // Calculate percentage for progress bar
  const progressPercent = (currentQuestionNumber / totalQuestions) * 100;

  // Update progress bar width
  progressBar.style.width = `${progressPercent}%`;
}

// ================================
// FUNCTION: SHOW NEXT QUESTION
// Moves to next question or ends quiz
// ================================
function showNextQuestion() {
  currentQuestionIndex++;

  // If there are more questions, show them
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
}

// ================================
// FUNCTION: SHOW FINAL SCORE
// Displays quiz completion message
// ================================
function showFinalScore() {
  resetState();

  // Display final message
  questionElement.textContent = `Quiz Finished! Your final score is ${score} out of ${questions.length}.`;

  // Set progress bar to 100% when finished
  progressBar.style.width = "100%";

  // Update progress text when quiz ends
  progressText.textContent = `Completed! (${questions.length} Questions)`;

  nextBtn.style.display = "none";
}

// ================================
// EVENT LISTENERS
// ================================

// Next button click loads next question
nextBtn.addEventListener("click", showNextQuestion);

// Restart button starts quiz again
restartBtn.addEventListener("click", startQuiz);

// Start quiz automatically when page loads
startQuiz();