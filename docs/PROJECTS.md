# PROJECTS — 포트폴리오에 노출할 프로젝트 정리

> 본 문서는 사이트의 **Projects 섹션 데이터 소스**입니다.
> 각 항목은 카드 한 장(또는 상세 페이지)에 매핑됩니다.
> **카드는 기능·기술 중심으로 표현. "역할" 표기는 사용하지 않습니다.** (D-014)

**스크린샷 위치**: `docs/screenshots/<slug>/` 하위에 직접 넣어주세요.

---

## 0. 스크린샷 파일 규칙

```
docs/screenshots/
├── <slug>/
│   ├── 01-cover.png        # 카드/상세 메인 (필수, 16:9 권장 ≥1280×720)
│   ├── 02-feature-a.png
│   └── 03-feature-b.png
```

- 메인 이미지는 반드시 `01-cover.{png,jpg}` — 코드에서 자동 픽업
- `01-`, `02-`, ... prefix로 정렬
- 모바일 앱(숨)은 폰 목업(9:16) + 풍경(16:9) 함께 권장

---

## 카드 노출 순서 (8장)

| # | 카드 | 분류 |
|---|------|-----|
| 1 | **숨** | Mobile · Agentic AI · Fullstack |
| 2 | **BidShield** | Agentic AI · Fullstack |
| 3 | **LottoJackpot** | Data · Tool |
| 4 | **ParkGolf IOTPLUS** | IoT · Fullstack · Mobile |
| 5 | **Solhavi V2** *(HDMS 흡수)* | IoT · Fullstack · Mobile |
| 6 | **Solynx EMS** | IoT · Data · Agentic AI |
| 7 | **서원 MES** | Fullstack · IoT |
| 8 | **ERP** *(신규)* | Fullstack |

> ~~HDMS~~ 제거 — Solhavi V2의 하위 버전(solhavi+hdms 통합)이라 흡수 처리.
> MES 카드는 서원 라인 단독으로 축소, ERP(mes_backend + mes_frontend)는 풀스택 스택 강조 위해 신규 카드 분리.

---

## 1. 숨 (Soom) · ⭐ 대표 모바일 SaaS

| 필드 | 값 |
|------|-----|
| 슬러그 | `soom` |
| 표시명 | **숨** _(레포명 `PanicDisorder`, 패키지 `panic_disorder_app v3.0.0+3`)_ |
| 한 줄 설명 | DSM-5 기반 공황장애 진단부터 실시간 AI 음성 상담·바이노럴 음악 치료까지 통합한 Flutter SaaS 앱 |
| 카테고리 | `mobile`, `agentic-ai`, `fullstack` |
| 핵심 기술 | Flutter 3.16+, Dart 3.2+, Material 3, BLoC + Riverpod, GoRouter, Supabase (Auth/DB/Realtime/Storage), OpenAI GPT Realtime API, Clean Architecture, GetIt + Injectable |
| 주요 기능 | • DSM-5 기준 13개 증상 체계 평가 → 위험도·맞춤 권고 산출<br>• OpenAI Realtime API 기반 24h AI 음성 상담 — 감정 인식·응급 자동 감지<br>• 3단계 호흡 가이드(시각·음성) + 5-4-3-2-1 그라운딩<br>• 바이노럴 비트 + 컨텍스트별(응급/일상/수면) 개인화 음악 추천<br>• GPS 응급 모드 — 원터치 활성화·근처 병원 안내·자동 연락처 알림<br>• iOS · Android · Web · Windows 멀티 플랫폼 빌드 |
| 레포 | https://github.com/Scarpula/PanicDisorder _(private)_ |
| 스크린샷 | `docs/screenshots/soom/` |

---

## 2. BidShield · ⭐ AI 입찰 분석 SaaS

| 필드 | 값 |
|------|-----|
| 슬러그 | `bidshield` |
| 표시명 | **BidShield — AI 입찰 공고 분석 SaaS** |
| 한 줄 설명 | 200~300페이지 입찰 공고/시방서/특수조건을 자동 파싱·압축·리스크 분석해 입찰 의사결정을 가속하는 SaaS |
| 카테고리 | `agentic-ai`, `fullstack` |
| 핵심 기술 | React 18, Vite 6, TypeScript, Tailwind v4, Supabase (Auth/RLS/Storage/pgvector/pgmq), Zustand, TanStack Query, FastAPI(AI Backend), OpenClaw(오케스트레이션), Docling/LlamaParse, RAG |
| 주요 기능 | • Document AI: 200~300페이지 입찰 문서 자동 파싱·구조화<br>• 다중 문서 압축 + 리스크 비교 엔진 (가격·리드타임·신뢰도)<br>• pgvector RAG로 법규/시방서/특수조건/판례 임베딩 검색<br>• 7개 비동기 워커 (Ingestion · Parser · Compression · Risk · Report · Notification 등)<br>• Supabase Edge Function 한계 진단 → AI Backend 분리 아키텍처<br>• OpenClaw 내부 오케스트레이션 + Cron/Heartbeat 이중화 알림 |
| 레포 | https://github.com/Scarpula/bidshield _(private)_ |
| 스크린샷 | `docs/screenshots/bidshield/` |

