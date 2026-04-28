import { cn } from "@/lib/utils"

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("py-8 sm:py-12 md:py-16 lg:py-20", className)}
      {...props}
    />
  )
}
