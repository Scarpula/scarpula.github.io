import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Database,
  Cpu,
  LayoutDashboard,
  Smartphone,
  Workflow,
} from "lucide-react";

export interface ExpertiseCard {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  keywords: string[];
  /** 메인 셀링 포인트인지 여부 — 카드 강조용 */
  hero?: boolean;
}

export const EXPERTISE: ExpertiseCard[] = [
  {
    id: "agentic-ai",
    icon: Bot,
    title: "Agentic AI Workflow Architecture",
    description:
      "Claude Code 서브에이전트, MCP 생태계, 멀티 에이전트 오케스트레이션을 실 서비스에 적용합니다. 단순한 프롬프트가 아니라 에이전트 · 도구 · 메모리 · 정책을 묶는 시스템을 설계해 왔습니다.",
    keywords: [
      "Claude Code",
      "Sub-agents",
      "MCP",
      "Skills",
      "OpenAI Realtime",
      "RAG / pgvector",
      "Tool Use",
    ],
    hero: true,
  },
  {
    id: "fullstack-frontend",
    icon: LayoutDashboard,
    title: "Production-grade Frontend",
    description:
      "React 18 · Vite 6 · TypeScript 위에 디자인 시스템 · 상태 관리 · 서버 상태 · 접근성까지 챙긴 SaaS 프론트엔드를 만듭니다. Tailwind v4 + 토큰 시스템을 표준으로 사용합니다.",
    keywords: ["React 18", "TypeScript", "Tailwind v4", "Zustand", "TanStack Query", "Vite"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Cross-platform Mobile",
    description:
      "Flutter Clean Architecture, BLoC + Riverpod, GoRouter, GetIt + Injectable 조합으로 iOS · Android · Web · Windows 멀티 타겟 빌드를 v3 까지 안정적으로 운영해 왔습니다.",
    keywords: ["Flutter 3.16+", "Dart", "BLoC", "Riverpod", "Material 3", "Multi-platform"],
  },
  {
    id: "iot",
    icon: Cpu,
    title: "IoT & Realtime Systems",
    description:
      "IoT 센서, 키오스크, QR 게이트, 모바일 앱을 하나의 백엔드로 묶은 다중 컴포넌트 운영 플랫폼을 다룹니다. 실시간 스트림과 시계열 처리까지 함께 챙깁니다.",
    keywords: ["IoT", "WebSocket", "MQTT", "Time-series", "Kiosk", "QR Auth"],
  },
  {
    id: "data",
    icon: Database,
    title: "Data Pipeline & Storage",
    description:
      "Supabase (PostgreSQL + RLS + pgvector + pgmq + Storage) 와 TimescaleDB 시계열 적재, 크롤러 · CLI · Cron 자동화로 안정적인 데이터 흐름을 설계합니다.",
    keywords: ["Supabase", "PostgreSQL", "TimescaleDB", "pgvector", "pgmq", "Crawler"],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Build & Automation",
    description:
      "GitHub Actions 기반 빌드타임 데이터 페치, 일일 재빌드, 배포 자동화를 구축합니다. PowerShell prod 스크립팅과 Cron + Heartbeat 이중화 알림까지 함께 운영합니다.",
    keywords: ["GitHub Actions", "Vercel / Cloudflare", "Cron", "PowerShell", "CI/CD"],
  },
];
