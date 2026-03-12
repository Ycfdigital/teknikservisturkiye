"use client";
export const dynamic = "force-dynamic";
export const dynamic = "force-dynamic";
"use client";
import { useState } from "react";

const TABS = ["Başvurular", "Ustalar", "İşletmeler", "AdSense", "Tracking", "Sayfa CTA"];

export default function AdminPanel() {
  const [aktifTab, setAktifTab] = useState("Başvurular");
  const [adsense, setAdsense] = useState({
    publisher_id: "",
    ana_sayfa: "", il_ilce: "", kategori: "",
    premium_usta: "", marka: "", arama_sonuclari: ""
  });
  const [tracking, setTracking] = useState({ gtm_id: "", ga4_id: "" });
  const [kaydedildi, setKaydedildi] = useState(false);

  const handleKaydet = async () => {
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F3F4F6" }}>
      {/* Admin Header */}
      <div style={{ background: "#111827", padding: "0 24px", display: "flex", alignItems: "center", height: 56 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>🔧 Admin Panel</div>
        <div style={{ marginLeft: "auto", color: "#6B7280", fontSize: 13 }}>TeknikServisTürkiye</div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div style={{ width: 200, background: "#1F2937", padding: "20px 0", flexShrink: 0 }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setAktifTab(tab)} style={{
              width: "100%", textAlign: "left", padding: "12px 20px",
              background: aktifTab === tab ? "#1A56DB" : "none",
              border: "none", color: aktifTab === tab ? "#fff" : "#9CA3AF",
              fontWeight: aktifTab === tab ? 700 : 500, fontSize: 14, cursor: "pointer",
              borderLeft: aktifTab === tab ? "3px solid #93C5FD" : "3px solid transparent",
              transition: "all 0.15s"
            }}>{tab}</button>
          ))}
        </div>

        {/* İçerik */}
        <div style={{ flex: 1, padding: "32px" }}>
          {/* BAŞVURULAR */}
          {aktifTab === "Başvurular" && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>Bekleyen Başvurular</h2>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB" }}>
                      {["Ad Soyad", "Telefon", "Kategori", "Bölge", "Tarih", "İşlem"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 700, color: "#374151" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderTop: "1px solid #E5E7EB" }}>
                      <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#111827" }}>Ahmet Yılmaz</td>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151" }}>0532 123 45 67</td>
                      <td style={{ padding: "14px 16px" }}><span style={{ background: "#EBF5FF", color: "#1A56DB", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 6 }}>Klima</span></td>
                      <td style={{ padding: "14px 16px", fontSize: 14, color: "#374151" }}>İzmir / Tire</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#6B7280" }}>12.03.2026</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button style={{ background: "#059669", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Onayla</button>
                          <button style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Reddet</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* USTALAR */}
          {aktifTab === "Ustalar" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>Premium Ustalar</h2>
                <button style={{ background: "#1A56DB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer" }}>
                  + Usta Ekle
                </button>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px" }}>
                {[
                  { ad: "Ahmet Yılmaz", bolge: "İzmir / Tire", kategori: "Klima", cta: true, aktif: true },
                  { ad: "Mehmet Demir", bolge: "İstanbul / Kadıköy", kategori: "Kombi", cta: true, aktif: true },
                ].map((usta, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F3F4F6" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{usta.ad}</div>
                      <div style={{ fontSize: 13, color: "#6B7280" }}>📍 {usta.bolge} • {usta.kategori}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: usta.cta ? "#ECFDF5" : "#FEF3C7", color: usta.cta ? "#059669" : "#92400E" }}>
                        {usta.cta ? "✅ CTA Aktif" : "🔒 CTA Pasif"}
                      </span>
                      <button style={{ background: "#EBF5FF", color: "#1A56DB", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Düzenle</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* İŞLETMELER */}
          {aktifTab === "İşletmeler" && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Scraper İşletmeleri</h2>
              <p style={{ color: "#6B7280", marginBottom: 24, fontSize: 14 }}>Buradan herhangi bir scraper işletmesine CTA veya WhatsApp ekleyebilirsiniz.</p>
              <div style={{ background: "#EBF5FF", borderRadius: 10, padding: "16px", marginBottom: 24, border: "1px solid #BFDBFE" }}>
                <p style={{ fontSize: 14, color: "#1E40AF" }}>
                  💡 Bir işletme için "CTA Aktif" yapıldığında, o işletmenin telefon butonu tıklanabilir hale gelir.
                  "WhatsApp Ekle" ile scraper işletmesine WA numarası ekleyebilirsiniz.
                </p>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "20px" }}>
                {[
                  { ad: "Tire Bosch Yetkili Servisi", bolge: "İzmir / Tire", cta: false, yetkili: true },
                  { ad: "Özkan Teknik Servis", bolge: "İzmir / Tire", cta: true, yetkili: false },
                ].map((isletme, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F3F4F6" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{isletme.ad}</div>
                      <div style={{ fontSize: 13, color: "#6B7280", display: "flex", gap: 8, marginTop: 3 }}>
                        <span>📍 {isletme.bolge}</span>
                        <span style={{ color: isletme.yetkili ? "#059669" : "#6B7280" }}>
                          {isletme.yetkili ? "🏢 Yetkili" : "🔧 Özel"}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={{
                        background: isletme.cta ? "#FEF3C7" : "#ECFDF5", border: "none",
                        color: isletme.cta ? "#92400E" : "#059669",
                        borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer"
                      }}>{isletme.cta ? "CTA Kapat" : "CTA Aç"}</button>
                      <button style={{ background: "#F0FDF4", color: "#25D366", border: "1px solid #86EFAC", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>WA Ekle</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADSENSE */}
          {aktifTab === "AdSense" && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>AdSense Yönetimi</h2>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Publisher ID</label>
                  <input value={adsense.publisher_id} onChange={e => setAdsense(a => ({ ...a, publisher_id: e.target.value }))}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, fontFamily: "monospace" }} />
                </div>
                {[
                  { key: "ana_sayfa", label: "Ana Sayfa Banner" },
                  { key: "il_ilce", label: "İl / İlçe Sayfası" },
                  { key: "kategori", label: "Kategori Sayfası" },
                  { key: "premium_usta", label: "Premium Usta Sayfası" },
                  { key: "marka", label: "Marka Sayfası" },
                  { key: "arama_sonuclari", label: "Arama Sonuçları" },
                ].map(item => (
                  <div key={item.key}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>{item.label} — Ad Slot</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input value={(adsense as any)[item.key]} onChange={e => setAdsense(a => ({ ...a, [item.key]: e.target.value }))}
                        placeholder="XXXXXXXXXX"
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, fontFamily: "monospace" }} />
                      <div style={{
                        padding: "10px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                        background: (adsense as any)[item.key] ? "#ECFDF5" : "#F3F4F6",
                        color: (adsense as any)[item.key] ? "#059669" : "#9CA3AF",
                        display: "flex", alignItems: "center"
                      }}>
                        {(adsense as any)[item.key] ? "✅ Aktif" : "Pasif"}
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={handleKaydet} style={{
                  background: "#1A56DB", color: "#fff", border: "none",
                  borderRadius: 8, padding: "12px", fontWeight: 700, fontSize: 15, cursor: "pointer"
                }}>
                  {kaydedildi ? "✅ Kaydedildi!" : "💾 Kaydet"}
                </button>
              </div>
            </div>
          )}

          {/* TRACKING */}
          {aktifTab === "Tracking" && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 24 }}>GTM & Analytics</h2>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "28px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "#EBF5FF", borderRadius: 10, padding: "16px", border: "1px solid #BFDBFE" }}>
                  <p style={{ fontSize: 14, color: "#1E40AF" }}>
                    💡 GTM ID girildiğinde, Google Analytics, Google Ads ve diğer tüm taglar GTM üzerinden yönetilir.
                  </p>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Google Tag Manager ID</label>
                  <input value={tracking.gtm_id} onChange={e => setTracking(t => ({ ...t, gtm_id: e.target.value }))}
                    placeholder="GTM-XXXXXXX"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, fontFamily: "monospace" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>Google Analytics 4 ID</label>
                  <input value={tracking.ga4_id} onChange={e => setTracking(t => ({ ...t, ga4_id: e.target.value }))}
                    placeholder="G-XXXXXXXXXX"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, fontFamily: "monospace" }} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginTop: 8 }}>Usta Bazlı Conversion Labels</h3>
                {["Ahmet Yılmaz", "Mehmet Demir"].map(usta => (
                  <div key={usta}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6 }}>{usta} — Ads Conversion Label</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input placeholder="XXXXXXXXXXXXXXXX"
                        style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14, fontFamily: "monospace" }} />
                      <div style={{ display: "flex", gap: 6 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <input type="checkbox" defaultChecked /> Tel tıklama
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                          <input type="checkbox" defaultChecked /> WA tıklama
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={handleKaydet} style={{ background: "#1A56DB", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  {kaydedildi ? "✅ Kaydedildi!" : "💾 Kaydet"}
                </button>
              </div>
            </div>
          )}

          {/* SAYFA CTA */}
          {aktifTab === "Sayfa CTA" && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginBottom: 8 }}>Sayfa CTA Yönetimi</h2>
              <p style={{ color: "#6B7280", marginBottom: 24, fontSize: 14 }}>
                Herhangi bir URL için CTA durumunu buradan aktif/pasif yapabilirsiniz.
              </p>
              <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "28px" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  <input placeholder="/izmir/tire/klima-servisi/" style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", fontSize: 14 }} />
                  <button style={{ background: "#1A56DB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer" }}>Ara</button>
                </div>
                {[
                  { url: "/izmir/tire/klima-servisi/", cta: false, not: "Satışa açık bölge" },
                  { url: "/izmir/tire/kombi-servisi/", cta: true, not: "Mehmet Usta aktif" },
                ].map((sayfa, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F3F4F6" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#111827", fontSize: 14, fontFamily: "monospace" }}>{sayfa.url}</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{sayfa.not}</div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: sayfa.cta ? "#ECFDF5" : "#FEF3C7", color: sayfa.cta ? "#059669" : "#92400E" }}>
                        {sayfa.cta ? "✅ CTA Aktif" : "⏸ Pasif"}
                      </span>
                      <button style={{ background: sayfa.cta ? "#FEF3C7" : "#ECFDF5", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: sayfa.cta ? "#92400E" : "#059669" }}>
                        {sayfa.cta ? "Pasif Yap" : "Aktif Yap"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
