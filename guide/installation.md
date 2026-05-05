# 安装部署

本页介绍如何将 SoulDungeon 部署到你的 Minecraft 服务器。

## 环境要求

| 项目 | 最低版本 | 推荐版本 |
|---|---|---|
| Java | 21 | 21 LTS |
| 服务端 | Paper 1.21.x | Paper 1.21.4+ |
| TabooLib | 6.3.x | 6.3.0+ |

### 可选依赖

| 插件 | 用途 |
|---|---|
| **MythicMobs** | 使用 `type=MYTHIC` 怪物时必须安装 |
| **PlaceholderAPI** | 支持 `<player:xxx>` 类占位符扩展 |
| **Vault** | 经济奖励（`$reward{mode=MONEY}`） |

::: warning 注意
不使用 MythicMobs 时，可使用 `type=VANILLA` 的原版实体怪物。MythicMobs 仅作为 `compileOnly` 依赖，非必须。
:::

## 构建插件

从源码构建需要 Gradle 和 JDK 21：

```bash
# 克隆仓库
git clone https://github.com/your-org/SoulDungeon.git
cd SoulDungeon

# 构建
./gradlew build
```

构建产物位于：

```text
build/libs/SoulDungeon-<version>.jar
```

## 安装步骤

### 1. 复制插件

将构建好的 `.jar` 文件放入服务器的 `plugins/` 目录：

```text
plugins/SoulDungeon-0.2.0.jar
```

### 2. 启动服务器

启动服务器后，插件会自动释放默认配置和示例副本：

```text
plugins/SoulDungeon/
├── config.yml                    # 主配置
├── dungeons/
│   └── example/                  # 示例副本
│       ├── option.yml            # 副本配置
│       └── monster.yml           # 怪物配置
└── maps/                         # 地图模板（初始为空）
```

### 3. 导入地图模板

进入服务器后，使用管理员命令导入一张地图：

```text
/sd import world
```

这会把当前服务器的 `world` 世界导入为副本地图模板，存放于：

```text
plugins/SoulDungeon/maps/world/
```

### 4. 测试副本

```text
/sd start example
```

## 升级指南

### 从旧版本升级

1. 备份 `plugins/SoulDungeon/` 目录
2. 替换 `.jar` 文件
3. 重启服务器
4. 执行 `/sd reload` 重载配置

### 配置兼容性

- 版本号格式 `x.y.z`：当次版本号（y）变化时可能存在配置格式变更
- 配置变更会在更新日志中说明

## 目录结构详解

完整的插件目录结构：

```text
plugins/SoulDungeon/
├── config.yml              # 主配置文件
├── lang/                   # 语言文件（预留）
├── maps/                   # 地图模板
│   └── <世界名>/           # 通过 /sd import 导入
├── dungeons/               # 副本定义
│   └── <副本ID>/
│       ├── option.yml      # 副本基础配置
│       └── monster.yml     # 怪物波次配置
└── data/                   # 玩家数据（预留）
```

## 卸载

1. 删除 `plugins/SoulDungeon-*.jar`
2. 删除 `plugins/SoulDungeon/` 目录（可选）
3. 重启服务器

::: danger 注意
删除插件目录会丢失所有副本配置和数据。如需保留，请先备份。
:::
