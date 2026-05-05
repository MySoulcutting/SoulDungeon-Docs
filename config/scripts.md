# SoulDungeon 脚本动作

脚本动作用于在怪物组启动、完成或延迟脚本组中触发副本事件，例如发消息、播放声音、启动下一波怪物、结束副本等。

## 统一格式

```yaml
- "$动作名{参数1=值1;参数2=值2} @目标"
```

示例：

```yaml
- "$message{text=&a第一波已清理。} @player"
- "$delay{time=100;script=start_boss} @dungeon"
```

规则：

- 动作名以 `$` 开头，例如 `$message`。
- 参数写在 `{}` 中。
- 参数之间使用英文分号 `;` 分隔。
- 参数键和值之间使用 `=` 连接。
- 整行建议使用 YAML 双引号包起来。
- 参数键不区分大小写，建议统一使用小写。

## 可用位置

`monster.yml` 中支持以下位置：

```yaml
groups:
  wave_1:
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3} @dungeon"
    condition:
      - "$kill{mob=ZOMBIE;amount=3} @system"
    start-script:
      - "$message{text=&e怪物出现！} @player"
    end-script:
      - "$delay{time=100;script=start_boss} @dungeon"

scripts:
  start_boss:
    - "$move{x=0;y=80;z=0;yaw=0;pitch=90} @player"
    - "$title{title=&cBoss 出现！;subtitle=&7准备战斗;stay=60} @player"
    - "$monstergroup{group=boss;operation=start} @dungeon"
```

注意：

- `spawn` 只允许 `$mob`。
- `condition` 只允许 `$kill` 或 `$kill-any`。
- `start-script`、`end-script` 与顶层 `scripts.<脚本组ID>` 支持 `$message`、`$monstergroup`、`$end`、`$delay`、`$title`、`$sound`、`$command`、`$heal`、`$effect`、`$move`。

## 目标说明

| 目标 | 说明 |
|---|---|
| `@player` | 面向副本内在线玩家。多数玩家动作默认使用此行为。 |
| `@dungeon` | 面向当前副本实例上下文，例如启动怪物组、结束副本或在副本世界坐标播放声音。 |
| `@system` | 系统目标，通常用于条件或控制台输出。 |
| `@console` | 控制台目标，主要用于消息或无玩家上下文命令。 |

未填写目标时，大多数玩家动作会按 `@player` 处理。

## `$mob` 生成怪物

`$mob` 只用于 `groups.<id>.spawn`。

```yaml
- "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3;radius=2} @dungeon"
- "$mob{type=MYTHIC;name=CaveBoss;point=5,80,0;amount=1;level=1} @dungeon"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `type` | 是 | 无 | 怪物类型：`VANILLA` 或 `MYTHIC`。 |
| `name` | 是 | 无 | 原版实体名或 MythicMobs 怪物 ID。 |
| `point` | 是 | 无 | 坐标，格式为 `x,y,z`。世界自动使用当前副本实例世界。 |
| `amount` | 否 | `1` | 生成数量，最小为 `1`。 |
| `level` | 否 | `1` | 怪物等级，主要用于 MythicMobs。 |
| `radius` | 否 | `0` | 随机生成半径。 |

## `$kill` 击杀条件

`$kill` 只用于 `groups.<id>.condition`，要求击杀指定怪物达到数量。

```yaml
- "$kill{mob=ZOMBIE;amount=3} @system"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `mob` | 是 | 无 | 要统计击杀的怪物名，通常与 `$mob` 的 `name` 对应。 |
| `amount` | 否 | `1` | 需要击杀的数量，最小为 `1`。 |

## `$kill-any` 任意怪物击杀条件

`$kill-any` 只用于 `groups.<id>.condition`，会把多个怪物名的击杀数相加，达到 `amount` 即完成该条件。

```yaml
- "$kill-any{mobname=ZOMBIE,SKELETON;amount=3} @system"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `mobname` | 是 | 无 | 参与统计的怪物名列表，使用英文逗号 `,` 分隔。也兼容写作 `mob`。 |
| `amount` | 否 | `1` | 总击杀数量，最小为 `1`。 |

## `$message` 发送消息

```yaml
- "$message{text=&a第一波已清理。} @player"
- "$message{text=&e调试信息输出到控制台。} @console"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `text` | 是 | 无 | 消息文本，支持 `&` 颜色代码。 |

