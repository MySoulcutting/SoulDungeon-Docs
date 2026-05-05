# 怪物配置 (monster.yml)

`monster.yml` 定义副本中所有怪物组、刷怪规则、击杀条件和脚本流程。

文件位置：

```text
plugins/SoulDungeon/dungeons/<副本ID>/monster.yml
```

## 整体结构

```yaml
# 怪物组定义
groups:
  <组ID>:
    auto-start: true | false    # 是否在副本开始时自动启动
    spawn: [...]                # 刷怪脚本
    condition: [...]            # 通关条件
    start-script: [...]         # 启动时执行的脚本
    end-script: [...]           # 完成条件后执行的脚本

# 顶层脚本组（供 $delay 调用）
scripts:
  <脚本组ID>: [...]
```

## groups — 怪物组

每个怪物组代表一波怪物或一个 Boss 阶段。

### 必填字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `spawn` | list | 刷怪脚本列表，只允许 `$mob`。 |
| `condition` | list | 完成条件列表，只允许 `$kill` 或 `$kill-any`。 |

### 可选字段

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `auto-start` | boolean | `false` | 副本开始时自动启动该组。多个组设为 `true` 时会同时启动。 |
| `start-script` | list | 空 | 怪物组启动时执行的脚本。 |
| `end-script` | list | 空 | 满足 `condition` 后执行的脚本。 |

### spawn — 刷怪

使用 `$mob` 脚本生成怪物：

```yaml
spawn:
  - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3;radius=2}"
  - "$mob{type=MYTHIC;name=CaveBoss;point=5,80,0;amount=1;level=5}"
```

`$mob` 参数说明详见 [脚本动作 - $mob](/config/scripts#mob-生成怪物)。

### condition — 完成条件

满足所有条件后，怪物组视为完成，执行 `end-script`：

```yaml
condition:
  - "$kill{mob=ZOMBIE;amount=3}"              # 击杀 3 只 ZOMBIE
  - "$kill-any{mobname=ZOMBIE,SKELETON;amount=5}"  # 合计击杀 5 只
```

多个条件之间是 **AND** 关系，全部满足才触发完成。

### start-script / end-script — 脚本

支持除 `$mob`、`$kill`、`$kill-any` 之外的所有脚本动作。

`end-script` 通常用于：

- 向玩家发送通关消息
- 启动下一波怪物组
- 发放奖励
- 结束副本

## scripts — 顶层脚本组

顶层 `scripts` 定义可被 `$delay` 调用的脚本组：

```yaml
scripts:
  start_boss:
    - "$move{x=0;y=80;z=0}"
    - "$title{title=&cBoss 出现！;subtitle=&7准备战斗}"
    - "$monstergroup{group=boss;operation=start}"
```

通过 `$delay` 延迟调用：

```yaml
- "$delay{time=100;script=start_boss}"  # 5 秒后执行 start_boss
```

## 完整示例

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
      - "$sound{name=ENTITY_ZOMBIE_AMBIENT;volume=0.5}"
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
      - "$command{sender=console;command=say <player> 完成了 <dungeon:name>}"
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

## 调试怪物组

```text
/sd mobs                      # 查看怪物状态
/sd group start wave_1        # 手动启动怪物组
/sd group stop wave_1         # 手动停止怪物组
```
