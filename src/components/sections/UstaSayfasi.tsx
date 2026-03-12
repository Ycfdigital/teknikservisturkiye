"use client";
import Link from "next/link";
import { AdSenseBanner } from "@/components/ui/AdSense";
import type { PremiumUsta } from "@/types";
import { useState } from "react";

interface Props { usta: PremiumUsta; il: string; ilAd: string; ilce: string; ilceAd: string; kategori: string; kategoriAd: string }

export default function UstaSayfasi({ usta, il, ilAd, ilce, ilceAd, kategori, kategoriAd }: Props) {
  const [sorunModal, setSorunModal] = useState(false);
  const [sorunTip, setSorunTip] = useState("");
  const [sorunGonderildi, setSorunGonderildi] = useState(false);

  const handleAra = () => {
    if (usta.cta_aktif) {
      window.location.href = `tel:${usta.telefon}`;
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "telefon_tikla", usta_id: usta.id, usta_ad: usta.ad });
      }
    }
  };

  const handleWA = () => {
    if (usta.cta_aktif && usta.whatsapp) {
      window.open(`https://wa.me/90${usta.whatsapp.replace(/\D/g, "")}`, "_blank");
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "whatsapp_tikla", usta_id: usta.id });
      }
    }
  };

  const handleSorunGonder = () => {
    // Gerçekte Supabase'e gönderilir
    setSorunGonderildi(true);
    setTimeout(() => { setSorunModal(false); setSorunGonderildi(false); }, 2000);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB", padding: "12px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", fontSize: 13, color: "#6B7280", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>Ana Sayfa</Link>
          <span>›</span>
          <Link href={`/${il}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{ilAd}</Link>
          <span>›</span>
          <Link href={`/${il}/${ilce}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{ilceAd}</Link>
          <span>›</span>
          <Link href={`/${il}/${ilce}/${kategori}`} style={{ color: "#1A56DB", textDecoration: "none", fontWeight: 600 }}>{kategoriAd}</Link>
          <span>›</span>
          <span style={{ color: "#111827", fontWeight: 600 }}>{usta.ad}</span>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
        {/* Premium rozet */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #F59E0B, #D97706)", color: "#fff", borderRadius: 8, padding: "6px 14px", marginBottom: 20, fontWeight: 700, fontSize: 13 }}>
          ⭐ PREMIUM USTA
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }}>
          {/* Sol: Bilgiler */}
          <div>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 900, color: "#111827", marginBottom: 8 }}>
              {usta.ad}
            </h1>
            <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 24 }}>
              {usta.kategori.join(" • ")}
            </p>

            {/* Hakkında */}
            {usta.hakkinda && (
              <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "20px", marginBottom: 24, border: "1px solid #E5E7EB" }}>
                <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 8, fontSize: 15 }}>Hakkında</h3>
                <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.7 }}>{usta.hakkinda}</p>
              </div>
            )}

            {/* Markalar */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 12, fontSize: 15 }}>Hizmet Verilen Markalar</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {usta.markalar.map(m => (
                  <span key={m} style={{
                    background: "#EBF5FF", color: "#1A56DB", borderRadius: 8,
                    padding: "6px 14px", fontWeight: 700, fontSize: 13,
                    border: "1px solid #BFDBFE"
                  }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Bölgeler */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, color: "#111827", marginBottom: 12, fontSize: 15 }}>Çalıştığı Bölgeler</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {usta.bolgeler.map((b, i) => (
                  <Link key={i} href={`/${b.ilSlug}/${b.ilceSlug}`} style={{
                    background: "#F9FAFB", color: "#374151", borderRadius: 8,
                    padding: "6px 14px", fontWeight: 600, fontSize: 13,
                    border: "1px solid #E5E7EB", textDecoration: "none",
                    display: "flex", alignItems: "center", gap: 4
                  }}>
                    📍 {b.ilce} / {b.il}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ: CTA Kartı */}
          <div style={{ width: 280, flexShrink: 0 }}>
            <div style={{
              background: "#fff", border: "2px solid #EBF5FF", borderRadius: 16,
              padding: "24px", boxShadow: "0 8px 32px rgba(26,86,219,0.1)", position: "sticky", top: 80
            }}>
              {usta.foto_url && (
                <img src={usta.foto_url} alt={usta.ad} style={{ width: "100%", borderRadius: 10, marginBottom: 16, objectFit: "cover", height: 160 }} />
              )}

              {!usta.foto_url && (
                <div style={{
                  width: "100%", height: 100, background: "linear-gradient(135deg, #1A56DB, #1E40AF)",
                  borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 48
                }}>👤</div>
              )}

              <h3 style={{ fontWeight: 800, color: "#111827", fontSize: 18, marginBottom: 4 }}>{usta.ad}</h3>
              <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 20 }}>
                📍 {usta.bolgeler[0]?.ilce} / {usta.bolgeler[0]?.il}
              </p>

              {usta.cta_aktif ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={handleAra} style={{
                    background: "#1A56DB", color: "#fff", border: "none",
                    borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 16,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8, width: "100%",
                    transition: "background 0.15s"
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#1E40AF")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#1A56DB")}>
                    📞 Hemen Ara
                  </button>
                  {usta.whatsapp && (
                    <button onClick={handleWA} style={{
                      background: "#25D366", color: "#fff", border: "none",
                      borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 16,
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 8, width: "100%"
                    }}>
                      💬 WhatsApp&apos;tan Yaz
                    </button>
                  )}
                </div>
              ) : (
                <div style={{
                  background: "#F3F4F6", borderRadius: 10, padding: "16px",
                  textAlign: "center", border: "1px dashed #D1D5DB"
                }}>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>İletişim bilgisine ulaşmak için</p>
                  <Link href="/iletisim" style={{
                    background: "#1A56DB", color: "#fff", borderRadius: 8,
                    padding: "10px 20px", textDecoration: "none", fontWeight: 700, fontSize: 14, display: "block"
                  }}>Bizi Arayın</Link>
                </div>
              )}

              {/* Sorun bildir */}
              <button onClick={() => setSorunModal(true)} style={{
                background: "none", border: "none", color: "#9CA3AF",
                fontSize: 12, cursor: "pointer", marginTop: 14, textDecoration: "underline",
                width: "100%", textAlign: "center"
              }}>
                📢 Sorun Bildir
              </button>
            </div>
          </div>
        </div>

        {/* AdSense - premium sayfada da var */}
        <div style={{ marginTop: 40 }}>
          <AdSenseBanner tip="premium_usta" />
        </div>
      </div>

      {/* Sorun Bildir Modal */}
      {sorunModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: 380, maxWidth: "90vw" }}>
            <h3 style={{ fontWeight: 800, color: "#111827", marginBottom: 16 }}>Sorun Bildir</h3>
            {!sorunGonderildi ? (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
                  {["Ulaşamıyorum", "Yanlış bilgi", "Kapanmış", "Dolandırıcılık şüphesi"].map(tip => (
                    <label key={tip} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px", borderRadius: 8, border: sorunTip === tip ? "2px solid #1A56DB" : "1px solid #E5E7EB", background: sorunTip === tip ? "#EBF5FF" : "#fff" }}>
                      <input type="radio" name="sorun" value={tip} checked={sorunTip === tip} onChange={() => setSorunTip(tip)} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{tip}</span>
                    </label>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setSorunModal(false)} style={{ flex: 1, background: "#F3F4F6", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, cursor: "pointer", color: "#374151" }}>İptal</button>
                  <button onClick={handleSorunGonder} disabled={!sorunTip} style={{ flex: 1, background: sorunTip ? "#EF4444" : "#F3F4F6", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, cursor: sorunTip ? "pointer" : "not-allowed", color: sorunTip ? "#fff" : "#9CA3AF" }}>Gönder</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ fontWeight: 700, color: "#059669" }}>Bildiriminiz alındı, teşekkürler!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
