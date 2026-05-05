# 快速开始

本页引导你从零开始，在 5 分钟内运行你的第一个 SoulDungeon 副本。

## 前置条件

- 已安装 Paper 1.21.x 服务端
- 已安装 Java 21
- 已安装 TabooLib（通常由 SoulDungeon 自动处理）

## 1. 构建插件

```bash
git clone https://github.com/MySoulcutting/SoulDungeon.git
cd SoulDungeon
./gradlew build
```

构建产物：

```text
build/libs/SoulDungeon-0.2.0.jar
```

::: tip 提示
如果不想从源码构建，可从 Release 页面下载预编译版本。
:::

## 2. 安装

将 `.jar` 文件放入服务器 `plugins/` 目录并启动服务器：

```text
plugins/SoulDungeon-0.2.0.jar
```

## 3. 首次启动

服务器启动后，插件会自动生成配置：

```text
plugins/SoulDungeon/
├── config.yml
├── dungeons/
│   └── example/
│       ├── option.yml
│       └── monster.yml
└── maps/
```

## 4. 导入地图

进入服务器，执行管理员命令导入一张地图：

```text
/sd import world
```

::: warning 注意
导入的世界会被复制为模板，原世界不受影响。但建议事先备份重要建筑。
:::

## 5. 修改配置（可选）

编辑 `plugins/SoulDungeon/dungeons/example/option.yml`：

```yaml
display-name: "示例副本"
description:
  - "&7这是一个示例副本。"
  - "&7击败所有怪物即可通关。"

map:
  mode: INSTANCE
  world: "world"

spawn: "world,0,80,0,0,0"
leave-location: "world,0,80,0,0,0"
```

::: tip 坐标格式
`spawn` 格式为 `world,x,y,z,yaw,pitch`。yaw（水平朝向）和 pitch（俯仰）可选，默认 `0`。
:::

## 6. 重载配置

```text
/sd reload
```

## 7. 开始挑战

```text
/sd start example
```

## 8. 查看运行状态

```text
/sd list          # 查看所有已加载副本
/sd info example  # 查看副本详情
/sd instances     # 查看运行中的副本实例
```

## 下一步

- 学习 [副本配置](/config/dungeon) 自定义副本参数
- 学习 [怪物配置](/config/monster) 设计自己的怪物波次
- 学习 [脚本动作](/config/scripts) 编写副本剧情脚本
- 查看 [命令列表](/reference/commands) 了解完整命令
