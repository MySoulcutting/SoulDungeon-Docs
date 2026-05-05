# 常见问题

## 副本无法启动

### 没有已加载的副本

```text
/sd list
```

如果列表为空，说明 `dungeons/` 目录下没有有效的副本配置。检查：

1. `plugins/SoulDungeon/dungeons/` 是否存在
2. 副本子目录中是否包含 `option.yml`

### 地图模板不存在

```text
/sd import <世界名>
```

确保已将地图导入为模板，且在 `option.yml` 中 `map.world` 与模板名称一致。

### 配置格式错误

开启调试模式查看详细错误：

```yaml
# config.yml
options:
  debug: true
```

重载配置后查看控制台日志。

## 怪物不生成

### MythicMobs 怪物不生成

1. 确认 MythicMobs 插件已安装并启用
2. 确认 `config.yml` 中 `hooks.mythic-mobs: true`
3. 确认 MythicMobs 配置中确实存在对应 ID 的怪物
4. 检查怪物 ID 拼写是否准确（区分大小写）

### 原版怪物不生成

1. 检查实体名是否使用了正确的 Bukkit `EntityType` 名称（大写）
2. 检查刷怪点坐标是否合理（确保在副本世界中）
3. 开启调试模式查看日志

## 脚本不执行

### 参数分隔符用了逗号

错误：
```yaml
- "$title{title=标题,subtitle=副标题}"
```

正确：
```yaml
- "$title{title=标题;subtitle=副标题}"
```

### `$delay` 引用了不存在的脚本组

检查 `scripts:` 下的脚本组 ID 是否与 `$delay` 中的 `script` 参数一致。

## 实例世界未清理

副本结束后残留临时世界目录：

1. 检查 `config.yml` 中 `instance.auto-clean: true`
2. 如果服务器异常关闭，可能需要手动删除 `world_sd_*` 格式的世界目录
3. 在下次启动时插件会自动检测并清理

## 性能问题

### 进入副本卡顿

1. 启用实例池：`performance.instance-pool.enable: true`
2. 增加最小空闲实例数
3. 减小地图模板大小（删除不必要区块）

### 怪物太多导致卡顿

1. 减少每波怪物数量
2. 增大波次间隔
3. 确保 `monster.remove-on-cleanup: true`
