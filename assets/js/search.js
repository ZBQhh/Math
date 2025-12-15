/**
 * Search Module (Fixed)
 */
window.MathBook = window.MathBook || {};

MathBook.search = {
    isOpen: false,
    
    init: () => {
        // 1. 如果弹窗 HTML 不存在，注入它
        if (!document.getElementById('search-modal')) {
            const html = `
                <div id="search-modal" class="search-modal-backdrop">
                    <div class="search-modal-content">
                        <div class="search-input-header">
                            <span style="font-size:1.2rem;margin-right:10px;">🔍</span>
                            <input type="text" id="global-search-input" placeholder="输入关键词 (支持标题和正文)..." autocomplete="off">
                            <span class="search-hint" onclick="MathBook.search.close()">ESC</span>
                        </div>
                        <div id="search-results" class="search-results-body">
                            <div class="search-empty-state">准备就绪</div>
                        </div>
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', html);
        }
        
        // 2. 绑定事件
        const modal = document.getElementById('search-modal');
        const input = document.getElementById('global-search-input');
        
        // 点击黑色遮罩关闭
        modal.onclick = (e) => {
            if (e.target === modal) MathBook.search.close();
        };
        
        // 键盘快捷键 (ESC 关闭, Ctrl+K 打开)
        document.onkeydown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { 
                e.preventDefault(); 
                MathBook.search.open(); 
            }
            if (e.key === 'Escape') MathBook.search.close();
        };
        
        // 输入监听
        input.oninput = (e) => {
            MathBook.search.doSearch(e.target.value);
        };
        
        console.log("✅ Search Module Loaded");
    },
    
    open: () => {
        // 懒加载检查：如果 init 没运行或被覆盖，重新运行
        if (!document.getElementById('search-modal')) MathBook.search.init();
        
        const modal = document.getElementById('search-modal');
        const input = document.getElementById('global-search-input');
        
        if(modal) {
            modal.classList.add('active'); // 对应 CSS display: flex
            input.value = '';
            document.getElementById('search-results').innerHTML = '<div class="search-empty-state">请输入关键词...</div>';
            setTimeout(() => input.focus(), 100); // 延时聚焦，防止手机键盘弹不出
            MathBook.search.isOpen = true;
        }
    },
    
    close: () => {
        const modal = document.getElementById('search-modal');
        if(modal) {
            modal.classList.remove('active');
            MathBook.search.isOpen = false;
        }
    },
    
    doSearch: (q) => {
        const container = document.getElementById('search-results');
        if(!q || q.trim() === "") { 
            container.innerHTML = '<div class="search-empty-state">请输入关键词...</div>'; 
            return; 
        }
        
        let html = '<ul class="search-result-list">';
        let count = 0;
        
        // 遍历所有章节
        MathBook.state.chapters.forEach((chap, idx) => {
            const titleMatch = chap.title.toLowerCase().includes(q.toLowerCase());
            const contentMatch = chap.content.join(' ').toLowerCase().includes(q.toLowerCase());
            
            if (titleMatch || contentMatch) {
                html += `<li onclick="MathBook.renderer.renderChapter(${idx}); MathBook.search.close()">
                    <div class="res-title">Chapter ${idx+1}: ${chap.title}</div>
                    <div style="font-size:0.8rem;color:#666">${titleMatch ? '标题匹配' : '内容匹配'}</div>
                </li>`;
                count++;
            }
        });
        html += '</ul>';
        
        container.innerHTML = (count === 0) 
            ? '<div class="search-empty-state">未找到相关内容</div>' 
            : html;
    }
};