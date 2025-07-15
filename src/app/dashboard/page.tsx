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
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Trophy, Target, Clock, Zap } from "lucide-react";
import Link from "next/link";
import Header from "../_components/Header/page";

export default function Dashboard() {
  const [stats] = useState({
    questionsAttempted: 1247,
    correctAnswers: 892,
    streak: 12,
    rank: 156,
  });
  const accuracy = Math.round(
    (stats.correctAnswers / stats.questionsAttempted) * 100
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <Header />
      <div className="max-w-6xl mt-4 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-200 to-orange-500 bg-clip-text text-transparent mb-2">
            MindGATE
          </h1>
          <p className="text-lg text-gray-300">
            Your AI-powered companion for GATE success
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 border-blue-500/20 text-white shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Questions Attempted</p>
                  <p className="text-2xl font-bold">
                    {stats.questionsAttempted}
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 border-green-500/20 text-white shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Accuracy</p>
                  <p className="text-2xl font-bold">{accuracy}%</p>
                </div>
                <Trophy className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 border-orange-500/20 text-white shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Current Streak</p>
                  <p className="text-2xl font-bold">{stats.streak}</p>
                </div>
                <Zap className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800 border-purple-500/20 text-white shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Global Rank</p>
                  <p className="text-2xl font-bold">#{stats.rank}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">
                    AI Practice Session
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Generate custom questions with AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                Create personalized practice sessions with AI-generated
                questions tailored to your chosen topics, difficulty level, and
                engineering stream.
              </p>
              <Link href="/practice">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                  Start AI Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">
                    Previous Year Papers
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Practice with real GATE questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                Access and practice with authentic GATE questions from previous
                years, organized by year and engineering stream.
              </p>
              <Link href="/previous-papers">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
                  Browse Papers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg border border-gray-600/50">
                <div>
                  <p className="font-medium text-white">
                    Data Structures - Trees
                  </p>
                  <p className="text-sm text-gray-300">
                    Completed 15 questions • 87% accuracy
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                  Computer Science
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg border border-gray-600/50">
                <div>
                  <p className="font-medium text-white">Digital Logic Design</p>
                  <p className="text-sm text-gray-300">
                    Completed 20 questions • 92% accuracy
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                  Electronics
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg border border-gray-600/50">
                <div>
                  <p className="font-medium text-white">GATE 2023 - Set 1</p>
                  <p className="text-sm text-gray-300">
                    Previous year paper • 78% score
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                  Previous Year
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
