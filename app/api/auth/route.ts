import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { AUTH_COOKIE, authToken } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password } = body

    if (!password || typeof password !== "string" || password.length > 128) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const expected = process.env.SITE_PASSWORD ?? ""
    const expectedBuf = Buffer.from(expected, "utf8")
    const inputBuf = Buffer.from(password, "utf8")

    const success =
      expectedBuf.length > 0 &&
      expectedBuf.length === inputBuf.length &&
      crypto.timingSafeEqual(expectedBuf, inputBuf)

    if (!success) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const token = await authToken()

    const response = NextResponse.json({ success: true })
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
