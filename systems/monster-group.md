# 怪物组系统

怪物组（MonsterGroup）是副本战斗流程的基本单元，控制一波怪物的刷新、击杀条件和完成后行为。

## 基本概念

一个怪物组包含：

- **刷怪规则**（spawn）：生成哪些怪物、在哪里生成、生成多少
- **完成条件**（condition）：杀死哪些怪物、杀多少才算完成
- **生命周期脚本**（start-script / end-script）：开始和结束时执行的脚本

## 自动启动 vs 手动启动

### auto-start: true

副本开始时自动启动该怪物组：

```yaml
groups:
  wave_1:
    auto-start: true
    spawn: [...]
    condition: [...]
```

适合第一波怪物或不需要前置条件的波次。

### auto-start: false（手动启动）

需要通过脚本 `$monstergroup` 或命令手动启动：

```yaml
# 脚本启动
- "$monstergroup{group=boss;operation=start} @dungeon"

# 命令启动
/sd group start boss
```

适合 Boss 阶段或需要前置条件才能触发的波次。

## 多个怪物组同时运行

可以同时启动多个怪物组：

```yaml
groups:
  wave_left:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=-5,80,0;amount=3}"
    condition:
      - "$kill{mob=ZOMBIE;amount=3}"

  wave_right:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=SKELETON;point=5,80,0;amount=3}"
    condition:
      - "$kill{mob=SKELETON;amount=3}"
```

两组怪物同时启动，两路怪物独立计算通关条件。

## 停止怪物组

```yaml
# 脚本停止
- "$monstergroup{group=wave_1;operation=stop} @dungeon"

# 命令停止
/sd group stop wave_1
```

停止后，该组的怪物和击杀计数会被清除。

## 调试命令

```text
/sd mobs               # 查看怪物状态总览
/sd group start <组>   # 手动启动
/sd group stop <组>    # 手动停止
```

`/sd mobs` 输出示例：

```text
怪物组状态：
- wave_1: ACTIVE (击杀进度: 3/5)
- boss: IDLE
追踪怪物总数: 4
已完成怪物组: none
```

## 完整流程示例

```yaml
groups:
  # 第一波：自动启动
  wave_1:
    auto-start: true
    spawn:
      - "$mob{type=VANILLA;name=ZOMBIE;point=0,80,0;amount=3}"
    condition:
      - "$kill{mob=ZOMBIE;amount=3}"
    end-script:
      - "$message{text=&a第一波完成！}"
      - "$delay{time=60;script=start_boss}"

  # Boss：脚本触发
  boss:
    auto-start: false
    spawn:
      - "$mob{type=MYTHIC;name=DungeonBoss;point=0,80,0;amount=1;level=5}"
    condition:
      - "$kill{mob=DungeonBoss;amount=1}"
    end-script:
      - "$title{title=&a恭喜通关！}"
      - "$end{type=COMPLETE;delay=60}"

scripts:
  start_boss:
    - "$title{title=&cBoss 出现！}"
    - "$monstergroup{group=boss;operation=start}"
```

## 怪物追踪

插件会自动追踪每个怪物组的生成怪物：

- 怪物死亡时计入对应怪物组的击杀数
- 怪物被非玩家方式杀死（环境、命令）也会计入
- 副本清理时会移除所有追踪中的怪物
