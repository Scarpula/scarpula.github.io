import { useLayoutEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis와 GSAP가 동일한 transform 모드의 pin을 사용하도록 구성.
// fixed pin은 Lenis의 wrapper 위치 변경과 충돌해 자주 어긋난다.
ScrollTrigger.config({
  ignoreMobileResize: true,
});
ScrollTrigger.defaults({
  pinType: "transform",
});

/**
 * 사이트 전체를 감싸는 스크롤 프로바이더.
 *
 * 핵심: Lenis는 RAF 기반 부드러운 스크롤을 구현하고,
 * GSAP ScrollTrigger는 pin/scrub 타임라인을 운영한다.
 * 두 시스템 사이의 동기화는:
 *   1) Lenis가 스크롤할 때마다 ScrollTrigger.update() 호출
 *   2) GSAP ticker로 Lenis.raf 구동
 *   3) 모든 pin 등록 후 ScrollTrigger.refresh()로 재측정
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  // 자식 컴포넌트의 useLayoutEffect보다 먼저 실행되도록 Provider도 LayoutEffect 사용.
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Lenis 스크롤 이벤트로 ScrollTrigger 갱신
    const scrollHandler = () => ScrollTrigger.update();
    lenis.on("scroll", scrollHandler);

    if (import.meta.env.DEV) {
      (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    }

    document.documentElement.classList.add("lenis", "lenis-smooth");

    // 자식 컴포넌트들이 ScrollTrigger를 등록할 시간을 주고 refresh.
    // 이걸 안 하면 pin이 측정한 height가 0이거나 어긋날 수 있음.
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(update);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
