"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  language: string
  explanation: string
}

const questions: Question[] = [
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

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizCompleted(false)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            <CardDescription>Here are your results</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {score}/{questions.length}
            </div>
            <div className="text-xl mb-6">You scored {Math.round((score / questions.length) * 100)}%</div>
            <div className="mb-6">
              {score === questions.length && (
                <div className="text-green-600 font-semibold">Perfect score! Excellent work! 🎉</div>
              )}
              {score >= questions.length * 0.8 && score < questions.length && (
                <div className="text-blue-600 font-semibold">Great job! You're doing well! 👏</div>
              )}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && (
                <div className="text-yellow-600 font-semibold">Good effort! Keep practicing! 💪</div>
              )}
              {score < questions.length * 0.6 && (
                <div className="text-red-600 font-semibold">Keep studying! You'll improve! 📚</div>
              )}
            </div>
            <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Language Quiz</h1>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{questions[currentQuestion].question}</CardTitle>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {questions[currentQuestion].language}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === questions[currentQuestion].correct
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-500 bg-red-50 text-red-800"
                        : "border-blue-500 bg-blue-50"
                      : showResult && index === questions[currentQuestion].correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && (
                      <>
                        {index === questions[currentQuestion].correct && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {selectedAnswer === index && index !== questions[currentQuestion].correct && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </div>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null || showResult}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
