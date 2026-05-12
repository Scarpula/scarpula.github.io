import { useEffect, useRef } from "react";
import { Mail, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticText from "@/components/KineticText";

/**
 * CONTACT 섹션. pin은 짧게 (140vh) — 마지막은 자연스럽게 끝낸다.
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 10%",
          scrub: true,
        },
      });
      tl.from(".contact-eyebrow", { opacity: 0, y: 30 }, 0)
        .from(
          ".contact-heading .kt-char",
          {
            opacity: 0,
            y: 60,
            rotateX: -70,
            scale: 1.1,
            filter: "blur(8px)",
            stagger: 0.025,
            ease: "power3.out",
            transformPerspective: 800,
          },
          0.05,
        )
        .from(".contact-cta", { opacity: 0, y: 40, stagger: 0.06 }, 0.35)
        .from(".contact-foot", { opacity: 0, y: 20 }, 0.5);

      // 배경 글로우 패럴럭스
      gsap.to(".contact-glow", {
        y: -120,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      data-section="contact"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* 배경 글로우 */}
      <div
        className="contact-glow pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 60%, rgba(124,92,255,0.25), transparent 70%), radial-gradient(35% 35% at 30% 30%, rgba(0,229,255,0.15), transparent 70%)",
        }}
      />

      <div className="container-x text-center">
        <p
          className="contact-eyebrow font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--text-muted)" }}
        >
          05 — Contact
        </p>
        <h2
          className="contact-heading font-display mt-4 text-balance text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl"
          style={{
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            wordBreak: "keep-all",
          }}
        >
          <KineticText
            text="시스템을 만들 일이"
            className="block"
            charClassName="kt-char"
          />
          <KineticText
            text="있으시다면."
            className="block"
            charClassName="kt-char"
          />
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="mailto:dltjdeh7745@naver.com"
            className="contact-cta inline-flex items-center gap-2 rounded-[var(--radius-full)] border px-6 py-3 transition-colors"
            style={{
              borderColor: "var(--border-emphasis)",
              color: "var(--text-primary)",
            }}
          >
            <Mail size={16} strokeWidth={1.6} />
            <span className="font-mono text-sm">dltjdeh7745@naver.com</span>
          </a>

          <a
            href="https://github.com/Scarpula"
            target="_blank"
            rel="noreferrer noopener"
            className="contact-cta inline-flex items-center gap-2 rounded-[var(--radius-full)] px-6 py-3"
            style={{
              background: "rgba(124,92,255,0.12)",
              color: "var(--accent-primary)",
            }}
          >
            <Github size={16} strokeWidth={1.6} />
            <span className="font-mono text-sm">Scarpula</span>
          </a>
        </div>

        <footer
          className="contact-foot mt-24 font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "var(--text-muted)" }}
        >
          © 2026 · Built with React + Vite + Tailwind v4 · GSAP + Lenis
        </footer>
      </div>
    </section>
  );
}
