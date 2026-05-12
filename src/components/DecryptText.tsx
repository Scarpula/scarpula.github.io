import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type HTMLAttributes,
} from "react";

/**
 * DecryptText — Text scramble / morphing / decrypt 효과.
 *
 * 동작:
 *  1) 초기: 모든 글자 opacity:0 (FOUC 방지는 글로벌 CSS 가 처리, 자체에서도 0)
 *  2) play() 호출 시 — 각 글자가 stagger 만큼 시차를 두고 한 명씩 등장
 *  3) 등장한 글자는 scrambleDuration 동안 같은 카테고리(한글/영문) 의 무작위
 *     글자로 빠르게 morph (scrambleTick 주기). 영상 효과상 "deciphering" 느낌.
 *  4) scrambleDuration 끝나면 진짜 글자로 정착. 정착 순간 accent 색상으로
 *     플래시 후 본래 색상으로 부드럽게 복귀.
 *
 * Hangul 의 경우 U+AC00 ~ U+D7A3 (11,172 음절) 풀에서 무작위 → 한국어 디크립트
 * 느낌 자연스럽게 유지. 영문/숫자는 ASCII 풀 사용. 특수문자/공백은 그대로.
 *
 * 성능: rAF + 직접 DOM 조작 (textContent / style). React re-render 0회.
 *
 * Imperative API (ref):
 *   - play()  : 처음부터 재생
 *   - reset() : 즉시 초기 상태 (opacity 0, 정착 텍스트 유지)
 *
 * 클래스명:
 *   - charClassName (default "kt-char") — 부모 .kt-line-N 의 CSS 가 자동 적용됨
 *     예) .kt-gradient-line .kt-char 의 그라디언트 fill 도 그대로 인계.
 */

const HANGUL_BASE = 0xac00;
const HANGUL_END = 0xd7a3;
const HANGUL_RANGE = HANGUL_END - HANGUL_BASE + 1;
const LATIN_POOL =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function classifyChar(ch: string): "hangul" | "latin" | "passthrough" {
  if (!ch || ch === " ") return "passthrough";
  const code = ch.charCodeAt(0);
  if (code >= HANGUL_BASE && code <= HANGUL_END) return "hangul";
  if (/[A-Za-z0-9]/.test(ch)) return "latin";
  return "passthrough";
}

function scrambleOf(ch: string): string {
  const type = classifyChar(ch);
  if (type === "hangul") {
    return String.fromCharCode(
      HANGUL_BASE + Math.floor(Math.random() * HANGUL_RANGE),
    );
  }
  if (type === "latin") {
    return LATIN_POOL[Math.floor(Math.random() * LATIN_POOL.length)];
  }
  return ch;
}

export interface DecryptTextHandle {
  play: () => void;
  reset: () => void;
}

interface DecryptTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  /** 글자 사이 stagger ms (각 글자가 등장하는 시차) */
  stagger?: number;
  /** 각 글자가 scramble 하는 시간 ms */
  scrambleDuration?: number;
  /** scramble 표시 갱신 주기 ms (낮을수록 어지럽게 빨리 바뀜) */
  scrambleTick?: number;
  /** 정착 직후 accent 플래시 시간 ms */
  flashDuration?: number;
  /** 자동 재생 (기본 false — ref.play() 로 외부에서 트리거) */
  autoPlay?: boolean;
  /** 모든 글자 정착 시 콜백 */
  onComplete?: () => void;
  /** 각 글자 span 클래스 — GSAP 셀렉터 / CSS 그라디언트 인계용 */
  charClassName?: string;
}

