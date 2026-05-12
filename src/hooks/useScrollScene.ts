import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";

/**
 * 한 섹션을 "씬(scene)"으로 만드는 훅.
 *
 * - 컨테이너를 pin 처리해서 스크롤해도 화면에 고정
 * - 그동안 callback 안에서 정의한 GSAP 타임라인이 scrub으로 재생
 * - 섹션 끝나면 다음 섹션이 자연스럽게 진입
 *
 * @param ref      pin 대상 컨테이너 ref
 * @param duration "이 씬이 차지할 스크롤 거리" — vh 단위 (예: 200 = 2배 viewport)
 * @param build    timeline에 동작 추가하는 콜백
 */
export function useScrollScene(
  ref: RefObject<HTMLElement | null>,
  duration: number,
  build: (tl: gsap.core.Timeline) => void,
) {
  // build는 매 렌더 새 함수 — ref로 최신 값을 보존하면서 effect는 1회만
  const buildRef = useRef(build);
  buildRef.current = build;

  // useLayoutEffect로 ScrollTrigger 등록을 paint 이전에 마쳐
  // ScrollProvider의 refresh와 타이밍을 맞춤.
  useLayoutEffect(() => {
    if (!ref.current) return;
    const target = ref.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: "top top",
          // ScrollTrigger의 `end` 문자열은 vh 단위를 파싱하지 못하므로
          // 함수로 동적 계산 — 리사이즈 시 invalidate되어 재산출.
          end: () => `+=${(duration / 100) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      buildRef.current(tl);
    }, target);

    return () => ctx.revert();
  }, [ref, duration]);
}
