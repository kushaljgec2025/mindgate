import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
//Protected Routes
// This middleware will protect all routes except that match the provided patterns
const isPrivateRoute = createRouteMatcher(["/dasboard(.*)"]);

// This middleware will run for all requests, protecting the specified routes
// and allowing public access to others.

export default clerkMiddleware(async (auth, req) => {
  if (isPrivateRoute(req)) {
    await auth.protect();
  }
});

// This configuration specifies which routes the middleware should run on.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
