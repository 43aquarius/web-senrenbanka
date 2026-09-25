# 千恋＊万花 ｜ Web版 · 序章

> 在浏览器中即刻游玩的《千恋＊万花》序章——温泉之乡穗织、神刀丛雨丸与少女们的相遇。
> **粉丝自制的非官方免费视觉小说**（全年龄向，无 R18 内容）。

**Play now**：`npm run dev` 后访问 `http://localhost:3000`，或直接打开 [`standalone.html`](./standalone.html)（单文件版，无需安装任何东西）。

---

## 🎮 这是什么

一个用 **Next.js 16** 制作的 Web 视觉小说（galgame），重现《千恋＊万花》序章的体验：

- **完整序章剧情**：抵达穗织 → 志那都庄 → 神社惊变 → 神刀折断 → 巫女宣告「结婚」！
- **三条分歧路线**：芳乃 / 茉子 / 丛雨 三种反应，各自的小剧情与专属 CG 演出
- **原作素材**：角色立绘、CG、背景与音乐均取自网络流传的原作素材（版权归 Yuzu-soft）
- **中文为主**：剧情与 UI 以中文呈现，标题与人名保留日文点缀

## ✨ 游戏功能

| 功能 | 说明 |
| --- | --- |
| 打字机演出 | 可点击跳过，语速可调 |
| 自动模式 | `A` 键开关，按文本长度智能等待 |
| 快进模式 | `S` 键开关，遇选项自动暂停 |
| 对话记录 | `L` 键或按钮查看历史台词 |
| 存档系统 | 自动存档 + 3 个手动档位（localStorage 持久化） |
| CG 鉴赏 | 20 张 CG，随剧情解锁，**通关后全开** |
| BGM 控制 | `M` 键静音 / 音量调节 |
| 响应式 | 手机竖屏亦可游玩 |

## 🕹️ 操作指南

- **点击 / 空格 / 回车**：推进剧情（点击对话框同样有效）
- **A**：自动播放　**S**：快进　**L**：对话记录　**M**：静音　**Esc**：系统菜单

## 🚀 运行

```bash
npm install
npm run dev        # 开发模式
npm run build && npm start   # 生产模式
```

或直接打开仓库根目录的 **`standalone.html`** —— 单文件复刻版，双击即玩（素材走相对路径 `assets/`）。

## 📁 目录结构

```
├── standalone.html          # 单文件版（零依赖复刻）
├── public/assets/           # 游戏素材
│   ├── bg/                  #   场景背景 (9)
│   ├── cg/                  #   CG (20)
│   ├── portrait/            #   角色立绘 (6)
│   └── music/               #   原版音乐 (2)
└── src/
    ├── app/                 # Next.js 入口
    ├── components/game/     # 游戏组件
    │   ├── GameShell.tsx    #   状态机 & BGM 管理
    │   ├── TitleScreen.tsx  #   标题画面
    │   ├── GameScreen.tsx   #   演出主界面
    │   ├── GalleryScreen.tsx#   CG 鉴赏
    │   └── AboutScreen.tsx  #   关于页
    └── lib/game/
        ├── script.ts        #   剧本数据（中文）
        ├── engine.ts        #   引擎（推进/存档/解锁）
        └── types.ts         #   类型与配置
```

## 🔧 修改剧本

剧情全部集中在 `src/lib/game/script.ts`，采用指令序列 + 标签跳转结构：

```ts
{ t: "bg", src: "/assets/bg/shrine.jpg" },         // 换背景
{ t: "show", figure: { id: "yoshino" } },          // 显示立绘
{ t: "say", who: "朝武芳乃", text: "……" },          // 台词
{ t: "choice", options: [{ goto: "route_a" }] },   // 分支
{ t: "jump", id: "route_a" },                      // 跳转
```

## ⚖️ 版权声明

- 《千恋＊万花》（せんれん＊ばんか）© **Yuzu-soft** —— 名称、角色、美术、音乐之一切权利归原权利方所有。
- 本仓库为**非官方、非营利**的粉丝作品，与 Yuzu-soft 无任何关联；不包含任何成人（R18）内容。
- 图片与音乐素材搜集自公开网络，仅作粉丝致敬用途；若权利方提出要求将立即移除。
- 剧情文本为避免侵权均为原创改写。
- 喜欢本作请支持官方：[官方站点](https://www.yuzu-soft.com/senren/) ｜ Steam / Nintendo Switch 全年龄版发售中。

## 📄 License

代码部分以 [MIT](./LICENSE) 授权（不含第三方素材的权利授权）。

---

<p align="center">Fan-made with ♥ ｜ <a href="https://github.com/43aquarius/web-senrenbanka">GitHub</a></p>
