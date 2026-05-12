import { motion } from "framer-motion";
import type { ProjectCard as ProjectCardData } from "@/data/projects";

export interface FlyOriginRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  project: ProjectCardData;
  origin: FlyOriginRect;
}

const CATEGORY_LABEL: Record<ProjectCardData["category"][number], string> = {
  "agentic-ai": "Agentic AI",
  fullstack: "Fullstack",
  iot: "IoT",
  data: "Data",
  tool: "Tool",
  mobile: "Mobile",
};

// 카드 두께 — ProjectCard 와 동일
const CARD_DEPTH = 22;
const THICKNESS_LAYERS = 10;

/**
 * FlyingCard — 카드 클릭 시 viewport 중앙으로 이동하면서
 * **Y축 360° 3D 플립** (앞→옆→뒤→옆→앞) 후 1초 정지.
 *
 * 구조:
 *   .perspective-wrapper           ← perspective:1400 (위치/크기 애니메이션)
 *     .flip-card (preserve-3d)     ← rotateY 회전, 두께 레이어 + 양면 포함
 *       [10 thickness layers]       ← translateZ -2 ~ -22 적층 (회전 시 측면 노출)
 *       .face.front (translateZ 0)  ← 정면 콘텐츠 (backface-visibility:hidden)
 *       .face.back  (translateZ -CARD_DEPTH, rotateY 180)
 *                                    ← 뒷면 (CARD_DEPTH 만큼 뒤 → 적층 가장 뒤와 일치)
 *
 * 타이밍 (총 2초):
 *   0.0–1.0s : 회전 + 이동 + 사이즈 변화 (easeInOut)
 *   1.0–2.0s : 중앙에서 정지 (살짝 살아있는 느낌)
 *   2.0s 이후 : 부모가 phase 를 'open' 으로 전환 → 모달이 마운트되면서 unmount
 */
export default function FlyingCard({ project, origin }: Props) {
  const targetWidth = Math.min(origin.width * 1.05, 520);
  const aspect = origin.height / origin.width;
  const targetHeight = targetWidth * aspect;

  const targetX =
    typeof window !== "undefined"
      ? window.innerWidth / 2 - targetWidth / 2
      : 0;
  const targetY =
    typeof window !== "undefined"
      ? window.innerHeight / 2 - targetHeight / 2
      : 0;

  const sharedTransition = {
    duration: 2,
    times: [0, 0.5, 1],
    ease: ["easeInOut", "easeOut"] as const,
  };

  return (
    <motion.div
      className="pointer-events-none fixed z-[155]"
      style={{
        top: 0,
        left: 0,
        perspective: 1400,
      }}
      initial={{
        x: origin.x,
        y: origin.y,
        width: origin.width,
        height: origin.height,
      }}
      animate={{
        x: [origin.x, targetX, targetX],
        y: [origin.y, targetY, targetY],
        width: [origin.width, targetWidth, targetWidth],
        height: [origin.height, targetHeight, targetHeight],
      }}
      transition={sharedTransition}
    >
      {/* ── flip card — 3D Y축 회전 + 두께 ── */}
      <motion.div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
        }}
        initial={{ rotateY: 0, scale: 1 }}
        animate={{
          rotateY: [0, 360, 360],
          scale: [1, 1, 1.02],
        }}
        transition={sharedTransition}
      >
        {/* ── 두께 레이어 스택 ── front 와 back 사이를 N개 평면으로 채움.
            회전 중 90° 부근에서 가장 또렷하게 보이며 — 진짜 두꺼운 카드처럼 측면이 노출. */}
        {Array.from({ length: THICKNESS_LAYERS }).map((_, i) => {
          const depth = ((i + 1) / THICKNESS_LAYERS) * CARD_DEPTH;
          const z = -depth;
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
                boxShadow:
                  i === THICKNESS_LAYERS - 1
                    ? "0 30px 80px -15px rgba(0,0,0,0.7)"
                    : "none",
              }}
            />
          );
        })}

        {/* ── FRONT face (translateZ 0) ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] border"
          style={{
            background: "var(--bg-elevated)",
            borderColor: "var(--border-emphasis)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
            boxShadow: [
              "0 1px 0 0 rgba(255,255,255,0.08) inset",
              "0 -1px 0 0 rgba(0,0,0,0.45) inset",
              "0 0 0 1px rgba(255,255,255,0.04) inset",
            ].join(", "),
          }}
        >
          {/* 상단 림 라이트 */}
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
              className="h-full w-full object-cover"
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

          {/* Body — 간략 표시 */}
          <div className="relative z-[1] p-5">
            <div className="flex flex-wrap gap-1.5">
              {project.category.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.08em]"
                  style={{
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {CATEGORY_LABEL[c]}
                </span>
              ))}
            </div>
            <h3
              className="font-display mt-3 text-xl font-semibold leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {project.displayName}
            </h3>
            <p
              className="mt-1.5 line-clamp-2 text-xs leading-[1.6]"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.oneLiner}
            </p>
          </div>

          {/* 우측 상단 액센트 글로우 */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-3xl"
            style={{ background: "var(--accent-glow)" }}
          />

          {/* 하단 베벨 어둠 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* ── BACK face (translateZ -CARD_DEPTH, 180° 뒤집힘) ──
            적층의 가장 뒤(가장 어두운 평면)와 같은 깊이에 배치 → 뒷면이 적층 뒤로 튀어나오지 않음. */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[var(--radius-xl)] border"
          style={{
            transform: `translateZ(${-CARD_DEPTH}px) rotateY(180deg)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background:
              "radial-gradient(ellipse at center, rgba(124,92,255,0.14) 0%, rgba(20,20,28,0.95) 65%, var(--bg-base) 100%)",
            borderColor: "var(--border-emphasis)",
          }}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-8">
            <div
              className="pointer-events-none absolute inset-6 rounded-[calc(var(--radius-xl)-12px)] border"
              style={{ borderColor: "var(--border-subtle)" }}
            />
            <p
              className="font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--text-muted)" }}
            >
              {project.org === "iotplus-code"
                ? "Commercial"
                : "Scarpula · Portfolio"}
            </p>
            <p
              className="font-display text-3xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {project.displayName}
            </p>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.3em]"
              style={{ color: "var(--accent-glow)" }}
            >
              · {project.slug} ·
            </p>
            {/* 코너 마커 */}
            <div
              className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t"
              style={{ borderColor: "var(--accent-primary)" }}
            />
            <div
              className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t"
              style={{ borderColor: "var(--accent-primary)" }}
            />
            <div
              className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l"
              style={{ borderColor: "var(--accent-primary)" }}
            />
            <div
              className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r"
              style={{ borderColor: "var(--accent-primary)" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
