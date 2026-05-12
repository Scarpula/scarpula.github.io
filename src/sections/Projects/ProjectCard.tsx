import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ProjectCard as ProjectCardData } from "@/data/projects";
import type { FlyOriginRect } from "@/components/FlyingCard";

interface Props {
  project: ProjectCardData;
  index: number;
  /** 카드 클릭 시 — slug + 클릭 시점의 viewport 기준 사각형을 부모로 전달 */
  onOpen?: (slug: string, origin: FlyOriginRect) => void;
  /** flying / open phase 동안 원본 카드를 시각적으로 숨김 (자리는 유지) */
  isHidden?: boolean;
}

const CATEGORY_LABEL: Record<ProjectCardData["category"][number], string> = {
  "agentic-ai": "Agentic AI",
  fullstack: "Fullstack",
  iot: "IoT",
  data: "Data",
  tool: "Tool",
  mobile: "Mobile",
};

const TILT_SPRING = { stiffness: 280, damping: 24, mass: 0.45 };
const MAX_TILT = 14;

// 카드 실 두께 (px). 0 ~ -CARD_DEPTH 사이에 THICKNESS_LAYERS 개수의 평면을
// 적층해 회전 시 측면이 노출되는 "물리적 카드" 처럼 보이게 만든다.
const CARD_DEPTH = 22;
const THICKNESS_LAYERS = 10;

