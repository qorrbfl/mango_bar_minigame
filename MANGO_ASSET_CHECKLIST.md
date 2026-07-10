# 🥭 망고 쫀득바 - 에셋 준비 체크리스트

## 📋 현재 상태
✅ HTML 코드: 에셋 엔진 완성
✅ 에셋 메니페스트: 전부 `null`로 준비됨
🔄 **이미지 파일: 지금부터 추가하면 됨**

---

## 🚀 3단계로 끝!

### **Step 1️⃣: assets 폴더 생성 + 이미지 준비**

```
E:\brand-minigame\
├── mango-bar-game.html
└── assets/
    ├── mango.png
    ├── lemon.png
    ├── bowl.png
    └── ... (아래 표 참고)
```

### **Step 2️⃣: HTML의 `window.GAME_ASSETS`에 경로 입력**

```javascript
window.GAME_ASSETS = {
  mango_cube: 'assets/mango.png',        // ← 이런 식으로 경로 추가
  lemon: 'assets/lemon.png',
  // ... 나머지도 동일
};
```

### **Step 3️⃣: 로컬 서버로 열어서 테스트**

```bash
cd E:\brand-minigame
python -m http.server 8000
# 그 후 브라우저에서: http://localhost:8000/mango-bar-game.html
```

---

## 🎨 필요한 이미지 목록

> 📖 **ASSET-GUIDE.md의 "망고 쫀득바 게임" 섹션 참고!**
> 
> 표에서 **"표시 크기(px)"** 와 **"기준점"**을 정확히 따르면 게임에서 완벽하게 배치됨.

### **배경**
```javascript
bg: 'assets/bg.png'              // 1200×1340px, 기준점: (-400, -500)
```

### **재료 (드래그 아이템)**
```javascript
gelatin_sheet: 'assets/gelatin-sheet.pgelatin-soakedng'      // 48×64px, 중심✅
gelatin_soaked: 'assets/.png'    // 52×40px, 중심✅
gelatin_blob: 'assets/gelatin-blob.png'        // 52×42px, 중심✅
mango_cube: 'assets/mango-cube.png'            // 40×40px, 중심 (3개 스폰)✅
allulose: 'assets/allulose.png'                // 48×60px, 중심✅
lemon: 'assets/lemon.png'                      // 44×44px, 중심✅
```

### **도구 (도구 끝이 기준점)**
```javascript
wood_spoon: 'assets/spoon.png'              // 110×110px, 스푼 볼 하단
// ⚠️ 도구는 "팁 위치"가 정렬 기준이므로 ASSET-GUIDE.md의 기준점을 정확히 따를 것!
```

### **용기 (실루엣 유지 필수)**
```javascript
bowl_cold: 'assets/bowl.png'                // 170×110px✅
blender: 'assets/blender.png'               // 156×164px, 용기 사다리꼴 유지
jar_puree: 'assets/jar-puree.png'           // 76×100px
pot: 'assets/pot.png'                       // 192×82px, 입구·바닥 실루엣 유지
stove: 'assets/stove.png'                   // 192×42px, 버너만✅
flame: 'assets/flame.png'                   // 84×42px, 불꽃
knob: 'assets/knob.png'                     // 60×60px, 노브✅
mold: 'assets/mold.png'                     // 180×134px, 3구 캐비티 유지!
pour_pot: 'assets/pour-pot.png'             // 124×72px, 작은 냄비
```

### **조립품**
```javascript
stick: 'assets/stick.png'                   // 16×56px, 중심✅dk
mold_filled: 'assets/mold-filled.png'       // 128×104px, 중심 (냉동실 넣기용)
freezer: 'assets/freezer.png'               // 162×302px, 문 열림 상태
freezer_door: 'assets/freezer-door.png'     // 126×208px, 문 닫힘 상태
bar_done: 'assets/bar-done.png'             // 84×186px, 기준점: 가로 50%, 세로 48%
```

### **이펙트**
```javascript
fx_drop_water: 'assets/drop-water.png'      // 13×16px, 중심
fx_drop_lemon: 'assets/drop-lemon.png'      // 13×16px, 중심
fx_bubble: 'assets/bubble.png'              // ~22×22px, 중심
fx_steam: 'assets/steam.png'                // 26×46px, 중심
fx_snow: 'assets/snow.png'                  // 14×14px, 중심
sparkle: 'assets/sparkle.png'               // 18×18px, 중심
```

### **버튼 아이콘 (하단 6개)**
```javascript
icon_gel: 'assets/icon-gel.png'             // 34×34px
icon_blend: 'assets/icon-blend.png'         // 34×34px
icon_heat: 'assets/icon-heat.png'           // 34×34px
icon_mix: 'assets/icon-mix.png'             // 34×34px
icon_pour: 'assets/icon-pour.png'           // 34×34px
icon_freeze: 'assets/icon-freeze.png'       // 34×34px
```

---

## ✨ 완성 예시

**HTML 수정 (첫 30줄 정도)**

