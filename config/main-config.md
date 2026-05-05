# 主配置 (config.yml)

`config.yml` 是 SoulDungeon 的全局主配置文件，位于 `plugins/SoulDungeon/config.yml`。

## 完整示例

```yaml
options:
  debug: false
  prefix: "&8[&bSoulDungeon&8] &f"

server:
  default-gamemode: "SURVIVAL"

instance:
  auto-clean: true

hooks:
  mythic-mobs: true

monster:
  remove-on-cleanup: true

performance:
  instance-pool:
    enable: true
    min-idle: 1
    max-idle: 4
    refill-delay-ticks: 40
    build-interval-ticks: 60
    auto-prepare-on-reload: true
```

## 节点详解

### options — 基础选项

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `debug` | boolean | `false` | 开启调试模式，输出更多运行日志。 |
| `prefix` | string | `"&8[&bSoulDungeon&8] &f"` | 插件消息前缀，支持 `&` 颜色代码。 |

### server — 服务端配置

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `default-gamemode` | string | `"SURVIVAL"` | 副本内玩家的默认游戏模式。 |

### instance — 实例配置

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `auto-clean` | boolean | `true` | 副本结束后自动清理临时世界和怪物。 |

### hooks — 外部插件对接

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `mythic-mobs` | boolean | `true` | 启用 MythicMobs 对接。关闭后 `type=MYTHIC` 的怪物将无法生成。 |

::: warning 注意
MythicMobs 需要服务端已安装 MythicMobs 插件。如果未安装但开启了此选项，日志中会提示错误但不影响原版怪物。
:::

### monster — 怪物配置

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `remove-on-cleanup` | boolean | `true` | 副本清理时移除所有怪物实体。 |

### performance — 性能优化

#### instance-pool — 实例池

实例池通过预创建世界，降低玩家进入副本时的加载延迟。

| 节点 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `enable` | boolean | `true` | 启用实例池。 |
| `min-idle` | int | `1` | 保持的最小空闲实例数。 |
| `max-idle` | int | `4` | 最大空闲实例数，超出会被回收。 |
| `refill-delay-ticks` | int | `40` | 检查并补充实例池的间隔（ticks）。 |
| `build-interval-ticks` | int | `60` | 连续创建实例的间隔（ticks），防止 IO 压力过大。 |
| `auto-prepare-on-reload` | boolean | `true` | 重载配置时自动准备实例池。 |

::: tip 性能建议
- 小型服务器（<10 人）：`min-idle: 1, max-idle: 2`
- 中型服务器（10-50 人）：`min-idle: 2, max-idle: 4`
- 大型服务器（>50 人）：根据实际副本使用情况调整
:::

## 修改建议

### 关闭调试模式

生产环境建议关闭：

```yaml
options:
  debug: false
```

### 自定义前缀

```yaml
options:
  prefix: "&6[&e副本&6] &r"
```

### 调整实例池

如果服务器内存有限，可以降低实例池大小：

```yaml
performance:
  instance-pool:
    enable: true
    min-idle: 1
    max-idle: 2
```