export default function ProjectCard({
  project,
  index: _index,
  onOpen,
  isHidden,
}: Props) {
  // perspective wrapper — 회전 비적용 기준 rect (mouseMove 정규화 + 클릭 좌표)
  const wrapperRef = useRef<HTMLDivElement>(null);

  // ─── 마우스 위치 추적 (-0.5 ~ 0.5) ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]),
    TILT_SPRING,
  );
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]),
    TILT_SPRING,
  );

  const liftY = useSpring(0, TILT_SPRING);

  // 글로스(스페큘러) — 마우스 따라 미끄러지는 하이라이트
  const glossX = useSpring(useTransform(mouseX, [-0.5, 0.5], [18, 82]), TILT_SPRING);
  const glossY = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, 82]), TILT_SPRING);
  const glossOpacity = useSpring(0, { stiffness: 200, damping: 24 });
  const glossBackground = useMotionTemplate`radial-gradient(circle at ${glossX}% ${glossY}%, rgba(255,255,255,0.14), rgba(255,255,255,0) 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isHidden) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleEnter = () => {
    if (isHidden) return;
    liftY.set(-8);
    glossOpacity.set(1);
  };

  const handleLeave = () => {
    liftY.set(0);
    mouseX.set(0);
    mouseY.set(0);
    glossOpacity.set(0);
  };

  const handleClick = () => {
    const target = wrapperRef.current;
    if (!target) return;
    const r = target.getBoundingClientRect();
    onOpen?.(project.slug, {
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height,
    });
  };

  return (
    // ── perspective wrapper — 3D 카메라 ──
    <div
      ref={wrapperRef}
      style={{
        perspective: 1300,
        // 자기 자신은 평면. preserve-3d 안 둠 (perspective 만)
      }}
    >
      {/* ── tilt body — preserve-3d 로 자식 평면들을 3D 공간에 배치 ──
          중요: overflow 두지 않음! overflow:hidden 은 자식의 3D 평면화를 강제하여
                측면 두께 레이어들이 모두 평면에 뭉개진다. */}
      <motion.div
        onClick={handleClick}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="group relative cursor-pointer"
        style={{
          visibility: isHidden ? "hidden" : "visible",
          rotateX,
          rotateY,
          y: liftY,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* ── 두께 레이어 스택 ── (article 보다 먼저 = z-order 뒤)
            translateZ 0 ~ -CARD_DEPTH 사이에 N개 평면을 적층.
            회전했을 때 측면에서 이 적층이 노출되어 "두꺼운 카드 단면" 처럼 보임. */}
        {Array.from({ length: THICKNESS_LAYERS }).map((_, i) => {
          // i=0 → 가장 앞 (front 바로 뒤), i=N-1 → 가장 뒤
          const depth = ((i + 1) / THICKNESS_LAYERS) * CARD_DEPTH;
          const z = -depth;
          // 깊을수록 어둡게 (atmosphere fade)
          const k = i / (THICKNESS_LAYERS - 1);
          return (
            <div
              key={i}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-xl)] border"
              style={{
                transform: `translateZ(${z}px)`,
                background: `hsl(240 12% ${10 - k * 6}%)`,
                borderColor: `rgba(0,0,0,${0.5 + k * 0.3})`,
                // 가장 뒤 평면은 한 번 더 그림자 — 지면 그림자 역할
                boxShadow:
                  i === THICKNESS_LAYERS - 1
                    ? "0 30px 60px -15px rgba(0,0,0,0.65)"
                    : "none",
              }}
            />
          );
        })}

        {/* ── FRONT FACE — 실제 카드 콘텐츠 ──
            position:relative 로 자연스러운 flow 사이즈 결정 (article 의 내용 높이가 wrapper 높이). */}
        <article
          className="relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border-subtle)",
            transform: "translateZ(0)",
            // 림 라이트 + 내부 베벨 (front face 한정)
            boxShadow: [
              "0 1px 0 0 rgba(255,255,255,0.08) inset",
              "0 -1px 0 0 rgba(0,0,0,0.45) inset",
              "0 0 0 1px rgba(255,255,255,0.04) inset",
            ].join(", "),
          }}
        >
          {/* 글로스 오버레이 */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[3]"
            style={{
              background: glossBackground,
              opacity: glossOpacity,
              mixBlendMode: "screen",
            }}
          />

          {/* 상단 1px 림 라이트 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
            }}
          />

          {/* Cover */}
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.18), rgba(0,229,255,0.08))",
            }}
          >
            <img
              src={project.coverImage}
              alt={`${project.displayName} cover`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-[1.04]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12"
              style={{
                background:
                  "linear-gradient(180deg, transparent, var(--bg-elevated))",
              }}
            />
          </div>

          {/* Body */}
          <div className="relative z-[1] flex flex-1 flex-col p-6">
            <div className="flex flex-wrap items-center gap-2">
              {project.category.map((c) => (
                <span
                  key={c}
                  className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]"
                  style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {CATEGORY_LABEL[c]}
                </span>
              ))}
              {project.org === "iotplus-code" && (
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]"
                  style={{
                    background: "rgba(0,229,255,0.08)",
                    color: "var(--accent-glow)",
                  }}
                >
                  Commercial
                </span>
              )}
            </div>

            <h3
              className="font-display mt-4 text-2xl font-semibold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {project.displayName}
            </h3>
            {project.codeName && (
              <p
                className="mt-1 font-mono text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                {project.codeName}
              </p>
            )}

            <p
              className="mt-3 text-sm leading-[1.7]"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.oneLiner}
            </p>

            {project.components && project.components.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.components.map((c) => (
                  <li
                    key={c.repo}
                    className="rounded-md border px-2 py-0.5 font-mono text-[10px]"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-muted)",
                    }}
                    title={c.repo}
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-5 space-y-1.5 text-sm">
              {project.features.slice(0, 3).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: "var(--accent-primary)" }}
                  />
                  <span>{f}</span>
                </li>
              ))}
              {project.features.length > 3 && (
                <li
                  className="font-mono text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  + {project.features.length - 3} more
                </li>
              )}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
              {project.tech.slice(0, 5).map((t) => (
                <li
                  key={t}
                  className="rounded px-1.5 py-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-muted)",
                  }}
                >
                  {t}
                </li>
              ))}
              {project.tech.length > 5 && (
                <li style={{ color: "var(--text-muted)" }}>
                  +{project.tech.length - 5}
                </li>
              )}
            </ul>

            <div className="mt-auto flex items-center gap-3 pt-6">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Github size={14} strokeWidth={1.6} />
                  <span>Repo {project.isPrivate && "(private)"}</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-mono text-xs"
                  style={{ color: "var(--accent-glow)" }}
                >
                  <ExternalLink size={14} strokeWidth={1.6} />
                  <span>Live</span>
                </a>
              )}
            </div>
          </div>

          {/* 하단 1px 어두운 베벨 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
            }}
          />
        </article>
      </motion.div>
    </div>
  );
}