---

## 3. LottoJackpot · 로또 통계 예측 CLI

| 필드 | 값 |
|------|-----|
| 슬러그 | `lottojackpot` |
| 표시명 | **LottoJackpot — 로또 6/45 통계 예측 CLI** |
| 한 줄 설명 | 동행복권 회차/번호 통계를 크롤링해 PostgreSQL에 적재하고 빈도 기반 예측 베이스라인을 제공하는 Python CLI |
| 카테고리 | `data`, `tool` |
| 핵심 기술 | Python, **uv** (의존성 관리), PostgreSQL/SQLite, psycopg3, SQLAlchemy, CLI, Cron 스케줄링 |
| 주요 기능 | • 동행복권 공식 JSON API + 통계 페이지 이중 소스 크롤링<br>• `init-db / ingest-all / ingest-incremental / predict` 4단계 명령군<br>• 빈도 기반 예측 베이스라인 (윈도우 크기 조절 가능)<br>• `uv sync` 락 파일 일관 의존성 — `requirements.txt` 폐기<br>• 주간 자동 적재 Cron (`0 8 * * 0`) |
| 레포 | https://github.com/Scarpula/LottoJackpot _(private)_ |
| 스크린샷 | `docs/screenshots/lottojackpot/` |

---

## 4. ParkGolf IOTPLUS · 파크골프 통합 IoT 플랫폼

| 필드 | 값 |
|------|-----|
| 슬러그 | `parkgolf-iotplus` |
| 표시명 | **ParkGolf IOTPLUS — 파크골프 통합 IoT 운영 플랫폼** |
| 한 줄 설명 | 백엔드 + 웹 + 모바일 + QR 체크인 + 키오스크 5개 클라이언트로 구성된 파크골프장 통합 운영 시스템 |
| 카테고리 | `iot`, `fullstack`, `mobile` |
| 핵심 기술 | Java (Backend), TypeScript (Web/Mobile/QR/Kiosk), React, IoT 통신, QR 인증, 키오스크 UX |
| 구성 | 5 components — Back · Front · Mobile · QRChecker · Kiosk |
| 주요 기능 | • 회원·예약·결제 통합 백엔드 API<br>• 운영자용 웹 관제 대시보드<br>• 회원용 모바일 앱<br>• 입장 게이트 QR 체크인 시스템<br>• 현장 무인 결제·예약 키오스크<br>• 실시간 IoT 센서/장비 연동 |
| 레포 그룹 | `ParkGolf_IOTPLUS_Back/Front/Mobile/QRChecker/Kiosk` (iotplus-code) |
| 스크린샷 | `docs/screenshots/parkgolf-iotplus/` |

---

## 5. Solhavi V2 · solhavi+hdms 통합 플랫폼

| 필드 | 값 |
|------|-----|
| 슬러그 | `solhavi-v2` |
| 표시명 | **Solhavi V2 — solhavi+hdms 통합 플랫폼** |
| 한 줄 설명 | 기존 두 시스템(solhavi · hdms)을 통합한 V2 풀스택 — 백엔드/웹/앱/관리자/배포까지 한 호흡 |
| 카테고리 | `iot`, `fullstack`, `mobile` |
| 핵심 기술 | Java (Backend), TypeScript (Front/Admin/App), PowerShell (Prod 배포 자동화) |
| 구성 | 5 components — back · front · app · admin · prod |
| 주요 기능 | • 통합 IoT 데이터 수집·관제 백엔드<br>• 사용자 웹 대시보드<br>• 모바일 앱<br>• 통합 관리자(admin) 콘솔<br>• PowerShell 기반 배포 자동화 환경<br>• 기존 V1 → V2 마이그레이션 |
| 레포 그룹 | `solhavi_V2_back/front/app/admin/prod` (iotplus-code) |
| 스크린샷 | `docs/screenshots/solhavi-v2/` |

---

## 6. Solynx EMS · 에너지 관리 시스템 V2

