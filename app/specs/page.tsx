import fs from 'node:fs/promises'
import path from 'node:path'

import DocsHeader from '@/components/DocsHeader'
import { renderMarkdown } from '@/lib/markdown'

const specsPath = path.join(process.cwd(), 'docs', 'PRODUCT_REQUIREMENTS.md')

export default async function SpecsPage() {
  let specsText = ''
  let specsHtml = ''

  try {
    specsText = await fs.readFile(specsPath, 'utf8')
    specsHtml = renderMarkdown(specsText)
  } catch {
    specsText = '未找到 PRODUCT_REQUIREMENTS.md，请确认 docs/PRODUCT_REQUIREMENTS.md 是否存在。'
    specsHtml = renderMarkdown(specsText)
  }

  return (
    <main className="hero-sky min-h-screen">
      <div className="grid-halo min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12">
          <DocsHeader kind="specs" />

          <section className="glass-panel rounded-3xl p-8">
            <div
              className="markdown text-sm text-muted"
              dangerouslySetInnerHTML={{ __html: specsHtml }}
            />
          </section>
        </div>
      </div>
    </main>
  )
}
