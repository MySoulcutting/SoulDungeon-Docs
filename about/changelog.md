# 更新日志

## v0.2.0 (当前)

### 新增功能

- **实例池预热**：预创建空闲实例世界，降低进入副本延迟
- **脚本系统增强**：
  - 新增 `$move` — 传送玩家到指定坐标
  - 新增 `$heal` — 恢复生命和饥饿值
  - 新增 `$effect` — 添加药水效果
  - 新增 `$title` — 发送标题消息
  - 新增 `$sound` — 播放音效
- **怪物组**：支持 `$kill-any` 多怪合计击杀条件
- **调试命令**：新增 `/sd mobs`、`/sd group`、`/sd bench`
- **配置增强**：新增 `performance` 性能配置节点
- **占位符**：支持在 `$command` 中使用 `<player>`、`<dungeon>`、`<instance>`、`<time>`

### 修复

- 修复副本结束后怪物可能未被清理的问题
- 修复延迟脚本在副本关闭后仍然执行的问题
- 修复 `$end` 延迟结束的计时精度问题

### 变更

- 脚本参数分隔符统一为 `;`（分号）
- `$end` 的 `type` 参数增加别名支持

---

## v0.1.0

### 首次发布

- 副本基础配置（`option.yml`）
- 单实例副本运行
- 地图导入（`/sd import`）
- 基础命令（`/sd start`、`/sd leave`、`/sd list`、`/sd info`）
- 怪物组系统（`monster.yml`）
- 原版实体和 MythicMobs 支持
- 基础脚本动作：
  - `$mob` — 生成怪物
  - `$kill` — 击杀条件
  - `$message` — 发送消息
  - `$command` — 执行命令
  - `$delay` — 延迟脚本
  - `$monstergroup` — 控制怪物组
  - `$end` — 结束副本
- 管理员命令（`/sd reload`、`/sd instances`、`/sd stop`）
