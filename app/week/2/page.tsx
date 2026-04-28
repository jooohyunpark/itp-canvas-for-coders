import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Grid, GridItem } from "@/components/ui/teul"

export const metadata: Metadata = {
  title: "Week 2",
}

export default function Week2Page() {
  return (
    <Section>
      <Content>
        <Grid>
          <GridItem size={{ base: 12 }} className="space-y-6">
            <h1 className="text-3xl font-medium tracking-tight">Week 2</h1>
            <p className="leading-relaxed text-muted-foreground">
              Coming soon.
            </p>
          </GridItem>
        </Grid>
      </Content>
    </Section>
  )
}
