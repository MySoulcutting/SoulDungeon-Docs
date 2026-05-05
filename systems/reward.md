# 奖励系统

奖励系统控制副本通关或达成条件后发放的奖励内容。

::: info 开发状态
奖励系统在 v0.2.0 中可通过 `$command` 脚本实现基础奖励发放。完整的奖励配置系统为计划中功能。
:::

## 当前实现 (v0.2.0)

目前通过 `$command` 脚本在怪物组 `end-script` 中发放奖励：

```yaml
end-script:
  # 发放钻石
  - "$command{sender=console;command=give <player> diamond 3}"
  # 发放经验
  - "$command{sender=console;command=xp add <player> 100 levels}"
  # 发放经济（需要 Vault）
  - "$command{sender=console;command=eco give <player> 500}"
  # 全服公告
  - "$command{sender=console;command=say <player> 通关了 <dungeon:name>！}"
```

## 计划中的奖励类型

| 类型 | 说明 |
|---|---|
| `COMMAND` | 执行命令奖励 |
| `ITEM` | 直接发放物品 |
| `MONEY` | 经济奖励（依赖 Vault） |
| `EXP` | 经验奖励 |
| `POINT` | 积分奖励 |
| `RANDOM` | 随机奖励池 |
| `FIRST_CLEAR` | 首次通关专用奖励 |
| `DAILY` | 每日可领取奖励 |
| `WEEKLY` | 每周可领取奖励 |

## 计划配置格式

```yaml
# 未来将独立为 reward.yml
rewards:
  default:
    first-clear:
      - "$command{text=eco give <player:name> 1000}"
      - "$message{text=&a首通奖励：1000 金币！}"

    normal:
      - "$command{text=give <player> diamond 3}"
      - "$command{text=eco give <player:name> 300}"
```

## 奖励发放时机

| 时机 | 说明 |
|---|---|
| 通关时 | 满足副本通关条件 |
| 阶段完成 | 完成特定怪物组 |
| 首次通关 | 该玩家/队伍第一次通关此副本 |
| 每日首通 | 当天第一次通关 |

## 当前替代方案

在完整的奖励系统就绪前，使用 `$command` 配合其他插件可以实现丰富的奖励：

```yaml
end-script:
  # 使用 ItemsAdder 发放物品
  - "$command{sender=console;command=ia give <player> dungeon_key 1}"
  # 使用 MMOItems 发放物品
  - "$command{sender=console;command=mmoitems give SWORD DUNGEON_SWORD <player> 1}"
  # 使用 PlayerPoints 发放积分
  - "$command{sender=console;command=points give <player> 100}"
```
