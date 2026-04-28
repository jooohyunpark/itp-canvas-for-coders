"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // next-themes only knows the real theme on the client, so we must render
  // a neutral placeholder for SSR + first paint to avoid hydration mismatch.
  // useSyncExternalStore is React's built-in "server value vs. client value"
  // primitive: getServerSnapshot runs on SSR + initial hydration, getSnapshot
  // runs after — so `mounted` is false on the server, true thereafter, with
  // no setState-in-effect (which react-hooks/set-state-in-effect flags).
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return <div className="h-8 w-[104px] rounded-lg bg-muted" />
  }

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList>
        <TabsTrigger value="system" aria-label="System theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <path d="M8 21h8" />
            <path d="M12 17v4" />
          </svg>
        </TabsTrigger>
        <TabsTrigger value="light" aria-label="Light theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </TabsTrigger>
        <TabsTrigger value="dark" aria-label="Dark theme">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