行为：

- `@player` 或未填写目标：发送给副本内在线玩家。
- `@console` / `@system`：发送到控制台。

## `$monstergroup` 控制怪物组

```yaml
- "$monstergroup{group=boss;operation=start} @dungeon"
- "$monstergroup{group=wave_1;operation=stop} @dungeon"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `group` | 是 | 无 | 怪物组 ID。 |
| `operation` | 否 | `start` | 操作类型：`start` 或 `stop`。 |

## `$end` 结束副本

```yaml
- "$end{type=COMPLETE;delay=60} @dungeon"
- "$end{type=FAILURE} @dungeon"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `type` | 否 | `COMPLETE` | 结束类型：`COMPLETE`、`FAILURE`、`ADMIN_STOP`。也兼容 `SUCCESS`、`FAIL`、`FAILED`、`STOP`。 |
| `delay` | 否 | `0` | 延迟结束 tick 数，`20 tick = 1 秒`。小于 `0` 会按 `0` 处理。 |

行为：

- `delay` 大于 `0` 时，会在指定 tick 后结束副本。
- 延迟结束前会检查副本实例仍在运行。
- 副本关闭时，尚未执行的延迟结束任务会被取消。

## `$delay` 延迟执行脚本组

```yaml
- "$delay{time=100;script=start_boss} @dungeon"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `time` | 是 | 无 | 延迟 tick 数，`20 tick = 1 秒`。小于 `0` 会按 `0` 处理。 |
| `script` | 是 | 无 | 顶层 `scripts` 中的脚本组 ID。 |

行为：

- 延迟结束后执行 `scripts.<script>` 中的动作列表。
- 执行前会检查副本实例仍在运行。
- 副本关闭时，未执行的延迟脚本会被取消。

## `$title` 发送标题

```yaml
- "$title{title=&cBoss 出现！;subtitle=&7准备战斗;fadein=10;stay=60;fadeout=20} @player"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `title` | 否 | 空 | 主标题，支持 `&` 颜色代码。 |
| `subtitle` | 否 | 空 | 副标题，支持 `&` 颜色代码。 |
| `fadein` | 否 | `10` | 淡入 tick。 |
| `stay` | 否 | `60` | 停留 tick。 |
| `fadeout` | 否 | `20` | 淡出 tick。 |

行为：发送给副本内在线玩家。`@console` / `@system` 会被忽略。

## `$sound` 播放声音

```yaml
- "$sound{name=ENTITY_WITHER_SPAWN;volume=1;pitch=1} @player"
- "$sound{name=ENTITY_WITHER_SPAWN;point=0,80,0;volume=1;pitch=0.8} @dungeon"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `name` | 是 | 无 | Bukkit `Sound` 名称。 |
| `volume` | 否 | `1` | 音量。 |
| `pitch` | 否 | `1` | 音调。 |
| `point` | 否 | 无 | 坐标，格式为 `x,y,z`。 |

行为：

- 有 `point` 时，在副本实例世界的该坐标播放声音。
- 没有 `point` 时，对副本内在线玩家在各自当前位置播放声音。
- 音效名解析失败时会提示错误。

## `$command` 执行命令

```yaml
- "$command{sender=console;command=effect give <player> minecraft:strength 10 1} @player"
- "$command{sender=player;command=spawn} @player"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `command` | 是 | 无 | 命令内容，不需要写开头的 `/`。 |
| `sender` | 否 | `console` | 执行者：`console` 或 `player`。 |

支持占位符：

| 占位符 | 说明 |
|---|---|
| `<player>` / `<player:name>` | 玩家名。 |
| `<player:uuid>` | 玩家 UUID。 |
| `<dungeon>` | 副本 ID。 |
| `<dungeon:name>` | 副本显示名。 |
| `<instance>` | 当前副本实例 ID。 |
| `<time>` | 副本已运行秒数。 |

行为：

- `@player` 或未填写目标时，对副本内每个在线玩家分别替换占位符并执行一次。
- `sender=console` 由控制台执行。
- `sender=player` 由对应玩家执行。
- `@console` / `@system` 且 `sender=console` 时，只执行一次；没有玩家上下文的玩家占位符会替换为空。

## `$move` 移动玩家

