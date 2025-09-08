// scripts/patch-mediapipe.js
// Creates a dummy source map for @mediapipe/tasks-vision to silence missing map warnings.
const fs = require('fs');
const path = require('path');

function ensureDummyMap() {
  try {
  // Locate package root and bundle directly (exports prevents require.resolve subpath)
  const pkgRoot = path.join(process.cwd(), 'node_modules', '@mediapipe', 'tasks-vision');
  const bundlePath = path.join(pkgRoot, 'vision_bundle.mjs');
    // Read bundle to detect sourceMappingURL (last line or any matching comment)
    let mapFileName = 'vision_bundle_mjs.js.map'; // fallback based on warning
    try {
      const bundleContent = fs.readFileSync(bundlePath, 'utf8');
      const match = bundleContent.match(/# sourceMappingURL=([^\n]+)/);
      if (match && match[1]) {
        mapFileName = match[1].trim();
      }
    } catch (_) {}
    const mapPath = path.join(pkgRoot, mapFileName);
    if (!fs.existsSync(mapPath)) {
      const dummy = {
        version: 3,
        file: mapFileName.replace(/\.map$/, ''),
        sources: [],
        sourcesContent: [],
        names: [],
        mappings: ''
      };
      fs.writeFileSync(mapPath, JSON.stringify(dummy), 'utf8');
      console.log('[patch-mediapipe] Created dummy source map at', mapPath);
    } else {
      try { JSON.parse(fs.readFileSync(mapPath, 'utf8')); }
      catch (_) {
        fs.writeFileSync(mapPath, JSON.stringify({version:3,file:mapFileName.replace(/\.map$/, ''),sources:[],sourcesContent:[],names:[],mappings:''}), 'utf8');
        console.log('[patch-mediapipe] Replaced invalid existing map.');
      }
    }
  } catch (e) {
    console.warn('[patch-mediapipe] Could not create dummy map:', e.message);
  }
}

ensureDummyMap();
