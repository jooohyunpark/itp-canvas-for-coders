import { NextRequest, NextResponse } from "next/server"
import { protectedRoutes } from "@/lib/site"

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtected) return NextResponse.next()

  const auth = req.cookies.get("site_auth")
  if (auth?.value === "1") return NextResponse.next()

  const verifyUrl = new URL("/verify", req.url)
  verifyUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(verifyUrl)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
