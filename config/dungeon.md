# 副本配置 (option.yml)

`option.yml` 是每个副本的核心定义文件。

## 文件位置

```text
plugins/SoulDungeon/dungeons/<副本ID>/option.yml
```

## 完整节点参考

```yaml
# [可选] 副本显示名，未设置时使用目录名
display-name: "哥布林洞穴"

# [可选] 副本描述，/sd info 中逐行显示
description:
  - "&7适合 1~3 人挑战的初级副本"
  - "&7推荐等级：10"

# [可选] 地图配置
map:
  mode: INSTANCE            # 地图模式
  world: "goblin_cave"      # 地图模板名（对应 maps/ 目录）

# [必填] 副本出生点
spawn: "world,100,65,100,0,0"

# [可选] 离开后传送位置
leave-location: "lobby,0,80,0,0,0"
```

## 节点详解

### display-name

副本显示名，用于 `/sd list`、`/sd info` 和消息中的 `<dungeon:name>` 占位符。

未设置时使用副本目录名作为显示名。

```yaml
display-name: "哥布林洞穴"
```

### description

副本描述文本，`/sd info` 会逐行显示。支持 `&` 颜色代码。

```yaml
description:
  - "&7适合 1~3 人挑战的初级副本"
  - "&7推荐等级：10"
  - "&7掉落：哥布林宝藏"
```

### map — 地图配置

#### mode

| 值 | 说明 |
|---|---|
| `INSTANCE` | 实例模式（推荐），每次挑战复制独立地图 |
| `STATIC` | 静态模式（计划中），所有队伍共享地图 |

#### world

地图模板名称，对应 `plugins/SoulDungeon/maps/<world>/` 目录。

通过 `/sd import <世界名>` 导入的地图模板会自动创建为对应名称。

```yaml
map:
  mode: INSTANCE
  world: "goblin_cave"    # 对应 maps/goblin_cave/
```

### spawn — 出生点

副本开始后玩家出现的坐标。**必填字段**。

```yaml
# 格式：world,x,y,z,yaw,pitch
spawn: "world,100,65,100,90,0"
```

- `world`：在 INSTANCE 模式中自动替换为实例世界名
- `yaw`、`pitch`：玩家朝向，可选，默认 `0`

### leave-location — 离开位置

玩家离开副本后的传送目标。**可选字段**。

```yaml
leave-location: "lobby,0,80,0,0,0"
```

未设置时，玩家返回进入副本前的位置。

## 最小配置

一个能正常运行的副本至少需要：

```yaml
spawn: "world,0,80,0,0,0"

map:
  mode: INSTANCE
  world: "world"
```

::: tip 配置检查
如果副本无法加载，开启 `config.yml` 中的 `options.debug: true` 查看详细错误信息。
:::

## 未来扩展

以下节点为规划中功能，将在后续版本支持：

```yaml
# 队伍限制（v1.0.0+）
team:
  min-size: 1
  max-size: 3
  leader-only-start: true

# 入场条件（v0.3.0+）
start-condition:
  - "$permission{node=souldungeon.goblin;message=无权限}"
  - "$team{min=1;max=3;message=队伍人数需要 1~3 人}"

# 阶段系统（v1.0.0+）
stages:
  stage_1:
    start: [...]
    complete: [...]
    next: stage_2
```
