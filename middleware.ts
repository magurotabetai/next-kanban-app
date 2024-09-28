import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   publicRoutes: ["/", "/api/webhook"],
//   afterAuth(auth, req) {
//     if (auth.userId && auth.isPublicRoute) {
//       let path = "/select-org";

//       if (auth.orgId) {
//         path = `/organization/${auth.orgId}`;
//       }

//       const orgSelection = new URL(path, req.url);
//       return NextResponse.redirect(orgSelection);
//     }

//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }

//     if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//       const orgSelection = new URL("/select-org", req.url);
//       return NextResponse.redirect(orgSelection);
//     }
//   },
// });

const isPublicRoute = createRouteMatcher(["/", "/api/webhook"]);

export default clerkMiddleware((auth, request) => {
  const { userId, orgId } = getAuth(request);
  const pathname = request.nextUrl.pathname;

  // 1. Public route but user is authenticated
  if (userId && isPublicRoute(request)) {
    let path = "/select-org";

    if (orgId) {
      path = `/organization/${orgId}`;
    }

    const orgSelection = new URL(path, request.url);
    return NextResponse.redirect(orgSelection);
  }

  // 2. Private route but user is not authenticated
  if (!userId && !isPublicRoute(request)) {
    auth().redirectToSignIn({ returnBackUrl: request.url });
  }

  // 3. Authenticated user but no org selected
  if (userId && !orgId && pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", request.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
