# DECISIONS — 컨펌된 결정사항 누적

> 각 결정에 **날짜 + 컨펌 출처(채팅/문서)**를 기록.
> 번복되면 새 항목으로 추가하고 이전 항목에 ⚠️ 마킹.

---

## D-001 · 2026-05-07 · 기술 스택 방향

- 프레임워크 후보: Vite + React + TypeScript
- 상태: **컨펌 대기** (PLAN.md §10 체크리스트 참고)

## D-002 · 2026-05-07 · 사이트 톤앤매너

- 다크 베이스 + 풀 애니메이션 + 3D 분위기
- 풀페이지 스크롤
- 상태: **컨펌됨** (사용자 최초 요청)

## D-003 · 2026-05-07 · 데이터 소스

- 백엔드 없음 / GitHub 연동
- 노출 레포는 **사용자 직접 큐레이션**으로 결정 (자동 pinned 사용 X)
- 상태: **컨펌됨**

## D-004 · 2026-05-07 · GitHub 계정

- 개인: `Scarpula`
- 조직: `iotplus-code`
- 상태: **컨펌됨**

## D-005 · 2026-05-07 · 노출할 개인 레포 (Scarpula) ⚠️ 갱신됨

1. PanicDisorder → **표시명 "숨이"** (Flutter 공황장애 진단·안정화 SaaS 앱)
2. bidshield → **BidShield**
3. LottoJackpot
4. ~~Supabase_TodoApp~~ → **노출 제외** (D-009 참고)
- 상태: **컨펌됨**

## D-006 · 2026-05-07 · iotplus-code 조직 레포 정책 ✅ 확정

- 노출 그룹: **Option A**
  - G1. ParkGolf_IOTPLUS_* (5 repos)
  - G2. solhavi_V2_* (5 repos)
  - G3. HDMS_* (+ public Swagger)
  - G5. EMS_V2_* + Solynx_AI_Server (+ public Swagger)
- 카드 표현: **시스템 단위 카드 1장 = 그룹 합산** (레포 1개당 카드 X)
- 상태: **컨펌됨**

## D-009 · 2026-05-07 · Supabase_TodoApp 처리

- 빈 레포 (0 KB) → **노출 제외**
- `docs/screenshots/_todoapp_renamed/` 폴더 삭제
- 상태: **컨펌됨**

## D-010 · 2026-05-07 · PanicDisorder 정체 정정

- 처음 추정: "AI SaaS 6 시스템 통합" (오판)
- 실제: **"숨"** — Flutter 기반 공황장애 진단·안정화 SaaS 앱 (panic_disorder_app v3.0.0+3)
- DSM-5 진단 + OpenAI Realtime Voice 상담 + 바이노럴 음악치료 + GPS 응급모드
- 레포 루트의 6개 SaaS 기획문서는 본 카드와 **분리** (사이드 문서)
- 상태: **컨펌됨**

## D-011 · 2026-05-07 · 브랜드명 정정

- ~~"숨이 (Soomi)"~~ → **"숨"** (단일 한글 글자)
- 슬러그: `soomi` → `soom`
- 상태: **컨펌됨**

## D-012 · 2026-05-07 · 역할은 contributor API 증거 기반으로 채움

- 추측 X. `gh api repos/<repo>/contributors`로 본인 커밋 비중을 산출하고 그 결과로 "역할" 필드를 작성
- 상세 증거 문서: [CONTRIBUTIONS_EVIDENCE.md](CONTRIBUTIONS_EVIDENCE.md)
- 상태: **컨펌됨** (사용자 지시)

## D-015 · 2026-05-08 · HDMS 제거 + ERP 카드 분리

- **HDMS 제거**: Solhavi V2가 "solhavi+hdms 통합" 차세대 버전이므로 HDMS는 하위 버전. 별도 카드 노출 무의미. → 카드 삭제, 스크린샷 폴더 제거
- **MES 카드 축소**: "서원+ERP 4개 묶음" → "서원 라인 단독 (MES_seowon_Backend, Mes_seowon_FrontEnd)"
- **ERP 카드 신규 추가** (G6에서 분리):
  - 레포: `mes_backend` + `mes_frontend`
  - 분석 근거: `mes_backend/README.md` (Spring Boot 3.2.1 / Java 17 / PostgreSQL / JPA / Springdoc OpenAPI / Maven 명시), `mes_backend/docs/ERP_재고관리_시스템_구조.md` 도메인 설계 문서, `mes_frontend/package.json` (Vite + React 18 + Zustand + TailwindCSS + Toast UI Editor + Recharts + react-hook-form + zod + Docker/nginx)
  - 분리 이유: 풀스택 스택의 풍부함(Spring Boot + React 18 + PostgreSQL + Toast UI Editor + Recharts 등)을 별도 카드로 명시적 강조
- **최종 카드 셋 (8장)**: 숨 / BidShield / LottoJackpot / ParkGolf / Solhavi V2 / Solynx EMS / 서원 MES / **ERP**
- 상태: **컨펌됨**

## D-014 · 2026-05-07 · 카드 표기 정책 — 역할 제거, 기능 중심

- **모든 카드에서 "역할(role)" 필드 제거**
- 사유: 전부 vibe coding 베이스라 개별 역할 표기는 의미 약함
- 대신 **기능(features)·기술스택·구성** 중심으로 표현
- 라이브 URL은 비워두고 사용자가 추후 직접 추가
- 상태: **컨펌됨**

## D-013 · 2026-05-07 · iotplus-code 그룹 최종 (8장 정책)

사용자 정책: **함께 진행한 팀 프로젝트는 커밋 비중이 작아도 정직한 "팀 참여" 표기로 포함**

채택 그룹:
- ✅ G1 ParkGolf IOTPLUS — 5/5 top contributor (주도)
- ✅ G2 Solhavi V2 — 팀 참여 (커밋 0이지만 기획·아키텍처 협업)
- ✅ G3 HDMS — 팀 참여 (부분 기여)
- ✅ G5 Solynx EMS — Front top · Back 2nd · AI Server 단독
- ✅ G6 MES (서원+ERP) — 3/4 top contributor

**최종 카드 셋 (총 8장)**:
1. 숨 · 2. BidShield · 3. LottoJackpot · 4. ParkGolf IOTPLUS · 5. Solhavi V2 · 6. HDMS · 7. Solynx EMS · 8. MES (서원+ERP)

- 상태: **컨펌됨**

> 비고: 카드 표기 시 "주도/단독" vs "팀 참여" 라벨로 구분하여 정직성 유지. 본인 역할 1줄은 사용자가 추후 채워줌.

## D-007 · 2026-05-07 · 스크린샷 운영

- 사용자가 직접 캡쳐해서 `docs/screenshots/<slug>/`에 투입
- 메인 이미지 파일명 규칙: `01-cover.{png,jpg}`
- 상태: **컨펌됨**

## D-008 · 2026-05-07 · 문서 운영 구조

- `PLAN.md` (전체 기획), `docs/PROJECTS.md` (프로젝트 카드), `docs/DECISIONS.md` (이 문서), `docs/WORKLOG.md` (진행 기록)
- 상태: **컨펌됨**
