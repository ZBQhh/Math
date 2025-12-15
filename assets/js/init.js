window.onload = function() {
    console.log("🚀 App Initializing...");
    try {
        MathBook.renderer.initLayout();
        if (MathBook.math) MathBook.math.init();
        if (MathBook.toc) MathBook.toc.init();
        if (MathBook.search) MathBook.search.init();
        if (MathBook.theme) MathBook.theme.init();
        
        window.addEventListener('hashchange', MathBook.renderer.handleHash);
        setTimeout(() => {
            MathBook.renderer.handleHash();
            console.log("✅ Ready");
        }, 10);
    } catch (e) {
        console.error(e);
        document.body.innerHTML = "<h1 style='padding:2rem'>Init Error</h1>";
    }
};