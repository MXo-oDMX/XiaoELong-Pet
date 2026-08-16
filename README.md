# 小鳄龙养成（XiaoELong Pet）

独立开发的 React + Vite + TypeScript 宠物养成 v0.1。
目标：先跑通核心玩法与表情扩展机制，后续可移植进 XiaoELong 桌面组件。

> 🌐 在线体验：**https://MXo-oDMX.github.io/XiaoELong-Pet/**

## 已实现

- 状态参数：饱食度、情绪值、精力、亲密度、经验/等级
- 成长阶段：蛋 → 幼年 → 少年 → 成年（按等级自动切换）
- 蛋阶段保持蛋的形态，不支持表情切换；孵化后开放表情互动
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

## 按平台运行

### Windows（PowerShell）

```powershell
cd E:\Codefield\XiaoELong\xiaoelong-pet
npm install
npm run dev
```

- 开发地址：`http://localhost:5174`
- 停止：`Ctrl + C`

### Linux / WSL（bash）

```bash
cd /mnt/e/Codefield/XiaoELong/xiaoelong-pet
npm install
npm run dev
```

### macOS（终端）

```bash
cd /path/to/xiaoelong-pet
npm install
npm run dev
```

> npm 命令三个平台基本一致，主要差异是路径写法。

## 构建与托管

### 1. 构建生产版本

所有平台都一样：

```bash
npm run build
```

构建产物在：

```text
dist/
```

### 2. 本地预览

```bash
npm run preview
```

### 3. 托管方式

#### 方式 A：GitHub Pages（推荐，免费）

仓库已经附带 GitHub Actions 工作流：

```text
.github/workflows/deploy-pages.yml
```

1. 推送 `main` 分支后，Actions 会自动构建并发布。
2. 到 GitHub 仓库 **Settings → Pages**，把 **Source** 设置为 `GitHub Actions`。
3. 第一次运行成功后，访问：

```text
https://MXo-oDMX.github.io/XiaoELong-Pet/
```

#### 方式 B：Netlify Drop / Vercel

- 先执行一次 `npm run build`
- 打开 Netlify Drop 或 Vercel
- 直接把 `dist/` 文件夹拖进去
- 得到一个公开网址，不需要 Node.js

#### 方式 C：任意静态服务器

把 `dist/` 整个目录放到：

- Nginx / Apache
- 对象存储 / CDN
- 或者局域网内任意静态文件服务器

### 4. 没有安装 Node.js 的人怎么用

最终使用者不需要安装 Node.js。你只需要把托管好的网址发给对方，对方用浏览器打开即可。

如果以后想做成“双击就能运行”的桌面版，可以再用 Electron 打包。

## 贴图协作（后续）

拿到“一张大图包含若干表情”的素材后，可以先把它放到仓库中，再用根目录已有的视觉辅助脚本观察/定位表情区域：

```bash
npm run vision -- 路径/到/贴图.png --prompt "请描述图中每个表情的分布、坐标和大致的边界"
```

然后基于坐标在 `ExpressionItem.sprite` 中配置 `src / x / y / width / height`，或直接裁切出单张图片放入对应表情包文件夹。
