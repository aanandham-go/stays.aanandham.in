export default function robots() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stays.aanandham.in';
  const siteUrl = rawUrl.includes('stays.aanandham.in') ? rawUrl.replace(/\/$/, '') : 'https://stays.aanandham.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/admin/*', '/cms', '/cms/*', '/api/', '/login', '/signup', '/pass/', '/marshal', '/marshal/*', '/checkin', '/checkin/*'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended'],
        allow: ['/', '/camps', '/camps/*', '/about', '/contact', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin', '/admin/*', '/cms', '/cms/*', '/api/', '/login', '/signup', '/pass/', '/marshal', '/marshal/*', '/checkin', '/checkin/*'],
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
