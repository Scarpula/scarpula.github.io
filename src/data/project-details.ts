/**
 * Project detail content — 카드 클릭 시 펼쳐지는 상세 페이지 데이터.
 *
 * 각 프로젝트마다 (선택) 상세 컨텐츠를 정의. 정의된 게 없으면 ProjectCard
 * 기본 정보로 fallback. 풍부한 컨텐츠가 있는 프로젝트(현재는 '숨')를 우선 작성.
 *
 * 이미지는 public/projects/<slug>/ 하위에 둠.
 */

export interface DetailSection {
  title: string;
  body: string; // 줄바꿈 \n으로 단락 구분
  /** 인라인 표시할 이미지 경로 (선택) — public/ 기준 */
  image?: string;
}

export interface DetailGalleryItem {
  src: string;
  caption?: string;
  /** 가로/세로/9:16 등 스타일 힌트 */
  aspect?: "phone" | "wide" | "square";
}

export interface DetailTechGroup {
  label: string;
  items: string[];
}

export interface ProjectDetail {
  slug: string;
  /** 헤더 hero 이미지. 미지정 시 ProjectCard.coverImage 사용 */
  heroImage?: string;
  /** 1~2 단락의 인트로 */
  intro: string;
  sections: DetailSection[];
  techGroups: DetailTechGroup[];
  gallery: DetailGalleryItem[];
  stats?: { label: string; value: string }[];
}

