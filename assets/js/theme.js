/**
 * Theme Manager
 */
window.MathBook = window.MathBook || {};

MathBook.theme = {
    init: () => {
        // 1. 读取本地存储
        const savedTheme = localStorage.getItem('mathbook-theme');
        // 2. 读取系统偏好
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // 3. 应用深色模式
        // 逻辑：如果存了dark，或者没存但系统是dark -> 开启深色
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            document.documentElement.classList.add('theme-dark');
        } else {
            document.documentElement.classList.remove('theme-dark');
        }
        
        console.log("✅ Theme Manager Loaded");
    },

    toggle: () => {
        // 切换 class
        const isDark = document.documentElement.classList.toggle('theme-dark');
        // 保存偏好
        localStorage.setItem('mathbook-theme', isDark ? 'dark' : 'light');
        
        // (可选) 这里可以加一个 console log 测试是否触发
         console.log("Theme Toggled:", isDark ? "Dark" : "Light");
    }
};