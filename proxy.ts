import { NextRequest, NextResponse } from "next/server"
import { protectedRoutes } from "@/lib/site"
import { AUTH_COOKIE, authToken, constantTimeEqual } from "@/lib/auth"

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtected) return NextResponse.next()

  const cookie = req.cookies.get(AUTH_COOKIE)?.value
  if (cookie) {
    try {
      const expected = await authToken()
      if (constantTimeEqual(cookie, expected)) return NextResponse.next()
    } catch {
      // env vars missing — fall through to /verify
    }
  }

  const verifyUrl = new URL("/verify", req.url)
  verifyUrl.searchParams.set("from", pathname)
  return NextResponse.redirect(verifyUrl)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
