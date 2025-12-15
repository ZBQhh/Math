/**
 * Config.js
 * 全局配置：环境定义、书籍信息
 */
window.MathBook = window.MathBook || {};

MathBook.config = {
    language: 'zh', // 'zh' | 'en'
    
    // 书籍信息
    bookInfo: {
        title: "数学分析笔记",
        subtitle: "重构版的现代化数学书",
        author: "MathBook Author",
        date: "2023 Edition",
        description: "这是一个基于 HTML5 + CSS Variables 构建的响应式数学书模板。支持链式调用编写、自动化编号、移动端适配以及深色模式。"
    },

    // 环境注册表 (Macaron Palette)
    environments: {
        // === 1. 基础定义类 (蓝色系 - 核心基础) ===
        definition: { zh: "定义", en: "Definition", color: "#2563eb", icon: "📝" }, // Blue
        axiom:      { zh: "公理", en: "Axiom",      color: "#1d4ed8", icon: "🏛️" }, // Dark Blue
        postulate:  { zh: "公设", en: "Postulate",  color: "#3b82f6", icon: "📐" }, 
        principle:  { zh: "原理", en: "Principle",  color: "#60a5fa", icon: "🧭" },
        law:        { zh: "定律", en: "Law",        color: "#1e3a8a", icon: "⚖️" },

        // === 2. 定理命题类 (紫色系 - 核心结论) ===
        theorem:    { zh: "定理", en: "Theorem",    color: "#7c3aed", icon: "⭐" }, // Violet
        proposition:{ zh: "命题", en: "Proposition",color: "#8b5cf6", icon: "🎯" },
        lemma:      { zh: "引理", en: "Lemma",      color: "#a78bfa", icon: "🍃" },
        corollary:  { zh: "推论", en: "Corollary",  color: "#c4b5fd", icon: "🔗" },
        claim:      { zh: "断言", en: "Claim",      color: "#6d28d9", icon: "🗣️" },
        fact:       { zh: "事实", en: "Fact",       color: "#5b21b6", icon: "📌" },

        // === 3. 性质条件类 (红色/粉色系 - 约束与特性) ===
        property:   { zh: "性质", en: "Property",   color: "#ef4444", icon: "✨" }, // Red
        criterion:  { zh: "判别", en: "Criterion",  color: "#f87171", icon: "🔍" },
        condition:  { zh: "条件", en: "Condition",  color: "#fca5a5", icon: "🚦" },
        case:       { zh: "情形", en: "Case",       color: "#dc2626", icon: "📂" },

        // === 4. 算法与构造 (青色系 - 过程与方法) ===
        algorithm:  { zh: "算法", en: "Algorithm",  color: "#0891b2", icon: "💻" }, // Cyan
        method:     { zh: "方法", en: "Method",     color: "#22d3ee", icon: "🛠️" },
        procedure:  { zh: "过程", en: "Procedure",  color: "#06b6d4", icon: "🔄" },
        construction:{zh: "构造", en: "Construction",color:"#67e8f9", icon: "🏗️" },

        // === 5. 示例与练习 (绿色系 - 实践) ===
        example:    { zh: "例",   en: "Example",    color: "#059669", icon: "💡" }, // Emerald
        exercise:   { zh: "练习", en: "Exercise",   color: "#10b981", icon: "✍️" },
        problem:    { zh: "问题", en: "Problem",    color: "#14b8a6", icon: "❓" },
        question:   { zh: "疑问", en: "Question",   color: "#06b6d4", icon: "🤔" },

        // === 6. 证明与解答 (橙色/琥珀系 - 逻辑推演) ===
        // 注意：proof 和 solution 设置 noNumber: true，通常不编号
        proof:      { zh: "证明", en: "Proof",      color: "#ea580c", icon: "🛡️", noNumber: true }, // Orange
        solution:   { zh: "解答", en: "Solution",   color: "#f97316", icon: "🔓", noNumber: true },
        answer:     { zh: "答案", en: "Answer",     color: "#fb923c", icon: "✅", noNumber: true },
        sketch:     { zh: "概要", en: "Sketch",     color: "#fdba74", icon: "📝", noNumber: true },

        // === 7. 注释与警告 (灰色/特殊色) ===
        remark:     { zh: "评注", en: "Remark",     color: "#64748b", icon: "💬" }, // Slate
        note:       { zh: "注记", en: "Note",       color: "#475569", icon: "📒" },
        notation:   { zh: "记号", en: "Notation",   color: "#1e293b", icon: "🔣" },
        convention: { zh: "约定", en: "Convention", color: "#0f172a", icon: "🤝" },
        summary:    { zh: "总结", en: "Summary",    color: "#ca8a04", icon: "📜" }, // Yellow
        warning:    { zh: "警告", en: "Warning",    color: "#ef4444", icon: "⚠️" }, // Red
        conjecture: { zh: "猜想", en: "Conjecture", color: "#db2777", icon: "🔮" }  // Pink
    }
};

// 运行时状态
MathBook.state = {
    chapters: [],           
    currentChapterIndex: -1,
    labels: {} // 引用存储
};