# 命令列表

主命令：`/sd` 或 `/souldungeon`

## 玩家命令

| 命令 | 权限 | 说明 |
|---|---|---|
| `/sd help` | `souldungeon.user` | 查看命令帮助。 |
| `/sd list` | `souldungeon.user` | 查看所有已加载副本的 ID 和显示名。 |
| `/sd info <副本>` | `souldungeon.user` | 查看副本详细信息，包含介绍文本。 |
| `/sd start <副本>` | `souldungeon.start` | 开始挑战指定副本。 |
| `/sd leave` | `souldungeon.leave` | 离开当前副本。 |

::: tip 权限提示
管理员拥有 `souldungeon.admin` 权限时可绕过普通权限检查。
:::

## 管理员命令

| 命令 | 说明 |
|---|---|
| `/sd reload` | 重载主配置和所有副本配置（不影响运行中的实例）。 |
| `/sd import <世界名>` | 将服务器中的世界导入为地图模板。 |
| `/sd instances` | 查看运行中的副本实例（实例名、副本 ID、状态、玩家列表）。 |
| `/sd stop <实例>` | 强制停止指定实例（`/sd instances` 可查看实例名）。 |
| `/sd complete` | 将当前所在副本直接判定为通关。 |
| `/sd fail` | 将当前所在副本直接判定为失败。 |
| `/sd group start <怪物组>` | 在当前副本中手动启动怪物组。 |
| `/sd group stop <怪物组>` | 在当前副本中手动停止怪物组。 |
| `/sd mobs` | 查看当前副本怪物状态（追踪数、激活组、完成组、击杀进度）。 |
| `/sd bench map` | 测试地图复制速度。 |
| `/sd bench load` | 测试世界加载速度。 |
| `/sd bench runtime` | 查看运行时性能数据。 |

权限：`souldungeon.admin`

## 调试流程

进入副本后推荐的调试流程：

```text
# 1. 查看实例信息
/sd instances

# 2. 查看怪物状态
/sd mobs

# 3. 手动启动怪物组（如果未自动启动）
/sd group start wave_1

# 4. 再次查看状态确认
/sd mobs

# 5. 手动停止怪物组
/sd group stop wave_1

# 6. 测试通关/失败
/sd complete
/sd fail
```

## 性能调试

```text
# 测试地图复制耗时
/sd bench map

# 测试世界加载耗时
/sd bench load

# 查看当前运行时状态
/sd bench runtime
```

输出示例：

```text
[SoulDungeon] 地图复制耗时: 234ms
[SoulDungeon] 世界加载耗时: 1200ms
[SoulDungeon] 空闲实例池: 3/4, 运行实例: 1
```

## 权限节点汇总

| 权限 | 说明 |
|---|---|
| `souldungeon.user` | 基础用户权限（help、list、info） |
| `souldungeon.start` | 开始副本 |
| `souldungeon.leave` | 离开副本 |
| `souldungeon.admin` | 管理员权限（包含所有子权限） |
| `souldungeon.editor` | 编辑器权限（计划中） |
