# 区域系统

区域系统允许在副本中定义矩形区域，用于玩家进入检测、刷怪范围限制和条件判断。

::: info 开发状态
区域系统为**计划中功能**，当前 v0.2.0 中尚未实现。以下内容为设计规划。
:::

## 设计目标

- 定义副本内功能区域（Boss 房、安全区、结算区等）
- 玩家进入/离开区域时触发脚本
- 限制脚本效果范围（只影响区域内玩家）
- 支持区域内的怪物数量统计

## 区域定义

```yaml
# option.yml 中的区域配置
areas:
  start_room:
    pos1: "100,60,100"
    pos2: "120,80,120"

  boss_room:
    pos1: "150,60,150"
    pos2: "180,90,180"

  reward_room:
    pos1: "200,60,200"
    pos2: "215,75,215"
```

## 脚本中使用区域

```text
# 只对 boss_room 内的玩家发送消息
"$message{text=&c危险区域！} @player ~[boss_room]"

# 判断区域内是否有玩家
"$condition{type=area;area=boss_room;player-size=>0;then=start_boss}"

# 判断区域内怪物数量
"$condition{type=area;area=reward_room;mob-type=ZOMBIE;mob-amount=<1}"
```

## 交互触发

配合交互系统，玩家进入区域可触发事件：

```yaml
# 玩家进入 Boss 房时触发
type: AREA
parameter:
  area: "boss_room"
  player-size: "1"
script:
  - "$message{text=&cBoss 苏醒了！}"
  - "$monstergroup{group=boss;operation=start}"
```
