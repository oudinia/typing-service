import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Typing Service Documentation",
  description: "Documentation for the Typing Service library",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'GitHub', link: 'https://github.com/yourusername/typing-service' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/' },
          { text: 'Architecture', link: '/architecture' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Typing Service', link: '/components/typing-service' },
          { text: 'Typing Store', link: '/components/typing-store' },
          { text: 'Signals', link: '/components/signals' }
        ]
      },
      {
        text: 'Testing',
        items: [
          { text: 'Test Suite', link: '/testing/test-suite' }
        ]
      },
      {
        text: 'Utils',
        items: [
          { text: 'Calculators', link: '/utils/calculators' }
        ]
      },
      {
        text: 'Best Practices',
        items: [
          { text: 'Development', link: '/best-practices/development' }
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024'
    },
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/typing-service' }
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ]
})