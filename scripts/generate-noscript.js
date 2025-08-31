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

function list(items, cls='') {
  if (!items || !items.length) return '';
  return `<ul class="${cls}">` + items.map(i=>`<li>${esc(i)}</li>`).join('') + '</ul>';
}

const education = data.education ? `
  <section id="edu">
    <h2>Education</h2>
    <p><strong>${esc(data.education.university)}</strong> – ${esc(data.education.location)}</p>
    <p>${esc(data.education.degree)} (GPA: ${esc(data.education.gpa)})</p>
    <p>${esc(data.education.duration)}</p>
    ${list(data.education.awards, 'awards')}
  </section>` : '';

const skills = Array.isArray(data.skills) ? `
  <section id="skills-static">
    <h2>Skills</h2>
    <dl>
      ${data.skills.map(s=>`<dt>${esc(s.category)}</dt><dd>${esc(s.items)}</dd>`).join('')}
    </dl>
  </section>` : '';

function renderExperience(expArr) {
  if (!Array.isArray(expArr)) return '';
  return expArr.map(e=>`<article class="exp-item"><h3>${esc(e.title)} – ${esc(e.company)}</h3><p class="meta">${esc(e.location)} | ${esc(e.duration)}</p>${list(e.description,'bullets')}</article>`).join('\n');
}
const experience = data.experience ? `
  <section id="experience">
    <h2>Experience</h2>
    ${renderExperience(data.experience)}
  </section>` : '';

function renderProjects(pArr) {
  if (!Array.isArray(pArr)) return '';
  return pArr.map(p=>`<article class="project-item"><h3>${esc(p.title)}</h3><p class="meta">${esc(p.duration)}</p>${list(p.description,'bullets')}</article>`).join('\n');
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
  <header style="margin-bottom:2rem;">
    <h1 style="margin:0 0 .5rem; font-size:2rem;">Damir Gazizullin</h1>
    <p>Portfolio (static fallback). JavaScript is disabled; interactive / 3D features hidden.</p>
    <p><a href="#experience">Experience</a> · <a href="#projects">Projects</a> · <a href="#skills-static">Skills</a> · <a href="#edu">Education</a></p>
  </header>
  ${education}
  ${experience}
  ${projects}
  ${resumesBlock}
  ${contactBlock}
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
