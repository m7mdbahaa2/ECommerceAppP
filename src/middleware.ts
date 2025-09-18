import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const authRoutes = ["/signin", "/signup"];
  const protectedPaths = ["/cart", "/checkout", "/orders"];
  
  if(token&& authRoutes.includes(pathname)){
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  
  // if (!token) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // } else {
  //   if (
  //     request.nextUrl.pathname === "/signin" ||
  //     request.nextUrl.pathname === "/signup"
  //   ) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/cart","/signin","/signup"],
};
