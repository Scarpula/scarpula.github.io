# WORKLOG — 진행 기록

> 작업 단계별 체크포인트. 가장 최근 항목이 위로 오도록 작성.

---

## 2026-05-07

### ✅ 초기 기획
- [PLAN.md](../PLAN.md) 작성 — 사이트 전반 방향성 / 컨펌 체크리스트
- 사용자 컨펌: 다크 + 3D + 풀페이지 / 백엔드 없음 / GitHub 연동
- 사용자 컨펌: 개인 `Scarpula`, 조직 `iotplus-code`
- 사용자 컨펌: 개인 레포 4개 + 조직은 prefix 그룹 정책

### 🔄 문서 스캐폴드 구축
- [docs/PROJECTS.md](PROJECTS.md) — 프로젝트 카드 빈 양식 4개 + iotplus-code 섹션
- [docs/DECISIONS.md](DECISIONS.md) — D-001 ~ D-008
- [docs/WORKLOG.md](WORKLOG.md) — 본 파일
- `docs/screenshots/` 디렉터리 생성

### ✅ 페치 완료 (gh CLI 인증 활용)

로컬 `gh` CLI가 Scarpula로 인증되어 있고 `repo`+`read:org` 스코프 보유 → 비공개 레포 모두 접근 가능했음.

**Scarpula 개인 레포 결과**

| 레포 | 결과 |
|------|------|
| PanicDisorder | ✅ **AI SaaS 6 Systems 통합 기획·구현** (Dart + multi-agent 워크플로우, FreightIQ/CompliDoc/MeetingMind/ContentForge/ClientKeeper/SiteVision) |
| bidshield | ✅ **BidShield - AI 입찰 분석 SaaS** (React+Vite+TS, Supabase, AI Backend 분리 아키텍처) |
| LottoJackpot | ✅ **로또 6/45 통계 예측 CLI** (Python + uv + PostgreSQL) |
| Supabase_TodoApp | ⚠️ **빈 레포 확정** — 처리 방향 컨펌 필요 |

**iotplus-code 조직 (총 34 repos)**

prefix 그룹화 7개 + 단발 보조 4개. [PROJECT_GROUPS.md](PROJECT_GROUPS.md)에 정리.

### 🔁 PanicDisorder 정체 정정 (사용자 지적)

- 사용자 정정: 레포 루트의 6개 AI SaaS 기획 문서가 아니라, **`flutter_app/` 안의 "숨이" 공황장애 진단 앱**이 본체
- 재페치 결과:
  - 패키지: `panic_disorder_app` v3.0.0+3
  - 표시 README: "마음안정 (공황장애 진단 및 안정화 앱)" — 사용자 브랜드명 "**숨이**"
  - 스택: Flutter 3.16+, Dart 3.2+, Material 3, BLoC + Riverpod, GoRouter, Clean Arch + DI(GetIt)
  - 백엔드: **Supabase** (Auth/DB/Realtime/Storage)
  - AI: **OpenAI GPT Realtime API** (실시간 음성 상담), 개인화 음악 추천, 바이노럴 비트
  - 기능: DSM-5 13증상 진단 / 호흡·그라운딩 / GPS 응급 모드 / iOS·Android·Web·Windows
- 레포 루트의 SaaS 기획문서 6종은 별도 사이드 문서로 분리

### ✅ 컨펌 사항 (이번 사이클)

- iotplus-code 노출 그룹: **Option A** (G1/G2/G3/G5)
- Supabase_TodoApp: **노출 제외**
- 카드 단위: **시스템 단위 카드 1장 = 그룹 합산** (확정)

### 🔄 문서·디렉터리 갱신

- [PROJECTS.md](PROJECTS.md) 전면 재작성 — §1 숨이로 정정, §4에 iotplus-code 4 그룹 카드 추가, TodoApp 섹션 제거
- [DECISIONS.md](DECISIONS.md) — D-005 갱신, D-006 확정(A), D-009/D-010 신규
- `docs/screenshots/` — `panicdisorder/` → `soomi/` 이름 변경, `_todoapp_renamed/` `_iotplus_pending/` 제거, iotplus 4 그룹 폴더 생성
- 최종 슬러그 7개: soomi, bidshield, lottojackpot, parkgolf-iotplus, solhavi-v2, hdms, solynx-ems

### 🔁 추가 정정 — 브랜드명 및 역할 증거 기반 작성

- 사용자 지시: 표시명 **"숨이" → "숨"** (단일 한글 글자)
  - PROJECTS.md / DECISIONS.md 일괄 치환 완료
  - 폴더 `docs/screenshots/soomi/` → `soom/` 변경
