"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { kategoriler, iller } from "@/data/turkiye";
import UstaKart from "@/components/ui/UstaKart";
import { AdSenseBanner } from "@/components/ui/AdSense";
import type { PremiumUsta } from "@/types";

// Örnek premium ustalar (gerçekte Supabase'den gelir)
const ORNEK_USTALAR: PremiumUsta[] = [
  {
    id: "1", ad: "Ahmet Yılmaz", slug: "ahmet-yilmaz",
    telefon: "05321234567", whatsapp: "05321234567",
    kategori: ["Klima Servisi"], markalar: ["Daikin", "Mitsubishi", "LG"],
    bolgeler: [{ il: "İzmir", ilSlug: "izmir", ilce: "Tire", ilceSlug: "tire" }],
    hakkinda: "10 yıllık deneyim", aktif: true, durum: "onaylandi",
    cta_aktif: true, olusturma_tarihi: "2026-01-01"
  },
  {
    id: "2", ad: "Mehmet Demir", slug: "mehmet-demir",
    telefon: "05329876543", whatsapp: "05329876543",
    kategori: ["Kombi Servisi"], markalar: ["Vaillant", "Baymak", "Bosch"],
    bolgeler: [
      { il: "İstanbul", ilSlug: "istanbul", ilce: "Kadıköy", ilceSlug: "kadikoy" },
      { il: "Kocaeli", ilSlug: "kocaeli", ilce: "İzmit", ilceSlug: "izmit" }
    ],
    hakkinda: "Kombi uzmanı", aktif: true, durum: "onaylandi",
    cta_aktif: true, olusturma_tarihi: "2026-01-01"
  },
  {
    id: "3", ad: "Ali Kaya", slug: "ali-kaya",
    telefon: "05334567890", whatsapp: "05334567890",
    kategori: ["Buzdolabı Servisi", "Çamaşır Makinesi Servisi"],
    markalar: ["Arçelik", "Beko", "Bosch", "Vestel"],
    bolgeler: [{ il: "Ankara", ilSlug: "ankara", ilce: "Çankaya", ilceSlug: "cankaya" }],
    hakkinda: "Beyaz eşya uzmanı", aktif: true, durum: "onaylandi",
    cta_aktif: true, olusturma_tarihi: "2026-01-01"
  },
];

