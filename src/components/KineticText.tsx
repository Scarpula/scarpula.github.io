import { Fragment, type HTMLAttributes, type ReactNode } from "react";

/**
 * KineticText — 한 줄 텍스트를 글자 단위 inline-block 스팬으로 쪼갠다.
 *
 * 결과 DOM:
 *  <span aria-label="원문">
 *    <span class="kt-word">              ← 어절 그룹 (white-space: nowrap)
 *      <span class="kt-char">에</span>
 *      <span class="kt-char">이</span>
 *      ...
 *    </span>
 *    <span aria-hidden> </span>          ← 공백
 *    <span class="kt-word">...</span>
 *  </span>
 *
 * 호출자가 `.kt-char` (또는 charClassName)에 GSAP stagger를 걸어 각 글자를
 * 별개 객체로 애니메이션. 한글 1음절 = 1 codepoint이므로 [...text] 안전.
 *
 * ⚠️ 줄바꿈: 글자별 inline-block 만 두면 `word-break: keep-all` 이 무력화되어
 *   "만든다" → "만든 / 다" 같이 어절 중간이 깨짐. 각 어절을 nowrap 박스로
 *   감싸 어절 단위 break 만 허용한다.
 *
 * 접근성: aria-label로 원문 보존, 글자 단위 span은 aria-hidden.
 */
interface KineticTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  /** 글자 span에 추가할 클래스 (GSAP selector용) */
  charClassName?: string;
  /** 공백을 별도 span으로 둘지 (기본 true) */
  preserveSpaces?: boolean;
}

export default function KineticText({
  text,
  charClassName = "kt-char",
  preserveSpaces = true,
  ...rest
}: KineticTextProps) {
  // 어절 그룹 구성 — 공백 기준 분리 (공백 자체는 별도 노드)
  const segments = text.split(/(\s+)/).filter((s) => s !== "");

  const nodes: ReactNode[] = segments.map((seg, si) => {
    if (/^\s+$/.test(seg)) {
      return preserveSpaces ? (
        <span key={si} aria-hidden style={{ whiteSpace: "pre" }}>
          {seg}
        </span>
      ) : (
        <Fragment key={si}>{seg}</Fragment>
      );
    }
    // 어절 그룹 — 안에서 줄바꿈 금지
    const chars = [...seg];
    return (
      <span
        key={si}
        aria-hidden
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            aria-hidden
            className={charClassName}
            style={{
              display: "inline-block",
              willChange: "transform, opacity, filter",
              transformOrigin: "50% 60%",
            }}
          >
            {c}
          </span>
        ))}
      </span>
    );
  });

  return (
    <span aria-label={text} {...rest}>
      {nodes}
    </span>
  );
}
