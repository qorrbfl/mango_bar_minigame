# 🎯 SVG 디버깅 노하우 - 망고 쫀득바 게임 경험담

> 오늘 (2026-07-07) 가장 시간이 오래 걸렸던 두 가지 오류와 해결 방법
> 다음에 반복하지 않기 위한 체크리스트

---

## 🔴 오류 1: Element Transform Group Coupling (냄비 + 스토브)

### 증상
```
✗ stove를 이동하면 pot도 함께 이동됨
✗ "냄비가 위로 올라갔어" - 사용자 피드백
```

### 근본 원인
```javascript
// ❌ 같은 그룹에 모두 포함됨
const g = el('g',{id:'stoveG'});
g.innerHTML = `
  <g id="stoveBase">...</g>  // stove
  <g id="potGrp">...</g>     // pot도 여기에
`;
stage.appendChild(g);  // 하나의 transform만 적용
```

### 해결책
```javascript
// ✅ 독립적인 groups로 분리
const g = el('g',{id:'stoveG', transform:'translate(200,450)'});
// stove 내용...
stage.appendChild(g);

const potGrp = el('g',{id:'potGroup', transform:'translate(200,320)'});
// pot 내용...
stage.appendChild(potGrp);  // 별도로 추가!
```

### 체크리스트
- [ ] Element가 특정 위치에만 보여야 하나?
- [ ] 다른 Element와 움직임이 연동되어야 하나?
- → 다르면 **별개의 transform group으로 분리**!

---

## 🔴 오류 2: SVG clipPath 좌표계 미스매치 (타원 프레임)

### 증상
```
✗ clipPath의 ellipse가 동작하지 않음 (요소가 사라짐)
✗ "양옆이 사각형으로 잘려" - 사용자 피드백
✗ 같은 코드인데 clipPath 제거하면 보임
```

### 근본 원인: ⚠️ **두 요소가 다른 좌표계를 사용 중**

```javascript
// ❌ 문제 상황
<defs id="defs">
  <!-- main SVG 좌표계 (viewBox 0 0 400 460) -->
  <clipPath id="potClip">
    <ellipse cx="200" cy="335" rx="140" ry="30"/>
  </clipPath>
</defs>

<g id="potGroup" transform="translate(200,320)">
  <g id="potG" transform="translateY(-20)">
    <!-- potG의 상대 좌표계: potG 기준! -->
    <rect x="-95" y="44" clip-path="url(#potClip)"/>
  </g>
</g>

// transform 체인:
// SVG 좌표 = potGroup(200,320) + potG(-20) + rect 상대좌표
// clipPath 좌표 = SVG viewBox 절대좌표
// 👎 좌표계가 다르므로 범위가 안 맞음!
```

### 해결책: **clipPath를 대상 요소와 같은 좌표계에 정의**

```javascript
// ✅ 해결책
<g id="potGroup" transform="translate(200,320)">
  <g id="potG" transform="translateY(-20)">
    <!-- 여기에 defs 정의! -->
    <defs>
      <clipPath id="potClip">
        <!-- potG 기준 상대 좌표 -->
        <ellipse cx="0" cy="-71.5" rx="94" ry="30"/>
      </clipPath>
    </defs>
    
    <!-- rect도 같은 좌표계 -->
    <g clip-path="url(#potClip)">
      <rect x="-95" y="-41.5" width="190" height="0"/>
    </g>
  </g>
</g>
```

### 왜 이게 작동하나?

| 항목 | 절대 좌표 방식 (❌) | 상대 좌표 방식 (✅) |
|------|------------------|------------------|
| **clipPath 위치** | SVG viewBox 좌표 | potG 기준 좌표 |
| **rect 위치** | potG 기준 좌표 | potG 기준 좌표 |
| **일치도** | ❌ 다름 | ✅ 같음! |
| **결과** | 범위 미스매치 | 정확하게 클리핑됨 |

---

