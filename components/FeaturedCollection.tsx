"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import OrderModal from "./OrderModal";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  labels: string[];
  tag?: string;
}

const products: Product[] = [
  {
    id: 3,
    name: "KYLO PETAL BLOOM TEE",
    price: "Rs 1499",
    images: [
      "/tshirt_photo/rosewhite.jpeg",
      "/tshirt_photo/rose.jpeg",
    ],
    labels: ["WHITE", "WHITE"],
    tag: "LIMITED",
  },
  {
    id: 4,
    name: "KYLO SOLSTICE BLOOM TEE",
    price: "Rs 1499",
    images: [
      "/tshirt_photo/sunflowerwhite.jpeg",
      "/tshirt_photo/sunflower.jpeg",
    ],
    labels: ["WHITE", "WHITE"],
    tag: "NEW DROP",
  },
  {
    id: 1,
    name: "KYLO RONIN TEE - BLACK",
    price: "Rs 1299",
    images: [
      "/tshirt_photo/black_back.png",
      "/tshirt_photo/black_front.png",
      "/tshirt_photo/black.png",
    ],
    labels: ["BACK", "FRONT", "TSHIRT"],
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "KYLO RONIN TEE - WHITE",
    price: "Rs 1299",
    images: [
      "/tshirt_photo/white_back.png",
      "/tshirt_photo/white_front.png",
      "/tshirt_photo/white.png",
    ],
    labels: ["BACK", "FRONT", "TSHIRT"],
    tag: "NEW DROP",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayIndex = activeIndex;

  return (
    <div className="relative">
      <article
        className="product-card-light section-fade group cursor-pointer relative transition-all duration-300 hover:ring-1 hover:ring-white"
        style={{ transitionDelay: `${index * 80}ms` }}
        id={`product-card-${product.id}`}
        onClick={() => setActiveIndex((prev) => (prev + 1) % product.images.length)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0d0d0d]">
          {product.images.map((img: string, i: number) => (
            <Image
              key={i}
              src={img}
              alt={`${product.name} - ${product.labels[i]}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`absolute inset-0 object-cover transition-all duration-[400ms] ease-in-out group-hover:scale-105 ${i === displayIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
                }`}
            />
          ))}

          {/* View Back Badge */}
          <div className="absolute top-4 right-4 bg-black text-white text-[9px] uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            ↕ VIEW BACK
          </div>

          {/* Bottom indicators and label */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
            {/* Label */}
            <span className="text-white text-[10px] font-mono tracking-wider uppercase drop-shadow-md">
              {product.labels[displayIndex]}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-[4px]">
              {product.images.map((_: string, dotIndex: number) => (
                <div
                  key={dotIndex}
                  className={`w-[6px] h-[6px] rounded-full border border-white transition-colors duration-300 ${displayIndex === dotIndex ? "bg-white" : "bg-transparent"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Tag */}
          {product.tag && (
            <span
              className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase bg-black text-white px-3 py-1 z-10 pointer-events-none"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {product.tag}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex items-center justify-between bg-white border-t border-black/8 relative z-20">
          <div>
            <h3
              className="text-sm tracking-[0.2em] uppercase text-black font-medium"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {product.name}
            </h3>
          </div>
          <span
            className="text-base font-light tracking-wider"
            style={{ color: "#555", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            {product.price}
          </span>
        </div>

        {/* Buy Now Button */}
        <button
          className="buy-now-btn w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-4 px-5 text-sm hover:bg-black hover:text-white transition-all duration-300 border-t border-black/8 relative z-20"
          style={{ fontFamily: "var(--font-bebas), sans-serif" }}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          Buy Now
        </button>
      </article>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
        productPrice={product.price}
      />
    </div>
  );
}

export default function FeaturedCollection() {
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
      { threshold: 0.1 }
    );

    const fadeEls = sectionRef.current?.querySelectorAll(".section-fade");
    fadeEls?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="bg-[#f2f0ed] py-28 md:py-36 px-6 md:px-10"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-16 md:mb-20 section-fade">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p
              className="text-[11px] tracking-[0.4em] uppercase text-black/40 mb-3"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              2026 Drop
            </p>
            <h2
              className="text-[clamp(3rem,10vw,8rem)] leading-none tracking-widest text-black"
              style={{ fontFamily: "var(--font-bebas), sans-serif" }}
            >
              THE DROP
            </h2>
          </div>
          <p
            className="text-sm text-black/40 max-w-xs leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Four pieces. Zero compromises. Built for those who move in silence.
          </p>
        </div>
        <div className="mt-6 h-px bg-black/10" />
      </div>

      {/* Product grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* View all CTA */}
      <div className="max-w-7xl mx-auto mt-14 flex justify-center section-fade">
        <a href="#" className="btn-kylo-dark text-xs">
          <span>View All Pieces</span>
        </a>
      </div>
    </section>
  );
}
