import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

/**
 * Markdown — react-markdown 얇은 래퍼.
 *
 * project-details.ts 의 intro / section body / gallery caption 텍스트에 사용된
 *   - **bold** → 강조 (text-primary 밝게)
 *   - `inline code` → 모노스페이스 + 미묘한 배경
 *   - GFM(`remark-gfm`) — 표·취소선·자동 링크 지원
 * 을 포트폴리오 디자인 토큰에 맞춰 렌더한다.
 *
 * 텍스트 본문은 보통 부모 `<p>` 안에 들어가므로, `inline` prop 으로 단락 래핑을
 * 끄고 인라인 노드만 출력하도록 만들 수 있다 (figcaption · hero oneLiner 용).
 *
 * 단락 사이 간격은 외부에서 (margin-top 등) 제어한다 — 본 컴포넌트는 시각만 담당.
 */

interface MarkdownProps {
  children: string;
  /** 인라인 모드 — `<p>` 래퍼 없이 굵게/코드 인라인만 렌더. caption 등 한 줄 영역용. */
  inline?: boolean;
  /** 추가 클래스 (paragraph 또는 inline span 에 부여) */
  className?: string;
}

/* 공통 컴포넌트 매핑 — 디자인 토큰 친화적으로 스타일링 */
const baseComponents: Components = {
  strong: ({ children }) => (
    <strong
      style={{
        color: "var(--text-primary)",
        fontWeight: 600,
      }}
    >
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em style={{ color: "var(--text-primary)", fontStyle: "italic" }}>
      {children}
    </em>
  ),
  code: ({ children }) => (
    <code
      style={{
        fontFamily:
          "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
        fontSize: "0.88em",
        padding: "0.12em 0.42em",
        borderRadius: "4px",
        background: "rgba(124,92,255,0.10)",
        color: "var(--accent-primary, var(--text-primary))",
        border: "1px solid rgba(124,92,255,0.18)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        color: "var(--accent-primary)",
        textDecoration: "underline",
        textDecorationThickness: "1px",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </a>
  ),
  del: ({ children }) => (
    <del style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>
      {children}
    </del>
  ),
};

/* 블록 모드 — 단락·리스트 렌더 */
const blockComponents: Components = {
  ...baseComponents,
  p: ({ children }) => (
    <p style={{ margin: 0 }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul
      style={{
        margin: "0.6em 0 0",
        paddingLeft: "1.25em",
        listStyle: "disc",
      }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      style={{
        margin: "0.6em 0 0",
        paddingLeft: "1.5em",
        listStyle: "decimal",
      }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginTop: "0.25em" }}>{children}</li>
  ),
};

/* 인라인 모드 — `<p>` 를 그냥 span 으로, 리스트/제목은 무시 */
const inlineComponents: Components = {
  ...baseComponents,
  p: ({ children }) => <>{children}</>,
};

export default function Markdown({
  children,
  inline = false,
  className,
}: MarkdownProps): ReactNode {
  const components = inline ? inlineComponents : blockComponents;
  const Wrapper = inline ? "span" : "div";
  // react-markdown v10 은 className prop 을 더 이상 받지 않으므로 외부 래퍼로 처리.
  return (
    <Wrapper className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </Wrapper>
  );
}
