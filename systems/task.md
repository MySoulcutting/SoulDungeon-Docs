# 任务系统

任务系统支持定时任务与循环任务，用于副本倒计时、定期检测、阶段推进等场景。

::: info 开发状态
任务系统为**计划中功能**，当前 v0.2.0 中通过 `$delay` 脚本和怪物组生命周期实现基础时序控制。以下内容为设计规划。
:::

## 当前实现 (v0.2.0)

目前通过以下机制实现时序控制：

- **`$delay`**：延迟执行指定脚本组
- **怪物组生命周期**：`start-script` 和 `end-script` 自动触发
- **`$end{delay=N}`**：延迟结束副本

## 计划中的任务模式

| 模式 | 说明 |
|---|---|
| `TIMING` | 到指定时间点执行 |
| `CYCLE` | 按固定间隔循环执行 |
| `COUNTDOWN` | 倒计时任务 |
| `ASYNC` | 异步任务（适合数据库操作） |

## 计划配置格式

```yaml
# 自动启动的任务
auto-start:
  - "countdown false timing"
  - "area_check false cycle"

tasks:
  countdown:
    mode: TIMING
    async: false
    script:
      60:
        - "$message{text=&e副本剩余 60 秒}"
      300:
        - "$end{type=FAILURE;text=挑战超时}"

  area_check:
    mode: CYCLE
    period: 5              # 每 5 秒执行一次
    async: false
    script:
      - "$condition{type=area;area=boss_room;player-size=>0;then=boss_enter}"
```

## 任务控制

```text
# 脚本控制
"$task{name=countdown;operation=start}"    # 启动任务
"$task{name=countdown;operation=stop}"     # 停止任务
"$task{name=countdown;operation=restart}"  # 重启任务
```

## 当前替代方案

在任务系统完善前，可通过以下方式实现类似效果：

### 倒计时

```yaml
scripts:
  countdown_60:
    - "$message{text=&e剩余 60 秒}"
    - "$delay{time=400;script=countdown_40}"  # 20秒后触发下一阶段
```

### 循环检测

需要循环执行的内容暂时可以通过怪物组的持续追踪实现，插件会自动追踪所有怪物组内的实体状态。
