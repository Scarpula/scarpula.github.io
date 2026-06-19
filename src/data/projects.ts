export type ProjectCategory =
  | "agentic-ai"
  | "fullstack"
  | "iot"
  | "data"
  | "tool"
  | "mobile";

export interface ProjectComponent {
  name: string;
  repo: string;
}

export interface ProjectCard {
  slug: string;
  displayName: string;
  oneLiner: string;
  category: ProjectCategory[];
  tech: string[];
  features: string[];
  components?: ProjectComponent[];
  repoUrl?: string;
  isPrivate?: boolean;
  liveUrl?: string;
  coverImage: string;
  org?: "Scarpula" | "iotplus-code";
  codeName?: string;
  /** 상세 hero 상단 eyebrow 라벨 오버라이드 (미지정 시 org 기준 자동) */
  label?: string;
}

// 카드 표지 + 상세 페이지 hero/gallery 모두 이 폴더 하나로 — 프로젝트별 관리
const ASSET_PREFIX = "/projects";

export const PROJECTS: ProjectCard[] = [
  // ─── MolHub — 런칭한 신약 탐색 SaaS (Paddle 실결제 + 멀티채널 런칭) ───
  // 실제 운영 중인 상용 SaaS. 제품·결제·벤치마크·마케팅까지 1인 풀사이클.
  {
    slug: "molhub",
    displayName: "MolHub",
    codeName: "molhub.bio · 신약 탐색 SaaS (라이브)",
    label: "Indie SaaS · Live · molhub.bio",
    oneLiner:
      "목표를 영어로 말하면 신규 분자를 설계 · 트리아지 · 도킹까지 자동 실행하는 브라우저 신약 탐색 SaaS — Paddle 실결제 · 학계 무료",
    category: ["agentic-ai", "fullstack", "data"],
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "FastAPI",
      "Celery",
      "RDKit",
      "AutoDock Vina",
      "FPocket / Meeko",
      "Supabase (Auth / RLS)",
      "Paddle (Merchant of Record)",
      "Hetzner (EU)",
      "Sentry",
      "3Dmol.js",
    ],
    features: [
      "Copilot — 자연어 목표 → ChEMBL 그라운딩 · 신규 분자 생성 · 트리아지 · 자동 도킹 · 랭킹 + 근거",
      "MolHyb 생성 설계 (BRICS) — QED · 합성가능성 · 신규성 다목적 스코어링 + 반응성 모티프 필터",
      "AutoDock Vina 배치 도킹 + 3D 결합 포즈 · 접촉 잔기 시각화 (CPU 전용)",
      "ChEMBL 2.9M · AlphaFold 200M+ · 37B+ 구매가능 유사체 통합 데이터",
      "Paddle MoR 실결제 → 웹훅 → 플랜 업그레이드 → Payoneer USD 정산 (1인 사업자 컴플라이언스)",
      "정직한 자가 벤치마크 (DUD-E EGFR) 공개 + Product Hunt · X · LinkedIn 멀티채널 런칭",
    ],
    repoUrl: "https://github.com/Scar-s-Agent/molhub",
    isPrivate: true,
    liveUrl: "https://www.molhub.bio",
    coverImage: `${ASSET_PREFIX}/molhub/01-cover.svg`,
    org: "Scarpula",
  },
  {
    slug: "soom",
    displayName: "숨",
    codeName: "PanicDisorder · panic_disorder_app v3.0.0+3",
    oneLiner:
      "DSM-5 진단부터 실시간 AI 음성 상담 · 바이노럴 음악 치료까지 — 공황장애 셀프 케어를 한 앱에 묶은 Flutter SaaS",
    category: ["mobile", "agentic-ai", "fullstack"],
    tech: [
      "Flutter 3.16+",
      "Dart 3.2+",
      "Material 3",
      "BLoC + Riverpod",
      "GoRouter",
      "Supabase",
      "OpenAI Realtime API",
      "Clean Architecture",
    ],
    features: [
      "DSM-5 기준 13개 증상 평가 → 위험도 · 맞춤 권고 산출",
      "OpenAI Realtime 기반 24h AI 음성 상담 — 감정 인식 · 응급 자동 감지",
      "3단계 호흡 가이드 (시각 · 음성) + 5-4-3-2-1 그라운딩",
      "바이노럴 비트 + 응급 · 일상 · 수면 컨텍스트 음악 추천",
      "GPS 응급 모드 — 원터치 · 근처 병원 안내 · 보호자 자동 알림",
      "iOS · Android · Web · Windows 멀티 플랫폼",
    ],
    repoUrl: "https://github.com/Scarpula/PanicDisorder",
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/soom/01-cover.png`,
    org: "Scarpula",
  },
  {
    slug: "bidshield",
    displayName: "BidShield",
    oneLiner:
      "200~300 페이지 입찰 공고 · 시방서 · 특수조건을 자동 파싱 · 압축 · 리스크 판정해 의사결정을 가속하는 SaaS",
    category: ["agentic-ai", "fullstack"],
    tech: [
      "React 18",
      "Vite 6",
      "TypeScript",
      "Tailwind v4",
      "Supabase (Auth / RLS / pgvector / pgmq)",
      "Zustand",
      "TanStack Query",
      "FastAPI (AI Backend)",
      "OpenClaw",
      "Docling / LlamaParse",
      "RAG",
    ],
    features: [
      "Document AI — 200~300 페이지 입찰 문서 자동 파싱 · 구조화",
      "다중 문서 압축 + 리스크 비교 엔진 (가격 · 리드타임 · 신뢰도)",
      "pgvector RAG 로 법규 · 시방서 · 특수조건 · 판례 임베딩 검색",
      "7개 비동기 워커 (Ingestion · Parser · Compression · Risk · Report · Notification …)",
      "Supabase Edge Function 한계 진단 → AI Backend 분리 아키텍처",
      "OpenClaw 내부 오케스트레이션 + Cron · Heartbeat 이중화 알림",
    ],
    repoUrl: "https://github.com/Scarpula/bidshield",
    isPrivate: true,
    liveUrl: "https://bidshield.ai.kr",
    coverImage: `${ASSET_PREFIX}/bidshield/01-cover.png`,
    org: "Scarpula",
  },
  {
    slug: "lottojackpot",
    displayName: "LottoJackpot",
    oneLiner:
      "동행복권 회차 · 번호 통계를 크롤링해 PostgreSQL 에 적재하고, 빈도 기반 예측 베이스라인을 제공하는 Python CLI",
    category: ["data", "tool"],
    tech: [
      "Python",
      "uv",
      "PostgreSQL / SQLite",
      "psycopg3",
      "SQLAlchemy",
      "CLI",
      "Cron",
    ],
    features: [
      "동행복권 공식 JSON API + 통계 페이지 이중 소스 크롤링",
      "init-db / ingest-all / ingest-incremental / predict 4단계 커맨드",
      "빈도 기반 예측 베이스라인 (윈도우 크기 조절 가능)",
      "uv sync 락 파일로 의존성 일관성 보장 — requirements.txt 폐기",
      "주간 자동 적재 Cron (0 8 * * 0)",
    ],
    repoUrl: "https://github.com/Scarpula/LottoJackpot",
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/lottojackpot/01-cover.png`,
    org: "Scarpula",
  },
  {
    slug: "parkgolf-iotplus",
    displayName: "ParkGolf Gofields",
    oneLiner:
      "백엔드 · 웹 · 모바일 · QR 체크인 · 키오스크 5개 컴포넌트로 묶은 파크골프장 통합 운영 플랫폼",
    category: ["iot", "fullstack", "mobile"],
    tech: ["Java", "TypeScript", "React", "IoT 통신", "QR 인증", "키오스크 UX"],
    features: [
      "회원 · 예약 · 결제 통합 백엔드 API",
      "운영자용 웹 관제 대시보드",
      "회원용 모바일 앱",
      "입장 게이트 QR 체크인 시스템",
      "현장 무인 결제 · 예약 키오스크",
      "실시간 IoT 센서 · 장비 연동",
    ],
    components: [
      { name: "Backend", repo: "ParkGolf_IOTPLUS_Back" },
      { name: "Web", repo: "ParkGolf_IOTPLUS_Front" },
      { name: "Mobile", repo: "ParkGolf_IOTPLUS_Mobile" },
      { name: "QR Checker", repo: "ParkGolf_IOTPLUS_QRChecker" },
      { name: "Kiosk", repo: "ParkGolf_IOTPLUS_Kiosk" },
    ],
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/parkgolf-iotplus/01-cover.jpg`,
    org: "iotplus-code",
  },
  {
    slug: "solhavi-v2",
    displayName: "Solhavi V2",
    oneLiner:
      "기존 두 시스템 (solhavi · hdms) 을 한 줄기로 통합한 V2 풀스택 — 백엔드 · 웹 · 앱 · 관리자 · 배포까지 한 호흡",
    category: ["iot", "fullstack", "mobile"],
    tech: ["Java", "TypeScript", "PowerShell (배포 자동화)"],
    features: [
      "통합 IoT 데이터 수집 · 관제 백엔드",
      "사용자 웹 대시보드",
      "모바일 앱",
      "통합 관리자 콘솔",
      "PowerShell 기반 배포 자동화 환경",
      "기존 V1 → V2 마이그레이션",
    ],
    components: [
      { name: "Backend", repo: "solhavi_V2_back" },
      { name: "Web", repo: "solhavi_V2_front" },
      { name: "App", repo: "solhavi_V2_app" },
      { name: "Admin", repo: "solhavi_V2_admin" },
      { name: "Prod Config", repo: "solhavi_V2_prod" },
    ],
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/solhavi-v2/01-cover.png`,
    org: "iotplus-code",
  },
  // ERP — Spring Boot + React 18 풀스택 (mes_backend + mes_frontend) ─────
  // MES 재고관리 도메인. ERP 라는 명확한 정체성과 풀스택 스택의 풍부함을
  // 별도로 강조하기 위해 분리.
  {
    slug: "erp",
    displayName: "ERP — 재고 · 제조 관리 시스템",
    oneLiner:
      "Spring Boot + React 18 풀스택 ERP — 제조실행시스템 (MES) 도메인의 자재 · 재고 · 생산 흐름을 통합 관리",
    category: ["fullstack"],
    tech: [
      "Spring Boot 3.2",
      "Java 17",
      "Spring Data JPA · Hibernate",
      "PostgreSQL",
      "Springdoc OpenAPI (Swagger)",
      "ModelMapper",
      "React 18",
      "Vite",
      "React Router v7",
      "Zustand",
      "TailwindCSS",
      "react-hook-form + zod",
      "Toast UI Editor",
      "Recharts",
      "Docker + nginx",
    ],
    features: [
      "MES 재고관리 도메인 — 자재 · 재고 입출고 · 트랜잭션 추적",
      "Spring Boot REST API + JPA + PostgreSQL 백엔드",
      "Swagger UI (Springdoc) 자동 API 문서화",
      "React 18 SPA — 라우팅 · 전역 상태 (Zustand) · 폼 (react-hook-form + zod)",
      "Toast UI Editor / Recharts 로 운영 현황 시각화",
      "Docker + nginx 컨테이너 배포 + ERP 도메인 설계 문서",
    ],
    components: [
      { name: "Backend", repo: "mes_backend" },
      { name: "Frontend", repo: "mes_frontend" },
    ],
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/erp/01-cover.png`,
    org: "iotplus-code",
  },
  {
    slug: "solynx-ems",
    displayName: "Solynx EMS — VoltTrack",
    oneLiner:
      "신재생 · ESS · DR · V2X · AI 까지 한 콘솔에서 다루는 통합 EMS — Java 백엔드 + React SPA + Gemini 3 Flash AI 서버 3-repo 구조",
    category: ["iot", "data", "agentic-ai", "fullstack"],
    tech: [
      "Spring Boot 2.7.18",
      "Java 11",
      "MyBatis",
      "PostgreSQL + TimescaleDB 2.17",
      "Redis (Pub/Sub)",
      "Netty Socket.IO",
      "React 18",
      "Vite 6",
      "Tailwind v4",
      "ApexCharts / ECharts / Recharts",
      "Three.js + reactflow",
      "FastAPI",
      "google-genai (Gemini 3 Flash)",
      "MCP SDK",
    ],
    features: [
      "신재생 · ESS · DR · V2X 5개 도메인 통합 모니터링 (32 화면)",
      "TimescaleDB 하이퍼테이블 시계열 적재 + 압축 · 보존 정책",
      "R/S/T 삼상 전기 품질 분석 + 역률 · 주파수 추이",
      "Socket.IO + STOMP + SSE 3중 실시간 채널",
      "Gemini 3 Flash + MCP 기반 도메인 어시스턴트 (별도 서버)",
    ],
    components: [
      { name: "Backend", repo: "EMS_V2_BackEnd" },
      { name: "Frontend", repo: "EMS_V2_FrontEnd" },
      { name: "AI Server", repo: "Solynx_AI_Server" },
    ],
    isPrivate: true,
    coverImage: `${ASSET_PREFIX}/solynx-ems/01-cover.png`,
    org: "iotplus-code",
  },
];
