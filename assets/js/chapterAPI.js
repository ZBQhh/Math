window.MathBook = window.MathBook || {};
MathBook.state = MathBook.state || {};
MathBook.state.labels = {};

function extractLabel(content, num, id) {
    if (!content) return content;
    return content.replace(/\\label\{([^}]+)\}/g, (match, key) => {
        MathBook.state.labels[key] = { number: num, id: id };
        return '';
    });
}

window.chapter = function(chapterTitle) {
    const chapIndex = MathBook.state.chapters.length;
    const chapNum = chapIndex + 1;
    const currentChapter = { title: chapterTitle, content: [], sections: [], id: `chap-${chapIndex}` };
    
    let counters = { section: 0, subsection: 0, equation: 0, envs: {} };
    if (MathBook.config && MathBook.config.environments) Object.keys(MathBook.config.environments).forEach(key => counters.envs[key] = 0);

    const api = {
        // [修改] 接收 options 参数
        text: (str, options = {}) => { 
            currentChapter.content.push(MathBook.templates.text(str, options)); 
            return api; 
        },
        image: (src, cap) => { currentChapter.content.push(MathBook.templates.image(src, cap)); return api; },
        section: (title) => {
            counters.section++; counters.subsection = 0; counters.equation = 0;
            const num = `${chapNum}.${counters.section}`;
            const id = `sec-${num.replace('.', '-')}`;
            const cleanTitle = extractLabel(title, num, id);
            currentChapter.content.push(MathBook.templates.section(id, num, cleanTitle));
            currentChapter.sections.push({ title: cleanTitle, id: id, num: num });
            return api;
        },
        subsection: (title) => {
            counters.subsection++;
            const num = `${chapNum}.${counters.section}.${counters.subsection}`;
            const id = `sec-${num.replace(/\./g, '-')}`;
            const cleanTitle = extractLabel(title, num, id);
            currentChapter.content.push(MathBook.templates.subsection(id, num, cleanTitle));
            return api;
        },
        formula: (tex, options = {}) => {
            counters.equation++;
            const eqNum = `(${chapNum}.${counters.section}.${counters.equation})`;
            const id = `eq-${chapNum}-${counters.section}-${counters.equation}`;
            let cleanTex = tex;
            if (tex.includes('\\label')) {
               cleanTex = tex.replace(/\\label\{([^}]+)\}/g, (match, key) => {
                   MathBook.state.labels[key] = { number: eqNum, id: id };
                   return ''; 
               });
            }
            currentChapter.content.push(MathBook.templates.formula(cleanTex, id, eqNum));
            return api;
        }
    };

    if (MathBook.config && MathBook.config.environments) {
        Object.keys(MathBook.config.environments).forEach(key => {
            const cfg = MathBook.config.environments[key];
            api[key] = (title, content) => {
                let fullNum = "", id = "";
                if (cfg.noNumber) {
                    fullNum = cfg[MathBook.config.language];
                    id = `env-${key}-${Math.random().toString(36).substr(2, 5)}`;
                } else {
                    counters.envs[key]++;
                    const num = `${chapNum}.${counters.envs[key]}`;
                    fullNum = `${cfg[MathBook.config.language]} ${num}`;
                    id = `env-${key}-${num.replace('.', '-')}`;
                }
                const cTitle = extractLabel(title, fullNum, id);
                const cContent = extractLabel(content, fullNum, id);
                currentChapter.content.push(MathBook.templates.block({
                    type: key, title: cTitle, content: cContent, number: fullNum,
                    color: cfg.color, icon: cfg.icon, id: id
                }));
                return api;
            };
        });
    }
    MathBook.state.chapters.push(currentChapter);
    return api;
};