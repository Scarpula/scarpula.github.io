# 포트폴리오 사이트 기획서

> 작성일: 2026-05-07
> 상태: **방향성 컨펌 대기 중**
> 컨펌 후 본 문서를 기준으로 구현 시작

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 형식 | SPA (Single Page Application) — 풀페이지 스크롤 |
| 언어 | TypeScript |
| 백엔드 | 없음 (정적 사이트 / Static Hosting) |
| 데이터 소스 | GitHub API (커넥터 경유) — 빌드 타임 또는 런타임 fetch |
| 톤앤매너 | 다크 테마 기반, 3D + 풀 애니메이션 |
| 핵심 셀링 포인트 | **에이전틱 AI 활용 숙련도** + 고도 기술 스택 |

---

## 2. 기술 스택 제안

### 2.1 프레임워크 옵션 (택1 컨펌 필요)

**옵션 A — Vite + React + TypeScript** ⭐ 추천
- 빠른 빌드, 가벼운 번들, GitHub Pages/Vercel 무료 호스팅
- React Three Fiber(R3F) + drei 생태계가 가장 풍부
- 학습 자료 풍부, 유지보수 용이

**옵션 B — Next.js (Static Export)**
- SEO 강점, 이미지 최적화 내장
- 백엔드 없는 정책엔 다소 오버엔지니어링

**옵션 C — Astro + React Islands**
- 정적 사이트 최적, 초경량
- 풀 애니메이션 사이트엔 부분 하이드레이션 이점이 작음

→ **옵션 A 추천**

### 2.2 핵심 라이브러리

| 영역 | 라이브러리 | 역할 |
|------|----------|------|
| 3D 렌더링 | `three` + `@react-three/fiber` + `@react-three/drei` | WebGL 3D 씬 |
| 풀페이지 스크롤 | `lenis` (smooth scroll) + 커스텀 훅 | 부드러운 스크롤 + 섹션 스냅 |
| 스크롤 애니메이션 | `gsap` + `ScrollTrigger` | 타임라인/스크롤 트리거 |
| 모션 | `framer-motion` | 컴포넌트 진입/마이크로 인터랙션 |
| 후처리 | `@react-three/postprocessing` | Bloom, Glitch, Chromatic Aberration |
| 스타일 | `tailwindcss` + CSS 변수 토큰 | 다크 테마 디자인 시스템 |
| 아이콘 | `lucide-react` | 일관된 아이콘 |
| GitHub 연동 | `octokit/rest` 또는 GraphQL v4 | 레포/커밋/언어 통계 |

> 의존성을 가볍게 가져갈지(GSAP만), 풍부하게(GSAP+Framer 둘 다) 갈지는 컨펌 시 결정

---

## 3. 페이지/섹션 구조 (풀페이지 스크롤)

```
┌─────────────────────────────────────────┐
│  [00] HERO                              │  100vh
│  - 3D 오브젝트 (회전/파티클/셰이더)     │
│  - 이름 + 한 줄 태그라인                │
│  - 스크롤 인디케이터                    │
├─────────────────────────────────────────┤
│  [01] ABOUT                             │  100vh
│  - 타이포그래피 중심                    │
│  - 텍스트 마스크/스크럽 애니메이션      │
├─────────────────────────────────────────┤
│  [02] EXPERTISE — Agentic AI 강조       │  100vh
│  - 카드 3D 틸트 / 파라랙스              │
│  - "에이전틱 AI" 메인 + 고도 기술 나열  │
├─────────────────────────────────────────┤
│  [03] TECH STACK                        │  100vh
│  - 3D 구체에 로고 매핑 또는 그리드      │
│  - GitHub 언어 통계 시각화              │
├─────────────────────────────────────────┤
│  [04] PROJECTS (GitHub 연동)            │  auto
│  - GitHub repo 카드 (스타/언어/설명)    │
│  - 핀 고정 + 가로 스크롤 또는 그리드   │
├─────────────────────────────────────────┤
│  [05] CONTACT                           │  100vh
│  - 이메일/소셜 링크                     │
│  - 3D 마무리 씬                         │
└─────────────────────────────────────────┘
```