```yaml
- "$move{x=0;y=80;z=0;yaw=0;pitch=90} @player"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `x` | 是 | 无 | 目标 X 坐标。 |
| `y` | 是 | 无 | 目标 Y 坐标。 |
| `z` | 是 | 无 | 目标 Z 坐标。 |
| `yaw` | 否 | `0` | 目标朝向 yaw。 |
| `pitch` | 否 | `0` | 目标俯仰 pitch。 |

行为：把副本内在线玩家传送到当前副本实例世界的指定坐标。`@console` / `@system` 会被忽略。

## `$heal` 恢复玩家

```yaml
- "$heal{health=true;food=true;clear-effect=true} @player"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `health` | 否 | `true` | 是否恢复生命值到最大生命。 |
| `food` | 否 | `true` | 是否恢复饥饿值与饱和度。 |
| `clear-effect` | 否 | `false` | 是否清除全部药水效果。 |

行为：对副本内在线玩家生效。`@console` / `@system` 会被忽略。

## `$effect` 添加药水效果

```yaml
- "$effect{name=SPEED;duration=200;amplifier=1} @player"
```

| 参数 | 必填 | 默认值 | 说明 |
|---|---:|---:|---|
| `name` | 是 | 无 | Bukkit `PotionEffectType` 名称，例如 `SPEED`。 |
| `duration` | 否 | `200` | 持续 tick。 |
| `amplifier` | 否 | `0` | 效果等级增幅，`0` 表示 1 级。 |
| `ambient` | 否 | `false` | 是否为环境效果。 |
| `particles` | 否 | `true` | 是否显示粒子。 |
| `icon` | 否 | `true` | 是否显示右上角图标。 |

行为：对副本内在线玩家添加药水效果。效果名解析失败时会提示错误。

## 完整示例

```yaml
groups:
  wave_1:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=2;radius=2} @dungeon"
      - "$mob{type=VANILLA;name=SKELETON;point=2,80,0;amount=1;radius=2} @dungeon"
    condition:
      - "$kill-any{mobname=ZOMBIE,SKELETON;amount=3} @system"
    end-script:
      - "$message{text=&a第一波已清理，Boss 将在 5 秒后出现。} @player"
      - "$delay{time=100;script=start_boss} @dungeon"

  boss:
    auto-start: false
    spawn:
      - "$mob{type=MYTHIC;name=CaveBoss;point=5,80,0;amount=1;level=1} @dungeon"
    condition:
      - "$kill{mob=CaveBoss;amount=1} @system"
    end-script:
      - "$title{title=&a副本通关！;subtitle=&7奖励已发放;stay=60} @player"
      - "$sound{name=UI_TOAST_CHALLENGE_COMPLETE;volume=1;pitch=1} @player"
      - "$command{sender=console;command=say <player> 完成了示例副本} @player"
      - "$end{type=COMPLETE;delay=60} @dungeon"

scripts:
  start_boss:
    - "$move{x=0;y=80;z=0;yaw=0;pitch=90} @player"
    - "$title{title=&cBoss 出现！;subtitle=&7准备战斗;stay=60} @player"
    - "$sound{name=ENTITY_WITHER_SPAWN;volume=1;pitch=1} @player"
    - "$heal{health=true;food=true;clear-effect=false} @player"
    - "$effect{name=SPEED;duration=100;amplifier=0} @player"
    - "$monstergroup{group=boss;operation=start} @dungeon"
```

## 常见错误

### 参数分隔符写错

错误：

```yaml
- "$title{title=&cBoss,subtitle=&7准备战斗} @player"
```

正确：

```yaml
- "$title{title=&cBoss;subtitle=&7准备战斗} @player"
```

### `$delay` 指向不存在的脚本组

错误：

```yaml
- "$delay{time=100;script=startBoss} @dungeon"
```

如果顶层配置是 `scripts.start_boss`，则应写：

```yaml
- "$delay{time=100;script=start_boss} @dungeon"
```

### 在错误的位置使用动作

错误：

```yaml
condition:
  - "$message{text=&a完成} @player"
```

`condition` 只允许 `$kill` 或 `$kill-any`。如果要在怪物组完成后发消息，应写在 `end-script` 中。

### 坐标写了世界名

错误：

```yaml
- "$sound{name=ENTITY_WITHER_SPAWN;point=world,0,80,0} @dungeon"
```

正确：

```yaml
- "$sound{name=ENTITY_WITHER_SPAWN;point=0,80,0} @dungeon"
```
