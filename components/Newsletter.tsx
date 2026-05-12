"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative bg-black py-28 md:py-36 px-6 overflow-hidden"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.4em] uppercase text-white/30 mb-6"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          The Inner Circle
        </p>

        {/* Heading */}
        <h2
          className="text-[clamp(3rem,10vw,7rem)] leading-none tracking-widest text-white mb-6"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
        >
          Join the Circle
        </h2>

        {/* Subtext */}
        <p
          className="text-sm text-white/40 tracking-wide mb-12"
          style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
        >
          Early access. No spam. Just drops.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="py-10 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border border-white/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l5 5 7-9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p
              className="text-white tracking-widest text-sm uppercase"
              style={{ fontFamily: "var(--font-bebas), sans-serif", fontSize: "1.1rem" }}
            >
              You&apos;re In.
            </p>
            <p
              className="text-white/40 text-sm"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              Watch your inbox. Something dark is coming.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto"
            id="newsletter-form"
          >
            <div className="flex-1">
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="input-kylo"
                autoComplete="email"
              />
            </div>
            <button
              type="submit"
              className="btn-kylo whitespace-nowrap text-xs mt-0"
              id="newsletter-submit"
            >
              <span>Join Now</span>
            </button>
          </form>
        )}

        {/* Decorative lines */}
        <div className="mt-16 flex items-center gap-6 justify-center opacity-20">
          <div className="h-px flex-1 bg-white/50 max-w-[80px]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-white"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            KYLO
          </span>
          <div className="h-px flex-1 bg-white/50 max-w-[80px]" />
        </div>
      </div>
    </section>
  );
}
