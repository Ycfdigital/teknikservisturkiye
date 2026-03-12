"use client";
import Link from "next/link";
import type { PremiumUsta } from "@/types";

interface UstaKartProps {
  usta: PremiumUsta;
  compact?: boolean;
}

export default function UstaKart({ usta, compact = false }: UstaKartProps) {
  const anaIl = usta.bolgeler[0];

  const handleAra = () => {
    if (usta.cta_aktif && usta.telefon) {
      window.location.href = `tel:${usta.telefon}`;
      // GTM event
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "telefon_tikla",
          usta_id: usta.id,
          usta_ad: usta.ad,
        });
      }
    }
  };

  const handleWA = () => {
    if (usta.cta_aktif && usta.whatsapp) {
      const no = usta.whatsapp.replace(/\D/g, "");
      window.open(`https://wa.me/90${no}`, "_blank");
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "whatsapp_tikla",
          usta_id: usta.id,
          usta_ad: usta.ad,
        });
      }
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 14,
      border: "2px solid #EBF5FF",
      boxShadow: "0 4px 16px rgba(26,86,219,0.08)",
      padding: compact ? "16px" : "22px",
      position: "relative",
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(26,86,219,0.16)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(26,86,219,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}>

      {/* Premium rozet */}
      <div style={{
        position: "absolute", top: -1, right: 16,
        background: "linear-gradient(135deg, #F59E0B, #D97706)",
        color: "#fff", fontSize: 11, fontWeight: 700,
        padding: "4px 10px", borderRadius: "0 0 8px 8px",
        letterSpacing: "0.5px"
      }}>⭐ PREMIUM</div>

      {/* Üst kısım */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: "linear-gradient(135deg, #1A56DB, #1E40AF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 22, flexShrink: 0
        }}>
          {usta.foto_url ? (
            <img src={usta.foto_url} alt={usta.ad} style={{ width: "100%", height: "100%", borderRadius: 12, objectFit: "cover" }} />
          ) : "👤"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: compact ? 15 : 17, fontWeight: 800, color: "#111827", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {usta.ad}
          </h3>
          <div style={{ fontSize: 13, color: "#6B7280", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span>📍</span>
            <span>{usta.bolgeler.map(b => `${b.ilce}/${b.il}`).join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Kategori & Markalar */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {usta.kategori.map(k => (
            <span key={k} style={{
              background: "#EBF5FF", color: "#1A56DB",
              fontSize: 11, fontWeight: 700, padding: "3px 8px",
              borderRadius: 6, letterSpacing: "0.3px"
            }}>{k}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {usta.markalar.slice(0, compact ? 3 : 5).map(m => (
            <span key={m} style={{
              background: "#F9FAFB", color: "#374151",
              fontSize: 11, fontWeight: 500, padding: "2px 7px",
              borderRadius: 5, border: "1px solid #E5E7EB"
            }}>{m}</span>
          ))}
          {usta.markalar.length > (compact ? 3 : 5) && (
            <span style={{ fontSize: 11, color: "#6B7280", padding: "2px 4px" }}>
              +{usta.markalar.length - (compact ? 3 : 5)}
            </span>
          )}
        </div>
      </div>

      {/* CTA Butonlar */}
      <div style={{ display: "flex", gap: 8 }}>
        {usta.cta_aktif ? (
          <>
            <button onClick={handleAra} style={{
              flex: 1, background: "#1A56DB", color: "#fff",
              border: "none", borderRadius: 8, padding: "10px 0",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              transition: "background 0.15s"
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1E40AF")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1A56DB")}>
              📞 Hemen Ara
            </button>
            {usta.whatsapp && (
              <button onClick={handleWA} style={{
                flex: 1, background: "#25D366", color: "#fff",
                border: "none", borderRadius: 8, padding: "10px 0",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                💬 WhatsApp
              </button>
            )}
          </>
        ) : (
          <div style={{
            flex: 1, background: "#F3F4F6", borderRadius: 8, padding: "10px 0",
            textAlign: "center", fontSize: 12, color: "#6B7280", fontWeight: 500
          }}>
            İletişim bilgisi için <Link href="/iletisim" style={{ color: "#1A56DB", fontWeight: 700, textDecoration: "none" }}>bizi arayın</Link>
          </div>
        )}
      </div>

      {/* Sorun bildir */}
      {!compact && (
        <div style={{ marginTop: 10, textAlign: "right" }}>
          <button style={{
            background: "none", border: "none", color: "#9CA3AF",
            fontSize: 11, cursor: "pointer", textDecoration: "underline"
          }}>
            📢 Sorun Bildir
          </button>
        </div>
      )}
    </div>
  );
}
