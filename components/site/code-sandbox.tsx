"use client"

import { useSyncExternalStore } from "react"
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react"

const noopSubscribe = () => () => {}

type CodeSandboxProps = {
  template?: SandpackPredefinedTemplate
  files: SandpackFiles
  dependencies?: Record<string, string>
  showConsole?: boolean
  showTabs?: boolean
  editorHeight?: number
}

export function CodeSandbox({
  template = "react",
  files,
  dependencies,
  showConsole = false,
  showTabs = true,
  editorHeight = 420,
}: CodeSandboxProps) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <div
        className="w-full rounded-lg bg-muted"
        style={{ height: editorHeight }}
      />
    )
  }

  return (
    <SandpackProvider
      template={template}
      theme="dark"
      files={files}
      customSetup={dependencies ? { dependencies } : undefined}
    >
      <SandpackLayout>
        <SandpackCodeEditor
          showTabs={showTabs}
          showLineNumbers
          style={{ height: editorHeight }}
        />
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton
          style={{ height: editorHeight }}
        />
      </SandpackLayout>
      {showConsole ? <SandpackConsole /> : null}
    </SandpackProvider>
  )
}
