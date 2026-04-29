import { codeToHtml } from "shiki"
import { CodeBlockCopyButton } from "@/components/site/code-block-copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string
  lang?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })

  return (
    <div className="relative">
      <div className="absolute top-4 right-2 flex h-lh items-center text-sm leading-relaxed">
        <CodeBlockCopyButton text={code} />
      </div>
      <div
        className="rounded border bg-card p-4 pr-12 text-sm leading-relaxed [&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:bg-transparent!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