### 3.1 섹션별 애니메이션 컨셉

- **[00] Hero**: WebGL 셰이더 기반 디스토션 메시 + 마우스 패럴랙스
- **[01] About**: GSAP `SplitText` 단어 단위 스크럽
- **[02] Expertise**: 카드 회전(rotateY) + 발광(glow) — 에이전틱 AI 카드는 사이즈/광원 강조
- **[03] Tech Stack**: 3D 구체 위에 로고 distribute (Fibonacci sphere)
- **[04] Projects**: 핀 고정 후 가로 스크롤(horizontal scroll on vertical scroll)
- **[05] Contact**: 파티클 컨버전스 → 이메일 텍스트 형성

---

## 4. 디자인 시스템

### 4.1 컬러 팔레트 (다크 베이스)

```
--bg-base:       #0a0a0f   (거의 검정, 약간 푸른빛)
--bg-elevated:   #12121a
--bg-glass:      rgba(255,255,255,0.04) + backdrop-blur

--text-primary:  #f4f4f7
--text-secondary:#9b9bab
--text-muted:    #5a5a6e

--accent-primary:#7c5cff   (바이올렛 — 에이전틱 AI 강조용)
--accent-glow:   #00e5ff   (사이언 — 호버/하이라이트)
--accent-warn:   #ff5c8a   (핑크 — 포인트)

--border-subtle: rgba(255,255,255,0.08)
```

> 컨펌 시 다른 팔레트 제안 가능 (예: 모노크롬+네온, 보라+골드 등)

### 4.2 타이포그래피

- 디스플레이: `Space Grotesk` 또는 `Geist` (variable font)
- 본문: `Inter` 또는 `Geist`
- 모노스페이스: `JetBrains Mono` (코드/기술 스택 라벨용)

### 4.3 모션 원칙

- **이징**: `cubic-bezier(0.16, 1, 0.3, 1)` — 부드러운 감속
- **지속시간**: 진입 600–900ms, 마이크로 200–300ms
- **3D**: 60fps 목표, 모바일에서는 fallback (정적 이미지 또는 단순화)

---

## 5. GitHub 연동 전략

### 5.1 데이터 흐름 (택1 컨펌 필요)

**옵션 1 — 빌드 타임 정적 fetch** ⭐ 추천
- 빌드 시 GitHub API 호출 → JSON 파일로 저장 → 번들에 포함
- 장점: 런타임 API 키 노출 없음, 속도 빠름, rate limit 무관
- 단점: 사이트 갱신 시 재빌드 필요 (CI에서 일/주 단위 cron)

**옵션 2 — 런타임 fetch (퍼블릭 API)**
- 인증 없이 퍼블릭 엔드포인트 사용 (rate limit 60/h per IP)
- 장점: 항상 최신
- 단점: rate limit, 느림

**옵션 3 — GitHub Actions로 주기적 JSON 갱신**
- 옵션 1의 자동화 버전

→ **옵션 1 + GitHub Actions 일일 재빌드 추천**

### 5.2 가져올 데이터

- 핀 고정된 레포 (pinned repositories)
- 각 레포: 이름, 설명, 언어, 별 수, 토픽, README 일부
- 사용자 언어 통계 (top N)
- 컨트리뷰션 그래프 (선택)

### 5.3 필요한 정보 (사용자 입력)

- [ ] **GitHub 사용자명**:
- [ ] 노출하고 싶은 레포 (pinned로 충분 / 별도 큐레이션 필요)
- [ ] 비공개 레포 포함 여부 (포함 시 PAT 필요 — 빌드 타임에만 사용)

---

## 6. 콘텐츠 — Expertise 섹션 초안

### 6.1 메인 강점

> **🤖 Agentic AI Workflow Architect**
> Claude Code, multi-agent orchestration, MCP 생태계 활용으로
> 일반적인 프롬프트 엔지니어링을 넘어선 "에이전트 설계" 역량 보유

### 6.2 고도 기술 카드 (예시 — 컨펌/추가 필요)

