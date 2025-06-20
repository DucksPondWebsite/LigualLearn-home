// Quiz data
const quizQuestions = [
  {
    id: 1,
    question: "What does 'Hola' mean in English?",
    options: ["Goodbye", "Hello", "Thank you", "Please"],
    correct: 1,
    language: "Spanish",
    explanation: "'Hola' is the most common way to say 'Hello' in Spanish.",
  },
  {
    id: 2,
    question: "How do you say 'Thank you' in French?",
    options: ["Bonjour", "Au revoir", "Merci", "S'il vous plaît"],
    correct: 2,
    language: "French",
    explanation: "'Merci' means 'Thank you' in French.",
  },
  {
    id: 3,
    question: "What does 'Guten Tag' mean?",
    options: ["Good night", "Good morning", "Good day", "Goodbye"],
    correct: 2,
    language: "German",
    explanation: "'Guten Tag' is a formal way to say 'Good day' in German.",
  },
  {
    id: 4,
    question: "How do you say 'Water' in Spanish?",
    options: ["Agua", "Fuego", "Tierra", "Aire"],
    correct: 0,
    language: "Spanish",
    explanation: "'Agua' means 'Water' in Spanish.",
  },
  {
    id: 5,
    question: "What does 'Je suis' mean in English?",
    options: ["You are", "I am", "He is", "We are"],
    correct: 1,
    language: "French",
    explanation: "'Je suis' means 'I am' in French.",
  },
]

// Quiz state
let currentQuestionIndex = 0
let selectedAnswer = null
let showingResult = false
let score = 0
let answers = []
let quizCompleted = false

// DOM elements
let questionCard, resultsContainer, questionText, languageBadge, optionsContainer
let explanation, explanationText, nextButton, currentQuestionSpan, totalQuestionsSpan
let progressFill, currentScoreSpan, questionsAnsweredSpan

// Initialize quiz when page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeQuiz()
})

function initializeQuiz() {
  // Get DOM elements
  questionCard = document.getElementById("questionCard")
  resultsContainer = document.getElementById("resultsContainer")
  questionText = document.getElementById("questionText")
  languageBadge = document.getElementById("languageBadge")
  optionsContainer = document.getElementById("optionsContainer")
  explanation = document.getElementById("explanation")
  explanationText = document.getElementById("explanationText")
  nextButton = document.getElementById("nextButton")
  currentQuestionSpan = document.getElementById("currentQuestion")
  totalQuestionsSpan = document.getElementById("totalQuestions")
  progressFill = document.getElementById("progressFill")
  currentScoreSpan = document.getElementById("currentScore")
  questionsAnsweredSpan = document.getElementById("questionsAnswered")

  // Set total questions
  totalQuestionsSpan.textContent = quizQuestions.length

  // Load first question
  loadQuestion()
}

function loadQuestion() {
  const question = quizQuestions[currentQuestionIndex]

  // Update question info
  questionText.textContent = question.question
  languageBadge.textContent = question.language
  currentQuestionSpan.textContent = currentQuestionIndex + 1

  // Update progress
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  progressFill.style.width = progress + "%"

  // Clear previous options
  optionsContainer.innerHTML = ""

  // Create option buttons
  question.options.forEach((option, index) => {
    const button = document.createElement("button")
    button.className = "option-button"
    button.onclick = () => selectAnswer(index)

    const optionText = document.createElement("span")
    optionText.textContent = option
    button.appendChild(optionText)

    const iconContainer = document.createElement("span")
    iconContainer.className = "option-icon-container"
    button.appendChild(iconContainer)

    optionsContainer.appendChild(button)
  })

  // Reset state
  selectedAnswer = null
  showingResult = false
  explanation.classList.add("hidden")
  nextButton.disabled = true
  nextButton.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"
}

function selectAnswer(answerIndex) {
  if (showingResult) return

  selectedAnswer = answerIndex

  // Update button states
  const buttons = optionsContainer.querySelectorAll(".option-button")
  buttons.forEach((button, index) => {
    button.classList.remove("selected")
    if (index === answerIndex) {
      button.classList.add("selected")
    }
  })

  nextButton.disabled = false
}

