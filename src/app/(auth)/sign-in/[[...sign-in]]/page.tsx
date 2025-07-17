import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="p-1  bg-gradient-to-br from-amber-400/80 via-black to-amber-600/80 rounded-lg shadow-lg">
        <SignIn />
      </div>
    </div>
  );
}