- 사용자 지시: 역할은 **레포 소스코드 확인 후 채울 것**
  - `gh api .../contributors` 20개 레포 페치 → [CONTRIBUTIONS_EVIDENCE.md](CONTRIBUTIONS_EVIDENCE.md)
  - 추가 17개 조직 레포 페치하여 미채택 후보까지 평가

### 📊 contributor 증거 기반 핵심 발견

- 개인 3개 (숨/BidShield/LottoJackpot): **모두 100% 단독**
- ParkGolf (G1): **5/5 컴포넌트 top contributor** ✅ 강력
- Solynx EMS (G5): **Front top, Back 2nd, AI Server 단독** ✅ 강력
- **Solhavi V2 (G2)**: 5/5 레포 본인 0 커밋 ❌ 드롭 권장
- **HDMS (G3)**: 총 4 커밋 ❌ 드롭 권장
- 🆕 **MES (서원+ERP)**: 4 레포 중 3 top contributor — 신규 추천

### 🔄 문서 업데이트

- [PROJECTS.md](PROJECTS.md):
  - 카드 노출 순서 표 갱신 (6장)
  - §1~3 역할 필드 증거 기반 채움
  - §4.2/4.3 Solhavi V2/HDMS 드롭 표기
  - §4.4 MES 그룹 신규 추가
- [DECISIONS.md](DECISIONS.md): D-011 (브랜드명), D-012 (증거기반 정책), D-013 (그룹 재검토)
- [CONTRIBUTIONS_EVIDENCE.md](CONTRIBUTIONS_EVIDENCE.md) 신규 생성

### ✅ 그룹 최종 결정 (사용자 정책 반영)

사용자 지시: **함께 진행한 팀 프로젝트는 커밋 비중이 작아도 "팀 참여" 표기로 포함**

→ Solhavi V2 (G2)와 HDMS (G3) 모두 **재포함**. 카드 라벨에서 "단독/주도" vs "팀 참여"를 명확히 구분.

**최종 카드 셋 = 8장**:
숨 / BidShield / LottoJackpot / ParkGolf IOTPLUS / Solhavi V2 / HDMS / Solynx EMS / MES

### 🔄 적용

- PROJECTS.md 노출 순서 표 8장으로 갱신
- §4.2 Solhavi V2 카드 복구 (팀 참여 라벨)
- §4.3 HDMS 카드 복구 (팀 참여 라벨)
- 스크린샷 폴더 `solhavi-v2/`, `hdms/` 복구 → 총 8개 슬러그
- DECISIONS D-013 갱신

### ✅ M1 — Vite + React + TS 스캐폴드 완료

**사용자 정책 추가**: 카드에서 "역할(role)" 표기 전부 제거 → 기능 중심 표현 (D-014). 라이브 URL은 추후 직접 추가.

#### 적용

- 루트 설정: `package.json`, `tsconfig.json/app/node`, `vite.config.ts`, `index.html`, `.gitignore`, `.env.example`
- 디자인 토큰: `src/styles/tokens.css` (다크 베이스 + 바이올렛/사이언 액센트)
- 글로벌 + Tailwind v4: `src/styles/global.css` (`@theme inline`로 토큰 연결)
- 진입점: `src/main.tsx`, `src/App.tsx`
- 데이터: `src/data/projects.ts` (8개 카드), `src/data/expertise.ts` (6개 스킬 카드 — Agentic AI hero)
- 섹션 6개 (M1은 정적 placeholder, 추후 애니/3D로 강화):
  - Hero — 그라디언트 배경 + 타이틀
  - About — 2열 인트로
  - Expertise — Agentic AI hero 카드 + 5 보조 카드
  - TechStack — 8 프로젝트 기술 합집합 빈도 정렬
  - Projects — 8 프로젝트 카드 그리드 (스크린샷 lazy-load, 컴포넌트 칩, top features 3, top tech 5)
  - Contact — 메일/GitHub CTA
- ProjectCard 컴포넌트 분리 (`src/sections/Projects/ProjectCard.tsx`)

#### 검증

- `npm install` ✅ (194 packages)
- `npm run typecheck` ✅ (strict TS 통과)
- `npm run build` ✅ (1.99s · index 170.84 KB / gzip 54.90 KB)
- `npm run dev` ✅ http://localhost:5173

### ⏳ 다음 작업 (M2 이후)

