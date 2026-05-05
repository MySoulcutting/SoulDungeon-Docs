# SoulDungeon Docs

SoulDungeon 插件文档站，基于 [VitePress](https://vitepress.dev) 构建。

## 本地开发

```bash
npm install
npm run docs:dev
```

浏览器访问 `http://localhost:5173`。

## 构建部署

```bash
npm run docs:build     # 产物在 .vitepress/dist/
npm run docs:preview   # 本地预览构建结果
```

将 `dist/` 目录部署到任意静态服务器（Nginx、GitHub Pages 等）。

## 目录结构

```
├── .vitepress/        # VitePress 配置与主题
├── index.md           # 首页
├── guide/             # 指南：安装、快速开始、设计理念
├── config/            # 配置说明：副本、怪物、脚本、主配置
├── systems/           # 系统文档：实例、怪物组、区域、奖励
├── reference/         # 参考：命令、API、FAQ
└── about/             # 关于：更新日志、路线图
```
