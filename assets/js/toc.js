window.MathBook = window.MathBook || {};

MathBook.toc = {
    init: () => {
        // 滚动隐藏汉堡按钮
        let lastY = 0;
        window.addEventListener('scroll', () => {
            const currY = window.scrollY;
            const btn = document.getElementById('menu-toggle');
            if(btn && !document.body.classList.contains('sidebar-open')) {
                if(currY > lastY && currY > 50) btn.style.transform = "translateY(-100px)";
                else btn.style.transform = "translateY(0)";
            }
            lastY = currY;
        }, {passive:true});
    },
    
    toggle: () => document.body.classList.toggle('sidebar-open'),
    close: () => document.body.classList.remove('sidebar-open'),
    
    // 侧边栏折叠逻辑
    toggleSubMenu: (btn, idx) => {
        btn.classList.toggle('expanded');
        const list = document.getElementById(`toc-sub-${idx}`);
        if(list) list.classList.toggle('open');
    }
};