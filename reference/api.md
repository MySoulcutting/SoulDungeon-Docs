# API 文档

本文档面向希望通过 API 扩展 SoulDungeon 的开发者。

::: warning 版本提示
当前 API 为 `v0.2.0` 开发版，接口可能发生变动。后续版本将提供稳定的公开 API。
:::

## 事件系统

SoulDungeon 通过 TabooLib 的 EventBus 发布事件，可通过 `@SubscribeEvent` 监听。

### 计划中的事件

| 事件 | 触发时机 |
|---|---|
| `DungeonStartEvent` | 副本开始 |
| `DungeonEndEvent` | 副本结束 |
| `DungeonCompleteEvent` | 副本通关 |
| `DungeonFailEvent` | 副本失败 |
| `DungeonPlayerJoinEvent` | 玩家进入副本 |
| `DungeonPlayerLeaveEvent` | 玩家离开副本 |
| `DungeonStageChangeEvent` | 副本阶段变化 |
| `DungeonInteractTriggerEvent` | 交互触发 |
| `DungeonRewardEvent` | 发放奖励 |

### 事件监听示例

```kotlin
import taboolib.common.platform.event.SubscribeEvent
import org.bukkit.event.EventPriority

object MyListener {

    @SubscribeEvent(priority = EventPriority.NORMAL)
    fun onDungeonComplete(event: DungeonCompleteEvent) {
        // 自定义通关逻辑
    }

    @SubscribeEvent(ignoreCancelled = true)
    fun onPlayerJoin(event: DungeonPlayerJoinEvent) {
        // 玩家进入副本时的自定义处理
    }
}
```

## 扩展脚本动作

可以通过注册自定义脚本动作来扩展 `$xxx` 系统。

### 接口设计（计划中）

```kotlin
interface DungeonScriptAction {
    val name: String                    // 动作名，如 "custom_action"
    fun execute(context: ScriptContext) // 执行逻辑
}
```

## 扩展交互类型

可以通过 API 注册自定义交互触发类型：

```kotlin
interface DungeonInteractType {
    val typeName: String                // 类型标识
    fun register(instance: DungeonInstance)
    fun unregister(instance: DungeonInstance)
}
```

## 获取副本实例

```kotlin
// 获取玩家的当前副本实例
val instance = DungeonAPI.getInstance(player)

// 获取所有运行中的实例
val instances = DungeonAPI.getRunningInstances()

// 获取副本配置
val config = DungeonAPI.getDungeonConfig("example")
```

## 占位符扩展

计划支持通过 `PlaceholderAPI` 的扩展机制注册自定义占位符：

```kotlin
class SoulDungeonExpansion : PlaceholderExpansion() {
    override fun getIdentifier() = "souldungeon"
    override fun onPlaceholderRequest(player: Player, params: String): String? {
        // 处理占位符请求
    }
}
```

## 依赖方式

### Gradle

```kotlin
dependencies {
    compileOnly("com.yourorg:SoulDungeon:0.2.0")
}
```

将 SoulDungeon 的 jar 放入 `libs/` 目录作为编译依赖。

### Maven

```xml
<dependency>
    <groupId>com.yourorg</groupId>
    <artifactId>SoulDungeon</artifactId>
    <version>0.2.0</version>
    <scope>provided</scope>
</dependency>
```

## 技术架构

```text
SoulDungeon
├── 命令层 (Commands)
│   ├── /sd start/leave/info/list
│   └── /sd reload/import/instances/mobs/...
├── 副本管理层 (DungeonManager)
│   ├── 加载配置
│   ├── 创建/管理实例
│   └── 实例池维护
├── 实例层 (DungeonInstance)
│   ├── 世界管理
│   ├── 怪物组驱动
│   ├── 脚本执行引擎
│   └── 玩家管理
├── 脚本引擎 (ScriptEngine)
│   ├── 解析 $action{key=value}
│   ├── 目标路由 (@player/@dungeon/...)
│   └── 占位符替换
└── 事件总线 (EventBus)
    ├── 副本生命周期事件
    └── 扩展事件
```
