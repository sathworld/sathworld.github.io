/*
 Generates a Word document (Portfolio.docx) from resumeData.js projects.
 - Reads src/utils/resumeData.js (ESM) by transforming to CJS in a VM sandbox
 - Pulls first two images per project from /public paths
 - Converts WebP images to PNG using sharp
 - Embeds images and basic project info into a .docx in build/Portfolio.docx
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const sharp = require('sharp');
const { Document, Packer, Paragraph, HeadingLevel, TextRun, ImageRun, AlignmentType, PageOrientation, Table, TableRow, TableCell, WidthType, ExternalHyperlink } = require('docx');

async function loadResumeData() {
  const resumePath = path.resolve(__dirname, '../src/utils/resumeData.js');
  const codeOriginal = fs.readFileSync(resumePath, 'utf8');
  let code = codeOriginal
    .replace(/export\s+const\s+resumeData\s*=\s*/m, 'const resumeData = ')
    .replace(/export\s+default\s+resumeData\s*;?/m, '');
  code += '\nmodule.exports = { resumeData };\n';

  const sandbox = {
    module: { exports: {} },
    exports: {},
    require,
    __dirname: path.dirname(resumePath),
    __filename: resumePath,
    console,
  };
  vm.runInNewContext(code, sandbox, { filename: resumePath });
  const { resumeData } = sandbox.module.exports;
  if (!resumeData || !resumeData.projects) {
    throw new Error('Could not load resumeData.projects from resumeData.js');
  }
  return resumeData;
}

function resolvePublicPath(rel) {
  const clean = rel.replace(/^\//, '');
  const candidate = path.resolve(__dirname, '../public', clean);
  if (fs.existsSync(candidate)) return candidate;
  const candidateBuild = path.resolve(__dirname, '../build', clean);
  if (fs.existsSync(candidateBuild)) return candidateBuild;
  throw new Error(`Image not found: ${rel} (checked public/ and build/)`);
}

async function loadImageAsPngBuffer(imageSrc) {
  const filePath = resolvePublicPath(imageSrc);
  const ext = path.extname(filePath).toLowerCase();
  const img = sharp(filePath);
  const meta = await img.metadata();
  let buffer;
  if (ext === '.webp') {
    buffer = await img.png().toBuffer();
  } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    buffer = await fs.promises.readFile(filePath);
  } else {
    buffer = await img.png().toBuffer();
  }
  return { buffer, width: meta.width || 800, height: meta.height || 600 };
}

function scaleToFit(width, height, maxWidth) {
  if (width <= maxWidth) return { w: width, h: height };
  const scale = maxWidth / width;
  return { w: Math.round(width * scale), h: Math.round(height * scale) };
}

