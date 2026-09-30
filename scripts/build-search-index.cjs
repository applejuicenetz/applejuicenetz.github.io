const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');
const lunr = require('lunr');

const siteDir = path.resolve(process.argv[2] || 'docs/_site');
const faqDir = path.join(siteDir, 'faq');
const documents = {};

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      visit(fullPath);
    } else if (entry.name === 'index.html') {
      const $ = cheerio.load(fs.readFileSync(fullPath, 'utf8'));
      const section = $('main h1').first().text().trim() || $('title').text().split('|')[0].trim();
      const pagePath = path.relative(siteDir, path.dirname(fullPath)).split(path.sep).join('/');

      $('main .content.is-medium > .box').each((_, box) => {
        const heading = $(box).children('h2[id], h3[id]').first();
        if (!heading.length) return;

        const id = heading.attr('id');
        const title = heading.text().replace(/\s+/g, ' ').trim();
        const copy = $(box).clone();
        copy.find('script, style').remove();
        const body = copy.text().replace(/\s+/g, ' ').trim();
        const url = `${pagePath}/#${encodeURIComponent(id)}`;
        documents[url] = { title, section, body, excerpt: body.slice(title.length).trim().slice(0, 190), url };
      });
    }
  }
}

visit(faqDir);
if (Object.keys(documents).length === 0) {
  throw new Error('No FAQ questions found in the Jekyll output');
}

const index = lunr(function () {
  this.ref('url');
  this.field('title', { boost: 10 });
  this.field('section', { boost: 3 });
  this.field('body');
  Object.values(documents).forEach((document) => this.add(document));
});

const dataDir = path.join(siteDir, 'assets', 'data');
const jsDir = path.join(siteDir, 'assets', 'js');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(jsDir, { recursive: true });
const summaries = Object.fromEntries(Object.entries(documents).map(([url, { title, section, excerpt }]) => [url, { title, section, excerpt, url }]));
fs.writeFileSync(path.join(dataDir, 'faq-search-index.json'), JSON.stringify({ index, documents: summaries }));
fs.copyFileSync(require.resolve('lunr/lunr.min.js'), path.join(jsDir, 'lunr.min.js'));
console.log(`Indexed ${Object.keys(documents).length} FAQ questions`);