```javascript
window.GAME_ASSETS = {
  bg: 'assets/bg.png',
  bowl_cold: 'assets/bowl.png',
  gelatin_sheet: 'assets/gelatin-sheet.png',
  gelatin_soaked: 'assets/gelatin-soaked.png',
  gelatin_blob: 'assets/gelatin-blob.png',
  blender: 'assets/blender.png',
  jar_puree: 'assets/jar-puree.png',
  mango_cube: 'assets/mango-cube.png',
  allulose: 'assets/allulose.png',
  lemon: 'assets/lemon.png',
  stove: 'assets/stove.png',
  pot: 'assets/pot.png',
  flame: 'assets/flame.png',
  knob: 'assets/knob.png',
  wood_spoon: 'assets/spoon.png',
  mold: 'assets/mold.png',
  pour_pot: 'assets/pour-pot.png',
  stick: 'assets/stick.png',
  mold_filled: 'assets/mold-filled.png',
  freezer: 'assets/freezer.png',
  freezer_door: 'assets/freezer-door.png',
  bar_done: 'assets/bar-done.png',
  fx_drop_water: 'assets/drop-water.png',
  fx_drop_lemon: 'assets/drop-lemon.png',
  fx_bubble: 'assets/bubble.png',
  fx_steam: 'assets/steam.png',
  fx_snow: 'assets/snow.png',
  sparkle: 'assets/sparkle.png',
  icon_gel: 'assets/icon-gel.png',
  icon_blend: 'assets/icon-blend.png',
  icon_heat: 'assets/icon-heat.png',
  icon_mix: 'assets/icon-mix.png',
  icon_pour: 'assets/icon-pour.png',
  icon_freeze: 'assets/icon-freeze.png'
};
```

---

## ⚠️ 중요한 주의사항

### **1. 기준점이 맞아야 함**
- **도구류** (스푼, 브러쉬 등): 도구의 **끝(팁)**이 기준점
  - 예: 스푼 → 스푼 볼의 하단 중앙이 기준점
- **용기류** (냄비, 몰드 등): **중심**이 기준점
- **이펙트**: 대부분 **중심**이 기준점

> 틀리면 게임에서 객체 위치가 어긋남

### **2. 용기는 실루엣이 중요**
- **믹서기**: 용기 부분이 기본 SVG와 비슷한 모양이어야 함 (안에 퓨레가 차오름)
- **냄비**: 입구와 바닥 실루엣이 정확해야 함 (퓨레 게이지가 정확히 표시됨)
- **몰드**: **3구 캐비티 위치를 정확히 지키세요!** (x=152/200/248)

### **3. 크기는 @2배로 제작 권장**
- 표에 "110×110px" → **220×220px로 제작** 후 저장
- 레티나(고해상도) 화면에서도 선명함

### **4. 투명 배경 필수**
- 모든 이미지: PNG 형식, 투명 배경
- 배경색이 포함되면 안 됨

### **5. 부분 교체 가능**
- 전부 만들 필요 없음!
- 예: 버튼 아이콘만 먼저 추가 → 게임 실행 → 다른 부분 추가
- `null`인 부분은 자동으로 기본 SVG 표시됨

---

## 🎯 추천 순서

1. **버튼 아이콘 6개** (작고 간단)
   - `icon_gel`, `icon_blend`, `icon_heat`, `icon_mix`, `icon_pour`, `icon_freeze`
   - 34×34px

2. **주요 재료** (드래그 테스트)
   - `mango_cube`, `lemon`, `gelatin_sheet`
   - 각 40~50px

3. **도구들** (조작감 테스트)
   - `wood_spoon`
   - 기준점 정확히!

4. **용기들** (중요!)
   - `blender`, `pot`, `mold`
   - 실루엣 정확히!

5. **나머지 + 이펙트** (완성도 향상)

---

## 🆘 문제 해결

### **Q: 이미지가 안 보여요**
```
A: 1. assets 폴더 생성했나요?
   2. 파일명 정확한가요? (공백, 특수문자 확인)
   3. 로컬 서버로 열었나요? (file:// X, localhost:8000 O)
   4. 브라우저 F12 → Network 탭에서 404 확인
```

### **Q: 위치가 어긋났어요**
```
A: 기준점을 ASSET-GUIDE.md와 정확히 비교
   - 도구: 팁 위치 정확히?
   - 용기: 가로·세로 중심 정확히?
```

### **Q: 일부만 먼저 추가하려는데**
```
A: 완벽! GAME_ASSETS에서 경로를 입력한 것만 PNG 사용
   null인 것은 자동으로 기본 SVG 표시됨
```

---

## 📚 참고 자료

| 자료 | 내용 |
|------|------|
| **ASSET-GUIDE.md** | ⭐ 정확한 크기·기준점 표 |
| mango-bar-game.html (209-224줄) | window.GAME_ASSETS 메니페스트 |
| mango-bar-game.html (264-288줄) | 에셋 엔진 코드 |

---

## ✅ 최종 체크리스트

- [ ] assets 폴더 생성
- [ ] ASSET-GUIDE.md에서 정확한 크기 확인
- [ ] 이미지 파일 준비 (PNG, 투명 배경)
- [ ] HTML의 `window.GAME_ASSETS`에 경로 입력
- [ ] 로컬 서버 실행: `python -m http.server 8000`
- [ ] http://localhost:8000/mango-bar-game.html에서 테스트
- [ ] 위치/크기 조정 필요하면 이미지 수정 후 새로고침

---

**준비 완료! 이제 이미지만 만들면 됩니다! 🎨🥭**