async function buildDocx(resumeData) {
  const children = [];

  children.push(new Paragraph({
    text: 'Portfolio',
    heading: HeadingLevel.TITLE,
    alignment: AlignmentType.CENTER,
  }));

  children.push(new Paragraph({ text: '' }));

  for (const project of resumeData.projects) {
    children.push(new Paragraph({ text: project.title || 'Untitled Project', heading: HeadingLevel.HEADING_1 }));
    if (project.duration) {
      children.push(new Paragraph({
        children: [new TextRun({ text: String(project.duration), italics: true })],
      }));
    }
    if (Array.isArray(project.tags) && project.tags.length) {
      children.push(new Paragraph({
        children: [new TextRun({ text: project.tags.join(', '), color: '666666' })],
      }));
    }

    const images = Array.isArray(project.images) ? project.images.slice(0, 2) : [];
    if (images.length >= 2) {
      const imgRuns = [];
      const capRuns = [];
      for (const imgInfo of images) {
        try {
          const { buffer, width, height } = await loadImageAsPngBuffer(imgInfo.src);
          const { w, h } = scaleToFit(width, height, 280);
          imgRuns.push(new Paragraph({
            children: [new ImageRun({ data: buffer, transformation: { width: w, height: h } })],
            alignment: AlignmentType.CENTER,
          }));
          capRuns.push(new Paragraph({
            children: imgInfo.title ? [new TextRun({ text: imgInfo.title, size: 20, color: '888888' })] : [],
            alignment: AlignmentType.CENTER,
          }));
        } catch (e) {
          imgRuns.push(new Paragraph({ children: [new TextRun({ text: `Image missing: ${imgInfo.src}`, color: 'FF0000' })] }));
          capRuns.push(new Paragraph({}));
        }
      }
      const table = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            children: [
              new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [imgRuns[0]] }),
              new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [imgRuns[1]] }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [capRuns[0]] }),
              new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [capRuns[1]] }),
            ],
          }),
        ],
      });
      children.push(table);
      children.push(new Paragraph({ text: '' }));
    } else if (images.length === 1) {
      const imgInfo = images[0];
      try {
        const { buffer, width, height } = await loadImageAsPngBuffer(imgInfo.src);
        const { w, h } = scaleToFit(width, height, 600);
        children.push(new Paragraph({
          children: [new ImageRun({ data: buffer, transformation: { width: w, height: h } })],
          alignment: AlignmentType.CENTER,
        }));
        if (imgInfo.title) {
          children.push(new Paragraph({
            children: [new TextRun({ text: imgInfo.title, size: 20, color: '888888' })],
            alignment: AlignmentType.CENTER,
          }));
        }
        children.push(new Paragraph({ text: '' }));
      } catch (e) {
        children.push(new Paragraph({ children: [new TextRun({ text: `Image missing: ${imgInfo.src}`, color: 'FF0000' })] }));
      }
    }

    if (Array.isArray(project.description) && project.description.length) {
      for (const line of project.description.slice(0, 5)) {
        children.push(new Paragraph({ text: `• ${line}` }));
      }
    }

    // Add links and files as clickable hyperlinks
    const ensureAbsolute = (u) => {
      if (typeof u !== 'string' || u.length === 0) return u;
      if (/^https?:\/\//i.test(u)) return u;
      const base = 'https://damirg.com';
      if (u.startsWith('/')) return base + u;
      return base + '/' + u;
    };

    if (Array.isArray(project.links) && project.links.length) {
      children.push(new Paragraph({ text: '' }));
      children.push(new Paragraph({ children: [new TextRun({ text: 'Links:', bold: true })] }));
      for (const l of project.links) {
        const url = ensureAbsolute(l.url);
        const label = l.label || url;
        children.push(new Paragraph({
          children: [
            new ExternalHyperlink({
              link: url,
              children: [new TextRun({ text: label, underline: {}, color: '0563C1' })],
            }),
          ],
        }));
      }
    }

    if (Array.isArray(project.files) && project.files.length) {
      children.push(new Paragraph({ text: '' }));
      children.push(new Paragraph({ children: [new TextRun({ text: 'Files:', bold: true })] }));
      for (const f of project.files) {
        const url = ensureAbsolute(f.url);
        const label = f.label || url;
        children.push(new Paragraph({
          children: [
            new ExternalHyperlink({
              link: url,
              children: [new TextRun({ text: label, underline: {}, color: '0563C1' })],
            }),
          ],
        }));
      }
    }

    children.push(new Paragraph({ text: '' }));
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: { margin: { top: 720, right: 720, bottom: 720, left: 720 }, size: { orientation: PageOrientation.PORTRAIT } },
        },
        children,
      },
    ],
  });

  const outDir = path.resolve(__dirname, '../build');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'Portfolio.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  return outPath;
}

(async () => {
  try {
    const resumeData = await loadResumeData();
    const outPath = await buildDocx(resumeData);
    console.log(`Portfolio Word document generated: ${outPath}`);
  } catch (err) {
    console.error('Failed to generate portfolio document:', err);
    process.exit(1);
  }
})();
