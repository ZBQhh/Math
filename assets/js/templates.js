/**
 * Templates.js
 */
window.MathBook = window.MathBook || {};

MathBook.copyAnchor = (id) => {
    const shareUrl = window.location.href.split('#')[0] + '#' + id;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
            if(MathBook.ui && MathBook.ui.showToast) MathBook.ui.showToast("链接已复制");
        });
    }
};

MathBook.templates = {
    // 1. 封面 (New List Layout)
    home: (info, chapters) => {
        const chapterListHtml = chapters.map((chap, index) => `
            <a href="#chapter-${index}" class="home-list-item">
                <div class="list-num">
                    <span class="chap-tag">CHAP</span>
                    <span class="chap-id">${String(index + 1).padStart(2, '0')}</span>
                </div>
                <div class="list-content">
                    <div class="list-title">${chap.title}</div>
                    <div class="list-meta">${chap.sections.length} Sections</div>
                </div>
                <div class="list-arrow">→</div>
            </a>
        `).join('');

        return `
        <div class="cover-wrapper">
            <div class="cover-hero">
                <h1 class="cover-title">${info.title}</h1>
                <div class="cover-subtitle">${info.subtitle}</div>
                <div class="cover-badges">
                    <span class="badge">👤 ${info.author}</span>
                    <span class="badge">📅 ${info.date}</span>
                </div>
            </div>

            <div class="cover-toc">
                <h3 class="toc-header">TABLE OF CONTENTS</h3>
                <div class="toc-list-wrapper">
                    ${chapterListHtml}
                </div>
            </div>
        </div>
        `;
    },

    image: (src, caption) => `
        <figure class="chapter-image">
            <img src="${src}" alt="${caption}" loading="lazy" onclick="window.open(this.src)">
            ${caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>
    `,

    text: (content, options = {}) => {
        const classes = (options.indent === false) ? 'no-indent' : '';
        return `<p class="${classes}">${content}</p>`;
    },

    section: (id, num, title) => `<h2 id="${id}" class="section-title"><span class="sec-num" onclick="MathBook.copyAnchor('${id}')">${num}</span> ${title}</h2>`,

    subsection: (id, num, title) => `<h3 id="${id}" class="subsection-title"><span class="sec-num" onclick="MathBook.copyAnchor('${id}')">${num}</span> ${title}</h3>`,

    block: (data) => `
        <div class="macaron-block type-${data.type}" id="${data.id}" style="--env-color: ${data.color}">
            <div class="block-side-strip"></div>
            <div class="block-main">
                <div class="block-header"><span class="block-icon">${data.icon}</span><span class="block-title" onclick="MathBook.copyAnchor('${data.id}')">${data.number} ${data.title ? `(${data.title})` : ''}</span></div>
                <div class="block-content">${data.content}</div>
            </div>
        </div>`,

    formula: (tex, id, eqNum) => {
        if (eqNum) {
            return `<div class="math-formula numbered" id="${id}" onclick="MathBook.copyAnchor('${id}')"><div class="formula-content">$$ ${tex} $$</div><div class="formula-number">${eqNum}</div></div>`;
        } else {
            return `<div class="math-formula" ${id ? `id="${id}"` : ''}>$$ ${tex} $$</div>`;
        }
    }
};