- [ ] M2: Lenis 스무스 스크롤 + 풀페이지 스냅 + 섹션 진입 GSAP
- [ ] M3: Hero 3D 씬 (R3F)
- [ ] M4: Expertise/About 텍스트 스크럽 애니메이션
- [ ] M5: GitHub fetch 스크립트 + Projects 인터랙션 강화
- [ ] M6: Contact 파티클 마무리 + 후처리
- [ ] M7: 반응형 + 모바일 fallback
- [ ] M8: Vercel/Cloudflare 배포 + GitHub Actions

### 🔁 사용자 직접 작업 (병행 가능)

- 8개 카드 `01-cover.png` 추가 → `docs/screenshots/<slug>/`
- 라이브 URL 있는 카드는 추후 `src/data/projects.ts`의 `liveUrl` 필드에 추가

---

## 2026-05-07 (저녁) — M2 시네마틱 스크롤 완료

### 사용자 정책
- "페이지가 하단으로 내려가는 게 아니라 영상처럼 움직이는 애니메이션"
- → Lenis + GSAP ScrollTrigger의 **pin + scrub 시네마틱 패턴**으로 전환

### 적용

- [src/lib/scroll.tsx](../src/lib/scroll.tsx) — ScrollProvider (Lenis + GSAP ticker 연동)
- [src/hooks/useScrollScene.ts](../src/hooks/useScrollScene.ts) — 섹션 단위 pin + scrub 헬퍼
- [src/components/ScrollProgress.tsx](../src/components/ScrollProgress.tsx) — 상단 진행 바 + 좌측 도트 네비
- 6개 섹션 전부 시네마틱 타임라인으로 리팩터링:
  - **Hero**: 200vh pin · 배경 다층 패럴럭스 + 타이틀 스케일/페이드 + 서브 카피 fade-in
  - **About**: 220vh pin · 단어 단위 cascade reveal
  - **Expertise**: 220vh pin · 카드 좌우 교차 슬라이드 인 + Hero 카드 발광
  - **TechStack**: 200vh pin · 칩 random scatter → wave-in
  - **Projects**: 동적 거리 pin · **8장 카드 가로 스크롤** (translateX scrub)
  - **Contact**: 짧은 scrub fade-in + 배경 글로우 패럴럭스

### 디버깅 로그 (해결한 이슈)

1. **`+=200vh` 문자열이 200px로 파싱됨** → 함수 형태로 변경 `() => '+=' + (duration * vh / 100)`
2. **Lenis ↔ ScrollTrigger pin 동기화 어긋남** → `pinType: "transform"`, `useLayoutEffect`, 100ms 후 `ScrollTrigger.refresh()` 도입
3. 결과: 문서 높이 11062 → **18160** (pin 거리 1000vh 가까이 추가, 시네마틱 스크롤 거리 확보)

### 검증

- doc height: 18160px (pin 거리 정상 적용)
- pin spacers: [2835, 3024, 3024, 2835, 5497] 정상
- 시각 확인: Hero/About/Projects 모두 핀 + scrub 동작 확인 (스크린샷 docs/playwright)
- TypeScript strict 통과
- Production build OK (313 KB / 109 KB gzip)

---

## 2026-05-07 (M2.5 폴리싱) — 폰트 가독성 + Expertise 오버플로우 + Hero→About 시네마틱 트랜지션

### 사용자 피드백
1. "고도 기술 스택 부분이 레이아웃 오버플로우가 많은 거 같다"
2. "첫번째 씬에서 두번째 씬으로 넘어갈 때 애니메이션을 좀 더 극적으로"
3. "폰트 가독성도 높여줘야할 것 같아"

### 1. 폰트 가독성 개선

- [index.html](../index.html): Pretendard Variable CDN 추가
- [src/styles/tokens.css](../src/styles/tokens.css): `--font-display`, `--font-body`, `--font-korean` 토큰에서 Pretendard를 한글 fallback으로 등록 (Latin은 Space Grotesk/Inter 우선)
- [src/styles/global.css](../src/styles/global.css):
  - `body` line-height 1.5 → 1.7 (한글 본문 가독성)
  - `letter-spacing: -0.005em` 미세 타이트닝 + Pretendard `ss01,ss02` feature settings
  - `p { word-break: keep-all; overflow-wrap: anywhere; }` (한글 단어 단위 줄바꿈)
- 컴포넌트 레벨: Hero title `letter-spacing` -0.03em → -0.015em (한글 자모 가독성), `font-bold`로 weight 강조

### 2. Expertise 오버플로우 수정

[src/sections/Expertise/ExpertiseSection.tsx](../src/sections/Expertise/ExpertiseSection.tsx) 전면 재작성:
- 기존: 6 카드 그리드 (hero 2col span + 5장) → 100dvh 안에 안 들어가서 잘림
- 변경: hero 1열 가로 풀폭 + sub 5장 컴팩트 그리드 (sm:2 / lg:5)
- 카드 패딩·폰트·키워드 칩 사이즈 축소
- 결과: 100dvh 안에 모두 들어감 ✅

