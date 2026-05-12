import Image from "next/image";
import kyloLogo from "../app/kylo-logo.png";

const marqueeText = "KYLO • BEYOND ORDINARY • LIMITED • UNDERGROUND • ";

export default function BrandStatement() {
  // Repeat text enough for seamless loop
  const track = Array(8).fill(marqueeText).join("");

  return (
    <section id="about" className="bg-black overflow-hidden">
      {/* Top divider */}
      <div className="h-px bg-white/10" />

      {/* Bold quote */}
      <div className="py-24 md:py-36 px-6 flex flex-col items-center justify-center text-center">
        {/* Logo accent */}
        <div className="mb-6 fade-in-up">
          <Image
            src={kyloLogo}
            alt="KYLO"
            width={320}
            height={130}
            className="w-[220px] md:w-[300px] opacity-80 object-contain mx-auto"
          />
        </div>

        <p
          className="text-[11px] tracking-[0.4em] uppercase text-white/30 mb-8"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          The Philosophy
        </p>
        <blockquote
          className="text-[clamp(2.8rem,8vw,7rem)] leading-[1.05] tracking-tight text-white max-w-5xl"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
        >
          Not a brand.
          <br />
          <span className="text-white/40">A statement.</span>
        </blockquote>
        <div className="mt-10 w-12 h-px bg-white/30" />
      </div>

      {/* Marquee strip */}
      <div className="border-t border-b border-white/10 py-5 overflow-hidden bg-[#0a0a0a]">
        <div className="marquee-track">
          <span
            className="text-sm md:text-base tracking-[0.3em] uppercase text-white/20 pr-0"
            style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", letterSpacing: "0.35em" }}
          >
            {track}
          </span>
          {/* Duplicate for seamless loop */}
          <span
            className="text-sm md:text-base tracking-[0.3em] uppercase text-white/20 pr-0"
            style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", letterSpacing: "0.35em" }}
            aria-hidden="true"
          >
            {track}
          </span>
        </div>
      </div>
    </section>
  );
}
