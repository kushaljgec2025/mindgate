"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, CheckCircle, XCircle, Lightbulb, Trophy } from "lucide-react"
import Link from "next/link"

const sampleQuestions = [
  {
    id: 1,
    question: "What is the time complexity of searching an element in a balanced binary search tree?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correct: 1,
    explanation:
      "In a balanced BST, the height is log n, so searching takes O(log n) time as we eliminate half the nodes at each level.",
    topic: "Data Structures",
    difficulty: "Medium",
  },
  {
    id: 2,
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
    correct: 2,
    explanation:
      "Merge Sort has a consistent O(n log n) time complexity in all cases, making it optimal for average-case scenarios.",
    topic: "Algorithms",
    difficulty: "Medium",
  },
  {
    id: 3,
    question: "In a relational database, what does ACID stand for?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Association, Consistency, Integration, Database",
      "Atomicity, Concurrency, Isolation, Database",
      "Association, Concurrency, Integration, Durability",
    ],
    correct: 0,
    explanation:
      "ACID properties ensure reliable database transactions: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions), Durability (permanent changes).",
    topic: "Database Management",
    difficulty: "Easy",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, showResult])

  const handleAnswerSubmit = () => {
    const answerIndex = Number.parseInt(selectedAnswer)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    if (answerIndex === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg">
                  <p className="text-2xl font-bold text-white">{score}</p>
                  <p className="text-sm text-green-100">Correct Answers</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg">
                  <p className="text-2xl font-bold text-white">{Math.round((score / sampleQuestions.length) * 100)}%</p>
                  <p className="text-sm text-blue-100">Accuracy</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-white">Performance Breakdown:</p>
                {sampleQuestions.map((q, index) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-2 bg-gray-700/50 rounded border border-gray-600"
                  >
                    <span className="text-sm text-gray-300">{q.topic}</span>
                    {answers[index] === q.correct ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link href="/practice" className="flex-1">
                  <Button variant="outline" className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                    Practice Again
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = sampleQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Practice Quiz
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>
                  Question {currentQuestion + 1} of {sampleQuestions.length}
                </span>
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                  {question.topic}
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                  {question.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className={timeLeft < 60 ? "text-red-400 font-bold" : "text-gray-400"}>{formatTime(timeLeft)}</span>
            </div>
            <div className="text-sm text-gray-400">
              Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed text-white">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      showExplanation
                        ? index === question.correct
                          ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/50"
                          : selectedAnswer === index.toString() && index !== question.correct
                            ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/50"
                            : "bg-gray-700/50 border-gray-600"
                        : selectedAnswer === index.toString()
                          ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/50"
                          : "hover:bg-gray-700/50 border-gray-600"
                    }`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      disabled={showExplanation}
                      className="text-white"
                    />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-white">
                      {option}
                    </Label>
                    {showExplanation && index === question.correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showExplanation && selectedAnswer === index.toString() && index !== question.correct && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="mb-6 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-blue-500/30 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-300 mb-2">Explanation:</p>
                  <p className="text-blue-100">{question.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            Previous
          </Button>

          {!showExplanation ? (
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
            >
              {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
