import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * 상단 진행 바 + 좌측 섹션 도트.
 *
 * 진행 바: window.scrollY / docHeight 기반 단순 비율
 * 도트 활성화: 각 섹션마다 ScrollTrigger.create로 viewport 가운데에 들어왔을 때 onEnter
 *   pin-spacer가 wrap되어 element.offsetTop이 부정확하므로 이 방식이 정확.
 */
const SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "tech-stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // 진행 바
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, window.scrollY / max));
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 도트 — ScrollTrigger.create 로 정확 추적
  useEffect(() => {
    let triggers: ScrollTrigger[] = [];

    // ScrollProvider 의 refresh(100ms) 후에 attach
    const handle = setTimeout(() => {
      triggers = SECTIONS.map((s, i) =>
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: ({ isActive }) => {
            if (isActive) setActiveIdx(i);
          },
        }),
      );
    }, 250);

    return () => {
      clearTimeout(handle);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // GSAP 트리 흔들기 방지 (named import 유지)
  useEffect(() => {
    void gsap;
  }, []);

  return (
    <>
      {/* 상단 진행 바 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px]"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-primary), var(--accent-glow))",
            transform: "scaleX(0)",
            transition: "transform 80ms linear",
          }}
        />
      </div>

      {/* 좌측 섹션 도트 */}
      <ul
        aria-label="Section navigation"
        className="pointer-events-auto fixed left-6 top-1/2 z-[100] hidden -translate-y-1/2 flex-col gap-3 md:flex"
      >
        {SECTIONS.map((s, i) => (
          <li key={s.id} data-active={i === activeIdx} className="group">
            <a
              href={`#${s.id}`}
              className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]"
              style={{ transition: "color var(--dur-fast)" }}
            >
              <span
                className="block h-[2px] transition-all duration-[var(--dur-base)]"
                style={{
                  width: i === activeIdx ? "32px" : "16px",
                  background:
                    i === activeIdx
                      ? "var(--accent-glow)"
                      : "var(--text-muted)",
                }}
              />
              <span
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  color:
                    i === activeIdx
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                }}
              >
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