function nextQuestion() {
  if (selectedAnswer === null) return

  const question = quizQuestions[currentQuestionIndex]
  const isCorrect = selectedAnswer === question.correct

  // Record answer
  answers.push(selectedAnswer)
  if (isCorrect) {
    score++
  }

  // Show result
  showAnswerResult(question, isCorrect)

  // Update score display
  currentScoreSpan.textContent = score
  questionsAnsweredSpan.textContent = currentQuestionIndex + 1

  showingResult = true
  nextButton.disabled = true

  // Auto-advance after 2 seconds
  setTimeout(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++
      loadQuestion()
    } else {
      showResults()
    }
  }, 2000)
}

function showAnswerResult(question, isCorrect) {
  const buttons = optionsContainer.querySelectorAll(".option-button")

  buttons.forEach((button, index) => {
    button.disabled = true

    if (index === question.correct) {
      button.classList.add("correct")
      // Add checkmark icon
      const iconContainer = button.querySelector(".option-icon-container")
      iconContainer.innerHTML = `
                <svg class="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
            `
    } else if (index === selectedAnswer && !isCorrect) {
      button.classList.add("incorrect")
      // Add X icon
      const iconContainer = button.querySelector(".option-icon-container")
      iconContainer.innerHTML = `
                <svg class="option-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
            `
    }
  })

  // Show explanation
  explanationText.textContent = question.explanation
  explanation.classList.remove("hidden")
}

function showResults() {
  quizCompleted = true

  // Hide question card
  questionCard.classList.add("hidden")

  // Show results
  resultsContainer.classList.remove("hidden")

  // Calculate percentage
  const percentage = Math.round((score / quizQuestions.length) * 100)

  // Update results display
  document.getElementById("finalScore").textContent = `${score}/${quizQuestions.length}`
  document.getElementById("percentageScore").textContent = `You scored ${percentage}%`

  // Show appropriate message
  const resultsMessage = document.getElementById("resultsMessage")
  if (score === quizQuestions.length) {
    resultsMessage.textContent = "Perfect score! Excellent work! 🎉"
    resultsMessage.className = "results-message perfect"
  } else if (score >= quizQuestions.length * 0.8) {
    resultsMessage.textContent = "Great job! You're doing well! 👏"
    resultsMessage.className = "results-message great"
  } else if (score >= quizQuestions.length * 0.6) {
    resultsMessage.textContent = "Good effort! Keep practicing! 💪"
    resultsMessage.className = "results-message good"
  } else {
    resultsMessage.textContent = "Keep studying! You'll improve! 📚"
    resultsMessage.className = "results-message needs-work"
  }

  // Save results to localStorage
  saveQuizResults()
}

function restartQuiz() {
  // Reset all state
  currentQuestionIndex = 0
  selectedAnswer = null
  showingResult = false
  score = 0
  answers = []
  quizCompleted = false

  // Show question card, hide results
  questionCard.classList.remove("hidden")
  resultsContainer.classList.add("hidden")

  // Reset score display
  currentScoreSpan.textContent = "0"
  questionsAnsweredSpan.textContent = "0"

  // Load first question
  loadQuestion()
}

function saveQuizResults() {
  const results = {
    score: score,
    totalQuestions: quizQuestions.length,
    percentage: Math.round((score / quizQuestions.length) * 100),
    answers: answers,
    timestamp: new Date().toISOString(),
  }

  // Save to localStorage
  const previousResults = loadFromLocalStorage("quizResults") || []
  previousResults.push(results)

  // Keep only last 10 results
  if (previousResults.length > 10) {
    previousResults.splice(0, previousResults.length - 10)
  }

  saveToLocalStorage("quizResults", previousResults)
}

function getQuizHistory() {
  return loadFromLocalStorage("quizResults") || []
}

// Helper functions for localStorage
function saveToLocalStorage(key, value) {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

function loadFromLocalStorage(key) {
  try {
    const serializedValue = localStorage.getItem(key)
    if (serializedValue === null) {
      return null
    }
    return JSON.parse(serializedValue)
  } catch (error) {
    console.error("Error loading from localStorage:", error)
    return null
  }
}

// Export functions for potential use in other scripts
window.quizFunctions = {
  restartQuiz,
  getQuizHistory,
  saveQuizResults,
}
