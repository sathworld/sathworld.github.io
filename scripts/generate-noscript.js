#!/usr/bin/env node
/**
 * Generate a static noscript fallback HTML snippet from existing resumeData.
 * Output is written to public/noscript.html and then inlined into index.html build (via placeholder).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const srcDataFile = path.join(ROOT, 'src', 'utils', 'resumeData.js');
const outFile = path.join(ROOT, 'public', 'noscript.html');

// Quick + safe extraction: require transpilation? We'll do a light eval after stripping ES module export.
let raw = fs.readFileSync(srcDataFile, 'utf8');
raw = raw.replace(/export\s+const\s+resumeData\s*=\s*/, 'const resumeData = ');
if (!/resumeData\s*=/.test(raw)) {
  console.error('Could not find resumeData definition');
  process.exit(1);
}
// Wrap to capture variable
const sandbox = { resumeData: null };
try {
  // eslint-disable-next-line no-new-func
  const fn = new Function('sandbox', `${raw}; sandbox.resumeData = resumeData;`);
  fn(sandbox);
} catch (e) {
  console.error('Error evaluating resumeData.js', e);
  process.exit(1);
}
const data = sandbox.resumeData || {};

function esc(s='') {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}
function escAttr(s='') {
  return esc(s).replace(/'/g,'&#39;');
}

function list(items, cls='') {
  if (!items || !items.length) return '';
  return `<ul class="${cls}">` + items.map(i=>`<li>${esc(i)}</li>`).join('') + '</ul>';
}

const education = data.education ? (() => {
  const edu = data.education;
  const courses = Array.isArray(edu.courses) && edu.courses.length
    ? `<div class="courses"><h3>Selected Courses</h3><ul>` + edu.courses.map(c => {
        const catsText = Array.isArray(c.categories) && c.categories.length
          ? ` (${c.categories.map(cat => esc(cat)).join(', ')})`
          : '';
        return `<li><strong>${esc(c.code)}</strong> ${esc(c.title)}${catsText}</li>`;
      }).join('') + '</ul></div>'
    : '';
  return `
  <section id="edu">
    <h2>Education</h2>
    <p><strong>${esc(edu.university)}</strong> – ${esc(edu.location)}</p>
    <p>${esc(edu.degree)} (GPA: ${esc(edu.gpa)})</p>
    <p>${esc(edu.duration)}</p>
    ${list(edu.awards, 'awards')}
    ${courses}
  </section>`;
})() : '';

const skills = Array.isArray(data.skills) ? `
  <section id="skills-static">
    <h2>Skills</h2>
    <dl>
      ${data.skills.map(s=>`<dt>${esc(s.category)}</dt><dd>${esc(s.items)}</dd>`).join('')}
    </dl>
  </section>` : '';

function renderExperience(expArr) {
  if (!Array.isArray(expArr)) return '';
  return expArr.map(e=>{
    const companyLine = e.website ? `<a href="${escAttr(e.website)}" rel="noopener noreferrer">${esc(e.company)}</a>` : esc(e.company);
    return `<article class="exp-item">
  <h3>${esc(e.title)} – ${companyLine}</h3>
  ${list(e.description,'bullets')}
</article>`;
  }).join('\n');
}
const experience = data.experience ? `
  <section id="experience">
    <h2>Experience</h2>
    ${renderExperience(data.experience)}
  </section>` : '';

function renderProjects(pArr) {
  if (!Array.isArray(pArr)) return '';
  return pArr.map(p=>{
    const tagsLine = Array.isArray(p.tags) && p.tags.length ? `<p class="tags"><strong>Tags:</strong> ${p.tags.map(t=>esc(t)).join(', ')}</p>` : '';
    const linksLine = Array.isArray(p.links) && p.links.length ? `<p class="links">` + p.links.map(l=>`<a href="${escAttr(l.url)}" rel="noopener noreferrer">${esc(l.label||'Link')}</a>`).join(' · ') + `</p>` : '';
    const filesLine = Array.isArray(p.files) && p.files.length
      ? `<p class="files">` + p.files.map(f => {
          const needsTarget = /\.pdf$/i.test(f.url) || f.type === 'pdf';
          const targetAttr = needsTarget ? ' target="_blank"' : '';
          return `<a href="${escAttr(f.url)}"${targetAttr} rel="noopener noreferrer">${esc(f.label||'File')}</a>`;
        }).join(' · ') + `</p>`
      : '';
    const imagesLine = Array.isArray(p.images) && p.images.length ? `<div class="images">` + p.images.map(src=>`<img src="${escAttr(src)}" alt="${escAttr(p.title)} image" loading="lazy" style="max-height:70px;object-fit:contain;margin:2px;">`).join('') + `</div>` : '';
    return `<article class="project-item">
  <h3>${esc(p.title)}</h3>
  <p class="meta">${esc(p.duration||'')}</p>
  ${tagsLine}
  ${linksLine}
  ${filesLine}
  ${imagesLine}
  ${list(p.description,'bullets')}
</article>`;
  }).join('\n');
}
const projects = data.projects ? `
  <section id="projects">
    <h2>Projects</h2>
    ${renderProjects(data.projects)}
  </section>` : '';

// Static resources (resumes) discovery
function getResumes() {
  const resumesDir = path.join(ROOT, 'public', 'resumes');
  try {
    const files = fs.readdirSync(resumesDir).filter(f=>/\.pdf$/i.test(f));
    if (!files.length) return '';
    return '<section id="resumes"><h2>Resumes</h2><ul>' + files.map(f=>`<li><a href="resumes/${encodeURIComponent(f)}" download>${esc(f.replace(/\.pdf$/i,''))}</a></li>`).join('') + '</ul></section>';
  } catch (_) { return ''; }
}
const resumesBlock = getResumes();

// Contact info (basic) - email obfuscated
// Dynamically extract contact/social info from SocialButtons.js
function getContactInfo() {
  const socialFile = path.join(ROOT, 'src', 'components', 'SocialButtons.js');
  let github='', linkedin='', email='';
  try {
    const src = fs.readFileSync(socialFile,'utf8');
    const ghMatch = src.match(/const\s+GITHUB_URL\s*=\s*['"]([^'"]+)['"]/);
    if (ghMatch) github = ghMatch[1];
    const liMatch = src.match(/const\s+LINKEDIN_URL\s*=\s*['"]([^'"]+)['"]/);
    if (liMatch) linkedin = liMatch[1];
    const emMatch = src.match(/const\s+EMAIL_ENC\s*=\s*['"]([^'"]+)['"]/);
    if (emMatch) {
      try { email = Buffer.from(emMatch[1], 'base64').toString('utf8'); } catch(_) {}
    }
  } catch(_) {}
  if (!github && !linkedin && !email) return '';
  let emailHtml = '';
  if (email) {
    const [user, ...rest] = email.split('@');
    const domain = rest.join('@');
    const obf = email.replace(/@/g,' [at] ').replace(/\./g,' [dot] ');
    emailHtml = `<p>Email: <b>${esc(obf)}</b></p>`;
  }
  const links = [
    github && `<a href="${esc(github)}" rel="noopener noreferrer">GitHub</a>`,
    linkedin && `<a href="${esc(linkedin)}" rel="noopener noreferrer">LinkedIn</a>`
  ].filter(Boolean).join(' · ');
  const linksHtml = links ? `<p>Links: ${links}</p>` : '';
  return `<section id="contact-static"><h2>Contact</h2>${emailHtml}${linksHtml}</section>`;
}
const contactBlock = getContactInfo();

const generated = `<!-- AUTO-GENERATED: noscript fallback -->
<div class="noscript-fallback" style="font-family: system-ui, sans-serif; line-height:1.5; max-width: 960px; margin: 2rem auto; padding: 0 1rem;">
  <style>
    :root { --accent:#6b21a8; --accent-fg:#fff; --border: #d4d4d8; --bg-soft:#fafafa; --bg-chip:#f1eefc; --fg:#1f1f23; --fg-sub:#4b4b55; }
    @media (prefers-color-scheme: dark) {
      :root { --border:#2d2d33; --bg-soft:#18181b; --bg-chip:#582982; --fg:#f4f4f5; --fg-sub:#a1a1aa; --accent:#9333ea; --accent-fg:#111; }
    }
    body, .noscript-fallback { background: var(--bg-soft); color: var(--fg); }
    .noscript-fallback a { color: var(--accent); text-decoration: none; }
    .noscript-fallback a:hover, .noscript-fallback a:focus { text-decoration: underline; outline: none; }
    .noscript-fallback h1,h2,h3,h4 { font-weight:600; line-height:1.2; letter-spacing:.5px; }
    .noscript-fallback h2 { margin:2.25rem 0 1rem; font-size:1.5rem; position:relative; }
    .noscript-fallback h2:after { content:""; position:absolute; left:0; bottom:-6px; width:60px; height:3px; background:linear-gradient(90deg,var(--accent),transparent); border-radius:2px; }
    .noscript-fallback section { margin-bottom:2.5rem; }
    .noscript-fallback p { margin:.4rem 0; }
    .noscript-fallback ul { margin:.5rem 0 1rem 1.25rem; }
    .noscript-fallback ul.bullets { list-style:disc; }
    .noscript-fallback .awards { list-style:disc; }
    .exp-item, .project-item { border:1px solid var(--border); background:rgba(255,255,255,0.6); backdrop-filter: blur(4px); padding:1rem 1.1rem 1rem; border-radius:14px; margin:0 0 1.2rem; box-shadow:0 2px 4px -2px rgba(0,0,0,.08); }
    @media (prefers-color-scheme: dark) { .exp-item, .project-item { background:rgba(24,24,27,0.6); } }
    .exp-item h3, .project-item h3 { margin:0 0 .35rem; font-size:1.05rem; }
    .meta { font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; color:var(--fg-sub); margin:.1rem 0 .6rem; }
  .tech { font-size:.74rem; margin:.25rem 0; }
  .tags, .files { font-size:.85rem; margin:.3rem 0; }
  .links { font-size:.75rem; margin:.25rem 0; }
    .tags strong, .tech strong { text-transform:uppercase; font-size:.68rem; letter-spacing:.08em; color:var(--fg-sub); margin-right:.35rem; }
  .links a, .files a { display:inline-block; padding:.42rem .7rem .4rem; border:1px solid var(--border); border-radius:10px; font-size:.75rem; background:var(--bg-chip); color:var(--fg); line-height:1.05; margin:.25rem .35rem .25rem 0; letter-spacing:.25px; }
  .links a:hover, .files a:hover { background:var(--accent); color:var(--accent-fg); border-color:var(--accent); text-decoration:none; }
    .images { margin:.4rem 0 .6rem; display:flex; flex-wrap:wrap; gap:.4rem; }
    .images img { border:1px solid var(--border); border-radius:10px; background:#fff; padding:.35rem; }
    @media (prefers-color-scheme: dark) { .images img { background:#141417; } }
    dl { display:grid; grid-template-columns: minmax(140px,190px) 1fr; gap:.4rem .9rem; margin:.75rem 0 0; }
    dt { font-weight:600; font-size:.8rem; text-transform:uppercase; letter-spacing:.05em; color:var(--fg-sub); }
    dd { margin:0; font-size:.85rem; }
    .courses h3 { font-size:.85rem; text-transform:uppercase; letter-spacing:.06em; font-weight:600; margin:1.4rem 0 .4rem; color:var(--fg-sub); }
    .courses ul { list-style:none; margin:0; padding:0; }
    .courses li { display:flex; gap:1rem; align-items:center; padding:4px 0; font-size:.9rem; line-height:1.3; }
    .courses li strong { display:inline-flex; align-items:center; justify-content:center; min-width:78px; text-align:center; font-variant-numeric:tabular-nums; font-size:.85rem; background:var(--bg-chip); padding:.38rem .6rem; border-radius:999px; letter-spacing:.5px; }
    footer { border-top:1px solid var(--border); padding-top:1.25rem; }
    @media print { .noscript-fallback { box-shadow:none; background:#fff; } .exp-item, .project-item { break-inside:avoid; page-break-inside:avoid; } a { color:#000; } }
  </style>
  <header style="margin-bottom:2rem;">
    <h1 style="margin:0 0 .5rem; font-size:2rem;">Damir Gazizullin</h1>
    <p>Portfolio (static fallback). JavaScript is disabled; interactive / 3D features hidden.</p>
    <p><a href="#projects">Projects</a> · <a href="#edu">Education</a> · <a href="#experience">Experience</a> · <a href="#skills-static">Skills</a></p>
  </header>
  ${contactBlock}
  ${resumesBlock}
  ${projects}
  ${education}
  ${experience}
  ${skills}
  <footer style="margin-top:3rem; font-size:.875rem; opacity:.7;">Generated ${new Date().toISOString()} • Enable JavaScript for full experience.</footer>
</div>`;

fs.writeFileSync(outFile, generated, 'utf8');
console.log('Generated noscript fallback at', path.relative(ROOT, outFile));

// Inline into public/index.html between markers so it actually shows without SSI.
const indexFile = path.join(ROOT, 'public', 'index.html');
try {
  let indexHtml = fs.readFileSync(indexFile, 'utf8');
  const startMarker = '<!-- BEGIN_NOSCRIPT_FALLBACK -->';
  const endMarker = '<!-- END_NOSCRIPT_FALLBACK -->';
  const start = indexHtml.indexOf(startMarker);
  const end = indexHtml.indexOf(endMarker);
  if (start !== -1 && end !== -1 && end > start) {
    const before = indexHtml.slice(0, start + startMarker.length);
    const after = indexHtml.slice(end);
    const injected = `\n${generated}\n      `; // indent similar to original
    indexHtml = before + injected + after;
    fs.writeFileSync(indexFile, indexHtml, 'utf8');
    console.log('Inlined noscript fallback into index.html');
  } else {
    console.warn('Noscript markers not found in index.html; skipping inline');
  }
} catch (e) {
  console.warn('Failed to inline noscript fallback:', e.message);
}
