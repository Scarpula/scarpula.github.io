import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Loader — door-split reveal 패턴.
 *
 * 흐름:
 *  1) 가운데에서 만난 상·하 패널이 화면 전체를 덮은 상태로 시작
 *  2) 가운데에 카운터 000 → 100, 브랜드 마크, 프로그레스 바
 *  3) 카운터 + (window.load) + (document.fonts.ready) 모두 완료되면
 *     상단 패널은 위로, 하단 패널은 아래로 expo.inOut으로 슬라이드
 *  4) 슬라이드 완료 시 onDone() 호출 → 외부에서 Hero 인트로 트리거
 *
 * 비대칭 속도: 상단(1.0s) > 하단(1.15s)으로 미세하게 시각 흐름 유도.
 */

interface LoaderProps {
  onDone: () => void;
  /** 카운터·로딩 표시 최소 시간 (ms). 자산 로드가 빨라도 이 시간은 보장. */
  minDuration?: number;
}

export default function Loader({ onDone, minDuration = 1700 }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 카운터 0 → 100
      const counterState = { val: 0 };
      gsap.to(counterState, {
        val: 100,
        duration: minDuration / 1000,
        ease: "power1.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(
              Math.floor(counterState.val),
            ).padStart(3, "0");
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counterState.val / 100})`;
          }
        },
      });

      // 모든 자산 로드 완료 신호 모음
      const minDelay = new Promise<void>((r) => setTimeout(r, minDuration));
      const windowLoad: Promise<void> =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((r) => {
              const fn = () => {
                window.removeEventListener("load", fn);
                r();
              };
              window.addEventListener("load", fn);
            });
      const fontsReady = document.fonts
        ? document.fonts.ready.then(() => undefined)
        : Promise.resolve();

      Promise.all([minDelay, windowLoad, fontsReady]).then(() => {
        // 도어 오픈 시퀀스
        const tl = gsap.timeline({
          onComplete: () => {
            setHidden(true); // pointer-events 차단도 풀림
            onDone();
          },
        });
        // 1) 가운데 컨텐츠 사라짐
        tl.to(
          contentRef.current,
          {
            opacity: 0,
            y: -16,
            duration: 0.4,
            ease: "power2.in",
          },
          0,
        );
        // 2) 상단 패널 위로
        tl.to(
          topRef.current,
          {
            yPercent: -100,
            duration: 1.0,
            ease: "expo.inOut",
          },
          0.18,
        );
        // 3) 하단 패널 아래로 — 살짝 더 느리게 (비대칭)
        tl.to(
          bottomRef.current,
          {
            yPercent: 100,
            duration: 1.15,
            ease: "expo.inOut",
          },
          0.18,
        );
      });
    });
    return () => ctx.revert();
  }, [minDuration, onDone]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="loader-root fixed inset-0 z-[200]"
      style={{ pointerEvents: hidden ? "none" : "auto" }}
    >
      {/* 상단 패널 */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 will-change-transform"
        style={{
          background: "var(--bg-base)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      {/* 하단 패널 */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 will-change-transform"
        style={{ background: "var(--bg-base)" }}
      />

      {/* 가운데 컨텐츠 — z-index 두 패널 위 */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <p
          className="font-mono text-[10px] uppercase tracking-[0.5em]"
          style={{ color: "var(--text-muted)" }}
        >
          Scarpula · Portfolio · 2026
        </p>

        <span
          ref={counterRef}
          className="font-display mt-8 text-7xl font-bold tabular-nums sm:text-8xl"
          style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          000
        </span>

        {/* 프로그레스 바 */}
        <div
          className="mt-10 h-px w-40 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <span
            ref={barRef}
            className="block h-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-primary), var(--accent-glow))",
              transform: "scaleX(0)",
              willChange: "transform",
            }}
          />
        </div>

        <p
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em]"
          style={{ color: "var(--text-muted)" }}
        >
          Loading the experience
        </p>
      </div>
    </div>
  );
}
