import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/health',
  '/test', 
  '/debug',
  '/api/health'
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
    matcher: ["/((?!.*\\..*!_next).*)", "/", "/(api|trpc)(.*)"],
}