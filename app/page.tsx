import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Grid, GridItem } from "@/components/ui/teul"

export default function Page() {
  return (
    <div>
      <Section>
        <Content>
          <Grid>
            <GridItem size={{ base: 12 }} className="space-y-6">
              <h1 className="text-3xl font-medium tracking-tight">
                Canvas for Coders
              </h1>
              <p className="leading-relaxed text-muted-foreground">
                Web browser is a twenty-first century canvas. This course
                explores creative practice with Three.js and React Three Fiber,
                guiding students in crafting visual and conceptual experiences
                that exist natively on the web.
              </p>
            </GridItem>
          </Grid>
        </Content>
      </Section>
    </div>
  )
}
