import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "@/components/ProjectDetail";
import FlyingCard, { type FlyOriginRect } from "@/components/FlyingCard";
import KineticText from "@/components/KineticText";

/**
 * 카드 클릭 → 상세 페이지 트랜지션 phase 머신
 *
 *   idle    → 평소 카드 그리드
 *   flying  → 클릭한 카드 클론이 viewport 중앙으로 이동하면서 Y축 360° 3D 플립 (1s)
 *             그대로 중앙에 1초 정지
 *   open    → 풀스크린 ProjectDetail 모달이 중앙에서 펼쳐짐
 */
type Phase = "idle" | "flying" | "open";

const FLY_DURATION_MS = 1000; // 회전+이동
const HOLD_DURATION_MS = 1000; // 중앙 정지
const TOTAL_PRE_OPEN_MS = FLY_DURATION_MS + HOLD_DURATION_MS;

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleSlideRef = useRef<HTMLDivElement>(null);

  // 카드 → 상세 트랜지션 상태
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [origin, setOrigin] = useState<FlyOriginRect | null>(null);
  const phaseTimerRef = useRef<number | null>(null);

  const activeProject = activeSlug
    ? PROJECTS.find((p) => p.slug === activeSlug) ?? null
    : null;

  const handleOpen = useCallback((slug: string, rect: FlyOriginRect) => {
    setActiveSlug(slug);
    setOrigin(rect);
    setPhase("flying");
    if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    phaseTimerRef.current = window.setTimeout(() => {
      setPhase("open");
    }, TOTAL_PRE_OPEN_MS);
  }, []);

  const handleClose = useCallback(() => {
    if (phaseTimerRef.current) {
      window.clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
    setPhase("idle");
    setActiveSlug(null);
    setOrigin(null);
  }, []);

  useEffect(() => {
    return () => {
      if (phaseTimerRef.current) window.clearTimeout(phaseTimerRef.current);
    };
  }, []);

  // 트랜지션 동안 Lenis 정지 + body 스크롤 잠금
  useEffect(() => {
    const lenis = (
      window as unknown as { __lenis?: { stop: () => void; start: () => void } }
    ).__lenis;
    const isLocked = phase !== "idle";
    if (isLocked) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track = trackRef.current!;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 1.2}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 타이틀 진입 — kinetic cascade. 섹션 진입 시 한 번 재생.
      gsap.from(titleSlideRef.current?.querySelectorAll(".kt-char") ?? [], {
        opacity: 0,
        y: 40,
        rotateX: -60,
        stagger: 0.03,
        ease: "power3.out",
        transformPerspective: 800,
        duration: 0.9,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 타이틀 보조 텍스트 (label + 설명) — kinetic 직후 페이드인
      gsap.from(
        titleSlideRef.current?.querySelectorAll(".title-fade") ?? [],
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          ease: "power2.out",
          duration: 0.7,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 카드 미세 진입 — 가로 스크롤에 종속
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card) => {
        gsap.fromTo(
          card,
          { rotate: -2, scale: 0.94 },
          {
            rotate: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "left center",
              scrub: true,
            },
          },
        );
      });

      // 타이틀 슬라이드가 viewport 중앙을 지날 때 살짝 페이드/축소 — 부드럽게 사라지는 느낌
      gsap.to(titleSlideRef.current, {
        opacity: 0.35,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: titleSlideRef.current,
          containerAnimation: horizontalTween,
          start: "right 80%",
          end: "right left",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projects"
        data-section="projects"
        ref={sectionRef}
        className="relative h-[100dvh] w-full overflow-hidden"
      >
        {/* 가로 트랙 — 첫 슬라이드는 타이틀, 이후 카드들 */}
        <div className="absolute inset-0 flex items-center">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-6 pr-[10vw]"
            style={{ willChange: "transform" }}
          >
            {/* ─── 타이틀 슬라이드 (첫 100vw) ─── */}
            <div
              ref={titleSlideRef}
              className="flex h-full w-screen flex-shrink-0 items-center px-[max(var(--gutter),12vw)]"
            >
              <div className="max-w-3xl">
                <p
                  className="title-fade font-mono text-xs uppercase tracking-[0.3em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  04 — Projects
                </p>
                <h2
                  className="font-display mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    wordBreak: "keep-all",
                  }}
                >
                  <KineticText
                    text="만들어 온 시스템 7개"
                    charClassName="kt-char"
                  />
                </h2>
                <p
                  className="title-fade mt-8 max-w-xl text-base leading-[1.85] sm:text-lg"
                  style={{
                    color: "var(--text-secondary)",
                    wordBreak: "keep-all",
                  }}
                >
                  개인 SaaS 3개와 다중 컴포넌트로 구성된 운영 시스템 4개. 모두 vibe coding 으로 만든 실 운영 · 배포 시스템입니다.{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    카드를 클릭
                  </strong>
                  하시면 상세 페이지로 확장됩니다.
                </p>
                <p
                  className="title-fade mt-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--accent-glow)" }}
                >
                  <span
                    className="h-px w-10"
                    style={{ background: "var(--accent-glow)" }}
                  />
                  Scroll →
                </p>
              </div>
            </div>

            {/* ─── 프로젝트 카드들 ─── */}
            {PROJECTS.map((p, i) => (
              <div
                key={p.slug}
                className="proj-card w-[88vw] shrink-0 sm:w-[60vw] md:w-[44vw] lg:w-[36vw] xl:w-[30vw]"
              >
                <ProjectCard
                  project={p}
                  index={i}
                  onOpen={handleOpen}
                  isHidden={phase !== "idle" && activeSlug === p.slug}
                />
              </div>
            ))}

            <div className="w-[6vw] shrink-0" aria-hidden />
          </div>
        </div>

        {/* 인디케이터 */}
        <div
          className="absolute bottom-10 right-[var(--gutter)] font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "var(--text-muted)" }}
        >
          ← Scroll →
        </div>
      </section>

      {/* ─── 트랜지션 오버레이 ─── */}

      {/* Phase 1·2: 카드 한 바퀴 3D 플립 + 중앙 이동 */}
      <AnimatePresence>
        {phase === "flying" && activeProject && origin && (
          <FlyingCard
            key={`fly-${activeProject.slug}`}
            project={activeProject}
            origin={origin}
          />
        )}
      </AnimatePresence>

      {/* Phase 3: 풀스크린 상세 모달 */}
      <AnimatePresence mode="wait">
        {phase === "open" && activeProject && (
          <ProjectDetail
            key={activeProject.slug}
            project={activeProject}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}
