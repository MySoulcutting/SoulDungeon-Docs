# 交互系统

交互系统监听副本内各种事件并触发脚本，是剧本化副本流程的核心。

::: info 开发状态
交互系统为**计划中功能**，当前 v0.2.0 中脚本只能在怪物组生命周期内执行。以下内容为设计规划。
:::

## 交互类型

| 类型 | 触发条件 | 用途 |
|---|---|---|
| `KILL` | 玩家击杀指定怪物 | 击杀任务、波次推进 |
| `ENTITY_DEATH` | 指定实体死亡 | Boss 阶段、NPC 死亡 |
| `WALK` | 玩家经过坐标或区域 | 陷阱、剧情触发 |
| `AREA` | 玩家进入指定区域 | Boss 房、占点 |
| `ENTITY_AREA` | 怪物进入指定区域 | 护送、防守 |
| `BLOCK_INTERACT` | 玩家点击指定方块 | 机关、开门 |
| `BLOCK_BREAK` | 玩家破坏指定方块 | 采集、破坏目标 |
| `BLOCK_PLACE` | 玩家放置指定方块 | 修复、建造目标 |
| `COMMAND` | 玩家输入指定命令 | 指令触发 |
| `PLAYER_DEATH` | 玩家死亡 | 复活逻辑 |
| `PLAYER_DROP` | 玩家丢弃物品 | 祭坛、献祭 |
| `TIMER` | 副本时间到达某节点 | 倒计时 |
| `CUSTOM` | API 注册的自定义类型 | 扩展玩法 |

## 配置示例

### 点击机关开门

```yaml
type: BLOCK_INTERACT
first: true              # 只触发一次
auto-start: true

parameter:
  location: "120,65,130"
  action: RIGHT
  hand: "none"

script:
  - "$message{text=&e机关被启动了！}"
  - "$obstacle{group=door_1;operation=delete}"
  - "$monstergroup{group=wave_2;operation=start}"
```

### 玩家进入 Boss 房

```yaml
type: AREA
first: true
auto-start: true

parameter:
  area: "boss_room"
  player-size: "1"

script:
  - "$title{title=&cBoss 苏醒了！;subtitle=&7准备战斗}"
  - "$monstergroup{group=boss;operation=start}"
```

## 与怪物组的关系

交互系统比怪物组更灵活，可以在副本中定义独立于怪物波次的事件触发器。两者配合使用：

- **怪物组**：控制战斗波次和击杀流程
- **交互系统**：处理机关、区域、方块等环境交互
