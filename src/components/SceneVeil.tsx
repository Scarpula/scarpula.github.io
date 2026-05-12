import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SceneVeil — Hero → About 경계에서 화면 전체에 깔리는 색감 막.
 *
 * 자체 ScrollTrigger를 보유. Hero 핀의 70% ~ About 핀의 20% 사이에
 * fade-in → peak → fade-out 한 사이클을 재생.
 *
 * 외부 섹션 타임라인이 veil을 직접 만지지 않으므로 충돌 없음.
 */
export default function SceneVeil() {
  const veilRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!veilRef.current) return;
    const veil = veilRef.current;

    const ctx = gsap.context(() => {
      const heroEl = document.querySelector(
        '[data-section="hero"]',
      ) as HTMLElement | null;
      if (!heroEl) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          // Hero 섹션 박스를 기준점으로 하고 absolute scroll position 계산.
          // Hero 핀이 200vh 사용하므로 핀 끝은 heroTop + 200vh.
          // 70%(=1.4vh) ~ 120%(=2.4vh) 구간에서 veil 사이클 재생.
          trigger: heroEl,
          start: () =>
            `${heroEl.offsetTop + window.innerHeight * 1.4}px top`,
          end: () =>
            `${heroEl.offsetTop + window.innerHeight * 2.5}px top`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        veil,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 1,
          scale: 1.5,
          duration: 0.5,
          ease: "power2.in",
        },
      ).to(veil, {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
        ease: "power2.out",
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={veilRef}
      aria-hidden
      className="scene-veil pointer-events-none fixed inset-0 z-[40]"
      style={{
        opacity: 0,
        background:
          "radial-gradient(circle at 50% 50%, rgba(124,92,255,0.55), rgba(0,229,255,0.30) 35%, rgba(10,10,15,0) 75%)",
        mixBlendMode: "screen",
        willChange: "opacity, transform",
      }}
    />
  );
}
