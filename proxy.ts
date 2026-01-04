import { auth } from "@/auth";

export default auth((req) => {
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoggedIn = !!req.auth;

  if (isDashboardRoute && !isLoggedIn) {
     return Response.redirect(new URL("/login", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};