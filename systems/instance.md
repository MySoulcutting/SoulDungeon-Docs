# 副本实例

副本实例（DungeonInstance）是 SoulDungeon 中最核心的运行单元。

## 什么是副本实例

每次玩家通过 `/sd start <副本>` 开始挑战时，插件会创建一个独立的副本实例。每个实例拥有：

- 独立的世界副本（基于地图模板复制）
- 独立的怪物追踪列表
- 独立的怪物组运行状态
- 独立的击杀计数
- 独立的脚本执行上下文
- 独立的时间计时器

## 实例生命周期

```text
          /sd start
              │
              ▼
         ┌─────────┐
         │ LOADING │  地图复制中
         └────┬────┘
              │
              ▼
         ┌─────────┐
         │ RUNNING │  副本进行中
         └────┬────┘
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
┌─────────┐ ┌────────┐ ┌───────────┐
│COMPLETED│ │ FAILED │ │ADMIN_STOP │
└────┬────┘ └───┬────┘ └─────┬─────┘
     │          │            │
     └──────────┼────────────┘
                ▼
         ┌─────────┐
         │CLEANING │  清理世界中
         └────┬────┘
              │
              ▼
         ┌─────────┐
         │  CLOSED │  已关闭
         └─────────┘
```

## 实例状态

| 状态 | 说明 |
|---|---|
| `LOADING` | 地图正在复制，玩家等待进入。 |
| `RUNNING` | 副本正常运行中。 |
| `COMPLETED` | 玩家通关（触发 `$end{type=COMPLETE}`）。 |
| `FAILED` | 挑战失败（触发 `$end{type=FAILURE}`）。 |
| `ADMIN_STOP` | 管理员强制结束（`/sd stop`）。 |
| `CLEANING` | 正在清理临时世界和怪物。 |
| `CLOSED` | 实例已完全关闭。 |

## 查看运行实例

```text
/sd instances
```

输出示例：

```text
运行中的副本实例：
- sd_example_a1b2c3 [example] RUNNING (玩家: Steve, Alex)
```

## 管理实例

### 停止实例

```text
/sd stop <实例名>
```

例如：

```text
/sd stop sd_example_a1b2c3
```

### 强制通关/失败

在副本中执行：

```text
/sd complete    # 判定为通关
/sd fail        # 判定为失败
```

## 实例清理

### 自动清理

副本结束后（无论通关、失败还是强制结束），插件会自动：

1. 执行结束清理脚本
2. 清除所有怪物实体
3. 卸载实例世界
4. 删除实例世界目录

### 配置控制

```yaml
# config.yml
instance:
  auto-clean: true        # 启用自动清理

monster:
  remove-on-cleanup: true # 清理时移除怪物
```

## 实例池

为了降低玩家进入副本时的地图复制等待时间，SoulDungeon 支持实例池预热：

```yaml
performance:
  instance-pool:
    enable: true
    min-idle: 1          # 保持至少 1 个空闲实例
    max-idle: 4          # 最多 4 个空闲实例
```

工作流程：

1. 服务器启动 / 配置重载时，后台创建 `min-idle` 个空闲实例
2. 玩家进入副本时，直接从池中取出就绪实例
3. 取出后如果池中实例数 < `min-idle`，后台补充
4. 空闲实例数超过 `max-idle` 时，回收多余的实例

## 调试实例性能

```text
/sd bench map      # 测试地图复制速度
/sd bench load     # 测试世界加载速度
/sd bench runtime  # 查看运行时性能数据
```
