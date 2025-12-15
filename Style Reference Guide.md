这是一份为您精心整理的 **MathBook 样式速查与修改指南 (Style Reference Guide)**。

请将这份清单保存好。以后无论您想调整**颜色、间距、字体**还是**布局**，查阅此表即可快速定位文件和代码行。

---

### 📂 1. 全局基础 (Global Settings)
**文件位置**: `assets/css/variables.css` & `assets/css/layout.css`

| 你想改什么？ | 文件 | CSS 选择器 / 变量 | 说明 |
| :--- | :--- | :--- | :--- |
| **全局字号** | `layout.css` | `:root { font-size: ... }` | 默认 `19px`。改大此值，全站所有元素都会等比变大。 |
| **主题色 (蓝)** | `variables.css` | `--primary` | 按钮、链接、高亮的主色调。 |
| **背景色 (白/深)** | `variables.css` | `--bg-body` | 网页背景色。记得分别修改 `:root` (浅色) 和 `html.theme-dark` (深色)。 |
| **正文字体** | `variables.css` | `--font-body` | 界面 UI 字体。 |
| **阅读字体** | `variables.css` | `--font-heading` | 标题字体（推荐无衬线）。 |

---

### 📐 2. 布局与留白 (Layout & Spacing)
**文件位置**: `assets/css/layout.css`

| 你想改什么？ | CSS 选择器 | 关键属性 | 建议调整方式 |
| :--- | :--- | :--- | :--- |
| **侧边栏宽度** | `#sidebar` | `width` | 默认 `15rem`。改了这里也要改 `#content` 的 `margin-left`。 |
| **内容区宽度** | `#content` | `max-width` | 默认 `1600px`。想窄一点改小，想宽一点改大。 |
| **电脑端左右留白** | `#content` | `padding` | `padding: 5rem 6% ...`。调整 `6%` 可以控制文字距离屏幕边缘的距离。 |
| **手机端左右留白** | `@media ... #content` | `padding` | 位于文件底部。保持 `1.5rem` 左右，不要太大。 |
| **全局行高** | `body` | `line-height` | 默认 `1.8`。数字越大，行与行之间越疏松。 |

---

### 📖 3. 封面与目录 (Cover & TOC)
**文件位置**: `assets/css/components.css`

| 你想改什么？ | CSS 选择器 | 说明 |
| :--- | :--- | :--- |
| **封面大标题大小** | `.cover-title` | `font-size`。默认 `4.5rem`。 |
| **封面标题渐变色** | `.cover-title` | `background: linear-gradient(...)`。修改这里的颜色代码。 |
| **封面列表布局** | `a.home-list-item` | `grid-template-columns`。控制 [数字 | 标题 | 箭头] 的宽度比例。 |
| **侧边栏一级字体** | `.toc-link` | `font-size`, `padding`。 |
| **侧边栏二级字体** | `.toc-sub-link` | `color` (颜色), `font-size` (大小)。 |

---

### 📝 4. 章节内容与排版 (Content)
**文件位置**: `assets/css/components.css`

| 你想改什么？ | CSS 选择器 | 说明 |
| :--- | :--- | :--- |
| **Chapter 标题** | `.chapter-title` | `font-size` (大小), `letter-spacing` (字间距)。 |
| **标题下划线** | `.chapter-header-wrapper` | `border-bottom`。可改粗细、单双线 (solid/double)。 |
| **Section 标题** | `.section-title` | 二级标题的大小和下划线。 |
| **段落首行缩进** | `.chapter-body p` | `text-indent: 2em`。如果不想要缩进，设为 `0`。 |
| **列表左侧缩进** | `.chapter-body ul/ol` | `padding-left: 2em`。控制圆点/数字距离左边的距离。 |

---

### 🧮 5. 数学环境与公式 (Math & Blocks)
**文件位置**: `assets/css/components.css` (样式) & `assets/js/config.js` (颜色)

| 你想改什么？ | 位置 | 关键点 |
| :--- | :--- | :--- |
| **环境块背景色** | `components.css` -> `.macaron-block` | `background`。目前设为跟随页面背景。 |
| **环境块左侧彩条宽** | `components.css` -> `.block-side-strip` | `width: 5px`。 |
| **环境块内部间距** | `components.css` -> `.block-content` | `padding: 1.5rem`。觉得太挤就改大，太松就改小。 |
| **公式滚动条颜色** | `components.css` -> `.math-formula...` | `::-webkit-scrollbar-thumb` 中的 `background-color`。 |
| **行内公式间距** | `components.css` (最底部) | `mjx-container:not(...) { margin: 0 0.25em }`。 |
| **定义/定理的颜色** | **`assets/js/config.js`** | 修改 `environments` 对象里的十六进制颜色代码。 |

---

### 🔘 6. 交互组件 (Buttons & Search)
**文件位置**: `assets/css/components.css`

| 你想改什么？ | CSS 选择器 | 说明 |
| :--- | :--- | :--- |
| **底部导航卡片** | `a.nav-btn` | `border-radius` (圆角), `border` (边框)。 |
| **底部导航悬停** | `a.nav-btn:hover` | `transform` (上浮幅度), `box-shadow` (阴影)。 |
| **搜索弹窗背景** | `.search-modal-backdrop` | `background: rgba(...)`。控制遮罩层的黑度。 |
| **引用跳转高亮** | `.flash-highlight` | `animation`。控制跳转后黄色闪烁的时长。 |

---

### ⚡️ 常用修改场景 (Quick Recipes)

**场景 1：我觉得深色模式背景太黑了，想灰一点。**
> 1. 打开 `assets/css/variables.css`。
> 2. 找到 `html.theme-dark` 下的 `--bg-body`。
> 3. 将 `#0f172a` 改为 `#1e293b` (更灰一点)。

**场景 2：我想让正文段落之间距离大一点。**
> 1. 打开 `assets/css/components.css`。
> 2. 找到 `.chapter-body p`。
> 3. 修改 `margin-bottom: 1em;` 为 `1.5em;`。

**场景 3：我想把“定义”变成红色。**
> 1. 打开 `assets/js/config.js`。
> 2. 找到 `definition`。
> 3. 把 `color: "#2563eb"` 改为 `color: "#ef4444"`。

**场景 4：我想去掉行内公式左右的间隙。**
> 1. 打开 `assets/css/components.css`。
> 2. 翻到最底部 `mjx-container:not...`。
> 3. 把 `margin: 0 0.25em;` 改为 `margin: 0;`。

这份清单涵盖了 99% 的定制需求。祝您使用愉快！