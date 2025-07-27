"use client";

import dynamic from "next/dynamic";

// Import with SSR disabled
const QuizPage = dynamic(() => import("./QuizPageInner"), {
  ssr: false,
  loading: () => (
    <div className="text-white p-10 text-center">Loading Quiz...</div>
  ),
});

export default function QuizPageWrapper() {
  return <QuizPage />;
}
