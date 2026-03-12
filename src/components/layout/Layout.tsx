"use client";
import Link from "next/link";
import { useState } from "react";
import { kategoriler } from "@/data/turkiye";

const NAV_LINKS = [
  { ad: "Ana Sayfa", href: "/" },
  {
    ad: "Servisler", href: "#",
    alt: kategoriler.map(k => ({ ad: k.ad, href: `/servis/${k.slug}` }))
  },
  {
    ad: "Premium Ustalar", href: "/premium-ustalar",
    alt: kategoriler.map(k => ({ ad: k.ad + " Ustaları", href: `/premium-ustalar/${k.slug}` }))
  },
  { ad: "Haberler", href: "/haberler" },
  { ad: "Usta Başvurusu", href: "/basvuru" },
  { ad: "İletişim", href: "/iletisim" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuAcik, setMenuAcik] = useState(false);
  const [altMenuAcik, setAltMenuAcik] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* HEADER */}
      <header style={{ background: "#1A56DB", boxShadow: "0 2px 12px rgba(26,86,219,0.18)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#1A56DB", fontSize: 18 }}>TS</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "-0.3px", lineHeight: 1.1 }}>TeknikServis</div>
              <div style={{ color: "#93C5FD", fontWeight: 600, fontSize: 11, letterSpacing: "1.5px" }}>TÜRKİYE</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <div key={link.ad} style={{ position: "relative" }}
                onMouseEnter={() => link.alt && setAltMenuAcik(link.ad)}
                onMouseLeave={() => setAltMenuAcik(null)}>
                <Link href={link.href} style={{
                  color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 14,
                  padding: "8px 14px", borderRadius: 6, display: "flex", alignItems: "center", gap: 4,
                  background: altMenuAcik === link.ad ? "rgba(255,255,255,0.15)" : "transparent",
                  transition: "background 0.15s"
                }}>
                  {link.ad}
                  {link.alt && <span style={{ fontSize: 10, opacity: 0.7 }}>▼</span>}
                </Link>
                {link.alt && altMenuAcik === link.ad && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, background: "#fff",
                    borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    minWidth: 220, padding: "8px 0", zIndex: 200
                  }}>
                    {link.alt.map(alt => (
                      <Link key={alt.href} href={alt.href} style={{
                        display: "block", padding: "10px 18px", color: "#111827",
                        textDecoration: "none", fontWeight: 500, fontSize: 14,
                        borderBottom: "1px solid #F3F4F6", transition: "background 0.1s"
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#EBF5FF")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                        {alt.ad}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Hamburger */}
          <button onClick={() => setMenuAcik(!menuAcik)} style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "#fff", fontSize: 24 }} className="hamburger">
            {menuAcik ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuAcik && (
          <div style={{ background: "#1E40AF", padding: "12px 24px 20px" }}>
            {NAV_LINKS.map(link => (
              <Link key={link.ad} href={link.href} onClick={() => setMenuAcik(false)} style={{
                display: "block", color: "#fff", textDecoration: "none",
                padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.1)",
                fontWeight: 600, fontSize: 15
              }}>{link.ad}</Link>
            ))}
          </div>
        )}
      </header>

      {/* MAIN */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* FOOTER */}
      <footer style={{ background: "#111827", color: "#9CA3AF", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
            {/* Marka */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, background: "#1A56DB", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 16 }}>TS</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>TeknikServisTürkiye</div>
                  <div style={{ color: "#6B7280", fontSize: 11 }}>Türkiye Geneli Teknik Servis Ağı</div>
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#6B7280" }}>
                Aradığın Teknik Servisi Hemen Bul.
              </p>
              <div style={{ marginTop: 16 }}>
                <a href="https://ycfdigital.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#3B82F6", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
                  YCF Digital ↗
                </a>
                <span style={{ fontSize: 12, marginLeft: 8, color: "#4B5563" }}>tarafından geliştirilmiştir.</span>
              </div>
            </div>

            {/* Sayfalar */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Sayfalar</h4>
              {[
                { ad: "Hakkımızda", href: "/hakkimizda" },
                { ad: "Haberler", href: "/haberler" },
                { ad: "Usta Başvurusu", href: "/basvuru" },
                { ad: "İletişim", href: "/iletisim" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "block", color: "#9CA3AF", textDecoration: "none", fontSize: 13, marginBottom: 8, transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                  {l.ad}
                </Link>
              ))}
            </div>

            {/* Servisler */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Servisler</h4>
              {kategoriler.map(k => (
                <Link key={k.slug} href={`/servis/${k.slug}`} style={{ display: "block", color: "#9CA3AF", textDecoration: "none", fontSize: 13, marginBottom: 8 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                  {k.ad}
                </Link>
              ))}
            </div>

            {/* Yasal */}
            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 14, fontSize: 14 }}>Yasal</h4>
              {[
                { ad: "Yasal Uyarı", href: "/yasal-uyari" },
                { ad: "Gizlilik Politikası", href: "/gizlilik" },
                { ad: "KVKK", href: "/kvkk" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "block", color: "#9CA3AF", textDecoration: "none", fontSize: 13, marginBottom: 8 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}>
                  {l.ad}
                </Link>
              ))}

              {/* Yasal uyarı notu */}
              <div style={{ marginTop: 20, padding: "12px", background: "rgba(239,68,68,0.1)", borderRadius: 8, borderLeft: "3px solid #EF4444" }}>
                <p style={{ fontSize: 11, color: "#FCA5A5", lineHeight: 1.6, margin: 0 }}>
                  Bu sitede listelenen işletmeler bağımsız kaynaklardan derlenmektedir. YCF Digital, listelenen işletmelerin yetkili servis statüsünü garanti etmez.
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #1F2937", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 12, margin: 0 }}>© 2026 TeknikServisTürkiye — <a href="https://ycfdigital.com" style={{ color: "#3B82F6", textDecoration: "none" }}>YCF Digital</a></p>
            <p style={{ fontSize: 12, margin: 0, color: "#4B5563" }}>Türkiye&apos;nin Teknik Servis Rehberi</p>
          </div>
        </div>
      </footer>

      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </div>
  );
}
