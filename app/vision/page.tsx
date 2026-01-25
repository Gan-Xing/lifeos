import fs from 'node:fs/promises'
import path from 'node:path'

import DocsHeader from '@/components/DocsHeader'
import { renderMarkdown } from '@/lib/markdown'

const visionPath = path.join(process.cwd(), 'docs', 'PRODUCT_VISION.md')

export default async function VisionPage() {
  let visionText = ''
  let visionHtml = ''

  try {
    visionText = await fs.readFile(visionPath, 'utf8')
    visionHtml = renderMarkdown(visionText)
  } catch {
    visionText = '未找到 PRODUCT_VISION.md，请确认 docs/PRODUCT_VISION.md 是否存在。'
    visionHtml = renderMarkdown(visionText)
  }

  return (
    <main className="hero-sky min-h-screen">
      <div className="grid-halo min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12">
          <DocsHeader kind="vision" showBack />

          <section className="glass-panel rounded-3xl p-8">
            <div
              className="markdown text-sm text-muted"
              dangerouslySetInnerHTML={{ __html: visionHtml }}
            />
          </section>
        </div>
      </div>
    </main>
  )
}
