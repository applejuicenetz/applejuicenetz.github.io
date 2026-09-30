document.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('faq-search');
    if (!root) return;

    const input = document.getElementById('faq-search-query');
    const status = document.getElementById('faq-search-status');
    const results = document.getElementById('faq-search-results');
    const query = (new URLSearchParams(window.location.search).get('q') || '').trim();
    input.value = query;

    if (!query) {
        status.textContent = 'Gib einen Suchbegriff ein, um die FAQ zu durchsuchen.';
        return;
    }

    status.textContent = 'Suche läuft …';
    try {
        const response = await fetch(root.dataset.indexUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const index = lunr.Index.load(data.index);
        const terms = lunr.tokenizer(query).map(token => token.toString());
        const matches = terms.length ? index.query(builder => {
            terms.forEach(term => {
                builder.term(term, { presence: lunr.Query.presence.OPTIONAL });
                builder.term(term, { wildcard: lunr.Query.wildcard.TRAILING, boost: 0.5 });
            });
        }) : [];

        status.textContent = matches.length === 1 ? '1 Treffer' : `${matches.length} Treffer`;
        const siteRoot = new URL(root.dataset.siteRoot, window.location.origin);
        matches.forEach(match => {
            const entry = data.documents[match.ref];
            if (!entry) return;
            const article = document.createElement('article');
            article.className = 'box';
            const heading = document.createElement('h2');
            heading.className = 'title is-5';
            const link = document.createElement('a');
            link.href = new URL(entry.url, siteRoot).href;
            link.textContent = entry.title;
            heading.appendChild(link);
            const section = document.createElement('p');
            section.className = 'has-text-grey mb-2';
            section.textContent = entry.section;
            const excerpt = document.createElement('p');
            excerpt.textContent = entry.excerpt;
            article.append(heading, section, excerpt);
            results.appendChild(article);
        });
    } catch (error) {
        status.textContent = 'Die FAQ-Suche konnte nicht geladen werden. Bitte versuche es später erneut.';
        console.error('FAQ search failed:', error);
    }
});
