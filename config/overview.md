# 配置总览

本文档概述 SoulDungeon 的完整配置体系和文件结构。

## 配置文件一览

| 文件 | 位置 | 用途 |
|---|---|---|
| `config.yml` | `plugins/SoulDungeon/config.yml` | 全局主配置 |
| `option.yml` | `plugins/SoulDungeon/dungeons/<副本>/option.yml` | 副本定义 |
| `monster.yml` | `plugins/SoulDungeon/dungeons/<副本>/monster.yml` | 怪物波次 |

## 配置目录结构

```text
plugins/SoulDungeon/
├── config.yml                          # [主配置] 全局选项、性能、Hook
├── dungeons/
│   ├── example/                        # 示例副本
│   │   ├── option.yml                  # [副本] 名称、地图、出生点
│   │   └── monster.yml                 # [怪物] 怪物组与脚本
│   └── <你的副本ID>/
│       ├── option.yml
│       └── monster.yml
└── maps/
    └── <世界名>/                       # 地图模板（/sd import 导入）
```

## 配置加载流程

1. 服务器启动 → 加载 `config.yml`
2. 发现 `dungeons/` 下所有副本目录
3. 为每个副本加载 `option.yml` 和 `monster.yml`
4. 执行 `/sd reload` 可热重载全部配置

## 最低配置要求

一个可运行的副本至少需要：

### option.yml

```yaml
# 必填
spawn: "world,0,80,0,0,0"

# 推荐
map:
  mode: INSTANCE
  world: "world"
```

### monster.yml

```yaml
groups:
  wave_1:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3}"
    condition:
      - "$kill{mob=ZOMBIE;amount=3}"
```

## 热重载

修改配置文件后无需重启服务器：

```text
/sd reload
```

此命令会重载所有副本配置，但不影响正在运行的副本实例。

## 下一步

- [主配置 (config.yml)](/config/main-config) — 全局选项详解
- [副本配置 (option.yml)](/config/dungeon) — 副本定义节点说明
- [怪物配置 (monster.yml)](/config/monster) — 怪物组和脚本完整文档
- [脚本动作](/config/scripts) — 全部内置脚本动作参考
- [地图系统](/config/map) — 地图导入和实例模式
