# 小鳄龙养成（XiaoELong Pet）

独立开发的 React + Vite + TypeScript 宠物养成 v0.1。
目标：先跑通核心玩法与表情扩展机制，后续可移植进 XiaoELong 桌面组件。

## 已实现

- 状态参数：饱食度、情绪值、精力、亲密度、经验/等级
- 成长阶段：蛋 → 幼年 → 少年 → 成年（按等级自动切换）
- 时间成长：在线每 5 秒获得少量经验；离线按离开时间获得成长
- 随机事件：每 25～60 秒可能触发一次，影响状态并写入事件记录
- 行为系统：
  - 喂食：小鱼干 / 能量果 / 草莓蛋糕 / 四果汤 / 劭轩草 / 贵族世家牛排（50% 概率吃坏肚子，展示 30 秒生病表情）
  - 玩耍：玩球 / 挠痒痒 / 打游戏（随机从游戏库选一款）/ 打乒乒球 / 打沙滩排球 / 丁格尔丁
  - 游戏库：元气骑士 / 原神 / 崩坏星穹铁道 / Isaac / 三国杀 / 雀魂 / 导师模拟器 / UNO
  - 休息：小睡 / 深度睡眠
  - 互动：摸摸头
- 表情互动：点击表情让小鳄龙变换表情时会获得经验值
- 表情系统：
  - 每个表情包一个文件夹 + `manifest.json`
  - 已接入「抹茶旦旦大头贴」16 张真实贴图：去白边 + 居中 + 统一画布
  - 已接入「抹茶旦旦」16 张真实贴图：去白边 + 居中 + 统一画布
  - 已接入「真的是小恐龙吗」16 张真实贴图：居中 + 统一画布（保留白边）
  - 点击表情后小鳄龙展示约 5 秒，随后回到默认表情
  - 仍保留色块/Emoji 占位包，方便继续扩展新表情
- 负面表现：饱食度或精力过低时，小鳄龙会“发抖”（CSS shake）
- 存档：localStorage 自动保存

## 运行

```bash
cd xiaoelong-pet
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5174`。

## 目录结构

```text
xiaoelong-pet/
├── public/
│   ├── expressions/matcha/        # 抹茶旦旦大头贴（透明底，已居中）
│   ├── expressions/matcha-plain/  # 抹茶旦旦（透明底，已居中）
│   └── expressions/dinosaur/      # 真的是小恐龙吗（保留白边，已居中）
├── src/
│   ├── components/       # 状态/宠物展示/行为/表情/事件记录
│   ├── expressions/      # 表情包目录（每个文件夹一个包）
│   │   ├── matcha/manifest.json
│   │   ├── matcha-plain/manifest.json
│   │   ├── dinosaur/manifest.json
│   │   ├── basic/manifest.json
│   │   └── food/manifest.json
│   ├── types.ts          # 宠物状态、行为、表情类型
│   ├── constants.ts      # 数值、衰减、行为、随机事件配置
│   ├── usePet.ts         # 核心状态逻辑
│   └── utils/            # 成长模拟、存档
├── package.json
└── vite.config.ts
```

## 表情包扩展方式

1. 在 `src/expressions/` 下新建文件夹，例如 `src/expressions/my-pack/manifest.json`。
2. 按以下格式编写清单：

```json
{
  "id": "my-pack",
  "name": "我的表情包",
  "defaultExpressionId": "hello",
  "expressions": [
    {
      "id": "hello",
      "name": "打招呼",
      "color": "#abcdef",
      "text": "👋"
    }
  ]
}
```

3. 在 `src/expressions/index.ts` 中引入该 manifest 并加入 `expressionPacks` 数组。

真实贴图已通过 `ExpressionItem.image` 接入，`PetView` 会优先渲染图片；后续如需精灵图坐标，可以使用 `sprite` 字段。

## 后续规划

- 继续扩展更多表情包/真实贴图
- 更多成长阶段美术
- 更丰富的随机事件
- 与小鳄龙现有 Electron / 后端结构做可移植组件化

## 贴图协作（后续）

拿到“一张大图包含若干表情”的素材后，可以先把它放到仓库中，再用根目录已有的视觉辅助脚本观察/定位表情区域：

```bash
npm run vision -- 路径/到/贴图.png --prompt "请描述图中每个表情的分布、坐标和大致的边界"
```

然后基于坐标在 `ExpressionItem.sprite` 中配置 `src / x / y / width / height`，或直接裁切出单张图片放入对应表情包文件夹。
