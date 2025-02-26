import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up"], // Allow public access to these routes
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"], // Apply to all pages except static assets
};



