"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import kyloLogo from "../app/kylo-logo.png";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Shop", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-1.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="#hero" className="flex-shrink-0" aria-label="KYLO home">
          <Image
            src={kyloLogo}
            alt="KYLO"
            height={60}
            className="w-auto opacity-90 hover:opacity-100 transition-opacity duration-200"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link text-sm tracking-widest uppercase"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#collection"
          className="hidden md:inline-block btn-kylo text-xs"
        >
          <span>Shop Now</span>
        </a>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-black border-t border-white/10 px-6 py-6 mobile-menu-open"
          id="mobile-menu"
        >
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#collection"
            className="btn-kylo mt-8 inline-block text-xs"
            onClick={() => setMenuOpen(false)}
          >
            <span>Shop Now</span>
          </a>
        </div>
      )}
    </nav>
  );
}
