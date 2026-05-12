import Image from "next/image";
import kyloLogo from "../app/kylo-logo.png";

const footerLinks = [
  { label: "Home", href: "#hero" },
  { label: "Shop", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#newsletter" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/kylo.clo",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-12 pb-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-10">
          {/* Logo */}
          <a
            href="#hero"
            className="flex-shrink-0"
            aria-label="KYLO"
          >
            <Image
              src={kyloLogo}
              alt="KYLO"
              width={160}
              height={65}
              className="w-[130px] opacity-75 hover:opacity-100 transition-opacity duration-200 object-contain"
            />
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link text-xs tracking-[0.25em] uppercase"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/9765199944"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-200 text-xs tracking-widest"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              📞 9765199944
            </a>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/40 hover:text-white transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="h-px bg-white/6 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-[11px] text-white/25 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            © 2026 KYLO. All rights reserved.
          </p>
          <p
            className="text-[11px] text-white/20 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Made in the dark.
          </p>
        </div>
      </div>
    </footer>
  );
}
