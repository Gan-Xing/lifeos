import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'pre',
  'code',
  'blockquote',
  'hr',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
])

const allowedAttributes: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'title'],
  code: ['class'],
  th: ['align'],
  td: ['align'],
}

export const renderMarkdown = async (source: string): Promise<string> => {
  const raw = await marked.parse(source, { breaks: true })

  return sanitizeHtml(raw, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ['http', 'https', 'mailto'],
  })
}
