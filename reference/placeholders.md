# 占位符参考

本文档列出 SoulDungeon 支持的全部占位符。

## 玩家占位符

| 占位符 | 说明 | 示例值 |
|---|---|---|
| `<player>` | 玩家名称 | `Steve` |
| `<player:name>` | 玩家名称（同 `<player>`） | `Steve` |
| `<player:uuid>` | 玩家 UUID | `a1b2c3d4-...` |

::: tip 兼容性
计划支持 PlaceholderAPI 集成，届时可通过 `%souldungeon_xxx%` 格式在聊天、计分板等场景使用。
:::

## 副本占位符

| 占位符 | 说明 | 示例值 |
|---|---|---|
| `<dungeon>` | 副本 ID | `example` |
| `<dungeon:name>` | 副本显示名 | `示例副本` |

## 实例占位符

| 占位符 | 说明 | 示例值 |
|---|---|---|
| `<instance>` | 当前副本实例 ID | `sd_example_a1b2c3` |
| `<time>` | 副本已运行秒数 | `120` |

## 使用场景

占位符目前主要用于 `$command` 脚本动作：

```yaml
# 全服公告通关信息
- "$command{sender=console;command=say <player> 用时 <time> 秒完成了 <dungeon:name>}"

# 发放个性化奖励
- "$command{sender=console;command=give <player> diamond 1}"

# 记录通关日志
- "$command{sender=console;command=log Player <player:uuid> cleared dungeon <instance>}"
```

## 计划中的扩展

| 占位符 | 用途 | 状态 |
|---|---|---|
| `<team:size>` | 队伍人数 | 计划中 |
| `<team:leader>` | 队长名 | 计划中 |
| `<area:xxx:players>` | 区域玩家数 | 计划中 |
| `<data:xxx>` | 副本变量 | 计划中 |
| `<mob:alive>` | 存活的副本怪物数 | 计划中 |
| `%souldungeon_best_time_<副本ID>%` | PlaceholderAPI - 最佳时间 | 计划中 |
| `%souldungeon_clear_count_<副本ID>%` | PlaceholderAPI - 通关次数 | 计划中 |

## PlaceholderAPI 集成

当 PlaceholderAPI 集成就绪后，可在任何支持 PAPI 的地方使用：

```text
你的最快通关记录：%souldungeon_best_time_goblin_cave% 秒
已通关次数：%souldungeon_clear_count_goblin_cave% 次
```
