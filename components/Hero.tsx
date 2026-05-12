import Image from "next/image";
import kyloLogo from "../app/kylo-logo.png";

export default function Hero() {
  return (
    <section
      id="hero"
      className="grain-overlay relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal line accents */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/5 pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 right-0 h-px bg-white/5 pointer-events-none" />

        {/* Brand logo — large watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
          <Image
            src={kyloLogo}
            alt=""
            width={900}
            height={360}
            className="w-[75vw] max-w-4xl opacity-[0.04] object-contain"
            aria-hidden="true"
            priority
          />
        </div>

        {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Eyebrow text */}
        <p
          className="fade-in-up text-xs tracking-[0.4em] uppercase text-white/40 mb-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          2026 Collection
        </p>

        {/* Main Title */}
        <h1
          className="hero-title fade-in-up-delay-1 text-[22vw] md:text-[18vw] leading-none tracking-widest text-white select-none"
        >
          KYLO
        </h1>

        {/* Tagline */}
        <p
          className="fade-in-up-delay-2 text-lg md:text-2xl font-light italic text-white/75 mt-2 mb-12 tracking-wider"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Beyond Ordinary.
        </p>

        {/* CTA */}
        <div className="fade-in-up-delay-3">
          <a href="#collection" className="btn-kylo text-sm">
            <span>Shop Now</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 fade-in-up-delay-3">
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-white/30"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
