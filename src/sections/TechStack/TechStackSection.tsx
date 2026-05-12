import { useMemo, useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { useScrollScene } from "@/hooks/useScrollScene";
import KineticText from "@/components/KineticText";

function aggregateTech(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of PROJECTS) {
    for (const t of p.tech) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/**
 * TECH STACK 씬.
 * pin 동안 칩들이 무작위 시작점에서 그리드 위치로 모여드는 wave-in.
 */
export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const items = useMemo(() => aggregateTech(), []);

  useScrollScene(sectionRef, 200, (tl) => {
    tl
      .from(".stack-eyebrow", { opacity: 0, y: 30 }, 0)
      .from(
        ".stack-heading .kt-char",
        {
          opacity: 0,
          y: 40,
          rotateX: -60,
          stagger: 0.022,
          ease: "power3.out",
          transformPerspective: 800,
        },
        0.05,
      )
      .from(".stack-lede", { opacity: 0, y: 30 }, 0.18)
      .from(
        ".stack-chip",
        {
          opacity: 0,
          scale: 0.4,
          y: () => (Math.random() - 0.5) * 200,
          x: () => (Math.random() - 0.5) * 300,
          rotate: () => (Math.random() - 0.5) * 30,
          stagger: { each: 0.018, from: "random" },
        },
        0.2,
      );
  });

  return (
    <section
      id="tech-stack"
      data-section="tech-stack"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      <div className="container-x flex h-full flex-col justify-center py-16">
        <header className="mb-10 max-w-2xl">
          <p
            className="stack-eyebrow font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--text-muted)" }}
          >
            03 — Tech Stack
          </p>
          <h2
            className="stack-heading font-display mt-4 text-4xl font-bold sm:text-5xl"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            <KineticText text="실제 다룬 기술" charClassName="kt-char" />
          </h2>
          <p
            className="stack-lede mt-5 text-base leading-[1.7]"
            style={{ color: "var(--text-secondary)", wordBreak: "keep-all" }}
          >
            7개 프로젝트에 실제로 투입된 기술의 합집합입니다. 글자 크기는 사용 빈도를 나타냅니다.
          </p>
        </header>

        <ul className="flex flex-wrap gap-2 md:gap-3">
          {items.map((it) => {
            const scale = 1 + Math.min(it.count - 1, 5) * 0.12;
            const isHot = it.count >= 3;
            return (
              <li
                key={it.name}
                className="stack-chip rounded-full border px-3 py-1.5 font-mono text-sm"
                style={{
                  fontSize: `${scale}em`,
                  borderColor: isHot
                    ? "var(--border-accent)"
                    : "var(--border-subtle)",
                  background: isHot
                    ? "rgba(124,92,255,0.06)"
                    : "var(--bg-elevated)",
                  color: isHot
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                }}
              >
                {it.name}
                {it.count > 1 && (
                  <span
                    className="ml-2 text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ×{it.count}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
