import { useMemo, useRef } from "react";
import { useScrollScene } from "@/hooks/useScrollScene";
import KineticText from "@/components/KineticText";

const PARAGRAPHS: string[] = [
  "모바일 SaaS, 입찰 분석 AI, IoT 운영 플랫폼, 신재생 EMS 콘솔, ERP 재고관리 ― 도메인은 달라도 공통점은 하나입니다. 모두 \"에이전트와 도구가 함께 작동하는 시스템\"으로 설계했습니다.",
  "Claude Code 서브에이전트, MCP 생태계, OpenAI Realtime API, pgvector RAG, 비동기 워커 파이프라인 ― 단일 호출이 아니라 계층화된 에이전트 흐름을 다루는 데 특화되어 있습니다.",
  "프론트는 React 18 + Tailwind v4 + 토큰 시스템, 모바일은 Flutter 3 + Clean Architecture, 데이터는 Supabase + PostgreSQL + pgvector ― 모든 레이어를 직접 다룰 수 있어야 시스템 전체를 책임질 수 있다고 봅니다.",
];

/**
 * ABOUT 씬.
 *
 * 시네마틱 트랜지션 (Hero → About):
 *  - 0 ~ 0.18: 베일이 페이드아웃, 동시에 본 섹션이 clip-path 원형 reveal
 *              + 헤딩이 거대한 블러/스케일 상태에서 punch-in
 *  - 0.18 ~ 0.95: 단어 단위 cascade reveal
 *  - 0.95 ~ 1: 위로 사라지며 다음 씬 준비
 */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const wordGroups = useMemo(
    () => PARAGRAPHS.map((p) => p.split(/(\s+)/)),
    [],
  );

  useScrollScene(sectionRef, 220, (tl) => {
    tl
      // ── Baseline (round-trip 안정화) ──
      .set(".about-content", { y: 0, opacity: 1 }, 0)
      .set(".about-heading-wrap", { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }, 0)
      .set(".about-heading-wrap .kt-char", { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }, 0)
      .set(".about-word", { opacity: 1, y: 0 }, 0)
      .set(".about-eyebrow", { opacity: 1, y: 0 }, 0)

      // ── Phase 0 (0 ~ 0.18): TRANSITION — iris reveal + heading punch-in ──
      .fromTo(
        ".about-iris",
        { clipPath: "circle(8% at 50% 50%)" },
        { clipPath: "circle(150% at 50% 50%)", ease: "power2.out" },
        0,
      )
      // heading 자체는 살짝 punch-in (전체)
      .fromTo(
        ".about-heading-wrap",
        {
          scale: 1.4,
          filter: "blur(8px)",
          opacity: 0,
        },
        {
          scale: 1,
          filter: "blur(0px)",
          opacity: 1,
          ease: "power3.out",
        },
        0.02,
      )
      // ★ Kinetic — heading 글자 단위 cascade (강한 임팩트)
      .from(
        ".about-heading-wrap .kt-char",
        {
          opacity: 0,
          y: 50,
          rotateX: -75,
          filter: "blur(10px)",
          stagger: 0.022,
          ease: "power3.out",
          transformPerspective: 800,
        },
        0.04,
      )
      .from(".about-eyebrow", { opacity: 0, y: 20 }, 0.08)

      // ── Phase 1 (0.18 ~ 0.95): 단어 cascade ──
      .from(
        ".about-word",
        {
          opacity: 0.06,
          y: 14,
          stagger: { each: 0.011, from: "start" },
        },
        0.18,
      )

      // ── Phase 2 (0.92 ~ 1.0): 살짝 위로 사라지기 ──
      .to(".about-content", { y: -50, opacity: 0.5 }, 0.92);
  });

  return (
    <section
      id="about"
      data-section="about"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      {/* iris reveal 레이어 — 모든 본문이 이 안에 담긴다 */}
      <div
        className="about-iris absolute inset-0"
        style={{
          clipPath: "circle(150% at 50% 50%)",
          willChange: "clip-path",
        }}
      >
        {/* 미세 배경 글로우 */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 60%, rgba(124,92,255,0.10), transparent 70%)",
          }}
        />

        <div className="container-x flex h-full items-center">
          <div className="grid w-full gap-12 md:grid-cols-12">
            <header className="md:col-span-4">
              <p
                className="about-eyebrow font-mono text-xs uppercase tracking-[0.3em]"
                style={{ color: "var(--text-muted)" }}
              >
                01 — About
              </p>
              <div className="about-heading-wrap mt-4">
                <h2
                  className="font-display text-4xl font-bold leading-[1.08] sm:text-5xl"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    wordBreak: "keep-all",
                  }}
                >
                  <KineticText
                    text="도구가 아닌"
                    className="block"
                    charClassName="kt-char"
                  />
                  <KineticText
                    text="시스템을 만든다"
                    className="block"
                    charClassName="kt-char"
                  />
                </h2>
              </div>
            </header>

            <div className="about-content md:col-span-7 md:col-start-6 space-y-7 text-base leading-[1.9] sm:text-lg">
              {wordGroups.map((words, pi) => (
                <p
                  key={pi}
                  style={{
                    color: "var(--text-secondary)",
                    wordBreak: "keep-all",
                  }}
                >
                  {words.map((w, wi) =>
                    /^\s+$/.test(w) ? (
                      <span key={wi}>{w}</span>
                    ) : (
                      <span key={wi} className="about-word inline-block">
                        {w}
                      </span>
                    ),
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
