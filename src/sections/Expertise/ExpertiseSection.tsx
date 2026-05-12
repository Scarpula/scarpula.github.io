import { useRef } from "react";
import { EXPERTISE } from "@/data/expertise";
import { useScrollScene } from "@/hooks/useScrollScene";
import KineticText from "@/components/KineticText";

/**
 * EXPERTISE 씬 — 오버플로우 방지 레이아웃.
 *
 * 100dvh 안에 6 카드가 모두 들어가야 하므로:
 *  - 카드 hero (1열, 2 col span) + 잔여 5개 (2col x ~3행) → 좁은 vh에서 잘림
 *  → hero 카드 가로 1열 + 나머지 5개 컴팩트 그리드(2/3/5열 반응형)로 변경
 *  - 본문/키워드 텍스트 사이즈 축소
 *  - py 줄임
 */
export default function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const heroCard = EXPERTISE.find((c) => c.hero);
  const subCards = EXPERTISE.filter((c) => !c.hero);

  useScrollScene(sectionRef, 200, (tl) => {
    tl
      .from(".exp-eyebrow", { opacity: 0, y: 20 }, 0)
      .from(
        ".exp-heading .kt-char",
        {
          opacity: 0,
          y: 36,
          rotateX: -60,
          stagger: 0.02,
          ease: "power3.out",
          transformPerspective: 800,
        },
        0.04,
      )
      .from(".exp-lede", { opacity: 0, y: 20 }, 0.16)

      // hero 카드 등장 — 발광 + 살짝 위에서 내려옴
      .from(
        ".exp-hero-card",
        { opacity: 0, y: 60, scale: 0.96 },
        0.15,
      )
      .to(
        ".exp-hero-card",
        { boxShadow: "0 0 60px rgba(124,92,255,0.35)" },
        0.35,
      )

      // sub 카드들 좌우 교차 슬라이드 인
      .from(
        ".exp-sub-card",
        {
          opacity: 0,
          y: 40,
          x: (i) => (i % 2 === 0 ? -40 : 40),
          stagger: 0.06,
        },
        0.32,
      );
  });

  return (
    <section
      id="expertise"
      data-section="expertise"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      <div className="container-x flex h-full flex-col justify-center py-10 md:py-12">
        {/* 헤더 — 컴팩트 */}
        <header className="mb-6 max-w-2xl md:mb-8">
          <p
            className="exp-eyebrow font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--text-muted)" }}
          >
            02 — Expertise
          </p>
          <h2
            className="exp-heading font-display mt-3 text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            <KineticText text="깊게 다룬 기술" charClassName="kt-char" />
          </h2>
          <p
            className="exp-lede mt-3 text-sm leading-[1.7] md:text-base"
            style={{
              color: "var(--text-secondary)",
              wordBreak: "keep-all",
            }}
          >
            중심 축은{" "}
            <strong style={{ color: "var(--accent-primary)" }}>
              에이전틱 AI 워크플로우 설계
            </strong>
            이고, 그 위로 풀스택 · 모바일 · IoT · 데이터 · 자동화가 균형 있게 쌓여 있습니다.
          </p>
        </header>

        {/* hero 카드 — 가로 폭 전체 */}
        {heroCard && (
          <article
            className="exp-hero-card relative mb-3 flex flex-col gap-2 rounded-[var(--radius-lg)] border p-4 md:flex-row md:items-start md:gap-5 md:p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.10), rgba(0,229,255,0.04))",
              borderColor: "var(--border-accent)",
            }}
          >
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)]"
              style={{
                background: "rgba(124,92,255,0.18)",
                color: "var(--accent-primary)",
              }}
            >
              <heroCard.icon size={18} strokeWidth={1.6} />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="font-display text-lg font-semibold md:text-xl"
                style={{ color: "var(--text-primary)" }}
              >
                {heroCard.title}
              </h3>
              <p
                className="mt-1.5 text-[13px] leading-[1.65] md:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {heroCard.description}
              </p>
            </div>

            <ul className="flex flex-wrap gap-1 font-mono text-[10px] uppercase tracking-[0.06em] md:max-w-[40%]">
              {heroCard.keywords.map((kw) => (
                <li
                  key={kw}
                  className="rounded-full border px-1.5 py-0.5"
                  style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-muted)",
                  }}
                >
                  {kw}
                </li>
              ))}
            </ul>
          </article>
        )}

        {/* sub 카드 5개 — 컴팩트 그리드 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {subCards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className="exp-sub-card relative flex flex-col rounded-[var(--radius-md)] border p-4"
                style={{
                  background: "var(--bg-elevated)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon size={14} strokeWidth={1.6} />
                </div>

                <h3
                  className="font-display mt-3 text-sm font-semibold leading-[1.25]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="mt-1.5 text-[12px] leading-[1.55]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {card.description}
                </p>

                <ul className="mt-3 flex flex-wrap gap-1 font-mono text-[9px] uppercase tracking-[0.06em]">
                  {card.keywords.slice(0, 4).map((kw) => (
                    <li
                      key={kw}
                      className="rounded-full border px-1.5 py-0.5"
                      style={{
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {kw}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
