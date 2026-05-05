# 地图系统

SoulDungeon 通过地图模板和实例机制管理副本地图。

## 地图模式

| 模式 | 配置值 | 说明 |
|---|---|---|
| 实例模式 | `INSTANCE` | 每次挑战复制地图模板为独立实例世界 |
| 静态模式 | `STATIC` | 所有队伍共用同一张地图（计划中） |

当前版本只支持 `INSTANCE` 模式。

## 地图导入

### 命令导入

在游戏中使用管理员命令导入现有世界：

```text
/sd import <世界名>
```

例如导入服务器的 `world`：

```text
/sd import world
```

导入后会在插件目录生成地图模板：

```text
plugins/SoulDungeon/maps/world/
```

### 手动导入

也可以手动将世界文件夹复制到 `maps/` 目录下：

```text
plugins/SoulDungeon/maps/<地图名>/
├── region/
├── level.dat
├── ...
```

然后执行 `/sd reload` 使其生效。

## option.yml 地图配置

```yaml
map:
  mode: INSTANCE       # 地图模式
  world: "world"       # 地图模板名称（对应 maps/ 目录下的文件夹名）
```

## 实例模式工作流程

1. 玩家执行 `/sd start <副本>`
2. 插件从 `maps/<world>/` 复制整个世界
3. 生成唯一的实例世界名（如 `sd_example_a1b2c3`）
4. 加载实例世界
5. 将玩家传送到副本出生点
6. 副本结束后，卸载并删除实例世界

## 出生点与离开位置

### 出生点 (spawn)

```yaml
# 格式：world,x,y,z,yaw,pitch
spawn: "world,0,80,0,0,0"
```

- 在 INSTANCE 模式下，配置中的世界名会自动替换为实例世界
- yaw 和 pitch 可省略，默认为 `0`

### 离开位置 (leave-location)

```yaml
# 指定固定返回点
leave-location: "lobby,0,80,0,0,0"
```

如果未配置 `leave-location`，玩家离开副本后返回进入副本前的位置。

## 实例池

实例池通过预创建世界来加速副本启动：

```yaml
# config.yml
performance:
  instance-pool:
    enable: true
    min-idle: 1        # 最少空闲实例
    max-idle: 4        # 最多空闲实例
```

::: tip 工作原理
当空闲实例数低于 `min-idle` 时，系统会在后台逐步创建新实例，直到达到 `min-idle`。玩家进入副本时直接从池中取出一个已就绪的实例。
:::

## 注意事项

- 地图模板越大，复制耗时越长。建议使用中小型地图（< 100MB）。
- 实例世界命名规则：`sd_<副本ID>_<随机ID>`
- 实例世界在副本结束后会被删除，请勿在副本中放置需要保留的物品
- 如果服务器意外关闭，可能需要手动清理残留的实例世界目录