### 3. 시네마틱 Hero → About 트랜지션

레퍼런스 조사: Apple Vision Pro / Stripe / GSAP showcase의 공통 패턴 = (1) Z-depth 레이어링 (2) 동시 스케일/위치 변환 (3) staggered fade

구현:

**Hero exit (마지막 30%)** — `WARP DIVE`
- bg-1 scale 1 → 6, blur 14px, opacity 0
- bg-2 scale 1 → 9, x/y 큰 오프셋, blur 18px
- bg-grid scale 1 → 5, opacity 0
- title scale 0.55 → 0.18, y -160 → -260, **rotateX -65°** (3D 플립), filter blur 12px, opacity 0

**Veil 통과** — [src/components/SceneVeil.tsx](../src/components/SceneVeil.tsx)
- 자체 ScrollTrigger 보유 (Hero+About 양 섹션 외부, 충돌 방지)
- Hero 핀 70% ~ About 핀 20% 구간에서 fade-in → peak → fade-out
- `mix-blend-mode: screen`으로 본 콘텐츠 위에 빛처럼 깔림

**About entry (처음 18%)** — `IRIS REVEAL` + `PUNCH-IN`
- `clip-path: circle(8% at 50% 50%)` → `circle(150% at 50% 50%)` 원형 reveal
- heading: scale 1.9 → 1, filter blur 28px → 0, opacity 0 → 1, y 80 → 0
- 이후 단어 cascade는 기존과 동일

### 검증

- `npm run typecheck` ✅
- 시각 확인 4 위치:
  - 0px: Hero 풀사이즈, Pretendard 깔끔 ✅
  - 1700px: Hero WARP DIVE 진행, About iris 시작 ✅
  - 4000px: About punch-in 완료, 단어 cascade 진행 ✅
  - 7500px: Expertise 모든 카드가 viewport 안에 ✅

---

## 2026-05-07 (M2.6) — Kinetic Typography

### 사용자 요청
"Kinetic Typography 패턴을 이용해서 좀더 텍스트에 임팩트를 줘"

### 적용

**핵심 컴포넌트** [src/components/KineticText.tsx](../src/components/KineticText.tsx)
- 한 줄 텍스트를 codepoint 단위 inline-block 스팬으로 분해
- `aria-label`로 원문 보존 (스크린리더 호환)
- 한글 1음절 = 1 codepoint이므로 `[...text]`로 안전하게 분리

**Hero 타이틀** — 강한 임팩트
- 인트로 (페이지 로드): 1줄 글자 cascade (delay 0.18s, stagger 25ms) → 2줄 (delay 0.42s, stagger 30ms) → sub copy (0.95s) → scroll hint (1.2s). 각 글자 y: 70 → 0 + rotateX: -85° → 0 + blur: 12px → 0
- 스크롤 WARP DIVE: 글자 단위 random rotateZ + 블러 + opacity 0 (stagger from "random") — 이전엔 제목 전체 한 덩어리로 사라졌지만 이제 폭발적으로 흩어지는 디스인티그레이션
- 그라디언트 라인 트릭: `background-attachment: fixed`로 inline-block 자식들이 viewport-크기 그라디언트의 자기 영역 슬라이스를 표시 → 글자 사이 그라디언트 연속성 유지

**About 헤딩** — punch-in cascade
- 전체 punch-in (scale 1.4 → 1, blur 8 → 0)에 더해
- 글자 단위 stagger 22ms로 y 50 + rotateX -75° + blur 10 → 0
- 이전엔 한 덩어리로 떨어졌으나 이제 개별 글자가 차례로 모서리에서 회전하며 안착

**Section 헤딩 cascade** — Expertise / TechStack / Projects / Contact
- Scroll-driven 글자 단위 cascade: y 36-60px + rotateX -60~-70° + (Contact는 추가 blur)
- stagger 20-25ms로 빠르게 흘러 들어옴
- 모든 헤딩 `font-bold`, `letter-spacing -0.02em` 통일

### 검증

- TypeScript strict ✅
- 인트로 후 Hero 화면: 두 줄 모두 보이고, 그라디언트 라인이 글자 사이 매끄럽게 이어짐 ✅
- DOM 분해 확인: Hero "에이/이/전/틱/A/I/시/대/의" + "풀/스/택/엔/지/니/어" / About "도/구/가/아/닌" + "시/스/템/을/만/든/다" / 모든 섹션 헤딩 글자 단위 splitting 정상 ✅