| 필드 | 값 |
|------|-----|
| 슬러그 | `solynx-ems` |
| 표시명 | **Solynx EMS — 에너지 관리 시스템 V2** |
| 한 줄 설명 | IoT 에너지 데이터를 수집·분석·예측하는 EMS 플랫폼 — AI 서버까지 통합 |
| 카테고리 | `iot`, `data`, `agentic-ai` |
| 핵심 기술 | JavaScript (Frontend), Java (Backend), Python (AI Server) |
| 구성 | 3 — Front · Back · AI Server |
| 주요 기능 | • 다채널 에너지 데이터 수집·정규화 백엔드<br>• 사용량/효율 시각화 + 분석 프론트<br>• 시계열 예측 AI 서버 (Python)<br>• 알람·이상 탐지·리포트 자동화 |
| 레포 그룹 | `EMS_V2_FrontEnd`, `EMS_V2_BackEnd`, `Solynx_AI_Server` (iotplus-code) |
| 스크린샷 | `docs/screenshots/solynx-ems/` |

---

## 7. 서원 MES · 제조 실행 시스템

| 필드 | 값 |
|------|-----|
| 슬러그 | `mes` |
| 표시명 | **서원 MES — 제조 실행 시스템** |
| 한 줄 설명 | 서원 라인의 작업 지시·생산 실적·자재·품질을 실시간 추적하는 제조 실행 관리 시스템 |
| 카테고리 | `fullstack`, `iot` |
| 핵심 기술 | Java (Backend), JavaScript (Frontend), MES 도메인 (생산·작업·자재·품질) |
| 구성 | 2 — Backend · Frontend |
| 주요 기능 | • 작업 지시·생산 실적 추적<br>• 자재 입출고·재고 관리<br>• 품질·불량 관제<br>• 라인별 진행 현황 대시보드 |
| 레포 그룹 | `MES_seowon_Backend`, `Mes_seowon_FrontEnd` (iotplus-code) |
| 스크린샷 | `docs/screenshots/mes/` |

---

## 8. ERP · 재고·제조 관리 시스템 ⭐ 신규

> 풀스택 ERP — Spring Boot 3.2 + React 18 + PostgreSQL.
> 이전 MES 카드에 묶여 있던 mes_backend / mes_frontend 페어를 별도 카드로 분리.

| 필드 | 값 |
|------|-----|
| 슬러그 | `erp` |
| 표시명 | **ERP — 재고·제조 관리 시스템** |
| 한 줄 설명 | Spring Boot + React 18 풀스택 ERP — 제조실행시스템(MES) 도메인의 자재·재고·생산 흐름을 통합 관리 |
| 카테고리 | `fullstack` |
| 핵심 기술 (Backend) | Spring Boot 3.2 · Java 17 · Spring Data JPA + Hibernate · PostgreSQL · ModelMapper · Springdoc OpenAPI(Swagger) · Maven |
| 핵심 기술 (Frontend) | React 18 · Vite · React Router v7 · Zustand · TailwindCSS · react-hook-form + zod · Toast UI Editor · Recharts · Docker + nginx |
| 구성 | 2 — Backend (Spring Boot) · Frontend (React 18) |
| 주요 기능 | • MES 재고관리 도메인 — 자재·재고 입출고·트랜잭션 추적<br>• Spring Boot REST API + JPA + PostgreSQL 백엔드<br>• Swagger UI(Springdoc) 자동 API 문서화<br>• React 18 SPA — 라우팅·전역 상태(Zustand)·폼(react-hook-form + zod)<br>• Toast UI Editor / Recharts 차트로 운영 현황 시각화<br>• Docker + nginx 컨테이너 배포 구성 + ERP 도메인 설계 문서 |
| 레포 | `mes_backend`, `mes_frontend` (iotplus-code) |
| 스크린샷 | `docs/screenshots/erp/` |
| 분석 근거 | `mes_backend/README.md` (Spring Boot 3.2.1 / Java 17 / PostgreSQL / Springdoc OpenAPI / Maven 명시), `mes_backend/docs/ERP_재고관리_시스템_구조.md` 도메인 설계 문서, `mes_frontend/package.json` (Vite + React 18 + Zustand + TailwindCSS + Toast UI + Recharts) |

---

## 부록 — 카드 데이터 모델

```ts
type ProjectCategory =
  | "agentic-ai"
  | "fullstack"
  | "iot"
  | "data"
  | "tool"
  | "mobile";

interface ProjectCard {
  slug: string;
  displayName: string;
  oneLiner: string;
  category: ProjectCategory[];
  tech: string[];
  features: string[];      // 3~6 — "주요 기능" 불릿
  components?: string[];   // 다중 레포 그룹용 컴포넌트 라벨
  repoUrl?: string;
  isPrivate?: boolean;
  liveUrl?: string;        // 사용자가 추후 직접 추가
  coverImage: string;      // /screenshots/<slug>/01-cover.png
  gallery?: string[];
  org?: "Scarpula" | "iotplus-code";
  codeName?: string;       // "숨"처럼 표시명/레포명 다른 경우
}
```