## 🔍 디버깅 전략

### 1단계: clipPath 동작 여부 확인
```javascript
// clipPath를 임시로 제거
// ✓ 보이면 → clipPath 범위 문제
// ✗ 안 보이면 → 요소 자체 문제
<g>  {/* clip-path 제거 */}
  <rect id="potFill" x="-95" y="-41.5" width="190" height="0"/>
</g>
```

### 2단계: 좌표계 확인
```
요소의 좌표 = 부모1 transform + 부모2 transform + ... + 자신 좌표
clipPath의 좌표 = clipPath가 정의된 위치의 좌표계

👉 같은 좌표계에 정의되었나?
```

### 3단계: 범위 확인
```javascript
// clipPath의 범위가 요소를 포함하나?
// rect: x=-95 ~ 95 (width 190)
// clipPath: cx=0, rx=94 → -94 ~ 94
//
// 문제: rect의 양옆이 clipPath 범위(-94~94)를 벗어남!
// 해결: rx를 95 이상으로 늘려야 함
```

---

## ✅ 실전 체크리스트

### SVG 요소 배치 시
- [ ] 각 요소가 독립적인 위치를 가져야 하나?
- [ ] transform이 의도하지 않게 연쇄되고 있지 않나?
- [ ] 필요하면 **별개의 group으로 분리**했나?

### clipPath 사용 시
- [ ] clipPath가 대상 요소와 **같은 좌표계**에 정의되어 있나?
- [ ] main defs vs 요소 내부 defs를 구분했나?
- [ ] clipPath 범위가 요소를 **완전히 포함**하나?

### 안 보일 때 확인 순서
1. ✓ clipPath 임시 제거 → 보이는가?
2. ✓ 좌표계 확인 (transform 체인 추적)
3. ✓ 범위 확인 (cx±rx, cy±ry)

---

## 📚 관련 코드 위치

| 항목 | 파일 | 줄 번호 |
|------|------|--------|
| drawStove() | mango-bar-game.html | 614-655 |
| potGrp 정의 | mango-bar-game.html | 631-647 |
| clipPath 정의 | mango-bar-game.html | 634 |
| rect (퓨레) | mango-bar-game.html | 637 |

---

## 🎓 배운 점

### 좌표계 개념이 중요
- SVG의 transform은 중첩됨
- clipPath는 정의 위치의 좌표계를 사용
- 대상 요소는 부모의 좌표계를 사용
- 👉 **반드시 같은 좌표계에 정의할 것!**

### 사용자 피드백 해석
- "사각형 모양으로 잘려" = clipPath 범위 부족
- "양옆이 잘려" = rx(가로 반지름) 부족
- "안 보여" = 좌표 범위 완전 미스매치
- 👉 **근본 원인을 찾을 것!**

### 디버깅 순서
1. 요소 자체가 보이는가? (clipPath 제거해서 확인)
2. 좌표계가 일치하는가? (transform 체인 추적)
3. 범위가 충분한가? (rx/ry, x/y 값 확인)

---

## 🚀 다음 프로젝트에서 주의할 점

```markdown
1. Transform Group 설계 먼저
   - 어떤 요소들이 연동되어야 하나?
   - 어떤 요소들은 독립적이어야 하나?
   → 설계한 후 코딩 시작!

2. clipPath는 항상 같은 좌표계에
   - clipPath를 main defs에 두면 안 됨
   - 대상 요소 근처(부모 그룹)에 정의할 것
   
3. 안 보일 때는 항상 clipPath 의심
   - "요소가 안 보인다" → 99% clipPath 문제
   - 먼저 제거해서 요소 자체가 있는지 확인!
```

---

**작성일**: 2026-07-07  
**상황**: 망고 쫀득바 게임 - pot.png 타원 클리핑 이슈  
**소요 시간**: 약 2시간 (오류 2번 반복)  
**교훈**: 좌표계 이해와 체계적 디버깅의 중요성 ✨
