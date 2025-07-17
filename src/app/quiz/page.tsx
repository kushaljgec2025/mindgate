"use client";
import useQuizZustandStore from "../store/quizZustandStore"; // ✅ Zustand import

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Lightbulb,
  Trophy,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Stopwatch from "../_components/Stopwatch";
// {
//     QuestionsDescription:
//       "Consider the CIDR block 203.0.113.0/24. If this block is to be subnetted into 8 equal-sized subnets, what is the maximum number of usable host IP addresses in each of these new subnets?",
//     Options: [
//       {
//         isCorrect: false,
//         option: "A: 28",
//       },
//       {
//         isCorrect: true,
//         option: "B: 30",
//       },
//       {
//         isCorrect: false,
//         option: "C: 14",
//       },
//       {
//         isCorrect: false,
//         option: "D: 126",
//       },
//     ],
//     Explanation:
//       "To create 8 equal-sized subnets from a /24 network, we need 3 bits for subnetting (since 2^3 = 8). These 3 bits are borrowed from the host portion. The original network mask is 24 bits. So, the new subnet mask will be 24 + 3 = 27 bits (i.e., /27). In a /27 subnet, the total number of IP addresses is 2^(32-27) = 2^5 = 32. The number of usable host IP addresses in each subnet is total addresses - 2 (one for the network address and one for the broadcast address). Therefore, 32 - 2 = 30 usable host IP addresses.",
//     Difficulty: "Medium",
//   },

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  // const [QuestionSet, setQuestionSet] = useState([]);
  const quizQuestions = useQuizZustandStore((state) => state.QuizQuestions);
  console.log("Quiz Questions:", quizQuestions);

  const handleAnswerSubmit = () => {
    const answerIndex = Number.parseInt(selectedAnswer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-2xl">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">
                Quiz Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-lg">
                  <p className="text-2xl font-bold text-white">{score}</p>
                  <p className="text-sm text-green-100">Correct Answers</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                  <p className="text-2xl font-bold text-white">
                    {Math.round((score / quizQuestions.length) * 100)}%
                  </p>
                  <p className="text-sm text-blue-100">Accuracy</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-white">Performance Breakdown:</p>
                {quizQuestions?.map(
                  (
                    q: {
                      question: string;
                      options: string[];
                      correct: number;
                      topic: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-700/50 rounded border border-gray-600"
                    >
                      <span className="text-sm text-gray-300">{q?.topic}</span>
                      {answers[index] === q.correct ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  )
                )}
              </div>

              <div className="flex gap-4">
                <Link href="/practice" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    Practice Again
                  </Button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions?.[currentQuestion];
  {
    (!quizQuestions || !question) && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-white text-lg">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                AI Practice Quiz
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
                  {question?.topic}
                </Badge>
                <Badge
                  className={`bg-gradient-to-r  ${
                    question?.difficulty === "Easy" &&
                    "from-green-400 to-green-600"
                  }
                        ${
                          question?.difficulty === "Medium" &&
                          "from-yellow-400 to-yellow-600"
                        }
                        ${
                          question?.difficulty === "Hard" &&
                          "from-red-400 to-red-600"
                        }
                         text-white border-0`}
                >
                  {question?.difficulty}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-6 w-6 text-amber-400" />
              <Stopwatch
                initialTime={300}
                isRunning={!showResult}
                onTimeUp={() => setShowResult(true)}
                onTick={(t) => {
                  console.log("Time left:", t);
                }}
              />
            </div>
            <Badge className="text-sm text-bold  text-amber-500">
              Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg leading-relaxed text-white">
              {question?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
            >
              <div className="space-y-3">
                {question?.options.map((option: string, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      showExplanation
                        ? index === question?.correct
                          ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/50"
                          : selectedAnswer === index.toString() &&
                            index !== question?.correct
                          ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 border-red-500/50"
                          : "bg-gray-700/50 border-gray-600"
                        : selectedAnswer === index.toString()
                        ? "bg-gradient-to-r from-amber-400/20 to-amber-600/20 border-amber-500/50"
                        : "hover:bg-gray-700/50 border-gray-600"
                    }`}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      disabled={showExplanation}
                      className="text-white"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-white"
                    >
                      {option}
                    </Label>
                    {showExplanation && index === question?.correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showExplanation &&
                      selectedAnswer === index.toString() &&
                      index !== question?.correct && (
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
          <Card className="mb-6 bg-gradient-to-r from-amber-600/10 to-yellow-600/10 border-amber-500/30 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-8 w-8 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-300 mb-2">
                    Explanation:
                  </p>
                  <p className="text-amber-100">{question?.explanation}</p>
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
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-400/90 hover:to-amber-600/90 text-white border-0"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-400/90 hover:to-amber-600/90 text-white border-0"
            >
              {currentQuestion === quizQuestions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
