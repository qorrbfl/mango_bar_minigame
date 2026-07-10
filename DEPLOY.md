# Cloudflare 배포 가이드

Mango Chewy Bar 미니게임은 `index.html`과 `assets/` 폴더로 이루어진 정적 사이트이므로 **Cloudflare Pages** 로 배포합니다. 서버나 빌드 과정이 필요 없습니다.

---

## 방법 1: 대시보드 직접 업로드 (가장 간단)

1. [Cloudflare 대시보드](https://dash.cloudflare.com) 에 로그인합니다.
2. 왼쪽 메뉴에서 **Workers & Pages** → **Create** → **Pages** → **Upload assets** 를 선택합니다.
3. 프로젝트 이름을 입력합니다 (예: `mango-bar-minigame`).
4. 프로젝트 폴더 전체(`index.html` + `assets/`)를 드래그 앤 드롭하거나 폴더 zip 을 업로드합니다.
5. **Deploy site** 를 누르면 `https://<프로젝트이름>.pages.dev` 주소로 게시됩니다.

> 이후 업데이트는 같은 프로젝트에서 **Create a new deployment** 로 다시 업로드하면 됩니다.

---

## 방법 2: Git 연동 (자동 배포)

코드를 GitHub/GitLab 에 올린 뒤 push 할 때마다 자동 배포되게 합니다.

1. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** 선택.
2. 저장소를 선택하고 권한을 부여합니다.
3. 빌드 설정:
   - **Framework preset**: `None`
   - **Build command**: (비워둠)
   - **Build output directory**: `/`
4. **Save and Deploy** 를 누릅니다.

이제 `main` 브랜치에 push 하면 자동으로 재배포됩니다.

---

## 방법 3: Wrangler CLI (터미널 배포)

명령줄에서 바로 배포하는 방법입니다.

```bash
# 1. Wrangler 설치 (한 번만)
npm install -g wrangler

# 2. Cloudflare 계정 로그인 (브라우저 창이 열립니다)
wrangler login

# 3. 프로젝트 폴더에서 배포
wrangler pages deploy . --project-name=mango-bar-minigame
```

- 처음 실행 시 프로젝트가 없으면 새로 만들지 물어봅니다 — `y` 를 누르세요.
- 배포가 끝나면 터미널에 `https://<...>.pages.dev` 주소가 출력됩니다.

> `wrangler login` 은 브라우저 인증이 필요하므로, 이 세션에서 직접 실행하려면 프롬프트에 `! wrangler login` 을 입력해 주세요.

---

## 커스텀 도메인 연결 (선택)

1. 배포된 Pages 프로젝트 → **Custom domains** → **Set up a custom domain**.
2. 원하는 도메인(예: `game.example.com`)을 입력합니다.
3. 도메인이 Cloudflare DNS 로 관리 중이면 자동으로 CNAME 이 추가됩니다.

---

## 참고

- **비용**: Cloudflare Pages 무료 플랜으로 충분합니다 (정적 파일, 월 무제한 요청).
- **캐시**: 파일을 수정한 뒤에도 반영이 안 되면 브라우저 강력 새로고침(⌘+Shift+R) 하거나 배포가 완료되었는지 확인하세요.
- **자산 경로**: `index.html` 은 `assets/` 를 상대경로로 참조하므로, 반드시 폴더 구조를 그대로 유지한 채 업로드해야 합니다.
