/**
 * MathJax Loader (Robust Version)
 * 职责：加载 MathJax 并提供可靠的渲染接口
 */
window.MathBook = window.MathBook || {};

MathBook.math = {
    isLoaded: false,
    queue: [], // 渲染队列，防止加载前调用丢失

    init: () => {
        if (MathBook.math.isLoaded) return;

        // 1. 配置
        window.MathJax = {
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                tags: 'ams',
                macros: {
                    R: "{\\mathbb{R}}",
                    N: "{\\mathbb{N}}",
                    P: ["{\\mathbb{P}(#1)}", 1],
                    E: ["{\\mathbb{E}[#1]}", 1],
                    bm: ["{\\boldsymbol{#1}}", 1]
                }
            },
            svg: { fontCache: 'global' },
            startup: {
                typeset: false, // 手动控制
                pageReady: () => {
                    return MathJax.startup.defaultPageReady().then(() => {
                        console.log("✅ MathJax Startup Complete");
                        MathBook.math.isLoaded = true;
                        MathBook.math.flushQueue();
                    });
                }
            }
        };

        // 2. 注入脚本
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        script.async = true;
        document.head.appendChild(script);
    },

    // 外部调用此方法渲染公式
    render: (elementId = 'content') => {
        const el = document.getElementById(elementId);
        if (!el) return;

        if (MathBook.math.isLoaded && window.MathJax && window.MathJax.typesetPromise) {
            // 已加载，直接渲染
            window.MathJax.typesetPromise([el]).catch(err => console.log(err));
        } else {
            // 未加载，加入队列
            console.log("⏳ MathJax loading, rendering queued...");
            MathBook.math.queue.push(el);
        }
    },

    // 处理队列
    flushQueue: () => {
        if (MathBook.math.queue.length > 0) {
            window.MathJax.typesetPromise(MathBook.math.queue).then(() => {
                MathBook.math.queue = [];
            });
        }
    }
};