- **에이전틱 AI 시스템 설계**: Claude Code 서브에이전트, MCP 서버 통합, 워크플로우 오케스트레이션
- **풀스택 프론트엔드**: React/TypeScript, Vue, 상태관리(Pinia/Zustand)
- **실시간/IoT 시스템**: WebSocket, MQTT, 시계열 데이터 처리
- **3D/그래픽스**: WebGL, Three.js, 셰이더
- **DevOps/자동화**: CI/CD 파이프라인, Git 워크플로우 자동화

> 실제 보유 기술 리스트를 알려주시면 정교화 가능. 현재 추정치임.

---

## 7. 프로젝트 구조 (제안)

```
portfolio_site/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── sections/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Expertise/
│   │   ├── TechStack/
│   │   ├── Projects/
│   │   └── Contact/
│   ├── three/              # R3F 씬, 셰이더
│   ├── hooks/              # useScrollProgress, useLenis 등
│   ├── lib/
│   │   ├── github.ts       # GitHub 데이터 로더
│   │   └── motion.ts       # GSAP 헬퍼
│   ├── styles/
│   │   ├── tokens.css      # CSS 변수
│   │   └── global.css
│   └── data/
│       └── github.json     # 빌드 타임 fetch 결과
├── scripts/
│   └── fetch-github.ts     # 빌드 전 GitHub 데이터 수집
├── public/
├── .github/workflows/
│   └── deploy.yml          # 일일 재빌드 + 배포
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 8. 배포

| 옵션 | 비용 | 권장도 |
|------|------|--------|
| **Vercel** | 무료 (개인) | ⭐ 추천 — 도메인/CI/엣지 캐싱 |
| **Netlify** | 무료 | ⭐ 추천 |
| **GitHub Pages** | 무료 | 가능 — 단, 커스텀 도메인 설정 번거로움 |
| **Cloudflare Pages** | 무료 | ⭐ 추천 — 빠름 |

→ **Vercel 또는 Cloudflare Pages 추천**

---

## 9. 작업 단계 (마일스톤)

| 단계 | 산출물 | 예상 |
|------|--------|------|
| M0 | **본 문서 컨펌** | — |
| M1 | Vite + TS + Tailwind 스캐폴드, 토큰 시스템 | 1 step |
| M2 | Lenis + 풀페이지 섹션 골격 | 1 step |
| M3 | Hero 3D 씬 (R3F) | 1 step |
| M4 | About / Expertise / Tech Stack 섹션 | 2 step |
| M5 | GitHub 데이터 페치 스크립트 + Projects 섹션 | 2 step |
| M6 | Contact + 후처리/디테일 폴리싱 | 1 step |
| M7 | 반응형 + 모바일 fallback | 1 step |
| M8 | 배포 설정 (Vercel + GH Action) | 1 step |

---

## 10. 컨펌 필요한 항목 (체크리스트)

방향성에 대해 다음 항목을 확인해주세요:

- [ ] **프레임워크**: Vite + React + TS (옵션 A) — OK?
- [ ] **모션 라이브러리**: GSAP + Framer Motion 둘 다 — OK? (가볍게 GSAP만도 가능)
- [ ] **컬러 팔레트**: 다크 + 바이올렛/사이언 액센트 — OK? 다른 무드 선호?
- [ ] **GitHub 데이터**: 빌드 타임 정적 fetch + GH Action 일일 재빌드 — OK?
- [ ] **GitHub 사용자명**:
- [ ] **노출 레포 정책**: 핀 고정 사용 OR 직접 큐레이션 리스트?
- [ ] **Expertise 카드**: 6.2의 5개 카테고리 — 보유 기술 추가/수정 사항?
- [ ] **메인 한 줄 태그라인**: 제안 — "Agentic AI 시대의 풀스택 엔지니어"  / 다른 카피 선호?
- [ ] **이름/표기**: Hero에 들어갈 이름(한글/영문/닉네임)?
- [ ] **연락처**: 이메일(`iotplusdev@gmail.com` 사용?), GitHub 외 다른 소셜(LinkedIn/X 등)?
- [ ] **언어**: 한국어 단일 / 한·영 토글?
- [ ] **배포 타겟**: Vercel? Cloudflare Pages? 다른 선호?

---

위 항목들 답변 주시면 바로 M1부터 진행하겠습니다.
