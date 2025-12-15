/**
 * Renderer.js (Final Fixed Version)
 * 修复：路由黑屏问题、深层链接跳转、侧边栏结构
 */
window.MathBook = window.MathBook || {};

MathBook.renderer = {

    // 1. 初始化页面骨架
    initLayout: () => {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = `
            <!-- 移动端汉堡按钮 -->
            <button id="menu-toggle" onclick="MathBook.toc.toggle()" aria-label="Menu">
                <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
            </button>
            
            <!-- 侧边栏遮罩 -->
            <div id="sidebar-overlay" onclick="MathBook.toc.close()"></div>
            
            <!-- 侧边栏容器 -->
            <aside id="sidebar">
                <!-- 头部：固定区域 (搜索框在这里，绝对置顶) -->
                <div class="sidebar-fixed-top">
                    <div class="brand">${MathBook.config.bookInfo.title}</div>
                    
                    <div id="sidebar-search-trigger" onclick="MathBook.search.open()">
                        <span style="display:flex;align-items:center;gap:8px;">
                            <span>🔍</span><span>搜索...</span>
                        </span>
                        <span class="kbd">Ctrl K</span>
                    </div>
                </div>
                
                <!-- 中间：滚动区域 (目录) -->
                <div class="sidebar-scroll-area">
                    <div class="toc-label">目录 / Contents</div>
                    <nav id="toc"></nav>
                </div>
                
                <!-- 底部：固定区域 (主题开关) -->
                <div class="sidebar-footer">
                    <button id="theme-toggle" class="btn-theme" onclick="MathBook.theme.toggle()" title="切换深色模式">
                        <span>🌗</span>
                    </button>
                    <div class="footer-info">v3.1</div>
                </div>
            </aside>

            <!-- 主内容渲染区 -->
            <main id="content"></main>
        `;
    },

    // 2. 智能路由处理 (修复黑屏的核心)
    handleHash: () => {
        try {
            const hash = window.location.hash;
            
            // 情况 A: 没 hash 或 封面 -> 去封面
            if (!hash || hash === '#cover' || hash === '#') {
                MathBook.renderer.renderHome();
                return;
            }

            // 情况 B: 解析目标章节索引
            let chapterIndex = -1;
            let targetId = null;

            if (hash.startsWith('#chapter-')) {
                // 格式: #chapter-0
                chapterIndex = parseInt(hash.replace('#chapter-', ''));
            } else {
                // 情况 C: 深层链接 (如 #sec-2-1, #env-theorem-3-1)
                // 逻辑: 提取 ID 中的第一个数字作为章节号 (假设 ID 包含章节号信息)
                // 例如: sec-2-1 -> 2 -> index 1
                const match = hash.match(/-(\d+)/); // 寻找第一个横杠后的数字
                if (match && match[1]) {
                    chapterIndex = parseInt(match[1]) - 1; // 转换为索引 (1-based -> 0-based)
                    targetId = hash.substring(1); // 去掉 #
                }
            }

            // 检查章节是否存在
            if (!isNaN(chapterIndex) && MathBook.state.chapters[chapterIndex]) {
                MathBook.renderer.renderChapter(chapterIndex);
                
                // 如果有具体目标 ID，渲染完后滚动过去
                if (targetId) {
                    // 延时一点点，确保 DOM 渲染完成
                    setTimeout(() => MathBook.renderer.scrollToId(targetId), 150);
                }
            } else {
                // 情况 D: 找不到章节 (比如点了第 3 章的链接但只加载了第 1 章) -> 回封面
                console.warn("Chapter not found for hash:", hash);
                MathBook.renderer.renderHome();
            }

        } catch (e) {
            console.error("Router Error:", e);
            MathBook.renderer.renderHome(); // 出错保底回封面
        }
    },

    // 3. 渲染封面
    renderHome: () => {
        document.body.className = 'is-home';
        const contentEl = document.getElementById('content');
        if(contentEl) {
            contentEl.innerHTML = MathBook.templates.home(
                MathBook.config.bookInfo, MathBook.state.chapters
            );
        }
        MathBook.state.currentChapterIndex = -1;
        MathBook.renderer.renderSidebar();
        window.scrollTo(0, 0);
    },

    // 4. 渲染章节
    renderChapter: (index) => {
        const chapter = MathBook.state.chapters[index];
        const contentEl = document.getElementById('content');
        const total = MathBook.state.chapters.length;
        
        if (!chapter || !contentEl) return;

        document.body.className = 'is-reading';

        // 底部导航按钮
        const prevIdx = index - 1;
        const nextIdx = index + 1;
        let navHtml = '<div class="chapter-nav-buttons">';
        
        if (prevIdx >= 0) {
            navHtml += `<a href="#chapter-${prevIdx}" class="nav-btn prev">
                <span class="nav-sub">Previous</span>
                <span class="nav-title">${MathBook.state.chapters[prevIdx].title}</span>
            </a>`;
        } else {
            navHtml += `<a href="#cover" class="nav-btn prev">
                <span class="nav-sub">Back</span>
                <span class="nav-title">Cover</span>
            </a>`;
        }
        
        if (nextIdx < total) {
            navHtml += `<a href="#chapter-${nextIdx}" class="nav-btn next">
                <span class="nav-sub">Next</span>
                <span class="nav-title">${MathBook.state.chapters[nextIdx].title}</span>
            </a>`;
        }
        navHtml += '</div>';

        const rawHtml = `
            <div class="chapter-container">
                <div class="chapter-header-wrapper">
                    <div class="chapter-num">Chapter ${index + 1}</div>
                    <h1 class="chapter-title">${chapter.title}</h1>
                </div>
                <div class="chapter-body">${chapter.content.join('')}</div>
                ${navHtml}
            </div>
            <div style="height: 120px;"></div>
        `;

        // 处理引用链接 \ref{key}
        const parsedHtml = rawHtml.replace(/\\ref\{([^}]+)\}/g, (match, key) => {
            const label = MathBook.state.labels[key];
            if (label) {
                // 使用 onclick 确保跳转时带有高亮动画
                return `<a href="#${label.id}" class="ref-link" onclick="setTimeout(()=>MathBook.renderer.scrollToId('${label.id}'), 10)">${label.number}</a>`;
            } else {
                return `<span class="ref-error" title="Label '${key}' not found">?</span>`;
            }
        });

        contentEl.innerHTML = parsedHtml;
        MathBook.state.currentChapterIndex = index;
        
        // 更新侧边栏 (高亮当前章)
        MathBook.renderer.renderSidebar();
        
        // 触发 MathJax 渲染
        if (MathBook.math) MathBook.math.render();
        
        // 默认滚到顶部 (如果有 targetId，上面的 setTimeout 会覆盖这个)
        window.scrollTo(0, 0);
    },

    // 辅助：平滑滚动 + 高亮闪烁
    scrollToId: (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // 重置动画
            el.classList.remove('flash-highlight');
            void el.offsetWidth; // 触发 Reflow
            el.classList.add('flash-highlight');
            
            setTimeout(() => el.classList.remove('flash-highlight'), 2000);
        } else {
            console.warn("Target element not found:", id);
        }
    },

    // 渲染侧边栏 (带折叠逻辑)
    renderSidebar: () => {
        const tocEl = document.getElementById('toc');
        if(!tocEl) return;

        const activeIdx = MathBook.state.currentChapterIndex;
        let html = '<ul class="toc-root">';
        
        // 封面项
        const coverActive = activeIdx === -1 ? 'active' : '';
        html += `<li><div class="toc-item-row"><a href="#cover" class="toc-link ${coverActive}"><span class="toc-icon">🏠</span> 封面</a></div></li>`;
        
        // 章节项
        MathBook.state.chapters.forEach((chap, idx) => {
            const isActive = idx === activeIdx;
            const hasSubs = chap.sections && chap.sections.length > 0;
            
            html += `<li>
                <div class="toc-item-row">
                    <a href="#chapter-${idx}" class="toc-link ${isActive?'active':''}">
                        <span class="toc-num">${idx+1}.</span> ${chap.title}
                    </a>
                    ${hasSubs ? `<div class="toc-toggle-btn ${isActive?'expanded':''}" onclick="MathBook.toc.toggleSubMenu(this, ${idx})">▶</div>` : ''}
                </div>`;
            
            if (hasSubs) {
                // 如果是当前章节，默认展开 (open)
                html += `<ul class="toc-sub-list ${isActive?'open':''}" id="toc-sub-${idx}">`;
                chap.sections.forEach(sec => {
                    html += `<li><a href="#${sec.id}" class="toc-sub-link" onclick="MathBook.renderer.scrollToId('${sec.id}')">${sec.title}</a></li>`;
                });
                html += `</ul>`;
            }
            html += `</li>`;
        });
        html += '</ul>';
        tocEl.innerHTML = html;
    }
};