const DecryptText = forwardRef<DecryptTextHandle, DecryptTextProps>(
  function DecryptText(
    {
      text,
      stagger = 60,
      scrambleDuration = 650,
      scrambleTick = 55,
      flashDuration = 260,
      autoPlay = false,
      onComplete,
      charClassName = "kt-char",
      ...rest
    },
    ref,
  ) {
    // codepoint 분해 (한글 1음절 = 1 codepoint)
    const chars = [...text];
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const rafRef = useRef<number | null>(null);
    const playingRef = useRef(false);

    const reset = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      playingRef.current = false;
      chars.forEach((c, i) => {
        const el = charRefs.current[i];
        if (!el) return;
        // 정착 텍스트 복구 (layout 안정성) + opacity 0
        el.textContent = c;
        el.style.opacity = "0";
        el.style.removeProperty("text-shadow");
        // 그라디언트 라인의 경우 color 가 transparent 여야 하므로 inline color 제거
        el.style.removeProperty("color");
        el.style.removeProperty("-webkit-text-fill-color");
      });
    };

    const play = () => {
      reset();
      playingRef.current = true;
      const start = performance.now();
      const settled = new Set<number>();
      let lastTick = 0;

      const loop = (now: number) => {
        if (!playingRef.current) return;

        const elapsed = now - start;
        const shouldTick = now - lastTick >= scrambleTick;
        if (shouldTick) lastTick = now;

        let allDone = true;

        for (let i = 0; i < chars.length; i++) {
          if (settled.has(i)) continue;
          const el = charRefs.current[i];
          if (!el) continue;

          const startTime = i * stagger;
          const settleTime = startTime + scrambleDuration;
          const c = chars[i];

          if (elapsed >= settleTime) {
            // ─── 정착 ───
            settled.add(i);
            el.textContent = c;
            el.style.opacity = "1";
            // accent 플래시 (그라디언트 라인도 일시적으로 solid accent 색)
            el.style.color = "var(--accent-glow)";
            el.style.setProperty(
              "-webkit-text-fill-color",
              "var(--accent-glow)",
            );
            el.style.textShadow = "0 0 14px rgba(0,229,255,0.55)";
            window.setTimeout(() => {
              if (!el.isConnected) return;
              el.style.removeProperty("color");
              el.style.removeProperty("-webkit-text-fill-color");
              el.style.removeProperty("text-shadow");
            }, flashDuration);
          } else if (elapsed >= startTime) {
            // ─── 스크램블 중 ───
            el.style.opacity = "1";
            if (shouldTick) {
              el.textContent = scrambleOf(c);
            }
            allDone = false;
          } else {
            // ─── 아직 등장 전 ───
            allDone = false;
          }
        }

        if (allDone) {
          rafRef.current = null;
          playingRef.current = false;
          onComplete?.();
        } else {
          rafRef.current = requestAnimationFrame(loop);
        }
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    useImperativeHandle(ref, () => ({ play, reset }), []);

    useEffect(() => {
      if (autoPlay) play();
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        playingRef.current = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 어절 단위 nowrap 그룹 — "에이전틱 AI 시대의" 같은 입력에서 단어 중간이
    // 깨지지 않도록 (글자별 inline-block 만으로는 word-break: keep-all 이 무력).
    // ref 인덱스(charRefs[i]) 는 원본 chars 배열 인덱스를 유지.
    const segments: Array<{ kind: "word" | "space"; chars: { c: string; i: number }[] }> = [];
    {
      let current: (typeof segments)[number] | null = null;
      chars.forEach((c, i) => {
        const kind: "word" | "space" = c === " " ? "space" : "word";
        if (!current || current.kind !== kind) {
          current = { kind, chars: [{ c, i }] };
          segments.push(current);
        } else {
          current.chars.push({ c, i });
        }
      });
    }

    return (
      <span aria-label={text} {...rest}>
        {segments.map((seg, si) => {
          if (seg.kind === "space") {
            return (
              <span key={`s-${si}`} aria-hidden style={{ whiteSpace: "pre" }}>
                {seg.chars.map((x) => x.c).join("")}
              </span>
            );
          }
          return (
            <span
              key={`w-${si}`}
              aria-hidden
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              {seg.chars.map(({ c, i }) => (
                <span
                  key={i}
                  aria-hidden
                  ref={(el) => {
                    charRefs.current[i] = el;
                  }}
                  className={charClassName}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    transformOrigin: "50% 60%",
                    transition:
                      "color 0.32s ease-out, -webkit-text-fill-color 0.32s ease-out, text-shadow 0.32s ease-out",
                    willChange: "opacity, color, text-shadow",
                  }}
                >
                  {/* JSX 상 정착 텍스트 — opacity:0 으로 가려져 있고, play() 시 scramble 로 덮어쓰여짐 */}
                  {c}
                </span>
              ))}
            </span>
          );
        })}
      </span>
    );
  },
);

export default DecryptText;
