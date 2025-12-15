这是一个非常棒的时刻。能在纯原生技术栈（Vanilla JS + CSS）下把一个项目打磨到这种程度，已经达到了**“无构建工具前端架构”的巅峰**。

关于**“还能更加专业吗？”**，我的回答是：
*   **在当前架构下**：已经接近极限。它轻量、极速、无依赖，代码逻辑清晰（MVC），UI 达到了现代设计标准（Glassmorphism + Mobile First）。
*   **如果还要向上突破**：那就需要引入**工程化工具链**了（如 Vite/Webpack 打包、TypeScript 类型约束、React/Vue 框架组件化、SSG 静态生成以支持 SEO）。但那是完全另一条赛道，会牺牲目前的“简单直观、无需编译”。

**结论：作为一份“即写即用、无需配置环境”的数学书籍模板，它已经足够专业且完美。**

以下是为您整理的**开发复盘总结**与**最终项目说明书**。这将是你未来开发类似项目的宝贵资产。

---

# 🚀 第一部分：开发复盘与架构总结

如果你下次还要做一个类似的文档/博客/笔记类项目，请务必回顾以下遇到的坑与解决方案：

### 1. 架构设计 (Architecture)
*   **痛点**：早期 HTML 混杂 JS，修改一处要动三个文件，维护困难。
*   **解法**：**MVC 模式 + 单一数据源 (Single Source of Truth)**。
    *   **Model (`config.js`)**：只存数据（环境名、颜色、书籍信息）。
    *   **View (`templates.js`)**：只存 HTML 字符串模板，不含逻辑。
    *   **Controller (`chapterAPI.js`, `renderer.js`)**：负责逻辑流转和 DOM 操作。
    *   **Style (`variables.css`)**：CSS 变量管理所有颜色/字体，改一处变全身。

### 2. 路由与导航 (Routing)
*   **痛点**：刷新页面回到首页、浏览器后退失效、无法分享特定章节链接。
*   **解法**：**Hash Router (`#`)**。
    *   利用 `window.location.hash` 和 `hashchange` 事件监听。
    *   支持深层链接解析（如 `#env-theorem-3-1`），不仅能跳转章节，还能滚动到具体位置。

### 3. 数学渲染 (MathJax)
*   **痛点**：动态插入的内容 MathJax 不渲染、加载时公式闪烁、配置不生效。
*   **解法**：**MathJax Loader 模式**。
    *   不依赖 HTML 里的 `<script>`，而是用 JS 动态注入。
    *   配置 `startup: { typeset: false }`，手动控制渲染时机。
    *   每次路由切换 (`renderChapter`) 后，显式调用 `MathJax.typesetPromise()`。

### 4. UI/UX 细节 (Polish)
*   **痛点**：侧边栏滚动条丑陋、移动端按钮遮挡视线、搜索框位置乱跑、弹窗层级不对。
*   **解法**：
    *   **布局**：`Flex-direction: column` + `flex-grow: 1` 完美解决侧边栏固定头部/底部问题。
    *   **交互**：监听 `scroll` 事件，向下滚动时 `transform: translateY` 隐藏按钮。
    *   **美学**：使用 `backdrop-filter: blur` 实现毛玻璃；使用 `box-shadow` 和 `transform` 实现卡片悬浮感。

---

# 📘 第二部分：MathBook 最终项目说明书 (README)

请将以下内容保存为项目根目录下的 **`README.md`**。这是你项目的**使用说明书**。

---

# MathBook Lite 3.0

