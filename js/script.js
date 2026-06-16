// ================================
// GENERAL KNOWLEDGE QUIZ APP LOGIC
// ================================

// Array of quiz questions (MIXED: Multiple choice + True/False)
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
    question: "True or False: The Earth is flat.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
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
    question: "True or False: Water freezes at 0°C (32°F).",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
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
    question: "True or False: The Great Wall of China is visible from space with the naked eye.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
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
    question: "True or False: Lightning never strikes the same place twice.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true }
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
    question: "True or False: Humans have walked on the Moon.",
    answers: [
      { text: "True", correct: true },
      { text: "False", correct: false }
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
const backBtn = document.getElementById("back-btn");
// Progress bar + progress text
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

// Variables to track quiz progress
let currentQuestionIndex = 0;
let score = 0;

// This will store the shuffled version of the quiz questions
let shuffledQuestions = [];

// ================================
// FUNCTION: SHUFFLE QUESTIONS
// Randomizes the order of the questions each game
// ================================
function shuffleQuestions() {
  // The sort with Math.random shuffles the array
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

// ================================
// FUNCTION: START QUIZ
// Resets everything and loads first question
// ================================
function startQuiz() {
  shuffleQuestions(); // Shuffle questions at the start

  currentQuestionIndex = 0;
  score = 0;

  scoreText.textContent = "Score: 0";
  nextBtn.style.display = "none";

  showQuestion();
  updateProgress();
}

// ================================
// FUNCTION: SHOW QUESTION
// Displays current question and answers
// ================================
function showQuestion() {
  resetState();

  // Get current question from shuffled array
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

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

  updateProgress();
}

// ================================
// FUNCTION: RESET STATE
// Clears old answers and hides next button
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

  // Highlight correct answer and disable all buttons
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  // Update score text
  scoreText.textContent = `Score: ${score}`;

  // Show next button
  nextBtn.style.display = "block";
}

// ================================
// FUNCTION: UPDATE PROGRESS
// Updates progress bar and question counter
// ================================
function updateProgress() {
  const totalQuestions = shuffledQuestions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;

  progressText.textContent = `Question ${currentQuestionNumber} of ${totalQuestions}`;

  const progressPercent = (currentQuestionNumber / totalQuestions) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

// ================================
// FUNCTION: SHOW NEXT QUESTION
// Loads the next question or ends the quiz
// ================================
function showNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
}

// ================================
// FUNCTION: SHOW FINAL SCORE
// Shows final score message at the end
// ================================
function showFinalScore() {
  resetState();

  questionElement.textContent = `Quiz Finished! Your final score is ${score} out of ${shuffledQuestions.length}.`;

  progressBar.style.width = "100%";
  progressText.textContent = `Completed! (${shuffledQuestions.length} Questions)`;

  nextBtn.style.display = "none";
}
// ================================
// FUNCTION: GO BACK
// Returns to previous question
// ================================
function goBack() {

  if (currentQuestionIndex > 0) {

    currentQuestionIndex--;

    showQuestion();

    // Hide next button until user answers again
    nextBtn.style.display = "none";
  }
}
// ================================
// EVENT LISTENERS
// ================================
nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", goBack);
// Start quiz automatically when quiz page loads
startQuiz();