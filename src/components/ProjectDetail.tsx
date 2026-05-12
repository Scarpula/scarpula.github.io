import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import type { ProjectCard } from "@/data/projects";
import { getProjectDetail } from "@/data/project-details";
import Markdown from "@/components/Markdown";

interface Props {
  project: ProjectCard;
  onClose: () => void;
}

/**
 * ProjectDetail — 카드 클릭 시 펼쳐지는 풀스크린 상세 모달.
 *
 * 트랜지션: framer-motion `layoutId`로 카드와 공유 — 카드가 화면 가운데로
 * 모핑되면서 확장되고, 동시에 backdrop이 어두워진 뒤 상세 컨텐츠가 페이드인.
 *
 * 스크롤: 모달 내부에서만. 외부 페이지 스크롤은 ProjectsSection이 lock.
 *
 * 갤러리 라이트박스: 갤러리 이미지를 클릭하면 풀스크린으로 확대.
 * - z-[180] (모달 z-160 위)
 * - 좌/우 화살표 / 키보드 ←→ / 클릭 backdrop or X 버튼 / ESC
 * - ESC 우선순위: 라이트박스 열려있으면 라이트박스만 닫고 모달은 유지
 */
export default function ProjectDetail({ project, onClose }: Props) {
  const detail = getProjectDetail(project.slug);
  const heroImage = detail?.heroImage ?? project.coverImage;
  const gallery = detail?.gallery ?? [];

  // ─── 라이트박스 상태 ───
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isLightboxOpen = lightboxIdx !== null;

  // ─── 스크롤 컨테이너 ref + "최상단 이동" 버튼 ───
  // 외곽 `pd-card` motion.div 자체가 overflow-y-auto 스크롤 영역.
  // viewport 1 화면 분량 정도 내려갔을 때부터 버튼이 슬라이드 인.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setShowTopBtn(el.scrollTop > window.innerHeight * 0.6);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const navLightbox = useCallback(
    (delta: number) => {
      setLightboxIdx((cur) => {
        if (cur === null) return cur;
        const next = cur + delta;
        if (next < 0 || next >= gallery.length) return cur;
        return next;
      });
    },
    [gallery.length],
  );

  // 키보드 — ESC: 라이트박스 우선 닫기 → 없으면 모달 닫기. ←/→: 라이트박스 네비.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          closeLightbox();
        } else {
          onClose();
        }
        return;
      }
      if (!isLightboxOpen) return;
      if (e.key === "ArrowLeft") navLightbox(-1);
      else if (e.key === "ArrowRight") navLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, isLightboxOpen, closeLightbox, navLightbox]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="pd-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[150]"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={onClose}
      />

      {/* Card morph → fullscreen container.
          FlyingCard 가 viewport 중앙에 정지 상태로 마지막 프레임을 잡아두므로
          여기서는 "중앙에서 사방으로 천천히 펼쳐지는" entrance 만 담당한다.
          1.1s 동안 부드럽게 확장 (이전 0.55s 에서 두 배 느림).

          data-lenis-prevent: Lenis 가 모달 내부 wheel/touch 이벤트를 가로채지 않도록
          하여 native overflow-y:auto 스크롤이 정상 동작하게 함. */}
      <motion.div
        key="pd-card"
        ref={scrollRef}
        className="fixed inset-0 z-[160] overflow-y-auto overscroll-contain"
        data-lenis-prevent=""
        style={{
          background: "var(--bg-base)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
        initial={{ scale: 0.35, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Close button — fixed top right */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="fixed right-6 top-6 z-[170] flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-colors"
          style={{
            background: "rgba(20,20,28,0.7)",
            borderColor: "var(--border-emphasis)",
            color: "var(--text-primary)",
          }}
        >
          <X size={18} strokeWidth={1.6} />
        </button>

        {/* Inner content fades after layout animation — 모달 확장이 거의 완료된 시점에 부드럽게 진입 */}
        <motion.div
          key="pd-inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ─── 1. Hero header (cover image + title) ─── */}
          <header className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
            <img
              src={heroImage}
              alt={project.displayName}
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
            {/* Gradient overlay for legibility */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,15,0.0) 0%, rgba(10,10,15,0.4) 60%, var(--bg-base) 100%)",
              }}
            />
            {/* Title block */}
            <div className="container-x relative flex h-full flex-col justify-end pb-12">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.4em]"
                style={{ color: "var(--text-muted)" }}
              >
                {project.org === "iotplus-code"
                  ? "Commercial Project"
                  : "Scarpula · Personal"}
              </p>
              <h1
                className="font-display mt-3 text-balance text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  wordBreak: "keep-all",
                }}
              >
                {project.displayName}
              </h1>
              {project.codeName && (
                <p
                  className="mt-3 font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {project.codeName}
                </p>
              )}
              <p
                className="mt-6 max-w-2xl text-base leading-[1.85] sm:text-lg"
                style={{ color: "var(--text-secondary)", wordBreak: "keep-all" }}
              >
                {project.oneLiner}
              </p>

              {/* Categories */}
              <ul className="mt-8 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em]">
                {project.category.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border px-2.5 py-1"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {/* ─── 2. Stats strip ─── */}
          {detail?.stats && detail.stats.length > 0 && (
            <section className="border-y" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="container-x grid grid-cols-2 gap-y-6 py-10 md:grid-cols-4">
                {detail.stats.map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="font-display mt-2 text-xl font-semibold sm:text-2xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── 3. Intro ─── */}
          {detail?.intro && (
            <section className="container-x py-16 md:py-24">
              <div
                className="max-w-3xl text-lg leading-[1.95] md:text-xl [&_p+p]:mt-[1.25em]"
                style={{ color: "var(--text-secondary)", wordBreak: "keep-all" }}
              >
                <Markdown>{detail.intro}</Markdown>
              </div>
            </section>
          )}

          {/* ─── 4. Sections ─── */}
          {detail?.sections && (
            <section className="container-x grid gap-16 pb-16 md:grid-cols-12 md:gap-y-20 md:pb-24">
              {detail.sections.map((s, i) => (
                <article
                  key={s.title}
                  className="md:col-span-10 md:col-start-2"
                >
                  <div className="grid gap-8 md:grid-cols-12">
                    <header className="md:col-span-4">
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.3em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h2
                        className="font-display mt-3 text-2xl font-bold leading-[1.2] sm:text-3xl"
                        style={{
                          color: "var(--text-primary)",
                          letterSpacing: "-0.015em",
                          wordBreak: "keep-all",
                        }}
                      >
                        {s.title}
                      </h2>
                    </header>
                    <div className="md:col-span-7 md:col-start-6">
                      {s.body.split("\n\n").map((para, idx) => (
                        <div
                          key={idx}
                          className="text-base leading-[1.95] md:text-[17px]"
                          style={{
                            color: "var(--text-secondary)",
                            wordBreak: "keep-all",
                            marginTop: idx === 0 ? 0 : "1.25em",
                          }}
                        >
                          <Markdown>{para}</Markdown>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* ─── 5. Tech stack ─── */}
          {(detail?.techGroups ?? []).length > 0 ? (
            <section
              className="border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="container-x py-16 md:py-24">
                <h2
                  className="font-display text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
                >
                  Tech stack
                </h2>
                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {detail!.techGroups.map((g) => (
                    <div key={g.label}>
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.3em]"
                        style={{ color: "var(--accent-primary)" }}
                      >
                        {g.label}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {g.items.map((item) => (
                          <li
                            key={item}
                            className="text-sm"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            // 상세 정의 없을 때 ProjectCard.tech를 단일 그룹으로 노출
            <section
              className="border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="container-x py-16 md:py-24">
                <h2
                  className="font-display text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Tech stack
                </h2>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border px-3 py-1.5 font-mono text-xs"
                      style={{
                        borderColor: "var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ─── 6. Components (multi-repo) ─── */}
          {project.components && project.components.length > 0 && (
            <section
              className="border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="container-x py-16 md:py-24">
                <h2
                  className="font-display text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Components
                </h2>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.components.map((c) => (
                    <li
                      key={c.repo}
                      className="rounded-[var(--radius-md)] border p-4"
                      style={{
                        background: "var(--bg-elevated)",
                        borderColor: "var(--border-subtle)",
                      }}
                    >
                      <p
                        className="font-display text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {c.name}
                      </p>
                      <p
                        className="mt-1 font-mono text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {c.repo}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ─── 7. Gallery — 클릭하면 라이트박스로 확대 ─── */}
          {gallery.length > 0 && (
            <section
              className="border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <div className="container-x py-16 md:py-24">
                <div className="flex items-end justify-between gap-4">
                  <h2
                    className="font-display text-2xl font-bold sm:text-3xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Gallery
                  </h2>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    클릭 → 확대
                  </p>
                </div>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {gallery.map((g, i) => (
                    <motion.figure
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className="group cursor-zoom-in overflow-hidden rounded-[var(--radius-lg)] border"
                      style={{
                        background: "var(--bg-elevated)",
                        borderColor: "var(--border-subtle)",
                      }}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          g.aspect === "phone"
                            ? "aspect-[9/19]"
                            : g.aspect === "wide"
                              ? "aspect-[16/10]"
                              : "aspect-square"
                        }`}
                      >
                        <img
                          src={g.src}
                          alt={g.caption ?? ""}
                          className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] group-hover:scale-[1.04]"
                          loading="lazy"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity =
                              "0.1";
                          }}
                        />
                        {/* 호버 시 확대 아이콘 글로우 */}
                        <div
                          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[var(--dur-base)] group-hover:opacity-100"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
                          }}
                        >
                          <span
                            className="rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] backdrop-blur"
                            style={{
                              background: "rgba(20,20,28,0.7)",
                              color: "var(--text-primary)",
                              border: "1px solid var(--border-emphasis)",
                            }}
                          >
                            확대 보기
                          </span>
                        </div>
                      </div>
                      {g.caption && (
                        <figcaption
                          className="px-4 py-3 text-xs leading-relaxed"
                          style={{
                            color: "var(--text-muted)",
                            wordBreak: "keep-all",
                          }}
                        >
                          <Markdown inline>{g.caption}</Markdown>
                        </figcaption>
                      )}
                    </motion.figure>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ─── 8. Footer / Repo links ─── */}
          <section
            className="border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="container-x flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Repository
                </p>
                <p
                  className="font-display mt-2 text-lg"
                  style={{ color: "var(--text-primary)" }}
                >
                  {project.displayName}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-full)] border px-5 py-2.5 font-mono text-xs"
                    style={{
                      borderColor: "var(--border-emphasis)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <Github size={14} strokeWidth={1.6} />
                    GitHub {project.isPrivate && "(private)"}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-full)] px-5 py-2.5 font-mono text-xs"
                    style={{
                      background: "rgba(124,92,255,0.12)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <ExternalLink size={14} strokeWidth={1.6} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </section>
        </motion.div>
      </motion.div>

      {/* ─── Scroll-to-top button ───
          중요: 반드시 transformed motion.div(pd-card) 바깥에 위치해야 함.
          framer-motion 이 모달 컨테이너에 transform 을 부여하면
          position:fixed 자손의 "containing block" 이 모달로 바뀌어 — overflow-y:auto
          영향으로 버튼이 viewport 가 아닌 스크롤 콘텐츠 안쪽에 고정되어 같이 스크롤됨. */}
      <AnimatePresence>
        {showTopBtn && !isLightboxOpen && (
          <motion.button
            key="scroll-top-btn"
            type="button"
            onClick={scrollToTop}
            aria-label="최상단으로"
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.85 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.94 }}
            className="group fixed bottom-6 right-6 z-[175] flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur md:bottom-8 md:right-8 md:h-14 md:w-14"
            style={{
              background: "rgba(20,20,28,0.78)",
              borderColor: "var(--border-emphasis)",
              color: "var(--text-primary)",
              boxShadow:
                "0 10px 30px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,92,255,0.08) inset",
            }}
          >
            <ArrowUp
              size={20}
              strokeWidth={1.8}
              className="transition-transform duration-[var(--dur-base)] group-hover:-translate-y-0.5"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── 갤러리 라이트박스 — 풀스크린 이미지 뷰어 ─── */}
      <AnimatePresence>
        {isLightboxOpen && lightboxIdx !== null && gallery[lightboxIdx] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[180] flex flex-col items-center justify-center"
            style={{
              background: "rgba(0,0,0,0.96)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
            onClick={closeLightbox}
            data-lenis-prevent=""
          >
            {/* Counter (좌상단) */}
            <p
              className="fixed left-6 top-6 font-mono text-xs tracking-[0.3em]"
              style={{ color: "var(--text-secondary)" }}
            >
              {String(lightboxIdx + 1).padStart(2, "0")} /{" "}
              {String(gallery.length).padStart(2, "0")}
            </p>

            {/* Close (우상단) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="라이트박스 닫기"
              className="fixed right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-colors hover:bg-white/5"
              style={{
                background: "rgba(20,20,28,0.7)",
                borderColor: "var(--border-emphasis)",
                color: "var(--text-primary)",
              }}
            >
              <X size={18} strokeWidth={1.6} />
            </button>

            {/* Prev arrow */}
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navLightbox(-1);
                }}
                aria-label="이전 이미지"
                className="fixed left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition-colors hover:bg-white/10 md:left-8 md:h-14 md:w-14"
                style={{
                  background: "rgba(20,20,28,0.7)",
                  borderColor: "var(--border-emphasis)",
                  color: "var(--text-primary)",
                }}
              >
                <ChevronLeft size={22} strokeWidth={1.5} />
              </button>
            )}

            {/* Next arrow */}
            {lightboxIdx < gallery.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navLightbox(1);
                }}
                aria-label="다음 이미지"
                className="fixed right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition-colors hover:bg-white/10 md:right-8 md:h-14 md:w-14"
                style={{
                  background: "rgba(20,20,28,0.7)",
                  borderColor: "var(--border-emphasis)",
                  color: "var(--text-primary)",
                }}
              >
                <ChevronRight size={22} strokeWidth={1.5} />
              </button>
            )}

            {/* Image + caption — 부모 backdrop 클릭은 닫고, 이미지 자체 클릭은 무시 */}
            <motion.figure
              key={`lb-${lightboxIdx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-[92vh] max-w-[92vw] flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightboxIdx].src}
                alt={gallery[lightboxIdx].caption ?? ""}
                className="max-h-[78vh] max-w-[92vw] rounded-[var(--radius-lg)] object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                style={{
                  background: "var(--bg-elevated)",
                }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0.15";
                }}
              />
              {gallery[lightboxIdx].caption && (
                <figcaption
                  className="max-w-3xl px-6 text-center text-sm leading-[1.7]"
                  style={{
                    color: "var(--text-secondary)",
                    wordBreak: "keep-all",
                  }}
                >
                  <Markdown inline>{gallery[lightboxIdx].caption!}</Markdown>
                </figcaption>
              )}
            </motion.figure>

            {/* 키보드 힌트 (하단) */}
            <p
              className="fixed bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--text-muted)" }}
            >
              ← → 이동 · ESC 닫기
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
