import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <nav className="border-b border-gray-800 bg-transparent z-2 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              GATE Prep Master
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Pricing - <strong>FREE</strong>
            </Button>

            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