export default function AnaSayfa() {
  const router = useRouter();
  const [aramaMetin, setAramaMetin] = useState("");
  const [secilenIl, setSecilenIl] = useState("");
  const [secilenIlce, setSecilenIlce] = useState("");
  const [secilenKategori, setSecilenKategori] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const ilListesi = Object.values(iller);
  const ilceListesi = secilenIl ? iller[secilenIl]?.ilceler || [] : [];

  const handleAra = () => {
    if (secilenIl && secilenIlce && secilenKategori) {
      router.push(`/${secilenIl}/${secilenIlce}/${secilenKategori}`);
    } else if (secilenIl && secilenIlce) {
      router.push(`/${secilenIl}/${secilenIlce}`);
    } else if (secilenIl) {
      router.push(`/${secilenIl}`);
    }
  };

  const ilerleCar = (yon: 1 | -1) => {
    setCarouselIndex(i => (i + yon + ORNEK_USTALAR.length) % ORNEK_USTALAR.length);
  };

  const gorununUstalar = [
    ORNEK_USTALAR[carouselIndex],
    ORNEK_USTALAR[(carouselIndex + 1) % ORNEK_USTALAR.length],
    ORNEK_USTALAR[(carouselIndex + 2) % ORNEK_USTALAR.length],
  ];

  return (
    <div>
      {/* HERO & ARAMA */}
      <section style={{
        background: "linear-gradient(135deg, #1A56DB 0%, #1E40AF 50%, #1e3a8a 100%)",
        padding: "64px 24px 80px",
        position: "relative", overflow: "hidden"
      }}>
        {/* Dekoratif daireler */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", borderRadius: 20, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "#BFDBFE", fontWeight: 600 }}>🇹🇷 Türkiye Geneli Teknik Servis Ağı</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 16, letterSpacing: "-1px" }}>
            Aradığın Teknik Servisi<br />
            <span style={{ color: "#93C5FD" }}>Hemen Bul.</span>
          </h1>

          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "#BFDBFE", marginBottom: 36, maxWidth: 560, margin: "0 auto 36px" }}>
            Buzdolabı, çamaşır makinesi, bulaşık makinesi, klima ve kombi servisi için Türkiye&apos;nin en kapsamlı rehberi.
          </p>

          {/* Arama Kutusu */}
          <div style={{
            background: "#fff", borderRadius: 16, padding: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end"
          }}>
            <div style={{ flex: "1 1 180px" }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>NE ARIYORSUNUZ?</label>
              <select value={secilenKategori} onChange={e => setSecilenKategori(e.target.value)} style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #E5E7EB", fontSize: 14, color: "#111827",
                background: "#fff", outline: "none", cursor: "pointer"
              }}>
                <option value="">Servis Seçin</option>
                {kategoriler.map(k => (
                  <option key={k.slug} value={k.slug}>{k.icon} {k.ad}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: "1 1 140px" }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>İL</label>
              <select value={secilenIl} onChange={e => { setSecilenIl(e.target.value); setSecilenIlce(""); }} style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #E5E7EB", fontSize: 14, color: "#111827",
                background: "#fff", outline: "none", cursor: "pointer"
              }}>
                <option value="">İl Seçin</option>
                {ilListesi.map(il => (
                  <option key={il.slug} value={il.slug}>{il.ad}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: "1 1 140px" }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>İLÇE</label>
              <select value={secilenIlce} onChange={e => setSecilenIlce(e.target.value)} disabled={!secilenIl} style={{
                width: "100%", padding: "10px 12px", borderRadius: 8,
                border: "1.5px solid #E5E7EB", fontSize: 14, color: "#111827",
                background: secilenIl ? "#fff" : "#F9FAFB", outline: "none", cursor: secilenIl ? "pointer" : "not-allowed"
              }}>
                <option value="">İlçe Seçin</option>
                {ilceListesi.map(ilce => (
                  <option key={ilce.slug} value={ilce.slug}>{ilce.ad}</option>
                ))}
              </select>
            </div>

            <button onClick={handleAra} style={{
              flex: "0 0 auto", background: "#1A56DB", color: "#fff",
              border: "none", borderRadius: 10, padding: "11px 28px",
              fontWeight: 800, fontSize: 15, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "background 0.15s", whiteSpace: "nowrap"
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1E40AF")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1A56DB")}>
              🔍 Ara
            </button>
          </div>

          {/* Hızlı linkler */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
            {kategoriler.map(k => (
              <Link key={k.slug} href={`/servis/${k.slug}`} style={{
                background: "rgba(255,255,255,0.12)", color: "#BFDBFE",
                borderRadius: 20, padding: "6px 14px", fontSize: 13,
                textDecoration: "none", fontWeight: 600, transition: "background 0.15s"
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
                {k.icon} {k.ad}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADSENSE - Ana sayfa banner */}
      <AdSenseBanner tip="ana_sayfa" />

      {/* PREMIUM USTALAR CAROUSEL */}
      <section style={{ padding: "56px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1A56DB", letterSpacing: "1.5px", marginBottom: 6 }}>ÖNE ÇIKAN</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: "#111827" }}>⭐ Premium Ustalar</h2>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={() => ilerleCar(-1)} style={{
                width: 40, height: 40, borderRadius: "50%", border: "2px solid #1A56DB",
                background: "#fff", color: "#1A56DB", fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>←</button>
              <button onClick={() => ilerleCar(1)} style={{
                width: 40, height: 40, borderRadius: "50%", background: "#1A56DB",
                border: "none", color: "#fff", fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>→</button>
              <Link href="/premium-ustalar" style={{
                background: "#1A56DB", color: "#fff", borderRadius: 8,
                padding: "10px 18px", textDecoration: "none", fontWeight: 700, fontSize: 13
              }}>Tümünü Gör</Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {gorununUstalar.map(usta => (
              <UstaKart key={usta.id} usta={usta} />
            ))}
          </div>
        </div>
      </section>

      {/* USTA ARA */}
      <section style={{ padding: "48px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 8 }}>🔍 Usta Ara</h2>
          <p style={{ color: "#6B7280", marginBottom: 24, fontSize: 15 }}>İsim veya konum ile premium ustalar arasında arama yapın</p>

          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <input
              type="text" placeholder="Usta adı veya konum..."
              value={aramaMetin} onChange={e => setAramaMetin(e.target.value)}
              style={{
                flex: "1 1 240px", padding: "12px 16px", borderRadius: 10,
                border: "1.5px solid #E5E7EB", fontSize: 14, outline: "none"
              }}
            />
            <select style={{
              flex: "0 0 auto", padding: "12px 16px", borderRadius: 10,
              border: "1.5px solid #E5E7EB", fontSize: 14, color: "#374151",
              background: "#fff", cursor: "pointer"
            }}>
              <option value="">Tüm Kategoriler</option>
              {kategoriler.map(k => <option key={k.slug} value={k.slug}>{k.ad}</option>)}
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {ORNEK_USTALAR
              .filter(u => !aramaMetin || u.ad.toLowerCase().includes(aramaMetin.toLowerCase()) ||
                u.bolgeler.some(b => b.il.toLowerCase().includes(aramaMetin.toLowerCase()) ||
                  b.ilce.toLowerCase().includes(aramaMetin.toLowerCase())))
              .map(usta => <UstaKart key={usta.id} usta={usta} compact />)}
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section style={{ padding: "48px 24px", background: "#F8FAFF" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginBottom: 24 }}>🔧 Servis Kategorileri</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {kategoriler.map(k => (
              <Link key={k.slug} href={`/servis/${k.slug}`} style={{
                background: "#fff", borderRadius: 12, padding: "24px 20px",
                textDecoration: "none", border: "2px solid #EBF5FF",
                textAlign: "center", display: "block",
                transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1A56DB";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(26,86,219,0.15)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#EBF5FF";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{k.icon}</div>
                <div style={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>{k.ad}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{k.marka_listesi.length}+ Marka</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADSENSE - Alt */}
      <AdSenseBanner tip="ana_sayfa" />

      {/* YASAL UYARI */}
      <section style={{ padding: "24px", background: "#FEF3C7" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.7 }}>
            <strong>Önemli Yasal Uyarı:</strong> Bu sitede listelenen işletmeler bağımsız kaynaklardan derlenmektedir.
            TeknikServisTürkiye ve YCF Digital, listelenen işletmelerin yetkili servis statüsünü garanti etmez.
            Yetkili servis teyidi için ilgili markanın resmi web sitesini ziyaret ediniz.
            Kendini &quot;yetkili servis&quot; olarak tanıtıp olmayan işletmeler için hukuki süreç başlatılabilir.
          </p>
        </div>
      </section>
    </div>
  );
}
