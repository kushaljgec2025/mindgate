"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, Settings, Brain } from "lucide-react";
import Link from "next/link";

const streams = [
  "Computer Science",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Instrumentation Engineering",
];

const topics = {
  "Computer Science": [
    "Data Structures",
    "Algorithms",
    "Database Management",
    "Computer Networks",
    "Operating Systems",
    "Software Engineering",
    "Digital Logic",
    "Computer Architecture",
  ],
  "Electronics & Communication": [
    "Analog Circuits",
    "Digital Circuits",
    "Signals & Systems",
    "Control Systems",
    "Communications",
    "Electromagnetics",
    "Electronic Devices",
    "VLSI",
  ],
  "Electrical Engineering": [
    "Electric Circuits",
    "Control Systems",
    "Electrical Machines",
    "Power Systems",
    "Analog Electronics",
    "Digital Electronics",
    "Signals & Systems",
    "Measurements",
  ],
};

export default function PracticePage() {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState([2]);
  const [questionCount, setQuestionCount] = useState([10]);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const getDifficultyLabel = (value: number) => {
    switch (value) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Hard";
      default:
        return "Medium";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Practice Session
            </h1>
            <p className="text-gray-300">Customize your practice session</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stream Selection */}
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5" />
                  Engineering Stream
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Select your engineering discipline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedStream}
                  onValueChange={setSelectedStream}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Choose your stream" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {streams.map((stream) => (
                      <SelectItem
                        key={stream}
                        value={stream}
                        className="text-white hover:bg-gray-700"
                      >
                        {stream}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Topic Selection */}
            {selectedStream && (
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Topics</CardTitle>
                  <CardDescription className="text-gray-400">
                    Select topics you want to practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {topics[selectedStream as keyof typeof topics]?.map(
                      (topic) => (
                        <Button
                          key={topic}
                          variant={
                            selectedTopics.includes(topic)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleTopicToggle(topic)}
                          className={
                            selectedTopics.includes(topic)
                              ? "justify-start bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0"
                              : "justify-start bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
                          }
                        >
                          {topic}
                        </Button>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Difficulty & Question Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Difficulty Level</CardTitle>
                  <CardDescription className="text-gray-400">
                    Adjust question difficulty
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={difficulty}
                      onValueChange={setDifficulty}
                      max={3}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Easy</span>
                    <span>Medium</span>
                    <span>Hard</span>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                      {getDifficultyLabel(difficulty[0])}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">
                    Number of Questions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Set practice session length
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="px-2">
                    <Slider
                      value={questionCount}
                      onValueChange={setQuestionCount}
                      max={50}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>5</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                      {questionCount[0]} Questions
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Brain className="h-5 w-5" />
                  Session Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-300">Stream</p>
                  <p className="text-sm text-gray-400">
                    {selectedStream || "Not selected"}
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Topics ({selectedTopics.length})
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTopics.length > 0 ? (
                      selectedTopics.map((topic) => (
                        <Badge
                          key={topic}
                          className="text-xs bg-gray-700 text-gray-300 border-gray-600"
                        >
                          {topic}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">None selected</p>
                    )}
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Difficulty
                  </p>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                    {getDifficultyLabel(difficulty[0])}
                  </Badge>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <p className="text-sm font-medium text-gray-300">Questions</p>
                  <p className="text-sm text-gray-400">
                    {questionCount[0]} questions
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <div>
                  <p className="text-sm font-medium text-gray-300">
                    Estimated Time
                  </p>
                  <p className="text-sm text-gray-400">
                    {Math.ceil(questionCount[0] * 2)} minutes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Link href="/quiz">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg"
                disabled={!selectedStream || selectedTopics.length === 0}
              >
                <Play className="h-4 w-4 mr-2" />
                Start Practice Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
