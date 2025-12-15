chapter("重构测试章节")
    .text("这是一段测试文本，用于验证重构是否成功。")
    
    .section("自动化环境测试")
    .definition("单一数据源", "Single Source of Truth，指所有配置只在一个地方定义。")
    .theorem("渲染定理", "如果这行字是橙色的，且有个星星图标，说明重构成功了！")
    
    .section("公式测试")
    .text("下面是一个著名的公式：")
    .formula("e^{i\\pi} + 1 = 0");
    chapter("极限与连续")
    .section("数列极限")
    
    .definition("数列收敛", "如果对于任意 $\\epsilon > 0$...")
    // 应该显示：定义 1.1
    
    .theorem("唯一性", "收敛数列的极限是唯一的。")
    // 应该显示：定理 1.1 (注意：定理独立计数，所以是 1.1，不是 1.2)
    
    .proof(null, "假设有两个极限 $a$ 和 $b$...")
    // 应该显示：证明 (无编号)
    
    .definition("柯西列", "...")
    // 应该显示：定义 1.2 (接上一个定义的计数)

    .section("函数极限")
    // 这里进入 1.2 节
    
    .theorem("海涅归结原则", "...")
    // 应该显示：定理 1.2 (接上一个定理的计数)
    chapter("基础理论与引用测试")
    .text("本章测试引用系统。请看下方的定理。")
    
    .section("核心定义")
    
    // 1. 定义 label (在标题或内容里写 \label{...})
    .definition("极限", "极限的定义是... \\label{def:limit}")
    
    .text("根据定义 \\ref{def:limit}，我们可以推导...")
    
    .section("主要定理")
    
    .theorem("中值定理", "如果函数连续... \\label{thm:mvt}")
    
    .text("定理 \\ref{thm:mvt} 是微积分的核心。")
    
    .proof(null, "由定义 \\ref{def:limit} 可直接证明。")
    
    .subsection("测试跳转")
    .text("点击这里跳转回中值定理：定理 \\ref{thm:mvt}。")