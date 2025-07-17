"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sampleQuestions } from "./(data)/staticData";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Brain,
  Trophy,
  Target,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";
import useQuizZustandStore from "./store/quizZustandStore";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description:
      "Generate unlimited practice questions tailored to your learning needs with advanced AI technology.",
    gradient: "from-yellow-500 to-orange-600",
    status: "active",
  },
  {
    icon: BookOpen,
    title: "Previous Year Papers",
    description:
      "Access authentic GATE questions from past years, organized by stream and difficulty level.",
    gradient: "from-green-400 to-emerald-700",
    status: "Cooming Soon",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "Customize topics, difficulty levels, and question counts to match your preparation strategy.",
    gradient: "from-pink-400 to-red-600",
    status: "active",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description:
      "Track your progress with detailed analytics and identify areas that need improvement.",
    gradient: "from-orange-300 to-red-600",
    status: "active",
  },
  {
    icon: Trophy,
    title: "Gamified Experience",
    description:
      "Stay motivated with streaks, achievements, and competitive leaderboards.",
    gradient: "from-violet-500 to-indigo-600",
    status: "active",
  },
  {
    icon: Clock,
    title: "Timed Practice",
    description:
      "Simulate real exam conditions with timed practice sessions and instant feedback.",
    gradient: "from-teal-400 to-blue-500",
    status: "active",
  },
];

const testimonials = [
  {
    name: "Arjun Sharma DEMO",
    role: "GATE CS 2023 - AIR 45",
    content:
      "GATE Prep Master's AI questions helped me identify my weak areas. The personalized practice sessions were game-changing!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Priya Patel DEMO",
    role: "GATE ECE 2023 - AIR 78",
    content:
      "The previous year papers section is incredibly well-organized. I could practice systematically and track my improvement.",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Rahul Kumar DEMO",
    role: "GATE ME 2023 - AIR 156",
    content:
      "The gamified interface kept me motivated throughout my preparation. The streak system really works!",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
const showToast = (title: string, type: "success" | "error") => {
  const toastFn = type === "error" ? toast.error : toast.success;
  toastFn(title, {
    duration: 2000,
  });
};

const stats = [
  { number: "1K+", label: "Active Students", icon: Users },
  { number: "5K+", label: "Questions Generated", icon: Brain },
  { number: "95%", label: "Success Rate", icon: Trophy },
  { number: "4.9/5", label: "User Rating", icon: Star },
];

export default function LandingPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Navigation */}
      <nav className="border-b  border-gray-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 rounded-b-lg ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex md:flex-row flex-col  items-center md:gap-2 gap-1 ">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-200 to-amber-600 rounded-lg flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="md:text-xl text-sm font-bold bg-gradient-to-r from-zinc-200 to-amber-600  bg-clip-text text-transparent">
                MindGATE
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button className="border-amber-600 border">Alpha Version</Button>
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-amber-400  to-amber-600 hover:from-amber-600 hover:to-amber-600 text-white border-0 cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r  from-black-600/10 to-zinc-600/10 blur-3xl"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-orange-600 via-amber-500 to-amber-600 text-zinc-50 border-yellow-300 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered GATE Preparation
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-amber-200 to-amber-600 bg-clip-text text-transparent">
              Master GATE
            </span>
            <br />
            <span className="text-white">
              with{" "}
              <span className="bg-gradient-to-r from-orange-600 font-extrabold   to-amber-100 bg-clip-text text-transparent">
                AI
              </span>{" "}
              Precision
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your GATE preparation with our AI-powered platform. Get
            personalized questions, track your progress, and achieve your dream
            rank with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => {
                showToast("Feature coming soon ! for now login", "error");
              }}
              size="lg"
              className="bg-gradient-to-r from-amber-400  to-amber-600 hover:from-amber-400/90 hover:to-amber-600/90 text-white border-0 cursor-pointer px-8 py-6 text-lg"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Free Practice
            </Button>

            <Button
              onClick={() => {
                showToast("Feature coming soon ! for now login", "error");
              }}
              size="lg"
              variant="outline"
              className="bg-gray-800/50 border-amber-600 text-white hover:bg-gray-700 hover:text-white px-8 py-6 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:from-amber-400/40  hover:to-zinc-900/10 border-gray-700 backdrop-blur-sm"
              >
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-500 mb-4">
              Why Choose GATE Prep Master?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology
              with proven learning methodologies to give you the competitive
              edge you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12  bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      {feature.status != "active" && (
                        <Badge className="bg-orange-500 p-2 text-white">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-500 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Choose Your Stream
              </h3>
              <p className="text-gray-300">
                Select your engineering discipline and customize your learning
                preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-300 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Practice Smart
              </h3>
              <p className="text-gray-300">
                Get AI-generated questions tailored to your weak areas and
                learning pace.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Track Progress
              </h3>
              <p className="text-gray-300">
                Monitor your improvement with detailed analytics and achieve
                your target rank.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of students who achieved their GATE dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-zinc-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your GATE Exam?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of successful students and start your journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
            <Button className="bg-gradient-to-r from-amber-400  to-amber-600 hover:from-amber-400/90 hover:to-amber-600/90  text-white border-0 whitespace-nowrap">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <p className="text-sm text-gray-400">Free for now.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-200 to-amber-600  rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-zinc-200 to-amber-600 bg-clip-text text-transparent">
                  MindGATE
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered GATE preparation platform helping students achieve
                their dreams.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>AI Question Generation</li>
                <li>Previous Year Papers</li>
                <li>Performance Analytics</li>
                <li>Gamified Learning</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Streams</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Computer Science</li>
                <li>Electronics & Communication</li>
                <li>Electrical Engineering</li>
                <li>Mechanical Engineering</li>
                <li>Civil Engineering</li>
                <li>Instrumentation Engineering</li>
                <li>Chemical Engineering</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 MindGATE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
