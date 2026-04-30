"use client"

import React, { useId, useState } from "react"
import { useRouter } from "next/navigation"
import { CircleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function PasswordForm({ redirectTo }: { redirectTo: string }) {
  const id = useId()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(redirectTo)
        router.refresh()
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <label htmlFor={id} className="block text-sm">
        This content is password-protected. Please enter the password to
        continue.
      </label>

      <div className="flex gap-x-3">
        <input
          id={id}
          type="password"
          maxLength={128}
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          autoFocus
          className={cn(
            "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-8 max-w-60 flex-1 rounded-lg border px-2.5 text-sm outline-none focus-visible:ring-3"
          )}
        />
        <Button type="submit" variant="secondary" disabled={loading}>
          Submit
        </Button>
      </div>

      {error && (
        <div className="text-destructive flex items-center gap-x-2 text-sm">
          <CircleAlert className="size-4" />
          <span>Incorrect password</span>
        </div>
      )}
    </form>
  )
}
