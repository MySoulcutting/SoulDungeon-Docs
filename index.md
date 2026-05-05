---
layout: home

hero:
  name: SoulDungeon
  text: Minecraft 现代化副本地牢插件
  tagline: 基于 TabooLib · 配置文件驱动 · 脚本化流程 · 实例隔离 · 支持 MythicMobs
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 脚本动作
      link: /config/scripts
    - theme: alt
      text: GitHub
      link: https://github.com/MySoulcutting/SoulDungeon

features:
  - icon: 🏰
    title: 独立副本实例
    details: 每次挑战自动复制地图模板创建隔离实例世界，结束后自动清理所有临时世界和怪物，杜绝污染。
    link: /systems/instance

  - icon: 👾
    title: 怪物波次系统
    details: 通过 monster.yml 定义怪物组、自动刷怪、击杀条件和波次推进脚本，支持原版实体和 MythicMobs。
    link: /systems/monster-group

  - icon: ⚡
    title: 脚本动作引擎
    details: 统一的 $action{key=value} 脚本格式，支持消息、标题、音效、传送、命令、药水等 10+ 内置动作。
    link: /config/scripts

  - icon: 🎯
    title: 实例池预热
    details: 预创建空闲实例世界，玩家进入副本时直接分配已就绪的世界，大幅降低加载等待时间。
    link: /config/main-config#性能优化

  - icon: 🖥️
    title: 调试命令
    details: 内置 /sd instances、/sd mobs、/sd group 等调试命令，实时查看副本运行状态和怪物进度。
    link: /reference/commands

  - icon: 🔧
    title: 模块化架构
    details: 副本配置结构清晰，每个副本独立目录，monster.yml 与 option.yml 分离，易于维护和版本控制。
    link: /config/overview

  - icon: 📋
    title: 在线编辑器
    details: 计划中的游戏内 GUI 编辑器，支持可视化选择区域、设置刷怪点、编辑脚本和测试副本。
    link: /about/roadmap

  - icon: 🔗
    title: 丰富的占位符
    details: 支持 <player>、<dungeon>、<instance>、<time> 等占位符，兼容 PlaceholderAPI 扩展。
    link: /reference/placeholders

  - icon: 🎁
    title: 灵活的奖励系统
    details: 支持命令、物品、经济等多种奖励类型，可配置首通、每日奖励和随机奖励池。
    link: /systems/reward
---

## 为什么选择 SoulDungeon？

SoulDungeon 是一个面向 Minecraft Bukkit/Paper 服务端的**现代化副本 / 地牢系统插件**。它通过清晰的 YAML 配置和直观的脚本 DSL，让服主能够在不编写代码的情况下创建丰富的副本体验。

### 核心优势

<div class="vp-doc" style="max-width:800px;margin:0 auto;">

| 特性 | SoulDungeon | 传统方案 |
|---|---|---|
| 配置方式 | 统一 `$action{key=value}` 脚本 | 分散的 YAML/JSON 嵌套 |
| 地图隔离 | 自动实例复制 + 实例池预热 | 手动管理世界目录 |
| 怪物对接 | 原版 + MythicMobs 无感切换 | 需要适配层 |
| 错误检测 | 配置诊断 + 行号定位 | 启动崩溃无提示 |
| 调试工具 | 实时运行状态查看 | 依赖日志分析 |
| 框架基础 | TabooLib 6.3.x | 原生 Bukkit API |

</div>

## 技术栈

<div class="vp-doc" style="max-width:800px;margin:0 auto;">

| 项目 | 说明 |
|---|---|
| **核心语言** | Kotlin |
| **构建工具** | Gradle |
| **框架** | TabooLib 6.3.x |
| **平台** | Bukkit / Paper 1.21.x |
| **Java 版本** | Java 21 |
| **可选依赖** | MythicMobs、PlaceholderAPI、Vault |

</div>

## 文档导航

::: tip 新手入门
建议从 [快速开始](/guide/getting-started) 开始，了解如何构建、安装和运行你的第一个副本。
:::

::: info 配置参考
如果你需要查找特定配置节点的说明，请查看 [配置总览](/config/overview) 和 [脚本动作文档](/config/scripts)。
:::

::: warning 当前版本
本插件目前处于 **v0.2.0** 早期开发阶段，部分功能仍在开发中。查看 [路线图](/about/roadmap) 了解完整规划。
:::

## 快速预览

一个完整的 Boss 战副本怪物配置示例：

```yaml
groups:
  wave_1:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3;radius=2}"
      - "$mob{type=VANILLA;name=SKELETON;point=2,80,0;amount=2;radius=2}"
    condition:
      - "$kill-any{mobname=ZOMBIE,SKELETON;amount=5}"
    start-script:
      - "$message{text=&e第一波怪物出现了！}"
    end-script:
      - "$message{text=&a小怪已清理，Boss 即将出现...}"
      - "$delay{time=100;script=start_boss}"

  boss:
    auto-start: false
    spawn:
      - "$mob{type=MYTHIC;name=CaveBoss;point=5,80,0;amount=1;level=5}"
    condition:
      - "$kill{mob=CaveBoss;amount=1}"
    end-script:
      - "$title{title=&a副本通关！;subtitle=&7奖励已发放;stay=60}"
      - "$sound{name=UI_TOAST_CHALLENGE_COMPLETE;volume=1}"
      - "$command{sender=console;command=say <player> 完成了副本}"
      - "$end{type=COMPLETE;delay=60}"

scripts:
  start_boss:
    - "$move{x=0;y=80;z=0}"
    - "$title{title=&cBoss 出现！;subtitle=&7准备战斗;stay=60}"
    - "$sound{name=ENTITY_WITHER_SPAWN;volume=1}"
    - "$heal{health=true;food=true}"
    - "$effect{name=SPEED;duration=200;amplifier=0}"
    - "$monstergroup{group=boss;operation=start}"
```
