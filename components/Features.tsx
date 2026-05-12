"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    id: "premium-cotton",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="17" stroke="black" strokeWidth="1.2" />
        <path
          d="M11 14c0-3.866 3.134-7 7-7s7 3.134 7 7c0 2.5-1.3 4.7-3.25 6L18 29l-3.75-9C12.3 18.7 11 16.5 11 14z"
          stroke="black"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="18" cy="14" r="2" fill="black" />
      </svg>
    ),
    heading: "Premium Cotton",
    description:
      "400-thread-count heavyweight cotton. Soft against skin. Built to outlast your wardrobe.",
  },
  {
    id: "limited-drops",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="1" y="1" width="34" height="34" stroke="black" strokeWidth="1.2" />
        <path
          d="M10 26L18 10L26 26"
          stroke="black"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M13 21h10" stroke="black" strokeWidth="1.2" />
        <circle cx="18" cy="10" r="2" fill="black" />
      </svg>
    ),
    heading: "Limited Drops",
    description:
      "Every release is intentional. Small batches. High stakes. Once it's gone, it's gone.",
  },
  {
    id: "unisex-fit",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 30L14 10L18 18L22 10L30 30"
          stroke="black"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="8" r="3" stroke="black" strokeWidth="1.2" />
        <circle cx="24" cy="8" r="3" stroke="black" strokeWidth="1.2" />
        <path d="M12 11v5" stroke="black" strokeWidth="1.2" />
        <path d="M24 11v5" stroke="black" strokeWidth="1.2" />
      </svg>
    ),
    heading: "Unisex Fit",
    description:
      "Designed to belong to everyone and no one. Relaxed silhouettes that drape perfectly.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeEls = sectionRef.current?.querySelectorAll(".section-fade");
    fadeEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f9f7f4] py-28 md:py-36 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20 section-fade text-center">
          <p
            className="text-[11px] tracking-[0.4em] uppercase text-black/30 mb-3"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Why Choose
          </p>
          <h2
            className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-widest text-black"
            style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          >
            The KYLO Standard
          </h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              id={feature.id}
              className="section-fade flex flex-col items-start p-8 border border-black/10 bg-white hover:border-black/30 hover:shadow-lg transition-all duration-500 group"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Icon */}
              <div className="mb-7 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {feature.icon}
              </div>

              {/* Heading */}
              <h3
                className="text-2xl md:text-3xl tracking-widest text-black mb-4"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                {feature.heading}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-black/30 mb-5 group-hover:w-16 transition-all duration-500" />

              {/* Description */}
              <p
                className="text-sm leading-relaxed text-black/50 group-hover:text-black/80 transition-colors duration-300"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
