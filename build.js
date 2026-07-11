/*
 * 배포용 빌드 스크립트: 원본은 그대로 두고 dist/에 배포 결과물 생성.
 *
 * 방식(게임 엔진 export 스타일): HTML은 깔끔한 껍데기로 유지하고,
 * 인라인 <script> 블록들을 난독화해 외부 파일(config.js, game.js)로 분리한다.
 * 사용법: node build.js  →  npx wrangler pages deploy dist
 */
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const DIST = path.join(__dirname, 'dist');

// 인라인 스크립트 순서대로 빠져나갈 외부 파일 이름
const SCRIPT_FILES = ['config.js', 'game.js'];

// 첫 번째 블록의 전역 설정 객체를 두 번째 블록이 참조하므로 renameGlobals는 false 유지.
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

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST);

  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  let i = 0;
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, code) => {
    const file = SCRIPT_FILES[i++] || `script${i}.js`;
    const obfuscated = JavaScriptObfuscator.obfuscate(code, OBFUSCATE_OPTS).getObfuscatedCode();
    fs.writeFileSync(path.join(DIST, file), obfuscated);
    return `<script src="${file}"></script>`;
  });

  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  fs.cpSync(path.join(__dirname, 'assets'), path.join(DIST, 'assets'), { recursive: true });

  console.log(`빌드 완료 → dist/ (외부 스크립트 ${i}개 분리)`);
}

main();
