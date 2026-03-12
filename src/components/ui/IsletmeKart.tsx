"use client";
import type { Isletme } from "@/types";

interface IsletmeKartProps {
  isletme: Isletme;
}

export default function IsletmeKart({ isletme }: IsletmeKartProps) {
  const handleKilitliTikla = () => {
    // Satın alma sayfasına yönlendir veya modal aç
    alert("Bu özellik için lütfen bizimle iletişime geçin: 0XXX XXX XX XX");
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 12,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      padding: "16px 18px",
      transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"}
      onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"}>

      {/* Rozet */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{
          background: isletme.yetkili ? "#ECFDF5" : "#EBF5FF",
          color: isletme.yetkili ? "#059669" : "#1A56DB",
          fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6
        }}>
          {isletme.yetkili ? "🏢 YETKİLİ SERVİS" : "🔧 ÖZEL SERVİS"}
        </span>
      </div>

      {/* İşletme adı */}
      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 6 }}>
        {isletme.ad}
      </h3>

      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>
        📍 {isletme.adres}
      </p>

      {/* Telefon - görünür ama tıklanamaz */}
      {isletme.telefon && (
        <div style={{
          fontSize: 13, color: "#374151", fontWeight: 600,
          marginBottom: 12, padding: "8px 12px",
          background: "#F9FAFB", borderRadius: 8,
          display: "flex", alignItems: "center", gap: 8
        }}>
          📞 {isletme.telefon}
          <span style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 400 }}>(tıkla-ara için iletişime geçin)</span>
        </div>
      )}

      {/* CTA */}
      <div style={{ display: "flex", gap: 8 }}>
        {isletme.cta_aktif ? (
          <>
            <a href={`tel:${isletme.telefon}`} style={{
              flex: 1, background: "#1A56DB", color: "#fff",
              borderRadius: 8, padding: "9px 0", fontWeight: 700,
              fontSize: 13, textDecoration: "none", textAlign: "center",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 5
            }}>
              📞 Hemen Ara
            </a>
            {isletme.whatsapp && (
              <a href={`https://wa.me/90${isletme.whatsapp.replace(/\D/g, "")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, background: "#25D366", color: "#fff",
                  borderRadius: 8, padding: "9px 0", fontWeight: 700,
                  fontSize: 13, textDecoration: "none", textAlign: "center",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5
                }}>
                💬 WA
              </a>
            )}
          </>
        ) : (
          <button onClick={handleKilitliTikla} style={{
            flex: 1, background: "#F3F4F6", border: "1px dashed #D1D5DB",
            borderRadius: 8, padding: "9px 0", fontWeight: 600,
            fontSize: 12, color: "#6B7280", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 5
          }}>
            🔒 Tıkla-Ara Özelliğini Satın Al
          </button>
        )}
      </div>

      {/* Uyarı notu */}
      {!isletme.yetkili && (
        <p style={{ fontSize: 10, color: "#9CA3AF", marginTop: 8, lineHeight: 1.5 }}>
          * Bu işletme bağımsız özel teknik servis olup ilgili markanın yetkili servisi değildir.
        </p>
      )}
    </div>
  );
}