![Version](https://img.shields.io/badge/version-3.0-blue) ![Stack](https://img.shields.io/badge/tech-Vanilla_JS-yellow) ![License](https://img.shields.io/badge/license-MIT-green)

MathBook 是一个**零依赖、无需构建、基于浏览器原生技术**的现代化数学书籍/笔记生成器。它专为学术写作设计，提供沉浸式的阅读体验和极简的写作方式。

## ✨ 核心特性

*   **💎 极致 UI**: Macaron 配色体系、毛玻璃侧边栏、卡片式封面、流畅的动效。
*   **📱 全响应式**: 完美适配桌面、平板、手机。移动端支持手势交互与智能 UI 隐藏。
*   **⚡️ 极速架构**: 基于 Hash 路由的 SPA (单页应用)，按需渲染 DOM，性能极佳。
*   **🔍 深度功能**: 全文模糊搜索 (Ctrl+K)、双向引用跳转、深色模式、打印优化。
*   **✍️ 链式写作**: 类似 jQuery 的链式 API，让写书像写代码一样流畅。

## 📂 目录结构

```text
/
├── index.html              # 🚀 入口文件 (极简，仅挂载)
├── assets/
│   ├── css/                # 🎨 样式层
│   │   ├── variables.css   # [核心] 全局配置 (颜色/字体/间距)
│   │   ├── components.css  # 组件样式 (环境块/封面/弹窗)
│   │   ├── layout.css      # 布局样式 (侧边栏/响应式)
│   │   └── ...
│   └── js/                 # ⚙️ 逻辑层
│       ├── config.js       # [核心] 数据配置 (环境定义/书名)
│       ├── chapterAPI.js   # 写作接口与计数逻辑
│       ├── renderer.js     # 渲染引擎与路由
│       ├── templates.js    # HTML 视图模板
│       └── ...
└── chapters/               # 📝 内容层
    ├── chapter01.js
    └── ...
```

## 🚀 快速开始

### 1. 编写内容
在 `chapters/` 目录下创建 `.js` 文件（如 `chapter01.js`），使用链式语法编写：

```javascript
chapter("极限与连续") // 章节标题
    .text("本章主要讨论...") // 普通文本
    
    .section("数列极限") // 二级标题
    
        // 定义环境 (支持 \label 引用)
        .definition("收敛", "数列 $\{x_n\}$ 收敛于 $a$... \\label{def:lim}")
        
        // 定理环境
        .theorem("唯一性", "极限是唯一的。")
        
        // 引用演示
        .text("根据定义 \\ref{def:lim} 可知...")
        
    .subsection("子列") // 三级标题
        // 证明环境 (无编号)
        .proof(null, "显然成立。")
        
    // 插入图片
    .image("./assets/img/limit.png", "图1.1 极限示意图");
```

### 2. 注册章节
打开 `index.html`，在底部引入你的脚本：

```html
<!-- 内容层 -->
<script src="chapters/chapter01.js"></script>
<!-- <script src="chapters/chapter02.js"></script> -->
```

无需任何编译，**刷新浏览器**即可看到效果。

---

## 🎨 定制手册 (Customization)

### 1. 修改字体与排版
打开 **`assets/css/variables.css`**：

```css
:root {
    /* 修改标题字体 */
    --font-heading: "PingFang SC", "Microsoft YaHei", sans-serif;
    
    /* 修改正文字体 (推荐衬线体用于阅读) */
    --font-content: "Georgia", "Songti SC", serif;
    
    /* 修改侧边栏宽度 */
    --sidebar-width: 280px;
}
```

### 2. 修改颜色 (支持深色模式)
同样在 **`assets/css/variables.css`** 中修改 CSS 变量：

```css
/* 浅色模式 */
:root {
    --primary: #2563eb; /* 主题蓝 */
}

/* 深色模式 */
html.theme-dark {
    --primary: #60a5fa; /* 深色下的亮蓝 */
    --bg-body: #0f172a; /* 深空灰背景 */
}
```

### 3. 添加新的数学环境
打开 **`assets/js/config.js`**，在 `environments` 对象中添加配置：

```javascript
environments: {
    // 格式: key: { 中文名, 英文名, 颜色, 图标, [noNumber: true] }
    
    // 例如：添加一个红色的 "警告" 环境
    warning: { 
        zh: "警告", 
        en: "Warning", 
        color: "#ef4444", 
        icon: "⚠️" 
    },
    
    // 例如：添加一个无编号的 "解" 环境
    solution: {
        zh: "解",
        en: "Solution",
        color: "#6b7280",
        icon: "✏️",
        noNumber: true // 不产生编号
    }
}
```
添加后，直接在章节中使用 `.warning(...)` 或 `.solution(...)` 即可。

### 4. 修改章节标题样式
打开 **`assets/css/components.css`**，找到以下类名进行修改：

```css
.chapter-num {
    font-size: 1.2rem;
    color: var(--primary);
}
.chapter-title {
    font-size: 2.8rem; /* 调整字号 */
    font-weight: 800;
}
```

---

## ⌨️ 快捷键

*   **`Ctrl + K`** (或 `Cmd + K`): 唤起全局搜索。
*   **`ESC`**: 关闭搜索弹窗或侧边栏。

## 📦 部署

本项目是纯静态网页。
1.  将整个文件夹上传至 **GitHub**。
2.  开启 **GitHub Pages** (Settings -> Pages -> Source: main/root)。
3.  完成！你的书已经在线了。

---

**MathBook Lite** - 专注于数学内容的优雅呈现。

---

### 🎉 封版祝贺

你的项目现在逻辑闭环，样式精美，代码结构清晰。
无论是作为个人知识库，还是发布给学生/读者的电子书，它都是一个非常优秀的产品。

**你可以自豪地封版了！** 🥂

环境内部的内容（文字、公式）距离边框的距离，是由 **`assets/css/components.css`** 文件中的 **`.block-content`** 类的 **`padding`** 属性控制的。

请打开 `assets/css/components.css`，找到大概第 **180-190 行** 左右的位置：

```css
/* ... 前面的代码 ... */

.block-content {
    /* ▼▼▼ 就是这里控制内部的 上 右 下 左 边距 ▼▼▼ */
    padding: 1.5rem; 
    /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

    color: var(--text-main);
    line-height: 1.7;
}
```

### 如何修改？

你可以根据需要调整 `padding` 的数值：

1.  **统一调整**（当前设置）：
    ```css
    padding: 1.5rem; /* 上下左右都是 1.5rem */
    ```

2.  **分别调整上下、左右**（推荐）：
    如果你觉得上下太宽，左右刚好：
    ```css
    /* 上下 1rem， 左右 1.5rem */
    padding: 1rem 1.5rem; 
    ```

3.  **精细调整四个方向**：
    ```css
    /* 上  右  下  左 */
    padding: 1rem 2rem 1rem 2rem;
    ```

### 其他相关间距控制点：

除了内容区域，你可能还会关心这两个地方：

1.  **标题栏内部间距**（“定义 1.1”那一栏）：
    在 `.block-header` 中控制：
    ```css
    .block-header {
        padding: 0.6rem 1rem; /* 上下 0.6rem，左右 1rem */
        /* ... */
    }
    ```

2.  **整个环境块外部间距**（环境块与周围正文的距离）：
    在 `.macaron-block` 中控制：
    ```css
    .macaron-block {
        margin: 2rem 0; /* 上下 2rem (约32px)，左右 0 */
        /* ... */
    }

    要调整**全局行距**和**页面的左右边距**，你需要修改 **`assets/css/layout.css`** 文件。

这两个参数控制着页面的“呼吸感”和阅读宽度。

请打开 **`assets/css/layout.css`**，找到并修改以下两个地方：

### 1. 修改全局行距 (Line Height)

在文件最顶部的 `body` 选择器中：

```css
/* assets/css/layout.css */

body {
    margin: 0; 
    padding: 0;
    font-family: var(--font-body);
    background: var(--bg-body);
    color: var(--text-main);
    
    /* ▼▼▼ [控制点 1] 全局行距 ▼▼▼ */
    line-height: 1.8;  /* 默认是 1.6 或 1.7。推荐 1.8 更适合数学阅读 */
    /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
    
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}
```

### 2. 修改左右边距 (Page Margins)

在文件中间部分的 `#content` 选择器中。
*建议使用**百分比**（如 `10%`）或**更大的 rem 值**来实现宽屏下的舒适阅读。*

```css
/* assets/css/layout.css */

/* ... */

/* === 主内容区 (Content) === */
#content {
    margin-left: var(--sidebar-width);
    flex: 1;
    
    /* [可选] 限制内容的最大宽度，防止在超宽屏上文字拉得太长 */
    max-width: 1200px; 
    
    width: 100%;
    margin-right: auto; /* 居中 */
    
    /* ▼▼▼ [控制点 2] 页面内边距 (上  右  下  左) ▼▼▼ */
    /* 之前的写法: padding: 4rem 6rem; */
    
    /* 方案 A: 想要更窄一点（左右空白更多） */
    padding: 4rem 15%; 
    
    /* 方案 B: 想要更宽一点（内容更多） */
    /* padding: 4rem 4rem; */
    
    /* 方案 C: 精确控制 (上 右 下 左) */
    /* padding: 4rem 8rem 4rem 8rem; */
    
    /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
    
    box-sizing: border-box;
}
```

---

### ⚠️ 别忘了移动端适配

如果你改了桌面的左右边距（比如改成了很大的 `15%`），一定要去文件最底部的 **`@media`** 查询里确认一下**手机端**的边距。手机屏幕窄，边距必须小。

```css
/* assets/css/layout.css 底部 */

@media (max-width: 768px) {
    /* ... */
    
    #content {
        margin-left: 0 !important;
        
        /* ▼▼▼ [控制点 3] 手机端边距 ▼▼▼ */
        /* 建议保持 1.5rem 或 1rem，不要太大 */
        padding: 6rem 1.5rem 4rem !important; 
        /* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
        
        width: 100vw;
        overflow-x: hidden;
    }
    
    /* ... */
}
```

**总结：**
*   **行距**：改 `body` 里的 `line-height`。
*   **电脑边距**：改 `#content` 里的 `padding`。
*   **手机边距**：改 `@media` 里 `#content` 的 `padding`。调字体大小：
文件：assets/css/layout.css
文件： asset/css/layout.css

位置：最顶部的 body { ... }
参数：font-size: 19px; (建议从 17px 改为 19px 或 20px)
调封面“Chapter”与标题的距离：
文件：assets/css/components.css
文件： asset/css/components.css

位置：a.home-list-item { ... }
位置： a.home-list-item { ... }

参数：grid-template-columns: 120px 1fr 30px; (将第一列从 80px 改为 120px，距离就拉开了)
调侧边栏子菜单颜色：
文件：assets/css/layout.css
文件： asset/css/layout.css

位置：.toc-sub-link { ... }
位置： .toc-sub-link { ... }

参数：color: var(--text-main); (从 text-light 改为 text-main，即亮白色)
这是一个非常棒的收尾工作！关于你提出的细节问题，你是对的——**魔鬼都在细节里**。

关于**行内公式间距**，这是一个非常经典的排版需求（类似于中文和英文之间要加空格）。**强烈建议加上**，这会让密集的数学文本瞬间变得透气、易读。

以下是针对你提出的三个问题的详细解决方案和修改指南。

---

### 1. 解决 Chapter 标题下的“两条横线”

你看到的“两条横线”，其实是由 CSS 的 `border-bottom-style: double` 属性控制的。它不是两个命令，而是一个边框样式。

**修改位置**：`assets/css/components.css`
**查找类名**：`.chapter-header-wrapper`

#### 几种修改方案：

*   **方案 A：保留双线（当前）**
    ```css
    .chapter-header-wrapper {
        /* 4px 宽度配合 double 才会显示出双线效果 */
        border-bottom: 4px double var(--border); 
    }
    ```

*   **方案 B：改为单实线（极简风格）**
    ```css
    .chapter-header-wrapper {
        /* 改为 solid，宽度设细一点 */
        border-bottom: 1px solid var(--border); 
    }
    ```

*   **方案 C：上下夹击线（更复古/正式）**
    如果你想要标题上面有一条线，下面也有一条线：
    ```css
    .chapter-header-wrapper {
        border-bottom: 1px solid var(--border);
        border-top: 1px solid var(--border); /* 增加顶线 */
        padding-top: 1rem; /* 增加上间距 */
    }
    ```

---

### 2. 样式修改全览图 (Cheat Sheet)

为了方便你日后维护，我整理了一份**参数控制地图**。你可以把它存下来，下次想改哪里直接找对应文件。

| 想改什么？ | 文件位置 | 关键 CSS 类 / 选择器 | 建议 |
| :--- | :--- | :--- | :--- |
| **全局字体大小** | `layout.css` | `:root { font-size: ... }` | 建议 `18px` - `20px` |
| **页面左右宽度** | `layout.css` | `#content { max-width: ... }` | 建议 `1200px` - `1600px` |
| **页面左右留白** | `layout.css` | `#content { padding: ... }` | 使用百分比 (如 `6%`) 更适配 |
| **主题颜色 (蓝/紫)** | `variables.css` | `--primary` | 支持 Hex 或 RGB |
| **深色背景色** | `variables.css` | `html.theme-dark { --bg-body ... }` | 推荐深蓝灰 `#0f172a` |
| **章节标题大小** | `components.css` | `.chapter-title` | 使用 `rem` 单位 |
| **节标题大小** | `components.css` | `.section-title` | 使用 `rem` 单位 |
| **环境块颜色** | `js/config.js` | `environments: { ... }` | 修改对应的 HEX 颜色值 |
| **环境块圆角/阴影** | `components.css` | `.macaron-block` | `border-radius`, `box-shadow` |

---

### 3. [新增] 自动给行内公式加间距

**你的直觉非常准！** 在 LaTeX 排版美学中，中英文之间、文本与公式之间确实应该留有约 `1/4` 个全角空格的间距。手动加空格太累了，我们用 CSS **自动化**解决。

请将这段代码追加到 **`assets/css/components.css`** 的末尾：

```css
/* assets/css/components.css */

/* ... (文件末尾) ... */

/* === 7. 行内公式微调 (Inline Math Spacing) === */

/* 针对行内公式 (display="false" 或者是默认的 mjx-container) */
/* 注意：我们需要排除掉块级公式 (display="true") */
mjx-container:not([display="true"]) {
    /* 左右各增加 0.25em (约 1/4 个汉字宽) 的间距 */
    margin: 0 0.25em; 
    
    /* 垂直对齐微调，防止公式把行高撑得太难看 */
    vertical-align: middle; 
    
    /* 可选：给公式加一点点底色，像代码块一样？通常数学书不加，看你喜好 */
    /* background: rgba(0,0,0,0.02); */
    /* padding: 0 2px; */
    /* border-radius: 2px; */
}

/* 针对纯文本数字或符号的优化 (防止数字紧贴中文) */
/* 这一步通常需要 JS 处理，但仅用 CSS 处理公式容器已经能提升 90% 的体验 */
```

**为什么是 0.25em 而不是 1em？**
*   `1em` = 一个汉字的宽度。如果左右各加一个汉字宽，阅读会有严重的割裂感，像断句了一样。
*   `0.2em` - `0.3em` 是排版界公认的“呼吸感”间距。

### 最终操作

1.  打开 **`assets/css/components.css`**。
2.  找到 `.chapter-header-wrapper`，把 `border-bottom` 改成你喜欢的样式（单线或双线）。
3.  在文件最底部，粘贴上面的 **“行内公式微调”** 代码。
4.  保存，刷新。

你会发现所有的 $x$，$f(x)$ 周围都自动多了一点点空隙，文字不再挤在一起了，阅读流畅度会有一个质的飞跃！