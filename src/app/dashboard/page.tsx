"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, Clock, Target, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../_components/Header/page";
import appwriteServices from "@/appwrite/config";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import useZustandStore from "../store/quizZustandStore";
const recentActivities = [
  {
    title: "Data Structures - Trees",
    description: "Completed 15 questions • 87% accuracy",
    badge: "Computer Science",
    badgeGradient: "from-blue-400 to-blue-600",
  },
  {
    title: "Digital Logic Design",
    description: "Completed 20 questions • 92% accuracy",
    badge: "Electronics",
    badgeGradient: "from-pink-400 to-pink-600",
  },
  {
    title: "GATE 2023 - Set 1",
    description: "Previous year paper • 78% score",
    badge: "Previous Year",
    badgeGradient: "from-orange-500 to-red-600",
  },
];

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  const setUserDetails = useZustandStore((state) => state.setUserDetails);
  const [stats, setStats] = useState({
    questionsAttempted: 0,
    correctAnswers: 0,
    accuracy: 0,
    testattempted: 0,
    rank: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setUserDetails(user); // ✅ put this inside useEffect to avoid running on every render

    const fetchStats = async () => {
      try {
        const userStats = await appwriteServices.getUserStats(user?.id);
        setStats({
          questionsAttempted: userStats?.question_attempted || 0,
          correctAnswers: userStats?.question_corrected || 0,
          accuracy: userStats?.question_corrected
            ? Math.round(
                (userStats?.question_corrected /
                  userStats?.question_attempted) *
                  100
              )
            : 0,
          testattempted: userStats?.test_attempted || 0,
          rank: userStats?.global_rank || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const accuracy = Math.round(
    (stats?.correctAnswers / stats?.questionsAttempted) * 100
  );

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
        <Header />
        <div className="max-w-6xl mt-4 mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-10 w-10  rounded-full mx-auto mb-4 border-b-2 border-white  animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <Header />
      <div className="max-w-6xl mt-4 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400  to-amber-600 bg-clip-text text-transparent mb-2">
            MindGATE
          </h1>
          <p className="text-lg text-gray-300">
            Your AI-powered companion for GATE success
          </p>
        </div>

        {/* Stats Cards */}
        {/* Questions Attempted*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {loading ? (
            <Skeleton className="w-full bg-gradient-to-br from-blue-400 to-blue-700">
              <div className="flex items-center justify-between p-4">
                <p className="text-blue-100">Questions Attempted</p>

                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </Skeleton>
          ) : (
            <Card className="bg-gradient-to-br from-blue-400 to-blue-700  border-blue-400 text-white shadow-xl">
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
          )}
          {/*Accuracy */}
          {loading ? (
            <Skeleton className="w-full bg-gradient-to-br from-green-400 to-green-800">
              <div className="flex items-center justify-between p-4">
                <p className="text-green-100">Accuracy</p>
                <Trophy className="h-8 w-8 text-green-200" />
              </div>
            </Skeleton>
          ) : (
            <Card className="bg-gradient-to-br from-green-400  to-green-800 border-green-400 text-white shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Accuracy</p>
                    <p className="text-2xl font-bold">
                      {accuracy ? `${accuracy}%` : "N/A"}
                    </p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          )}
          {/* Total Test Attempted*/}

          {loading ? (
            <Skeleton className="w-full bg-gradient-to-br from-orange-400  to-orange-700">
              <div className="flex items-center justify-between p-4">
                <p className="text-orange-100">Test Attempted</p>
                <Zap className="h-8 w-8 text-orange-200" />
              </div>
            </Skeleton>
          ) : (
            <Card className="bg-gradient-to-br from-orange-400  to-orange-700 border-orange-500 text-white shadow-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Test Attempted</p>
                    <p className="text-2xl font-bold">{stats.testattempted}</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          )}
          {/* Global Rank */}

          {loading ? (
            <Skeleton className="w-full bg-gradient-to-br from-purple-400  to-purple-800">
              <div className="flex items-center justify-between p-4">
                <p className="text-purple-100">Global Rank</p>
                <Trophy className="h-8 w-8 text-purple-200" />
              </div>
            </Skeleton>
          ) : (
            <Card className="bg-gradient-to-br from-purple-400  to-purple-800 border-purple-500 text-white shadow-xl">
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
          )}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg group-hover:scale-110 transition-transform">
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
                <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-400/90 hover:to-amber-600/90 text-white border-0">
                  Start AI Practice
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-lg hover:shadow-blue-400/20 transition-all duration-300 cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg group-hover:scale-110 transition-transform">
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
                <Badge className="bg-orange-500 p-2 text-white">
                  Coming Soon
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-4">
                Access and practice with authentic GATE questions from previous
                years, organized by year and engineering stream.
              </p>
              <Link href={"/dashboard"}>
                <Button
                  disabled
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400/90 hover:to-blue-600/90 text-white border-0"
                >
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
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg border border-gray-600"
                >
                  <div>
                    <p className="font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                  <Badge
                    className={`bg-gradient-to-r ${activity.badgeGradient} text-white border-0`}
                  >
                    {activity.badge}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
