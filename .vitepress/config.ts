import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'SoulDungeon',
  description: 'Minecraft 现代化副本/地牢系统插件 —— 配置文件驱动、脚本化流程、实例隔离',
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/logo.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/logo.png' }],
    ['meta', { name: 'theme-color', content: '#8b5cf6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'SoulDungeon - Minecraft 副本插件文档' }],
    ['meta', { name: 'og:description', content: 'Minecraft 现代化副本/地牢系统插件，支持配置文件驱动、脚本化流程、实例隔离。' }],
  ],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    theme: {
      dark: 'github-dark',
      light: 'github-light',
    },
  },
  themeConfig: {
    siteTitle: 'SoulDungeon',
    logo: '/images/logo.png',
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '返回',
            noResultsText: '未找到结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '配置', link: '/config/dungeon', activeMatch: '/config/' },
      { text: '系统', link: '/systems/instance', activeMatch: '/systems/' },
      {
        text: '参考',
        items: [
          { text: '命令列表', link: '/reference/commands' },
          { text: '占位符', link: '/reference/placeholders' },
          { text: 'API 文档', link: '/reference/api' },
        ],
      },
      {
        text: 'v0.2.0',
        items: [
          { text: '更新日志', link: '/about/changelog' },
          { text: '路线图', link: '/about/roadmap' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始使用',
          collapsed: false,
          items: [
            { text: '项目介绍', link: '/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装部署', link: '/guide/installation' },
            { text: '设计理念', link: '/guide/design' },
          ],
        },
      ],
      '/config/': [
        {
          text: '配置说明',
          collapsed: false,
          items: [
            { text: '总览', link: '/config/overview' },
            { text: '主配置 (config.yml)', link: '/config/main-config' },
            { text: '副本配置 (option.yml)', link: '/config/dungeon' },
            { text: '怪物配置 (monster.yml)', link: '/config/monster' },
            { text: '脚本动作', link: '/config/scripts' },
            { text: '地图系统', link: '/config/map' },
          ],
        },
      ],
      '/systems/': [
        {
          text: '核心系统',
          collapsed: false,
          items: [
            { text: '副本实例', link: '/systems/instance' },
            { text: '怪物组系统', link: '/systems/monster-group' },
            { text: '队伍系统', link: '/systems/team' },
            { text: '区域系统', link: '/systems/region' },
            { text: '交互系统', link: '/systems/interaction' },
            { text: '奖励系统', link: '/systems/reward' },
            { text: '任务系统', link: '/systems/task' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '参考信息',
          collapsed: false,
          items: [
            { text: '命令列表', link: '/reference/commands' },
            { text: '占位符', link: '/reference/placeholders' },
            { text: 'API 文档', link: '/reference/api' },
            { text: '常见问题', link: '/reference/faq' },
          ],
        },
      ],
      '/about/': [
        {
          text: '关于项目',
          collapsed: false,
          items: [
            { text: '更新日志', link: '/about/changelog' },
            { text: '路线图', link: '/about/roadmap' },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '主题切换',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    editLink: {
      pattern: 'https://github.com/MySoulcutting/SoulDungeon/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MySoulcutting/SoulDungeon' },
    ],
    footer: {
      message: '基于 <a href="https://vitepress.dev" target="_blank">VitePress</a> 构建 · 使用 <a href="https://tabooproject.org" target="_blank">TabooLib</a> 框架',
      copyright: 'Copyright © 2026 SoulDungeon',
    },
  },
})
