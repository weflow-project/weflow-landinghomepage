"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// 헤더 메뉴 — 다른 페이지로 이동하지 않고 메인페이지의 해당 섹션으로 스크롤
const NAV_MENU = [
  { label: "회사소개", href: "/#about" },
  { label: "서비스", href: "/#service" },
  { label: "WHY WEFLOW", href: "/#why-weflow" },
  { label: "혜택", href: "/#benefits" },
  { label: "가격", href: "/#pricing" },
  { label: "포트폴리오", href: "/#portfolio" },
  { label: "인터뷰", href: "/#reviews" },
  { label: "예약", href: "/#booking" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 홈에서 앵커 클릭 시 이동 대신 해당 섹션으로 부드럽게 스크롤
  // (홈이 아닐 땐 기본 동작대로 /#섹션 으로 이동 후 스크롤)
  const handleAnchor =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const hash = href.includes("#") ? href.split("#")[1] : "";
      if (pathname === "/" && hash) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `#${hash}`);
        }
      }
    };

  const close = () => setOpen(false);

  // 홈에서 로고 클릭 시 이동 대신 맨 위로 부드럽게 스크롤
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "relative",
          zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
            <span
              className="title-3 emphasized c-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>

          <nav
            className="hide-mobile"
            style={{
              display: "flex",
              gap: "0.9rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_MENU.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleAnchor(item.href)}
                className="nav-top subhead"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#diagnosis"
            onClick={handleAnchor("/#diagnosis")}
            aria-label="무료 진단 신청"
            className="btn-primary cta-marquee cta-gradient hide-mobile"
            style={{
              width: "132px",
              height: "40px",
              fontSize: "0.95rem",
              flexShrink: 0,
            }}
          >
            <span className="cta-marquee-track">
              {["무료 진단", "무료 진단", "무료 진단", "무료 진단"].map((t, i) => (
                <span key={i} className="cta-marquee-item">
                  {t}
                </span>
              ))}
            </span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="show-mobile-flex"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--text)",
              display: "none",
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 오버레이 */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.4)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />

      {/* 왼쪽 드로어 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(300px, 82vw)",
          background: "#fff",
          boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* 드로어 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
            height: "64px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              close();
              handleLogoClick(e);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={26}
              height={26}
              style={{ width: 26, height: 26, objectFit: "contain" }}
            />
            <span
              className="headline emphasized c-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>
          <button
            onClick={close}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.4rem",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 링크 */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
          {NAV_MENU.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => {
                close();
                handleAnchor(item.href)(e);
              }}
              className="callout"
              style={{
                display: "block",
                padding: "0.9rem 1.5rem",
                color: "var(--text)",
                textDecoration: "none",
                fontWeight: 500,
                borderLeft: "3px solid transparent",
                background: "transparent",
                transition: "background 0.15s",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 하단 CTA */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/#diagnosis"
            className="btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
            onClick={(e) => {
              close();
              handleAnchor("/#diagnosis")(e);
            }}
          >
            무료 진단 신청
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .show-mobile-flex { display: flex !important; } }

        /* ── 데스크톱 메뉴 항목 ── */
        .nav-top {
          display: inline-flex;
          align-items: center;
          padding: 0.4rem 0.55rem;
          border-radius: 6px;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .nav-top:hover { color: var(--accent); }

        .cta-gradient {
          background: linear-gradient(120deg, #1560c9, #1e93d6, #14c1c8, #1e93d6, #1560c9) !important;
          background-size: 250% 100% !important;
          animation: cta-flow 2.4s linear infinite, cta-glow 1.9s ease-in-out infinite;
        }
        .cta-gradient::after {
          content: '';
          position: absolute;
          top: 0;
          left: -70%;
          width: 48%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent);
          transform: skewX(-20deg);
          animation: cta-shine 2.4s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes cta-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cta-shine {
          0% { left: -70%; }
          55% { left: 130%; }
          100% { left: 130%; }
        }
        @keyframes cta-glow {
          0%, 100% { box-shadow: 0 3px 12px rgba(23,160,205,0.45); }
          50% { box-shadow: 0 6px 22px rgba(20,193,200,0.85); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-gradient, .cta-gradient::after { animation: none; }
        }
      `}</style>
    </>
  );
}
