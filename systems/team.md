# 队伍系统

SoulDungeon 内置轻量队伍系统，用于控制副本的多人挑战。

::: info 开发状态
队伍系统为**计划中功能**，当前 v0.2.0 以单人副本为主。以下内容为设计规划。
:::

## 设计目标

- 支持多人同时进入副本
- 队伍内玩家共享副本进度
- 队长控制副本开始
- 可对接第三方组队插件

## 计划命令

| 命令 | 说明 |
|---|---|
| `/sd team create` | 创建队伍 |
| `/sd team invite <玩家>` | 邀请玩家加入 |
| `/sd team accept <玩家>` | 接受邀请 |
| `/sd team deny <玩家>` | 拒绝邀请 |
| `/sd team kick <玩家>` | 踢出队员 |
| `/sd team quit` | 离开队伍 |
| `/sd team transfer <玩家>` | 转让队长 |
| `/sd team disband` | 解散队伍 |

## 配置规划

```yaml
# option.yml 中的队伍配置
team:
  enable: true           # 启用队伍要求
  min-size: 1            # 最少人数
  max-size: 5            # 最多人数
  leader-only-start: true # 仅队长可以开始副本
```

## 副本人数限制

```yaml
start-condition:
  - "$team{min=1;max=5;message=队伍人数需要 1~5 人}"
```

## 第三方对接

计划支持通过 API 对接第三方组队插件，允许服务端使用现有的组队系统而非 SoulDungeon 内置队伍。
