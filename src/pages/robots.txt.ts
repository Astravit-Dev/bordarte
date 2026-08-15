import type { APIRoute } from 'astro'
import { siteConfig } from '@/lib/site-config'

/**
 * Search crawlers and AI/agent crawlers are both allowed explicitly. Naming the
 * agent user-agents rather than relying on the wildcard means a future
 * tightening of one group does not silently change the other.
 */
const AGENT_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
]

export const GET: APIRoute = () => {
  const body = [
    '# Bordarte — bordados personalizados en Montevideo, Uruguay',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    ...AGENT_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${siteConfig.url}/sitemap-index.xml`,
    '',
    '# Structured summary for language models and browsing agents',
    `# ${siteConfig.url}/llms.txt`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
