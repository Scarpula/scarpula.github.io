import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useScrollScene } from "@/hooks/useScrollScene";
import DecryptText, { type DecryptTextHandle } from "@/components/DecryptText";

/**
 * HERO 씬 — 영상 + Cursor Spotlight Reveal + Kinetic Typography.
 *
 * 레이어 (z-index 안쪽이 깊음):
 *   .hero-media : 영상 (또는 CSS 폴백 그라디언트)
 *   .hero-mask  : 다크 오버레이 + 커서 위치에 투명한 원형 hole
 *   .hero-grid  : 라인 그리드
 *   .hero-noise : 노이즈 그레인
 *   content     : 타이틀 / sub / scroll hint
 *
 * 인트로: Loader 종료 후 글자 cascade
 *
 * Scroll (220vh pin):
 *   Phase 1 (0~0.4): 영상 살짝 확대·하강 (scale 1 → 1.3, y → 15vh)
 *   Phase 2 (0.4~0.7): 영상 가속 줌 (scale 1.7, y → 40vh)
 *   Phase 3 (0.7~1.0): WARP DIVE — 영상 폭주 줌 + 페이드, 글자 disintegrate
 *
 * Ambient:
 *   - 마우스 위치 → CSS 변수 --mx/--my 업데이트 → 마스크 hole 따라감
 *   - 마우스 패럴럭스 (영상 컨테이너 ±20px)
 *   - 노이즈 그레인 깜빡임
 */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  // 두 줄 디크립트 컨트롤러 ref — Loader 종료 시 .play() 호출
  const decrypt1Ref = useRef<DecryptTextHandle>(null);
  const decrypt2Ref = useRef<DecryptTextHandle>(null);

  // ── 인트로 ──
  // 두 줄 타이틀은 DecryptText 가 자체 opacity:0 + 스크램블 morph 로 처리.
  // eyebrow / sub / scroll-hint 는 gsap 로 간단한 페이드 인.
  // FOUC 방지는 global.css 의 `main[data-app-ready="false"] .kt-char ...` 규칙이 담당.
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // 1단계 — paint 전 동기적으로 보조 텍스트 숨김 (gsap.set inline 으로 박아둠)
    const hideCtx = gsap.context(() => {
      gsap.set(".hero-eyebrow", { opacity: 0, y: 16 });
      gsap.set(".hero-sub", { opacity: 0, y: 24 });
      gsap.set(".hero-scroll-hint", { opacity: 0 });
    }, el);

    // 2단계 — Loader 완료 시 인트로
    const runIntro = () => {
      const ctx = gsap.context(() => {
        gsap.to(".hero-eyebrow", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        // 두 줄 디크립트 — eyebrow 직후 살짝 지연시켜 시선 유도
        window.setTimeout(() => {
          decrypt1Ref.current?.play();
        }, 220);
        window.setTimeout(() => {
          decrypt2Ref.current?.play();
        }, 520);

        gsap.to(".hero-sub", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 1.5,
        });

        gsap.to(".hero-scroll-hint", {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.9,
        });
      }, el);
      return () => ctx.revert();
    };

    let introCleanup: (() => void) | undefined;

    if (document.documentElement.dataset.appReady === "true") {
      introCleanup = runIntro();
    } else {
      const handler = () => {
        introCleanup = runIntro();
      };
      window.addEventListener("app:ready", handler, { once: true });
      return () => {
        window.removeEventListener("app:ready", handler);
        introCleanup?.();
        hideCtx.revert();
      };
    }
    return () => {
      introCleanup?.();
      hideCtx.revert();
    };
  }, []);

  // ── Cursor Spotlight: mask hole이 마우스 따라감 ──
  // CSS 변수로 직접 업데이트 (GSAP 매 프레임 오버헤드 X). 60fps 부드러움 보장.
  useEffect(() => {
    const mask = maskRef.current;
    if (!mask) return;

    // 초기 중앙
    mask.style.setProperty("--mx", "50%");
    mask.style.setProperty("--my", "40%");

    const onMove = (e: PointerEvent) => {
      mask.style.setProperty("--mx", `${e.clientX}px`);
      mask.style.setProperty("--my", `${e.clientY}px`);
    };
    // touch fallback
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mask.style.setProperty("--mx", `${t.clientX}px`);
      mask.style.setProperty("--my", `${t.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // ── 영상 seamless loop: 두 video element 교차 페이드 ──
  // 단일 video의 loop 속성은 끝-시작 사이에 hard cut이 보이는 한계가 있음.
  // A/B 두 video를 동시에 두고 끝나기 직전 inactive를 0초부터 재생 + opacity 교차 0.5s.
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    const FADE = 0.6; // 끝나기 N초 전부터 crossfade 시작 (s)

    let active = a;
    let inactive = b;
    let scheduled = false;

    const handleEnded = (el: HTMLVideoElement) => () => {
      // 안전망 — duration 메타데이터 늦게 도착하는 경우 ended로도 잡힘
      el.currentTime = 0;
    };

    const onTimeUpdate = () => {
      if (scheduled) return;
      const dur = active.duration;
      if (!dur || isNaN(dur)) return;

      const remaining = dur - active.currentTime;
      if (remaining <= FADE) {
        scheduled = true;
        // inactive 0초부터 재생 시작
        inactive.currentTime = 0;
        const playPromise = inactive.play();
        if (playPromise) playPromise.catch(() => {});

        // 교차 페이드
        gsap.to(active, {
          opacity: 0,
          duration: FADE,
          ease: "power2.inOut",
        });
        gsap.to(inactive, {
          opacity: 1,
          duration: FADE,
          ease: "power2.inOut",
          onComplete: () => {
            // 역할 교대 + 이전 active 정지·리셋
            const old = active;
            active = inactive;
            inactive = old;
            old.pause();
            old.currentTime = 0;
            scheduled = false;
          },
        });
      }
    };

    a.addEventListener("timeupdate", onTimeUpdate);
    b.addEventListener("timeupdate", onTimeUpdate);
    a.addEventListener("ended", handleEnded(a));
    b.addEventListener("ended", handleEnded(b));

    // 초기: A 재생 / B 대기
    a.style.opacity = "1";
    b.style.opacity = "0";
    const init = a.play();
    if (init) init.catch(() => {});

    return () => {
      a.removeEventListener("timeupdate", onTimeUpdate);
      b.removeEventListener("timeupdate", onTimeUpdate);
      a.pause();
      b.pause();
    };
  }, []);

  // ── 마우스 패럴럭스 (영상 래퍼) ──
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(".hero-parallax", {
        x,
        y,
        duration: 1.4,
        ease: "power2.out",
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // ── 스크롤 타임라인 ──
  useScrollScene(sectionRef, 220, (tl) => {
    tl
      // ── Baseline (round-trip 안정화) ──
      //   ⚠️ opacity 는 의도적으로 제외 — DecryptText 가 자체적으로 글자 표시를
      //   제어하므로, ScrollTrigger 가 활성화될 때 opacity:1 을 강제로 박으면
      //   디크립트 직전 글자가 모두 노출되어 FOUC 가 다시 발생함.
      //   transform / filter 만 baseline 으로 잡고 opacity 는 Phase 3 의 .to()
      //   가 자연스럽게 라운드-트립으로 처리.
      .set(
        ".kt-line-1 .kt-char, .kt-line-2 .kt-char",
        {
          y: 0,
          x: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          filter: "blur(0px)",
        },
        0,
      )
      .set(
        ".hero-media",
        { scale: 1, y: 0, opacity: 1, filter: "blur(0px)" },
        0,
      )
      .set(".hero-grid", { scale: 1, opacity: 0.3, filter: "blur(0px)" }, 0)
      .set(".kt-title-wrap", { y: 0, scale: 1 }, 0)
      .set(".hero-eyebrow, .hero-sub, .hero-scroll-hint", { opacity: 1, y: 0 }, 0)

      // ── Phase 1 (0 ~ 0.4) — 영상 살짝 확대·하강 ──
      .to(".hero-media", { scale: 1.3, y: "15vh" }, 0)
      .to(".hero-grid", { opacity: 0.55, scale: 1.7 }, 0)
      .to(".hero-eyebrow", { y: -30, opacity: 0 }, 0.05)
      .to(".kt-title-wrap", { y: -50, scale: 0.92 }, 0.0)
      .to(".hero-sub", { opacity: 0, y: -40 }, 0.4)
      .to(".hero-scroll-hint", { opacity: 0 }, 0.05)

      // ── Phase 2 (0.4 ~ 0.7) ──
      .to(".hero-media", { scale: 1.7, y: "40vh" }, 0.4)
      .to(".hero-grid", { scale: 3.2, opacity: 0.3 }, 0.4)
      .to(".kt-title-wrap", { y: -120, scale: 0.7 }, 0.4)

      // ── Phase 3 (0.7 ~ 1.0): WARP DIVE ──
      .to(
        ".hero-media",
        {
          scale: 2.6,
          y: "75vh",
          opacity: 0.0,
          filter: "blur(14px)",
        },
        0.7,
      )
      .to(".hero-grid", { scale: 5, opacity: 0, filter: "blur(8px)" }, 0.7)
      .to(
        ".kt-line-1 .kt-char",
        {
          y: -200,
          rotateX: 90,
          rotateZ: () => (Math.random() - 0.5) * 60,
          filter: "blur(12px)",
          opacity: 0,
          stagger: { each: 0.012, from: "random" },
          transformPerspective: 800,
          ease: "power2.in",
        },
        0.7,
      )
      .to(
        ".kt-line-2 .kt-char",
        {
          y: -260,
          scale: 0.4,
          rotateX: -90,
          rotateZ: () => (Math.random() - 0.5) * 80,
          filter: "blur(16px)",
          opacity: 0,
          stagger: { each: 0.015, from: "random" },
          transformPerspective: 800,
          ease: "power2.in",
        },
        0.72,
      );
  });

  return (
    <section
      id="hero"
      data-section="hero"
      ref={sectionRef}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      {/* ─── 1. 영상 레이어 (또는 CSS 폴백) ─── */}
      <div className="hero-parallax absolute inset-0 -z-20 will-change-transform">
        <div className="hero-media absolute inset-0 will-change-transform">
          {/* CSS 폴백 — 영상 파일 없을 때도 보이도록 */}
          <div
            className="hero-media-fallback absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #1a0d3a 0%, #0a2840 35%, #2a0a35 70%, #0a1a3a 100%)",
              animation:
                "hero-media-shift 18s ease-in-out infinite alternate",
            }}
          />
          {/* 실제 영상 — public/hero-bg.mp4 에 파일 두면 자동 활성화.
              loop 속성 대신 두 element를 crossfade하여 seam 없이 무한 재생. */}
          <video
            ref={videoARef}
            className="hero-video hero-video-a absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{ willChange: "opacity" }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
          <video
            ref={videoBRef}
            className="hero-video hero-video-b absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            style={{ willChange: "opacity", opacity: 0 }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            <source src="/hero-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* ─── 2. Spotlight Mask: 다크 오버레이 + 커서 위치 hole ───
          - 바깥(=마스크 표시 영역): 완전 불투명 다크로 영상 차단
          - 안쪽(=마스크 미표시 영역): 영상 그대로 노출
          - 가운데 클리어 영역을 충분히 크게 + 가장자리만 빠르게 페이드해서
            spotlight 콘트라스트를 강하게 살림. */}
      <div
        ref={maskRef}
        aria-hidden
        className="hero-mask absolute inset-0 -z-10"
        style={{
          // 바깥 영역은 완전 불투명 다크 — 영상이 일절 안 보이게 차단
          background: "var(--bg-base)",
          // 가운데 380px 반경 hole — 50%까지는 완전 투명, 그 이후 부드러운 페이드
          WebkitMaskImage:
            "radial-gradient(circle 380px at var(--mx, 50%) var(--my, 40%), transparent 0%, transparent 50%, rgba(0,0,0,0.85) 80%, black 100%)",
          maskImage:
            "radial-gradient(circle 380px at var(--mx, 50%) var(--my, 40%), transparent 0%, transparent 50%, rgba(0,0,0,0.85) 80%, black 100%)",
        }}
      />

      {/* ─── 3. 라인 그리드 ─── */}
      <div
        className="hero-grid absolute inset-0 -z-[5] opacity-30 will-change-transform"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* ─── 4. 노이즈 ─── */}
      <div
        aria-hidden
        className="hero-noise pointer-events-none absolute inset-0 -z-[4]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          mixBlendMode: "overlay",
          opacity: 0.35,
        }}
      />

      {/* ─── 5. 컨텐츠 ─── */}
      <div className="relative flex h-full items-center">
        <div className="container-x">
          <p
            className="hero-eyebrow font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "var(--text-muted)" }}
          >
            Portfolio · 2026
          </p>

          <h1
            className="kt-title-wrap font-display mt-6 max-w-[14ch] text-balance text-5xl font-bold leading-[1.06] sm:text-7xl md:text-[6.5rem]"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.015em",
              transformOrigin: "left center",
              wordBreak: "keep-all",
            }}
          >
            <DecryptText
              ref={decrypt1Ref}
              text="에이전틱 AI 시대의"
              className="block kt-line-1"
              charClassName="kt-char"
              stagger={55}
              scrambleDuration={620}
              scrambleTick={55}
            />
            <span className="block kt-line-2 kt-gradient-line">
              <DecryptText
                ref={decrypt2Ref}
                text="풀스택 엔지니어"
                charClassName="kt-char"
                stagger={70}
                scrambleDuration={720}
                scrambleTick={50}
              />
            </span>
          </h1>

          <p
            className="hero-sub mt-10 max-w-[46ch] text-base leading-[1.85] sm:text-lg"
            style={{ color: "var(--text-secondary)", wordBreak: "keep-all" }}
          >
            멀티 에이전트 워크플로우 설계부터 IoT · 모바일 · SaaS 구현까지,
            <br />
            Claude Code · MCP · Flutter · React 위에서 7개의 시스템을 만들었습니다.
          </p>
        </div>
      </div>

      {/* 하단 스크롤 힌트 */}
      <div
        className="hero-scroll-hint pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em]"
        style={{ color: "var(--text-muted)" }}
      >
        <span>Move cursor</span>
        <span className="block h-[1px] w-12 bg-[var(--text-muted)]" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
