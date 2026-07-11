/*
 * 배포용 빌드 스크립트: 원본은 그대로 두고 dist/에 압축+난독화 결과물 생성.
 * index.html의 인라인 <script> 블록을 각각 난독화한 뒤 전체 HTML을 압축한다.
 * 사용법: node build.js  →  npx wrangler pages deploy dist
 */
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify: minifyHtml } = require('html-minifier-terser');

const DIST = path.join(__dirname, 'dist');

// 첫 번째 <script>의 전역 설정 객체를 두 번째 블록이 참조하므로 renameGlobals는 false 유지.
const OBFUSCATE_OPTS = {
  compact: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.8,
  renameGlobals: false,
  identifierNamesGenerator: 'hexadecimal',
  controlFlowFlattening: false,
  deadCodeInjection: false,
};

async function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST);

  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, code) => {
    const obfuscated = JavaScriptObfuscator.obfuscate(code, OBFUSCATE_OPTS).getObfuscatedCode();
    return `<script>${obfuscated}</script>`;
  });

  const minified = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: false, // 인라인 스크립트는 위에서 이미 난독화됨
  });
  fs.writeFileSync(path.join(DIST, 'index.html'), minified);

  fs.cpSync(path.join(__dirname, 'assets'), path.join(DIST, 'assets'), { recursive: true });

  console.log('빌드 완료 → dist/');
}

main().catch(e => { console.error(e); process.exit(1); });