// 카드 표지(projects.ts coverImage)와 상세 모달 hero/gallery를 같은 폴더로 — 프로젝트별 관리
const ASSET = "/projects";

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  // ─────────────────────────────────────────────────
  //  MolHub — 브라우저 신약 탐색 SaaS (라이브 · Paddle 실결제)
  // ─────────────────────────────────────────────────
  molhub: {
    slug: "molhub",
    heroImage: `${ASSET}/molhub/01-cover.svg`,
    intro:
      "**MolHub**([molhub.bio](https://www.molhub.bio))는 클러스터·라이선스·conda 설치 없이 **브라우저 탭 하나에서 도는 초기 신약 탐색 SaaS**입니다. " +
      "사용자가 영어로 목표를 말하면 — *\"Design novel, synthesizable EGFR inhibitor leads.\"* — 에이전트가 타겟을 해석하고, ChEMBL의 알려진 actives를 끌어와 그라운딩하고, **데이터베이스에 없는 신규 분자를 설계**한 뒤, 약물성·합성가능성·신규성으로 트리아지하고, AlphaFold 구조에 **AutoDock Vina로 자동 도킹**해 근거가 붙은 랭킹 후보 목록을 돌려줍니다.\n\n" +
      "기획·제품·백엔드·결제·법무·벤치마크·런칭 마케팅까지 **1인 풀사이클**로 구축해 실제로 운영 중입니다. ChEMBL 2.9M · AlphaFold · RDKit · Vina 등 오픈사이언스 스택 위에 올렸고, 학계(.edu/.ac)는 무료, 유료 플랜은 **Paddle(Merchant of Record) 실결제 → Payoneer USD 정산**으로 돌아갑니다. " +
      "톤은 일관되게 정직합니다 — 도킹은 *트리아지 신호*이지 결합 보장이나 임상 결과가 아니라는 점을 제품·마케팅 전반에서 명시합니다.",
    sections: [
      {
        title: "Copilot — 목표 한 줄 → 도킹된 후보",
        body:
          "제품의 핵심은 자율 Copilot입니다. 평문 목표를 입력하면 에이전트가 **타겟 해석 → ChEMBL 15개 potent actives 조사 → BRICS 재조합으로 신규 분자 생성 → 다목적 트리아지(QED · 합성가능성 · 신규성, PAINS/Brenk 필터) → 상위 후보 자동 도킹(Vina) → 근거 한 줄이 붙은 랭킹**까지 한 번에 흘려보냅니다. 각 단계는 화면에 스트리밍됩니다.\n\n" +
          "반환되는 분자는 어떤 데이터베이스에도 존재하지 않는 — 생성된 뒤 점수가 매겨진 — 후보입니다. 가치는 오픈된 엔진(ChEMBL/AlphaFold/RDKit/Vina) 자체가 아니라, 목표를 **완결된 캠페인으로 오케스트레이션**해 브라우저 안에서 끝내는 데 있습니다.",
        image: `${ASSET}/molhub/02-copilot.svg`,
      },
      {
        title: "우리는 우리 도구로 우리를 깬다 — 정직한 벤치마크",
        body:
          "남에게 신뢰를 요구하기 전에 EGFR(CHEMBL203 / P00533)로 자가 검증했습니다. 첫 Copilot 런은 자신만만한 리포트를 내놨지만 실제 분자는 단일 chemotype(2,5-dimethylpyrrole + morpholine, vinyl bridge)으로 수렴한 광반응성·Michael-acceptor 류 — 메디시널 케미스트가 즉시 거르는 것들이었습니다. *도구를 써서* 이 결함을 발견했고, **반응성 모티프 거부 필터 + Bemis–Murcko 다양성 캡**을 같은 세션에 출시했습니다. 이후 같은 캠페인은 piperazine amide 계열의 깨끗하고 다양한 셋(QED 0.85–0.92, SA 1.4–2.5, alert 0)을 반환합니다.\n\n" +
          "도킹은 표준 벤치마크(DUD-E EGFR, 40 actives + 160 decoys)로 *제품 자체 프로토콜*을 돌렸습니다. blind box 기본값은 ROC-AUC ≈ 0.65 — 무작위보다 낫지만 강하지 않은 정직한 숫자. 포켓 타게팅은 전체 판별력은 그대로지만 실제 트리아지 구간(top 5–10%) 인리치먼트를 **약 2배**(EF5% 1.0→2.0)로 끌어올립니다. 더 나아가 receptor relaxation도 실험했고 *효과가 없자 파이프라인에 넣지 않기로* 결정한 것까지 그대로 공개했습니다. \"0.65와 그 고친 과정을 보여주는 게 보도자료보다 낫다\" — 회의적인 과학 청중에게는 이 정직함이 해자입니다.",
        image: `${ASSET}/molhub/04-benchmark.svg`,
      },
      {
        title: "실결제 SaaS — Paddle MoR → Payoneer 정산",
        body:
          "데모가 아니라 **실제로 카드를 긁는 SaaS**입니다. 학계(.edu/.ac 자동 인증)는 무료, Basic $99/mo · Pro $499/mo 두 유료 플랜이 있습니다.\n\n" +
          "1인 사업자 컴플라이언스를 지키기 위해 모든 결제는 **Paddle(Merchant of Record)** 로 흐릅니다 — VAT·세금·차지백을 Paddle이 처리합니다. `@paddle/paddle-js` 오버레이 체크아웃을 띄우고, Supabase user id를 custom data로 실어 보낸 뒤, **웹훅이 결제를 프로필에 연결해 플랜을 즉시 업그레이드**합니다. Paddle 승인이 도메인 단위라 승인 대기 중인 `app.molhub.bio`에서는 승인된 메인 도메인의 공개 `/checkout` 브릿지로 hop 시키는 우회까지 구현했습니다. 매출은 **Payoneer USD 계좌**로 정산됩니다.",
        image: `${ASSET}/molhub/03-billing-paddle.svg`,
      },
      {
        title: "멀티채널 런칭 — 하나의 정직한 메시지",
        body:
          "런칭은 채널별 카피팩으로 준비했고, 게이트 없는 채널부터 순차 집행했습니다.\n\n" +
          "• **Product Hunt** — *\"Drug discovery in your browser — an AI agent that designs and docks molecules\"* (AI · Science · Developer Tools · SaaS)\n" +
          "• **X / Twitter** — *\"Tell MolHub a goal in plain English → it designs novel molecules, triages them, and docks the best against an AlphaFold structure. In your browser. 🧵\"* (#compchem #drugdiscovery, 데모 GIF 첨부)\n" +
          "• **LinkedIn**(창업자 개인 계정) — *\"Most 'AI drug discovery' sits behind enterprise licenses and clusters. I wanted the opposite…\"*\n" +
          "• **Hacker News Show HN** + **Reddit**(r/comp_chem · r/bioinformatics) — 신규 계정 마찰을 고려해 워밍업 후 집행.\n\n" +
          "모든 채널에 동일한 가드레일을 적용했습니다 — \"AI가 신약을 설계한다\" 류 과장 대신 \"리드 발굴·트리아지 가속\", 도킹=추정/트리아지 명시, 임상·효능 주장 금지. 배너는 near-black `#0b0710` · 바이올렛→푸시아 그라데이션 · 에메랄드 Vina 점수 · 분자 브랜드마크의 브랜드 키트로 채널 간 일관성을 유지했습니다.",
        image: `${ASSET}/molhub/05-launch.svg`,
      },
      {
        title: "아키텍처 — CPU 전용 · EU 데이터 레지던시",
        body:
          "프론트는 **Next.js 15 · React 19 · App Router · Tailwind v4**(Vercel), 과학 컴퓨트는 **FastAPI + Celery 워커**(Hetzner Falkenstein, EU)로 분리했습니다. RDKit · AutoDock Vina · Meeko · FPocket이 도킹/포켓/준비 파이프라인을, 3Dmol.js가 결합 포즈 뷰어를 담당합니다. OpenAPI 21개 엔드포인트, 비동기 잡, Caddy + Let's Encrypt.\n\n" +
          "하드 제약을 명시적으로 지켰습니다 — **$5K MRR 전까지 GPU 0**(도킹·검색·포켓 탐지 전부 CPU에서 동작), 과학 데이터는 EU에 상주(Supabase US-East는 Auth 전용), 레퍼런스 데이터는 재배포 가능한 오픈 라이선스만 사용. 고정 월 OPEX는 ~$190 수준으로 묶었습니다.",
        image: `${ASSET}/molhub/06-architecture.svg`,
      },
    ],
    techGroups: [
      {
        label: "Frontend",
        items: [
          "Next.js 15 (App Router)",
          "React 19",
          "TypeScript",
          "Tailwind v4",
          "3Dmol.js (포즈 뷰어)",
          "@paddle/paddle-js",
          "Sentry",
        ],
      },
      {
        label: "Backend · Compute",
        items: [
          "FastAPI",
          "Celery (async 워커)",
          "RDKit",
          "AutoDock Vina",
          "Meeko / FPocket",
          "OpenMM (relaxation 실험)",
          "Hetzner Falkenstein (EU)",
          "Caddy + Let's Encrypt",
        ],
      },
      {
        label: "Data · Auth",
        items: [
          "ChEMBL 2.9M (RDKit 정규화 · Morgan FP)",
          "AlphaFold 200M+ · RCSB PDB",
          "PubChem (on-demand)",
          "Enamine REAL / ZINC-22 (37B+)",
          "Supabase (Auth / RLS / profiles)",
          "pgvector",
        ],
      },
      {
        label: "Payments · GTM",
        items: [
          "Paddle (Merchant of Record)",
          "Paddle 웹훅 → 플랜 업그레이드",
          "Payoneer USD 정산",
          "Resend (트랜잭션 메일)",
          "Product Hunt · X · LinkedIn · HN",
          "DUD-E 벤치마크 공개",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/molhub/01-cover.svg`,
        caption:
          "랜딩 히어로 — \"Drug discovery, in your browser.\" 공개 프리뷰의 EGFR(1M17) 배치 도킹: Gefitinib −7.71 · Erlotinib −7.42 kcal/mol",
        aspect: "wide",
      },
      {
        src: `${ASSET}/molhub/02-copilot.svg`,
        caption:
          "Copilot 캠페인 — 목표 한 줄 → ChEMBL 그라운딩 · 신규 분자 생성 · 트리아지 · 자동 도킹 → 근거가 붙은 랭킹 (piperazine amide, QED 0.85–0.92, −7.2~−7.5 kcal/mol)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/molhub/03-billing-paddle.svg`,
        caption:
          "실결제 — Academic 무료 / Basic $99 / Pro $499. Paddle MoR 오버레이 체크아웃 → 웹훅 → Supabase 플랜 업그레이드 → Payoneer USD 정산",
        aspect: "wide",
      },
      {
        src: `${ASSET}/molhub/04-benchmark.svg`,
        caption:
          "정직한 자가 벤치마크 — DUD-E EGFR. blind ROC-AUC 0.65를 그대로 공개, 포켓 타게팅으로 top-5/10% 인리치먼트 약 2배. \"We publish ours.\"",
        aspect: "wide",
      },
      {
        src: `${ASSET}/molhub/05-launch.svg`,
        caption:
          "멀티채널 런칭 — Product Hunt · X · LinkedIn · Show HN + Reddit. 채널 공통 가드레일: 과장 금지, 도킹=트리아지 신호 명시",
        aspect: "wide",
      },
      {
        src: `${ASSET}/molhub/06-architecture.svg`,
        caption:
          "아키텍처 — Next.js 15(Vercel) · FastAPI + Celery(Hetzner EU) · Supabase Auth · 오픈사이언스 데이터. $5K MRR 전까지 GPU 0, EU 데이터 레지던시",
        aspect: "wide",
      },
    ],
    stats: [
      { label: "Status", value: "Live · molhub.bio" },
      { label: "결제", value: "Paddle MoR → Payoneer" },
      { label: "라이브러리", value: "ChEMBL 2.9M" },
      { label: "DUD-E ROC-AUC", value: "0.65 (공개)" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  숨 (Soom / MaumSum) — Flutter 공황장애 진단·관리 SaaS
  // ─────────────────────────────────────────────────
  soom: {
    slug: "soom",
    heroImage: `${ASSET}/soom/01-cover.png`,
    intro:
      "공황장애를 가진 사용자가 발작 순간을 안전하게 통과하고, 일상에서 패턴을 추적해 자기 관리 도구로 키워가도록 설계한 모바일 SaaS입니다. " +
      "DSM-5 기준의 자가 진단부터 GPT-4 Realtime API 기반 AI 음성 상담, 실시간 호흡·그라운딩 가이드, GPS 응급 모드까지 단일 앱 안에 통합되어 있습니다. " +
      "iOS·Android·Web·Windows 멀티 타겟으로 빌드되며 v3.0.0+3까지 정식 운영 중입니다.",
    sections: [
      {
        title: "DSM-5 기반 자가 진단",
        body:
          "13가지 공황장애 핵심 증상을 정신과 임상 기준 그대로 체크리스트화. 사용자는 약 10분 안에 답변하고 위험도·맞춤 권고·전문의 상담 필요 여부를 즉시 받습니다.\n\n진단 결과는 Supabase에 안전하게 저장되며, 기록이 누적될수록 AI 상담 컨텍스트로 활용됩니다.",
      },
      {
        title: "GPT-4 Realtime 음성 상담",
        body:
          "OpenAI Realtime API를 WebSocket으로 직결해 24kHz PCM16 오디오를 양방향 스트리밍합니다. Press & Hold UX, 실시간 파형 시각화, 권한 요청 플로우까지 자체 구현했습니다.\n\n핵심은 RAG 컨텍스트 — text-embedding-3-small + Supabase pgvector로 임상 지식 7종(치료 기법 / 약물 정보 / 응급 프로토콜 / 케이스 스터디 / FAQ / 대화 템플릿 / DSM-5 진단 기준)을 시맨틱 검색해 프롬프트에 주입합니다. 일반 챗봇이 아니라 도메인 특화 음성 상담사를 만든 셈입니다.",
      },
      {
        title: "안정화 툴킷",
        body:
          "발작이 시작되면 한 번의 탭으로 즉시 호흡 가이드 / 5-4-3-2-1 그라운딩 / 응급 연락처 / 안정화 사운드에 도달합니다.\n\n바이노럴 비트와 컨텍스트별(응급 / 일상 / 수면) 개인화 음악 추천도 함께 제공합니다. 사용자 효과성 추적 데이터를 기반으로 다음 추천이 갱신됩니다.",
      },
      {
        title: "발작 일지 + 기분 기록 (V3)",
        body:
          "V3 로드맵의 핵심 — 발작 시점·강도·지속시간·장소·트리거·증상·대처법·효과를 구조화된 폼으로 기록. 매일의 기분·수면·운동·복약을 함께 추적합니다.\n\n데이터가 누적될수록 AI가 패턴을 분석하고 개인 맞춤 인사이트를 생성합니다. 일지 → 패턴 → AI 인사이트 → 전문의 연계로 이어지는 \"내 손 안의 자기 관리 일지\" 포지셔닝.",
      },
      {
        title: "GPS 응급 모드",
        body:
          "원터치로 응급 모드를 켜면 GPS 기반 가까운 정신과·응급실을 즉시 안내하고, 사전 등록된 응급 연락처(가족·친구)에 자동 알림을 전송합니다.\n\n실시간 위치 공유와 빠른 통화 기능이 통합되어 있어 위급 순간의 의사결정 부담을 줄입니다.",
      },
      {
        title: "아키텍처 — Clean + Feature-First",
        body:
          "lib/core/services 에 RAG / Realtime / Audio Recording / Audio Playback / Counseling 5개 서비스가 모듈화되어 있고, lib/features/ 아래 ai_voice / diagnosis / journal / sos / profile 도메인이 자기 완결적으로 구성됩니다.\n\nBLoC + Riverpod + GoRouter + GetIt + Injectable 조합으로 상태·라우팅·DI를 분리. Supabase Auth/RLS/Realtime/Storage가 백엔드 전반을 책임집니다.",
      },
      {
        title: "멀티 플랫폼 빌드",
        body:
          "Flutter 3.16+ / Dart 3.2+ / Material 3 기반으로 iOS · Android · Web · Windows 네 플랫폼을 한 코드베이스에서 빌드합니다.\n\n네이티브 권한(마이크·위치) 플로우와 인앱 결제, 푸시 알림까지 플랫폼별로 정상 동작하도록 검증되어 있습니다.",
      },
    ],
    techGroups: [
      {
        label: "Mobile · Frontend",
        items: [
          "Flutter 3.16+",
          "Dart 3.2+",
          "Material 3",
          "BLoC + Riverpod",
          "GoRouter",
          "GetIt + Injectable (DI)",
          "flutter_animate / lottie / shimmer",
        ],
      },
      {
        label: "AI · Voice",
        items: [
          "OpenAI GPT-4 Realtime API (WebSocket)",
          "OpenAI text-embedding-3-small",
          "PCM16 24kHz 양방향 스트리밍",
          "에코 캔슬링 / 노이즈 억제",
          "RAG (Supabase pgvector, 7 데이터 소스)",
        ],
      },
      {
        label: "Backend · Data",
        items: [
          "Supabase (Auth / RLS / Realtime / Storage)",
          "PostgreSQL + pgvector",
          "Hive (로컬 캐시)",
          "flutter_secure_storage",
          "dio + retrofit",
        ],
      },
      {
        label: "Architecture",
        items: [
          "Clean Architecture",
          "Feature-First 모듈 구조",
          "Repository 패턴",
          "Event-driven Audio Pipeline",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/soom/02-onboarding.png`,
        caption: "온보딩 — 자가 선별검사 안내",
        aspect: "phone",
      },
      {
        src: `${ASSET}/soom/03-login.png`,
        caption: "다중 소셜 로그인 (Google / Kakao / Naver / Email)",
        aspect: "phone",
      },
      {
        src: `${ASSET}/soom/04-home.png`,
        caption: "홈 대시보드 — 현재 상태 + 빠른 액세스 4종",
        aspect: "phone",
      },
      {
        src: `${ASSET}/soom/05-diagnosis.png`,
        caption: "DSM-5 기준 진단 — 13개 증상 약 10분",
        aspect: "phone",
      },
      {
        src: `${ASSET}/soom/06-profile.png`,
        caption: "프로필 — 개인정보 / 의료 정보 / 응급 연락처",
        aspect: "phone",
      },
    ],
    stats: [
      { label: "Version", value: "v3.0.0+3" },
      { label: "Platforms", value: "iOS · Android · Web · Windows" },
      { label: "RAG sources", value: "7" },
      { label: "DSM-5 symptoms", value: "13" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  BidShield — 입찰 공고/시방서 자동 파싱·리스크 분석 SaaS
  // ─────────────────────────────────────────────────
  bidshield: {
    slug: "bidshield",
    heroImage: `${ASSET}/bidshield/01-cover.png`,
    intro:
      "200~300페이지 분량의 나라장터 입찰 공고 / 시방서 / 특수조건 / 산출내역서를 자동 파싱·압축·리스크 분석해, 입찰 의사결정을 가속하는 B2B SaaS입니다. " +
      "단순 문서 검색이 아니라 — Document AI로 표·조항·물량을 구조화하고, RAG로 법규/표준과 비교하고, 규칙 엔진과 LLM이 협업해 \"이 공고에 들어가도 되는가\"를 점수와 근거로 답변합니다. " +
      "처음부터 LLM 한 번에 던지지 않는 4-Layer 분리 아키텍처(Supabase + FastAPI AI Backend + OpenClaw + External)로 설계되어 있습니다.",
    sections: [
      {
        title: "왜 4-Layer 분리 아키텍처인가",
        body:
          "Supabase Edge Functions 는 256MB 메모리 / 최대 400초 / CPU 2초/요청 제한이 있습니다. 200~300페이지 PDF 파싱·다중 문서 비교·장시간 리포트 생성은 Edge 안에서 안정적으로 못 돌립니다.\n\nSupabase 는 Auth · Postgres+RLS · Storage · Realtime · pgvector · pgmq 만 맡고, 무거운 AI 처리는 별도 FastAPI AI Backend 로 분리했습니다. OpenClaw 는 사용자-facing API 가 아닌 내부 오케스트레이션 런타임으로 두어, Cron·Heartbeat·Task Flow 만 담당합니다.\n\n이 분리 덕분에 — 분석 워크로드가 Supabase 의 안정성을 위협하지 않고, AI Backend 는 독립 배포·스케일링이 가능하며, OpenClaw 보안은 내부망으로 격리됩니다.",
      },
      {
        title: "Document AI — Docling + LlamaParse 듀얼 파서",
        body:
          "포맷별로 파서를 라우팅합니다. PDF · DOCX · XLSX · PPTX 는 Docling 우선. HWP · 복잡 스캔본 · 복잡 표는 LlamaParse 우선. 실패 시 fallback parser 로 자동 전환되거나 사용자에게 수동 재처리를 요청합니다.\n\n모든 파싱 결과는 공통 스키마로 정규화됩니다 — document_type / page_no / section_title / clause_no / work_type / material_name / quantity / unit / table_row_id / bbox / source_text / source_page_reference. 즉 200페이지 PDF 가 \"문서별 1차 구조화 → 핵심 블록 추출 → 의미 동치 정규화 → 압축 요약본\" 의 4단계를 거쳐 비교 가능한 structured summary 로 변환됩니다.\n\n핵심은 \"요약\"이 아닌 \"비교 가능한 구조화\". 200p 를 LLM 에 그대로 던지지 않으면서도, 물량·조항·기간을 정확히 대조할 수 있게 만드는 게 목적입니다.",
      },
      {
        title: "리스크 엔진 — 규칙(수학) + LLM(설명) 분담",
        body:
          "판단의 수학·기준은 규칙 엔진이, 설명과 종합 문장은 LLM 이 담당합니다.\n\n**규칙 엔진**: 물량 차이 계산, 퍼센트 차이 계산, 지체상금 계산, 하자보수 기간 비교, 설계변경 제한 탐지, 자격/지역 제한 계산, 마감 임박 계산 — 모두 코드와 수치로 결정됩니다.\n\n**LLM**: 핵심 조건 요약, 규칙 결과 설명 문장 생성, 여러 근거를 묶은 종합 의견, 사용자 친화적 리포트 문장화 — 자연어 합성 작업만.\n\n최종 리스크 점수 = 물량 불일치 가중치 + 계약조항 불리도 + 자격/지역 제한 + 공정/마감 리스크. 0~39 추천 / 40~69 주의 / 70~100 비추천. 점수와 근거 페이지가 함께 표출됩니다.",
      },
      {
        title: "RAG 컨텍스트 — pgvector 5종 데이터셋",
        body:
          "Supabase pgvector 에 5종의 임베딩 데이터를 적재합니다 — 국가계약법 / 표준시방서 / 발주처 특수조건 / 과거 판례·분쟁사례 / 내부 리스크 기준표. 메타데이터는 document_group / issuer / clause_no / effective_date / topic / source_url 까지 포함.\n\n공고에서 계약조항이 추출되면 관련 법규/표준을 시맨틱 검색해 \"표준 대비\" 형태로 차이점과 불리한 수준을 사용자에게 보여줍니다. 일반 챗봇이 아니라 \"이 조항이 표준보다 얼마나 불리한가\" 를 답하는 도메인 특화 RAG 입니다.",
      },
      {
        title: "큐 기반 파이프라인 — 7개 비동기 워커",
        body:
          "pgmq 위에 7개 큐를 깔았습니다 — tender_sync_queue / doc_ingest_queue / parse_queue / compress_queue / risk_analyze_queue / report_queue / notify_queue.\n\n상태 머신: queued → ingesting → parsing → compressing → analyzing → reporting → notifying → completed. 실패 시 retrying → failed_final 로 분기.\n\nAPI 는 큐에 발행만 하고 즉시 응답합니다. 프론트는 Supabase Realtime 으로 상태를 받아 진행 상황을 표시하고, 완료되면 PDF 리포트가 Storage 에 적재됩니다. 무거운 작업 → 큐 뒤로, API → 빠른 응답 — 원칙이 명확합니다.",
      },
      {
        title: "OpenClaw 내부 오케스트레이션",
        body:
          "OpenClaw 는 공용 사용자 API 처리기가 아닌 내부 전용 게이트웨이로 운영됩니다. 역할은 세 가지로 분리되어 있습니다.\n\n**Cron**: 오전 8시 맞춤 공고 digest 발송, D-3 / D-1 마감 재알림, 정정공고 재분석 예약, 리포트 생성 후 후속 작업.\n\n**Heartbeat**: stalled job 점검, 파싱 실패율 모니터링, 재처리 필요 건 자동 감지, 내부 health check.\n\n**Task Flow**: 정밀 분석 요청 후 \"문서 확보 → 파싱 완료 → 압축 완료 → 리스크 분석 → PDF 생성 → 알림\" 의 다단계 흐름을 제어. 단계마다 실패 복구·재시도 로직이 들어 있어 한 단계 실패가 전체 작업을 죽이지 않습니다.\n\nOpenClaw 는 dev / staging / prod 분리 운영. 컨테이너·호스트도 분리해 보안을 격리합니다.",
      },
      {
        title: "데이터 모델 — RLS 회사 단위 격리",
        body:
          "Postgres 에 9개 핵심 테이블을 설계했습니다 — companies / company_memberships / company_profiles / tenders / tender_documents / analysis_jobs / parsed_artifacts / risk_items / reports / notifications.\n\n모든 테이블에 company_id 기반 RLS. 사용자는 본인 소속 회사 데이터만 읽기 가능. 브라우저는 anon/public key 만 사용하고 service_role_key 는 AI Backend / Edge Functions 에서만.\n\nStorage 는 4개 버킷으로 분리 — raw-docs (업로드 원문) / parsed-json (Docling·LlamaParse 출력) / reports (최종 PDF) / debug-artifacts (내부 검증용, 운영 분리). 업로드는 모두 Signed Upload URL 기반.",
      },
      {
        title: "사용자 흐름 — 정밀 분석 요청부터 리포트까지",
        body:
          "1) 회사 프로필 등록 (사업자등록번호 / 업체명 / 면허 / 지역 / 시공능력평가액 — 일부는 KISCON 자동완성, 일부는 수동 입력).\n2) 맞춤 공고 자동 매칭 — 나라장터 OpenAPI 동기화 + 회사 프로필 규칙 기반 매칭. 매일 오전 이메일 digest.\n3) 사용자가 공고에서 \"정밀 분석 요청\" 클릭 → analysis_jobs 생성 (queued).\n4) 첨부문서 자동 수집 시도 → 실패 시 수동 업로드 fallback.\n5) 파싱 → 압축 → 리스크 비교 → PDF 리포트 → 사용자 알림 — 평균 수 분 내 완료.\n6) 리포트 섹션: 종합 판정 / 물량 검증 / 계약조건 리스크 / 자격·지역 제한 / 예상 비용 영향 / 권장 대응방안 / 근거 페이지.\n\n결과적으로 \"이 공고에 들어가도 되나\" 의 의사결정 시간을 200페이지 정독 → 리포트 한 장으로 단축합니다.",
      },
    ],
    techGroups: [
      {
        label: "Frontend",
        items: [
          "React 18.3",
          "Vite 6",
          "TypeScript 5.6",
          "Tailwind v4 (@tailwindcss/vite)",
          "Zustand 5 (전역 상태)",
          "TanStack Query 5 (서버 상태)",
          "React Router 6",
          "Recharts (리스크 차트)",
          "lucide-react",
        ],
      },
      {
        label: "Backend · Data",
        items: [
          "Supabase (Auth / RLS / Realtime / Storage)",
          "PostgreSQL + pgvector",
          "pgmq (7개 큐)",
          "Edge Functions (가벼운 보조 작업)",
          "Signed Upload URL",
        ],
      },
      {
        label: "AI Backend",
        items: [
          "FastAPI (별도 서버)",
          "Docling (PDF · DOCX · XLSX · PPTX)",
          "LlamaParse (HWP · 복잡 스캔본)",
          "OpenAI / Anthropic LLM",
          "RAG (pgvector, 5 데이터 소스)",
          "Pipeline 7-Worker",
        ],
      },
      {
        label: "Orchestration · External",
        items: [
          "OpenClaw (내부 전용)",
          "Cron / Heartbeat / Task Flow",
          "나라장터 OpenAPI",
          "KISCON (시공능력평가)",
          "Email Sender + Kakao Bizmessage",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/bidshield/02-landing-metrics.png`,
        caption:
          "랜딩 — Numbers Teams Trust: 43.7% 적자 비율 / 3분 판정 / 1화면 통합 검토 (국토교통부·대한건설협회 2024 자료)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/bidshield/03-landing-flow.png`,
        caption:
          "랜딩 — Review Flow 3-step: 문서 표정 읽기 → 주의 장면 확대 → 판정·대응 제안",
        aspect: "wide",
      },
      {
        src: `${ASSET}/bidshield/04-tender-search.png`,
        caption:
          "공고 검색 — 회사 프로필 기반 적합도 라벨 (정밀 분석 추천 / 적합 / 지역 제한 확인 필요) + AI 분석 요청 진입",
        aspect: "wide",
      },
      {
        src: `${ASSET}/bidshield/05-subscription.png`,
        caption:
          "구독 관리 — 체험(무료) / Basic(29만/월, AI 분석 10건) / Pro(49만/월, 무제한·낙찰 성공보수 0.3%) 3-tier 요금제",
        aspect: "wide",
      },
    ],
    stats: [
      { label: "Pipeline workers", value: "7" },
      { label: "Document size", value: "200~300p" },
      { label: "RAG sources", value: "5" },
      { label: "Risk score", value: "0~100" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  LottoJackpot — 로또 번호 분석·예측 데스크톱 시스템
  // ─────────────────────────────────────────────────
  lottojackpot: {
    slug: "lottojackpot",
    heroImage: `${ASSET}/lottojackpot/01-cover.png`,
    intro:
      "동행복권 6/45 회차 1~1219회 (2002-12-07 ~ 2026-04-11) 누적 데이터를 적재하고, 통계 분석과 예측 조합 생성을 한 화면에서 다루는 **React + Electron Windows 데스크톱 앱**입니다. " +
      "단순 \"빈도 TOP\" 가 아닌 — 빈도 베이스라인 위에 5가지 통계 필터(합계 / 홀짝 / 고저 / 끝수 / 연속), 유전 알고리즘, 몬테카를로 가중 샘플링을 얹어 \"적합도 점수\"가 매겨진 10개 조합을 산출합니다. " +
      "Electron 셸 안에서 React UI 가 렌더링되고, Python 백엔드(`lottojackpot` 패키지)는 자식 프로세스로 동시 기동되어 로컬 IPC 로 통신합니다. \"서버 연결됨\" 인디케이터로 백엔드 헬스를 실시간 체크하면서, 매주 일요일 자동 적재(Cron) 까지 한 데스크톱 앱 안에 통합되어 있습니다.",
    sections: [
      {
        title: "데이터 적재 — 공식 JSON + HTML 듀얼 소스",
        body:
          "1순위는 동행복권의 공식 JSON API (`common.do?method=getLottoNumber&drwNo=N`) — `returnValue == \"success\"` 응답에서 `drwtNo1..6 / bnusNo / drwNoDate` 를 추출합니다. HTML 파싱보다 안정적이고 마크업 변경에 영향받지 않습니다.\n\n2순위는 번호별 통계 페이지 HTML 파싱 — `statByNumber` 페이지의 테이블 캡션을 기준으로 1~45 번호와 당첨 횟수를 추출합니다. 마크업이 변동되어도 tbody/td 인덱스 기반 대체 경로로 fallback.\n\n핵심 원칙: **Idempotent Upsert** (PK 기반 업데이트, 중복 삽입 금지) + 50개씩 배치 처리 (한 배치 실패해도 다음 배치 계속) + 요청 간격 슬립 옵션 (서버 부하 방지). 1회차부터 1219회차까지 한 번에 안전하게 채울 수 있습니다.",
      },
      {
        title: "데이터 모델 — 2 테이블 단순 스키마",
        body:
          "`draw_results` — draw_number(PK) / draw_date / n1~n6 / bonus / created_at / updated_at. 회차별 당첨번호와 보너스를 1:1 저장.\n\n`number_stats` — (number, include_bonus) 복합 PK / count / updated_at. 1~45 번호별 누적 당첨 횟수를 보너스 포함/미포함 두 버전으로 관리.\n\n작은 스키마로 큰 분석을 — \"덜 저장하고 더 계산하라\" 원칙. 빈도, 핫넘버, 콜드넘버, 5가지 통계 필터 모두 이 두 테이블에서 파생됩니다.",
      },
      {
        title: "예측 엔진 — 3-Layer 합성",
        body:
          "**Layer 1: 빈도 베이스라인** (`predict_by_frequency`) — 최근 N회차(기본 100) 윈도우의 번호별 등장 빈도를 카운트하고 Top 6 정렬. 가장 단순하지만 검증된 출발점.\n\n**Layer 2: 유전 알고리즘** — 초기 모집단(랜덤 조합) → 적합도 함수(통계 필터 통과 + 빈도 가중) → 교차/돌연변이 → 세대 진화. 화면의 `유전 알고리즘 최적화 #N` 카드들이 이 결과.\n\n**Layer 3: 몬테카를로 가중 샘플링** — 빈도가 높은 번호일수록 뽑힐 확률이 높은 가중 분포에서 6개를 N번 샘플링하고, 통계 필터를 통과한 조합만 적합도 점수로 줄세움. 화면의 `몬테카를로 가중 샘플링 #N` 카드.\n\n최종 출력은 두 알고리즘이 섞인 \"종합 점수 TOP 10\" — 각 조합마다 적합도 0.808 / 0.916 같은 점수와 통과 필터가 함께 표출됩니다.",
      },
      {
        title: "통계 필터 — 5종 파일럿 룰",
        body:
          "프로 로또 분석가들이 쓰는 5가지 휴리스틱을 코드화했습니다.\n\n**합계 100~170**: 6개 번호의 합이 이 범위 안. 역사적으로 당첨 번호 합 분포의 약 70% 구간.\n\n**홀짝 2:4 / 3:3 / 4:2**: 6개 중 홀수·짝수 비율이 한쪽으로 치우치지 않은 조합.\n\n**고저 2:4 / 3:3 / 4:2**: 1~22(저)와 23~45(고)의 균형. 너무 한쪽 구간에 몰린 조합 제외.\n\n**끝수 4종+**: 1의 자리(0~9)가 4종 이상 다양. 끝수 1·11·21·31 처럼 같은 끝자리만 모인 조합 배제.\n\n**연속 2쌍 이하**: 6·11·17·27 같이 연속 번호 쌍이 너무 많은 조합 제외.\n\n5가지 필터를 모두 통과한 조합만 점수 산정 대상. 사용자 화면 상단에 \"적용된 통계 필터\" 칩으로 노출됩니다.",
      },
      {
        title: "예측 결과 표출 — 카드별 fitness bar",
        body:
          "각 예측 조합 카드에는 6개 컬러볼(번호별 색상 — 1~10 노랑 / 11~20 파랑 / 21~30 빨강 / 31~40 회색 / 41~45 초록) + 6개 메트릭(합계 / 홀:짝 / 저:고 / 끝수 / 연속 / 적합도) + 적합도 진행 바가 표시됩니다.\n\n적합도 바는 0.0 ~ 1.0 점수를 그라디언트(파랑→주황) 로 시각화 — 0.808 정도면 바의 80% 구간까지 채워집니다.\n\n상단 \"종합 점수 TOP 10\"에서 번호별 글로벌 가중치(예 34: 0.2934)도 함께 보여줘서 — \"이 번호가 왜 자주 추천되는가\" 의 출처를 직접 확인 가능합니다.",
      },
      {
        title: "통계 분석 화면 — 빈도 + 핫넘버",
        body:
          "별도 \"통계 분석\" 패널에서는 두 가지 핵심 지표를 시각화합니다.\n\n**전체 빈도 TOP 10** — 1~1219회 전체 누적 당첨 횟수 막대 차트. 34(181회) / 27(180회) / 12(177회) / 13(175회) / 45(174회)... 가장 많이 나온 번호 순.\n\n**핫넘버 (최근 100회차)** — 최근 100회 윈도우 내에서만 카운트 — 27(22회), 38(19회) 처럼 \"지금 트렌드\" 를 보여줍니다.\n\n전체 빈도와 핫넘버를 비교하면 \"역사적으로 자주 나오지만 최근엔 식은 번호\" vs \"최근 트렌드의 번호\" 가 명확히 갈립니다. 예측 알고리즘은 두 신호를 모두 가중치로 사용합니다.",
      },
      {
        title: "CLI + Cron — uv 기반 자동화",
        body:
          "프로젝트는 `uv` 로 의존성을 관리합니다. `requirements.txt` 폐기, `pyproject.toml` + `uv.lock` 일관 동기화. 가상환경 활성화 없이 `uv run lottojackpot ...` 으로 즉시 실행.\n\n명령군 5종:\n- `init-db` — 테이블 생성\n- `crawl-draws --start 1 --end 1219` — 회차별 적재\n- `crawl-stats` — 번호별 통계 적재\n- `ingest-incremental` — 증분 적재 (이미 있는 회차 skip)\n- `predict --window 100` — 예측 베이스라인 출력\n- `schedule --cron \"0 8 * * 0\"` — APScheduler 로 매주 일요일 오전 8시 자동 적재\n\nCLI 단독 실행도 가능하지만, 실제 운영은 Electron 셸이 이 명령들을 자식 프로세스로 호출하는 형태로 동작합니다.",
      },
      {
        title: "Electron + React — Windows 데스크톱 앱 셸",
        body:
          "Electron 메인 프로세스가 Windows 네이티브 창을 열고, 그 안에서 React + Vite + TypeScript 로 빌드된 UI 가 렌더러 프로세스로 동작합니다.\n\n앱이 시작되면 메인 프로세스가 Python 백엔드를 자식 프로세스(`child_process.spawn`)로 동시 기동 — `lottojackpot` 패키지가 로컬 HTTP 서버 형태로 떠서 데이터 적재·통계·예측 명령을 받습니다.\n\n렌더러의 React UI 는 헬스 엔드포인트를 폴링해 \"● 서버 연결됨\" 인디케이터를 우상단에 표시. 사용자가 \"10개 조합 생성\" 버튼을 누르면 Electron IPC 또는 fetch 로 요청이 Python 으로 흘러가고, 결과 JSON 이 React 상태로 반영됩니다.\n\n앱 종료 시에는 메인 프로세스의 `before-quit` 훅에서 자식 Python 프로세스도 깔끔히 정리 — 좀비 프로세스 방지. \"한 개의 .exe 로 모든 게 돌아간다\" 가 사용자 경험의 핵심입니다.",
      },
      {
        title: "데스크톱 UI 패널 — 서버 연결 + 3 액션",
        body:
          "메인 윈도우는 좌·우 분할 레이아웃입니다.\n\n**좌측 패널 (데이터 현황)**: 총 회차(1,219회) / 시작(1회 2002-12-07) / 최신(1219회 2026-04-11) + 번호별 종합 점수 TOP 5 미니 위젯. 새로고침 버튼으로 즉시 갱신.\n\n**우측 액션 영역**:\n- **↓ 크롤링 (미수집 회차 수집)** — `ingest-incremental` 호출. 새 회차가 발표되면 클릭 한 번으로 적재.\n- **≡ 통계 분석** — 빈도 TOP 10, 핫넘버 패널 오픈.\n- **✦ 10개 조합 생성** — 유전 알고리즘 + 몬테카를로 파이프라인 트리거. 진행 중에는 \"예측 번호 생성 중... (유전 알고리즘 + 몬테카를로)\" 로딩 스피너 표시.\n\n타이틀바 우측에는 항상 \"● 서버 연결됨\" 헬스 인디케이터 — 한 눈에 백엔드 가동 여부를 확인할 수 있습니다.",
      },
    ],
    techGroups: [
      {
        label: "Frontend · Desktop Shell",
        items: [
          "Electron (Windows 네이티브 셸)",
          "React 18",
          "Vite + TypeScript",
          "Electron IPC (renderer ↔ main ↔ python)",
          "child_process.spawn (Python 자식 프로세스)",
          "before-quit 훅 (자식 정리)",
        ],
      },
      {
        label: "Backend · Python",
        items: [
          "Python 3.10+",
          "uv (의존성 관리)",
          "httpx 0.27 (크롤링)",
          "BeautifulSoup4 4.12 (HTML 파싱)",
          "SQLAlchemy 2.0 (ORM)",
          "psycopg3 (PostgreSQL 드라이버)",
          "APScheduler 3.10 (Cron)",
          "python-dotenv",
        ],
      },
      {
        label: "Database",
        items: [
          "PostgreSQL (또는 SQLite fallback)",
          "draw_results 테이블 (회차별 당첨번호)",
          "number_stats 테이블 (번호별 통계)",
          "Idempotent Upsert (PK 기반)",
        ],
      },
      {
        label: "Prediction Engine",
        items: [
          "빈도 베이스라인 (윈도우 N회차)",
          "유전 알고리즘 (교차·돌연변이·세대 진화)",
          "몬테카를로 가중 샘플링",
          "통계 필터 5종 (합계 / 홀짝 / 고저 / 끝수 / 연속)",
          "적합도 점수 0~1 산정",
          "argparse CLI (init-db / crawl / predict / schedule)",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/lottojackpot/02-prediction.png`,
        caption:
          "예측 번호 10개 조합 — 적용 통계 필터 칩 + 종합 점수 TOP 10 + 카드별 (합계·홀짝·고저·끝수·연속·적합도) 메트릭 + 그라디언트 적합도 바",
        aspect: "wide",
      },
      {
        src: `${ASSET}/lottojackpot/03-stats.png`,
        caption:
          "통계 분석 — 1~1219회 누적 빈도 TOP 10 (34: 181회 / 27: 180회 / 12: 177회 ...) + 최근 100회차 핫넘버 (27: 22회, 38: 19회)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/lottojackpot/04-loading.png`,
        caption:
          "예측 번호 생성 중 — 유전 알고리즘 + 몬테카를로 파이프라인 진행 스피너",
        aspect: "wide",
      },
    ],
    stats: [
      { label: "Platform", value: "Electron · Windows" },
      { label: "Total draws", value: "1,219회" },
      { label: "Filters", value: "5종" },
      { label: "Predictions", value: "10 조합" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  ParkGolf Gofields — 5-컴포넌트 파크골프 통합 운영 플랫폼
  // ─────────────────────────────────────────────────
  "parkgolf-iotplus": {
    slug: "parkgolf-iotplus",
    heroImage: `${ASSET}/parkgolf-iotplus/01-cover.jpg`,
    intro:
      "전국 228개 파크골프장의 회원·예약·결제·체크인·대회·점수까지 한 호흡으로 운영하는 **5-컴포넌트 통합 플랫폼** — \"GO Fields\" (gofields.co.kr) 브랜드로 출시되었습니다. " +
      "Spring Boot 백엔드 1개 위에 4개의 프론트엔드(매니저 웹 · 회원 모바일 앱 · 입장 게이트 QR 체커 · 현장 접수 키오스크)가 붙어 있고, 모두 같은 PostgreSQL 도메인 스키마(예약·결제·체크인·대회·점수)를 공유합니다. " +
      "단순 \"앱 + 백엔드\" 가 아니라 — Capacitor 8 로 iOS/Android 빌드, Gemini Live API 로 음성 예약, ZXing 으로 QR 발급 + jsqr 로 QR 디코딩, OpenPDF 로 대회 조편성표·명찰 출력, PortOne 으로 모바일 결제까지 — 실제 골프장 현장에서 도는 **운영 시스템**입니다.",
    sections: [
      {
        title: "5-Component 아키텍처",
        body:
          "한 백엔드, 네 프론트.\n\n**Backend (Spring Boot 3.2 / Java 17)** — `tb_reservation / tb_payment / tb_kiosk / tb_checkin / tb_facility / tb_fee_rule / tb_reservation_player / tb_print_log / tb_checkin_token` 등 도메인 테이블 전체와 JWT 인증·OAuth·Gemini Live·PDF·QR 발급을 한 곳에서 책임집니다.\n\n**Front (React 19 매니저 웹)** — 시설 관리자가 코스/예약/회원/대회/공지사항을 운영. Tiptap 리치 에디터로 공지 작성, react-day-picker 로 캘린더, PortOne 결제 콘솔.\n\n**Mobile (Capacitor 8 회원 앱)** — 회원 가입/소셜 로그인부터 예약/결제/점수 기록/대회 신청까지. iOS·Android 단일 코드베이스.\n\n**QRChecker (Capacitor 입장 게이트)** — Camera + jsqr 로 QR 스캔, 체크인 토큰 검증.\n\n**Kiosk (React 웹 현장 데스크)** — QR 스캔/수동 검색 → 예약 조회 → 체크인 → 결제(카드·현금·면제) → 이용권/영수증 출력.",
      },
      {
        title: "인증 & 소셜 로그인 — 3-tier OAuth + 90d 로테이션",
        body:
          "**비밀번호 해싱**: Argon2 (Bouncy Castle `bcprov-jdk18on` 1.77) — bcrypt 대신 메모리-하드 알고리즘으로 GPU 크래킹에 강함.\n\n**JWT 토큰**: jjwt 0.12.3. Access 단명 + Refresh **90일 TTL + 매 갱신마다 새 token 발급 (rotation)**. 1.1.1 패치에서 클라이언트가 새 refresh 를 저장 안 해서 강제 로그아웃되던 버그 잡음. 시즌 비활성 사용자도 부담 없이 재방문.\n\n**소셜 로그인**: 모바일에서 카카오(`@team-lepisode/capacitor-kakao-login`) / 네이버(`@team-lepisode/capacitor-naver-login`) / Google(`@capgo/capacitor-social-login`) 3종. 백엔드는 Spring WebFlux WebClient 로 카카오 OAuth API 호출.\n\n**PIPA 준수**: Apple App Review Guideline 5.1.1(i) 대응 — 친구 찾기(연락처 동기화)는 첫 로그인 자동 업로드 제거, 사용자가 \"연락처 동기화\" 버튼 누른 시점에만 인앱 동의 모달(수집 항목·목적·보관 기간·제3자 제공·개인정보 처리방침 링크 명시).",
      },
      {
        title: "모바일 앱 (Capacitor 8) — iOS·Android 단일 코드베이스",
        body:
          "React 19 + Vite 7 + TypeScript 5.9 + Tailwind v4 위에 Capacitor 8 을 얹어 iOS·Android 동시 빌드. 단일 코드로 양 OS 를 커버하면서 네이티브 권한(카메라·마이크·연락처·햅틱)까지 활용합니다.\n\n주요 네이티브 플러그인:\n- `@capacitor-community/speech-recognition` + `@capacitor-community/text-to-speech` — 음성 예약\n- `@capacitor-community/contacts` — 친구 찾기 (PIPA 동의 모달 통과 후)\n- `@capacitor/haptics` — 진동 피드백\n- `@capacitor/preferences` — 토큰/설정 영구 저장\n- `@capacitor/browser` — 외부 결제 URL 열기\n- `@capacitor/status-bar` — 상태바 색상 동기화\n- `@portone/browser-sdk` — PortOne 결제 SDK\n- `qrcode.react` — 본인 QR 발급 (입장 게이트용)\n\n빌드 산출물: Android `versionCode 12` / `versionName 1.1.1` (2026-04-29 기준), iOS App Store 등록.",
      },
      {
        title: "예약 시스템 — TIME_SLOT / AM_PM 듀얼 모드 + 상태 머신",
        body:
          "시설별로 예약 모드가 다릅니다.\n\n**TIME_SLOT 모드** — 시간대 필터 + 시간별 그룹 그리드 (예: 07:00 / 07:30 / 08:00 ...). 정밀한 분 단위 예약이 필요한 시설용.\n\n**AM_PM 모드** — 오전/오후 카드 단위로 더 단순. 캐주얼 시설용.\n\n홈 화면이 시설의 `reservation_mode` 를 보고 두 모드 중 하나로 자동 분기 렌더링. `VenuePage` 는 정보 탭만 두고, 실제 예약 진입은 홈에서 시작 — 1.0.6 에서 정리된 패턴.\n\n**예약 상태 머신**: `BOOKED → CHECKED_IN → PAID → COMPLETED` 정상 흐름, `CANCELLED → NO_SHOW` 이탈 흐름. 상태가 바뀔 때마다 `tb_reservation_status_log` 에 누적되어 추적 가능.\n\n실시간 신청 현황(확정 + 대기)은 캘린더에 그대로 노출되고, 마감/조편성 완료 대회도 함께 보입니다.",
      },
      {
        title: "대회 시스템 — 6-State Lifecycle + OpenPDF 조편성표",
        body:
          "**대회 라이프사이클** (6 상태):\n- 🩶 DRAFT (준비중)\n- 🟢 OPEN (접수중)\n- 🟡 CLOSED (접수마감)\n- 🔵 ASSIGNED (조편성 완료)\n- 🟣 CONFIRMED (참가자 확정)\n- ⚫ COMPLETED (대회 종료)\n\n각 상태마다 신청 버튼 안내 문구가 세분화 — \"접수 준비중\" / \"접수 마감\" / \"조편성 완료 - 신청 마감\" / \"참가자 확정 - 신청 마감\" / \"종료된 대회\".\n\n**대회 신청** (`/tournament/apply`) — 관내자 전용/전체 신청 자동 검증, 정원 초과 차단, 캘린더 진입.\n**내 대회** (`/tournament/my`) — 신청 목록 + 참가 취소.\n**내 조 정보** (`/tournament/:id/group`) — 조 번호, 출발 코스/홀, 집합시간, 멤버 목록(조장 표시), 조장 팀명 신청 권한.\n\n**OpenPDF (com.github.librepdf:openpdf 1.3.34)** — 대회 조편성표 / 참가자 명찰 / 출입증 PDF 생성. ZXing 으로 발급한 QR 코드도 PDF 안에 임베드.",
      },
      {
        title: "점수 기록 — 홀별 스코어 + Par 색상 코딩",
        body:
          "체크인 / 이용 완료된 예약에 대해 홀별 점수를 입력합니다 (`/activity/scores/:reservId`).\n\n각 홀의 Par(기준 타수) 대비 색상 코딩:\n- 🔵 **버디** (Par 미만) — 파랑\n- 🟢 **파** (Par 일치) — 초록\n- 🔴 **보기+** (Par 초과) — 빨강\n\n총 Par 대비 내 스코어 + 차이(±) 자동 계산. 기존 점수 수정 가능.\n\n**활동기록 페이지** — \"총 이용횟수\" 카드 클릭 시 상세 모달 (이용일자/구장명/코스명/점수관리/동반인). 점수 입력 가능 예약 리스트를 별도 섹션으로 노출.\n\n점수 입력 페이지 진입 시 하단 탭바 자동 숨김 — 저장 버튼과 탭바 겹침 방지 (1.0.8 패치).",
      },
      {
        title: "결제 — PortOne (모바일) + 현장 결제 (Kiosk)",
        body:
          "**모바일 결제 (1.1.1)** — PortOne 브라우저 SDK 도입. 예약 → 요금 안내(`/fee-info`) → 결제(`/payment`) → 결제 결과(`/payment/result`) 전체 플로우. 마이페이지에서 사업자 정보(`/business-info`) / 환불 정책(`/refund-policy`) / 요금 안내 진입 가능.\n\n**현장 결제 (Kiosk)** — 카드/현금/면제 3종. `tb_onsite_payment` 에 idempotency_key 로 중복 결제 방지. 카드 단말기 응답(`approval_no` / `terminal_id` / `transaction_id` / `card_company` / 마스킹 카드번호 / `installment` / `raw_response`) 모두 저장.\n\n**결제 상태 머신**: `READY → REQUESTED → APPROVED / FAILED → CANCELED / REFUNDED`.\n\n**보안**: 카드 정보는 서버 저장 안 함 (마스킹된 카드번호만), 모든 거래 로그 적재, idempotency_key UNIQUE 인덱스.",
      },
      {
        title: "QRChecker — 입장 게이트 + Kiosk — 현장 접수 데스크",
        body:
          "**QRChecker (회원 입장 게이트)** — Capacitor 8 + `@capacitor/camera` + `jsqr` 1.4. 회원이 모바일 앱에서 발급받은 QR(`qrcode.react`)을 게이트 단말이 스캔. 백엔드 `tb_checkin_token` (JWT 서명 + 만료시간)을 검증해 1회용 입장 토큰으로 사용.\n\n**Kiosk (현장 접수 데스크)** — React 19 웹앱. 좌측 상단 QR 스캔 입력(자동 포커스) + 좌측 하단 수동 예약번호/전화번호 검색. 우측 상단 장비 상태(스캐너/단말기/프린터) + 우측 하단 당일 현황(총 예약 / 체크인 / 결제 완료). 하단 최근 접수 내역.\n\n**키오스크 전용 API** (`/api/v1/kiosk/*`): scan / reservation / checkin / payment-request / payment-confirm / payment-cancel / print-ticket / print-receipt / today-summary / today-checkins / devices-status.\n\n키오스크 API는 BizUser 인증 필수 (기존 관리자 인증 활용) — 일반 회원 토큰으로는 접근 불가.",
      },
      {
        title: "음성 예약 — Gemini Live API + WebSocket",
        body:
          "Spring Boot 백엔드가 `Java-WebSocket` 1.5.7 로 **Google Gemini Live API** 에 직결됩니다. 모바일 앱은 `@capacitor-community/speech-recognition` 으로 사용자 음성을 캡쳐 → 백엔드로 스트림 → Gemini 가 양방향 대화로 예약 의도 파악(시설/날짜/시간/인원) → `@capacitor-community/text-to-speech` 로 답변 음성 합성.\n\n단순 \"버튼 클릭 예약\" 만으로 부족한 시니어 사용자(파크골프 주 사용층)를 위한 접근성 기능. 1.0.5 부터 출시.\n\nSpring WebSocket 으로 모바일 ↔ 서버 양방향 스트림, Java-WebSocket 으로 서버 ↔ Gemini 양방향 스트림 — 2-hop 실시간 파이프라인.",
      },
      {
        title: "공지사항 + 슬라이드 배너 — 카테고리별 색상 시스템",
        body:
          "매니저가 시설 공지를 등록하면 사용자 앱 상단에 슬라이드 배너로 자동 노출. **공지 유형별 뱃지 색상**으로 한눈에 구분:\n- 🟣 **대회 공지** — 보라색\n- 🔴 **긴급 공지** — 빨강\n- 🔵 **이벤트 공지** — 파랑\n- 🟢 **일반 공지** — 브랜드 그린\n\n매니저가 등록 시 지정한 텍스트 색상이 슬라이드 배너 제목에 그대로 적용되어 가독성 향상. **대회 등록 → 공지 작성** 자동 연계 흐름으로 대회 정보가 사용자에게 빠르게 전달됩니다.\n\n매니저 웹의 **Tiptap 리치 텍스트 에디터** (`@tiptap/react` + `text-align` + `text-style`) 로 공지 본문 작성, DOMPurify 로 sanitize 한 뒤 모바일 앱이 렌더링.",
      },
    ],
    techGroups: [
      {
        label: "Backend · Spring Boot",
        items: [
          "Spring Boot 3.2.1 / Java 17",
          "Spring Data JPA · Hibernate",
          "PostgreSQL (10+ 도메인 테이블)",
          "Spring Security + JWT (jjwt 0.12.3, 90d 로테이션)",
          "Argon2 (Bouncy Castle 1.77)",
          "Spring WebFlux WebClient (Kakao OAuth)",
          "Spring WebSocket + Java-WebSocket 1.5.7 (Gemini Live)",
          "OpenPDF 1.3.34 (조편성표·명찰)",
          "ZXing 3.5.3 (QR 코드 생성)",
          "ModelMapper 3.2 · Springdoc OpenAPI 2.3",
        ],
      },
      {
        label: "Mobile · Capacitor 8",
        items: [
          "React 19 + Vite 7 + TypeScript 5.9",
          "Tailwind v4 (@tailwindcss/vite)",
          "Capacitor 8 (iOS + Android)",
          "Speech Recognition + TTS (음성 예약)",
          "Contacts (친구 찾기, PIPA 동의)",
          "Haptics · Preferences · Status Bar · Browser",
          "Kakao + Naver + Google 소셜 로그인",
          "PortOne 결제 SDK",
          "qrcode.react · motion · react-day-picker",
        ],
      },
      {
        label: "Manager Web · Front",
        items: [
          "React 19 + Vite 7 + TypeScript 5.9",
          "Tailwind v4 · Zustand 5 · React Router 7",
          "Tiptap 3.22 (공지사항 리치 텍스트 + text-align/style)",
          "Radix UI (@radix-ui/react-select)",
          "react-day-picker · date-fns 4",
          "PortOne 결제 콘솔",
          "DOMPurify (sanitize)",
        ],
      },
      {
        label: "QRChecker · Kiosk",
        items: [
          "QRChecker: Capacitor 8 + @capacitor/camera + jsqr 1.4",
          "Kiosk: React 19 웹앱 (Tailwind v4 + Zustand)",
          "키오스크 API 12종 (/api/v1/kiosk/*)",
          "tb_checkin_token JWT (서명 + 만료)",
          "tb_onsite_payment idempotency_key UNIQUE",
          "tb_print_log (이용권/영수증 출력 로그)",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/parkgolf-iotplus/02-brand.jpg`,
        caption:
          "GO Fields 브랜드 페이지 — \"더 쉬운 파크 골프의 시작\". 통합 파크골프 예약 플랫폼으로 출시",
        aspect: "phone",
      },
      {
        src: `${ASSET}/parkgolf-iotplus/02-login.jpg`,
        caption:
          "로그인 화면 — 통합 파크골프 예약 플랫폼 \"노을파크골프\" + 카카오/네이버/Google 3종 소셜 로그인",
        aspect: "phone",
      },
      {
        src: `${ASSET}/parkgolf-iotplus/04-venues.jpg`,
        caption:
          "전국 파크골프장 리스트 — 거리순/인기순/가격순 정렬, 228개 구장. 실시간 예약가능 배지 + 관내할인 표시",
        aspect: "phone",
      },
      {
        src: `${ASSET}/parkgolf-iotplus/05-venue-detail.jpg`,
        caption:
          "구장 상세 — 영업시간 07:00~18:00 / 코스 수 3 / 예약 상태 실시간. A·B·C 코스별 9홀 운영 정보 + 정보/예약 현황 탭",
        aspect: "phone",
      },
    ],
    stats: [
      { label: "Components", value: "5" },
      { label: "Brand", value: "GO Fields" },
      { label: "Venues", value: "228+" },
      { label: "Platforms", value: "iOS · Android · Web" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  Solhavi V2 — IoT 통합 모니터링 플랫폼 (HDMS + solhavi 통합)
  // ─────────────────────────────────────────────────
  "solhavi-v2": {
    slug: "solhavi-v2",
    heroImage: `${ASSET}/solhavi-v2/01-cover.png`,
    intro:
      "기존 두 시스템 — **HDMS(하베스팅 데이터 관리)** 와 **solhavi V1** — 을 한 도메인으로 흡수한 **V2 통합 IoT 모니터링 플랫폼**입니다. " +
      "TimescaleDB hypertable + Eclipse Mosquitto MQTT 브로커 위에 Spring Boot 백엔드를 얹고, 그 위에 4종의 클라이언트(사용자 PWA / 관리자 콘솔 / 네이티브 모바일 앱 / 데이터 시뮬레이터)가 붙어있습니다. 백엔드 description 그대로 \"하베스팅 통합 백엔드 (HDMS + solhavi 통합)\". " +
      "단순 데이터 조회가 아니라 — **3D 시각화 (Three.js)** 로 시설을 입체 렌더링하고, **SSE 장기 연결 (24h)** 로 실시간 센서 데이터를 흘려보내고, **MQTT pub/sub** 으로 디바이스 ↔ 서버 양방향 통신하고, **Web Push** 로 임계값 초과 알림을 보내고, **Cloudflare Tunnel** 로 사내망 노출 없이 HTTPS 접속까지 — 운영 환경 전체가 자동화된 PowerShell 설치기(`Solhavi-Installer.exe`) 한 번으로 배포됩니다.",
    sections: [
      {
        title: "5-Component 아키텍처 — 1 백엔드 + 4 클라이언트",
        body:
          "**solhavi_V2_back** (Spring Boot 3.2 / Java 17) — \"harvesting-backend\" 아티팩트. JPA + JWT + WebSocket + MQTT Integration + Web Push + Caffeine 캐시 + Springdoc OpenAPI. PostgreSQL+TimescaleDB 로 시계열 데이터, Mosquitto 로 MQTT 메시지 처리.\n\n**solhavi_V2_front** (Next.js 15 + React 19) — \"harvesting-front\". 사용자 PWA(`next-pwa`) + Capacitor 6 로 Android APK 빌드까지. **Three.js / React Three Fiber / drei** 로 3D 시각화, **Recharts** 로 차트, **Radix UI 12종** 으로 UI 컴포넌트, `framer-motion` 으로 애니메이션. 포트 4000.\n\n**solhavi_V2_admin** (Next.js 15 + React 19) — \"harvesting-admin\". **HeroUI 3.0** 기반 관리자 콘솔. 포트 4100.\n\n**solhavi_V2_app** (React Native 0.81 + Expo 54) — \"harvesting-app\". **Gluestack UI Themed** + React Navigation 7 + EAS Build 로 iOS/Android 네이티브 앱. SSE + Expo Notifications.\n\n**solhavi_V2_prod** — PowerShell 기반 Windows 설치기 + Docker Compose + Caddy + Cloudflare Tunnel 운영 묶음.",
      },
      {
        title: "TimescaleDB + MQTT — IoT 시계열 데이터 파이프라인",
        body:
          "**TimescaleDB pg17** — PostgreSQL 17 기반의 시계열 확장. 일반 테이블이 아닌 **hypertable** 로 자동 파티셔닝되어 수십억 행의 센서 데이터도 빠른 쿼리. `shared_preload_libraries=timescaledb,pg_stat_statements` 로 구동, `pg_stat_statements.max=10000` 으로 쿼리 진단까지.\n\n**Eclipse Mosquitto 2** — MQTT 1.x/3.1.1 브로커. 포트 1883. 백엔드의 `spring-integration-mqtt` 가 구독자로 붙어 `HS/...` 토픽 패턴(Harvesting Solhavi) 으로 디바이스 데이터를 실시간 수신.\n\n**MQTT Data Generator** — `mqtt_data_generator/` 별도 Flask 앱이 시연/테스트용으로 가짜 센서 데이터를 발행. 운영 환경에 함께 배포되어 영업·시연 시 즉시 동작 시뮬레이션 가능.\n\n**센서 임포트** — Caddy 가 `/api/sensor-import/*` 에 `read_timeout 600s + 1GB 업로드 허용` 으로 라우팅. 엑셀(xlsx)로 대량 센서를 일괄 등록할 수 있게 백엔드 타임아웃을 따로 풀어둠.",
      },
      {
        title: "3D 시각화 — Three.js / React Three Fiber",
        body:
          "Front 웹에 `@react-three/fiber` 9.5 + `@react-three/drei` 10.7 + `three` 0.183 을 도입해 **시설 입체 렌더링** 화면을 만들었습니다 (`panel-3d`).\n\n2D 차트로는 표현 불가능한 — \"이 빌딩의 어느 층 어느 구역에 어떤 센서가 어떤 값을 내고 있는가\" — 를 한눈에 보여주는 실내 위치 시각화. drei 의 `OrbitControls / Environment / Html / Text` 컴포넌트로 카메라 조작·라벨링·환경광까지 제어. 센서 노드는 값에 따라 색이 변하는 인터랙티브 GLB 메시.\n\n별도 `panel-visualization` 화면은 Recharts 2.15 기반 — 동일 데이터를 시계열 라인/바 차트로 보여주는 보조 뷰. 3D 와 2D 가 서로 보완하는 듀얼 시각화 구조.",
      },
      {
        title: "실시간 모니터링 — SSE 24h + WebSocket + MQTT 3-Tier",
        body:
          "디바이스 → 서버 → 클라이언트 까지 **3-Tier 실시간 스트림** 구조.\n\n**Tier 1 (디바이스 → 서버)**: MQTT (`tcp://mosquitto:1883`). 센서가 `HS/<facility>/<device>/<metric>` 토픽으로 발행 → Spring Integration MQTT 가 구독해 DB 저장.\n\n**Tier 2 (서버 ↔ 클라이언트, 양방향)**: WebSocket (`spring-boot-starter-websocket`). 명령 전송 / 상태 동기화처럼 양방향이 필요한 경우.\n\n**Tier 3 (서버 → 클라이언트, 단방향 장기)**: **SSE (Server-Sent Events)**. `/sse/*` 및 `/api/sse/*` 경로를 Caddy 가 `flush_interval -1 + read_timeout 86400s (24h)` 로 라우팅 — 24시간 연결 유지 + 즉시 flush. 모니터링 대시보드가 새로고침 없이 센서 값을 실시간 업데이트.\n\n네이티브 앱은 `react-native-sse` 1.2 로 동일한 SSE 스트림을 구독.",
      },
      {
        title: "알림 시스템 — Web Push (VAPID) + 임계값 엔진",
        body:
          "`nl.martijndwars:web-push` 5.1 + Bouncy Castle 1.78 로 **VAPID 기반 Web Push 알림**. 브라우저 service worker 가 백그라운드에서 푸시를 받아 데스크탑/모바일 알림으로 표시.\n\n**임계값 엔진** (`alerts-settings` 화면) — 사용자가 센서별 임계값(상한·하한 / hysteresis / 지속시간)을 설정 → 백엔드가 MQTT 인입 데이터를 실시간 체크 → 위반 시 알림 생성 + 푸시 발송.\n\n**알림 화면** (`alerts`) — 발생한 알림을 시간순 누적 + 필터 + 음소거 + 상태 변화 추적. 알림은 `tb_alert / tb_alert_event` 같은 도메인 테이블에 누적되어 감사 추적 가능.\n\n네이티브 앱은 `expo-notifications` 로 동일한 알림을 OS 푸시 채널을 통해 받음 — Web Push 와 OS Push 양쪽 모두 지원.",
      },
      {
        title: "권한 + 감사 — 4-Resource RBAC 콘솔",
        body:
          "관리 권한이 4개 화면으로 분리되어 있습니다.\n\n**Users** (`users`) — 사용자 CRUD. 이름·이메일·전화·소속·역할(role) 관리.\n\n**Permissions** (`permissions`) — 역할별 권한 매트릭스. 어떤 역할이 어떤 리소스(센서·시설·알림·설정)에 어떤 액션(R/W/A)을 가지는지.\n\n**Menu Management** (`menu-management`) — 동적 메뉴 트리. 사이드바·헤더 메뉴 항목 자체를 DB 에서 관리해서 역할별로 다른 메뉴를 노출.\n\n**Login History** (`login-history`) — 모든 로그인 시도(성공·실패·IP·User-Agent) 누적. 보안 감사·이상 접근 추적용.\n\nJWT 는 `JWT_EXPIRATION=2592000000` (30일). Spring Security `@PreAuthorize` + 메서드 단위 권한 체크.",
      },
      {
        title: "시설·장비 + 데이터 분석",
        body:
          "**Facilities** (`facilities`) — 시설/장비 트리. 빌딩 → 층 → 구역 → 장비 → 센서의 5단 계층 구조. CRUD + 엑셀 일괄 임포트(센서 임포트 1GB).\n\n**Analysis** (`analysis`) — 다축 시계열 분석. 기간 선택(date-fns + react-day-picker) → 센서 다중 선택 → 통계(평균·표준편차·분위수) → 차트 비교 → **xlsx 라이브러리로 Excel 내보내기**.\n\n**Dashboard Fullpage** (`dashboard-fullpage`) — 메인 대시보드. 시설별 핵심 KPI + 최근 알림 + 실시간 센서 위젯을 한 화면에 모음.\n\n**Monitoring** (`monitoring`) — 디바이스별 상태 보드. 온라인/오프라인 / 마지막 통신 시각 / 현재 값을 큰 그리드로 표시.",
      },
      {
        title: "모바일 듀얼 채널 — PWA Capacitor + React Native Expo",
        body:
          "Solhavi V2 는 모바일을 **두 가지 방식으로 동시 지원** 합니다.\n\n**Channel A — Next.js PWA + Capacitor 6** (`solhavi_V2_front`) — 같은 Next.js 코드베이스를 `next-pwa` 로 PWA 화 + Capacitor 6 로 Android 네이티브 wrap. `build-apk.ps1` PowerShell 스크립트가 `npm run build` → Capacitor → Gradle 까지 자동화해 `Solhavi-<host>-<type>.apk` 산출물 생성. 별도 모바일 코드 없이 웹 코드 그대로 폰에서 동작.\n\n**Channel B — React Native + Expo 54** (`solhavi_V2_app`) — 진짜 네이티브 UX 가 필요한 사용자용. Gluestack UI Themed + React Navigation 7 + react-native-sse + expo-secure-store + expo-notifications. EAS Build 로 iOS/Android 빌드 (`build:android` / `build:ios`), EAS Submit 으로 스토어 자동 제출.\n\n같은 백엔드를 공유하므로 두 채널 모두 동일한 데이터·알림·세션을 받습니다. 사용자는 상황에 맞춰 선택 — 시연·임시 배포는 PWA APK, 정식 출시는 RN 앱.",
      },
      {
        title: "Windows 설치기 + Cloudflare Tunnel — 무중단 자가 호스팅",
        body:
          "운영 환경 전체가 **한 개의 .exe 로 배포** 됩니다 (`Solhavi-Installer.exe`).\n\n설치 흐름 (사용법.txt 그대로):\n1. PC 에 git + docker + docker compose 만 있으면 됨\n2. `Solhavi-Installer.exe` 실행\n3. Base install folder + Cloudflare Tunnel Token 입력\n4. \"Install / Update\" 클릭\n5. 설치기가 자동으로: `solhavi_V2_prod / back / front` 세 레포 git clone or pull → `.env` 저장 → `docker compose up -d --build`\n\n**Cloudflare Tunnel** — `cloudflared tunnel --token ${CF_TUNNEL_TOKEN}` 가 컨테이너로 떠서 인바운드 포트 노출 없이 HTTPS 외부 접속을 제공. 사내망 방화벽을 건드리지 않고 SaaS 처럼 사용 가능.\n\n**Caddy alpine** — Cloudflare Tunnel origin(:80) 의 리버스 프록시. `/api → backend`, `/sse → backend (24h)`, `/sensor-import → mqtt_generator_web (600s)`, `/swagger-ui → backend`, 나머지는 `frontend` 로 라우팅. 보안 헤더(X-Frame-Options / X-Content-Type-Options / Referrer-Policy)까지 한 곳에서.\n\n`SPRING_PROFILES_ACTIVE=prod` + `CORS_ORIGINS=https://*.solhavi.com` 으로 도메인 격리. 모든 서비스는 `unless-stopped` 정책으로 자동 재기동.",
      },
      {
        title: "도메인 운영 — solhavi.com + 30일 JWT + Integration API",
        body:
          "공개 도메인: **solhavi.com** (Cloudflare 관리). `https://*.solhavi.com / solhavi.com / www.solhavi.com` 이 CORS 허용 도메인.\n\n**JWT_EXPIRATION = 2592000000ms = 30일**. 시설 관리자가 한 번 로그인하면 한 달 동안 재인증 없이 사용. (사용 빈도가 낮은 운영 시스템 특성)\n\n**Integration API Token** — `INTEGRATION_API_TOKEN` 환경변수로 외부 시스템 연계용 별도 토큰. 일반 JWT 와 다른 경로(`/api/integration/*`)로 인증 우회 가능. ERP·BMS 같은 타 시스템에서 Solhavi V2 로 데이터 푸시할 때 사용.\n\n**Swagger UI** — `/swagger-ui/*` 와 `/v3/api-docs*` 가 Caddy 로 노출되어 외부 개발자도 API 문서 즉시 확인 가능.\n\n**Time Zone = Asia/Seoul** 로 통일. 모든 컨테이너 `TZ=Asia/Seoul` 환경변수 + DB 도 한국 시간 기준 저장.",
      },
    ],
    techGroups: [
      {
        label: "Backend · IoT Layer",
        items: [
          "Spring Boot 3.2 / Java 17",
          "Spring Cloud 2023.0.0",
          "Spring Integration MQTT",
          "Spring WebSocket · SSE",
          "TimescaleDB pg17 (hypertable)",
          "Eclipse Mosquitto 2 (MQTT 브로커)",
          "JWT 0.12.3 (30일 만료)",
          "Web Push 5.1.1 + Bouncy Castle 1.78 (VAPID)",
          "Caffeine 캐시 · Springdoc OpenAPI 2.2",
          "ModelMapper 3.2",
        ],
      },
      {
        label: "User Web · Next.js + 3D",
        items: [
          "Next.js 15.5 + React 19 (PWA)",
          "Capacitor 6 (Android APK 빌드)",
          "Three.js 0.183 + @react-three/fiber 9.5 + drei 10.7 (3D 시각화)",
          "Recharts 2.15 (시계열 차트)",
          "Radix UI 12종 + framer-motion 12",
          "next-pwa + next-themes (다크/라이트)",
          "react-day-picker · date-fns 4 · xlsx 0.18",
          "Tailwind v4 + class-variance-authority",
        ],
      },
      {
        label: "Admin Web + Native App",
        items: [
          "Admin: Next.js 15 + React 19 + HeroUI 3.0",
          "App: React Native 0.81 + Expo 54",
          "Gluestack UI Themed + React Navigation 7",
          "react-native-sse 1.2 (실시간 스트림)",
          "expo-notifications + expo-secure-store",
          "EAS Build / EAS Submit (iOS · Android)",
          "Reanimated 4.1 + Gesture Handler · NativeWind",
        ],
      },
      {
        label: "Infra · Distribution",
        items: [
          "Docker Compose (6 services)",
          "Caddy alpine (리버스 프록시 + 보안 헤더)",
          "Cloudflare Tunnel (인바운드 포트 0)",
          "Solhavi-Installer.exe (PowerShell 설치기)",
          "build-apk.ps1 (Next.js → Capacitor → APK 자동화)",
          "MQTT Data Generator (Flask 시뮬레이터)",
          "Asia/Seoul TZ 통일 + unless-stopped 자동 재기동",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/solhavi-v2/dashboard-fullpage.png`,
        caption:
          "Dashboard Fullpage — 메인 대시보드. 시설별 핵심 KPI + 최근 알림 + 실시간 센서 위젯을 한 화면 통합 표출",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/monitoring.png`,
        caption:
          "Monitoring — 디바이스 실시간 상태 보드. 온라인/오프라인 + 마지막 통신 시각 + 현재 값을 SSE 24h 장기 연결로 갱신",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/panel-3d.png`,
        caption:
          "Panel 3D — Three.js + React Three Fiber 기반 시설 입체 시각화. 빌딩-층-구역-장비-센서 5단 계층을 GLB 메시 + drei 카메라 컨트롤로 렌더링",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/panel-visualization.png`,
        caption:
          "Panel Visualization — Recharts 2.15 기반 시계열 라인/바 차트. 3D 패널과 동일 데이터를 2D 보조 뷰로 표출",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/analysis.png`,
        caption:
          "Analysis — 다축 시계열 분석. 기간 선택(react-day-picker) + 센서 다중 선택 + 평균·표준편차·분위수 + xlsx Excel 내보내기",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/alerts.png`,
        caption:
          "Alerts — 알림 목록 시간순 누적. 필터 / 음소거 / 상태 변화 추적 + 감사용 tb_alert_event 영구 보관",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/alerts-settings.png`,
        caption:
          "Alerts Settings — 임계값 엔진. 센서별 상한·하한 + hysteresis + 지속시간 룰 설정 → MQTT 인입 시점 실시간 검사 → VAPID Web Push 발송",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/facilities.png`,
        caption:
          "Facilities — 시설/장비 트리. 빌딩 → 층 → 구역 → 장비 → 센서 5단 계층 CRUD + 엑셀 일괄 임포트(최대 1GB, 600s 타임아웃)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/users.png`,
        caption:
          "Users — 사용자 관리. 이름·이메일·전화·소속·역할(role) CRUD. JWT 30일 만료 + 메서드 단위 @PreAuthorize 권한 체크",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/permissions.png`,
        caption:
          "Permissions — RBAC 매트릭스. 역할별 리소스(센서·시설·알림·설정) × 액션(R/W/A) 권한 설정",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/menu-management.png`,
        caption:
          "Menu Management — 동적 메뉴 트리. 사이드바·헤더 메뉴 항목을 DB로 관리해 역할별로 다른 메뉴 노출 (코드 수정 없이 메뉴 재구성)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/login-history.png`,
        caption:
          "Login History — 보안 감사. 모든 로그인 시도(성공·실패·IP·User-Agent) 누적, 이상 접근 추적 가능",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/settings.png`,
        caption:
          "Settings — 시스템 전역 설정. MQTT/SSE 연결 파라미터, 알림 채널, 데이터 보존 정책, Cloudflare Tunnel 상태 표시",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solhavi-v2/mobile.png`,
        caption:
          "Mobile #1 — React Native + Expo 54 네이티브 앱 화면. Gluestack UI Themed + React Navigation 7. SSE로 실시간 센서값 수신",
        aspect: "phone",
      },
      {
        src: `${ASSET}/solhavi-v2/mobile2.png`,
        caption:
          "Mobile #2 — expo-notifications OS 푸시 채널과 Web Push 양쪽 모두 지원. expo-secure-store로 JWT 토큰 안전 저장",
        aspect: "phone",
      },
      {
        src: `${ASSET}/solhavi-v2/mobile3.png`,
        caption:
          "Mobile #3 — 같은 백엔드를 공유하므로 PWA APK(Capacitor 채널)와 RN 앱(Expo 채널) 모두 동일한 데이터·알림·세션 사용",
        aspect: "phone",
      },
    ],
    stats: [
      { label: "Components", value: "5" },
      { label: "Data layer", value: "TimescaleDB · MQTT" },
      { label: "Mobile channels", value: "2 (PWA + RN)" },
      { label: "Distribution", value: "Cloudflare Tunnel" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  ERP — 재고·제조 관리 시스템 (MES Inventory Management)
  // ─────────────────────────────────────────────────
  erp: {
    slug: "erp",
    heroImage: `${ASSET}/erp/01-cover.png`,
    intro:
      "**MES(제조 실행 시스템) 재고관리 도메인** 을 Spring Boot 3.2 + React 18 풀스택으로 다시 짠 ERP 시스템입니다. 기존 Oracle 기반 레거시를 **PostgreSQL 로 마이그레이션** 하면서 — Java 17 모던 스택, JPA 엔티티 모델, 46개 REST API, JWT 인증, depth 4 동적 메뉴, RBAC 권한, Swagger 자동 문서화까지 한 번에 재설계했습니다. " +
      "단순 CRUD 가 아니라 — **거래번호 자동 생성**(YYYYMMDD-0000001), **차변/대변(DR/CR) 회계 개념** 적용, **재고 확정/취소 상태 머신** (INV_WRITE Y/N), **수불명세서 자동 집계** (기초+당기입고-당기출고=기말), **MERGE UPSERT 프로시저** 까지 재고관리 비즈니스 로직 전체가 코드로 굳어져 있습니다. " +
      "56개 Java 클래스 / 약 5,000줄 / 8 마스터 + 2 트랜잭션 테이블 / 23개 운영 화면 — 2025-12-08 v1.0.0 \"프로덕션 준비 완료\" 상태로 배포됨.",
    sections: [
      {
        title: "도메인 모델 — 8 마스터 + 2 트랜잭션 테이블",
        body:
          "**마스터 (8)**: `INV_ITEM_MASTER` (품목, SAFE_STOCK 안전재고 포함) / `INV_MASTER` (창고, WH_ID PK) / `INV_INOUT_MASTER` (입출고 유형, DR/CR 회계 구분) / `CC_MASTER` (코스트센터, 4단 계층 CC_LEVEL) / `CUSTOMER_MASTER` / `SUPPLIER_MASTER` / `ATTR_MASTER` (확장 속성) / `ATTR_SET_MASTER` (속성 집합, 복합 PK).\n\n**트랜잭션 (2)**: `INV_STOCK` (현재고, 창고-품목 복합 PK + ON_HAND_QTY) / `INV_STOCK_HISTORY` (입출고 이력, TRANS_DATE+TRANS_ID 복합 PK).\n\n모든 마스터 테이블에 `USE_YN` (Y/N) **논리적 삭제 패턴** + `CREATED_BY / CREATED_AT / UPDATED_BY / UPDATED_AT` 감사 4 컬럼이 표준. BaseEntity 클래스가 이 4개를 자동 채워줘 56개 엔티티 코드가 깔끔합니다.",
      },
      {
        title: "차변/대변 회계 — DR/CR 유형 체계",
        body:
          "재고 시스템에 **복식부기 회계 개념**을 도입했습니다. `INV_INOUT_MASTER.DRCR` 컬럼이 `DR` (차변, Debit) 또는 `CR` (대변, Credit) 두 가지로 구분.\n\n**입고 유형 (DR — 차변)**:\n- `DR010` 구매입고\n- `DR020` 생산입고\n- `DR030` 반품입고\n- `DR040` 재고조정(+)\n- `DR050` 기타입고\n\n**출고 유형 (CR — 대변)**:\n- `CR010` 판매출고\n- `CR020` 생산출고(자재투입)\n- `CR030` 반품출고\n- `CR040` 재고조정(-)\n- `CR050` 기타출고\n\n10가지 유형 각각이 회계 시스템과 1:1 매핑되어, 단순 \"+/-\" 가 아니라 **회계 추적 가능한 거래** 로 기록됩니다. 재고조정 같은 특수 케이스도 정/부의 조정 유형(`ADJ_TYPE`)을 따로 둬서 감사 추적 가능.",
      },
      {
        title: "입출고 확정 상태 머신 — INV_WRITE Y/N",
        body:
          "입출고 거래는 두 단계로 동작합니다.\n\n**1단계 — 등록 (`INV_STOCK_HISTORY` INSERT)**:\n- 거래번호 자동 생성: `YYYYMMDD-0000001` 형식 (날짜 + 7자리 일련번호)\n- `INV_WRITE = 'N'` (미확정 상태) — 현재고에 아직 반영 안 됨\n- 사용자가 검토할 수 있는 \"임시 작성\" 상태\n\n**2단계 — 확정 (`INV_WRITE = 'Y'` 변경)**:\n- `INV_STOCK.ON_HAND_QTY` 자동 갱신\n- DR(입고): 수량 증가\n- CR(출고): 수량 감소 + **재고 부족 검증** (음수 차단)\n- 한 번 확정되면 직접 수정 불가, 취소 → 재등록 흐름\n\n이 패턴 덕분에 — \"등록은 했는데 아직 확정 전\" 상태가 워크플로우 단계로 명확히 구분되고, 회계 마감 전까지 거래를 검토·취소할 수 있습니다.",
      },
      {
        title: "수불명세서 — 기초·당기·기말 재고 자동 집계",
        body:
          "전통적인 재고관리 회계의 핵심 — **수불명세서(Stock Statement)** 가 코드로 자동 계산됩니다.\n\n```\n기초재고 = 조회기간 이전의 (입고합계 - 출고합계)\n당기입고 = 조회기간 내 입고합계 (유형별 구분)\n당기출고 = 조회기간 내 출고합계 (유형별 구분)\n기말재고 = 기초재고 + 당기입고 - 당기출고\n```\n\n프론트엔드 `14_stock_monthly_status` / `15_monthly_stock` 화면이 이 로직으로 월별 수불명세를 표출. 회계 시스템과 일치하는 숫자가 나와야 하므로 — JPQL + 그룹 by 입출고유형 + COALESCE NULL 처리까지 SQL 레벨에서 정확히 맞춰뒀습니다.\n\n4가지 재고 조회 모드:\n1. **품목별 재고조회** — 창고/품목별 현재고\n2. **입출고내역조회** — 기간별 거래 상세\n3. **창고별품목별재고** — 창고-품목 매트릭스\n4. **수불명세서** — 기초·입고·출고·기말 집계",
      },
      {
        title: "현재고 재계산 — MERGE UPSERT 프로시저",
        body:
          "`prc_update_onhand_by_item(p_item_id)` PostgreSQL 프로시저가 **품목별 현재고 정합성**을 보장합니다.\n\n처리 로직:\n1. `INV_STOCK_HISTORY` 에서 해당 품목의 확정된(`INV_WRITE='Y'`) 거래 전체 집계\n2. 창고별 입출고 수량 계산 (DR=+, CR=−)\n3. `INV_STOCK` 에 **MERGE / ON CONFLICT DO UPDATE** — 있으면 갱신, 없으면 신규 입력\n\nOracle 원본의 `MERGE INTO` 구문이 PostgreSQL `INSERT ... ON CONFLICT DO UPDATE` 로 마이그레이션됨. 한 번에 INSERT + UPDATE 가 가능하므로 동시성 안전 + 트랜잭션 최소화.\n\n실시간 거래마다 현재고를 업데이트하지만, 데이터 불일치가 발생했을 때 이 프로시저를 \"리빌드\" 도구로 사용 — 마치 회계 시스템의 결산 재집계 같은 안전판.",
      },
      {
        title: "Oracle → PostgreSQL 마이그레이션",
        body:
          "기존 Oracle 기반 레거시를 PostgreSQL 로 옮기면서 **8가지 SQL 방언 차이**를 일괄 변환했습니다.\n\n| Oracle | PostgreSQL |\n|--------|------------|\n| `VARCHAR2` | `VARCHAR` |\n| `NUMBER` | `NUMERIC` / `INTEGER` |\n| `SYSDATE` | `CURRENT_TIMESTAMP` / `NOW()` |\n| `NVL(a, b)` | `COALESCE(a, b)` |\n| `DECODE(a,b,c,d)` | `CASE WHEN a=b THEN c ELSE d END` |\n| `A.COL = B.COL(+)` | `A LEFT JOIN B ON ...` |\n| `ROWNUM` | `ROW_NUMBER() OVER()` |\n| `MERGE INTO` | `INSERT ... ON CONFLICT DO UPDATE` |\n| `FROM DUAL` | (생략 가능) |\n\n변환 작업의 핵심은 — \"기존 화면의 출력이 한 행도 달라지면 안 된다\" 는 제약. 회계 데이터라서 0.0001 단위 차이도 허용 안 됨. 모든 NUMERIC(18,4) 정밀도 유지, NULL 처리 동치 보장, Outer join 결과 1:1 매칭까지 검증.",
      },
      {
        title: "JWT 인증 — Access 24h + Refresh 14d + Argon2",
        body:
          "**JWT (jjwt 0.12.3)** 기반 인증.\n\n- **Access Token**: 24시간 유효\n- **Refresh Token**: 14일 유효, **DB 저장** (`tb_refresh_token` 테이블)\n- **비밀번호 해싱**: Argon2 (Bouncy Castle `bcprov-jdk18on` 1.77) — 메모리-하드 알고리즘으로 GPU 크래킹 방어\n\nRefresh Token 을 DB 에 저장하는 이유:\n- 사용자별 강제 로그아웃 가능 (DB에서 토큰 삭제)\n- 동시 세션 추적 / 이상 접속 차단\n- 토큰 회수가 stateful 하게 동작\n\n**Endpoints**:\n- `POST /auth/login` — 로그인 (Access + Refresh 발급)\n- `POST /auth/refresh` — 토큰 갱신 (Refresh 검증)\n- `POST /auth/logout` — 로그아웃 (Refresh DB 삭제)\n- `GET /auth/me` — 현재 사용자 정보\n\nCORS 는 프론트(`localhost:5173`) 연동을 위해 설정. Spring Security `@PreAuthorize` 로 메서드 단위 권한 체크.",
      },
      {
        title: "동적 메뉴 트리 — depth 4 FEMS/EMS 통합",
        body:
          "관리자가 코드 수정 없이 사이드바·헤더 메뉴를 재구성할 수 있게 **`tb_menu` 테이블로 동적 메뉴 트리** 를 구성했습니다. 최대 **depth 4** 까지 중첩 가능.\n\n**3단계 → 4단계 확장 사례** (FEMS — 에너지 관리):\n```\n에너지 사용 (depth 2)\n├── 종합현황 (depth 3)\n├── 에너지 사용 현황 (depth 3, 그룹)\n│   ├── (일별) 에너지 사용 현황 (depth 4)\n│   ├── (월별) 에너지 사용 현황 (depth 4)\n│   ├── (년별) 에너지 사용 현황 (depth 4)\n│   └── (분기별) 에너지 사용 현황 (depth 4)\n├── 부하구간별 사용 현황 (depth 3, 그룹)\n│   ├── 15분 단위 사용량 (depth 4)\n│   └── 시단위 사용 현황 (depth 4)\n└── 임계값 발생 현황 (depth 3)\n```\n\n프론트엔드의 `MENU_STRUCTURE` 상수와 백엔드의 `init_menus.sql` 시드를 동기화하는 별도 문서(`MENU_STRUCTURE_SYNC.md`)가 있어 — 메뉴 변경 시 양쪽이 즉시 어긋나지 않도록 운영.",
      },
      {
        title: "권한 시스템 — Authority + Authority Assign",
        body:
          "사용자 / 권한 / 할당이 분리된 **3-Entity RBAC** 구조.\n\n**Users** (`19_user`) — 사용자 CRUD. 아이디·이름·이메일·소속·역할(role).\n\n**Authority** (`20_authority`) — 권한 정의. 메뉴별 R/W/D 접근 권한 매트릭스. 권한 자체가 명명된 단위 (예: `STOCK_ADMIN`, `MASTER_VIEWER`).\n\n**Authority Assign** (`21_authority_assign`) — 권한 ↔ 사용자 매핑. 한 사용자에 여러 권한 / 한 권한이 여러 사용자에 적용. 시간 제한도 가능 (계약직 사용자용).\n\n**Menu Management** (`22_menu`) — 동적 메뉴 트리 편집. 어떤 권한이 어떤 메뉴를 볼 수 있는지를 `tb_menu` × Authority 매핑으로 결정.\n\nJWT payload 에는 `username + roles[]` 만 담고, 권한 상세는 매 요청마다 DB 에서 lookup — Stateless JWT 의 단점을 trade-off 하는 대신 **권한 변경 즉시 반영** 효과.",
      },
      {
        title: "프론트엔드 — React 18 + 7종 라이브러리 조합",
        body:
          "React 18.3 + Vite 5 + Tailwind 3.4 기반에 7개 핵심 라이브러리를 조합했습니다.\n\n- **Zustand 5** — 전역 상태 (사용자·메뉴·테마)\n- **React Hook Form 7.68 + Zod 4** — 폼 검증 (입출고 등록 폼처럼 복잡한 다중 필드)\n- **Toast UI Editor 3.2** — `notice` 공지사항 작성 (한글 친화 리치 텍스트 + 표·이미지·마크다운)\n- **react-quill 2.0** — 보조 에디터 (간단한 텍스트 영역용)\n- **Recharts 3.6** — 차트 (`current_stock_chart`, `stock_days` 등)\n- **Sweetalert2 11** — 확인/경고 모달 (재고 부족 / 확정 취소 등)\n- **framer-motion 11** — 페이지 전환·드롭다운 애니메이션\n- **axios 1.13** — 백엔드 통신, 인터셉터로 JWT 자동 첨부 + 401 시 Refresh 자동 호출\n\n별도 문서(`STORE_ERROR_FIX_SUMMARY.md`)에 Zustand store 에러 처리 패턴, `MENU_FIX_SUMMARY.md` 에 메뉴 sync 패턴이 정리되어 있어 운영 인계 가능한 수준.",
      },
    ],
    techGroups: [
      {
        label: "Backend · Spring Boot",
        items: [
          "Spring Boot 3.2.1 / Java 17",
          "Spring Data JPA · Hibernate",
          "PostgreSQL (Oracle → PG 마이그레이션)",
          "Spring Security + JWT 0.12.3 (Access 24h + Refresh 14d DB)",
          "Argon2 (Bouncy Castle 1.77)",
          "Springdoc OpenAPI 2.3 (Swagger UI)",
          "ModelMapper 3.2 · Lombok",
          "BaseEntity (감사 4 컬럼 자동)",
          "GlobalExceptionHandler · ApiResponse 표준",
        ],
      },
      {
        label: "Frontend · React 18",
        items: [
          "React 18.3 + Vite 5 + Tailwind 3.4",
          "Zustand 5 (전역 상태)",
          "React Router 7",
          "React Hook Form 7.68 + Zod 4 (폼 검증)",
          "Toast UI Editor 3.2 (공지사항 리치 텍스트)",
          "react-quill 2.0 (보조 에디터)",
          "Recharts 3.6 (차트)",
          "Sweetalert2 11 (모달)",
          "framer-motion 11 · lucide-react · axios",
        ],
      },
      {
        label: "Domain · 재고관리",
        items: [
          "8 마스터 테이블 + 2 트랜잭션",
          "46 REST API · 56 Java 클래스 · ~5,000줄",
          "차변/대변 (DR/CR) 10 유형 회계 체계",
          "거래번호 자동 (YYYYMMDD-0000001)",
          "INV_WRITE Y/N 확정 상태 머신",
          "재고 부족 검증 + 자동 잠금",
          "수불명세서 (기초·당기·기말 자동 집계)",
          "prc_update_onhand_by_item 프로시저 (MERGE UPSERT)",
        ],
      },
      {
        label: "RBAC · 메뉴 · 인프라",
        items: [
          "tb_user + tb_refresh_token + tb_menu 3 테이블",
          "Authority + Authority Assign 분리 RBAC",
          "tb_menu depth 4 동적 트리 (FEMS/EMS 통합)",
          "MENU_STRUCTURE ↔ init_menus.sql 양방향 동기화",
          "Docker + nginx 컨테이너 배포",
          "Swagger UI (/swagger-ui.html)",
          "CORS 설정 (Vite dev 5173)",
        ],
      },
    ],
    gallery: [
      {
        src: `${ASSET}/erp/00_login.png`,
        caption:
          "00 — 로그인. JWT 발급 (Access 24h + Refresh 14d DB 저장) + Argon2 비밀번호 해싱",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/01_dashboard.png`,
        caption:
          "01 — 대시보드. 재고 KPI / 입출고 추이 / 안전재고 미달 알림을 한 화면에 통합 (Recharts 3.6)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/02_customer.png`,
        caption:
          "02 — 고객 마스터 (CUSTOMER_MASTER). 사업자번호·담당자·연락처 CRUD + USE_YN 논리 삭제",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/03_supplier.png`,
        caption:
          "03 — 공급사 마스터 (SUPPLIER_MASTER). 구매처 정보 + 사업자번호 중복 체크",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/04_item_master.png`,
        caption:
          "04 — 품목 마스터 (INV_ITEM_MASTER). 품목코드·규격·단위·분류 + SAFE_STOCK 안전재고 + ATTR_SET 확장 속성",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/05_warehouse.png`,
        caption:
          "05 — 창고 마스터 (INV_MASTER). 보관 장소 + LOCATION1 위치 정보 + 콤보박스 데이터 제공",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/06_inventory_item.png`,
        caption:
          "06 — 입출고 유형 마스터 (INV_INOUT_MASTER). DR/CR 차변·대변 + DR010~CR050 10종 유형 정의",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/07_process.png`,
        caption:
          "07 — 공정 관리. 생산 흐름 단위로 자재 투입(CR020) / 완제품 입고(DR020) 연계",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/08_inout_reg.png`,
        caption:
          "08 — 입출고 등록. 거래번호 자동 (YYYYMMDD-0000001) + INV_WRITE='N' 미확정 → 확정 시 ON_HAND_QTY 자동 갱신",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/09_stock_history.png`,
        caption:
          "09 — 입출고 이력 (INV_STOCK_HISTORY). TRANS_DATE+TRANS_ID 복합 PK, 모든 거래 영구 보관 + 페이징 + 동적 검색",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/10_stock_by_item.png`,
        caption:
          "10 — 품목별 재고조회. 창고-품목 매트릭스로 현재고(INV_STOCK.ON_HAND_QTY) 한눈에 + 안전재고 미달 강조",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/11_stock_out_by_inbound.png`,
        caption:
          "11 — 입고 기준 출고 조회. 특정 입고 거래(DR)에 연결된 출고(CR) 추적 — 회계 감사 + 원가 추정용",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/12_stock_transfer.png`,
        caption:
          "12 — 창고 이동. 한 창고에서 다른 창고로 재고 이동 (DR + CR 페어 동시 생성) — 총 재고 보존",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/13_stock_conversion.png`,
        caption:
          "13 — 재고 전환. 품목 분해/조립 (예: 원자재 → 반제품, 1 BOX → 10 EA) ADJ_TYPE 으로 조정 유형 기록",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/14_stock_monthly_status.png`,
        caption:
          "14 — 월별 재고 현황. 수불명세서 로직 (기초+당기입고-당기출고=기말) 으로 월 단위 집계",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/15_monthly_stock.png`,
        caption:
          "15 — 월별 재고. 14번 화면을 단순 표 형태로 변환 — Excel 내보내기 친화적인 펼친 뷰",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/16_current_stock_chart.png`,
        caption:
          "16 — 현재고 차트 (Recharts 3.6). 품목별 / 창고별 / 기간별 현재고 변화 시각화",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/17_stock_days.png`,
        caption:
          "17 — 재고 일수 (Days of Inventory). 평균 일 출고량 대비 현재고로 \"몇 일치 재고\" 계산 — 안전재고 정책 수립용",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/18_notice.png`,
        caption:
          "18 — 공지사항. Toast UI Editor 3.2 기반 한글 친화 리치 텍스트 (표·이미지·마크다운 + 색 신택스 플러그인)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/19_user.png`,
        caption:
          "19 — 사용자 관리 (tb_user). 아이디·이름·이메일·소속·역할 CRUD + Argon2 비밀번호 해싱",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/20_authority.png`,
        caption:
          "20 — 권한 정의 (Authority). 메뉴별 R/W/D 권한 매트릭스 — 명명된 권한 단위 (STOCK_ADMIN 등)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/21_authority_assign.png`,
        caption:
          "21 — 권한 할당 (Authority Assign). 사용자 ↔ 권한 N:N 매핑 + 시간 제한 (계약직 사용자용)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/erp/22_menu.png`,
        caption:
          "22 — 메뉴 관리 (tb_menu). depth 4 동적 트리 + MENU_STRUCTURE ↔ init_menus.sql 양방향 동기화",
        aspect: "wide",
      },
    ],
    stats: [
      { label: "REST APIs", value: "46" },
      { label: "Java classes", value: "56" },
      { label: "Master tables", value: "8" },
      { label: "Screens", value: "23" },
    ],
  },

  // ─────────────────────────────────────────────────
  //  Solynx EMS / VoltTrack — 신재생 + ESS + DR + V2X 통합 EMS
  // ─────────────────────────────────────────────────
  "solynx-ems": {
    slug: "solynx-ems",
    heroImage: `${ASSET}/solynx-ems/01-cover.png`,
    intro:
      "VoltTrack 은 태양광·풍력 같은 신재생 발전, ESS 충/방전, 수요반응(DR), V2X(전기차-그리드), 그리고 AI 어시스턴트까지 단일 웹에서 운영하도록 설계된 통합 EMS(Energy Management System) 플랫폼입니다. " +
      "한 화면에서 R/S/T 삼상 전기 품질부터 PCS·BMS 임계값, 풍력 터빈 효율, V2X 충전 스테이션 상태까지 다층 모니터링·제어할 수 있습니다.\n\n" +
      "구조적으로 세 개의 리포지토리로 분리되어 있습니다 — 운영 데이터를 책임지는 `EMS_V2_BackEnd` (Java 11 / Spring Boot 2.7.18 / MyBatis / PostgreSQL + TimescaleDB / Redis / Netty Socket.IO), " +
      "다차트·3D·실시간 SPA 인 `EMS_V2_FrontEnd` (React 18 / Vite 6 / ApexCharts·ECharts·Recharts·Chart.js / Three.js / reactflow), " +
      "그리고 Gemini 3 Flash Preview 기반 도메인 어시스턴트 `Solynx_AI_Server` (FastAPI / google-genai / MCP SDK). 세 컴포넌트가 Socket.IO + STOMP + SSE 로 결합되어 실시간 EMS 콘솔을 구성합니다.",
    sections: [
      {
        title: "3-Repo 아키텍처 — EMS · Web · AI",
        body:
          "단일 모놀리스가 아닌 세 컴포넌트 분리 구조입니다.\n\n" +
          "• EMS_V2_BackEnd (Java 11 / Spring Boot 2.7.18 / MyBatis / Apache POI / Log4jdbc) — PCS·BMS 시계열 적재, 세션 인증, REST API, 스케줄링, 외부 기상청 API 연동(FeignClient + RestTemplate), WAR 패키징 후 Tomcat 배포.\n\n" +
          "• EMS_V2_FrontEnd (React 18 / Vite 6 / Tailwind v4 / Zustand / TanStack Query / styled-components) — 라이트/다크 테마, 다중 디바이스 콤보, Express + ioredis 기반 BFF(`src/server/index.js`) 까지 포함한 풀스택 SPA.\n\n" +
          "• Solynx_AI_Server (FastAPI / Pydantic 2 / aiohttp / httpx / google-genai / MCP SDK) — 운영자의 자연어 질의에 도메인 컨텍스트를 주입한 Gemini 3 Flash 답변을 반환. 백엔드와는 REST 로, 프론트와는 직접 또는 Java 프록시로 양방향.",
      },
      {
        title: "시계열 코어 — TimescaleDB 2.17.2 + Redis",
        body:
          "EMS 의 본질은 분 단위로 폭증하는 PCS·BMS 시계열 데이터입니다. PostgreSQL 위에 TimescaleDB 2.17.2 확장을 올려 `PCS_DATA`·`BMS_DATA` 를 하이퍼테이블로 운용합니다.\n\n" +
          "• `create_hypertable(..., chunk_time_interval => INTERVAL '1 day')` 로 일 단위 청크 자동 파티셔닝\n" +
          "• `time_bucket('1 hour', DATA_OCCUR_YMD_HM)` 기반 시간대별 평균·집계 — 시간별 충/방전 분리(`SUM(CASE WHEN DC_Current > 0 ...)`) 같은 도메인 패턴 내장\n" +
          "• 보존 정책(`add_retention_policy` 365일) + 압축 정책(`add_compression_policy` 7일, `compress_segmentby = 'DEVICE_ID'`) 으로 장기 적재 비용 통제\n" +
          "• Redis 는 캐싱·실시간 임시 적재·Pub/Sub 메시지 버스 3역할 — 실시간 대시보드 수치는 DB 까지 가지 않고 Redis 에서 직배포.",
      },
      {
        title: "재생발전 모니터링 — 종합·효과·상세 3-탭",
        body:
          "사이드바 '재생발전' 메뉴는 EMS 의 메인 콘솔입니다. 발전원(태양광·풍력)별 게이지(`react-circular-progressbar`, `react-gauge-chart`)로 총 설비용량 대비 현재 발전량과 비율을 즉시 표시하고, 운영중·수리중·대기중 상태별 설비 개수도 함께 노출합니다.\n\n" +
          "• 효과 분석 탭 — CO2 저감량(환경) + 수익·비용 절감(경제)을 정량화해 일별 추이 그래프로 가시화\n" +
          "• 상세 데이터 탭 — 발전량 / 누적 발전량 / 상세 내역 표 (ApexCharts + ECharts + Recharts 혼합)\n" +
          "• 일일 충/방전량 + 발전량 페이지에서 시간대별 발전·충전·방전·부하 4 라인 비교 + 자급률·배터리 효율·발전 효율 점수화\n" +
          "• 전력소비·생산 비교 페이지는 \"오늘 vs 어제\" 24h 패턴 + 발전원 구성 비율(파이) + 자체 효율 점수 제공.",
      },
      {
        title: "전기 품질 — R/S/T 삼상 분석",
        body:
          "안정적인 전력 계통 운영의 핵심 — 전기 품질 메뉴는 3 가지 축으로 구성됩니다.\n\n" +
          "• 전압/전류 변화율 — 5분/15분/1시간 시간 윈도우 × PCS/BMS 디바이스 타입으로 R·S·T 각 상의 전압/전류 상관관계를 실시간 그래프로 추적. 삼상 비교 그래프로 상간 불균형 즉시 진단.\n" +
          "• 역률 — \"오늘 vs 어제\" 두 라인을 한 차트에 겹치고 평균 역률·최대/최소 변동폭·표준편차·저역률 발생 비율을 카드로 요약. 각 지표는 정상/주의/경고 상태 평가 + 전일 대비 증감률 동반.\n" +
          "• 주파수 변동 — 60Hz 기준선과 비교, 정상 범위 이탈률 분석. AI 코멘트가 그래프 하단에 자동 첨부되어 비전문가도 상태 해석 가능.",
      },
      {
        title: "장치 발생현황 — PCS · BMS · PV",
        body:
          "장치 카테고리별 \"발생현황\" 화면은 현재 운영 중 디바이스의 실시간 텔레메트리를 카드 + 차트 + 표로 동시에 보여줍니다.\n\n" +
          "• PCS — DC 전압/전류, 유효전력, SOC, 충/방전 모드, PDM(Peak Demand Management) 동작 상태\n" +
          "• BMS — 셀 전압·온도, 배터리실 온/습도, SOC 상/하한 도달 여부, 보호 동작 트리거 로그\n" +
          "• PV — 모듈/스트링별 발전량, MPPT 효율, 일사량/온도 보정 후 이론치 대비 실제치 비교\n\n" +
          "데이터 갱신 채널은 Netty Socket.IO + STOMP.js + SSE 의 3중 구성 — 대시보드는 Socket.IO, 폼·테이블은 STOMP, 이벤트 알림은 SSE 로 부하 분산.",
      },
      {
        title: "장치 제어 — 운영 파라미터 직접 설정",
        body:
          "단순 모니터링을 넘어 실 운영 파라미터를 사용자가 직접 수정해 PMS(전력 관리 시스템)로 송출하는 제어 화면입니다.\n\n" +
          "• PCS 장치 설정 — 충/방전량 한도, SOC 상/하한, PDM 임계값을 PCS 별 표 형태로 일괄 편집. 항목별 권장 설정 가이드 인라인 노출로 오설정 사고를 예방.\n" +
          "• 보호동작 설정 — BMS 보호 임계값(셀 전압·온도·배터리실 습도·SOC 안전 범위)을 한 페이지에서 관리. 각 항목별 위험성·권장 범위 설명이 함께 제공되어 배터리 수명/안전 관리 표준화.\n\n" +
          "설정 변경은 Spring AOP 기반 감사 로깅으로 자동 추적되며, Apache POI 로 Excel 일괄 import/export 가능.",
      },
      {
        title: "ESS — 충/방전 운영 콘솔",
        body:
          "독립된 ESS 도메인에서 배터리 시스템의 일간/주간/월간 운영 패턴을 분석합니다. SOC 추이(`time_bucket('30 minutes', DATA_OCCUR_YMD_HM) → AVG(SOC)`), 충전·방전 에너지량(kWh), 배터리 효율(=방전량/충전량), 사이클 카운트를 한 화면에 통합.\n\n" +
          "Redis Pub/Sub 으로 실시간 SOC 변화를 게이지 위젯에 직배포하고, 이력 조회는 TimescaleDB 압축 청크에서 빠르게 가져옵니다. 배터리 셀별 편차 시각화로 노화 패턴 조기 감지.",
      },
      {
        title: "DR — 수요반응 이벤트 운영",
        body:
          "한전·KPX 가 발령하는 DR(Demand Response) 이벤트를 수신·실행·정산하는 도메인입니다.\n\n" +
          "• 이벤트 발령 화면 — 발령 시각·감축 목표·예상 인센티브를 카드로 표시\n" +
          "• 실시간 감축 이행 — 목표 vs 실측 라인을 5분 단위로 비교하면서 자동/수동 부하 차단 트리거\n" +
          "• 이력 — 과거 DR 참여 실적·정산 금액 표 + Excel 내보내기(Apache POI)\n\n" +
          "발령 알림은 SSE 로 즉시 푸시되며, 발령 발생 시 자동으로 ESS 방전을 보조 동작으로 연동할 수 있도록 PCS 제어와 결합되어 있습니다.",
      },
      {
        title: "V2X — 전기차-그리드 양방향 충전",
        body:
          "전기차 배터리를 그리드 자원으로 활용하는 V2X 도메인은 EMS 의 차세대 축입니다.\n\n" +
          "• 충전 스테이션 맵(@react-google-maps/api) — 다중 사이트 위치·실시간 상태\n" +
          "• 양방향 충/방전 모니터링 — V2G(차→그리드) / G2V(그리드→차) 전력 흐름을 reactflow 11 + react-flow-renderer 10 기반 노드 다이어그램으로 시각화\n" +
          "• 그리드 상호작용 — DR 이벤트와 연동해 차량을 분산 ESS 자원으로 동원\n" +
          "• 정비 정보 화면 — 충전기 점검 이력·다음 점검 예정·실시간 알람\n\n" +
          "V2X 는 ESS 와 동일한 PCS 제어 인터페이스를 재사용하므로 운영자가 새 도메인을 학습 없이 사용할 수 있도록 설계되었습니다.",
      },
      {
        title: "AI 어시스턴트 — Gemini 3 Flash + MCP (별도 서버)",
        body:
          "`Solynx_AI_Server` 는 EMS 본체와 분리된 별도의 Python 어시스턴트 서버입니다. FastAPI 위에 Google `google-genai` SDK 를 직결한 도메인 챗봇으로, 모델은 `gemini-3-flash-preview` — 1M / 64k 컨텍스트, 2025-01 지식 컷오프, Pro 급 추론을 Flash 가격($0.50 / $3 per 1M)에 제공합니다.\n\n" +
          "• `thinking_level` 파라미터 (low / medium / high) 로 추론 깊이 조절 — 단순 조회는 low, 발전량 원인 분석 같은 복합 질의는 high\n" +
          "• Dynamic Thinking — 프롬프트 복잡도를 모델이 스스로 분석해 추론량 자동 조절, temperature=1.0 권장\n" +
          "• MCP(Model Context Protocol) SDK 로 EMS 백엔드 도구를 모델에 노출 — \"오늘 발전량이 얼마나 되나요?\" 같은 자연어가 PostgreSQL 쿼리로 전환되어 실데이터 응답\n" +
          "• 엔드포인트: `POST /api/query` (대화형) / `POST /api/ems/analyze` (Java 백엔드 호환) / `GET /api/health` / `GET /api/sample-questions`\n" +
          "• 프론트는 `react-markdown` + `remark-gfm` + `rehype-raw` 로 응답을 마크다운/표/HTML 혼합 렌더 — 본 갤러리에는 UI 스크린샷 미포함, 시스템 컴포넌트로만 노출.",
      },
      {
        title: "프론트엔드 — 다중 차트 + 3D + 실시간",
        body:
          "EMS 콘솔의 시각화 요구는 단일 차트 라이브러리로 해결되지 않아 도메인별로 최적 라이브러리를 골라 썼습니다.\n\n" +
          "• ApexCharts 4.5 / react-apexcharts — 시계열 + 콤보 차트\n" +
          "• ECharts 5.6 / echarts-for-react — 대용량·고밀도 데이터 시각화\n" +
          "• Recharts 2.15 — 가벼운 React 네이티브 차트\n" +
          "• Chart.js 4.4 / react-chartjs-2 — 단순·표준 차트\n" +
          "• react-circular-progressbar + react-gauge-chart — 게이지·SOC 표시\n" +
          "• Three.js + R3F + drei + @react-spring/three — 발전소 3D 모형, 풍력 터빈 회전 애니메이션\n" +
          "• reactflow 11 + react-flow-renderer 10 — V2X 에너지 흐름·전력 계통도\n" +
          "• Tailwind v4 + Radix UI + framer-motion 12 — UI 컴포넌트 + 부드러운 라이트/다크 전환.",
      },
      {
        title: "BFF + 실시간 통신 — Express · Socket.IO · STOMP",
        body:
          "프론트 리포지토리 안에 `src/server/index.js` 를 두어 Express + ioredis + Socket.IO 4 로 BFF 레이어를 운용합니다. Java 백엔드의 Netty Socket.IO 와 별개로 프론트 서버사이드 캐싱·세션 관리·Slack 같은 외부 연동을 흡수합니다.\n\n" +
          "실시간 채널은 용도별로 분리되어 있습니다.\n" +
          "• Socket.IO 4 (`@stomp/stompjs` + `sockjs-client` + `stompjs` + `socket.io-client`) — 대시보드 위젯 실시간 푸시\n" +
          "• STOMP — 폼/테이블 양방향\n" +
          "• Spring WebFlux SSE — 알림·이벤트 단방향 스트림 (DR 발령, 보호 동작 트립)\n" +
          "• axios + TanStack Query 5.69 — REST 캐싱 + 서버 상태 동기화\n\n" +
          "Spring `@Scheduled` + `@Async` 가 분 단위 집계·기상청 API 폴링·로그 회전을 백그라운드 처리합니다.",
      },
      {
        title: "재생발전 · 기준정보 — 마스터 데이터 5종",
        body:
          "기준정보(STD) 는 재생발전 메뉴 안에 통합된 마스터 데이터 영역으로, 5개 화면이 모든 운영 데이터의 토대를 이룹니다.\n\n" +
          "• 푸시 알람 등록 — 이벤트 코드별 알림 대상자/채널/임계값을 한 화면 매트릭스로 관리, SSE 검증 즉시 가능\n" +
          "• 장치 제원 — PCS · BMS · PV · 풍력 터빈 마스터 (모델/시리얼/용량/제조사/설치 위치), Apache POI Excel 일괄 import\n" +
          "• 사용자 등록 — 계정 + 소속 + 역할 + 메뉴/기능 권한 매트릭스 (Spring Security 세션 인증)\n" +
          "• 상태 코드 — 시스템 내부 상태/이벤트 코드 통합 — 데이터 일관성 보장\n" +
          "• 팁 등록 — 화면별 운영 가이드/툴팁 문구를 마스터로 관리해 비전문 운영자 학습 곡선 단축\n\n" +
          "모든 마스터 변경은 Spring AOP + `@Async` 비동기 감사 로그에 자동 기록됩니다.",
      },
    ],
    techGroups: [
      {
        label: "Backend · Java 11 (EMS_V2_BackEnd)",
        items: [
          "Spring Boot 2.7.18",
          "Spring MVC + Spring Data",
          "MyBatis (동적 SQL)",
          "Spring Cache",
          "Spring Security (Session)",
          "Spring WebFlux (SSE)",
          "Spring AOP (감사 로깅)",
          "Spring @Scheduled / @Async",
          "PostgreSQL 12+ + TimescaleDB 2.17.2",
          "Redis 6.x (캐싱/Pub-Sub)",
          "Netty Socket.IO",
          "FeignClient + RestTemplate",
          "Apache POI (Excel)",
          "Log4jdbc (SQL 로깅)",
          "MCP SDK",
          "Apache Maven (WAR)",
          "Lombok / Jackson",
        ],
      },
      {
        label: "Frontend · React 18 (EMS_V2_FrontEnd)",
        items: [
          "Vite 6 + React 18",
          "Tailwind v4 + @tailwindcss/postcss",
          "Radix UI (16+ components)",
          "Zustand 5 + TanStack Query 5.69",
          "styled-components 6 + @emotion/react",
          "framer-motion 12 + motion",
          "ApexCharts 4.5 / ECharts 5.6 / Recharts 2.15 / Chart.js 4.4",
          "react-circular-progressbar + react-gauge-chart",
          "Three.js 0.176 + @react-three/fiber + drei + @react-spring/three",
          "reactflow 11 + react-flow-renderer 10",
          "@react-google-maps/api 2.20",
          "@stomp/stompjs 7 + sockjs-client + socket.io-client 2.4",
          "axios 1.7 + react-markdown 10 + remark-gfm + rehype-raw",
          "Express 4.21 + ioredis 5.3 + Socket.IO 4.8 (BFF)",
          "Vite 6 + ESLint 9",
        ],
      },
      {
        label: "AI · Python (Solynx_AI_Server)",
        items: [
          "FastAPI ≥0.115",
          "Uvicorn ≥0.32 (standard)",
          "google-genai ≥1.0",
          "Pydantic ≥2.0",
          "httpx ≥0.27 + aiohttp ≥3.9",
          "MCP SDK ≥1.0 (Model Context Protocol)",
          "python-dotenv ≥1.0",
          "Gemini 3 Flash Preview (gemini-3-flash-preview)",
          "1M / 64k context · Jan 2025 cutoff",
          "thinking_level (low/medium/high)",
          "Dynamic Thinking · temperature 1.0",
        ],
      },
      {
        label: "Realtime · DevOps · Infra",
        items: [
          "Netty Socket.IO (Java 측 실시간)",
          "STOMP over WebSocket",
          "SSE (Server-Sent Events)",
          "Redis Pub/Sub 메시지 버스",
          "Docker + Docker Compose",
          "Ubuntu 24.04.2 LTS",
          "Tomcat (외부 WAS) / 내장 Tomcat",
          "Swagger / OpenAPI (Springdoc)",
          "기상청 API 연동 (FeignClient)",
          "TimescaleDB 압축·보존 정책",
          "Spring @Scheduled 배치 작업",
        ],
      },
    ],
    gallery: [
      // ── 메인 (1)
      {
        src: `${ASSET}/solynx-ems/01_home.png`,
        caption:
          "01 — 메인 대시보드. VoltTrack 종합 현황 (KPI · 발전량 · 충방전 · 부하 · 일사량 + 라이트/다크 토글 + 다중 디바이스 콤보 + 실시간 기상청 날씨)",
        aspect: "wide",
      },
      // ── 재생발전 · 발전 데이터 (4)
      {
        src: `${ASSET}/solynx-ems/10_re_power_generator.png`,
        caption:
          "10 — 재생발전 · 발전원별 종합. 태양광/풍력 탭 + 운영중·수리중·대기중 설비 개수 + 게이지(총 설비용량 대비 현재 발전량) — react-circular-progressbar + react-gauge-chart",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/11_re_daily_energy.png`,
        caption:
          "11 — 재생발전 · 일일 충/방전·발전량. 시간대별 발전·충전·방전·부하 4 라인 비교 + 자급률/배터리 효율/발전 효율 종합 점수화 + 최적화 제안",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/12_re_power_consumption_production.png`,
        caption:
          "12 — 재생발전 · 전력 소비·생산 현황. 개별 설비 \"오늘 vs 어제\" 24h 패턴 + 발전원 구성 비율 + 전력 소비 효율 점수",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/13_re_wind_power.png`,
        caption:
          "13 — 재생발전 · 풍력 모니터링. 터빈별 실시간 출력/효율/풍속/온도 카드 + AI 효율 분석 리포트 + 특이사항 알림",
        aspect: "wide",
      },
      // ── 재생발전 · 전기 품질 (PQ) (3)
      {
        src: `${ASSET}/solynx-ems/14_re_pq_rate_of_change.png`,
        caption:
          "14 — 전기 품질 · 전압/전류 변화율. 5분/15분/1시간 윈도우 × PCS/BMS 타입으로 R·S·T 삼상 전압·전류 상관관계 + 삼상 비교 그래프 (상간 불균형 진단)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/15_re_pq_power_factor.png`,
        caption:
          "15 — 전기 품질 · 역률. 오늘 vs 어제 역률 추이 + 평균/변동폭/표준편차/저역률 비율 카드 + 정상·주의·경고 상태 평가",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/16_re_pq_frequency.png`,
        caption:
          "16 — 전기 품질 · 주파수 변동. 60Hz 기준선 비교 + 정상 범위 이탈률 + AI 분석 코멘트 자동 첨부",
        aspect: "wide",
      },
      // ── 재생발전 · 장치 발생현황 (perf) (3)
      {
        src: `${ASSET}/solynx-ems/17_re_perf_pcs_status.png`,
        caption:
          "17 — 장치 발생현황 · PCS. DC 전압/전류 + 유효전력 + SOC + 충/방전 모드 + PDM 동작 상태 (Netty Socket.IO 실시간 푸시)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/18_re_perf_bms_status.png`,
        caption:
          "18 — 장치 발생현황 · BMS. 셀 전압·온도 + 배터리실 온/습도 + SOC 상/하한 도달 + 보호 동작 트리거 로그",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/19_re_perf_pv_status.png`,
        caption:
          "19 — 장치 발생현황 · PV. 모듈/스트링별 발전량 + MPPT 효율 + 일사량/온도 보정 후 이론치 대비 실제치 비교",
        aspect: "wide",
      },
      // ── 재생발전 · 장치 제어 (DC) (3)
      {
        src: `${ASSET}/solynx-ems/20_re_dc_status_control.png`,
        caption:
          "20 — 장치 제어 · 상태 제어. 디바이스별 운전 모드 (자동/수동/대기) 토글 + 즉시 적용 + Spring AOP 감사 로깅",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/21_re_dc_pcs_setting.png`,
        caption:
          "21 — 장치 제어 · PCS 설정. 충/방전량 한도 + SOC 상/하한 + PDM 임계값 일괄 편집 + 항목별 권장 가이드 인라인 → PMS 송출",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/22_re_dc_protection_setting.png`,
        caption:
          "22 — 장치 제어 · 보호동작 설정. BMS 보호 임계값 (셀 전압·온도·배터리실 습도·SOC 안전 범위) + 위험성/권장 범위 설명",
        aspect: "wide",
      },
      // ── 재생발전 · 기준정보 (STD) (5)
      {
        src: `${ASSET}/solynx-ems/23_re_std_push_alarm.png`,
        caption:
          "23 — 기준정보 · 푸시 알람 등록. 이벤트 코드별 알림 대상자/채널/임계값 매트릭스 + SSE 즉시 검증",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/24_re_std_device_spec.png`,
        caption:
          "24 — 기준정보 · 장치 제원. PCS · BMS · PV · 풍력 터빈 마스터 (모델/시리얼/용량/제조사/설치 위치) — MyBatis 동적 SQL + Apache POI Excel 일괄 import",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/25_re_std_user_registration.png`,
        caption:
          "25 — 기준정보 · 사용자 등록. 계정 + 소속 + 역할 + 메뉴/기능 권한 매트릭스 — Spring Security 세션 기반 인증",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/26_re_std_status_code.png`,
        caption:
          "26 — 기준정보 · 상태 코드. 시스템 내부 상태/이벤트 코드 통합 관리 — 데이터 일관성 보장",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/27_re_std_tip_registration.png`,
        caption:
          "27 — 기준정보 · 팁 등록. 화면별 운영 가이드/툴팁 문구 마스터 — 비전문 운영자 학습 곡선 단축",
        aspect: "wide",
      },
      // ── ESS (4)
      {
        src: `${ASSET}/solynx-ems/30_ess_monitoring.png`,
        caption:
          "30 — ESS 모니터링. 다중 배터리 뱅크 SOC + 출력 + 사이클 카운트 + 셀별 편차 (Redis Pub/Sub 실시간)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/31_ess_statistics.png`,
        caption:
          "31 — ESS 통계. 일간/주간/월간 충전·방전 에너지량(kWh) + 배터리 효율 (방전량/충전량) 트렌드 + 사이클 누적",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/32_ess_rawdata.png`,
        caption:
          "32 — ESS 원시 데이터. TimescaleDB 하이퍼테이블에서 분 단위 raw 시계열 직접 조회 + Apache POI Excel 내보내기",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/33_ess_thresholds.png`,
        caption:
          "33 — ESS 임계값. SOC 안전 범위, 셀 전압·온도 경고/에러 기준, 배터리실 습도 등 보호 동작 기준 통합 설정",
        aspect: "wide",
      },
      // ── DR (4)
      {
        src: `${ASSET}/solynx-ems/40_dr_grid_power_control.png`,
        caption:
          "40 — 수요반응 · 그리드 전력 제어. 한전·KPX DR 발령 이벤트 수신 → 자동/수동 부하 차단 + ESS 방전 보조 트리거 (SSE 푸시)",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/41_dr_ev_charging_control.png`,
        caption:
          "41 — 수요반응 · EV 충전 제어. DR 이벤트 중 EV 충전 일시 정지/지연 정책 적용 + V2X 양방향 충방전과 통합 제어",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/42_dr_economics_perf.png`,
        caption:
          "42 — 수요반응 · 경제성 실적. DR 참여 인센티브·정산 금액 + 절감 비용 + 절감률 — 기간별/이벤트별 집계",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/43_dr_reliability_perf.png`,
        caption:
          "43 — 수요반응 · 신뢰성 실적. 목표 감축량 대비 실측 이행률 + 미달 이벤트 분석 + 다음 발령 대비 개선 제안",
        aspect: "wide",
      },
      // ── V2X (5)
      {
        src: `${ASSET}/solynx-ems/50_v2x_vehicle_data.png`,
        caption:
          "50 — V2X 차량 데이터. 등록 차량의 SOC/주행거리/충방전 이력 실시간 텔레메트리 + 차량별 통계",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/51_v2x_basic_info.png`,
        caption:
          "51 — V2X 기본 정보. 충전 스테이션·차량·소유자 마스터 — 스테이션 위치 (@react-google-maps/api) + 실시간 점유 상태",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/52_v2x_vehicle_info.png`,
        caption:
          "52 — V2X 차량 정보. 차종/배터리 용량/V2G 지원 여부 + 양방향 충방전(V2G/G2V) 전력 흐름 — reactflow 11 + react-flow-renderer 10",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/53_v2x_ownership_history.png`,
        caption:
          "53 — V2X 소유권 이력. 차량 소유주 이전·계약 변경 추적 + 충방전 권한 매핑 + 감사 로그",
        aspect: "wide",
      },
      {
        src: `${ASSET}/solynx-ems/54_v2x_maintain_info.png`,
        caption:
          "54 — V2X 정비 정보. 충전기/차량 점검 이력 + 다음 점검 예정 + 실시간 알람 (SSE)",
        aspect: "wide",
      },
    ],
    stats: [
      { label: "Repositories", value: "3" },
      { label: "Domains", value: "5 (재생/ESS/DR/V2X/AI)" },
      { label: "Chart libraries", value: "5+" },
      { label: "Screens", value: "32" },
    ],
  },
};

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}
