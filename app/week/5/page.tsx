import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"

export const metadata: Metadata = {
  title: "Week 5",
}

export default function Week5Page() {
  return (
    <Section>
      <Content>
        <div className="space-y-6">
          <h1 className="text-3xl font-medium tracking-tight">Week 5</h1>
          <p className="leading-relaxed text-muted-foreground">Coming soon.</p>
        </div>
      </Content>
    </Section>
  )
}
